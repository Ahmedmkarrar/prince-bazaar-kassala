"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";

interface Option {
  id: string;
  name: string;
  description: string;
  view: string;
  available: boolean;
  nightlyFromUSD: number;
  totalUSD: number;
}

interface Result {
  nights: number;
  options: Option[];
  error?: string;
}

function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function Availability() {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCheckIn(todayPlus(7));
    setCheckOut(todayPlus(10));
  }, []);

  async function check() {
    if (!checkIn || !checkOut) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/availability?checkIn=${checkIn}&checkOut=${checkOut}`);
      const data = (await res.json()) as Result;
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="availability"
      className="relative px-6 py-32 lg:px-12 lg:py-44"
      style={{ background: "var(--color-ivory)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
            <span
              className="text-[10px] font-medium uppercase tracking-[0.42em]"
              style={{ color: "var(--color-mist)" }}
            >
              Live Availability
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
            Choose your <em style={{ color: "var(--color-emerald-deep)" }}>dates</em>.
          </h2>
          <p className="mt-6 text-[16px] leading-[1.8]" style={{ color: "var(--color-stone)" }}>
            Indicative availability for your dates. Rates are confirmed by our reservations team within four hours of your inquiry.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal delay={100} className="lg:col-span-4">
            <div
              className="border p-8"
              style={{
                background: "var(--color-bone-soft)",
                borderColor: "var(--color-line)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <Field label="Check-in">
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="block w-full bg-transparent py-2 text-[16px] outline-none"
                  style={{
                    color: "var(--color-charcoal)",
                    borderBottom: "1px solid var(--color-line)",
                    fontFamily: "var(--font-display)",
                  }}
                />
              </Field>
              <Field label="Check-out">
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="block w-full bg-transparent py-2 text-[16px] outline-none"
                  style={{
                    color: "var(--color-charcoal)",
                    borderBottom: "1px solid var(--color-line)",
                    fontFamily: "var(--font-display)",
                  }}
                />
              </Field>
              <button
                onClick={check}
                disabled={loading}
                className="mt-6 w-full rounded-full px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] disabled:opacity-50"
                style={{ background: "var(--color-emerald-deep)", color: "var(--color-gold-pale)" }}
              >
                {loading ? "Checking…" : "Check Availability"}
              </button>
              <p className="mt-4 text-[10px] leading-[1.6]" style={{ color: "var(--color-mist)" }}>
                Live data from operations · refreshed daily by the property team. Final rates inclusive of service & taxes shared on confirmation.
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            {result?.error ? (
              <div className="border p-8 text-[14px]" style={{ color: "var(--color-terracotta)", borderColor: "var(--color-line)" }}>
                {result.error}
              </div>
            ) : result?.options ? (
              <div className="space-y-3">
                <div className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-mist)" }}>
                  {result.nights} {result.nights === 1 ? "night" : "nights"} · {checkIn} → {checkOut}
                </div>
                {result.options.map((o) => (
                  <div
                    key={o.id}
                    className="border p-6 transition-all"
                    style={{
                      background: "var(--color-ivory)",
                      borderColor: "var(--color-line)",
                      opacity: o.available ? 1 : 0.5,
                    }}
                  >
                    <div className="flex flex-col items-baseline justify-between gap-3 sm:flex-row">
                      <div>
                        <h3 className="font-display" style={{ fontSize: "26px", lineHeight: 1.1, fontWeight: 400 }}>
                          {o.name}
                        </h3>
                        <p className="mt-1 text-[12px]" style={{ color: "var(--color-mist)" }}>
                          {o.view} · {o.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <a
                          href="#book"
                          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em]"
                          style={{ background: "var(--color-emerald-deep)", color: "var(--color-gold-pale)" }}
                        >
                          Inquire rates →
                        </a>
                      </div>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <span
                        className="text-[10px] font-medium uppercase tracking-[0.28em]"
                        style={{ color: o.available ? "var(--color-emerald-deep)" : "var(--color-terracotta)" }}
                      >
                        ● {o.available ? "Available — limited" : "Unavailable on these dates"}
                      </span>
                      <a
                        href="#book"
                        className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em]"
                        style={{ color: "var(--color-emerald-deep)" }}
                      >
                        Inquire rates →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="flex h-full items-center justify-center border p-12 text-center"
                style={{ background: "var(--color-bone-soft)", borderColor: "var(--color-line)", minHeight: "320px" }}
              >
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-mist)" }}>
                    Indicative
                  </div>
                  <p className="mt-3 max-w-md font-display" style={{ fontSize: "22px", color: "var(--color-charcoal)", lineHeight: 1.3, fontWeight: 400 }}>
                    Choose your dates. We'll show what's open at the property right now.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-5 block">
      <span className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-mist)" }}>
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
