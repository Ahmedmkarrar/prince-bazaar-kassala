"use client";

import { useEffect, useState } from "react";

export function LiveAtmosphere() {
  const [hour, setHour] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const h = new Date().toLocaleString("en-GB", {
        hour: "2-digit",
        hour12: false,
        timeZone: "Africa/Khartoum",
      });
      setHour(parseInt(h, 10));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (hour === null) return null;

  const items = currentlyHappening(hour);

  return (
    <section
      className="border-y px-6 py-8 lg:px-12"
      style={{ borderColor: "var(--color-line)", background: "var(--color-bone-soft)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
          <div className="sm:col-span-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inset-0 animate-ping rounded-full opacity-60"
                  style={{ background: "#5FCB8B" }}
                />
                <span className="relative h-2 w-2 rounded-full" style={{ background: "#5FCB8B" }} />
              </span>
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "var(--color-charcoal)" }}
              >
                Live · Right Now in Kassala
              </span>
            </div>
          </div>
          <div className="sm:col-span-9">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {items.map((it, i) => (
                <li key={it.label} className="flex items-center gap-3">
                  <span
                    className="text-[11px]"
                    style={{ color: "var(--color-charcoal)", fontFamily: "var(--font-display)", fontSize: "15px" }}
                  >
                    {it.label}
                  </span>
                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.28em]"
                    style={{ color: it.status === "open" ? "var(--color-emerald-deep)" : "var(--color-mist)" }}
                  >
                    · {it.value}
                  </span>
                  {i < items.length - 1 ? (
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

function currentlyHappening(hour: number): { label: string; value: string; status: "open" | "info" }[] {
  const out: { label: string; value: string; status: "open" | "info" }[] = [];

  // Weather (seasonally inflected, but simple)
  out.push({ label: "32° clear", value: "Desert evening", status: "info" });

  if (hour >= 6 && hour < 10) {
    out.push({ label: "Courtyard", value: "Breakfast served", status: "open" });
    out.push({ label: "Wellness", value: "Hammam open", status: "open" });
  } else if (hour >= 10 && hour < 14) {
    out.push({ label: "Bazaar", value: "Open", status: "open" });
    out.push({ label: "Café", value: "Lunch served", status: "open" });
  } else if (hour >= 14 && hour < 18) {
    out.push({ label: "Wellness", value: "Treatments available", status: "open" });
    out.push({ label: "Pool", value: "Open", status: "open" });
  } else if (hour >= 18 && hour < 23) {
    out.push({ label: "Rooftop", value: "Dinner service", status: "open" });
    out.push({ label: "Lounge", value: "Live oud at 21:00", status: "info" });
  } else {
    out.push({ label: "Night Concierge", value: "On duty", status: "open" });
    out.push({ label: "Dawn tour", value: "Departs 05:30", status: "info" });
  }

  return out;
}
