// In-memory IP-based rate limiter.
// Each instance has its own counter — fine for a single-region small site.
// When traffic grows, swap the `hits` Map for Upstash Redis (drop-in replacement).

type Window = { count: number; resetAt: number };
const hits = new Map<string, Window>();

// Sweep expired entries every minute so the map doesn't grow unbounded.
if (typeof globalThis !== "undefined" && !(globalThis as { __pb_sweep?: boolean }).__pb_sweep) {
  (globalThis as { __pb_sweep?: boolean }).__pb_sweep = true;
  setInterval(() => {
    const now = Date.now();
    for (const [k, w] of hits) {
      if (w.resetAt < now) hits.delete(k);
    }
  }, 60_000);
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  resetIn: number;
}

/**
 * @param key      Combination of identifier + bucket name, e.g. `"booking:1.2.3.4"`.
 * @param limit    Max requests allowed in the window.
 * @param windowMs Window length in ms.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = hits.get(key);
  if (!existing || existing.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, resetIn: windowMs };
  }
  existing.count += 1;
  const remaining = Math.max(0, limit - existing.count);
  return { ok: existing.count <= limit, remaining, resetIn: existing.resetAt - now };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export function rateLimitResponse(result: RateLimitResult): Response {
  return new Response(
    JSON.stringify({
      error: "Too many requests. Please try again in a moment.",
      retryAfter: Math.ceil(result.resetIn / 1000),
    }),
    {
      status: 429,
      headers: {
        "content-type": "application/json",
        "retry-after": String(Math.ceil(result.resetIn / 1000)),
      },
    },
  );
}
