import { redirect } from "next/navigation";
import { isAdmin, isUsingDefaultToken } from "@/lib/admin-auth";
import { readBookings, readInventory } from "@/lib/data";
import { AdminShell } from "../components/Shell";
import { SettingsView } from "../components/SettingsView";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
  const [bookings, inventory] = await Promise.all([readBookings(), readInventory()]);
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  return (
    <AdminShell pendingCount={pendingCount}>
      <SettingsView
        hotels={inventory.hotels}
        usingDefaultToken={isUsingDefaultToken()}
        bookingsCount={bookings.length}
      />
    </AdminShell>
  );
}
