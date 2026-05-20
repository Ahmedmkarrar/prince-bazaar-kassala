"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Booking } from "@/lib/data";

interface Summary {
  total: number;
  pending: number;
  confirmed: number;
  checkedIn: number;
  cancelled: number;
  last24h: number;
  last7d: number;
  revenuePendingUsd: number;
  revenueConfirmedUsd: number;
}

interface ApiResponse {
  summary: Summary;
  bookings: Booking[];
}

const POLL_MS = 15_000;

export function DashboardView() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [lastPolled, setLastPolled] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/admin/bookings", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as ApiResponse;
        if (!cancelled) {
          setData(json);
          setLastPolled(new Date());
        }
      } catch {
        // ignore — keep showing stale
      }
    }
    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const s = data?.summary;
  const recent = data?.bookings.slice(0, 8) ?? [];

  return (
    <div>
      <Header
        title="Dashboard"
        subtitle="Live operations overview · auto-refreshes every 15s"
        lastPolled={lastPolled}
      />

      {/* KPI Grid */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi label="Total bookings" value={s?.total ?? 0} accent="ivory" />
        <Kpi label="Pending" value={s?.pending ?? 0} accent="gold" highlight />
        <Kpi label="Confirmed" value={s?.confirmed ?? 0} accent="emerald" />
        <Kpi label="Checked-in" value={s?.checkedIn ?? 0} accent="purple" />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Kpi label="New · last 24h" value={s?.last24h ?? 0} accent="ivory" />
        <Kpi label="New · last 7d" value={s?.last7d ?? 0} accent="ivory" />
        <Kpi
          label="Pending revenue · USD"
          value={s?.revenuePendingUsd ?? 0}
          accent="gold"
          money
        />
        <Kpi
          label="Confirmed revenue · USD"
          value={s?.revenueConfirmedUsd ?? 0}
          accent="emerald"
          money
        />
      </div>

      {/* Recent bookings */}
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2
            className="font-display text-[24px]"
            style={{ color: "#FFFFFF" }}
          >
            Recent bookings
          </h2>
          <Link
            href="/admin/bookings"
            className="text-[11px] font-medium uppercase tracking-[0.28em]"
            style={{ color: "var(--color-gold-soft)" }}
          >
            View all →
          </Link>
        </div>

        {recent.length === 0 ? (
          <EmptyState />
        ) : (
          <div
            className="mt-5 overflow-hidden rounded-lg border"
            style={{ borderColor: "rgba(233, 199, 123, 0.12)" }}
          >
            <table className="w-full text-left">
              <thead>
                <tr style={{ background: "rgba(233, 199, 123, 0.06)" }}>
                  <Th>Reference</Th>
                  <Th>Guest</Th>
                  <Th>Dates</Th>
                  <Th>Room</Th>
                  <Th>Total</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {recent.map((b) => (
                  <tr
                    key={b.id}
                    className="border-t hover:bg-white/[0.02]"
                    style={{ borderColor: "rgba(233, 199, 123, 0.08)" }}
                  >
                    <Td>
                      <Link href="/admin/bookings" className="font-display" style={{ color: "var(--color-gold-soft)" }}>
                        {b.reference}
                      </Link>
                    </Td>
                    <Td>
                      <div className="font-medium" style={{ color: "#FFFFFF" }}>
                        {b.guestName}
                      </div>
                      <div className="text-[11px]" style={{ color: "rgba(255,252,245,0.5)" }}>
                        {b.guestEmail}
                      </div>
                    </Td>
                    <Td>
                      <div>{b.checkIn} → {b.checkOut}</div>
                      <div className="text-[11px]" style={{ color: "rgba(255,252,245,0.5)" }}>
                        {b.nights} nights · {b.guests} guests
                      </div>
                    </Td>
                    <Td>{b.roomTypeId}</Td>
                    <Td>
                      <span className="font-display">
                        {b.currency} {b.grandTotal.toLocaleString()}
                      </span>
                    </Td>
                    <Td>
                      <StatusPill status={b.status} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

// ─── shared bits ─────────────────────────────────────────────────────────

export function Header({
  title,
  subtitle,
  lastPolled,
  right,
}: {
  title: string;
  subtitle?: string;
  lastPolled?: Date | null;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="font-display text-[34px] leading-tight" style={{ color: "#FFFFFF" }}>
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 text-[13px]" style={{ color: "rgba(255,252,245,0.55)" }}>
            {subtitle}
          </p>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        {right}
        {lastPolled ? (
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "rgba(255,252,245,0.45)" }}>
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full" style={{ background: "rgba(95, 203, 139, 0.6)" }} />
              <span className="relative inline-block h-2 w-2 rounded-full" style={{ background: "#5FCB8B" }} />
            </span>
            Live · last sync {timeAgo(lastPolled)}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  accent,
  highlight,
  money,
}: {
  label: string;
  value: number;
  accent: "ivory" | "gold" | "emerald" | "purple";
  highlight?: boolean;
  money?: boolean;
}) {
  const colours: Record<typeof accent, string> = {
    ivory: "#FFFFFF",
    gold: "var(--color-gold-soft)",
    emerald: "#5FCB8B",
    purple: "#C8A8E0",
  };
  return (
    <div
      className="rounded-lg border px-5 py-4"
      style={{
        background: highlight ? "rgba(233, 199, 123, 0.10)" : "rgba(20, 16, 28, 0.55)",
        borderColor: highlight ? "rgba(233, 199, 123, 0.35)" : "rgba(233, 199, 123, 0.12)",
      }}
    >
      <div
        className="text-[10px] font-medium uppercase tracking-[0.28em]"
        style={{ color: "rgba(255,252,245,0.55)" }}
      >
        {label}
      </div>
      <div
        className="mt-2 font-display"
        style={{ color: colours[accent], fontSize: 32, lineHeight: 1 }}
      >
        {money ? `$${value.toLocaleString()}` : value.toLocaleString()}
      </div>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; fg: string; label: string }> = {
    pending: { bg: "rgba(233,199,123,0.18)", fg: "#E9C77B", label: "Pending" },
    confirmed: { bg: "rgba(95,203,139,0.16)", fg: "#5FCB8B", label: "Confirmed" },
    checked_in: { bg: "rgba(125,167,217,0.18)", fg: "#7DA7D9", label: "Checked-in" },
    checked_out: { bg: "rgba(200,168,224,0.16)", fg: "#C8A8E0", label: "Checked-out" },
    cancelled: { bg: "rgba(248,81,73,0.16)", fg: "#F88478", label: "Cancelled" },
    no_show: { bg: "rgba(248,81,73,0.16)", fg: "#F88478", label: "No-show" },
  };
  const s = map[status] ?? map.pending;
  return (
    <span
      className="inline-block rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.22em]"
      style={{ background: s.bg, color: s.fg }}
    >
      {s.label}
    </span>
  );
}

export function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th
      className="px-4 py-3 text-[10px] font-medium uppercase tracking-[0.28em]"
      style={{ color: "rgba(255,252,245,0.5)" }}
    >
      {children}
    </th>
  );
}
export function Td({ children }: { children?: React.ReactNode }) {
  return (
    <td className="px-4 py-3 text-[13px]" style={{ color: "rgba(255,252,245,0.85)" }}>
      {children}
    </td>
  );
}

function EmptyState() {
  return (
    <div
      className="mt-5 rounded-lg border px-6 py-12 text-center"
      style={{ borderColor: "rgba(233, 199, 123, 0.12)", background: "rgba(20, 16, 28, 0.4)" }}
    >
      <div className="text-[14px]" style={{ color: "rgba(255,252,245,0.6)" }}>
        No bookings yet. Once a guest submits the booking form, it will appear here within seconds.
      </div>
    </div>
  );
}

function timeAgo(d: Date): string {
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 10) return "just now";
  if (s < 60) return `${s}s ago`;
  return `${Math.floor(s / 60)}m ago`;
}
