import { Reveal } from "./Reveal";
import { BrandMark } from "./BrandMark";

export function Story() {
  return (
    <section id="story" className="relative overflow-hidden px-6 py-32 lg:px-12 lg:py-48">
      <div className="pointer-events-none absolute -right-32 top-16 hidden opacity-[0.07] md:block" aria-hidden>
        <BrandMark color="var(--color-royal)" size={520} />
      </div>
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
            <span
              className="text-[10px] font-medium uppercase tracking-[0.42em]"
              style={{ color: "var(--color-mist)" }}
            >
              The Vision
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <h2
              className="font-display tracking-[-0.015em]"
              style={{
                color: "var(--color-charcoal)",
                fontSize: "clamp(40px, 6vw, 88px)",
                lineHeight: 1.02,
                fontWeight: 400,
              }}
            >
              A landmark of the
              <br />
              new Eastern Sudan —
              <br />
              <span className="italic" style={{ color: "var(--color-emerald-deep)" }}>
                quiet, considered, ours.
              </span>
            </h2>
          </Reveal>

          <div className="space-y-8 lg:col-span-5">
            <Reveal delay={120}>
              <p
                className="text-[17px] leading-[1.8]"
                style={{ color: "var(--color-charcoal)" }}
              >
                <span
                  className="float-left mr-3 mt-1 font-display"
                  style={{
                    color: "var(--color-emerald-deep)",
                    fontSize: "clamp(64px, 7.5vw, 104px)",
                    lineHeight: 0.85,
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  P
                </span>
                rince Bazaar Kassala is nine interconnected complexes at the foot of the Taka Mountains. Royal suites, a commercial plaza, the bazaar, wellness, dining, business, events, villas, and tourism — gathered under one architectural roof.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p
                className="text-[15px] leading-[1.8]"
                style={{ color: "var(--color-stone)" }}
              >
                A pioneering destination redefining what hospitality looks like in this part of the world. We bridge global standards with deep local hands — designed for the diplomat, the family, the founder, and the traveller seeking a Sudan that has not yet been seen.
              </p>
            </Reveal>
            <Reveal delay={280}>
              <a
                href="#complex"
                className="inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.22em]"
                style={{ color: "var(--color-emerald-deep)" }}
              >
                <span className="h-px w-8" style={{ background: "var(--color-emerald-deep)" }} />
                Tour the Complex
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
