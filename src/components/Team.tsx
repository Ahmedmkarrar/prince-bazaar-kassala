"use client";

import { Reveal } from "./Reveal";
import { TEAM } from "@/lib/content";
import { useI18n } from "@/lib/i18n";

export function Team() {
  const { language, t } = useI18n();
  const isAr = language === "ar";

  return (
    <section
      id="team"
      className="px-6 py-32 lg:px-12 lg:py-44"
      style={{ background: "var(--color-bone-soft)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "var(--color-mist)" }}
              >
                {t("The People", "الفريق")}
              </span>
            </div>
            <h2
              className={`mt-8 max-w-2xl tracking-[-0.015em] ${isAr ? "font-arabic" : "font-display"}`}
              style={{
                color: "var(--color-charcoal)",
                fontSize: "clamp(40px, 5.5vw, 76px)",
                lineHeight: 1.02,
                fontWeight: 400,
              }}
            >
              {isAr ? (
                <>
                  الفريق خلف <em className="not-italic" style={{ color: "var(--color-emerald-deep)" }}>البلازا</em>.
                </>
              ) : (
                <>
                  The team behind the <em style={{ color: "var(--color-emerald-deep)" }}>plaza</em>.
                </>
              )}
            </h2>
          </div>
          <p
            className={`max-w-md text-[16px] leading-[1.8] ${isAr ? "font-arabic" : ""}`}
            style={{ color: "var(--color-stone)" }}
          >
            {t(
              "Front office, housekeeping, security and guest relations — the same faces on every floor of the complex.",
              "الاستقبال والتدبير الفندقي والأمن وعلاقات الضيوف — الوجوه ذاتها في كل طابق من المجمع.",
            )}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {TEAM.map((m, i) => (
            <Reveal key={m.role.en} delay={i * 70}>
              <figure className="group flex h-full flex-col">
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-sm"
                  data-cursor="image"
                  style={{ boxShadow: "0 14px 34px -18px rgba(20,12,30,0.4)" }}
                >
                  <div
                    className="photo-warm absolute inset-0 bg-cover bg-center transition-transform duration-[1100ms] group-hover:scale-[1.06]"
                    style={{ backgroundImage: `url(${m.image})` }}
                  />
                  <span
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, transparent 60%, rgba(14,59,46,0.38) 100%)" }}
                  />
                </div>
                <figcaption className="mt-5">
                  <div
                    className={`text-[10px] font-medium uppercase tracking-[0.28em] ${isAr ? "font-arabic" : ""}`}
                    style={{ color: "var(--color-gold)" }}
                  >
                    {m.role[language]}
                  </div>
                  <p
                    className={`mt-2 text-[13px] leading-[1.7] ${isAr ? "font-arabic" : ""}`}
                    style={{ color: "var(--color-stone)" }}
                  >
                    {m.caption[language]}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
