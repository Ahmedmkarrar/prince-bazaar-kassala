import { Reveal } from "./Reveal";

export function ArchitectsNote() {
  return (
    <section className="relative px-6 py-32 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "var(--color-mist)" }}
              >
                The Architect
              </span>
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-9">
            <p
              className="font-display tracking-[-0.01em]"
              style={{
                color: "var(--color-charcoal)",
                fontSize: "clamp(28px, 3.6vw, 56px)",
                lineHeight: 1.18,
                fontWeight: 300,
              }}
            >
              <span
                className="float-left mr-4 mt-2 font-display"
                style={{
                  color: "var(--color-emerald-deep)",
                  fontSize: "clamp(72px, 9vw, 140px)",
                  lineHeight: 0.85,
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                W
              </span>
              e drew the plans on the same paper our grandfathers used for their letters. Every stone was chosen to weather a century. The arcades follow the path of the morning shadow — so even the walk between rooms remembers Kassala.
            </p>

            <div className="mt-12 flex items-center gap-4">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <div>
                <div
                  className="text-[12px] font-medium uppercase tracking-[0.28em]"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  Imran Yousif Mohammed
                </div>
                <div
                  className="mt-1 text-[11px]"
                  style={{ color: "var(--color-mist)" }}
                >
                  Lead Architect · Shahad Group · Khartoum / London
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
