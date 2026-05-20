"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "▦" },
  { href: "/admin/bookings", label: "Bookings", icon: "✉" },
  { href: "/admin/calendar", label: "Calendar", icon: "▤" },
  { href: "/admin/rooms", label: "Rooms & Rates", icon: "❑" },
  { href: "/admin/addons", label: "Add-ons", icon: "+" },
  { href: "/admin/settings", label: "Settings", icon: "⚙" },
];

export function AdminShell({
  children,
  pendingCount,
}: {
  children: React.ReactNode;
  pendingCount?: number;
}) {
  const path = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [now, setNow] = useState("");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const t = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Africa/Khartoum",
      }).format(d);
      setNow(t);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="flex min-h-screen" style={{ background: "#0E0719", color: "var(--color-ivory)" }}>
      {/* Sidebar */}
      <aside
        className="sticky top-0 flex h-screen flex-col border-r"
        style={{
          width: collapsed ? 72 : 240,
          background: "#14101C",
          borderColor: "rgba(233,199,123,0.12)",
          transition: "width 0.2s ease",
        }}
      >
        <div className="flex items-center justify-between px-5 py-5">
          {!collapsed ? (
            <div>
              <div className="font-display text-[20px]" style={{ color: "#FFFFFF" }}>
                Prince Plaza
              </div>
              <div
                className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "var(--color-gold-soft)" }}
              >
                Operations
              </div>
            </div>
          ) : (
            <div
              className="h-9 w-9 rounded-full"
              style={{
                background: "linear-gradient(135deg, var(--color-gold-soft) 0%, var(--color-gold) 100%)",
              }}
            />
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="text-[12px]"
            style={{ color: "rgba(255,252,245,0.5)" }}
            aria-label="Toggle sidebar"
          >
            {collapsed ? "›" : "‹"}
          </button>
        </div>

        <nav className="flex-1 px-3 py-2">
          {NAV.map((item) => {
            const active = path === item.href || path?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group mb-1 flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] transition-colors"
                style={{
                  background: active ? "rgba(233, 199, 123, 0.10)" : "transparent",
                  color: active ? "var(--color-gold-soft)" : "rgba(255,252,245,0.7)",
                  borderLeft: active ? "2px solid var(--color-gold)" : "2px solid transparent",
                }}
              >
                <span className="inline-block w-5 text-center text-[14px]" aria-hidden>
                  {item.icon}
                </span>
                {!collapsed ? (
                  <span className="flex-1 font-medium tracking-wide">{item.label}</span>
                ) : null}
                {!collapsed && item.href === "/admin/bookings" && pendingCount && pendingCount > 0 ? (
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{ background: "var(--color-gold)", color: "#14101C" }}
                  >
                    {pendingCount}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="border-t px-5 py-4" style={{ borderColor: "rgba(233,199,123,0.10)" }}>
          {!collapsed ? (
            <div className="mb-3 text-[10px]" style={{ color: "rgba(255,252,245,0.4)" }}>
              <div className="font-medium uppercase tracking-[0.28em]">Kassala</div>
              <div className="mt-1 font-display text-[14px]" style={{ color: "var(--color-gold-soft)" }}>
                {now || "—"} · CAT
              </div>
            </div>
          ) : null}
          <button
            onClick={logout}
            className="w-full rounded-md px-3 py-2 text-left text-[12px] transition-colors hover:bg-white/5"
            style={{ color: "rgba(255,252,245,0.7)" }}
          >
            {collapsed ? "⎋" : "Sign out"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-[1400px] px-8 py-10">{children}</div>
      </main>
    </div>
  );
}
