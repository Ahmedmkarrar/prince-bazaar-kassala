import { TAKA_IMAGE } from "@/lib/content";
import { Reveal } from "./Reveal";

const JOURNEYS = [
  {
    title: "Sunrise on the Taka Mountains",
    duration: "Half day",
    detail: "Private 4×4 expedition with a Beja guide. Breakfast at the foot of the granite spires.",
  },
  {
    title: "Old Kassala Cultural Walk",
    duration: "Full day",
    detail: "Cultural quarter, central bazaar, jebana coffee ceremony, regional textile collection.",
  },
  {
    title: "Multi-day Eastern Sudan Circuit",
    duration: "3 days",
    detail: "Kassala, Sinkat, the Red Sea coast — a curated itinerary with private transport throughout.",
  },
];

export function Tourism() {
  return (
    <section id="tourism" className="relative px-6 py-32 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "var(--color-mist)" }}
              >
                Beyond the Walls
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
              A luxury basecamp
              <br />
              for <em style={{ color: "var(--color-emerald-deep)" }}>Eastern Sudan</em>.
            </h2>
            <p className="mt-8 text-[16px] leading-[1.8]" style={{ color: "var(--color-stone)" }}>
              Kassala is known for its stunning mountains and rich history. By day, explore the rugged beauty of the region. By night, return to unparalleled comfort. We design every journey — and our concierge handles every detail.
            </p>
            <div className="mt-10">
              <a href="#concierge" className="btn-primary">
                Plan With Concierge
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div
              className="relative aspect-cinema overflow-hidden rounded-sm"
              style={{
                backgroundImage: `url(${TAKA_IMAGE})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 40%, rgba(14,59,46,0.8) 100%)" }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-gold-soft)" }}>
                  The Taka Mountains
                </div>
                <div className="mt-2 font-display text-[28px] leading-tight" style={{ color: "var(--color-ivory)" }}>
                  Granite spires that have watched over Kassala for ten thousand years.
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px" style={{ background: "var(--color-line)" }}>
          {JOURNEYS.map((j) => (
            <Reveal key={j.title} delay={80}>
              <div
                className="grid grid-cols-1 items-baseline gap-6 px-6 py-8 transition-all hover:bg-bone-soft sm:grid-cols-12"
                style={{ background: "var(--color-ivory)" }}
              >
                <div className="sm:col-span-1 text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "var(--color-gold)" }}>
                  {j.duration}
                </div>
                <h3 className="font-display text-[26px] leading-tight sm:col-span-5">{j.title}</h3>
                <p className="text-[14px] leading-[1.7] sm:col-span-5" style={{ color: "var(--color-stone)" }}>
                  {j.detail}
                </p>
                <div className="sm:col-span-1 text-right">
                  <span className="text-[18px]" style={{ color: "var(--color-gold)" }}>→</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
