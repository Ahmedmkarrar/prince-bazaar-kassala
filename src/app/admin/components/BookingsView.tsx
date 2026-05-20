"use client";

import { useEffect, useMemo, useState } from "react";
import type { Booking } from "@/lib/data";
import { Header, StatusPill, Td, Th } from "./DashboardView";
import { NewBookingModal } from "./NewBookingModal";

interface ApiResponse {
  summary: { total: number; pending: number; confirmed: number; checkedIn: number };
  bookings: Booking[];
  statuses: string[];
}

const POLL_MS = 10_000;
const STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  checked_in: "Checked-in",
  checked_out: "Checked-out",
  cancelled: "Cancelled",
  no_show: "No-show",
};

const STATUS_FLOW: Record<string, string[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["checked_in", "cancelled", "no_show"],
  checked_in: ["checked_out"],
  checked_out: [],
  cancelled: ["pending"],
  no_show: ["pending"],
};

export function BookingsView() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [lastPolled, setLastPolled] = useState<Date | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Booking | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [prevPending, setPrevPending] = useState(0);
  const [newBookingFlash, setNewBookingFlash] = useState(false);
  const [creating, setCreating] = useState(false);
  const [reloadTick, setReloadTick] = useState(0);

  // Polling
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const params = new URLSearchParams();
        if (filterStatus !== "all") params.set("status", filterStatus);
        if (search.trim()) params.set("q", search.trim());
        const res = await fetch(`/api/admin/bookings?${params}`, { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as ApiResponse;
        if (cancelled) return;
        // Flash if new pending booking arrived
        if (data && json.summary.pending > prevPending) {
          setNewBookingFlash(true);
          setTimeout(() => setNewBookingFlash(false), 3000);
        }
        setPrevPending(json.summary.pending);
        setData(json);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus, search, reloadTick]);

  async function changeStatus(b: Booking, status: string) {
    setSavingId(b.id);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id: b.id, status, internalNotes: notes }),
      });
      if (res.ok) {
        const json = (await res.json()) as { booking: Booking };
        setSelected(json.booking);
        // Refresh list
        const params = new URLSearchParams();
        if (filterStatus !== "all") params.set("status", filterStatus);
        if (search.trim()) params.set("q", search.trim());
        const r = await fetch(`/api/admin/bookings?${params}`, { cache: "no-store" });
        if (r.ok) setData((await r.json()) as ApiResponse);
      }
    } finally {
      setSavingId(null);
    }
  }

  const bookings = useMemo(() => data?.bookings ?? [], [data]);

  return (
    <div>
      <Header
        title="Bookings"
        subtitle="Live inbox · auto-refreshes every 10s"
        lastPolled={lastPolled}
        right={
          <div className="flex items-center gap-3">
            {newBookingFlash ? (
              <span
                className="rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em]"
                style={{
                  background: "var(--color-gold)",
                  color: "#14101C",
                  animation: "pulse 1s ease-in-out 3",
                }}
              >
                New booking
              </span>
            ) : null}
            <button
              onClick={() => setCreating(true)}
              className="rounded-md px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{ background: "var(--color-gold)", color: "#14101C" }}
            >
              + New booking
            </button>
          </div>
        }
      />

      <NewBookingModal
        open={creating}
        onClose={() => setCreating(false)}
        onCreated={() => setReloadTick((t) => t + 1)}
      />

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-1.5">
          {["all", "pending", "confirmed", "checked_in", "checked_out", "cancelled", "no_show"].map((s) => {
            const active = filterStatus === s;
            return (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className="rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] transition-colors"
                style={{
                  background: active ? "var(--color-gold)" : "rgba(20, 16, 28, 0.6)",
                  color: active ? "#14101C" : "rgba(255,252,245,0.65)",
                  border: "1px solid",
                  borderColor: active ? "var(--color-gold)" : "rgba(233,199,123,0.16)",
                }}
              >
                {s === "all" ? "All" : STATUS_LABEL[s] ?? s}
              </button>
            );
          })}
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search reference, name, email, phone…"
          className="w-full rounded-md px-3 py-2 text-[12px] outline-none sm:w-72"
          style={{
            background: "rgba(20, 16, 28, 0.6)",
            border: "1px solid rgba(233,199,123,0.16)",
            color: "rgba(255,252,245,0.85)",
          }}
        />
      </div>

      {/* Table */}
      <div
        className="mt-6 overflow-x-auto rounded-lg border"
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
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <Td>—</Td>
                <Td>No bookings match these filters.</Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
                <Td></Td>
              </tr>
            ) : null}
            {bookings.map((b) => (
              <tr
                key={b.id}
                className="cursor-pointer border-t hover:bg-white/[0.03]"
                style={{ borderColor: "rgba(233, 199, 123, 0.08)" }}
                onClick={() => {
                  setSelected(b);
                  setNotes(b.internalNotes ?? "");
                }}
              >
                <Td>
                  <span className="font-display" style={{ color: "var(--color-gold-soft)" }}>
                    {b.reference}
                  </span>
                </Td>
                <Td>
                  <div className="font-medium" style={{ color: "#FFFFFF" }}>
                    {b.guestName}
                  </div>
                  <div className="text-[11px]" style={{ color: "rgba(255,252,245,0.5)" }}>
                    {b.guestPhone}
                  </div>
                </Td>
                <Td>
                  <div>{b.checkIn} → {b.checkOut}</div>
                  <div className="text-[11px]" style={{ color: "rgba(255,252,245,0.5)" }}>
                    {b.nights}n · {b.guests}g
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
                <Td>
                  <span style={{ color: "rgba(255,252,245,0.4)" }}>›</span>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Detail Drawer */}
      {selected ? (
        <BookingDetailDrawer
          booking={selected}
          notes={notes}
          setNotes={setNotes}
          savingId={savingId}
          onClose={() => setSelected(null)}
          onStatus={(status) => changeStatus(selected, status)}
        />
      ) : null}

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

function BookingDetailDrawer({
  booking,
  notes,
  setNotes,
  savingId,
  onClose,
  onStatus,
}: {
  booking: Booking;
  notes: string;
  setNotes: (v: string) => void;
  savingId: string | null;
  onClose: () => void;
  onStatus: (s: string) => void;
}) {
  const nextStatuses = STATUS_FLOW[booking.status] ?? [];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-[520px] overflow-y-auto border-l"
        style={{
          background: "#14101C",
          borderColor: "rgba(233,199,123,0.18)",
          color: "rgba(255,252,245,0.85)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 border-b px-6 py-4" style={{ background: "#14101C", borderColor: "rgba(233,199,123,0.12)" }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-gold-soft)" }}>
                Booking
              </div>
              <div className="font-display mt-1 text-[22px]" style={{ color: "#FFFFFF" }}>
                {booking.reference}
              </div>
            </div>
            <button onClick={onClose} className="text-[18px]" style={{ color: "rgba(255,252,245,0.5)" }}>✕</button>
          </div>
        </div>

        <div className="px-6 py-6">
          <StatusPill status={booking.status} />

          <section className="mt-6 space-y-4">
            <FieldBlock label="Guest">
              <div className="font-display text-[18px]" style={{ color: "#FFFFFF" }}>
                {booking.guestName}
              </div>
              <div className="mt-1 text-[12px]">{booking.guestEmail}</div>
              <div className="text-[12px]">{booking.guestPhone}</div>
              <div className="text-[11px]" style={{ color: "rgba(255,252,245,0.5)" }}>
                Language: {booking.guestLanguage === "ar" ? "العربية" : "English"}
              </div>
            </FieldBlock>

            <FieldBlock label="Stay">
              <div>{booking.checkIn} → {booking.checkOut}</div>
              <div className="text-[12px]" style={{ color: "rgba(255,252,245,0.6)" }}>
                {booking.nights} nights · {booking.guests} guests · {booking.roomTypeId}
              </div>
            </FieldBlock>

            <FieldBlock label="Totals">
              <div className="flex justify-between"><span>Rooms</span><span>{booking.currency} {booking.baseTotal.toLocaleString()}</span></div>
              {booking.addonsTotal > 0 ? (
                <div className="flex justify-between"><span>Add-ons</span><span>{booking.currency} {booking.addonsTotal.toLocaleString()}</span></div>
              ) : null}
              <div className="mt-2 flex justify-between border-t pt-2 font-display text-[18px]" style={{ borderColor: "rgba(233,199,123,0.18)", color: "var(--color-gold-soft)" }}>
                <span>Grand total</span>
                <span>{booking.currency} {booking.grandTotal.toLocaleString()}</span>
              </div>
            </FieldBlock>

            {booking.addons.length > 0 ? (
              <FieldBlock label="Add-ons selected">
                <ul className="space-y-1.5 text-[12px]">
                  {booking.addons.map((a) => (
                    <li key={a.id} className="flex justify-between">
                      <span>· {a.name}</span>
                      <span>{booking.currency} {a.price}</span>
                    </li>
                  ))}
                </ul>
              </FieldBlock>
            ) : null}

            {booking.specialRequests ? (
              <FieldBlock label="Special requests">
                <div className="text-[13px] italic" style={{ color: "rgba(255,252,245,0.75)" }}>
                  "{booking.specialRequests}"
                </div>
              </FieldBlock>
            ) : null}

            <FieldBlock label="Internal notes">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="e.g. paid bank transfer 16/05, sent confirmation by WhatsApp"
                className="w-full rounded-md px-3 py-2 text-[13px] outline-none"
                style={{
                  background: "rgba(20, 16, 28, 0.6)",
                  border: "1px solid rgba(233,199,123,0.16)",
                  color: "rgba(255,252,245,0.85)",
                }}
              />
            </FieldBlock>

            <FieldBlock label="Audit">
              <div className="text-[11px]" style={{ color: "rgba(255,252,245,0.5)" }}>
                Created {new Date(booking.createdAt).toLocaleString()}
                <br />
                Updated {new Date(booking.updatedAt).toLocaleString()}
              </div>
            </FieldBlock>
          </section>

          {/* Actions */}
          <section className="mt-8">
            <div className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-gold-soft)" }}>
              Actions
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {nextStatuses.map((s) => (
                <button
                  key={s}
                  onClick={() => onStatus(s)}
                  disabled={savingId === booking.id}
                  className="rounded-md px-3 py-2 text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{
                    background:
                      s === "cancelled" || s === "no_show"
                        ? "rgba(248,81,73,0.2)"
                        : "var(--color-gold)",
                    color:
                      s === "cancelled" || s === "no_show" ? "#F88478" : "#14101C",
                    opacity: savingId === booking.id ? 0.5 : 1,
                  }}
                >
                  Mark {STATUS_LABEL[s] ?? s}
                </button>
              ))}
              {nextStatuses.length === 0 ? (
                <span className="text-[11px]" style={{ color: "rgba(255,252,245,0.5)" }}>
                  No further status changes for {STATUS_LABEL[booking.status] ?? booking.status}.
                </span>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={`https://wa.me/${booking.guestPhone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello ${booking.guestName}, regarding booking ${booking.reference}…`)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-md px-3 py-2 text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ background: "rgba(95,203,139,0.2)", color: "#5FCB8B" }}
              >
                WhatsApp guest
              </a>
              <a
                href={`tel:${booking.guestPhone}`}
                className="rounded-md px-3 py-2 text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ background: "rgba(125,167,217,0.2)", color: "#7DA7D9" }}
              >
                Call
              </a>
              <a
                href={`mailto:${booking.guestEmail}?subject=Prince%20Plaza%20Kassala%20%E2%80%94%20${booking.reference}`}
                className="rounded-md px-3 py-2 text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ background: "rgba(200,168,224,0.2)", color: "#C8A8E0" }}
              >
                Email
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function FieldBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "rgba(255,252,245,0.45)" }}>
        {label}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}
