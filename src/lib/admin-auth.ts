import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Default token is a clear placeholder. Production deploys MUST set ADMIN_TOKEN
 * to a long random string (32+ chars). We hash both sides before comparing so
 * we never compare raw secrets in memory, and we use constant-time comparison
 * to defeat timing attacks.
 */
const DEFAULT_PLACEHOLDER = "shahad2026-replace-me";

function expectedToken(): string {
  return process.env.ADMIN_TOKEN ?? DEFAULT_PLACEHOLDER;
}

export const ADMIN_COOKIE = "pb_admin";

/** SHA-256 hex, lowercase. */
export function hashToken(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

/** Constant-time equality on two fixed-length hex strings. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
}

export function verifyToken(candidate: string | undefined | null): boolean {
  if (!candidate || typeof candidate !== "string") return false;
  if (candidate.length > 256) return false; // defensive cap
  return safeEqual(hashToken(candidate), hashToken(expectedToken()));
}

export async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return verifyToken(jar.get(ADMIN_COOKIE)?.value);
}

/** True when admin auth is still on the default placeholder. */
export function isUsingDefaultToken(): boolean {
  return expectedToken() === DEFAULT_PLACEHOLDER;
}
