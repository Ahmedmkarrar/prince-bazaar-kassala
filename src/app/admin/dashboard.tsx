"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Inventory, Inquiry, DayAvailability, Addon } from "@/lib/data";

type Tab = "availability" | "rates" | "conference" | "addons" | "inquiries";

interface Props {
  initialInventory: Inventory;
  initialInquiries: Inquiry[];
}

export function AdminDashboard({ initialInventory, initialInquiries }: Props) {
  const [tab, setTab] = useState<Tab>("availability");
  const [inv, setInv] = useState<Inventory>(initialInventory);
  const [inquiries] = useState<Inquiry[]>(initialInquiries);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [persisted, setPersisted] = useState<boolean | null>(null);
  const router = useRouter();

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/inventory", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inv),
      });
      const data = await res.json();
      setPersisted(data.persisted ?? false);
      setSavedAt(new Date().toLocaleTimeString());
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen px-6 py-10 lg:px-12 lg:py-14" style={{ background: "var(--color-bone-soft)" }}>
      <div className="mx-auto max-w-[1300px]">
        <header className="flex flex-col items-start justify-between gap-4 border-b pb-6 sm:flex-row sm:items-end" style={{ borderColor: "var(--color-line)" }}>
          <div>
            <div
              className="text-[10px] font-medium uppercase tracking-[0.42em]"
              style={{ color: "var(--color-gold)" }}
            >
              Operations · Internal
            </div>
            <h1
              className="mt-2 font-display"
              style={{ color: "var(--color-charcoal)", fontSize: "32px", lineHeight: 1.1, fontWeight: 400 }}
            >
              Prince Bazaar Kassala
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {savedAt ? (
              <span className="text-[11px]" style={{ color: persisted === false ? "var(--color-terracotta)" : "var(--color-mist)" }}>
                {persisted === false ? "Saved in memory only · " : "Saved to disk · "}
                {savedAt}
              </span>
            ) : null}
            <button
              onClick={save}
              disabled={saving}
              className="rounded-full px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] disabled:opacity-50"
              style={{ background: "var(--color-emerald-deep)", color: "var(--color-gold-pale)" }}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
            <button
              onClick={logout}
              className="text-[11px] font-medium uppercase tracking-[0.22em]"
              style={{ color: "var(--color-mist)" }}
            >
              Sign Out
            </button>
          </div>
        </header>

        <nav className="mt-6 flex flex-wrap gap-1 border-b" style={{ borderColor: "var(--color-line)" }}>
          {([
            ["availability", "Availability"],
            ["rates", "Room Rates"],
            ["conference", "Conference"],
            ["addons", "Add-ons"],
            ["inquiries", `Inquiries · ${inquiries.length}`],
          ] as [Tab, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="px-4 py-3 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors"
              style={{
                color: tab === key ? "var(--color-charcoal)" : "var(--color-mist)",
                borderBottom: tab === key ? "1px solid var(--color-emerald-deep)" : "1px solid transparent",
                marginBottom: "-1px",
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-8">
          {tab === "availability" ? <AvailabilityTab inv={inv} setInv={setInv} /> : null}
          {tab === "rates" ? <RatesTab inv={inv} setInv={setInv} /> : null}
          {tab === "conference" ? <ConferenceTab inv={inv} setInv={setInv} /> : null}
          {tab === "addons" ? <AddonsTab inv={inv} setInv={setInv} /> : null}
          {tab === "inquiries" ? <InquiriesTab inquiries={inquiries} /> : null}
        </div>

        <p className="mt-12 max-w-2xl text-[11px]" style={{ color: "var(--color-mist)" }}>
          When the property's PMS is connected, the data layer behind <code>/lib/data.ts</code> will read & write through the live API. The same admin interface continues to work — only the source changes.
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2
        className="mb-4 text-[10px] font-medium uppercase tracking-[0.42em]"
        style={{ color: "var(--color-mist)" }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function AvailabilityTab({ inv, setInv }: { inv: Inventory; setInv: (i: Inventory) => void }) {
  const dates = Object.keys(inv.availability).sort();

  function update(date: string, key: keyof DayAvailability, value: number) {
    const next: Inventory = { ...inv, availability: { ...inv.availability, [date]: { ...inv.availability[date], [key]: value } } };
    setInv(next);
  }

  function addDay() {
    const last = dates[dates.length - 1];
    const base = last ? new Date(last) : new Date();
    base.setDate(base.getDate() + 1);
    const key = base.toISOString().slice(0, 10);
    setInv({ ...inv, availability: { ...inv.availability, [key]: { royal: 4, presidential: 2, priceMultiplier: 1 } } });
  }

  function removeDay(date: string) {
    const next = { ...inv.availability };
    delete next[date];
    setInv({ ...inv, availability: next });
  }

  return (
    <Section title="Daily Availability & Price Multiplier">
      <div className="overflow-x-auto rounded-sm border" style={{ borderColor: "var(--color-line)", background: "var(--color-ivory)" }}>
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ background: "var(--color-bone-soft)" }}>
              <Th>Date</Th>
              <Th>Royal</Th>
              <Th>Presidential</Th>
              <Th>Price ×</Th>
              <Th>Status</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {dates.map((d) => {
              const day = inv.availability[d];
              const total = day.royal + day.presidential;
              const status = total === 0 ? "Sold out" : total <= 2 ? "Limited" : "Available";
              const statusColor =
                total === 0
                  ? "var(--color-terracotta)"
                  : total <= 2
                  ? "var(--color-gold)"
                  : "var(--color-emerald-deep)";
              return (
                <tr key={d} className="border-t" style={{ borderColor: "var(--color-line)" }}>
                  <Td><span className="font-display">{d}</span></Td>
                  <Td><NumInput value={day.royal} onChange={(v) => update(d, "royal", v)} /></Td>
                  <Td><NumInput value={day.presidential} onChange={(v) => update(d, "presidential", v)} /></Td>
                  <Td><NumInput value={day.priceMultiplier} step={0.1} onChange={(v) => update(d, "priceMultiplier", v)} /></Td>
                  <Td>
                    <span className="text-[10px] font-medium uppercase tracking-[0.22em]" style={{ color: statusColor }}>
                      {status}
                    </span>
                  </Td>
                  <Td>
                    <button
                      onClick={() => removeDay(d)}
                      className="text-[11px]"
                      style={{ color: "var(--color-mist)" }}
                    >
                      Remove
                    </button>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button
        onClick={addDay}
        className="mt-4 rounded-full border px-5 py-2 text-[11px] font-medium uppercase tracking-[0.22em]"
        style={{ borderColor: "var(--color-line)", color: "var(--color-charcoal)" }}
      >
        + Add next day
      </button>
    </Section>
  );
}

function RatesTab({ inv, setInv }: { inv: Inventory; setInv: (i: Inventory) => void }) {
  function update(id: string, key: "name" | "view" | "capacity" | "basePrice" | "description", value: string | number) {
    const next: Inventory = {
      ...inv,
      rooms: inv.rooms.map((r) => (r.id === id ? { ...r, [key]: value } : r)),
    };
    setInv(next);
  }

  return (
    <Section title="Room Types — Base Rates">
      <div className="grid gap-4 lg:grid-cols-2">
        {inv.rooms.map((r) => (
          <div key={r.id} className="border p-6" style={{ background: "var(--color-ivory)", borderColor: "var(--color-line)" }}>
            <Field label="Name">
              <TextInput value={r.name} onChange={(v) => update(r.id, "name", v)} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="View">
                <TextInput value={r.view} onChange={(v) => update(r.id, "view", v)} />
              </Field>
              <Field label="Capacity">
                <NumInput value={r.capacity} onChange={(v) => update(r.id, "capacity", v)} />
              </Field>
            </div>
            <Field label={`Base Price (${r.currency} per night)`}>
              <NumInput value={r.basePrice} onChange={(v) => update(r.id, "basePrice", v)} />
            </Field>
            <Field label="Description">
              <TextInput value={r.description} onChange={(v) => update(r.id, "description", v)} />
            </Field>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ConferenceTab({ inv, setInv }: { inv: Inventory; setInv: (i: Inventory) => void }) {
  function update<K extends "name" | "description" | "halfDayPrice" | "fullDayPrice">(id: string, key: K, value: string | number) {
    setInv({
      ...inv,
      conferenceRooms: inv.conferenceRooms.map((c) => (c.id === id ? { ...c, [key]: value } : c)),
    });
  }
  function updateCap(id: string, key: keyof typeof inv.conferenceRooms[0]["capacity"], value: number) {
    setInv({
      ...inv,
      conferenceRooms: inv.conferenceRooms.map((c) =>
        c.id === id ? { ...c, capacity: { ...c.capacity, [key]: value } } : c,
      ),
    });
  }

  return (
    <Section title="Conference Rooms">
      <div className="grid gap-4 lg:grid-cols-2">
        {inv.conferenceRooms.map((c) => (
          <div key={c.id} className="border p-6" style={{ background: "var(--color-ivory)", borderColor: "var(--color-line)" }}>
            <Field label="Name">
              <TextInput value={c.name} onChange={(v) => update(c.id, "name", v)} />
            </Field>
            <Field label="Description">
              <TextInput value={c.description} onChange={(v) => update(c.id, "description", v)} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label={`Half-day (${c.currency})`}>
                <NumInput value={c.halfDayPrice} onChange={(v) => update(c.id, "halfDayPrice", v)} />
              </Field>
              <Field label={`Full-day (${c.currency})`}>
                <NumInput value={c.fullDayPrice} onChange={(v) => update(c.id, "fullDayPrice", v)} />
              </Field>
            </div>
            <div className="mt-4 text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-mist)" }}>
              Capacity by Layout
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {(["theatre", "boardroom", "ushape", "reception"] as const).map((k) => (
                <Field key={k} label={k.charAt(0).toUpperCase() + k.slice(1)}>
                  <NumInput value={c.capacity[k]} onChange={(v) => updateCap(c.id, k, v)} />
                </Field>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function AddonsTab({ inv, setInv }: { inv: Inventory; setInv: (i: Inventory) => void }) {
  function update(id: string, key: keyof Addon, value: string | number | boolean) {
    setInv({
      ...inv,
      addons: inv.addons.map((a) => (a.id === id ? { ...a, [key]: value } : a)),
    });
  }
  function add() {
    const id = `addon-${Date.now().toString(36)}`;
    setInv({
      ...inv,
      addons: [...inv.addons, { id, name: "New add-on", price: 0, category: "experience", active: true }],
    });
  }
  function remove(id: string) {
    setInv({ ...inv, addons: inv.addons.filter((a) => a.id !== id) });
  }

  return (
    <Section title="Add-ons & Services">
      <div className="overflow-x-auto rounded-sm border" style={{ borderColor: "var(--color-line)", background: "var(--color-ivory)" }}>
        <table className="w-full text-[13px]">
          <thead>
            <tr style={{ background: "var(--color-bone-soft)" }}>
              <Th>Active</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Price (USD)</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {inv.addons.map((a) => (
              <tr key={a.id} className="border-t" style={{ borderColor: "var(--color-line)" }}>
                <Td>
                  <input
                    type="checkbox"
                    checked={a.active}
                    onChange={(e) => update(a.id, "active", e.target.checked)}
                  />
                </Td>
                <Td><TextInput value={a.name} onChange={(v) => update(a.id, "name", v)} wide /></Td>
                <Td>
                  <select
                    value={a.category}
                    onChange={(e) => update(a.id, "category", e.target.value)}
                    className="bg-transparent text-[12px]"
                  >
                    {["transport", "experience", "dining", "wellness", "catering", "av", "events"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Td>
                <Td><NumInput value={a.price} onChange={(v) => update(a.id, "price", v)} /></Td>
                <Td>
                  <button onClick={() => remove(a.id)} className="text-[11px]" style={{ color: "var(--color-mist)" }}>
                    Remove
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={add}
        className="mt-4 rounded-full border px-5 py-2 text-[11px] font-medium uppercase tracking-[0.22em]"
        style={{ borderColor: "var(--color-line)", color: "var(--color-charcoal)" }}
      >
        + Add new
      </button>
    </Section>
  );
}

function InquiriesTab({ inquiries }: { inquiries: Inquiry[] }) {
  if (inquiries.length === 0) {
    return (
      <Section title="Recent Inquiries">
        <div className="border p-10 text-center" style={{ background: "var(--color-ivory)", borderColor: "var(--color-line)" }}>
          <p className="text-[14px]" style={{ color: "var(--color-mist)" }}>
            No inquiries yet. New requests from the website will appear here.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section title={`Recent Inquiries (${inquiries.length})`}>
      <div className="space-y-3">
        {inquiries.map((q) => (
          <div key={q.id} className="border p-5" style={{ background: "var(--color-ivory)", borderColor: "var(--color-line)" }}>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-[16px]" style={{ color: "var(--color-charcoal)" }}>{q.name}</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-gold)" }}>
                  {q.category}
                </span>
                <span className="font-mono text-[10px]" style={{ color: "var(--color-mist)" }}>{q.id}</span>
              </div>
              <span className="text-[11px]" style={{ color: "var(--color-mist)" }}>
                {new Date(q.ts).toLocaleString()}
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-[12px]" style={{ color: "var(--color-stone)" }}>
              <span>{q.email}</span>
              {q.phone ? <span>· {q.phone}</span> : null}
              {q.checkIn ? <span>· {q.checkIn} → {q.checkOut}</span> : null}
              {q.guests ? <span>· {q.guests} guests</span> : null}
              {q.conferenceRoom ? <span>· {q.conferenceRoom}</span> : null}
            </div>
            {q.message ? (
              <p className="mt-3 text-[13px] leading-[1.7]" style={{ color: "var(--color-charcoal)" }}>
                {q.message}
              </p>
            ) : null}
            {q.addons && q.addons.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {q.addons.map((a) => (
                  <span
                    key={a}
                    className="rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em]"
                    style={{ background: "var(--color-bone-soft)", color: "var(--color-charcoal)", border: "1px solid var(--color-line)" }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return (
    <th
      className="px-4 py-3 text-left text-[10px] font-medium uppercase tracking-[0.32em]"
      style={{ color: "var(--color-mist)" }}
    >
      {children}
    </th>
  );
}

function Td({ children }: { children?: React.ReactNode }) {
  return <td className="px-4 py-2.5" style={{ color: "var(--color-charcoal)" }}>{children}</td>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mt-3 block">
      <span className="block text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-mist)" }}>
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function TextInput({ value, onChange, wide }: { value: string; onChange: (v: string) => void; wide?: boolean }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-transparent py-1.5 text-[14px] outline-none ${wide ? "w-full" : ""}`}
      style={{ color: "var(--color-charcoal)", borderBottom: "1px solid var(--color-line)" }}
    />
  );
}

function NumInput({ value, onChange, step }: { value: number; onChange: (v: number) => void; step?: number }) {
  return (
    <input
      type="number"
      value={value}
      step={step ?? 1}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      className="w-24 bg-transparent py-1.5 text-[14px] outline-none tabular-nums"
      style={{ color: "var(--color-charcoal)", borderBottom: "1px solid var(--color-line)" }}
    />
  );
}
