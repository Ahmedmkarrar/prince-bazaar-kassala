import { cookies } from "next/headers";

export const runtime = "nodejs";

const ADMIN_COOKIE = "pb_admin";
const ONE_DAY = 60 * 60 * 24;

function expectedToken(): string {
  return process.env.ADMIN_TOKEN ?? "shahad2026";
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { token?: string };
  if (body.token !== expectedToken()) {
    return Response.json({ ok: false, error: "Invalid token" }, { status: 401 });
  }
  const jar = await cookies();
  jar.set({
    name: ADMIN_COOKIE,
    value: body.token,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: ONE_DAY,
  });
  return Response.json({ ok: true });
}

export async function GET() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  return Response.json({ authenticated: token === expectedToken() });
}
