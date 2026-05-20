"use client";

import { useState } from "react";
import { COMPLEXES, COPY } from "@/lib/content";
import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/i18n";

export function ComplexShowcase() {
  const [active, setActive] = useState(0);
  const current = COMPLEXES[active];
  const { language } = useI18n();
  const isAr = language === "ar";

  return (
    <section
      id="complex"
      className="relative px-6 py-32 lg:px-12 lg:py-44"
      style={{ background: "var(--color-bone-soft)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 max-w-2xl lg:mb-24">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
            <span
              className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "var(--color-mist)" }}
            >
              {COPY.complex_eyebrow[language]}
            </span>
          </div>
          <h2
            className={`mt-8 tracking-[-0.015em] ${isAr ? "font-arabic" : "font-display"}`}
            style={{
              color: "var(--color-charcoal)",
              fontSize: "clamp(40px, 5.5vw, 76px)",
              lineHeight: 1.1,
              fontWeight: 400,
            }}
          >
            {COPY.complex_intro[language]}
          </h2>
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
                          className={`text-[26px] leading-none transition-colors ${isAr ? "font-arabic" : "font-display"}`}
                          style={{
                            color: isActive ? "var(--color-emerald-deep)" : "var(--color-charcoal)",
                            fontStyle: isActive && !isAr ? "italic" : "normal",
                          }}
                        >
                          {complex.name[language]}
                        </span>
                      </div>
                      <span
                        className="text-[18px] transition-transform"
                        style={{
                          color: isActive ? "var(--color-gold)" : "var(--color-mist)",
                          transform: isActive ? (isAr ? "translateX(-4px)" : "translateX(4px)") : "translateX(0)",
                        }}
                      >
                        {isAr ? "←" : "→"}
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
                  className="relative aspect-[4/5] overflow-hidden rounded-sm"
                  style={{
                    background: current.image
                      ? `url(${current.image}) center/cover no-repeat`
                      : "linear-gradient(135deg, var(--color-royal-deep) 0%, #14101C 55%, var(--color-charcoal) 100%)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  {!current.image ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                      <span
                        className="font-display text-[88px] leading-none sm:text-[120px]"
                        style={{ color: "var(--color-gold)", opacity: 0.5 }}
                      >
                        {current.number}
                      </span>
                      <span
                        className={`mt-6 text-[11px] font-medium uppercase tracking-[0.4em] ${isAr ? "font-arabic" : ""}`}
                        style={{ color: "var(--color-gold-soft)" }}
                      >
                        {current.name[language]}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col justify-between sm:col-span-2">
                <div>
                  <div className="eyebrow" style={{ color: "var(--color-gold)" }}>
                    {isAr ? `مجمّع ${current.number}` : `Complex ${current.number}`}
                  </div>
                  <h3 className={`mt-3 text-[40px] leading-[1.05] ${isAr ? "font-arabic" : "font-display"}`}>
                    {current.name[language]}
                  </h3>
                  <p
                    className={`mt-6 text-[15px] leading-[1.85] ${isAr ? "font-arabic" : ""}`}
                    style={{ color: "var(--color-stone)" }}
                  >
                    {current.description[language]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
