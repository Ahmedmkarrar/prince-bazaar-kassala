"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Photo } from "./Photo";

type L = { en: string; ar: string };

interface Vignette {
  image: string;
  eyebrow: L;
  caption: L;
  number: string;
}

// A walk through the complex, not a second tour of the rooms.
//
// These five panels previously showed the Single, Double, Twin and Three Bed
// rooms — the same four the Suites section covers in full, with prices and
// enquiry links, a few screens further down. Desktop visitors met every room
// twice and the shared spaces not at all. Each panel now covers a part of the
// property that has no other full-bleed moment on the page.
const VIGNETTES: Vignette[] = [
  {
    number: "i",
    eyebrow: { en: "Reception", ar: "الاستقبال" },
    caption: {
      en: "Someone is at the desk whatever time you arrive.",
      ar: "هناك من يستقبلك عند المكتب في أي وقت تصل.",
    },
    image: "/hotel/reception-banner.webp",
  },
  {
    number: "ii",
    eyebrow: { en: "The Courtyard", ar: "الفناء" },
    caption: {
      en: "The open centre of the complex, with the balconies looking in.",
      ar: "قلب المجمّع المفتوح، تطلّ عليه الشرفات.",
    },
    image: "/hotel/courtyard-bazaar.webp",
  },
  {
    number: "iii",
    eyebrow: { en: "The Restaurant", ar: "المطعم" },
    caption: {
      en: "Breakfast through dinner, and room service for the hours between.",
      ar: "من الإفطار حتى العشاء، وخدمة الغرف في ما بينهما.",
    },
    image: "/hotel/restaurant.webp",
  },
  {
    number: "iv",
    eyebrow: { en: "The Commercial Plaza", ar: "البلازا التجارية" },
    caption: {
      en: "Shops along the frontage, a short walk from every room.",
      ar: "متاجر على الواجهة، على بعد خطوات من كل غرفة.",
    },
    image: "/hotel/plaza-shops.webp",
  },
  {
    number: "v",
    eyebrow: { en: "The Event Pavilion", ar: "جناح المناسبات" },
    caption: {
      en: "Weddings, conferences and gatherings of up to a hundred.",
      ar: "أعراس ومؤتمرات ولقاءات تتّسع حتى مئة ضيف.",
    },
    image: "/hotel/conference.webp",
  },
];

export function HorizontalPan() {
  const { language, t } = useI18n();
  const isAr = language === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const node = sectionRef.current;
      const track = trackRef.current;
      if (!node || !track) return;
      const rect = node.getBoundingClientRect();
      const total = node.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = -rect.top;
      const ratio = Math.max(0, Math.min(1, scrolled / total));
      setProgress(ratio);
      const trackWidth = track.scrollWidth - window.innerWidth;
      track.style.transform = `translate3d(${-trackWidth * ratio}px, 0, 0)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* Mobile and tablet.
          The desktop panel is a scroll-jacked track, which needs a pointer and
          a wide viewport, so below lg it was simply not rendered — five parts of
          the property that no other section covers were invisible to phone
          visitors, who are the majority here. This is the same content as a
          native scroll-snap carousel: swipeable, no hijacked scrolling, and it
          costs one screen rather than the five a stacked version would. */}
      <div
        className="lg:hidden"
        style={{ background: "var(--color-charcoal)" }}
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="px-6 pb-6 pt-20">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: "rgba(233,199,123,0.6)" }} />
            <span
              className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              {t("The Property", "المنشأة")}
            </span>
          </div>
        </div>

        <ul className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-20">
          {VIGNETTES.map((v) => (
            <li
              key={v.number}
              className="relative w-[82vw] flex-shrink-0 snap-center overflow-hidden rounded-sm"
            >
              <div className="photo-warm relative aspect-soft">
                <Photo src={v.image} alt="" sizes="82vw" />
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(10,7,16,0.88) 100%)",
                  }}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div
                  className={`text-[10px] font-medium uppercase tracking-[0.36em] ${isAr ? "font-arabic" : ""}`}
                  style={{ color: "rgba(233,199,123,0.9)" }}
                >
                  {v.eyebrow[language]}
                </div>
                <p
                  className={`mt-2 text-[19px] leading-[1.3] ${isAr ? "font-arabic" : "font-display"}`}
                  style={{ color: "#FFFFFF" }}
                >
                  {v.caption[language]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <section
        ref={sectionRef}
        className="relative hidden lg:block"
      // 62vh of scroll per panel rather than a full viewport each. The pan is
      // driven by a ratio of section height, so this only changes how much
      // wheel travel a panel costs — at 100vh the section alone was 4,500px,
      // a fifth of the page, and each panel took a full screen of scrolling to
      // clear.
      style={{ height: `${62 * VIGNETTES.length}vh`, background: "var(--color-charcoal)" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full will-change-transform"
          style={{ width: `${100 * VIGNETTES.length}vw` }}
        >
          {VIGNETTES.map((v, i) => (
            <div
              key={v.number}
              className="relative h-full w-screen flex-shrink-0 overflow-hidden"
              data-cursor="image"
            >
              <div className="photo-warm absolute inset-0">
                <Photo src={v.image} alt="" sizes="100vw" />
              </div>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(120deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.65) 100%)",
                }}
              />
              <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-12 pb-32">
                <div className="max-w-[640px]">
                  <div
                    className="font-display italic"
                    style={{
                      color: "rgba(233, 199, 123, 0.85)",
                      fontSize: "clamp(80px, 10vw, 140px)",
                      lineHeight: 0.85,
                      fontWeight: 400,
                    }}
                  >
                    {v.number}
                  </div>
                  <div
                    className={`mt-6 text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
                    style={{ color: "rgba(255,255,255,0.78)" }}
                  >
                    {v.eyebrow[language]}
                  </div>
                  <p
                    className={`mt-5 tracking-[-0.01em] ${isAr ? "font-arabic" : "font-display"}`}
                    style={{
                      color: "#FFFFFF",
                      fontSize: "clamp(28px, 3.4vw, 52px)",
                      lineHeight: 1.18,
                      fontWeight: 400,
                    }}
                  >
                    {v.caption[language]}
                  </p>
                </div>
              </div>
              <div
                className={`absolute bottom-12 right-12 text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {isAr ? `اللوحة ${i + 1} من ${VIGNETTES.length}` : `Plate ${i + 1} of ${VIGNETTES.length}`}
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-12 right-12 z-20">
          <div className="flex items-center gap-4">
            <span
              className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {t("The Property", "المنشأة")}
            </span>
            <div className="relative h-px flex-1" style={{ background: "rgba(255,255,255,0.2)" }}>
              <div
                className="absolute inset-y-0 left-0 transition-transform"
                style={{
                  width: "100%",
                  background: "rgba(233, 199, 123, 0.85)",
                  transform: `scaleX(${progress})`,
                  transformOrigin: "left center",
                }}
              />
            </div>
            <span
              className="text-[10px] font-medium uppercase tracking-[0.42em] tabular-nums"
              style={{ color: "rgba(233, 199, 123, 0.85)" }}
            >
              {Math.round(progress * 100)
                .toString()
                .padStart(2, "0")}
              %
            </span>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
