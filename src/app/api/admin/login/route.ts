import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyToken } from "@/lib/admin-auth";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ONE_DAY = 60 * 60 * 24;

export async function POST(req: Request) {
  const ip = req.headers.get("x-pb-ip") ?? "unknown";

  // Tight: 5 failed attempts per 15 min per IP.
  const limit = rateLimit(`admin-login:${ip}`, 5, 15 * 60_000);
  if (!limit.ok) return rateLimitResponse(limit);

  const body = (await req.json().catch(() => ({}))) as { token?: string };
  const token = typeof body.token === "string" ? body.token : "";

  if (!verifyToken(token)) {
    return Response.json({ ok: false, error: "Invalid token" }, { status: 401 });
  }

  const jar = await cookies();
  jar.set({
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ONE_DAY,
  });
  return Response.json({ ok: true });
}

export async function GET() {
  const jar = await cookies();
  const value = jar.get(ADMIN_COOKIE)?.value;
  return Response.json({ authenticated: verifyToken(value) });
}
