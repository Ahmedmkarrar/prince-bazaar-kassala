"use client";

import { useI18n, type Currency, type Language } from "@/lib/i18n";

const CURRENCIES: Currency[] = ["USD", "EUR", "GBP", "AED"];

interface UtilityBarProps {
  variant?: "dark" | "light";
}

export function UtilityBar({ variant = "dark" }: UtilityBarProps) {
  const { currency, setCurrency, language, setLanguage } = useI18n();

  const isLight = variant === "light";
  const fg = isLight ? "var(--color-stone)" : "rgba(255,255,255,0.78)";
  const fgActive = isLight ? "var(--color-charcoal)" : "#FFFFFF";
  const sep = isLight ? "var(--color-line)" : "rgba(255,255,255,0.18)";

  return (
    <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em]">
      <div className="flex items-center gap-1">
        {(["en", "ar"] as Language[]).map((l) => (
          <button
            key={l}
            onClick={() => setLanguage(l)}
            className="px-1.5 py-1 transition-colors"
            style={{ color: language === l ? fgActive : fg }}
            aria-pressed={language === l}
          >
            {l === "en" ? "EN" : "ع"}
          </button>
        ))}
      </div>
      <span className="h-3 w-px" style={{ background: sep }} />
      <div className="flex items-center gap-1">
        {CURRENCIES.map((c) => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            className="px-1.5 py-1 transition-colors"
            style={{ color: currency === c ? fgActive : fg }}
            aria-pressed={currency === c}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
