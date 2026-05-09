import { Counter } from "./Counter";
import { Reveal } from "./Reveal";

const STATS = [
  { value: 9, label: "Connected Complexes", suffix: "" },
  { value: 120, label: "Suites & Villas", suffix: "+" },
  { value: 6, label: "Dining Venues", suffix: "" },
  { value: 24, label: "Hour Concierge", suffix: "/7" },
];

export function Awards() {
  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {STATS.map((a, i) => (
            <Reveal key={a.label} delay={i * 80}>
              <div
                className="border-r px-6 py-12 last:border-r-0 sm:border-r"
                style={{ borderColor: "var(--color-line)" }}
              >
                <div
                  className="font-display"
                  style={{
                    fontSize: "clamp(48px, 6vw, 88px)",
                    color: "var(--color-charcoal)",
                    lineHeight: 1,
                    fontWeight: 400,
                  }}
                >
                  <Counter to={a.value} suffix={a.suffix} />
                </div>
                <div
                  className="mt-4 text-[10px] font-medium uppercase tracking-[0.32em]"
                  style={{ color: "var(--color-mist)" }}
                >
                  {a.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
