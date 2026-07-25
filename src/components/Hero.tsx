"use client";

import { useEffect, useRef } from "react";
import { HERO_IMAGE, COPY } from "@/lib/content";
import { useI18n } from "@/lib/i18n";
import { useMagnetic } from "@/lib/useMagnetic";

export function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const magCta = useMagnetic(0.5);
  const { language, t } = useI18n();
  const isAr = language === "ar";

  useEffect(() => {
    // Word fade-in is the only Hero animation — it runs once on mount.
    // Scroll/mouse parallax was removed because it was the main cause of
    // janky scroll on lower-end devices.
    //
    // The animated spans are collected from the DOM rather than through ref
    // callbacks: a per-word callback would be created during render, which is
    // exactly what the refs-during-render rule forbids. Stagger order follows
    // document order.
    const root = titleRef.current;
    if (!root) return;

    const words = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-word]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      for (const el of words) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
      return;
    }

    const timers = words.map((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      return window.setTimeout(() => {
        el.style.transition =
          "opacity 800ms cubic-bezier(0.22,1,0.36,1), transform 800ms cubic-bezier(0.22,1,0.36,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 120 + i * 90);
    });

    return () => timers.forEach(clearTimeout);
  }, [language]);

  return (
    <section className="relative h-[100svh] min-h-[760px] w-full overflow-hidden bg-black">
      {/* Photo background */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <div
          className="absolute inset-0 bg-cover"
          style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundPosition: "62% center" }}
        />
        {/* Top → bottom darkness */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.30) 30%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.92) 100%)",
          }}
        />
        {/* Left vignette for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.20) 45%, transparent 80%)",
          }}
        />
        {/* Royal purple wash to bring in brand color */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 600px at 85% 30%, rgba(93, 42, 134, 0.32), transparent 65%)",
          }}
        />
      </div>

      {/* Top hairline */}
      <div className="absolute inset-x-0 top-24 z-10 mx-auto flex max-w-[1400px] items-center justify-center gap-5 px-6 lg:px-12">
        <span className="h-px flex-1 max-w-[160px]" style={{ background: "rgba(255,255,255,0.22)" }} />
        <span
          className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
          style={{ color: "rgba(255,255,255,0.82)" }}
        >
          {t("Prince Plaza Kassala", "برنس بلازا كسلا")}
        </span>
        <span className="h-px flex-1 max-w-[160px]" style={{ background: "rgba(255,255,255,0.22)" }} />
      </div>

      {/* Hero copy */}
      <div
        ref={titleRef}
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 pb-12 pt-32 will-change-transform sm:pb-16 sm:pt-36 lg:px-12 lg:pt-40"
      >
        <div className="max-w-[980px]">
          <div className="mb-8 flex items-center gap-3 overflow-hidden">
            <span data-hero-word className="inline-block h-px w-12" style={{ background: "rgba(255,255,255,0.55)" }} />
            <span
              data-hero-word
              className={`inline-block text-[11px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              {COPY.hero_subtitle[language]}
            </span>
          </div>

          <h1
            className={`tracking-[-0.015em] ${isAr ? "font-arabic" : "font-display"}`}
            style={{
              color: "#FFFFFF",
              lineHeight: isAr ? 1.1 : 0.96,
              fontSize: isAr ? "clamp(38px, 6.5vw, 96px)" : "clamp(48px, 8vw, 124px)",
              fontWeight: 400,
            }}
            dir={isAr ? "rtl" : "ltr"}
          >
            {isAr ? (
              <span className="block">{COPY.tagline.ar}</span>
            ) : (
              <>
                <span className="block overflow-hidden">
                  <span data-hero-word className="inline-block">Where Arabic Elegance</span>
                </span>
                <span className="block overflow-hidden">
                  <span data-hero-word className="text-foil inline-block italic" style={{ fontWeight: 300 }}>
                    Meets the Heart of Sudan.
                  </span>
                </span>
              </>
            )}
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-4 sm:mt-12">
            <span data-hero-word className="inline-block">
              <button
                ref={magCta as React.RefObject<HTMLButtonElement>}
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("pb:open-reservation"))}
                className={`hero-cta-primary ${isAr ? "font-arabic" : ""}`}
              >
                {COPY.cta_book[language]}
                <span aria-hidden>{isAr ? "←" : "→"}</span>
              </button>
            </span>
            <span data-hero-word className="inline-block">
              <a href="#complex" className={`hero-cta-ghost ${isAr ? "font-arabic" : ""}`}>
                {COPY.cta_explore[language]}
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom-centred, well below CTAs */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 sm:flex">
        <div className="flex flex-col items-center gap-2">
          <span
            className={`text-[9px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {isAr ? "اسحب للأسفل" : "Scroll"}
          </span>
          <span
            className="h-8 w-px"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        .hero-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.1rem 2rem;
          background: #FFFFFF;
          color: #0A0A0A;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          border-radius: 999px;
          transition: background 0.4s cubic-bezier(0.22, 1, 0.36, 1), color 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }
        .hero-cta-primary:hover {
          background: #E9C77B;
          color: #0A0A0A;
          box-shadow: 0 18px 40px -14px rgba(233, 199, 123, 0.6);
        }
        .hero-cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          padding: 1.1rem 2rem;
          background: transparent;
          color: rgba(255, 255, 255, 0.92);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          transition: all 0.3s ease;
        }
        .hero-cta-ghost:hover {
          border-color: #E9C77B;
          color: #E9C77B;
        }
      `}</style>
    </section>
  );
}
