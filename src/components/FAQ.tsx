"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

interface QA {
  q: string;
  a: string;
}

const SECTIONS: { title: string; items: QA[] }[] = [
  {
    title: "Arrival & Travel",
    items: [
      {
        q: "How do I get to Kassala?",
        a: "Most international guests fly into Khartoum International (KRT). From there, we arrange a private 5-hour overland transfer (≈480 km) or a 90-minute charter flight. Both can be booked through our concierge. Direct overland transfer is included in our airport-transfer add-on.",
      },
      {
        q: "Do I need a visa to enter Sudan?",
        a: "Most nationalities require a visa, generally arranged at the nearest Sudanese embassy in advance. Some passports qualify for a visa-on-arrival service through our partners. Share your nationality with our concierge and we'll provide a tailored advisory and an invitation letter where required.",
      },
      {
        q: "What's the best time to visit?",
        a: "October through March is the temperate season — daytime highs of 28–32°C, cool evenings, clear skies. April through September is hotter and we recommend a refreshed wardrobe. The Taka Mountains are spectacular year-round.",
      },
    ],
  },
  {
    title: "At the Property",
    items: [
      {
        q: "What languages are spoken at the hotel?",
        a: "Arabic and English are spoken by all front-of-house staff. French, German, and Russian speakers are available on request. The concierge will pair you with a multilingual host on arrival if you wish.",
      },
      {
        q: "What is the dress code?",
        a: "Smart-casual throughout the day. Some restaurants and the rooftop request smart-elegant for dinner — collared shirts, dresses, no athletic wear. Out in Kassala, modest dress (covering shoulders and knees) is appreciated, especially in the bazaar and cultural quarter.",
      },
      {
        q: "Do you accept credit cards?",
        a: "We accept all major international cards (Visa, Mastercard, American Express). USD, EUR, GBP, and AED are accepted in cash. Sudanese pounds are available at the property's exchange desk at competitive rates.",
      },
    ],
  },
  {
    title: "Family & Accessibility",
    items: [
      {
        q: "Is the property family-friendly?",
        a: "Yes. Our Presidential Suite and Garden Villa layouts accommodate families. We offer in-room cribs, child-safe amenities, kid-curated menus at all dining venues, and a small daytime children's program.",
      },
      {
        q: "Is the property wheelchair accessible?",
        a: "All public spaces and a designated set of suites are step-free with widened doorways and accessible bathrooms. Please flag any specific needs during booking and we'll prepare ahead of arrival.",
      },
    ],
  },
];

export function FAQ() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="px-6 py-32 lg:px-12 lg:py-44" style={{ background: "var(--color-bone-soft)" }}>
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-20 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
            <span
              className="text-[10px] font-medium uppercase tracking-[0.42em]"
              style={{ color: "var(--color-mist)" }}
            >
              Before You Arrive
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
            The <em style={{ color: "var(--color-royal-deep)" }}>quiet</em> details, in advance.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-3">
            <ul className="space-y-3 text-[12px] font-medium uppercase tracking-[0.22em]">
              {SECTIONS.map((s, i) => (
                <li key={s.title} className="flex items-baseline gap-3" style={{ color: "var(--color-stone)" }}>
                  <span className="font-display tabular-nums" style={{ color: "var(--color-gold)", fontSize: "11px" }}>
                    0{i + 1}
                  </span>
                  {s.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-9">
            {SECTIONS.map((s) => (
              <div key={s.title} className="mb-10">
                <h3
                  className="mb-4 font-display"
                  style={{ color: "var(--color-charcoal)", fontSize: "24px", fontWeight: 400 }}
                >
                  {s.title}
                </h3>
                <div className="border-t" style={{ borderColor: "var(--color-line)" }}>
                  {s.items.map((item) => {
                    const id = `${s.title}-${item.q}`;
                    const isOpen = open === id;
                    return (
                      <div key={id} className="border-b" style={{ borderColor: "var(--color-line)" }}>
                        <button
                          onClick={() => setOpen(isOpen ? null : id)}
                          className="flex w-full items-center justify-between gap-4 py-5 text-left"
                          aria-expanded={isOpen}
                        >
                          <span
                            className="font-display"
                            style={{
                              color: "var(--color-charcoal)",
                              fontSize: "18px",
                              fontWeight: 400,
                              fontStyle: isOpen ? "italic" : "normal",
                            }}
                          >
                            {item.q}
                          </span>
                          <span
                            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-transform"
                            style={{
                              background: isOpen ? "var(--color-royal-deep)" : "transparent",
                              border: isOpen ? "none" : "1px solid var(--color-line)",
                              color: isOpen ? "var(--color-gold-pale)" : "var(--color-charcoal)",
                              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                            }}
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <path d="M12 5 L12 19 M5 12 L19 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                          </span>
                        </button>
                        <div
                          className="overflow-hidden transition-all"
                          style={{
                            maxHeight: isOpen ? "400px" : "0",
                            opacity: isOpen ? 1 : 0,
                          }}
                        >
                          <p
                            className="pb-6 pr-12 text-[14px] leading-[1.85]"
                            style={{ color: "var(--color-stone)" }}
                          >
                            {item.a}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
