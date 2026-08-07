"use client";

import { Reveal } from "./Reveal";
import { Photo } from "./Photo";
import { useI18n } from "@/lib/i18n";
import { COPY, PIEDMONT_IMAGE, PIEDMONT_SERVICES, PIEDMONT_WHY } from "@/lib/content";

export function Piedmont() {
  const { language } = useI18n();
  const isAr = language === "ar";

  return (
    <section
      id="piedmont"
      className="relative px-6 lg:px-12 band"
      style={{ background: "var(--color-charcoal)", color: "var(--color-ivory)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span
                  className="h-px w-10"
                  style={{ background: "rgba(233, 199, 123, 0.65)" }}
                />
                <span
                  className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
                  style={{ color: "var(--color-gold-soft)" }}
                >
                  {COPY.piedmont_eyebrow[language]}
                </span>
              </div>
              <h2
                className={`mt-8 t-chapter ${isAr ? "font-arabic" : "font-display"}`}
                style={{
                  color: "#FFFFFF",
                  lineHeight: 1.08,
                  fontWeight: 400,
                }}
              >
                {/* The eyebrow directly above already carries the agency name;
                    repeating it verbatim as the heading left the section
                    introducing itself twice and saying nothing. */}
                {language === "ar"
                  ? "رحلتك، مُرتَّبة في البهو."
                  : "Your journey, arranged in the lobby."}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p
                className={`text-[17px] leading-[1.85] sm:text-[18px] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "rgba(255, 252, 245, 0.82)" }}
              >
                {COPY.piedmont_intro[language]}
              </p>
              <div
                className="relative mt-10 aspect-[16/9] overflow-hidden rounded-sm"
                data-cursor="image"
                style={{ boxShadow: "0 30px 70px -24px rgba(0,0,0,0.65)" }}
              >
                <Photo
                  src={PIEDMONT_IMAGE}
                  alt="The Piedmont Travel and Tourism team at Prince Plaza Kassala"
                  sizes="(max-width: 1024px) 92vw, 760px"
                  className="photo-warm transition-transform duration-[1200ms] hover:scale-[1.04]"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 55%, rgba(20,12,30,0.72) 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Core Services */}
        <div className="mt-20 lg:mt-28">
          <Reveal>
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8"
                style={{ background: "var(--color-gold-soft)" }}
              />
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "var(--color-gold-soft)" }}
              >
                {COPY.piedmont_services_eyebrow[language]}
              </span>
            </div>
          </Reveal>

          <div
            className="mt-10 grid grid-cols-1 gap-px lg:grid-cols-3"
            style={{ background: "rgba(233, 199, 123, 0.18)" }}
          >
            {PIEDMONT_SERVICES.map((s, i) => (
              <Reveal key={s.title.en} delay={i * 80}>
                <div
                  className="h-full px-7 py-10 lg:px-9 lg:py-12"
                  style={{ background: "var(--color-charcoal)" }}
                >
                  <div
                    className="font-display text-[14px] tabular-nums"
                    style={{ color: "var(--color-gold)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className={`mt-5 text-[22px] leading-[1.2] sm:text-[24px] ${isAr ? "font-arabic" : "font-display"}`}
                    style={{ color: "#FFFFFF" }}
                  >
                    {s.title[language]}
                  </h3>
                  <p
                    className={`mt-4 text-[14px] leading-[1.8] ${isAr ? "font-arabic" : ""}`}
                    style={{ color: "rgba(255, 252, 245, 0.7)" }}
                  >
                    {s.body[language]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-20 lg:mt-28">
          <Reveal>
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8"
                style={{ background: "var(--color-gold-soft)" }}
              />
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "var(--color-gold-soft)" }}
              >
                {COPY.piedmont_why_eyebrow[language]}
              </span>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-14">
            {PIEDMONT_WHY.map((w, i) => (
              <Reveal key={w.title.en} delay={i * 80}>
                <div
                  className="border-t pt-6"
                  style={{ borderColor: "rgba(233, 199, 123, 0.25)" }}
                >
                  <h3
                    className={`text-[22px] leading-[1.2] ${isAr ? "font-arabic" : "font-display"}`}
                    style={{ color: "#FFFFFF" }}
                  >
                    {w.title[language]}
                  </h3>
                  <p
                    className={`mt-4 text-[14px] leading-[1.85] ${isAr ? "font-arabic" : ""}`}
                    style={{ color: "rgba(255, 252, 245, 0.7)" }}
                  >
                    {w.body[language]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
