import { Reveal } from "./Reveal";

export function Karam() {
  return (
    <section
      id="karam"
      className="relative overflow-hidden px-6 py-32 lg:px-12 lg:py-44"
      style={{ background: "var(--color-ivory)" }}
    >
      <div className="bg-arabesque pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "var(--color-mist)" }}
              >
                Karam · كَرَم
              </span>
            </div>
            <h2
              className="font-display mt-8 tracking-[-0.015em]"
              style={{
                color: "var(--color-charcoal)",
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: 1.05,
                fontWeight: 400,
              }}
            >
              A Sudanese word
              <br />
              that has no
              <br />
              <em style={{ color: "var(--color-royal-deep)" }}>English equivalent</em>.
            </h2>
            <p
              className="font-arabic mt-6 text-[24px] leading-[1.65]"
              dir="rtl"
              style={{ color: "var(--color-charcoal)" }}
            >
              أهلاً وسهلاً بكم في بيتكم الثاني.
            </p>
            <p
              className="mt-3 text-[12px] font-medium uppercase tracking-[0.3em]"
              style={{ color: "var(--color-mist)" }}
            >
              Ahlan wa sahlan — welcome to your second home
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="space-y-8 text-[16px] leading-[1.95]" style={{ color: "var(--color-charcoal)" }}>
              <p>
                The closest translation is &ldquo;generosity,&rdquo; but karam is not generosity in
                the casual sense. It is the moral instinct that the guest comes first — that
                the last of the coffee, the seat by the window, the longer conversation, and
                the unrequested second helping all belong to the person who has chosen to
                stay under your roof.
              </p>
              <p>
                Karam is what binds Sudanese hospitality together. It is not service; it is
                a stance. It cannot be trained into a staff manual — it can only be hired for
                and protected from drift. At Prince Bazaar Kassala, it is the single
                non-negotiable standard against which everything else is measured.
              </p>
              <p style={{ color: "var(--color-stone)", fontStyle: "italic" }}>
                When you arrive, you are not a customer. You are a guest who has done us the
                honour of choosing this house.
              </p>
            </div>

            <div
              className="mt-10 grid grid-cols-3 gap-4 sm:gap-6"
              style={{ borderTop: "1px solid var(--color-line)", paddingTop: "2rem" }}
            >
              <Pillar arabic="ضيافة" romanised="Diyāfa" english="The act of hosting" />
              <Pillar arabic="إكرام" romanised="Ikrām" english="Honouring the guest" />
              <Pillar arabic="مودة" romanised="Mawadda" english="Warmth without effort" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Pillar({
  arabic,
  romanised,
  english,
}: {
  arabic: string;
  romanised: string;
  english: string;
}) {
  return (
    <div>
      <div
        className="font-arabic text-[28px] leading-none"
        dir="rtl"
        style={{ color: "var(--color-royal-deep)" }}
      >
        {arabic}
      </div>
      <div
        className="mt-3 text-[10px] font-medium uppercase tracking-[0.32em]"
        style={{ color: "var(--color-gold)" }}
      >
        {romanised}
      </div>
      <div className="mt-1 text-[13px] leading-[1.5]" style={{ color: "var(--color-stone)" }}>
        {english}
      </div>
    </div>
  );
}
