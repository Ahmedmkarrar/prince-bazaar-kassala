import { cookies } from "next/headers";

export async function isAdmin(): Promise<boolean> {
  const expected = process.env.ADMIN_TOKEN ?? "shahad2026";
  const jar = await cookies();
  return jar.get("pb_admin")?.value === expected;
}
