import { Reveal } from "./Reveal";

const SIGNATURE = "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1600&q=90&auto=format&fit=crop";
const PORTRAIT = "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=1200&q=90&auto=format&fit=crop";

const COURSES = [
  { name: "Karkadeh & Pomegranate", note: "Welcome cocktail", origin: "House" },
  { name: "Ful Medames Royale", note: "Slow-cooked fava, smoked tahini, charred lemon", origin: "Greater Khartoum" },
  { name: "Kassala Lamb, Three Ways", note: "Grilled, braised, and as a clear broth", origin: "Eastern provinces" },
  { name: "Sorghum Pavé, Date Caramel", note: "A new dessert built from old grains", origin: "Signature" },
  { name: "Jebana Coffee, Cardamom", note: "Poured at the table, in the old way", origin: "Ritual" },
];

export function ChefsTable() {
  return (
    <section
      className="relative px-6 py-32 lg:px-12 lg:py-48"
      style={{ background: "var(--color-charcoal)", color: "#FFFFFF" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-sm"
              data-cursor="image"
              style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6)" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-[1.02]"
                style={{ backgroundImage: `url(${SIGNATURE})` }}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%)" }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div
                  className="text-[10px] font-medium uppercase tracking-[0.42em]"
                  style={{ color: "#E9C77B" }}
                >
                  Signature Course
                </div>
                <div
                  className="mt-2 font-display"
                  style={{ color: "#FFFFFF", fontSize: "28px", lineHeight: 1.1, fontWeight: 400 }}
                >
                  Sorghum Pavé, Date Caramel
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "rgba(233, 199, 123, 0.7)" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "rgba(233, 199, 123, 0.85)" }}
              >
                The Chef's Table
              </span>
            </div>
            <h2
              className="mt-8 font-display tracking-[-0.015em]"
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(40px, 5vw, 64px)",
                lineHeight: 1.02,
                fontWeight: 400,
              }}
            >
              Sudanese flavour,
              <br />
              <em style={{ color: "#E9C77B", fontWeight: 300 }}>world technique</em>.
            </h2>

            <div className="mt-10 flex items-center gap-5">
              <div
                className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full"
                style={{
                  backgroundImage: `url(${PORTRAIT})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "1px solid rgba(233, 199, 123, 0.5)",
                }}
              />
              <div>
                <div
                  className="font-display"
                  style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 400 }}
                >
                  Hala Al-Tigani
                </div>
                <div
                  className="mt-1 text-[11px] font-medium uppercase tracking-[0.28em]"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Executive Chef · Khartoum, Paris, Beirut
                </div>
              </div>
            </div>

            <p
              className="mt-8 text-[15px] leading-[1.85]"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Five courses paired with mocktails of regional botanicals. Served at sunset on the rooftop. Open to in-house guests, by reservation only.
            </p>

            <div className="mt-10 border-t pt-8" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              <div
                className="text-[10px] font-medium uppercase tracking-[0.32em]"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                Tonight's Menu
              </div>
              <ul className="mt-5 space-y-4">
                {COURSES.map((c, i) => (
                  <li key={c.name} className="flex items-start gap-4">
                    <span
                      className="font-display text-[12px] tabular-nums"
                      style={{ color: "rgba(233, 199, 123, 0.6)", paddingTop: "2px" }}
                    >
                      0{i + 1}
                    </span>
                    <div className="flex-1">
                      <div
                        className="font-display"
                        style={{ color: "#FFFFFF", fontSize: "17px", lineHeight: 1.3, fontWeight: 400 }}
                      >
                        {c.name}
                      </div>
                      <div
                        className="mt-1 text-[12px]"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        {c.note}
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-medium uppercase tracking-[0.28em]"
                      style={{ color: "rgba(255,255,255,0.4)", paddingTop: "4px" }}
                    >
                      {c.origin}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
