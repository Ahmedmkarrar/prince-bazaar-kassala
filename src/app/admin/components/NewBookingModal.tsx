"use client";

import { useEffect, useMemo, useState } from "react";

type Localised = { en: string; ar: string };

interface RoomOption {
  roomTypeId: string;
  name: Localised;
  capacity: number;
  sqm: number;
  nightlyRate: number;
  totalPrice: number;
  currency: string;
  unitsAvailable: number;
  available: boolean;
}

interface AddonOption {
  id: string;
  name: Localised | string;
  price: number;
}

interface AvailabilityResponse {
  nights: number;
  options: RoomOption[];
  addons: AddonOption[];
}

const today = () => new Date().toISOString().slice(0, 10);
const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
};

export function NewBookingModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}) {
  const [checkIn, setCheckIn] = useState(today());
  const [checkOut, setCheckOut] = useState(tomorrow());
  const [guests, setGuests] = useState(2);
  const [roomTypeId, setRoomTypeId] = useState<string>("");
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestLanguage, setGuestLanguage] = useState<"en" | "ar">("en");
  const [status, setStatus] = useState<"pending" | "confirmed" | "checked_in">("confirmed");
  const [specialRequests, setSpecialRequests] = useState("");
  const [internalNotes, setInternalNotes] = useState("");
  const [override, setOverride] = useState(false);

  const [avail, setAvail] = useState<AvailabilityResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conflict, setConflict] = useState<{ unitsAvailable: number } | null>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Fetch availability when dates change
  useEffect(() => {
    if (!open) return;
    if (new Date(checkOut) <= new Date(checkIn)) return;
    setLoading(true);
    setError(null);
    fetch(`/api/booking?checkIn=${checkIn}&checkOut=${checkOut}`)
      .then((r) => r.json())
      .then((d: AvailabilityResponse) => {
        setAvail(d);
        if (!roomTypeId && d.options.length > 0) {
          setRoomTypeId(d.options.find((o) => o.available)?.roomTypeId ?? d.options[0].roomTypeId);
        }
      })
      .catch(() => setError("Could not load availability"))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, checkIn, checkOut]);

  const selectedRoom = useMemo(
    () => avail?.options.find((o) => o.roomTypeId === roomTypeId),
    [avail, roomTypeId],
  );

  const addonsTotal = useMemo(() => {
    if (!avail) return 0;
    return avail.addons
      .filter((a) => addonIds.includes(a.id))
      .reduce((s, a) => s + a.price, 0);
  }, [avail, addonIds]);

  const grandTotal = (selectedRoom?.totalPrice ?? 0) + addonsTotal;

  function toggleAddon(id: string) {
    setAddonIds((curr) =>
      curr.includes(id) ? curr.filter((a) => a !== id) : [...curr, id],
    );
  }

  function reset() {
    setCheckIn(today());
    setCheckOut(tomorrow());
    setGuests(2);
    setRoomTypeId("");
    setAddonIds([]);
    setGuestName("");
    setGuestEmail("");
    setGuestPhone("");
    setGuestLanguage("en");
    setStatus("confirmed");
    setSpecialRequests("");
    setInternalNotes("");
    setOverride(false);
    setError(null);
    setConflict(null);
  }

  async function submit() {
    setSubmitting(true);
    setError(null);
    setConflict(null);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          roomTypeId,
          guestName,
          guestEmail,
          guestPhone,
          guestLanguage,
          checkIn,
          checkOut,
          guests,
          addonIds,
          specialRequests,
          internalNotes,
          status,
          overrideAvailability: override,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.canOverride) {
          setConflict({ unitsAvailable: data.unitsAvailable });
        }
        setError(data.error ?? "Could not create booking");
        return;
      }
      reset();
      onCreated();
      onClose();
    } catch {
      setError("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  const canSubmit =
    !!roomTypeId &&
    guestName.trim().length > 1 &&
    guestEmail.includes("@") &&
    guestPhone.trim().length > 5;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-[920px] overflow-y-auto rounded-xl border"
        style={{
          background: "#14101C",
          borderColor: "rgba(233,199,123,0.18)",
          color: "rgba(255,252,245,0.85)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4"
          style={{ background: "#14101C", borderColor: "rgba(233,199,123,0.12)" }}
        >
          <div>
            <div
              className="text-[10px] font-medium uppercase tracking-[0.32em]"
              style={{ color: "var(--color-gold-soft)" }}
            >
              Manual booking
            </div>
            <div className="font-display mt-1 text-[22px]" style={{ color: "#FFFFFF" }}>
              Create booking
            </div>
          </div>
          <button onClick={onClose} className="text-[18px]" style={{ color: "rgba(255,252,245,0.5)" }}>
            ✕
          </button>
        </div>

        <div className="px-6 py-6">
          {/* Dates + guests */}
          <Section title="Dates & guests">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
              <Field label="Check-in">
                <Input type="date" value={checkIn} onChange={setCheckIn} />
              </Field>
              <Field label="Check-out">
                <Input type="date" value={checkOut} onChange={setCheckOut} />
              </Field>
              <Field label="Guests">
                <Input
                  type="number"
                  value={String(guests)}
                  onChange={(v) => setGuests(Math.max(1, Math.min(20, Number(v) || 1)))}
                />
              </Field>
              <Field label="Nights">
                <div
                  className="mt-1.5 rounded-md px-3 py-2 text-[13px]"
                  style={{
                    background: "rgba(14, 7, 25, 0.6)",
                    border: "1px solid rgba(233,199,123,0.16)",
                    color: "rgba(255,252,245,0.6)",
                  }}
                >
                  {avail?.nights ?? "—"}
                </div>
              </Field>
            </div>
          </Section>

          {/* Room selection */}
          <Section title="Room">
            {loading ? (
              <div className="text-[12px]" style={{ color: "rgba(255,252,245,0.55)" }}>
                Loading availability…
              </div>
            ) : null}
            {!loading && avail ? (
              <div className="grid grid-cols-1 gap-2">
                {avail.options.map((o) => {
                  const selected = o.roomTypeId === roomTypeId;
                  return (
                    <button
                      key={o.roomTypeId}
                      type="button"
                      onClick={() => setRoomTypeId(o.roomTypeId)}
                      className="flex items-center justify-between rounded-md border px-4 py-3 text-left"
                      style={{
                        borderColor: selected ? "var(--color-gold)" : "rgba(233,199,123,0.16)",
                        background: selected ? "rgba(233, 199, 123, 0.08)" : "rgba(14, 7, 25, 0.4)",
                      }}
                    >
                      <div>
                        <div className="font-display text-[16px]" style={{ color: "#FFFFFF" }}>
                          {o.name.en}
                        </div>
                        <div className="text-[11px]" style={{ color: "rgba(255,252,245,0.55)" }}>
                          {o.capacity} guests · {o.sqm} m² ·{" "}
                          <span style={{ color: o.available ? "#5FCB8B" : "#F88478" }}>
                            {o.unitsAvailable} available
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-[16px]">
                          {o.currency} {o.nightlyRate}
                        </div>
                        <div className="text-[10px] font-medium uppercase tracking-[0.22em]" style={{ color: "rgba(255,252,245,0.5)" }}>
                          per night
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </Section>

          {/* Add-ons */}
          {avail && avail.addons.length > 0 ? (
            <Section title="Add-ons (optional)">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {avail.addons.map((a) => {
                  const display = typeof a.name === "string" ? a.name : a.name.en;
                  const checked = addonIds.includes(a.id);
                  return (
                    <label
                      key={a.id}
                      className="flex cursor-pointer items-center justify-between rounded-md border px-3 py-2 text-[13px]"
                      style={{
                        borderColor: checked ? "var(--color-gold)" : "rgba(233,199,123,0.16)",
                        background: checked ? "rgba(233,199,123,0.06)" : "rgba(14, 7, 25, 0.4)",
                      }}
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAddon(a.id)}
                          className="h-4 w-4 accent-[var(--color-gold)]"
                        />
                        {display}
                      </span>
                      <span className="font-display">USD {a.price}</span>
                    </label>
                  );
                })}
              </div>
            </Section>
          ) : null}

          {/* Guest details */}
          <Section title="Guest details">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Full name *">
                <Input value={guestName} onChange={setGuestName} placeholder="Sara Ahmed" />
              </Field>
              <Field label="Email *">
                <Input type="email" value={guestEmail} onChange={setGuestEmail} placeholder="guest@example.com" />
              </Field>
              <Field label="Phone *">
                <Input type="tel" value={guestPhone} onChange={setGuestPhone} placeholder="+249 ..." />
              </Field>
              <Field label="Language">
                <Select
                  value={guestLanguage}
                  onChange={(v) => setGuestLanguage(v as "en" | "ar")}
                  options={[
                    { value: "en", label: "English" },
                    { value: "ar", label: "العربية" },
                  ]}
                />
              </Field>
              <Field label="Special requests (shown to guest, optional)" full>
                <Textarea value={specialRequests} onChange={setSpecialRequests} rows={2} />
              </Field>
              <Field label="Internal notes (staff only)" full>
                <Textarea
                  value={internalNotes}
                  onChange={setInternalNotes}
                  rows={2}
                  placeholder="e.g. walk-in 16/05, paid cash USD 960 in full"
                />
              </Field>
            </div>
          </Section>

          {/* Status + override */}
          <Section title="Status">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Field label="Initial status">
                <Select
                  value={status}
                  onChange={(v) => setStatus(v as typeof status)}
                  options={[
                    { value: "pending", label: "Pending (awaiting payment)" },
                    { value: "confirmed", label: "Confirmed (payment received)" },
                    { value: "checked_in", label: "Checked-in" },
                  ]}
                />
              </Field>
              {conflict || (selectedRoom && !selectedRoom.available) ? (
                <Field label="Conflict">
                  <label className="mt-1.5 flex items-center gap-2 text-[12px]" style={{ color: "#F88478" }}>
                    <input
                      type="checkbox"
                      checked={override}
                      onChange={(e) => setOverride(e.target.checked)}
                      className="h-4 w-4 accent-[var(--color-gold)]"
                    />
                    Override — book anyway
                  </label>
                </Field>
              ) : null}
            </div>
          </Section>

          {error ? (
            <div
              className="mt-2 rounded-md border-l-4 px-4 py-3 text-[13px]"
              style={{ background: "rgba(248,81,73,0.08)", borderColor: "#F88478", color: "#FFAEA5" }}
            >
              {error}
              {conflict ? (
                <span> · {conflict.unitsAvailable} units available. Tick override to book anyway.</span>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Footer */}
        <div
          className="sticky bottom-0 flex items-center justify-between gap-4 border-t px-6 py-4"
          style={{ background: "#14101C", borderColor: "rgba(233,199,123,0.12)" }}
        >
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "rgba(255,252,245,0.55)" }}>
              Grand total
            </div>
            <div className="font-display mt-0.5 text-[26px]" style={{ color: "var(--color-gold-soft)" }}>
              USD {grandTotal.toLocaleString()}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-md px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{
                background: "rgba(20, 16, 28, 0.6)",
                color: "rgba(255,252,245,0.7)",
                border: "1px solid rgba(233,199,123,0.16)",
              }}
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={!canSubmit || submitting}
              className="rounded-md px-5 py-2 text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{
                background: "var(--color-gold)",
                color: "#14101C",
                opacity: !canSubmit || submitting ? 0.5 : 1,
              }}
            >
              {submitting ? "Creating…" : "Create booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── form helpers ────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-7">
      <div
        className="mb-3 text-[10px] font-medium uppercase tracking-[0.32em]"
        style={{ color: "var(--color-gold-soft)" }}
      >
        {title}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <div
        className="text-[10px] font-medium uppercase tracking-[0.28em]"
        style={{ color: "rgba(255,252,245,0.55)" }}
      >
        {label}
      </div>
      {children}
    </label>
  );
}

function Input(props: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <input
      type={props.type ?? "text"}
      value={props.value}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
      className="mt-1.5 w-full rounded-md px-3 py-2 text-[13px] outline-none"
      style={{
        background: "rgba(14, 7, 25, 0.6)",
        border: "1px solid rgba(233,199,123,0.16)",
        color: "rgba(255,252,245,0.9)",
      }}
    />
  );
}

function Textarea(props: { value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <textarea
      value={props.value}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
      rows={props.rows ?? 3}
      className="mt-1.5 w-full rounded-md px-3 py-2 text-[13px] outline-none"
      style={{
        background: "rgba(14, 7, 25, 0.6)",
        border: "1px solid rgba(233,199,123,0.16)",
        color: "rgba(255,252,245,0.9)",
      }}
    />
  );
}

function Select(props: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      className="mt-1.5 w-full rounded-md px-3 py-2 text-[13px] outline-none"
      style={{
        background: "rgba(14, 7, 25, 0.6)",
        border: "1px solid rgba(233,199,123,0.16)",
        color: "rgba(255,252,245,0.9)",
      }}
    >
      {props.options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
