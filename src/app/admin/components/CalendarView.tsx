"use client";

import { useEffect, useMemo, useState } from "react";
import type { Booking } from "@/lib/data";
import { Header, StatusPill } from "./DashboardView";

interface RoomTypeRow {
  id: string;
  name: string;
  totalUnits: number;
}

const POLL_MS = 30_000;
const DAY_MS = 24 * 60 * 60 * 1000;

function isoDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

export function CalendarView({
  roomTypes,
  initialBookings,
}: {
  roomTypes: RoomTypeRow[];
  initialBookings: Booking[];
}) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [lastPolled, setLastPolled] = useState<Date | null>(null);
  const [offsetDays, setOffsetDays] = useState(0);

  // Live polling
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/admin/bookings", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as { bookings: Booking[] };
        if (cancelled) return;
        setBookings(json.bookings);
        setLastPolled(new Date());
      } catch {
        // ignore
      }
    }
    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  const today = useMemo(() => {
    const t = new Date();
    t.setUTCHours(0, 0, 0, 0);
    return t;
  }, []);

  const startDate = addDays(today, offsetDays);
  const days = Array.from({ length: 14 }, (_, i) => addDays(startDate, i));

  // For each (room type, day), count overlapping non-cancelled bookings.
  function bookingsOn(roomTypeId: string, day: Date) {
    return bookings.filter((b) => {
      if (b.roomTypeId !== roomTypeId) return false;
      if (b.status === "cancelled" || b.status === "no_show") return false;
      const start = new Date(b.checkIn);
      const end = new Date(b.checkOut);
      return start <= day && day < end;
    });
  }

  return (
    <div>
      <Header
        title="Calendar"
        subtitle="Occupancy by room type · 14-day window · auto-refreshes every 30s"
        lastPolled={lastPolled}
        right={
          <div className="flex gap-2">
            <button
              onClick={() => setOffsetDays(offsetDays - 7)}
              className="rounded-md px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{ background: "rgba(20, 16, 28, 0.6)", color: "rgba(255,252,245,0.65)", border: "1px solid rgba(233,199,123,0.16)" }}
            >
              ← Prev
            </button>
            <button
              onClick={() => setOffsetDays(0)}
              className="rounded-md px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{ background: "var(--color-gold)", color: "#14101C" }}
            >
              Today
            </button>
            <button
              onClick={() => setOffsetDays(offsetDays + 7)}
              className="rounded-md px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{ background: "rgba(20, 16, 28, 0.6)", color: "rgba(255,252,245,0.65)", border: "1px solid rgba(233,199,123,0.16)" }}
            >
              Next →
            </button>
          </div>
        }
      />

      <div
        className="mt-8 overflow-x-auto rounded-lg border"
        style={{ borderColor: "rgba(233, 199, 123, 0.12)" }}
      >
        <table className="w-full text-left">
          <thead>
            <tr style={{ background: "rgba(233, 199, 123, 0.06)" }}>
              <th
                className="sticky left-0 z-10 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.28em]"
                style={{ background: "rgba(233, 199, 123, 0.06)", color: "rgba(255,252,245,0.55)", minWidth: 180 }}
              >
                Room type
              </th>
              {days.map((d) => {
                const isToday = isoDay(d) === isoDay(today);
                return (
                  <th
                    key={isoDay(d)}
                    className="px-2 py-3 text-center text-[10px] font-medium uppercase tracking-[0.18em]"
                    style={{ color: isToday ? "var(--color-gold-soft)" : "rgba(255,252,245,0.5)", minWidth: 64 }}
                  >
                    <div>{d.toLocaleDateString("en-GB", { weekday: "short" })}</div>
                    <div className="font-display mt-0.5 text-[16px]" style={{ color: isToday ? "var(--color-gold-soft)" : "rgba(255,252,245,0.85)" }}>
                      {d.getDate()}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {roomTypes.length === 0 ? (
              <tr>
                <td colSpan={days.length + 1} className="px-4 py-12 text-center text-[13px]" style={{ color: "rgba(255,252,245,0.55)" }}>
                  No room types configured. Add some in the Rooms & Rates section.
                </td>
              </tr>
            ) : null}
            {roomTypes.map((rt) => (
              <tr key={rt.id} className="border-t" style={{ borderColor: "rgba(233, 199, 123, 0.08)" }}>
                <td
                  className="sticky left-0 z-10 px-4 py-3"
                  style={{ background: "#14101C" }}
                >
                  <div className="font-display text-[15px]" style={{ color: "#FFFFFF" }}>
                    {rt.name}
                  </div>
                  <div className="text-[11px]" style={{ color: "rgba(255,252,245,0.5)" }}>
                    {rt.totalUnits} total
                  </div>
                </td>
                {days.map((d) => {
                  const used = bookingsOn(rt.id, d).length;
                  const free = Math.max(0, rt.totalUnits - used);
                  const pct = rt.totalUnits === 0 ? 0 : used / rt.totalUnits;
                  let bg = "rgba(95, 203, 139, 0.08)"; // green
                  let fg = "#5FCB8B";
                  if (pct >= 1) {
                    bg = "rgba(248, 81, 73, 0.2)";
                    fg = "#F88478";
                  } else if (pct >= 0.7) {
                    bg = "rgba(233, 199, 123, 0.18)";
                    fg = "#E9C77B";
                  }
                  return (
                    <td
                      key={isoDay(d)}
                      className="px-2 py-3 text-center"
                      style={{ background: bg, minWidth: 64 }}
                      title={`${used} booked, ${free} free`}
                    >
                      <div className="font-display text-[14px]" style={{ color: fg }}>
                        {used}/{rt.totalUnits}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap gap-5 text-[11px]" style={{ color: "rgba(255,252,245,0.55)" }}>
        <LegendDot colour="#5FCB8B" label="Available" />
        <LegendDot colour="#E9C77B" label="≥ 70% booked" />
        <LegendDot colour="#F88478" label="Fully booked" />
      </div>
    </div>
  );
}

function LegendDot({ colour, label }: { colour: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-block h-2 w-2 rounded-full" style={{ background: colour }} />
      {label}
    </div>
  );
}
