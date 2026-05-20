import { NextResponse } from "next/server";
import { readBookings } from "@/lib/data";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/booking/PP-2026-00001?email=guest@example.com
//
// Light-auth lookup: requires both the booking reference AND the guest email
// on the booking. Stops a stranger from enumerating reference numbers.
export async function GET(
  request: Request,
  context: { params: Promise<{ reference: string }> },
) {
  const ip = request.headers.get("x-pb-ip") ?? "unknown";
  const limit = rateLimit(`booking-lookup:${ip}`, 20, 10 * 60_000);
  if (!limit.ok) return rateLimitResponse(limit);

  const { reference } = await context.params;
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.trim().toLowerCase() ?? "";

  if (!reference || !email) {
    return NextResponse.json({ error: "Reference and email required" }, { status: 400 });
  }

  const all = await readBookings();
  const booking = all.find(
    (b) =>
      b.reference.toLowerCase() === reference.toLowerCase() &&
      b.guestEmail.toLowerCase() === email,
  );

  if (!booking) {
    // Same response shape whether the reference exists or not — prevents enumeration.
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({ booking });
}
