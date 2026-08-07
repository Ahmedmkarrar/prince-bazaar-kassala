"use client";

import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/i18n";

export function CeoMessage() {
  const { language } = useI18n();
  const isAr = language === "ar";

  return (
    <section
      className="px-6 lg:px-12 band"
      style={{ background: "var(--color-ivory)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p
            className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
            style={{ color: "var(--color-gold)" }}
          >
            {isAr ? "من المؤسس" : "From the Founder"}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <p
            aria-hidden
            className="mt-6"
            style={{
              color: "var(--color-royal-deep)",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(5rem, 10vw, 9rem)",
              lineHeight: 0.7,
              fontWeight: 500,
            }}
          >
            &ldquo;
          </p>
        </Reveal>

        <Reveal delay={120}>
          <blockquote
            className="font-display mx-auto mt-6 max-w-[26ch] tracking-[-0.01em]"
            style={{
              color: "var(--color-charcoal)",
              fontSize: "clamp(28px, 4vw, 48px)",
              lineHeight: 1.18,
              fontWeight: 400,
              textWrap: "balance",
            }}
          >
            Our achievements are made possible by close collaboration within our team and the confidence of our community.
          </blockquote>
        </Reveal>

        <Reveal delay={180}>
          <div
            className="mx-auto mt-10 h-px w-12 lg:mt-12"
            style={{ background: "var(--color-gold)" }}
            aria-hidden
          />
        </Reveal>

        <Reveal delay={220}>
          <p
            dir="rtl"
            lang="ar"
            className="font-arabic mx-auto mt-10 max-w-2xl text-[22px] leading-[1.75] lg:mt-12 lg:text-[26px]"
            style={{ color: "var(--color-stone)" }}
          >
            «تُحقَّق إنجازاتنا بفضل التعاون الوثيق داخل فريق العمل وثقة مجتمعنا بنا»
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-12 inline-flex items-center gap-5 lg:mt-16">
            <span
              className="h-px w-10"
              style={{ background: "var(--color-gold)" }}
              aria-hidden
            />
            <div className={isAr ? "text-right" : "text-left"}>
              <p
                className="font-display text-[20px]"
                style={{ color: "var(--color-charcoal)" }}
              >
                Isam Elshareef
              </p>
              <p
                className={`mt-1 text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "var(--color-mist)" }}
              >
                {isAr ? "المؤسس والرئيس التنفيذي" : "Founder & Chief Executive"}
              </p>
            </div>
            <span
              className="h-px w-10"
              style={{ background: "var(--color-gold)" }}
              aria-hidden
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
