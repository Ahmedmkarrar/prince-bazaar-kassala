"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore, type ReactNode } from "react";

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

// Also read by the inline script in app/layout.tsx, which applies lang/dir
// before first paint. Keep both in sync.
const STORAGE_KEY = "pb_locale_v1";

interface Locale {
  currency: Currency;
  language: Language;
}

const SERVER_LOCALE: Locale = { currency: "USD", language: "en" };

// Locale lives outside React because it is read from localStorage and mirrored
// onto <html>. useSyncExternalStore lets the server render the default and the
// client swap to the stored value without a hydration mismatch.
let snapshot: Locale = SERVER_LOCALE;
let hydrated = false;
const listeners = new Set<() => void>();

function readStored(): Locale {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SERVER_LOCALE;
    const parsed = JSON.parse(raw) as Partial<Locale>;
    return {
      currency: parsed.currency && parsed.currency in RATES ? parsed.currency : SERVER_LOCALE.currency,
      language: parsed.language === "ar" ? "ar" : "en",
    };
  } catch {
    return SERVER_LOCALE;
  }
}

function subscribe(listener: () => void) {
  // The first subscriber pulls the stored value in. Doing it here rather than
  // at module scope keeps the module import side-effect free on the server.
  if (!hydrated) {
    hydrated = true;
    const stored = readStored();
    if (stored.currency !== snapshot.currency || stored.language !== snapshot.language) {
      snapshot = stored;
      applyDocumentLanguage(snapshot.language);
      queueMicrotask(() => listeners.forEach((l) => l()));
    } else {
      applyDocumentLanguage(snapshot.language);
    }
  }
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): Locale {
  return snapshot;
}

function getServerSnapshot(): Locale {
  return SERVER_LOCALE;
}

function applyDocumentLanguage(language: Language) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
}

function setLocale(patch: Partial<Locale>) {
  const next: Locale = { ...snapshot, ...patch };
  if (next.currency === snapshot.currency && next.language === snapshot.language) return;
  snapshot = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Private browsing / storage disabled — the choice just won't persist.
  }
  applyDocumentLanguage(next.language);
  listeners.forEach((l) => l());
}

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const { currency, language } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setCurrency = useCallback((c: Currency) => setLocale({ currency: c }), []);
  const setLanguage = useCallback((l: Language) => setLocale({ language: l }), []);

  const value = useMemo<Ctx>(
    () => ({
      currency,
      setCurrency,
      language,
      setLanguage,
      format: (usd: number) => `${SYMBOLS[currency]}${Math.round(usd * RATES[currency]).toLocaleString()}`,
      t: (en: string, ar: string) => (language === "ar" ? ar : en),
    }),
    [currency, language, setCurrency, setLanguage],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
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
