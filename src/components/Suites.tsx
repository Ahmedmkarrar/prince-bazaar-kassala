import { Reveal } from "./Reveal";

const SUITES = [
  {
    name: "Single Suite",
    capacity: "1 bed · 1 guest · 10 rooms",
    view: "Refrigerator, seating & amenities",
    image: "/hotel/room-single-padded.jpg",
    detail: "A comfortable single-bed suite. Inclusive of refrigerator, seating, towel and bathroom amenities, with twenty-four-hour reception.",
  },
  {
    name: "Double Room",
    capacity: "1 double bed · 2 guests · 13 rooms",
    view: "Refrigerator, seating & amenities",
    image: "/hotel/room-king-warm.jpg",
    detail: "A double room with one bed. Inclusive of refrigerator, seating, towel and bathroom amenities, with twenty-four-hour reception.",
  },
  {
    name: "Twin Suite",
    capacity: "2 beds · 2 guests · 22 rooms",
    view: "Refrigerator, seating & amenities",
    image: "/hotel/room-twin-gray.jpg",
    detail: "A twin suite with two separate beds. Inclusive of refrigerator, seating, towel and bathroom amenities, with twenty-four-hour reception.",
  },
  {
    name: "Three Bed Suite",
    capacity: "3 beds · up to 6 · 4 rooms",
    view: "Refrigerator, seating & amenities",
    image: "/hotel/room-triple.jpg",
    detail: "A spacious three-bed suite for families and groups. Inclusive of refrigerator, seating, towel and bathroom amenities, with twenty-four-hour reception.",
  },
];

/** Slowly rotating gold seal — a refined, hospitality-grade rotating accent. */
function SealMark({ id }: { id: string }) {
  return (
    <div
      className="absolute -bottom-7 right-6 z-10 flex h-[88px] w-[88px] items-center justify-center rounded-full"
      style={{ background: "var(--color-ivory)", boxShadow: "var(--shadow-card)" }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="spin-slow h-full w-full" style={{ color: "var(--color-gold)" }}>
        <defs>
          <path id={id} d="M50,50 m-33,0 a33,33 0 1,1 66,0 a33,33 0 1,1 -66,0" fill="none" />
        </defs>
        <text fill="currentColor" fontSize="9.5" letterSpacing="2.2" style={{ textTransform: "uppercase", fontWeight: 500 }}>
          <textPath href={`#${id}`} startOffset="0">
            Prince Plaza · Kassala · Sudan ·
          </textPath>
        </text>
      </svg>
      <span className="absolute font-display text-[22px]" style={{ color: "var(--color-emerald-deep)" }}>
        ✦
      </span>
    </div>
  );
}

export function Suites() {
  return (
    <section id="suites" className="px-6 py-32 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-20 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "var(--color-mist)" }}
              >
                The Stay
              </span>
            </div>
            <h2
              className="mt-8 max-w-2xl font-display tracking-[-0.015em]"
              style={{
                color: "var(--color-charcoal)",
                fontSize: "clamp(40px, 5.5vw, 76px)",
                lineHeight: 1.02,
                fontWeight: 400,
              }}
            >
              Sanctuaries with a <em style={{ color: "var(--color-emerald-deep)" }}>view of the spires</em>.
            </h2>
          </div>
          <p className="max-w-md text-[16px] leading-[1.8]" style={{ color: "var(--color-stone)" }}>
            Flagship layouts, plush interiors, and the same impeccable service across each. Tell us your dates — we&apos;ll match you to the right one.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-[920px] grid-cols-1 gap-x-16 gap-y-24 sm:grid-cols-2">
          {SUITES.map((s, i) => (
            <Reveal key={s.name} delay={i * 120}>
              <article className="group flex flex-col items-center text-center">
                <div className="photo-arch relative w-full max-w-[340px]" data-cursor="image">
                  <div className="photo-arch-inner photo-warm photo-grain aspect-[3/4]">
                    <div
                      className="kenburns absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-[1.06]"
                      style={{ backgroundImage: `url(${s.image})` }}
                    />
                  </div>
                  <SealMark id={`seal-${i}`} />
                </div>

                <div className="mt-12 flex flex-col items-center">
                  <div className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "var(--color-gold)" }}>
                    {s.view}
                  </div>
                  <h3 className="mt-3 font-display text-[30px] leading-tight" style={{ color: "var(--color-charcoal)" }}>
                    {s.name}
                  </h3>
                  <div className="mt-1 text-[12px]" style={{ color: "var(--color-mist)" }}>
                    {s.capacity}
                  </div>
                  <p className="mt-5 max-w-[360px] text-[14px] leading-[1.75]" style={{ color: "var(--color-stone)" }}>
                    {s.detail}
                  </p>
                  <a
                    href="#book"
                    className="mt-7 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em]"
                    style={{ color: "var(--color-emerald-deep)" }}
                  >
                    Inquire rates
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
