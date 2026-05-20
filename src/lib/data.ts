// Data layer for hotel + booking inventory.
// Stores everything in /data JSON files. Designed multi-property from day one.
// When Supabase is provisioned (see supabase/migrations/0001_init.sql), the
// read/write helpers below are the only thing that needs swapping — everything
// upstream stays.

import { promises as fs } from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");
const INVENTORY_PATH = path.join(DATA_DIR, "inventory.json");
const INQUIRIES_PATH = path.join(DATA_DIR, "inquiries.json");
const BOOKINGS_PATH = path.join(DATA_DIR, "bookings.json");

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

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "checked_in"
  | "checked_out"
  | "cancelled"
  | "no_show";

export interface Booking {
  id: string;
  reference: string;
  hotelId: string;
  roomTypeId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestLanguage: "en" | "ar";
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  baseTotal: number;
  addonsTotal: number;
  grandTotal: number;
  currency: string;
  addons: { id: string; name: string; price: number }[];
  specialRequests?: string;
  status: BookingStatus;
  whatsappOpenedAt?: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// ── Cache ─────────────────────────────────────────────────────────────────

let cachedInventory: Inventory | null = null;
let cachedInquiries: Inquiry[] | null = null;
let cachedBookings: Booking[] | null = null;

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

// ── Inquiries (legacy, kept working) ─────────────────────────────────────

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

// ── Bookings ─────────────────────────────────────────────────────────────

export async function readBookings(): Promise<Booking[]> {
  if (cachedBookings) return cachedBookings;
  try {
    const raw = await fs.readFile(BOOKINGS_PATH, "utf8");
    cachedBookings = JSON.parse(raw) as Booking[];
    return cachedBookings;
  } catch {
    cachedBookings = [];
    return cachedBookings;
  }
}

export async function writeBookings(list: Booking[]): Promise<boolean> {
  cachedBookings = list;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(BOOKINGS_PATH, JSON.stringify(list, null, 2), "utf8");
    return true;
  } catch {
    return false;
  }
}

export async function createBooking(
  input: Omit<Booking, "id" | "reference" | "createdAt" | "updatedAt" | "status">,
  options: { status?: BookingStatus } = {},
): Promise<Booking> {
  const list = await readBookings();
  const now = new Date().toISOString();
  const seq = String(list.length + 1).padStart(5, "0");
  const year = new Date().getFullYear();
  const booking: Booking = {
    ...input,
    id: `bk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    reference: `PP-${year}-${seq}`,
    status: options.status ?? "pending",
    createdAt: now,
    updatedAt: now,
  };
  list.unshift(booking);
  await writeBookings(list);
  return booking;
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
  internalNotes?: string,
): Promise<Booking | null> {
  const list = await readBookings();
  const idx = list.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  list[idx] = {
    ...list[idx],
    status,
    internalNotes: internalNotes ?? list[idx].internalNotes,
    updatedAt: new Date().toISOString(),
  };
  await writeBookings(list);
  return list[idx];
}

// ── Availability (live calc from bookings + inventory) ──────────────────

export async function checkAvailability(
  hotelId: string,
  checkIn: string,
  checkOut: string,
): Promise<{
  nights: number;
  options: Array<{
    roomTypeId: string;
    name: Localised;
    shortName: Localised;
    description: Localised;
    view: Localised;
    capacity: number;
    sqm: number;
    image: string;
    nightlyRate: number;
    totalPrice: number;
    currency: string;
    unitsAvailable: number;
    available: boolean;
  }>;
  error?: string;
}> {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return { nights: 0, options: [], error: "Invalid date range" };
  }
  const nights = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  const roomTypes = await listRoomTypes(hotelId);
  const bookings = await readBookings();

  // For each room type, count overlapping non-cancelled bookings.
  const overlaps = (b: Booking) => {
    if (b.hotelId !== hotelId) return false;
    if (b.status === "cancelled" || b.status === "no_show") return false;
    const bStart = new Date(b.checkIn);
    const bEnd = new Date(b.checkOut);
    return bStart < end && bEnd > start;
  };

  const options = roomTypes.map((rt) => {
    const used = bookings.filter((b) => overlaps(b) && b.roomTypeId === rt.id).length;
    const unitsAvailable = Math.max(0, rt.totalUnits - used);
    return {
      roomTypeId: rt.id,
      name: rt.name,
      shortName: rt.shortName,
      description: rt.description,
      view: rt.view,
      capacity: rt.capacity,
      sqm: rt.sqm,
      image: rt.image,
      nightlyRate: rt.basePrice,
      totalPrice: rt.basePrice * nights,
      currency: rt.currency,
      unitsAvailable,
      available: unitsAvailable > 0,
    };
  });

  return { nights, options };
}

// ── Legacy compatibility (used by /api/availability + concierge tool) ───

export async function availabilityFor(checkIn: string, checkOut: string) {
  const result = await checkAvailability("prince-plaza-kassala", checkIn, checkOut);
  if (result.error) return { error: result.error };
  return {
    nights: result.nights,
    days: [],
    options: result.options.map((o) => ({
      id: o.roomTypeId,
      name: o.name.en,
      description: o.description.en,
      view: o.view.en,
      available: o.available,
      nightlyFromUSD: o.nightlyRate,
      totalUSD: o.totalPrice,
    })),
  };
}
