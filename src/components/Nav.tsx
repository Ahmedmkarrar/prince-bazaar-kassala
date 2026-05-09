"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { UtilityBar } from "./UtilityBar";
import { useI18n } from "@/lib/i18n";

const LINKS = [
  { href: "#suites", en: "Stay", ar: "الإقامة" },
  { href: "#availability", en: "Availability", ar: "التوفر" },
  { href: "#conference", en: "Conference", ar: "المؤتمرات" },
  { href: "#tourism", en: "Discover", ar: "اكتشف" },
  { href: "#concierge", en: "Concierge", ar: "الكونسيرج" },
  { href: "#contact", en: "Contact", ar: "تواصل" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3"
          : "py-6"
      }`}
      style={{
        background: scrolled ? "rgba(255, 252, 245, 0.85)" : "transparent",
        backdropFilter: scrolled ? "saturate(140%) blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(140%) blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(217, 210, 194, 0.4)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12">
        <Link href="/" aria-label="Prince Bazaar Kassala home">
          <Logo variant={overHero ? "light" : "dark"} />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium uppercase tracking-[0.28em] transition-colors"
              style={{ color: overHero ? "rgba(255,255,255,0.78)" : "var(--color-stone)" }}
            >
              {t(link.en, link.ar)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <UtilityBar variant={overHero ? "dark" : "light"} />
          <span
            className="h-4 w-px"
            style={{ background: overHero ? "rgba(255,255,255,0.18)" : "var(--color-line)" }}
          />
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("pb:open-reservation"))}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-all"
            style={{
              background: overHero ? "#FFFFFF" : "var(--color-royal-deep)",
              color: overHero ? "#0A0A0A" : "var(--color-gold-pale)",
            }}
          >
            {t("Reserve", "احجز")}
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
          aria-label="Toggle menu"
          style={{
            borderColor: overHero ? "rgba(255,255,255,0.3)" : "var(--color-line)",
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
                <a href="#book" onClick={() => setOpen(false)} className="btn-primary flex-1 justify-center">
                  Book
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
