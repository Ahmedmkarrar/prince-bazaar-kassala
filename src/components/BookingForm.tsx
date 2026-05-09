"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";

interface FormState {
  name: string;
  email: string;
  phone: string;
  category: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  conferenceRoom: string;
  layout: string;
  addons: string[];
  message: string;
}

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  category: "stay",
  checkIn: "",
  checkOut: "",
  guests: "2",
  conferenceRoom: "",
  layout: "",
  addons: [],
  message: "",
};

const ADDON_OPTIONS = [
  { id: "airport-transfer", label: "Airport Transfer · Khartoum" },
  { id: "mountain-sunrise", label: "Sunrise Tour · Taka Mountains" },
  { id: "private-chef", label: "Private Chef's Table" },
  { id: "hammam", label: "Traditional Hammam Ritual" },
  { id: "oud-evening", label: "Live Oud at Dinner" },
];

export function BookingForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [reference, setReference] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, guests: Number(form.guests) || 1 }),
      });
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setReference(data.reference ?? null);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="book"
      className="relative px-6 py-32 lg:px-12 lg:py-44"
      style={{ background: "var(--color-bone)" }}
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
            <span
              className="text-[10px] font-medium uppercase tracking-[0.42em]"
              style={{ color: "var(--color-mist)" }}
            >
              Reservations
            </span>
          </div>
          <h2
            className="mt-8 font-display tracking-[-0.015em]"
            style={{
              color: "var(--color-charcoal)",
              fontSize: "clamp(40px, 5.5vw, 76px)",
              lineHeight: 1.02,
              fontWeight: 400,
            }}
          >
            Let us prepare your <em style={{ color: "var(--color-emerald-deep)" }}>arrival</em>.
          </h2>
          <p className="mt-8 max-w-md text-[16px] leading-[1.8]" style={{ color: "var(--color-stone)" }}>
            Share your dates and we'll respond within four hours with a tailored proposal — suite selection, dining, transport, and any experiences you'd like curated.
          </p>

          <div className="mt-10 space-y-5 border-t pt-8" style={{ borderColor: "var(--color-line)" }}>
            {[
              ["Direct line", "+249 ●●● ●●● ●●●"],
              ["Reservations", "reservations@princebazaar.sd"],
              ["Press", "press@princebazaar.sd"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-baseline justify-between gap-4">
                <span className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "var(--color-mist)" }}>
                  {label}
                </span>
                <span className="font-display text-[18px]" style={{ color: "var(--color-charcoal)" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <form
            onSubmit={onSubmit}
            className="rounded-sm p-6 sm:p-10"
            style={{ background: "var(--color-ivory)", border: "1px solid var(--color-line)", boxShadow: "var(--shadow-card)" }}
          >
            {status === "success" ? (
              <div className="flex flex-col items-start gap-6 py-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "var(--color-emerald-deep)", color: "var(--color-gold-pale)" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12 L10 17 L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="eyebrow">Inquiry received</div>
                  <h3 className="mt-2 font-display text-[32px] leading-tight">Thank you, {form.name.split(" ")[0]}.</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-[1.8]" style={{ color: "var(--color-stone)" }}>
                    A reservations specialist will respond within four hours with a tailored proposal. Reference{" "}
                    {reference ? (
                      <span className="font-display" style={{ color: "var(--color-emerald-deep)" }}>
                        {reference}
                      </span>
                    ) : null}
                    .
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setForm(INITIAL);
                    setStatus("idle");
                    setReference(null);
                  }}
                  className="btn-ghost"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="form-input"
                  />
                </Field>
                <Field label="Email" required>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="form-input"
                  />
                </Field>
                <Field label="Phone (optional)">
                  <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="form-input" />
                </Field>
                <Field label="Inquiry type">
                  <select value={form.category} onChange={(e) => update("category", e.target.value)} className="form-input">
                    <option value="stay">Stay · Royal or Presidential Suite</option>
                    <option value="conference">Conference · Atbara or Gash Room</option>
                    <option value="event">Event · Wedding or Reception</option>
                    <option value="dining">Dining Reservation</option>
                    <option value="tour">Tour or Expedition</option>
                    <option value="press">Press</option>
                  </select>
                </Field>
                <Field label="Check-in">
                  <input type="date" value={form.checkIn} onChange={(e) => update("checkIn", e.target.value)} className="form-input" />
                </Field>
                <Field label="Check-out / Event end">
                  <input type="date" value={form.checkOut} onChange={(e) => update("checkOut", e.target.value)} className="form-input" />
                </Field>
                <Field label="Guests / Headcount">
                  <input
                    type="number"
                    min={1}
                    max={500}
                    value={form.guests}
                    onChange={(e) => update("guests", e.target.value)}
                    className="form-input"
                  />
                </Field>
                {form.category === "conference" || form.category === "event" ? (
                  <>
                    <Field label="Conference room">
                      <select
                        value={form.conferenceRoom}
                        onChange={(e) => update("conferenceRoom", e.target.value)}
                        className="form-input"
                      >
                        <option value="">No preference</option>
                        <option value="atbara">The Atbara Room (up to 100)</option>
                        <option value="gash">The Gash Room (up to 50)</option>
                        <option value="either">Either — recommend the right one</option>
                      </select>
                    </Field>
                    <Field label="Layout">
                      <select value={form.layout} onChange={(e) => update("layout", e.target.value)} className="form-input">
                        <option value="">Not yet decided</option>
                        <option value="theatre">Theatre</option>
                        <option value="boardroom">Boardroom</option>
                        <option value="ushape">U-shape</option>
                        <option value="reception">Reception</option>
                      </select>
                    </Field>
                  </>
                ) : null}
                <Field label="Add experiences" className="sm:col-span-2">
                  <div className="flex flex-wrap gap-2">
                    {ADDON_OPTIONS.map((a) => {
                      const checked = form.addons.includes(a.id);
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() =>
                            update(
                              "addons",
                              checked ? form.addons.filter((x) => x !== a.id) : [...form.addons, a.id],
                            )
                          }
                          className="rounded-full px-4 py-2 text-[12px] transition-all"
                          style={{
                            background: checked ? "var(--color-emerald-deep)" : "var(--color-bone-soft)",
                            color: checked ? "var(--color-gold-pale)" : "var(--color-charcoal)",
                            border: `1px solid ${checked ? "var(--color-emerald-deep)" : "var(--color-line)"}`,
                          }}
                        >
                          {checked ? "✓ " : ""}{a.label}
                        </button>
                      );
                    })}
                  </div>
                </Field>
                <Field label="Anything we should know" className="sm:col-span-2">
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Special requests, dietary needs, occasions to celebrate…"
                    className="form-input resize-none"
                  />
                </Field>

                <div className="sm:col-span-2 mt-2 flex items-center justify-between">
                  <p className="text-[11px]" style={{ color: "var(--color-mist)" }}>
                    Or chat with our AI Concierge for an instant reply.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary disabled:opacity-60"
                  >
                    {status === "submitting" ? "Sending…" : "Submit Inquiry"}
                  </button>
                </div>
                {status === "error" ? (
                  <p className="sm:col-span-2 text-[12px]" style={{ color: "var(--color-terracotta)" }}>
                    Something went wrong. Please try again or use the AI Concierge.
                  </p>
                ) : null}
              </div>
            )}
            <style jsx>{`
              .form-input {
                width: 100%;
                background: var(--color-bone-soft);
                border: 1px solid var(--color-line);
                border-radius: 2px;
                padding: 0.75rem 0.875rem;
                font-size: 14px;
                color: var(--color-charcoal);
                font-family: var(--font-sans);
                transition: border-color 0.2s ease;
              }
              .form-input:focus {
                outline: none;
                border-color: var(--color-emerald-deep);
              }
            `}</style>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, children, required, className = "" }: { label: string; children: React.ReactNode; required?: boolean; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "var(--color-mist)" }}>
        {label}
        {required ? <span style={{ color: "var(--color-gold)" }}>*</span> : null}
      </span>
      {children}
    </label>
  );
}
