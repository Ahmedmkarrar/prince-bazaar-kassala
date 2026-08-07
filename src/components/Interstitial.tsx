"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { Photo } from "./Photo";

type L = { en: string; ar: string };

interface InterstitialProps {
  image: string;
  eyebrow: L;
  line1: L;
  line2: L;
  attribution?: L;
  align?: "left" | "right" | "center";
}

export function Interstitial({
  image,
  eyebrow,
  line1,
  line2,
  attribution,
  align = "left",
}: InterstitialProps) {
  const { language } = useI18n();
  const isAr = language === "ar";
  const imgRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const node = sectionRef.current;
      const img = imgRef.current;
      if (!node || !img) return;
      const rect = node.getBoundingClientRect();
      const offset = rect.top * 0.25;
      img.style.transform = `translateY(${offset}px) scale(1.08)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const alignmentClass =
    align === "right" ? "items-end text-end" : align === "center" ? "items-center text-center" : "items-start text-start";

  return (
    <section
      ref={sectionRef}
      dir={isAr ? "rtl" : "ltr"}
      className="relative h-[80vh] min-h-[640px] w-full overflow-hidden"
      data-cursor="image"
    >
      <div ref={imgRef} className="photo-warm photo-grain absolute inset-0 will-change-transform">
        <Photo src={image} alt="" sizes="100vw" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.20) 35%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </div>

      <div
        className={`relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 lg:px-12 ${alignmentClass}`}
      >
        <div className={`flex max-w-[920px] flex-col gap-6 ${align === "right" ? "ml-auto" : ""}`}>
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: "rgba(255,255,255,0.55)" }} />
            <span
              className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              {eyebrow[language]}
            </span>
          </div>
          <h2
            className={`t-statement ${isAr ? "font-arabic" : "font-display"}`}
            style={{
              color: "#FFFFFF",
              lineHeight: 1.04,
              fontWeight: 400,
            }}
          >
            {line1[language]}
            <br />
            <em className={isAr ? "not-italic" : ""} style={{ color: "#E9C77B", fontWeight: 300 }}>{line2[language]}</em>
          </h2>
          {attribution ? (
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8" style={{ background: "rgba(233, 199, 123, 0.7)" }} />
              <span
                className={`text-[11px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {attribution[language]}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
