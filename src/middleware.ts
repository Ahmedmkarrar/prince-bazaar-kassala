import { NextResponse, type NextRequest } from "next/server";

// Middleware sits in front of every request. We use it for:
//   1. Stripping path-traversal attempts before they reach handlers.
//   2. Adding a few defence-in-depth headers (CSP nonces / per-route caching
//      tweaks live in next.config.ts).
//   3. Forwarding the real client IP via `x-pb-ip` so route handlers don't
//      need to re-parse `x-forwarded-for`.
//
// Heavy rate limiting happens INSIDE each API route (so the limit is per
// endpoint, not global). See `src/lib/rate-limit.ts`.

export function middleware(request: NextRequest) {
  const url = new URL(request.url);

  // Block obvious path-traversal attempts.
  if (url.pathname.includes("..") || url.pathname.includes("//")) {
    return new NextResponse("Bad request", { status: 400 });
  }

  // Forward client IP cleanly to handlers.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pb-ip", ip);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Run on all paths EXCEPT static assets so it stays fast.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sudan/|logos/|sectors/|.*\\.(?:png|jpg|jpeg|svg|webp|ico|css|js|woff2?)$).*)",
  ],
};
