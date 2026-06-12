// Read-only data layer for hotel inventory (rooms, conference, tourism,
// transport, contact). Backs the journey planner and other content surfaces.
// Booking / reservation state lives nowhere on-site any more — guests are
// handed straight to WhatsApp (see src/lib/whatsapp.ts).

import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const INVENTORY_PATH = path.join(DATA_DIR, "inventory.json");

// ── Types ──────────────────────────────────────────────────────────────────

export interface Localised {
  en: string;
  ar: string;
}

export interface Hotel {
  id: string;
  name: Localised;
  city: Localised;
  country: Localised;
  timezone: string;
  currency: string;
  whatsapp: string;
  phone: string;
  email: string;
  active: boolean;
}

export interface RoomType {
  id: string;
  hotelId: string;
  name: Localised;
  shortName: Localised;
  view: Localised;
  capacity: number;
  sqm: number;
  basePrice: number;
  currency: string;
  totalUnits: number;
  description: Localised;
  image: string;
}

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
  name: Localised | string;
  price: number;
  category: "transport" | "experience" | "dining" | "wellness" | "catering" | "av" | "events";
  active: boolean;
}

export interface DayAvailability {
  royal: number;
  presidential: number;
  priceMultiplier: number;
}

export interface TourismPackage {
  id: string;
  title: Localised;
  duration: Localised;
  description: Localised;
  priceUsd: number;
  category: "nature" | "culture" | "history" | "spiritual" | "multi-day";
}

export interface TransportRoute {
  id: string;
  title: Localised;
  duration: Localised;
  description: Localised;
  priceUsd: number;
  category: "airport" | "regional" | "private";
}

export interface Inventory {
  hotels: Hotel[];
  roomTypes: RoomType[];
  rooms: Room[];
  conferenceRooms: ConferenceRoom[];
  addons: Addon[];
  availability: Record<string, DayAvailability>;
  tourismPackages?: TourismPackage[];
  transportRoutes?: TransportRoute[];
}

// ── Cache ─────────────────────────────────────────────────────────────────

let cachedInventory: Inventory | null = null;

// ── Inventory ─────────────────────────────────────────────────────────────

export async function readInventory(): Promise<Inventory> {
  if (cachedInventory) return cachedInventory;
  try {
    const raw = await fs.readFile(INVENTORY_PATH, "utf8");
    cachedInventory = JSON.parse(raw) as Inventory;
    return cachedInventory;
  } catch {
    cachedInventory = {
      hotels: [],
      roomTypes: [],
      rooms: [],
      conferenceRooms: [],
      addons: [],
      availability: {},
    };
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
    return false;
  }
}

export async function getHotel(hotelId: string): Promise<Hotel | null> {
  const inv = await readInventory();
  return inv.hotels.find((h) => h.id === hotelId) ?? null;
}

export async function listRoomTypes(hotelId: string): Promise<RoomType[]> {
  const inv = await readInventory();
  return inv.roomTypes.filter((rt) => rt.hotelId === hotelId);
}

export async function getRoomType(id: string): Promise<RoomType | null> {
  const inv = await readInventory();
  return inv.roomTypes.find((rt) => rt.id === id) ?? null;
}
