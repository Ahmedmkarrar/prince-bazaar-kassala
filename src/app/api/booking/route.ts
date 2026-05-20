import { NextResponse } from "next/server";
import { checkAvailability, createBooking, getHotel, getRoomType, readInventory } from "@/lib/data";
import { bookingMessage, whatsappLink } from "@/lib/whatsapp";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

// ── Validation helpers (zero-dependency, strict) ────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-()]{7,20}$/;
const ID_RE = /^[a-z0-9-]{1,40}$/i;
const HTML_RE = /<[^>]*>/g; // strip any HTML tags

function sanitiseString(input: unknown, maxLen: number): string | null {
  if (typeof input !== "string") return null;
  // Strip control chars + HTML, trim, cap length.
  const cleaned = input.replace(HTML_RE, "").replace(/[\x00-\x1F\x7F]/g, "").trim();
  if (cleaned.length === 0) return null;
  return cleaned.slice(0, maxLen);
}

function isValidIsoDate(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(s);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

function daysFromNow(iso: string): number {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const target = new Date(iso);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

// ── GET availability ────────────────────────────────────────────────────

export async function GET(request: Request) {
  const ip = request.headers.get("x-pb-ip") ?? "unknown";
  const limit = rateLimit(`avail:${ip}`, 60, 60_000); // 60 reqs/min per IP
  if (!limit.ok) return rateLimitResponse(limit);

  const { searchParams } = new URL(request.url);
  const hotelId = sanitiseString(searchParams.get("hotelId") ?? "prince-plaza-kassala", 40);
  const checkIn = searchParams.get("checkIn") ?? "";
  const checkOut = searchParams.get("checkOut") ?? "";

  if (!hotelId || !ID_RE.test(hotelId)) {
    return NextResponse.json({ error: "Invalid hotelId" }, { status: 400 });
  }
  if (!isValidIsoDate(checkIn) || !isValidIsoDate(checkOut)) {
    return NextResponse.json({ error: "Invalid date format (use YYYY-MM-DD)" }, { status: 400 });
  }
  if (daysFromNow(checkIn) < 0) {
    return NextResponse.json({ error: "Check-in cannot be in the past" }, { status: 400 });
  }
  if (daysFromNow(checkIn) > 365) {
    return NextResponse.json({ error: "Check-in must be within the next 365 days" }, { status: 400 });
  }

  const result = await checkAvailability(hotelId, checkIn, checkOut);
  const inv = await readInventory();
  const hotel = inv.hotels.find((h) => h.id === hotelId);
  return NextResponse.json({
    hotel,
    ...result,
    addons: inv.addons.filter((a) => a.active),
  });
}

// ── POST create booking ─────────────────────────────────────────────────

export async function POST(request: Request) {
  const ip = request.headers.get("x-pb-ip") ?? "unknown";

  // Tight: 5 booking attempts per 10 min per IP.
  const limit = rateLimit(`booking:${ip}`, 5, 10 * 60_000);
  if (!limit.ok) return rateLimitResponse(limit);

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — real users never fill this; bots usually do.
  // If `_hp` is present and non-empty, accept the request silently and drop it.
  if (typeof payload._hp === "string" && payload._hp.trim().length > 0) {
    return NextResponse.json({ booking: null, whatsapp: null }, { status: 202 });
  }

  // ── Strict input validation ──────────────────────────────────────────
  const hotelId = sanitiseString(payload.hotelId ?? "prince-plaza-kassala", 40);
  const roomTypeId = sanitiseString(payload.roomTypeId, 40);
  const guestName = sanitiseString(payload.guestName, 120);
  const guestEmail = sanitiseString(payload.guestEmail, 200);
  const guestPhone = sanitiseString(payload.guestPhone, 30);
  const checkIn = typeof payload.checkIn === "string" ? payload.checkIn : "";
  const checkOut = typeof payload.checkOut === "string" ? payload.checkOut : "";
  const specialRequests = sanitiseString(payload.specialRequests ?? "", 1000) ?? "";
  const guestLanguage = payload.guestLanguage === "ar" ? "ar" : "en";
  const guests = Math.min(20, Math.max(1, Math.floor(Number(payload.guests) || 1)));

  // Format checks
  if (!hotelId || !ID_RE.test(hotelId)) {
    return NextResponse.json({ error: "Invalid hotel" }, { status: 400 });
  }
  if (!roomTypeId || !ID_RE.test(roomTypeId)) {
    return NextResponse.json({ error: "Please select a room type" }, { status: 400 });
  }
  if (!guestName || guestName.length < 2) {
    return NextResponse.json({ error: "Please enter your full name" }, { status: 400 });
  }
  if (!guestEmail || !EMAIL_RE.test(guestEmail)) {
    return NextResponse.json({ error: "Please enter a valid email" }, { status: 400 });
  }
  if (!guestPhone || !PHONE_RE.test(guestPhone)) {
    return NextResponse.json({ error: "Please enter a valid phone number" }, { status: 400 });
  }
  if (!isValidIsoDate(checkIn) || !isValidIsoDate(checkOut)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }
  if (new Date(checkOut) <= new Date(checkIn)) {
    return NextResponse.json({ error: "Check-out must be after check-in" }, { status: 400 });
  }
  if (daysFromNow(checkIn) < 0) {
    return NextResponse.json({ error: "Check-in cannot be in the past" }, { status: 400 });
  }
  if (daysFromNow(checkIn) > 365 || daysFromNow(checkOut) > 380) {
    return NextResponse.json({ error: "Bookings must be within the next year" }, { status: 400 });
  }

  const addonIdsRaw = Array.isArray(payload.addonIds) ? payload.addonIds.slice(0, 20) : [];
  const addonIds = addonIdsRaw
    .map((id) => sanitiseString(id, 40))
    .filter((id): id is string => typeof id === "string" && ID_RE.test(id));

  // ── Lookup + availability ────────────────────────────────────────────
  const hotel = await getHotel(hotelId);
  const roomType = await getRoomType(roomTypeId);
  if (!hotel || !roomType) {
    return NextResponse.json({ error: "Unknown hotel or room type" }, { status: 404 });
  }

  const result = await checkAvailability(hotelId, checkIn, checkOut);
  if (result.error) return NextResponse.json({ error: result.error }, { status: 400 });
  const option = result.options.find((o) => o.roomTypeId === roomTypeId);
  if (!option || !option.available) {
    return NextResponse.json({ error: "No units available for the selected dates" }, { status: 409 });
  }

  // ── Resolve add-ons + totals ─────────────────────────────────────────
  const inv = await readInventory();
  const addons = inv.addons
    .filter((a) => a.active && addonIds.includes(a.id))
    .map((a) => ({
      id: a.id,
      name: typeof a.name === "string" ? a.name : a.name[guestLanguage] ?? a.name.en,
      price: a.price,
    }));
  const addonsTotal = addons.reduce((s, a) => s + a.price, 0);
  const baseTotal = option.nightlyRate * result.nights;
  const grandTotal = baseTotal + addonsTotal;

  // ── Persist + build handoff ──────────────────────────────────────────
  const booking = await createBooking({
    hotelId,
    roomTypeId,
    guestName,
    guestEmail,
    guestPhone,
    guestLanguage,
    checkIn,
    checkOut,
    nights: result.nights,
    guests,
    baseTotal,
    addonsTotal,
    grandTotal,
    currency: option.currency,
    addons,
    specialRequests,
  });

  const message = bookingMessage(booking, hotel, guestLanguage);
  const whatsappUrl = whatsappLink(hotel.whatsapp, message);

  return NextResponse.json({
    booking,
    whatsapp: { url: whatsappUrl, phone: hotel.whatsapp },
    callPhone: hotel.phone,
    email: hotel.email,
  });
}
