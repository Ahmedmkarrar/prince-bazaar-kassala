import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { readInquiries, readInventory } from "@/lib/data";
import { AdminDashboard } from "./dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
  const [inventory, inquiries] = await Promise.all([readInventory(), readInquiries()]);
  return <AdminDashboard initialInventory={inventory} initialInquiries={inquiries} />;
}
