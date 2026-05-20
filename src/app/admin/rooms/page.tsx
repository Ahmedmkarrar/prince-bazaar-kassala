import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { readBookings, readInventory } from "@/lib/data";
import { AdminShell } from "../components/Shell";
import { RoomsView } from "../components/RoomsView";

export const dynamic = "force-dynamic";

export default async function RoomsPage() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
  const [bookings, inventory] = await Promise.all([readBookings(), readInventory()]);
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  return (
    <AdminShell pendingCount={pendingCount}>
      <RoomsView initial={inventory.roomTypes} />
    </AdminShell>
  );
}
