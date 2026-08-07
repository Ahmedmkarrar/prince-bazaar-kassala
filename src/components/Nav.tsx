"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { useMagnetic } from "@/lib/useMagnetic";

const LINKS = [
  { href: "#complex", en: "The Complex", ar: "المجمعات" },
  { href: "#suites", en: "Stay", ar: "الإقامة" },
  { href: "#concierge", en: "Concierge", ar: "الكونسيرج" },
  { href: "#contact", en: "Contact", ar: "تواصل" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t, language } = useI18n();
  const isAr = language === "ar";
  const magBtn = useMagnetic(0.4);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "top-[34px] py-3"
          : "top-[34px] py-5"
      }`}
      style={{
        background: scrolled ? "rgba(255, 252, 245, 0.85)" : "transparent",
        backdropFilter: scrolled ? "saturate(140%) blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(140%) blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(217, 210, 194, 0.4)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12">
        <Link href="/" aria-label="Prince Plaza Kassala home">
          <Logo variant={overHero ? "light" : "dark"} />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`link-underline text-[11px] font-medium uppercase tracking-[0.28em] transition-colors hover:text-[var(--color-gold-soft)] ${isAr ? "font-arabic" : ""}`}
              style={{ color: overHero ? "rgba(255,255,255,0.78)" : "var(--color-stone)" }}
            >
              {t(link.en, link.ar)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <button
            ref={magBtn as React.RefObject<HTMLButtonElement>}
            onClick={() => window.dispatchEvent(new CustomEvent("pb:open-reservation"))}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-[background,color,box-shadow] duration-300 hover:shadow-[0_14px_30px_-12px_rgba(59,22,96,0.5)]"
            style={{
              background: overHero ? "#FFFFFF" : "var(--color-royal-deep)",
              color: overHero ? "#0A0A0A" : "var(--color-gold-pale)",
            }}
          >
            {t("WhatsApp", "واتساب")}
          </button>
        </div>

        {/* Labelled, not just an icon. Client feedback was "there is no clear
            menu" — two unlabelled hairlines in a 40px circle read as decoration
            rather than navigation, especially for visitors who are not daily
            users of Western app conventions. */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 items-center gap-2.5 rounded-full border px-4 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          style={{
            borderColor: overHero ? "rgba(255,255,255,0.45)" : "var(--color-line)",
            background: overHero ? "rgba(0,0,0,0.22)" : "var(--color-ivory)",
          }}
        >
          <span className="relative block h-2.5 w-5">
            <span
              className={`absolute inset-x-0 top-0 h-px transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`}
              style={{ background: overHero ? "#FFFFFF" : "var(--color-charcoal)" }}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-px transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
              style={{ background: overHero ? "#FFFFFF" : "var(--color-charcoal)" }}
            />
          </span>
          <span
            className={`text-[11px] font-medium uppercase tracking-[0.22em] ${isAr ? "font-arabic" : ""}`}
            style={{ color: overHero ? "#FFFFFF" : "var(--color-charcoal)" }}
          >
            {open ? t("Close", "إغلاق") : t("Menu", "القائمة")}
          </span>
        </button>
      </div>

      {open ? (
        <div className="lg:hidden">
          <div className="mx-6 mt-4 rounded-2xl glass-light p-6">
            <div className="flex flex-col gap-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[13px] font-medium uppercase tracking-[0.2em]"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  {t(link.en, link.ar)}
                </a>
              ))}
              <div className="mt-2 flex gap-3">
                <a href="#concierge" onClick={() => setOpen(false)} className="btn-ghost flex-1 justify-center">
                  Ask AI
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="btn-primary flex-1 justify-center">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
