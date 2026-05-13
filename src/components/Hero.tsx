"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { HERO_IMAGE } from "@/lib/content";
import { KassalaTime } from "./KassalaTime";

export function Hero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    wordsRef.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(60px)";
      setTimeout(() => {
        el.style.transition = "opacity 1.1s cubic-bezier(0.22,1,0.36,1), transform 1.1s cubic-bezier(0.22,1,0.36,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 240 + i * 130);
    });

    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;

    const onScroll = () => {
      const y = window.scrollY;
      if (imgRef.current) {
        imgRef.current.style.transform = `scale(${1 + y * 0.0004}) translate3d(${cx}px, ${y * 0.22 + cy}px, 0)`;
      }
      if (titleRef.current) {
        const opacity = Math.max(0, 1 - y / 700);
        titleRef.current.style.transform = `translateY(${y * 0.18}px)`;
        titleRef.current.style.opacity = `${opacity}`;
      }
    };

    const onMouse = (e: MouseEvent) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 24;
      const dy = (e.clientY / window.innerHeight - 0.5) * 16;
      mx = -dx;
      my = -dy;
    };

    const tick = () => {
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;
      const y = window.scrollY;
      if (imgRef.current) {
        imgRef.current.style.transform = `scale(${1 + y * 0.0004}) translate3d(${cx}px, ${y * 0.22 + cy}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  const setWord = (i: number) => (el: HTMLSpanElement | null) => {
    if (el) wordsRef.current[i] = el;
  };

  return (
    <section className="relative h-[100svh] min-h-[760px] w-full overflow-hidden bg-black">
      {/* Photo background */}
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
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

      {/* Brand mark watermark — top-right, large, low opacity */}
      <div
        className="pointer-events-none absolute z-[1] hidden md:block"
        style={{
          top: "10%",
          right: "-4%",
          width: "min(46vw, 640px)",
          aspectRatio: "1",
          opacity: 0.16,
          filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.4))",
          mixBlendMode: "screen",
        }}
        aria-hidden
      >
        <Image
          src="/logos/princebazaar.jpeg"
          alt=""
          fill
          priority
          sizes="50vw"
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Top hairline */}
      <div className="absolute inset-x-0 top-24 z-10 mx-auto flex max-w-[1400px] items-center gap-4 px-6 lg:px-12">
        <span className="h-px flex-1 max-w-[140px]" style={{ background: "rgba(255,255,255,0.22)" }} />
        <span
          className="text-[10px] font-medium uppercase tracking-[0.42em]"
          style={{ color: "rgba(255,255,255,0.78)" }}
        >
          Prince Bazaar Kassala · Est. 2026
        </span>
        <span className="h-px flex-1" style={{ background: "rgba(255,255,255,0.22)" }} />
      </div>

      {/* Hero copy */}
      <div
        ref={titleRef}
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-24 will-change-transform lg:px-12"
      >
        <div className="max-w-[980px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
            style={{
              borderColor: "rgba(233,199,123,0.55)",
              background: "rgba(233,199,123,0.10)",
              color: "#E9C77B",
            }}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "#E9C77B" }} />
            <span className="text-[10px] font-medium uppercase tracking-[0.32em]">
              Opening Soon · Register Your Interest
            </span>
          </div>

          <div className="mb-8 flex items-center gap-3 overflow-hidden">
            <span ref={setWord(0)} className="inline-block h-px w-12" style={{ background: "rgba(255,255,255,0.55)" }} />
            <span
              ref={setWord(1)}
              className="inline-block text-[11px] font-medium uppercase tracking-[0.32em]"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              Kassala · Eastern Sudan
            </span>
          </div>

          <h1
            className="font-display tracking-[-0.015em]"
            style={{ color: "#FFFFFF", lineHeight: 0.92, fontSize: "clamp(58px, 10vw, 156px)", fontWeight: 400 }}
          >
            <span className="block overflow-hidden">
              <span ref={setWord(2)} className="inline-block">Where the desert</span>
            </span>
            <span className="block overflow-hidden">
              <span ref={setWord(3)} className="inline-block italic" style={{ color: "#E9C77B", fontWeight: 300 }}>
                meets ceremony.
              </span>
            </span>
          </h1>

          <p
            ref={setWord(4) as unknown as React.LegacyRef<HTMLParagraphElement>}
            className="mt-10 max-w-[560px] text-[16px] leading-[1.75] sm:text-[17px]"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            A pioneering nine-complex destination at the foot of the Taka Mountains. Royal Suites, a commercial plaza, the bazaar, wellness, dining, business, events, villas, and curated tourism — one architectural landmark redefining Eastern Sudan.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <span ref={setWord(5)} className="inline-block">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("pb:open-reservation"))}
                className="hero-cta-primary"
              >
                Reserve Your Stay
                <span aria-hidden>→</span>
              </button>
            </span>
            <span ref={setWord(6)} className="inline-block">
              <a href="#concierge" className="hero-cta-ghost">
                Speak with Bashir
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Time strip — bottom, more elegant */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        <div className="mx-auto max-w-[1400px]">
          <KassalaTime />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[110px] left-1/2 z-20 -translate-x-1/2 sm:bottom-[120px]">
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-[9px] font-medium uppercase tracking-[0.42em]"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Scroll
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
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hero-cta-primary:hover {
          background: #E9C77B;
          color: #0A0A0A;
          transform: translateY(-1px);
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
