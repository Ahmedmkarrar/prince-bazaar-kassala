"use client";

import { useEffect, useState } from "react";
import { GALLERY } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      else if (e.key === "ArrowRight") setActive((v) => (v === null ? 0 : (v + 1) % GALLERY.length));
      else if (e.key === "ArrowLeft") setActive((v) => (v === null ? 0 : (v - 1 + GALLERY.length) % GALLERY.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section className="relative px-6 py-32 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "var(--color-mist)" }}
              >
                In Frame
              </span>
            </div>
            <h2
              className="mt-8 font-display tracking-[-0.015em]"
              style={{
                color: "var(--color-charcoal)",
                lineHeight: 1.02,
                fontSize: "clamp(40px, 5.5vw, 76px)",
                fontWeight: 400,
              }}
            >
              Moments at <em style={{ color: "var(--color-emerald-deep)" }}>Prince Plaza</em>.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
          {GALLERY.map((src, i) => (
            <Reveal key={src} delay={i * 60}>
              <button
                onClick={() => setActive(i)}
                data-cursor="image"
                className={`group relative block w-full overflow-hidden rounded-sm ${
                  i % 5 === 0 ? "row-span-2 aspect-portrait" : "aspect-square"
                }`}
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                aria-label={`Open image ${i + 1}`}
              >
                <span
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
                  style={{ background: "linear-gradient(180deg, transparent 50%, rgba(14,59,46,0.35) 100%)" }}
                />
                <span
                  className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ background: "var(--color-ivory)", color: "var(--color-emerald-deep)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 19 L19 5 M19 5 L19 13 M19 5 L11 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {active !== null ? (
        <div
          data-no-smooth
          className="fixed inset-0 z-[60] flex items-center justify-center px-4 py-8"
          style={{ background: "rgba(8, 32, 24, 0.92)" }}
          onClick={() => setActive(null)}
        >
          <button
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.1)", color: "var(--color-gold-pale)" }}
            onClick={(e) => {
              e.stopPropagation();
              setActive(null);
            }}
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.1)", color: "var(--color-gold-pale)" }}
            onClick={(e) => {
              e.stopPropagation();
              setActive((v) => (v === null ? 0 : (v - 1 + GALLERY.length) % GALLERY.length));
            }}
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M14 6 L8 12 L14 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: "rgba(255,255,255,0.1)", color: "var(--color-gold-pale)" }}
            onClick={(e) => {
              e.stopPropagation();
              setActive((v) => (v === null ? 0 : (v + 1) % GALLERY.length));
            }}
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M10 6 L16 12 L10 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="relative max-h-full max-w-5xl overflow-hidden rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={GALLERY[active]} alt="" className="block h-auto max-h-[80vh] w-full object-cover" />
            <div
              className="absolute bottom-4 left-4 text-[10px] font-medium uppercase tracking-[0.32em]"
              style={{ color: "var(--color-gold-pale)" }}
            >
              {active + 1} / {GALLERY.length}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
