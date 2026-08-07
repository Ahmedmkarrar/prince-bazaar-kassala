"use client";

import { Reveal } from "./Reveal";
import { BrandMark } from "./BrandMark";
import { COPY } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function Story() {
  const { language } = useI18n();
  const isAr = language === "ar";

  return (
    <section
      id="story"
      className="relative overflow-hidden px-6 lg:px-12 band-open"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div
        className={`pointer-events-none absolute top-16 hidden opacity-[0.07] md:block ${isAr ? "-left-32" : "-right-32"}`}
        aria-hidden
      >
        <BrandMark color="var(--color-royal)" size={520} />
      </div>
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
            <span
              className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "var(--color-mist)" }}
            >
              {COPY.vision_eyebrow[language]}
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <h2
              className={`t-chapter ${isAr ? "font-arabic" : "font-display"}`}
              style={{
                color: "var(--color-charcoal)",
                lineHeight: 1.1,
                fontWeight: 400,
              }}
            >
              {COPY.vision_p1[language]}
            </h2>
          </Reveal>

          <div className="space-y-8 lg:col-span-5">
            <Reveal delay={120}>
              <p
                className={`text-[17px] leading-[1.85] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "var(--color-charcoal)" }}
              >
                {COPY.vision_p2[language]}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p
                className={`text-[16px] leading-[1.85] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "var(--color-stone)" }}
              >
                {COPY.welcome[language]}
              </p>
            </Reveal>
            <Reveal delay={280}>
              <a
                href="#complex"
                className={`inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "var(--color-emerald-deep)" }}
              >
                <span className="h-px w-8" style={{ background: "var(--color-emerald-deep)" }} />
                {COPY.cta_explore[language]}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
