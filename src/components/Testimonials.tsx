"use client";

import { useEffect, useState } from "react";

interface Testimonial {
  quote: string;
  attribution: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "An invitation to a Sudan we had never seen — refined, generous, and wholly its own.",
    attribution: "Yara Al-Salim",
    role: "Editor · Travel & Style",
  },
  {
    quote:
      "Every detail considered, nothing performed. The kind of hospitality that quietly raises the bar for the entire region.",
    attribution: "James Whitfield",
    role: "Foreign Correspondent",
  },
  {
    quote:
      "The concierge had our itinerary across three days, four cities, and one mountain expedition arranged before we had unpacked.",
    attribution: "H.E. Ambassador A. Mahmoud",
    role: "Diplomatic Mission",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 8500);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[i];

  return (
    <section
      className="relative px-6 py-32 lg:px-12 lg:py-44"
      style={{ background: "var(--color-charcoal)", color: "var(--color-ivory)" }}
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-3">
            <div
              className="text-[10px] font-medium uppercase tracking-[0.42em]"
              style={{ color: "rgba(233, 199, 123, 0.85)" }}
            >
              In Their Words
            </div>
            <div className="mt-6 hidden flex-col gap-3 lg:flex">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className="flex items-center gap-3 text-left"
                >
                  <span
                    className="h-px transition-all"
                    style={{
                      width: idx === i ? "32px" : "16px",
                      background: idx === i ? "#E9C77B" : "rgba(255,255,255,0.25)",
                    }}
                  />
                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.28em] transition-colors"
                    style={{
                      color: idx === i ? "#E9C77B" : "rgba(255,255,255,0.4)",
                    }}
                  >
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-9">
            <div className="relative min-h-[280px]">
              {TESTIMONIALS.map((tm, idx) => (
                <div
                  key={tm.attribution}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: idx === i ? 1 : 0, pointerEvents: idx === i ? "auto" : "none" }}
                >
                  <p
                    className="font-display tracking-[-0.01em]"
                    style={{
                      color: "#FFFFFF",
                      fontSize: "clamp(28px, 3.6vw, 56px)",
                      lineHeight: 1.18,
                      fontWeight: 300,
                    }}
                  >
                    &ldquo;{tm.quote}&rdquo;
                  </p>
                  <div className="mt-10 flex items-center gap-4">
                    <span className="h-px w-10" style={{ background: "rgba(233, 199, 123, 0.6)" }} />
                    <div>
                      <div
                        className="text-[12px] font-medium uppercase tracking-[0.28em]"
                        style={{ color: "#FFFFFF" }}
                      >
                        {tm.attribution}
                      </div>
                      <div
                        className="mt-1 text-[11px]"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        {tm.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Spacer to maintain height */}
              <p className="invisible font-display" style={{ fontSize: "clamp(28px, 3.6vw, 56px)", lineHeight: 1.18 }}>
                {t.quote}
              </p>
            </div>

            <div className="mt-12 flex gap-2 lg:hidden">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  aria-label={`Show testimonial ${idx + 1}`}
                  className="h-1 rounded-full transition-all"
                  style={{
                    width: idx === i ? "32px" : "8px",
                    background: idx === i ? "#E9C77B" : "rgba(255,255,255,0.25)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
