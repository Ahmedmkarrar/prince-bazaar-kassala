import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { readBookings } from "@/lib/data";
import { AdminShell } from "../components/Shell";
import { BookingsView } from "../components/BookingsView";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
  const bookings = await readBookings();
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  return (
    <AdminShell pendingCount={pendingCount}>
      <BookingsView />
    </AdminShell>
  );
}
