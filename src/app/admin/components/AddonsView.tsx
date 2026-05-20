"use client";

import { useState } from "react";
import type { Addon } from "@/lib/data";
import { Header } from "./DashboardView";

const CATEGORIES: Addon["category"][] = [
  "transport",
  "experience",
  "dining",
  "wellness",
  "catering",
  "av",
  "events",
];

export function AddonsView({ initial }: { initial: Addon[] }) {
  const [rows, setRows] = useState<Addon[]>(initial);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  function nameEn(a: Addon): string {
    return typeof a.name === "string" ? a.name : a.name.en;
  }
  function nameAr(a: Addon): string {
    return typeof a.name === "string" ? "" : a.name.ar;
  }

  function update(id: string, patch: Partial<Addon>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function add() {
    const id = `addon-${Date.now().toString(36)}`;
    setRows((rs) => [
      ...rs,
      {
        id,
        name: { en: "New add-on", ar: "إضافة جديدة" },
        price: 0,
        category: "experience",
        active: true,
      },
    ]);
  }

  function remove(id: string) {
    setRows((rs) => rs.filter((r) => r.id !== id));
  }

  async function save() {
    setSaving(true);
    try {
      const inv = await (await fetch("/api/admin/inventory", { cache: "no-store" })).json();
      const merged = { ...inv.inventory, addons: rows };
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
        title="Add-ons"
        subtitle="Manage upsells — catering, transfers, experiences. Active items appear in the booking flow."
        right={
          <div className="flex gap-2">
            <button
              onClick={add}
              className="rounded-md px-3 py-2 text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{ background: "rgba(20, 16, 28, 0.6)", color: "rgba(255,252,245,0.85)", border: "1px solid rgba(233,199,123,0.16)" }}
            >
              + Add
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="rounded-md px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{ background: "var(--color-gold)", color: "#14101C", opacity: saving ? 0.5 : 1 }}
            >
              {saving ? "Saving…" : savedAt ? `Saved · ${savedAt}` : "Save changes"}
            </button>
          </div>
        }
      />

      <div className="mt-8 grid grid-cols-1 gap-3">
        {rows.map((a) => (
          <div
            key={a.id}
            className="rounded-lg border p-4"
            style={{ borderColor: "rgba(233, 199, 123, 0.16)", background: "rgba(20, 16, 28, 0.55)" }}
          >
            <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-12">
              <div className="sm:col-span-1 flex justify-center">
                <input
                  type="checkbox"
                  checked={a.active}
                  onChange={(e) => update(a.id, { active: e.target.checked })}
                  className="h-5 w-5 accent-[var(--color-gold)]"
                />
              </div>
              <div className="sm:col-span-3">
                <Label>Name (EN)</Label>
                <Input
                  value={nameEn(a)}
                  onChange={(v) =>
                    update(a.id, {
                      name: typeof a.name === "string" ? v : { ...a.name, en: v },
                    })
                  }
                />
              </div>
              <div className="sm:col-span-3">
                <Label>Name (AR)</Label>
                <Input
                  value={nameAr(a)}
                  dir="rtl"
                  onChange={(v) =>
                    update(a.id, {
                      name:
                        typeof a.name === "string"
                          ? { en: a.name, ar: v }
                          : { ...a.name, ar: v },
                    })
                  }
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Category</Label>
                <select
                  value={a.category}
                  onChange={(e) => update(a.id, { category: e.target.value as Addon["category"] })}
                  className="mt-1.5 w-full rounded-md px-3 py-2 text-[13px] outline-none"
                  style={{
                    background: "rgba(14, 7, 25, 0.6)",
                    border: "1px solid rgba(233,199,123,0.16)",
                    color: "rgba(255,252,245,0.9)",
                  }}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <Label>Price · USD</Label>
                <Input
                  type="number"
                  value={String(a.price)}
                  onChange={(v) => update(a.id, { price: Number(v) || 0 })}
                />
              </div>
              <div className="sm:col-span-1 flex justify-end">
                <button
                  onClick={() => remove(a.id)}
                  className="text-[11px] font-medium uppercase tracking-[0.22em]"
                  style={{ color: "rgba(248, 81, 73, 0.85)" }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-[10px] font-medium uppercase tracking-[0.28em]"
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
