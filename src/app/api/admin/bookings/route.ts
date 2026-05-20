import { NextResponse } from "next/server";
import {
  checkAvailability,
  createBooking,
  getHotel,
  getRoomType,
  readBookings,
  readInventory,
  updateBookingStatus,
  type BookingStatus,
} from "@/lib/data";
import { isAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES: BookingStatus[] = [
  "pending",
  "confirmed",
  "checked_in",
  "checked_out",
  "cancelled",
  "no_show",
];

export async function GET(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const statusParam = searchParams.get("status");
  const hotelId = searchParams.get("hotelId");
  const q = searchParams.get("q")?.toLowerCase().trim() ?? "";

  const all = await readBookings();
  let filtered = all;
  if (statusParam && STATUSES.includes(statusParam as BookingStatus)) {
    filtered = filtered.filter((b) => b.status === statusParam);
  }
  if (hotelId) {
    filtered = filtered.filter((b) => b.hotelId === hotelId);
  }
  if (q) {
    filtered = filtered.filter(
      (b) =>
        b.reference.toLowerCase().includes(q) ||
        b.guestName.toLowerCase().includes(q) ||
        b.guestEmail.toLowerCase().includes(q) ||
        b.guestPhone.toLowerCase().includes(q),
    );
  }

  // Summary KPIs across the unfiltered set so the dashboard reflects reality.
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const summary = {
    total: all.length,
    pending: all.filter((b) => b.status === "pending").length,
    confirmed: all.filter((b) => b.status === "confirmed").length,
    checkedIn: all.filter((b) => b.status === "checked_in").length,
    cancelled: all.filter((b) => b.status === "cancelled").length,
    last24h: all.filter((b) => now - new Date(b.createdAt).getTime() < dayMs).length,
    last7d: all.filter((b) => now - new Date(b.createdAt).getTime() < 7 * dayMs).length,
    revenuePendingUsd: all
      .filter((b) => b.status === "pending")
      .reduce((s, b) => s + b.grandTotal, 0),
    revenueConfirmedUsd: all
      .filter((b) => b.status === "confirmed" || b.status === "checked_in" || b.status === "checked_out")
      .reduce((s, b) => s + b.grandTotal, 0),
  };

  return NextResponse.json({
    summary,
    bookings: filtered.slice(0, 200),
    statuses: STATUSES,
  });
}

// POST — manual booking creation by staff.
// Staff often creates walk-ins, phone bookings, or override-booked stays —
// we let them choose the initial status and bypass the rate limit.
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    hotelId?: string;
    roomTypeId?: string;
    guestName?: string;
    guestEmail?: string;
    guestPhone?: string;
    guestLanguage?: "en" | "ar";
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    addonIds?: string[];
    specialRequests?: string;
    internalNotes?: string;
    status?: BookingStatus;
    overrideAvailability?: boolean;
  };

  const hotelId = body.hotelId ?? "prince-plaza-kassala";
  const roomTypeId = body.roomTypeId;
  const guestName = body.guestName?.trim();
  const guestEmail = body.guestEmail?.trim();
  const guestPhone = body.guestPhone?.trim();
  const checkIn = body.checkIn;
  const checkOut = body.checkOut;
  const guests = Math.min(20, Math.max(1, Math.floor(Number(body.guests) || 1)));
  const guestLanguage = body.guestLanguage === "ar" ? "ar" : "en";
  const status = STATUSES.includes(body.status as BookingStatus)
    ? (body.status as BookingStatus)
    : "confirmed";

  if (!roomTypeId || !guestName || !guestEmail || !guestPhone || !checkIn || !checkOut) {
    return NextResponse.json({ error: "Missing required field" }, { status: 400 });
  }
  if (new Date(checkOut) <= new Date(checkIn)) {
    return NextResponse.json({ error: "Check-out must be after check-in" }, { status: 400 });
  }

  const hotel = await getHotel(hotelId);
  const roomType = await getRoomType(roomTypeId);
  if (!hotel || !roomType) {
    return NextResponse.json({ error: "Unknown hotel or room type" }, { status: 404 });
  }

  // Availability check — staff CAN override (rare cases: comp stays, overbooking
  // a relocated guest, etc.). Otherwise we block to keep occupancy sane.
  const avail = await checkAvailability(hotelId, checkIn, checkOut);
  const option = avail.options.find((o) => o.roomTypeId === roomTypeId);
  if (!option) {
    return NextResponse.json({ error: "Room type not bookable" }, { status: 400 });
  }
  if (!option.available && !body.overrideAvailability) {
    return NextResponse.json(
      {
        error: "No units available for the selected dates",
        canOverride: true,
        unitsAvailable: option.unitsAvailable,
      },
      { status: 409 },
    );
  }

  // Add-ons
  const inv = await readInventory();
  const addonIds = Array.isArray(body.addonIds) ? body.addonIds : [];
  const addons = inv.addons
    .filter((a) => a.active && addonIds.includes(a.id))
    .map((a) => ({
      id: a.id,
      name: typeof a.name === "string" ? a.name : a.name[guestLanguage] ?? a.name.en,
      price: a.price,
    }));
  const addonsTotal = addons.reduce((s, a) => s + a.price, 0);
  const baseTotal = option.nightlyRate * avail.nights;
  const grandTotal = baseTotal + addonsTotal;

  const booking = await createBooking(
    {
      hotelId,
      roomTypeId,
      guestName,
      guestEmail,
      guestPhone,
      guestLanguage,
      checkIn,
      checkOut,
      nights: avail.nights,
      guests,
      baseTotal,
      addonsTotal,
      grandTotal,
      currency: option.currency,
      addons,
      specialRequests: body.specialRequests?.slice(0, 1000) ?? "",
      internalNotes: body.internalNotes?.slice(0, 2000) ?? "Manually created by staff",
    },
    { status },
  );

  return NextResponse.json({ booking });
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    id?: string;
    status?: string;
    internalNotes?: string;
  };

  if (!body.id) {
    return NextResponse.json({ error: "Missing booking id" }, { status: 400 });
  }
  if (!body.status || !STATUSES.includes(body.status as BookingStatus)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updated = await updateBookingStatus(
    body.id,
    body.status as BookingStatus,
    typeof body.internalNotes === "string" ? body.internalNotes.slice(0, 2000) : undefined,
  );
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ booking: updated });
}
