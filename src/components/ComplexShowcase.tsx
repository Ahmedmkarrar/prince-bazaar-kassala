"use client";

import { useState } from "react";
import { COMPLEXES } from "@/lib/content";
import { Reveal } from "./Reveal";

export function ComplexShowcase() {
  const [active, setActive] = useState(0);
  const current = COMPLEXES[active];

  return (
    <section
      id="complex"
      className="relative px-6 py-32 lg:px-12 lg:py-44"
      style={{ background: "var(--color-bone-soft)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 max-w-2xl lg:mb-24">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
            <span
              className="text-[10px] font-medium uppercase tracking-[0.42em]"
              style={{ color: "var(--color-mist)" }}
            >
              The Nine-Complex Experience
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
            Nine worlds, one <em style={{ color: "var(--color-emerald-deep)" }}>address</em>.
          </h2>
          <p className="mt-8 text-[16px] leading-[1.8]" style={{ color: "var(--color-stone)" }}>
            Each hub curated for a specific facet of the modern lifestyle — connected by a single architectural language and one impeccable standard of service.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Index */}
          <div className="lg:col-span-4">
            <ul className="border-t" style={{ borderColor: "var(--color-line)" }}>
              {COMPLEXES.map((complex, i) => {
                const isActive = i === active;
                return (
                  <li key={complex.id} className="border-b" style={{ borderColor: "var(--color-line)" }}>
                    <button
                      onClick={() => setActive(i)}
                      className="group flex w-full items-baseline justify-between gap-4 py-5 text-left transition-all"
                      aria-pressed={isActive}
                    >
                      <div className="flex items-baseline gap-5">
                        <span
                          className="font-display text-[14px] tabular-nums"
                          style={{ color: isActive ? "var(--color-gold)" : "var(--color-mist)" }}
                        >
                          {complex.number}
                        </span>
                        <span
                          className="font-display text-[26px] leading-none transition-colors"
                          style={{
                            color: isActive ? "var(--color-emerald-deep)" : "var(--color-charcoal)",
                            fontStyle: isActive ? "italic" : "normal",
                          }}
                        >
                          {complex.name}
                        </span>
                      </div>
                      <span
                        className="text-[18px] transition-transform"
                        style={{
                          color: isActive ? "var(--color-gold)" : "var(--color-mist)",
                          transform: isActive ? "translateX(4px)" : "translateX(0)",
                        }}
                      >
                        →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Detail */}
          <div className="lg:col-span-8">
            <div key={current.id} className="grid grid-cols-1 gap-8 sm:grid-cols-5">
              <div className="sm:col-span-3">
                <div
                  className="aspect-[4/5] overflow-hidden rounded-sm"
                  style={{
                    backgroundImage: `url(${current.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "var(--shadow-card)",
                  }}
                />
              </div>
              <div className="flex flex-col justify-between sm:col-span-2">
                <div>
                  <div className="eyebrow" style={{ color: "var(--color-gold)" }}>
                    Complex {current.number}
                  </div>
                  <h3 className="mt-3 font-display text-[40px] leading-[1.05]">{current.name}</h3>
                  <p className="mt-3 font-display text-[20px] italic" style={{ color: "var(--color-emerald-deep)" }}>
                    {current.tagline}
                  </p>
                  <p className="mt-6 text-[15px] leading-[1.8]" style={{ color: "var(--color-stone)" }}>
                    {current.description}
                  </p>
                </div>
                <ul className="mt-8 space-y-3 border-t pt-6" style={{ borderColor: "var(--color-line)" }}>
                  {current.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[13px]" style={{ color: "var(--color-charcoal)" }}>
                      <span
                        className="mt-[7px] inline-block h-px w-3 flex-shrink-0"
                        style={{ background: "var(--color-gold)" }}
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
