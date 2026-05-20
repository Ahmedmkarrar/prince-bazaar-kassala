"use client";

import { useI18n, type Language } from "@/lib/i18n";

export function TopBar() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60]"
      style={{
        background: "rgba(20, 16, 28, 0.92)",
        backdropFilter: "saturate(140%) blur(14px)",
        WebkitBackdropFilter: "saturate(140%) blur(14px)",
        borderBottom: "1px solid rgba(233, 199, 123, 0.12)",
        color: "rgba(255,252,245,0.85)",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-2 text-[10px] font-medium uppercase tracking-[0.32em] lg:px-12">
        <span style={{ color: "var(--color-gold-soft)" }}>
          {t("Prince Plaza Kassala · Eastern Sudan", "برنس بلازا كسلا · شرق السودان")}
        </span>

        <div className="flex items-center gap-1.5">
          {(["en", "ar"] as Language[]).map((l, i) => (
            <span key={l} className="flex items-center gap-1.5">
              {i > 0 ? (
                <span
                  className="inline-block h-3 w-px"
                  style={{ background: "rgba(255,252,245,0.18)" }}
                  aria-hidden
                />
              ) : null}
              <button
                onClick={() => setLanguage(l)}
                aria-pressed={language === l}
                className="rounded-full px-2.5 py-1 transition-all"
                style={{
                  background: language === l ? "var(--color-gold)" : "transparent",
                  color: language === l ? "var(--color-charcoal)" : "rgba(255,252,245,0.65)",
                  letterSpacing: "0.22em",
                }}
              >
                {l === "en" ? "EN · English" : "ع · العربية"}
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
