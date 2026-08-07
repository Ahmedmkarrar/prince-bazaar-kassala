"use client";

import { TAKA_IMAGE, COPY } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Photo } from "./Photo";
import { useI18n } from "@/lib/i18n";

export function Tourism() {
  const { language } = useI18n();
  const isAr = language === "ar";

  return (
    <section
      id="tourism"
      className="relative px-6 lg:px-12 band-tight"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "var(--color-mist)" }}
              >
                {COPY.tourism_eyebrow[language]}
              </span>
            </div>
            <p
              className={`mt-8 text-[18px] leading-[1.85] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "var(--color-charcoal)" }}
            >
              {COPY.tourism_p1[language]}
            </p>
            <p
              className={`mt-6 text-[16px] leading-[1.85] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "var(--color-stone)" }}
            >
              {COPY.tourism_p2[language]}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => typeof window !== "undefined" && window.dispatchEvent(new CustomEvent("pb:open-reservation"))}
                className={`btn-primary ${isAr ? "font-arabic" : ""}`}
              >
                {COPY.cta_book[language]}
              </button>
              <a href="#complex" className={`btn-ghost ${isAr ? "font-arabic" : ""}`}>
                {COPY.cta_explore[language]}
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            {/* 16:9, matching the source. The old 21:9 cinema crop cut a third
                of the frame height off a mountain landscape — the subject. */}
            <div
              className="photo-warm relative aspect-frame overflow-hidden rounded-sm"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <Photo
                src={TAKA_IMAGE}
                alt="The Taka Mountains seen from Prince Plaza Kassala"
                sizes="(max-width: 1024px) 92vw, 760px"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 40%, rgba(14,59,46,0.8) 100%)" }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
