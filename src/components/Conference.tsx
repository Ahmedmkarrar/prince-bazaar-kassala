import { Reveal } from "./Reveal";
import { WHATSAPP_URL } from "@/lib/whatsapp";

interface ConferenceRoomCard {
  id: string;
  name: string;
  description: string;
  capacity: number;
  features: string[];
  image: string | null;
}

const ROOMS: ConferenceRoomCard[] = [
  {
    id: "events-pavilion",
    name: "Events Pavilion",
    description:
      "Our larger venue for weddings, conferences, and cultural celebrations — good for up to 100 guests, with a large screen and surround sound.",
    capacity: 100,
    features: [
      "Good for up to 100 guests",
      "Large projection screen",
      "Surround sound system",
      "Wi-Fi throughout",
    ],
    image: null,
  },
  {
    id: "conference-room",
    name: "Conference Room",
    description:
      "A dedicated conference room for meetings, workshops, and corporate sessions — good for up to 60 guests, with Wi-Fi, a projector, and a full sound system.",
    capacity: 60,
    features: [
      "Good for up to 60 guests",
      "Wi-Fi",
      "Projector",
      "Sound system",
    ],
    image: null,
  },
];

const CATERING_TIERS = [
  { tier: "Bronze", note: "Working lunch · plant-forward" },
  { tier: "Silver", note: "Three-course plated · regional flavours" },
  { tier: "Gold", note: "Five-course chef's menu · canapés on arrival" },
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
                      Capacity
                    </div>
                    <div className="mt-3 flex items-baseline gap-3">
                      <span className="font-display tabular-nums" style={{ color: "var(--color-emerald-deep)", fontSize: "44px", lineHeight: 1, fontWeight: 400 }}>
                        {r.capacity}
                      </span>
                      <span className="text-[12px] font-medium uppercase tracking-[0.22em]" style={{ color: "var(--color-mist)" }}>
                        guests
                      </span>
                    </div>
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
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 self-start text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: "var(--color-emerald-deep)" }}
                >
                  <span className="h-px w-6" style={{ background: "var(--color-emerald-deep)" }} />
                  Inquire — {r.name}
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
                    className="mt-3 font-display"
                    style={{ color: "var(--color-emerald-deep)", fontSize: "28px", lineHeight: 1, fontWeight: 400 }}
                  >
                    On request
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
