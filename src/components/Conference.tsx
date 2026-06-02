import { Reveal } from "./Reveal";

interface ConferenceRoomCard {
  id: string;
  name: string;
  description: string;
  capacity: { theatre: number; boardroom: number; ushape: number; reception: number };
  features: string[];
  image: string | null;
}

const ROOMS: ConferenceRoomCard[] = [
  {
    id: "atbara",
    name: "The Atbara Room",
    description:
      "Our flagship conference venue, named after Sudan's eastern river. Daylight on three sides, a live-translation booth, and adjacent breakout space for receptions.",
    capacity: { theatre: 80, boardroom: 30, ushape: 25, reception: 100 },
    features: [
      "Live-translation booth · 3 channels",
      "4K projection + 86″ displays",
      "Daylight on three sides",
      "Adjacent breakout area",
    ],
    image: null,
  },
  {
    id: "gash",
    name: "The Gash Room",
    description:
      "An intimate boardroom for executive sessions and private councils. Soundproofed, encrypted, with a discreet private entrance from the lobby.",
    capacity: { theatre: 40, boardroom: 16, ushape: 14, reception: 50 },
    features: [
      "Encrypted video conferencing",
      "Soundproofed cabin",
      "Private entrance from lobby",
      "Discreet table service",
    ],
    image: null,
  },
];

const CATERING_TIERS = [
  { tier: "Bronze", price: "$38", note: "Working lunch · plant-forward" },
  { tier: "Silver", price: "$62", note: "Three-course plated · regional wines" },
  { tier: "Gold", price: "$95", note: "Five-course chef's menu · canapés on arrival" },
];

export function Conference() {
  return (
    <section
      id="conference"
      className="relative px-6 py-32 lg:px-12 lg:py-44"
      style={{ background: "var(--color-bone-soft)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-20 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
            <span
              className="text-[10px] font-medium uppercase tracking-[0.42em]"
              style={{ color: "var(--color-mist)" }}
            >
              Conference & Boardroom
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
            Two rooms, one
            <br />
            <em style={{ color: "var(--color-emerald-deep)" }}>standard</em>.
          </h2>
          <p className="mt-8 text-[16px] leading-[1.8]" style={{ color: "var(--color-stone)" }}>
            For diplomatic delegations, executive retreats, press briefings, and family councils. Both rooms are released to one party per session — no shared lobby, no overheard conversation.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {ROOMS.map((r, i) => (
            <Reveal key={r.id} delay={i * 100}>
              <article className="flex h-full flex-col">
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-sm"
                  data-cursor="image"
                  style={{
                    background: r.image
                      ? `url(${r.image}) center/cover no-repeat`
                      : "linear-gradient(135deg, var(--color-royal-deep) 0%, #14101C 60%, var(--color-charcoal) 100%)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)" }}
                  />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "rgba(233, 199, 123, 0.95)" }}>
                      Conference
                    </div>
                    <div className="mt-1 font-display" style={{ color: "#FFFFFF", fontSize: "30px", lineHeight: 1.05, fontWeight: 400 }}>
                      {r.name}
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex-1">
                  <p className="text-[15px] leading-[1.8]" style={{ color: "var(--color-stone)" }}>
                    {r.description}
                  </p>

                  <div className="mt-7">
                    <div className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-mist)" }}>
                      Seating capacity by layout
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-px" style={{ background: "var(--color-line)" }}>
                      {[
                        ["Theatre-style", r.capacity.theatre],
                        ["Boardroom", r.capacity.boardroom],
                        ["U-shape", r.capacity.ushape],
                        ["Reception", r.capacity.reception],
                      ].map(([label, n]) => (
                        <div key={label as string} className="px-2 py-3 text-center" style={{ background: "var(--color-ivory)" }}>
                          <div className="font-display tabular-nums" style={{ color: "var(--color-emerald-deep)", fontSize: "22px", lineHeight: 1, fontWeight: 400 }}>
                            {n}
                          </div>
                          <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em]" style={{ color: "var(--color-mist)" }}>
                            {label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-[10px]" style={{ color: "var(--color-mist)" }}>
                      Numbers show the maximum guests this room seats in each layout.
                    </p>
                  </div>

                  <ul className="mt-7 space-y-2">
                    {r.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[13px]" style={{ color: "var(--color-charcoal)" }}>
                        <span className="mt-[7px] inline-block h-px w-3 flex-shrink-0" style={{ background: "var(--color-gold)" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#book"
                  className="mt-8 inline-flex items-center gap-2 self-start text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: "var(--color-emerald-deep)" }}
                >
                  <span className="h-px w-6" style={{ background: "var(--color-emerald-deep)" }} />
                  Reserve {r.name}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Catering tiers */}
        <Reveal delay={120}>
          <div className="mt-24 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="text-[10px] font-medium uppercase tracking-[0.42em]" style={{ color: "var(--color-mist)" }}>
                Catering Tiers
              </div>
              <h3
                className="mt-3 font-display"
                style={{ color: "var(--color-charcoal)", fontSize: "32px", lineHeight: 1.1, fontWeight: 400 }}
              >
                Three menus, by the head.
              </h3>
              <p className="mt-4 text-[14px] leading-[1.85]" style={{ color: "var(--color-stone)" }}>
                Curated by Chef Hala. Each tier honours regional flavour and adapts to dietary needs — Halal, vegetarian, gluten-free.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-px sm:grid-cols-3 lg:col-span-8" style={{ background: "var(--color-line)" }}>
              {CATERING_TIERS.map((t) => (
                <div key={t.tier} className="px-6 py-7" style={{ background: "var(--color-ivory)" }}>
                  <div className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-gold)" }}>
                    {t.tier}
                  </div>
                  <div
                    className="mt-3 font-display tabular-nums"
                    style={{ color: "var(--color-emerald-deep)", fontSize: "32px", lineHeight: 1, fontWeight: 400 }}
                  >
                    {t.price}
                  </div>
                  <div className="mt-1 text-[10px]" style={{ color: "var(--color-mist)" }}>
                    per person
                  </div>
                  <div className="mt-5 text-[13px] leading-[1.7]" style={{ color: "var(--color-charcoal)" }}>
                    {t.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
