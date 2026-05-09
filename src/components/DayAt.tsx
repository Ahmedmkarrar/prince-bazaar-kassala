"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

interface Moment {
  time: string;
  title: string;
  detail: string;
  image: string;
}

const MOMENTS: Moment[] = [
  {
    time: "05:30",
    title: "Sunrise on the Taka",
    detail: "A 4×4 leaves the suite door. By the time the granite spires catch the first light, you're standing at their feet with cardamom coffee in hand.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600&q=85&auto=format&fit=crop",
  },
  {
    time: "09:00",
    title: "Breakfast in the courtyard",
    detail: "Ful, fresh bread, sweet mint tea, and the morning paper from three continents. The fountain runs. The day begins slowly.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85&auto=format&fit=crop",
  },
  {
    time: "11:30",
    title: "The hammam",
    detail: "Steam, shea, and the unmistakable scent of dukhan. A century-old ritual, performed with quiet precision.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1600&q=85&auto=format&fit=crop",
  },
  {
    time: "14:00",
    title: "An afternoon at the bazaar",
    detail: "A guide walks you through stalls of indigo, silver, and saffron — a master tailor measures you for a thoub. Delivery to the suite by sundown.",
    image: "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?w=1600&q=85&auto=format&fit=crop",
  },
  {
    time: "19:00",
    title: "Dinner on the rooftop",
    detail: "A five-course tasting menu by our executive chef, paired with mocktails of regional botanicals. The Taka glows red behind you.",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=85&auto=format&fit=crop",
  },
  {
    time: "22:30",
    title: "A nightcap, a quiet suite",
    detail: "The lounge plays soft oud. The balcony door is open. Tomorrow has been gently planned — but only if you wish.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1600&q=85&auto=format&fit=crop",
  },
];

export function DayAt() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

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
        { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 },
      );
      o.observe(node);
      observers.push(o);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="relative px-6 py-32 lg:px-12 lg:py-44" style={{ background: "var(--color-charcoal)", color: "var(--color-ivory)" }}>
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-20 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="hairline" style={{ background: "linear-gradient(90deg, var(--color-gold-soft) 0%, transparent 100%)" }} />
            <span className="eyebrow" style={{ color: "var(--color-gold-soft)" }}>
              An Editorial · A Day at Prince Bazaar
            </span>
          </div>
          <h2
            className="mt-6 font-display tracking-tight"
            style={{ color: "var(--color-ivory)", lineHeight: 1.05, fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            The day, <em style={{ color: "var(--color-gold-soft)" }}>composed</em>.
          </h2>
          <p className="mt-5 max-w-lg text-[16px] leading-[1.85]" style={{ color: "rgba(246,241,232,0.7)" }}>
            From the first light on the Taka spires to the last oud note in the lounge — a sample itinerary of one quietly extraordinary day.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Sticky image */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-32">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-sm"
                style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)" }}
              >
                {MOMENTS.map((m, i) => (
                  <div
                    key={m.time}
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                    style={{
                      backgroundImage: `url(${m.image})`,
                      opacity: i === active ? 1 : 0,
                    }}
                  />
                ))}
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)" }} />
                <div className="absolute bottom-6 left-6 right-6">
                  <div
                    className="text-[10px] font-medium uppercase tracking-[0.32em]"
                    style={{ color: "var(--color-gold-soft)" }}
                  >
                    {MOMENTS[active].time}
                  </div>
                  <div
                    className="mt-2 font-display text-[28px] leading-tight"
                    style={{ color: "var(--color-ivory)" }}
                  >
                    {MOMENTS[active].title}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll list */}
          <div className="lg:col-span-6">
            <ul>
              {MOMENTS.map((m, i) => (
                <li
                  key={m.time}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="border-t py-10 transition-opacity"
                  style={{
                    borderColor: "rgba(239,224,191,0.12)",
                    opacity: i === active ? 1 : 0.45,
                  }}
                >
                  <div className="flex items-baseline gap-6">
                    <span
                      className="font-display text-[18px] tabular-nums"
                      style={{ color: i === active ? "var(--color-gold-soft)" : "rgba(239,224,191,0.5)" }}
                    >
                      {m.time}
                    </span>
                    <h3
                      className="font-display"
                      style={{
                        color: "var(--color-ivory)",
                        fontSize: "clamp(28px, 3vw, 40px)",
                        lineHeight: 1.05,
                        fontStyle: i === active ? "italic" : "normal",
                      }}
                    >
                      {m.title}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-lg pl-[3rem] text-[15px] leading-[1.85]" style={{ color: "rgba(246,241,232,0.7)" }}>
                    {m.detail}
                  </p>
                  {/* Mobile image */}
                  <div
                    className="mt-6 aspect-[16/10] w-full overflow-hidden rounded-sm bg-cover bg-center lg:hidden"
                    style={{ backgroundImage: `url(${m.image})` }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
