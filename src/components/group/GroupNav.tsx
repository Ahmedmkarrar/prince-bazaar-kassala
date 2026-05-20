"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SECTORS } from "@/lib/group";

const LINKS = [
  { href: "/shahad/about", label: "About" },
  { href: "/shahad/construction", label: "Construction" },
  { href: "/shahad/real-estate", label: "Real Estate" },
  { href: "/shahad/prince-hotel", label: "Prince Hotel" },
  { href: "/", label: "Prince Plaza" },
  { href: "/shahad/contact", label: "Contact" },
];

type GroupNavProps = {
  variant?: "transparent" | "solid";
};

export function GroupNav({ variant = "transparent" }: GroupNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = variant === "transparent" && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}
      style={{
        background: scrolled || variant === "solid" ? "rgba(255, 252, 245, 0.92)" : "transparent",
        backdropFilter: scrolled || variant === "solid" ? "saturate(140%) blur(20px)" : "none",
        WebkitBackdropFilter: scrolled || variant === "solid" ? "saturate(140%) blur(20px)" : "none",
        borderBottom: scrolled || variant === "solid" ? "1px solid rgba(217, 210, 194, 0.4)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 lg:px-12">
        <Link href="/shahad" className="flex items-center gap-3" aria-label="Shahad Group home">
          <span
            className="font-display text-[20px] tracking-[0.04em]"
            style={{ color: overHero ? "#FFFFFF" : "var(--color-charcoal)" }}
          >
            Shahad
          </span>
          <span
            className="text-[10px] font-medium uppercase tracking-[0.4em]"
            style={{ color: overHero ? "rgba(255,255,255,0.7)" : "var(--color-gold)" }}
          >
            Group
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium uppercase tracking-[0.26em] transition-colors hover:opacity-100"
              style={{ color: overHero ? "rgba(255,255,255,0.78)" : "var(--color-stone)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/shahad/contact"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-all"
            style={{
              background: overHero ? "#FFFFFF" : "var(--color-royal-deep)",
              color: overHero ? "#0A0A0A" : "var(--color-gold-pale)",
            }}
          >
            Inquire
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
          aria-label="Toggle menu"
          style={{ borderColor: overHero ? "rgba(255,255,255,0.3)" : "var(--color-line)" }}
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
          <div className="glass-light mx-6 mt-4 rounded-2xl p-6">
            <div className="flex flex-col gap-4">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[13px] font-medium uppercase tracking-[0.2em]"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/shahad/contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 justify-center"
              >
                Inquire
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export { SECTORS };
