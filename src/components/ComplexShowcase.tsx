"use client";

import { useState } from "react";
import { COMPLEXES, COPY } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Photo } from "./Photo";
import { useI18n } from "@/lib/i18n";

export function ComplexShowcase() {
  const [active, setActive] = useState(0);
  const current = COMPLEXES[active];
  const { language } = useI18n();
  const isAr = language === "ar";

  return (
    <section
      id="complex"
      className="relative px-6 lg:px-12 band-open"
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
            className={`mt-8 t-chapter ${isAr ? "font-arabic" : "font-display"}`}
            style={{
              color: "var(--color-charcoal)",
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
                      // Below lg this row opens a panel beneath itself, so it is
                      // an expander to a screen reader, not just a toggle.
                      aria-expanded={isActive}
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

                    {/* Accordion body — below lg only.
                        On desktop the detail sits in its own column beside this
                        list, always in view. Stacked on a phone that column
                        lands underneath all seven rows, so tapping one changed
                        a panel that was well off-screen and read as a dead
                        control. Opening the detail under the row that was
                        tapped keeps cause and effect together. */}
                    {isActive ? (
                      <div className="pb-9 lg:hidden">
                        {complex.image ? (
                          <div
                            className="photo-warm relative aspect-soft overflow-hidden rounded-sm"
                            style={{ boxShadow: "var(--shadow-card)" }}
                          >
                            <Photo
                              src={complex.image}
                              alt={complex.name.en}
                              sizes="92vw"
                              position={complex.focus}
                            />
                          </div>
                        ) : null}
                        <p
                          className={`mt-5 text-[15px] leading-[1.85] ${isAr ? "font-arabic" : ""}`}
                          style={{ color: "var(--color-stone)" }}
                        >
                          {complex.description[language]}
                        </p>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Detail — desktop only; the accordion above covers small screens. */}
          <div className="hidden lg:col-span-8 lg:block">
            <div key={current.id} className={`grid grid-cols-1 gap-8 ${current.image ? "sm:grid-cols-5" : ""}`}>
              {current.image ? (
                <div className="sm:col-span-3">
                  <div
                    className="photo-warm relative aspect-soft overflow-hidden rounded-sm"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <Photo
                      src={current.image}
                      alt={current.name.en}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 55vw, 500px"
                      position={current.focus}
                    />
                  </div>
                </div>
              ) : null}
              <div className={`flex flex-col justify-between ${current.image ? "sm:col-span-2" : ""}`}>
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
