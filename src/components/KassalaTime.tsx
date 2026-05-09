"use client";

import { useEffect, useState } from "react";

export function KassalaTime() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const tz = "Africa/Khartoum";
      const t = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: tz,
      }).format(now);
      const d = new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        timeZone: tz,
      }).format(now);
      setTime(t);
      setDate(d);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="grid grid-cols-2 gap-px sm:grid-cols-4"
      style={{ background: "rgba(255,255,255,0.08)" }}
    >
      <Cell title="Local Time" value={time || "—"} caption="Kassala (CAT)" />
      <Cell title="Latitude" value="15° 27′" caption="North" />
      <Cell title="Sunset" value="18:42" caption="Today" />
      <Cell title="Today" value={date.split(",")[0] ?? "—"} caption={date.split(",")[1]?.trim() ?? ""} />
    </div>
  );
}

function Cell({ title, value, caption }: { title: string; value: string; caption: string }) {
  return (
    <div
      className="px-6 py-5"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(18px)" }}
    >
      <div
        className="text-[9px] font-medium uppercase tracking-[0.32em]"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        {title}
      </div>
      <div
        className="mt-2 font-display leading-none tabular-nums"
        style={{ color: "#FFFFFF", fontSize: "clamp(22px, 2.4vw, 30px)", fontWeight: 400 }}
      >
        {value}
      </div>
      <div
        className="mt-1 text-[10px] tracking-wide"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        {caption}
      </div>
    </div>
  );
}
