const MARKS = [
  "Diplomatic Missions",
  "International Press",
  "Heads of State",
  "Trade Delegations",
  "Cultural Patrons",
  "Wedding Celebrations",
  "Executive Retreats",
  "NGO Leadership",
];

export function Marquee() {
  const items = [...MARKS, ...MARKS];
  return (
    <div
      className="overflow-hidden border-y py-6"
      style={{ borderColor: "var(--color-line)", background: "var(--color-bone-soft)" }}
    >
      <div className="flex" style={{ animation: "marquee 50s linear infinite", width: "max-content" }}>
        {items.map((m, i) => (
          <div key={`${m}-${i}`} className="flex flex-shrink-0 items-center gap-12 px-6">
            <span
              className="font-display text-[22px] tracking-tight whitespace-nowrap"
              style={{ color: "var(--color-stone)", fontStyle: "italic" }}
            >
              {m}
            </span>
            <span className="h-1 w-1 rounded-full" style={{ background: "var(--color-gold)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
