import { NextResponse } from "next/server";
import { readInventory } from "@/lib/data";

export const dynamic = "force-dynamic";

// GET /api/journey
// Returns the tourism packages, transport routes and hotel contact info
// for the journey planner UI. Pure data — no inputs, no auth.
export async function GET() {
  const inv = await readInventory();
  const hotel = inv.hotels[0] ?? null;
  return NextResponse.json({
    hotel,
    tourismPackages: inv.tourismPackages ?? [],
    transportRoutes: inv.transportRoutes ?? [],
  });
}
