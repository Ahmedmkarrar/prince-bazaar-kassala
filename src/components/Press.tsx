const TRUST_LINES = [
  "Diplomatic Missions",
  "International Press",
  "Heads of State",
  "Cultural Patrons",
  "Wedding Parties",
  "Trade Delegations",
];

export function Press() {
  return (
    <section
      className="border-y px-6 py-10 lg:px-12"
      style={{ borderColor: "var(--color-line)", background: "var(--color-ivory)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
          <div className="sm:col-span-3">
            <div
              className="text-[10px] font-medium uppercase tracking-[0.32em]"
              style={{ color: "var(--color-mist)" }}
            >
              Trusted by
            </div>
          </div>
          <div className="sm:col-span-9">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 sm:gap-x-10">
              {TRUST_LINES.map((t, i) => (
                <li key={t} className="flex items-center gap-8">
                  <span
                    className="text-[14px] font-medium tracking-[0.04em]"
                    style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-display)" }}
                  >
                    {t}
                  </span>
                  {i < TRUST_LINES.length - 1 ? (
                    <span className="hidden h-1 w-1 rounded-full sm:inline-block" style={{ background: "var(--color-gold)" }} />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
