import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { readBookings, readInventory } from "@/lib/data";
import { AdminShell } from "../components/Shell";
import { CalendarView } from "../components/CalendarView";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
  const [bookings, inventory] = await Promise.all([readBookings(), readInventory()]);
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  return (
    <AdminShell pendingCount={pendingCount}>
      <CalendarView
        roomTypes={inventory.roomTypes.map((rt) => ({
          id: rt.id,
          name: rt.name.en,
          totalUnits: rt.totalUnits,
        }))}
        initialBookings={bookings}
      />
    </AdminShell>
  );
}
