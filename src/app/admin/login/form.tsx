"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [token, setToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Invalid token");
        setSubmitting(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm border p-10"
        style={{ background: "var(--color-ivory)", borderColor: "var(--color-line)" }}
      >
        <div
          className="text-[10px] font-medium uppercase tracking-[0.42em]"
          style={{ color: "var(--color-gold)" }}
        >
          Operations
        </div>
        <h1
          className="mt-3 font-display"
          style={{ color: "var(--color-charcoal)", fontSize: "32px", lineHeight: 1.1, fontWeight: 400 }}
        >
          Prince Bazaar Kassala
        </h1>
        <p className="mt-2 text-[12px]" style={{ color: "var(--color-mist)" }}>
          Staff access only. Enter your operations token to continue.
        </p>

        <label className="mt-8 block">
          <span
            className="text-[10px] font-medium uppercase tracking-[0.32em]"
            style={{ color: "var(--color-mist)" }}
          >
            Token
          </span>
          <input
            type="password"
            autoFocus
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="mt-2 block w-full bg-transparent px-0 py-3 text-[18px] outline-none"
            style={{
              color: "var(--color-charcoal)",
              borderBottom: "1px solid var(--color-line)",
              fontFamily: "var(--font-display)",
            }}
          />
        </label>

        {error ? (
          <div
            className="mt-4 text-[12px]"
            style={{ color: "var(--color-terracotta)" }}
          >
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={submitting || token.length === 0}
          className="mt-6 w-full rounded-full px-5 py-3 text-[11px] font-medium uppercase tracking-[0.22em] disabled:opacity-50"
          style={{ background: "var(--color-emerald-deep)", color: "var(--color-gold-pale)" }}
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>

        <div className="mt-8 text-[10px]" style={{ color: "var(--color-mist)" }}>
          Default development token: <code className="font-mono" style={{ color: "var(--color-stone)" }}>shahad2026</code>
          . Change <code>ADMIN_TOKEN</code> in <code>.env.local</code> for production.
        </div>
      </form>
    </div>
  );
}
