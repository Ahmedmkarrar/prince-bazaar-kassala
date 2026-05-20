import { appendInquiry, type Inquiry } from "@/lib/data";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HTML_RE = /<[^>]*>/g;

function clean(input: unknown, maxLen: number): string | undefined {
  if (typeof input !== "string") return undefined;
  const out = input.replace(HTML_RE, "").replace(/[\x00-\x1F\x7F]/g, "").trim();
  if (!out) return undefined;
  return out.slice(0, maxLen);
}

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
  _hp?: string;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-pb-ip") ?? "unknown";
  const limit = rateLimit(`inquiry:${ip}`, 8, 10 * 60_000);
  if (!limit.ok) return rateLimitResponse(limit);

  const body = ((await req.json().catch(() => ({}))) as InquiryBody) ?? {};

  // Honeypot — bots fill `_hp`, real users don't.
  if (typeof body._hp === "string" && body._hp.trim().length > 0) {
    return Response.json({ status: "received", reference: "ignored" }, { status: 202 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);

  if (!name || !email || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Valid name and email are required" }, { status: 400 });
  }

  const reference = `PB-${Date.now().toString(36).toUpperCase()}`;
  const inquiry: Inquiry = {
    id: reference,
    name,
    email,
    phone: clean(body.phone, 30),
    category: clean(body.category, 40) ?? "general",
    checkIn: clean(body.checkIn, 10),
    checkOut: clean(body.checkOut, 10),
    guests: typeof body.guests === "number" ? Math.min(50, Math.max(1, Math.floor(body.guests))) : undefined,
    message: clean(body.message, 2000) ?? "",
    conferenceRoom: clean(body.conferenceRoom, 40),
    addons: Array.isArray(body.addons)
      ? body.addons.slice(0, 20).map((a) => clean(a, 40)).filter((a): a is string => !!a)
      : undefined,
    ts: new Date().toISOString(),
  };

  await appendInquiry(inquiry);

  return Response.json({
    status: "received",
    reference,
    message: "Thank you. Our reservations team will respond within 4 hours.",
  });
}
