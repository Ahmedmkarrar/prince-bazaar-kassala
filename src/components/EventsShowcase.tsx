"use client";

import { Reveal } from "./Reveal";
import { WHATSAPP_URL } from "@/lib/whatsapp";

const OCCASIONS = [
  {
    arabic: "أعراس",
    eyebrow: "Weddings",
    title: "A wedding worth a thousand photographs.",
    body:
      "The Grand Ballroom seats 800; the open-air pavilion holds 400 under stars. A dedicated wedding planner from the family is assigned to every event — from the henna night to the final farewell. Catering by our executive chef, sound by audio engineers who tour the region's largest concerts, and the Taka glowing behind every shot.",
    bullets: [
      "Grand Ballroom · up to 800 seated",
      "Open-air pavilion · up to 400 under stars",
      "Dedicated family wedding planner",
      "Henna-night to send-off coordination",
    ],
  },
  {
    arabic: "مؤتمرات",
    eyebrow: "Conferences",
    title: "Where decisions get made, and made well.",
    body:
      "Six private meeting rooms and a live-translation boardroom built for diplomatic missions, regional summits, and corporate retreats. Full AV, secure communications, a press room, and accommodation under the same roof for every delegate.",
    bullets: [
      "Six private meeting rooms",
      "Live-translation boardroom",
      "Press &amp; media suite",
      "On-site accommodation for delegates",
    ],
  },
  {
    arabic: "احتفالات",
    eyebrow: "Cultural Celebrations",
    title: "Eid, Mawlid, and the calendar that matters.",
    body:
      "Our cultural amphitheatre hosts traditional Sudanese music, poetry evenings, and the seasonal celebrations that anchor a Sudanese life. The space is available to families, foundations, and cultural institutions on request.",
    bullets: [
      "Cultural amphitheatre",
      "Programming partnerships",
      "Traditional music &amp; poetry",
      "Open to families and institutions",
    ],
  },
];

export function EventsShowcase() {
  return (
    <section
      id="events"
      className="relative px-6 py-32 lg:px-12 lg:py-44"
      style={{ background: "var(--color-ivory)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "var(--color-mist)" }}
              >
                Weddings · Conferences · Celebrations
              </span>
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
            </div>
            <h2
              className="font-display mt-8 tracking-[-0.015em]"
              style={{
                color: "var(--color-charcoal)",
                fontSize: "clamp(40px, 5.5vw, 76px)",
                lineHeight: 1.02,
                fontWeight: 400,
              }}
            >
              Built for the days that
              <br />
              <em style={{ color: "var(--color-royal-deep)" }}>have to go right</em>.
            </h2>
            <p className="mt-8 text-[16px] leading-[1.9]" style={{ color: "var(--color-stone)" }}>
              Pavilions for weddings, boardrooms for treaties, amphitheatres for tradition.
              Three distinct ways the property opens its doors — each handled by a dedicated
              team and a single family contact.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-10">
          {OCCASIONS.map((o, i) => (
            <Reveal key={o.eyebrow} delay={i * 100}>
              <article className="flex h-full flex-col">
                <div className="flex items-baseline justify-between gap-4">
                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.4em]"
                    style={{ color: "var(--color-gold)" }}
                  >
                    {o.eyebrow}
                  </span>
                  <span
                    className="font-arabic text-[22px] leading-none"
                    dir="rtl"
                    style={{ color: "var(--color-royal-deep)" }}
                  >
                    {o.arabic}
                  </span>
                </div>
                <h3
                  className="font-display mt-5 text-[28px] leading-[1.15]"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  {o.title}
                </h3>
                <p
                  className="mt-5 text-[14px] leading-[1.85]"
                  style={{ color: "var(--color-stone)" }}
                >
                  {o.body}
                </p>
                <ul
                  className="mt-6 space-y-2 border-t pt-5 text-[12px]"
                  style={{ borderColor: "var(--color-line)", color: "var(--color-charcoal)" }}
                >
                  {o.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-baseline gap-3"
                      dangerouslySetInnerHTML={{
                        __html: `<span style="color: var(--color-gold); font-size: 8px; transform: translateY(-2px);">●</span><span>${b}</span>`,
                      }}
                    />
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div
            className="mt-20 flex flex-col items-center justify-between gap-6 border-t pt-10 text-center sm:flex-row sm:text-left"
            style={{ borderColor: "var(--color-line)" }}
          >
            <p
              className="max-w-md text-[14px] leading-[1.85]"
              style={{ color: "var(--color-stone)" }}
            >
              For an enquiry, please share the date, the number of guests, and a few words
              about what you have in mind. A member of the family will reply within the
              business day.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Enquire About an Event
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
