import { ConciergeDemo } from "./ConciergeDemo";
import { Reveal } from "./Reveal";

export function AISection() {
  return (
    <section
      id="concierge"
      className="relative overflow-hidden px-6 py-32 lg:px-12 lg:py-44"
      style={{
        background:
          "linear-gradient(160deg, #1A0E2E 0%, #3B1660 50%, #1A0E2E 100%)",
      }}
    >
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "rgba(233, 199, 123, 0.7)" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "rgba(233, 199, 123, 0.85)" }}
              >
                The AI Concierge
              </span>
            </div>
            <h2
              className="mt-8 font-display tracking-[-0.01em]"
              style={{
                color: "#FFFFFF",
                lineHeight: 1.02,
                fontSize: "clamp(40px, 5.5vw, 76px)",
                fontWeight: 400,
              }}
            >
              Meet <em style={{ color: "#E9C77B", fontWeight: 300 }}>Taka AI</em>.
              <br />
              On duty, every hour.
            </h2>
            <p
              className="mt-8 max-w-md text-[16px] leading-[1.8]"
              style={{ color: "rgba(255, 255, 255, 0.72)" }}
            >
              Powered by Claude, fluent in Arabic and English. Taka AI books your suite, plans your tour, captures your wedding brief, and quietly hands every detail to a human team that follows up within four hours.
            </p>

            <div className="mt-10 space-y-6">
              {[
                ["Real-time inquiries", "Suite availability, event capacity, dining hours."],
                ["Effortless booking", "Captures your details, a specialist confirms within four hours."],
                ["Tour curation", "Mountain expeditions, cultural walks, wellness rituals — tailored."],
                ["Multilingual hospitality", "Reply in Arabic, English, or your preferred language."],
              ].map(([title, body]) => (
                <div
                  key={title}
                  className="border-l pl-5"
                  style={{ borderColor: "rgba(233, 199, 123, 0.4)" }}
                >
                  <div
                    className="font-display text-[19px]"
                    style={{ color: "#FFFFFF", fontWeight: 400 }}
                  >
                    {title}
                  </div>
                  <div
                    className="mt-1 text-[13px] leading-[1.7]"
                    style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    {body}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#concierge-live"
                className="inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-all"
                style={{ background: "#E9C77B", color: "#1A0E2E" }}
              >
                Open Taka AI
                <span aria-hidden>→</span>
              </a>
              <span
                className="text-[10px] font-medium uppercase tracking-[0.28em]"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Voice · Multilingual · Always private
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-span-7">
          <ConciergeDemo />
        </Reveal>
      </div>
    </section>
  );
}
