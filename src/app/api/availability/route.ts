import { availabilityFor, readInventory } from "@/lib/data";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const checkIn = url.searchParams.get("checkIn");
  const checkOut = url.searchParams.get("checkOut");

  if (!checkIn || !checkOut) {
    const inv = await readInventory();
    return Response.json({
      rooms: inv.rooms,
      conferenceRooms: inv.conferenceRooms,
      addons: inv.addons.filter((a) => a.active),
    });
  }

  const result = await availabilityFor(checkIn, checkOut);
  return Response.json(result);
}
