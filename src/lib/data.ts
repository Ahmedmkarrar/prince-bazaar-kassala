// Data layer for hotel + conference inventory.
// Reads/writes JSON files in /data on local dev. When the real PMS is wired in,
// swap the read*/write* helpers to call that API and the rest of the app stays the same.

import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const INVENTORY_PATH = path.join(DATA_DIR, "inventory.json");
const INQUIRIES_PATH = path.join(DATA_DIR, "inquiries.json");

export interface Room {
  id: string;
  name: string;
  view: string;
  capacity: number;
  basePrice: number;
  currency: string;
  description: string;
}

export interface ConferenceRoom {
  id: string;
  name: string;
  description: string;
  capacity: { theatre: number; boardroom: number; ushape: number; reception: number };
  halfDayPrice: number;
  fullDayPrice: number;
  currency: string;
  features: string[];
}

export interface Addon {
  id: string;
  name: string;
  price: number;
  category: "transport" | "experience" | "dining" | "wellness" | "catering" | "av" | "events";
  active: boolean;
}

export interface DayAvailability {
  royal: number;
  presidential: number;
  priceMultiplier: number;
}

export interface Inventory {
  rooms: Room[];
  conferenceRooms: ConferenceRoom[];
  addons: Addon[];
  availability: Record<string, DayAvailability>;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  message: string;
  conferenceRoom?: string;
  addons?: string[];
  ts: string;
}

let cachedInventory: Inventory | null = null;
let cachedInquiries: Inquiry[] | null = null;

export async function readInventory(): Promise<Inventory> {
  if (cachedInventory) return cachedInventory;
  try {
    const raw = await fs.readFile(INVENTORY_PATH, "utf8");
    cachedInventory = JSON.parse(raw) as Inventory;
    return cachedInventory;
  } catch {
    cachedInventory = { rooms: [], conferenceRooms: [], addons: [], availability: {} };
    return cachedInventory;
  }
}

export async function writeInventory(inv: Inventory): Promise<boolean> {
  cachedInventory = inv;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(INVENTORY_PATH, JSON.stringify(inv, null, 2), "utf8");
    return true;
  } catch {
    // Read-only filesystem (e.g. Vercel) — change persists in memory for the lifetime of the instance.
    return false;
  }
}

export async function readInquiries(): Promise<Inquiry[]> {
  if (cachedInquiries) return cachedInquiries;
  try {
    const raw = await fs.readFile(INQUIRIES_PATH, "utf8");
    cachedInquiries = JSON.parse(raw) as Inquiry[];
    return cachedInquiries;
  } catch {
    cachedInquiries = [];
    return cachedInquiries;
  }
}

export async function appendInquiry(inq: Inquiry): Promise<boolean> {
  const list = await readInquiries();
  list.unshift(inq);
  cachedInquiries = list;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(INQUIRIES_PATH, JSON.stringify(list, null, 2), "utf8");
    return true;
  } catch {
    return false;
  }
}

// Helper used by /api/availability and Concierge tool.
export async function availabilityFor(checkIn: string, checkOut: string) {
  const inv = await readInventory();
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return { error: "Invalid date range" };
  }
  const days: { date: string; royal: number; presidential: number; priceMultiplier: number }[] = [];
  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().slice(0, 10);
    const dayData = inv.availability[key] ?? { royal: 4, presidential: 2, priceMultiplier: 1 };
    days.push({ date: key, ...dayData });
  }

  const royalAvailableEveryDay = days.every((d) => d.royal > 0);
  const presidentialAvailableEveryDay = days.every((d) => d.presidential > 0);
  const avgMultiplier = days.reduce((s, d) => s + d.priceMultiplier, 0) / days.length;

  const royalRate = inv.rooms.find((r) => r.id === "royal");
  const presidentialRate = inv.rooms.find((r) => r.id === "presidential");

  const nights = days.length;

  return {
    nights,
    days,
    options: [
      royalRate
        ? {
            id: "royal",
            name: royalRate.name,
            description: royalRate.description,
            view: royalRate.view,
            available: royalAvailableEveryDay,
            nightlyFromUSD: Math.round(royalRate.basePrice * avgMultiplier),
            totalUSD: Math.round(royalRate.basePrice * avgMultiplier * nights),
          }
        : null,
      presidentialRate
        ? {
            id: "presidential",
            name: presidentialRate.name,
            description: presidentialRate.description,
            view: presidentialRate.view,
            available: presidentialAvailableEveryDay,
            nightlyFromUSD: Math.round(presidentialRate.basePrice * avgMultiplier),
            totalUSD: Math.round(presidentialRate.basePrice * avgMultiplier * nights),
          }
        : null,
    ].filter(Boolean),
  };
}
