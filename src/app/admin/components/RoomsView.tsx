"use client";

import { useState } from "react";
import type { RoomType } from "@/lib/data";
import { Header } from "./DashboardView";

export function RoomsView({ initial }: { initial: RoomType[] }) {
  const [rows, setRows] = useState<RoomType[]>(initial);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  function update(id: string, patch: Partial<RoomType>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function save() {
    setSaving(true);
    try {
      const inv = await (await fetch("/api/admin/inventory", { cache: "no-store" })).json();
      const merged = { ...inv.inventory, roomTypes: rows };
      const res = await fetch("/api/admin/inventory", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ inventory: merged }),
      });
      if (res.ok) setSavedAt(new Date().toLocaleTimeString());
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <Header
        title="Rooms & Rates"
        subtitle="Edit room types, nightly rates, and unit counts. Changes go live immediately."
        right={
          <button
            onClick={save}
            disabled={saving}
            className="rounded-md px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em]"
            style={{ background: "var(--color-gold)", color: "#14101C", opacity: saving ? 0.5 : 1 }}
          >
            {saving ? "Saving…" : savedAt ? `Saved · ${savedAt}` : "Save changes"}
          </button>
        }
      />

      <div className="mt-8 grid grid-cols-1 gap-4">
        {rows.map((r) => (
          <div
            key={r.id}
            className="rounded-lg border p-5"
            style={{ borderColor: "rgba(233, 199, 123, 0.16)", background: "rgba(20, 16, 28, 0.55)" }}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-12">
              <div className="sm:col-span-3">
                <Label>Name (EN)</Label>
                <Input value={r.name.en} onChange={(v) => update(r.id, { name: { ...r.name, en: v } })} />
                <Label className="mt-3">Name (AR)</Label>
                <Input
                  value={r.name.ar}
                  onChange={(v) => update(r.id, { name: { ...r.name, ar: v } })}
                  dir="rtl"
                />
              </div>
              <div className="sm:col-span-3">
                <Label>View (EN)</Label>
                <Input value={r.view.en} onChange={(v) => update(r.id, { view: { ...r.view, en: v } })} />
                <Label className="mt-3">View (AR)</Label>
                <Input
                  value={r.view.ar}
                  onChange={(v) => update(r.id, { view: { ...r.view, ar: v } })}
                  dir="rtl"
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Base price · USD</Label>
                <Input
                  type="number"
                  value={String(r.basePrice)}
                  onChange={(v) => update(r.id, { basePrice: Number(v) || 0 })}
                />
                <Label className="mt-3">Capacity</Label>
                <Input
                  type="number"
                  value={String(r.capacity)}
                  onChange={(v) => update(r.id, { capacity: Number(v) || 1 })}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Total units</Label>
                <Input
                  type="number"
                  value={String(r.totalUnits)}
                  onChange={(v) => update(r.id, { totalUnits: Number(v) || 0 })}
                />
                <Label className="mt-3">Size (m²)</Label>
                <Input
                  type="number"
                  value={String(r.sqm)}
                  onChange={(v) => update(r.id, { sqm: Number(v) || 0 })}
                />
              </div>
              <div className="sm:col-span-2 flex items-end justify-end">
                <div className="text-right">
                  <div className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "rgba(255,252,245,0.4)" }}>
                    ID
                  </div>
                  <div className="font-display text-[14px]" style={{ color: "var(--color-gold-soft)" }}>
                    {r.id}
                  </div>
                </div>
              </div>
              <div className="sm:col-span-12">
                <Label>Description (EN)</Label>
                <Textarea
                  value={r.description.en}
                  onChange={(v) => update(r.id, { description: { ...r.description, en: v } })}
                />
                <Label className="mt-3">Description (AR)</Label>
                <Textarea
                  value={r.description.ar}
                  onChange={(v) => update(r.id, { description: { ...r.description, ar: v } })}
                  dir="rtl"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`text-[10px] font-medium uppercase tracking-[0.28em] ${className ?? ""}`}
      style={{ color: "rgba(255,252,245,0.55)" }}
    >
      {children}
    </div>
  );
}

function Input(props: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  dir?: "ltr" | "rtl";
}) {
  return (
    <input
      type={props.type ?? "text"}
      value={props.value}
      dir={props.dir}
      onChange={(e) => props.onChange(e.target.value)}
      className="mt-1.5 w-full rounded-md px-3 py-2 text-[13px] outline-none"
      style={{
        background: "rgba(14, 7, 25, 0.6)",
        border: "1px solid rgba(233,199,123,0.16)",
        color: "rgba(255,252,245,0.9)",
      }}
    />
  );
}

function Textarea(props: { value: string; onChange: (v: string) => void; dir?: "ltr" | "rtl" }) {
  return (
    <textarea
      value={props.value}
      dir={props.dir}
      onChange={(e) => props.onChange(e.target.value)}
      rows={2}
      className="mt-1.5 w-full rounded-md px-3 py-2 text-[13px] outline-none"
      style={{
        background: "rgba(14, 7, 25, 0.6)",
        border: "1px solid rgba(233,199,123,0.16)",
        color: "rgba(255,252,245,0.9)",
      }}
    />
  );
}
