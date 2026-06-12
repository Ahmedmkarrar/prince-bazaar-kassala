"use client";

import { useI18n } from "@/lib/i18n";

type L = { en: string; ar: string };

const TRUST_LINES: L[] = [
  { en: "Diplomatic Missions", ar: "البعثات الدبلوماسية" },
  { en: "International Press", ar: "الصحافة الدولية" },
  { en: "Heads of State", ar: "رؤساء الدول" },
  { en: "Cultural Patrons", ar: "رُعاة الثقافة" },
  { en: "Wedding Parties", ar: "حفلات الزفاف" },
  { en: "Trade Delegations", ar: "الوفود التجارية" },
];

export function Press() {
  const { language, t } = useI18n();
  const isAr = language === "ar";

  return (
    <section
      className="border-y px-6 py-10 lg:px-12"
      style={{ borderColor: "var(--color-line)", background: "var(--color-ivory)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
          <div className="sm:col-span-3">
            <div
              className={`text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "var(--color-mist)" }}
            >
              {t("Trusted by", "موضع ثقة")}
            </div>
          </div>
          <div className="sm:col-span-9">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 sm:gap-x-10">
              {TRUST_LINES.map((line, i) => (
                <li key={line.en} className="flex items-center gap-8">
                  <span
                    className={`text-[14px] font-medium tracking-[0.04em] ${isAr ? "font-arabic" : ""}`}
                    style={{ color: "var(--color-charcoal)", fontFamily: isAr ? undefined : "var(--font-display)" }}
                  >
                    {line[language]}
                  </span>
                  {i < TRUST_LINES.length - 1 ? (
                    <span className="hidden h-1 w-1 rounded-full sm:inline-block" style={{ background: "var(--color-gold)" }} />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
