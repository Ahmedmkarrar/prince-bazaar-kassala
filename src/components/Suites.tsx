import { Reveal } from "./Reveal";

const SUITES = [
  {
    name: "Royal Suite",
    capacity: "King · 2 guests",
    view: "Climate-controlled comfort",
    image: "/hotel/room-king-warm.jpg",
    detail: "King bed, climate-controlled, hardwood floors, and a quiet, considered atmosphere. En-suite bathroom and twenty-four-hour reception.",
  },
  {
    name: "Presidential Suite",
    capacity: "King · up to 4 guests",
    view: "Premium, extended layout",
    image: "/hotel/room-presidential.jpg",
    detail: "Our flagship room. Spacious king-bed suite with an extended living area, premium furnishings, and the same uncompromised attention given to every guest.",
  },
];

export function Suites() {
  return (
    <section id="suites" className="px-6 py-32 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
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
            Three flagship layouts. Plush interiors, premium amenities, and the same impeccable service across each. Tell us your dates — we'll match you to the right one.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {SUITES.map((s, i) => (
            <Reveal key={s.name} delay={i * 100}>
              <article className="group flex flex-col">
                <div
                  className="aspect-[4/5] overflow-hidden rounded-sm"
                  data-cursor="image"
                  style={{
                    backgroundImage: `url(${s.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="pt-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-[28px] leading-tight">{s.name}</h3>
                    <div className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "var(--color-gold)" }}>
                      {s.view}
                    </div>
                  </div>
                  <div className="mt-1 text-[12px]" style={{ color: "var(--color-mist)" }}>
                    {s.capacity}
                  </div>
                  <p className="mt-4 text-[14px] leading-[1.75]" style={{ color: "var(--color-stone)" }}>
                    {s.detail}
                  </p>
                  <a href="#book" className="mt-6 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em]" style={{ color: "var(--color-emerald-deep)" }}>
                    Reserve
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
