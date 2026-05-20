"use client";

import { useState } from "react";
import type { Hotel } from "@/lib/data";
import { Header } from "./DashboardView";

export function SettingsView({
  hotels,
  usingDefaultToken,
  bookingsCount,
}: {
  hotels: Hotel[];
  usingDefaultToken: boolean;
  bookingsCount: number;
}) {
  const [rows, setRows] = useState<Hotel[]>(hotels);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  function update(id: string, patch: Partial<Hotel>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  async function save() {
    setSaving(true);
    try {
      const inv = await (await fetch("/api/admin/inventory", { cache: "no-store" })).json();
      const merged = { ...inv.inventory, hotels: rows };
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
        title="Settings"
        subtitle="Hotel contact details, system health, security."
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

      {/* Security warning */}
      {usingDefaultToken ? (
        <div
          className="mt-8 rounded-lg border-l-4 p-4"
          style={{
            background: "rgba(248, 81, 73, 0.08)",
            borderColor: "#F88478",
            color: "#FFAEA5",
          }}
        >
          <div className="text-[12px] font-medium uppercase tracking-[0.28em]" style={{ color: "#F88478" }}>
            ⚠ Production warning
          </div>
          <div className="mt-2 text-[13px] leading-[1.7]">
            The admin login is using the default placeholder token. Before going live, set a strong{" "}
            <code className="rounded bg-black/30 px-1.5 py-0.5">ADMIN_TOKEN</code> environment variable
            in Vercel. Generate one with{" "}
            <code className="rounded bg-black/30 px-1.5 py-0.5">node -e &quot;console.log(require(&apos;crypto&apos;).randomBytes(32).toString(&apos;hex&apos;))&quot;</code>.
          </div>
        </div>
      ) : null}

      {/* Hotel cards */}
      <div className="mt-8 grid grid-cols-1 gap-4">
        {rows.map((h) => (
          <div
            key={h.id}
            className="rounded-lg border p-5"
            style={{ borderColor: "rgba(233, 199, 123, 0.16)", background: "rgba(20, 16, 28, 0.55)" }}
          >
            <div className="mb-4 flex items-baseline justify-between">
              <div>
                <div className="font-display text-[20px]" style={{ color: "#FFFFFF" }}>
                  {h.name.en}
                </div>
                <div className="font-arabic text-[14px]" style={{ color: "var(--color-gold-soft)" }}>
                  {h.name.ar}
                </div>
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "rgba(255,252,245,0.4)" }}>
                {h.id}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="WhatsApp number" hint="With country code, e.g. +249 123 456 789">
                <Input value={h.whatsapp} onChange={(v) => update(h.id, { whatsapp: v })} />
              </Field>
              <Field label="Backup phone" hint="Used as the secondary call option">
                <Input value={h.phone} onChange={(v) => update(h.id, { phone: v })} />
              </Field>
              <Field label="Email">
                <Input value={h.email} onChange={(v) => update(h.id, { email: v })} />
              </Field>
              <Field label="Currency">
                <Input value={h.currency} onChange={(v) => update(h.id, { currency: v.toUpperCase() })} />
              </Field>
              <Field label="Active">
                <label className="mt-1.5 inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={h.active}
                    onChange={(e) => update(h.id, { active: e.target.checked })}
                    className="h-5 w-5 accent-[var(--color-gold)]"
                  />
                  <span className="text-[13px]" style={{ color: "rgba(255,252,245,0.85)" }}>
                    Shown publicly + accepts bookings
                  </span>
                </label>
              </Field>
              <Field label="Timezone">
                <Input value={h.timezone} onChange={(v) => update(h.id, { timezone: v })} />
              </Field>
            </div>
          </div>
        ))}
      </div>

      {/* System info */}
      <div
        className="mt-8 rounded-lg border p-5"
        style={{ borderColor: "rgba(233, 199, 123, 0.12)", background: "rgba(20, 16, 28, 0.4)" }}
      >
        <div className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "rgba(255,252,245,0.55)" }}>
          System
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 text-[12px] sm:grid-cols-3" style={{ color: "rgba(255,252,245,0.7)" }}>
          <div>
            <div className="font-medium" style={{ color: "var(--color-gold-soft)" }}>Storage</div>
            <div>JSON files (ephemeral on Vercel)</div>
          </div>
          <div>
            <div className="font-medium" style={{ color: "var(--color-gold-soft)" }}>Bookings stored</div>
            <div>{bookingsCount}</div>
          </div>
          <div>
            <div className="font-medium" style={{ color: "var(--color-gold-soft)" }}>Database</div>
            <div>Supabase migration ready (not yet provisioned)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "rgba(255,252,245,0.55)" }}>
        {label}
      </div>
      {children}
      {hint ? (
        <div className="mt-1 text-[11px]" style={{ color: "rgba(255,252,245,0.4)" }}>
          {hint}
        </div>
      ) : null}
    </label>
  );
}

function Input(props: { value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <input
      type={props.type ?? "text"}
      value={props.value}
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
