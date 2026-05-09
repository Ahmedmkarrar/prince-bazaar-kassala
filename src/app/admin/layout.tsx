import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Prince Bazaar — Operations",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen" style={{ background: "var(--color-bone-soft)" }}>{children}</div>;
}
