import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { LoginForm } from "./form";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdmin()) {
    redirect("/admin");
  }
  return <LoginForm />;
}
