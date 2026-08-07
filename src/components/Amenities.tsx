"use client";

import { AMENITIES, COPY } from "@/lib/content";
import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/i18n";

export function Amenities() {
  const { language } = useI18n();
  const isAr = language === "ar";

  return (
    <section
      className="px-6 lg:px-12 band-tight"
      style={{ background: "var(--color-bone-soft)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "var(--color-mist)" }}
              >
                {COPY.amenities_eyebrow[language]}
              </span>
            </div>
            <p
              className={`mt-8 text-[17px] leading-[1.85] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "var(--color-charcoal)" }}
            >
              {COPY.amenities_intro[language]}
            </p>
          </div>
        </Reveal>

        <div
          className="mt-16 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4"
          style={{ background: "var(--color-line)" }}
        >
          {AMENITIES.map((a, i) => (
            <Reveal key={a.label.en} delay={i * 60}>
              <div className="px-6 py-10" style={{ background: "var(--color-bone-soft)" }}>
                <div
                  className={isAr ? "font-arabic" : "font-display"}
                  style={{ color: "var(--color-charcoal)", fontSize: "22px", fontWeight: 400 }}
                >
                  {a.label[language]}
                </div>
                <div
                  className={`mt-3 text-[13px] leading-[1.6] ${isAr ? "font-arabic" : ""}`}
                  style={{ color: "var(--color-stone)" }}
                >
                  {a.caption[language]}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
