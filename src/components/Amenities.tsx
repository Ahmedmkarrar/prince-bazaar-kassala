import { AMENITIES } from "@/lib/content";
import { Reveal } from "./Reveal";

export function Amenities() {
  return (
    <section className="px-6 py-32 lg:px-12 lg:py-40" style={{ background: "var(--color-bone-soft)" }}>
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "var(--color-mist)" }}
              >
                Amenities
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
              The <em style={{ color: "var(--color-emerald-deep)" }}>quiet</em> details.
            </h2>
            <p className="mt-8 text-[16px] leading-[1.8]" style={{ color: "var(--color-stone)" }}>
              Everything thought of, so you don't have to. The full standard, in every complex, on every floor.
            </p>
          </div>
        </Reveal>

        <div
          className="mt-20 grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6"
          style={{ background: "var(--color-line)" }}
        >
          {AMENITIES.map((a, i) => (
            <Reveal key={a.label} delay={i * 60}>
              <div className="px-6 py-10" style={{ background: "var(--color-bone-soft)" }}>
                <div
                  className="font-display"
                  style={{ color: "var(--color-charcoal)", fontSize: "20px", fontWeight: 400 }}
                >
                  {a.label}
                </div>
                <div className="mt-2 text-[11px]" style={{ color: "var(--color-mist)" }}>
                  {a.caption}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
