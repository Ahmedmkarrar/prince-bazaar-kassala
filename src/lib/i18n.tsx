"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Currency = "USD" | "EUR" | "GBP" | "AED";
export type Language = "en" | "ar";

interface Ctx {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  format: (usd: number) => string;
  t: (en: string, ar: string) => string;
}

const RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.78,
  AED: 3.67,
};

const SYMBOLS: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  AED: "AED ",
};

const STORAGE_KEY = "pb_locale_v1";

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as { currency?: Currency; language?: Language };
        if (parsed.currency) setCurrency(parsed.currency);
        if (parsed.language) setLanguage(parsed.language);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ currency, language }));
    } catch {
      // ignore
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    }
  }, [currency, language]);

  const format = (usd: number) => {
    const rate = RATES[currency];
    const symbol = SYMBOLS[currency];
    const value = Math.round(usd * rate);
    return `${symbol}${value.toLocaleString()}`;
  };

  const t = (en: string, ar: string) => (language === "ar" ? ar : en);

  return (
    <I18nContext.Provider value={{ currency, setCurrency, language, setLanguage, format, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      currency: "USD" as Currency,
      setCurrency: () => {},
      language: "en" as Language,
      setLanguage: () => {},
      format: (usd: number) => `$${usd.toLocaleString()}`,
      t: (en: string) => en,
    } satisfies Ctx;
  }
  return ctx;
}
