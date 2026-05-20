"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

interface Era {
  year: string;
  title: string;
  body: string;
}

const ERAS: Era[] = [
  {
    year: "9th century",
    title: "The Beja Kingdoms",
    body: "Long before borders, the Beja people ruled these lands. Caravans paused at the Taka springs; poetry was written in the cool of granite shadows.",
  },
  {
    year: "1840",
    title: "The Founding of Kassala",
    body: "Egyptian forces established the city as a frontier post. Within a generation, it became one of the most cosmopolitan trading hubs in the Nile basin.",
  },
  {
    year: "1885",
    title: "The Mahdist Era",
    body: "Kassala stood at the heart of one of the most consequential movements in modern Sudanese history. Its walls and stories survive in our courtyards today.",
  },
  {
    year: "20th c.",
    title: "Crossroads of Trade",
    body: "Cotton, gum arabic, and people moved through Kassala — west to Khartoum, east to the Red Sea, south to Eritrea. The bazaar became a language of its own.",
  },
  {
    year: "Today",
    title: "A New Chapter",
    body: "Prince Plaza Kassala continues a thousand-year tradition of welcome. We build for the next century while honouring the depth of every century before.",
  },
];

export function Heritage() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((node, i) => {
      if (!node) return;
      const o = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(i);
          }
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0.01 },
      );
      o.observe(node);
      observers.push(o);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section
      id="heritage"
      className="relative px-6 py-32 lg:px-12 lg:py-44"
      style={{ background: "var(--color-bone-soft)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-20 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
            <span
              className="text-[10px] font-medium uppercase tracking-[0.42em]"
              style={{ color: "var(--color-mist)" }}
            >
              Heritage of Kassala
            </span>
          </div>
          <h2
            className="mt-8 font-display tracking-[-0.015em]"
            style={{
              color: "var(--color-charcoal)",
              fontSize: "clamp(40px, 5.5vw, 76px)",
              lineHeight: 1.02,
              fontWeight: 400,
            }}
          >
            A thousand years of <em style={{ color: "var(--color-emerald-deep)" }}>welcome</em>.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          {/* Sticky year display */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-32">
              <div
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "var(--color-mist)" }}
              >
                Era
              </div>
              <div
                key={active}
                className="mt-4 font-display tracking-[-0.02em]"
                style={{
                  color: "var(--color-emerald-deep)",
                  fontSize: "clamp(72px, 9vw, 144px)",
                  lineHeight: 0.95,
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                {ERAS[active].year}
              </div>
              <div
                className="mt-6 max-w-xs font-display"
                style={{ color: "var(--color-charcoal)", fontSize: "22px", lineHeight: 1.2 }}
              >
                {ERAS[active].title}
              </div>
              <div className="mt-8 flex flex-col gap-1">
                {ERAS.map((_, i) => (
                  <div
                    key={i}
                    className="h-px transition-all"
                    style={{
                      width: i === active ? "48px" : "16px",
                      background: i === active ? "var(--color-gold)" : "var(--color-line)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            {ERAS.map((e, i) => (
              <div
                key={e.year}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="border-t py-16 transition-opacity"
                style={{
                  borderColor: "var(--color-line)",
                  opacity: i === active ? 1 : 0.4,
                }}
              >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-12 sm:gap-6">
                  <div
                    className="text-[10px] font-medium uppercase tracking-[0.32em] sm:col-span-2"
                    style={{ color: "var(--color-gold)" }}
                  >
                    {e.year}
                  </div>
                  <div className="sm:col-span-10">
                    <h3
                      className="font-display tracking-[-0.01em]"
                      style={{
                        color: "var(--color-charcoal)",
                        fontSize: "clamp(28px, 3.4vw, 44px)",
                        lineHeight: 1.1,
                        fontWeight: 400,
                        fontStyle: i === active ? "italic" : "normal",
                      }}
                    >
                      {e.title}
                    </h3>
                    <p
                      className="mt-5 max-w-[640px] text-[15px] leading-[1.85]"
                      style={{ color: "var(--color-stone)" }}
                    >
                      {e.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
