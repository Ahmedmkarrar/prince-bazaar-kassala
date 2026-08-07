"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { GALLERY } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Photo } from "./Photo";
import { useI18n } from "@/lib/i18n";

export function Gallery() {
  const { t, language } = useI18n();
  const isAr = language === "ar";
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
    <section className="relative px-6 lg:px-12 band" dir={isAr ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "var(--color-mist)" }}
              >
                {t("In Frame", "في الإطار")}
              </span>
            </div>
            <h2
              className={`mt-8 t-chapter ${isAr ? "font-arabic" : "font-display"}`}
              style={{
                color: "var(--color-charcoal)",
                lineHeight: 1.02,
                fontWeight: 400,
              }}
            >
              {isAr ? (
                <>لحظات في <em className="not-italic" style={{ color: "var(--color-emerald-deep)" }}>برنس بلازا</em>.</>
              ) : (
                <>Moments at <em style={{ color: "var(--color-emerald-deep)" }}>Prince Plaza</em>.</>
              )}
            </h2>
          </div>
        </Reveal>

        {/* Every source frame is 16:9, so the mosaic is built from landscape
            cells only — a wide cell spanning two columns, and standard 4:3
            cells. Nothing is cropped to portrait, which is what was cutting
            these interiors in half. */}
        <div className="grid grid-cols-2 gap-4 [grid-auto-flow:dense] sm:gap-6 md:grid-cols-4">
          {GALLERY.map((src, i) => {
            const wide = i === 0 || i === 5 || i === 10;
            // The span has to live on Reveal, not the button: Reveal renders the
            // div that is the grid's direct child, so a span class on the button
            // inside it was silently inert.
            return (
              <Reveal key={src} delay={i * 60} className={wide ? "col-span-2 row-span-2" : ""}>
                <button
                  onClick={() => setActive(i)}
                  data-cursor="image"
                  aria-label={`Open image ${i + 1}`}
                  className="group relative block h-full w-full"
                >
                  {/* Matted frame */}
                  <div
                    className="relative overflow-hidden rounded-md border p-[6px] transition-all duration-500
                      [border-color:var(--color-line)] [background:var(--color-ivory)]
                      [box-shadow:0_6px_20px_-10px_rgba(20,12,30,0.22)]
                      group-hover:-translate-y-[5px] group-hover:[border-color:var(--color-gold)]
                      group-hover:[box-shadow:0_26px_50px_-18px_rgba(14,59,46,0.34)]"
                  >
                    {/* Both sizes stay 4:3. A 2x2 cell is (2w + gap) wide and
                        two 4:3 rows tall, which is itself ~4:3 — so the wide
                        tile reads bigger without a different crop, and the rows
                        stay flush. */}
                    <div className="photo-warm relative aspect-soft overflow-hidden rounded-[3px]">
                      <Photo
                        src={src}
                        alt={`Prince Plaza Kassala — ${wide ? "wide view" : "detail"} ${i + 1}`}
                        sizes={
                          wide
                            ? "(max-width: 768px) 96vw, (max-width: 1400px) 50vw, 700px"
                            : "(max-width: 768px) 48vw, (max-width: 1400px) 25vw, 340px"
                        }
                        className="transition-transform duration-[900ms] group-hover:scale-[1.06]"
                      />
                      {/* Bottom gradient for depth */}
                      <span
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(180deg, transparent 55%, rgba(14,59,46,0.4) 100%)" }}
                      />
                      {/* Expand icon */}
                      <span
                        className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100"
                        style={{ background: "var(--color-ivory)", color: "var(--color-emerald-deep)" }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <path d="M5 19 L19 5 M19 5 L19 13 M19 5 L11 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
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
            className="relative max-h-full max-w-5xl overflow-hidden rounded-md border p-[6px]"
            style={{
              borderColor: "var(--color-gold)",
              background: "var(--color-ivory)",
              boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY[active].replace("-sm.webp", ".webp")}
              alt={t(
                `Prince Plaza Kassala, gallery image ${active + 1} of ${GALLERY.length}`,
                `برنس بلازا كسلا، صورة ${active + 1} من ${GALLERY.length}`,
              )}
              width={1280}
              height={720}
              sizes="(max-width: 1024px) 100vw, 1024px"
              quality={92}
              priority
              // contain, not cover: the lightbox is the one place the whole
              // frame should be visible rather than cropped to the container.
              className="block h-auto max-h-[80vh] w-full rounded-[3px] object-contain"
            />
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
