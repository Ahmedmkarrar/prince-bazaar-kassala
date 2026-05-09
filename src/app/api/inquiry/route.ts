import { appendInquiry, type Inquiry } from "@/lib/data";

export const runtime = "nodejs";

interface InquiryBody {
  name?: string;
  email?: string;
  phone?: string;
  category?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  message?: string;
  conferenceRoom?: string;
  addons?: string[];
}

export async function POST(req: Request) {
  const body = (await req.json()) as InquiryBody;

  if (!body.name || !body.email) {
    return Response.json({ error: "name and email required" }, { status: 400 });
  }

  const reference = `PB-${Date.now().toString(36).toUpperCase()}`;
  const inquiry: Inquiry = {
    id: reference,
    name: body.name,
    email: body.email,
    phone: body.phone,
    category: body.category ?? "general",
    checkIn: body.checkIn,
    checkOut: body.checkOut,
    guests: body.guests,
    message: body.message ?? "",
    conferenceRoom: body.conferenceRoom,
    addons: body.addons,
    ts: new Date().toISOString(),
  };

  await appendInquiry(inquiry);

  return Response.json({
    status: "received",
    reference,
    message: "Thank you. Our reservations team will respond within 4 hours.",
  });
}
