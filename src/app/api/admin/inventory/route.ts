import { isAdmin } from "@/lib/admin-auth";
import { readInventory, writeInventory, type Inventory } from "@/lib/data";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdmin())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const inv = await readInventory();
  return Response.json(inv);
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as Inventory;
  const persisted = await writeInventory(body);
  return Response.json({ ok: true, persisted });
}
