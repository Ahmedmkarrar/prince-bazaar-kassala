"use client";

import { useState } from "react";

type SectorOption = { id: string; name: string };

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm({ sectors }: { sectors: SectorOption[] }) {
  const [state, setState] = useState<FormState>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("submitting");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setState("success");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-[var(--color-ivory)] p-8 lg:p-12"
      style={{ border: "1px solid var(--color-line)" }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="How shall we address you?" required />
        <Field label="Email" name="email" type="email" placeholder="you@organisation.com" required />
        <Field label="Organisation" name="organisation" placeholder="Optional" />
        <SelectField label="Enquiry type" name="sector" options={sectors} />
      </div>

      <div className="mt-6">
        <Label>Message</Label>
        <textarea
          name="message"
          rows={6}
          required
          placeholder="A few lines on what you're looking for — a project brief, a property need, a reservation, or a general enquiry."
          className="mt-2 w-full bg-transparent px-4 py-3 text-[14px] leading-[1.7] outline-none transition-colors focus:border-[var(--color-royal-deep)]"
          style={{
            border: "1px solid var(--color-line)",
            color: "var(--color-charcoal)",
            fontFamily: "var(--font-sans)",
          }}
        />
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px]" style={{ color: "var(--color-mist)" }}>
          We respond within two business days. All enquiries are handled in confidence.
        </p>
        <button
          type="submit"
          disabled={state === "submitting"}
          className="btn-primary"
          style={{ opacity: state === "submitting" ? 0.6 : 1 }}
        >
          {state === "submitting" ? "Sending…" : state === "success" ? "Sent. Thank you." : "Send enquiry"}
        </button>
      </div>

      {state === "success" ? (
        <div
          className="mt-6 p-4 text-[13px] leading-[1.7]"
          style={{
            background: "var(--color-bone-soft)",
            border: "1px solid var(--color-gold-soft)",
            color: "var(--color-charcoal)",
          }}
        >
          Thank you — your enquiry has been received. Our team will reply within two business days.
        </div>
      ) : null}
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-[10px] font-medium uppercase tracking-[0.32em]"
      style={{ color: "var(--color-gold)" }}
    >
      {children}
    </span>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full bg-transparent px-4 py-3 text-[14px] outline-none transition-colors focus:border-[var(--color-royal-deep)]"
        style={{
          border: "1px solid var(--color-line)",
          color: "var(--color-charcoal)",
          fontFamily: "var(--font-sans)",
        }}
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: SectorOption[];
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <select
        name={name}
        className="mt-2 w-full bg-transparent px-4 py-3 text-[14px] outline-none transition-colors focus:border-[var(--color-royal-deep)]"
        style={{
          border: "1px solid var(--color-line)",
          color: "var(--color-charcoal)",
          fontFamily: "var(--font-sans)",
        }}
        defaultValue=""
      >
        <option value="" disabled>
          Select an area…
        </option>
        <option value="general">General enquiry</option>
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
      </select>
    </label>
  );
}
