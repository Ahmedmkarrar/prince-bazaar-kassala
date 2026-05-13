import { Reveal } from "./Reveal";
import { BrandMark } from "./BrandMark";

export function FoundersNote() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden px-6 py-32 lg:px-12 lg:py-44"
      style={{
        background:
          "linear-gradient(180deg, var(--color-charcoal) 0%, #14101C 60%, var(--color-royal-deep) 100%)",
        color: "var(--color-ivory)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-32 top-24 hidden opacity-[0.06] md:block"
        aria-hidden
      >
        <BrandMark color="var(--color-gold-soft)" size={520} />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex items-center gap-3">
            <span
              className="h-px w-10"
              style={{ background: "rgba(233, 199, 123, 0.65)" }}
            />
            <span
              className="text-[10px] font-medium uppercase tracking-[0.42em]"
              style={{ color: "rgba(233, 199, 123, 0.85)" }}
            >
              A Letter from the Chairman · من رئيس مجلس الإدارة
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <blockquote
              className="font-display tracking-[-0.01em]"
              style={{
                color: "var(--color-ivory)",
                fontSize: "clamp(28px, 3.4vw, 44px)",
                lineHeight: 1.25,
                fontWeight: 400,
              }}
            >
              &ldquo;Three generations of my family have lived between Khartoum and Kassala.
              We have built schools, homes, and the kind of quiet relationships that make a
              country worth coming home to. Prince Bazaar is the house we have always wanted
              to build — a place that says, without raising its voice, that Sudan is open
              for serious work and serious rest.&rdquo;
            </blockquote>

            <div className="mt-12 flex items-center gap-5">
              <div
                className="h-14 w-14 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-gold-soft) 0%, var(--color-gold) 100%)",
                  boxShadow: "0 8px 24px -8px rgba(233, 199, 123, 0.5)",
                }}
                aria-hidden
              />
              <div>
                <div
                  className="font-display text-[20px]"
                  style={{ color: "var(--color-ivory)" }}
                >
                  The Chairman
                </div>
                <div
                  className="mt-1 text-[10px] font-medium uppercase tracking-[0.32em]"
                  style={{ color: "rgba(233, 199, 123, 0.75)" }}
                >
                  Founder · Shahad Group · Kassala &amp; Khartoum
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div
              className="space-y-6 border-l pl-8 text-[15px] leading-[1.95]"
              style={{
                borderColor: "rgba(233, 199, 123, 0.25)",
                color: "rgba(255, 252, 245, 0.78)",
              }}
            >
              <p>
                A note on what we measure. Not occupancy — we measure the day after a guest
                leaves, when they message the concierge to ask after a member of staff by
                name. Not price — we measure the families who arrive uncertain about Sudan
                and depart asking about land.
              </p>
              <p>
                If you have chosen to read this far, you have done us a small honour. The
                front desk has been told to expect you.
              </p>

              <div
                className="font-arabic mt-8 text-[20px] leading-[1.7]"
                dir="rtl"
                style={{ color: "rgba(233, 199, 123, 0.95)" }}
              >
                وأهلاً بك في بيتنا.
              </div>
              <div
                className="text-[10px] font-medium uppercase tracking-[0.32em]"
                style={{ color: "rgba(255, 252, 245, 0.45)" }}
              >
                And welcome to our home.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
