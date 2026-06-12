"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

type L = { en: string; ar: string };

interface Vignette {
  image: string;
  eyebrow: L;
  caption: L;
  number: string;
}

const VIGNETTES: Vignette[] = [
  {
    number: "i",
    eyebrow: { en: "The King Suite", ar: "جناح بسرير كبير" },
    caption: {
      en: "Climate-controlled comfort, hardwood floors, and a quiet that feels rare.",
      ar: "راحة بتكييف كامل، أرضيات خشبية، وهدوء نادر.",
    },
    image: "/hotel/room-king-warm.jpg",
  },
  {
    number: "ii",
    eyebrow: { en: "The Double", ar: "الغرفة المزدوجة" },
    caption: {
      en: "Spacious double room with an extended living area and premium furnishings.",
      ar: "غرفة مزدوجة واسعة بمساحة معيشة ممتدة وأثاث فاخر.",
    },
    image: "/hotel/room-presidential.jpg",
  },
  {
    number: "iii",
    eyebrow: { en: "The Twin", ar: "الجناح بسريرين" },
    caption: {
      en: "Two beds, considered details, and the same uncompromised standard.",
      ar: "سريران، تفاصيل مدروسة، والمعيار ذاته دون تنازل.",
    },
    image: "/hotel/room-twin-cream.jpg",
  },
  {
    number: "iv",
    eyebrow: { en: "Three Bed Suite", ar: "جناح بثلاثة أسرّة" },
    caption: {
      en: "Triple-bed layout, in-room television, ideal for families and small groups.",
      ar: "ثلاثة أسرّة، تلفاز في الغرفة، مثالي للعائلات والمجموعات الصغيرة.",
    },
    image: "/hotel/room-family.jpg",
  },
  {
    number: "v",
    eyebrow: { en: "Sunset Room", ar: "غرفة الغروب" },
    caption: {
      en: "Warm evening light through the curtains. Quiet, considered, ours.",
      ar: "ضوء مسائي دافئ عبر الستائر. هادئة، مدروسة، خاصّة بنا.",
    },
    image: "/hotel/room-king-sunset.jpg",
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
    <section
      ref={sectionRef}
      className="relative hidden lg:block"
      style={{ height: `${100 * VIGNETTES.length}vh`, background: "var(--color-charcoal)" }}
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
              <div
                className="photo-warm absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${v.image})` }}
              />
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
  );
}
