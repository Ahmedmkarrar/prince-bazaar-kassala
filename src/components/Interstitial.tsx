"use client";

import { useEffect, useRef } from "react";

interface InterstitialProps {
  image: string;
  eyebrow: string;
  line1: string;
  line2: string;
  attribution?: string;
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
    align === "right" ? "items-end text-right" : align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] min-h-[640px] w-full overflow-hidden"
      data-cursor="image"
    >
      <div ref={imgRef} className="photo-warm photo-grain absolute inset-0 will-change-transform">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
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
              className="text-[10px] font-medium uppercase tracking-[0.42em]"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              {eyebrow}
            </span>
          </div>
          <h2
            className="font-display tracking-[-0.015em]"
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(40px, 6vw, 92px)",
              lineHeight: 1.04,
              fontWeight: 400,
            }}
          >
            {line1}
            <br />
            <em style={{ color: "#E9C77B", fontWeight: 300 }}>{line2}</em>
          </h2>
          {attribution ? (
            <div className="mt-4 flex items-center gap-3">
              <span className="h-px w-8" style={{ background: "rgba(233, 199, 123, 0.7)" }} />
              <span
                className="text-[11px] font-medium uppercase tracking-[0.32em]"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {attribution}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
