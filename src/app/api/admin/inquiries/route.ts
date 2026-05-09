import { isAdmin } from "@/lib/admin-auth";
import { readInquiries } from "@/lib/data";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdmin())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const inquiries = await readInquiries();
  return Response.json({ inquiries });
}
