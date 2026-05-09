"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import { BrandMark } from "./BrandMark";

export function Letters() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || status !== "idle") return;
    setStatus("submitting");
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: "Letters subscriber",
          email,
          category: "press",
          message: "Newsletter subscription",
        }),
      });
    } catch {
      // soft fail
    }
    setStatus("success");
  }

  return (
    <section
      className="relative overflow-hidden px-6 py-32 lg:px-12 lg:py-44"
      style={{
        background:
          "linear-gradient(120deg, var(--color-royal-deep) 0%, #1A0E2E 60%, #0E0719 100%)",
        color: "#FFFFFF",
      }}
    >
      <div className="pointer-events-none absolute -left-20 top-16 hidden opacity-[0.08] md:block" aria-hidden>
        <BrandMark color="#E9C77B" size={420} />
      </div>
      <div className="relative mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "rgba(233, 199, 123, 0.7)" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "rgba(233, 199, 123, 0.85)" }}
              >
                Letters from Kassala
              </span>
            </div>
            <h2
              className="mt-8 font-display tracking-[-0.015em]"
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(40px, 5.5vw, 76px)",
                lineHeight: 1.02,
                fontWeight: 400,
              }}
            >
              Quiet missives
              <br />
              from the <em style={{ color: "#E9C77B", fontWeight: 300 }}>desert</em>.
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-[1.85]" style={{ color: "rgba(255,255,255,0.7)" }}>
              Four times a year, an envelope by post and an email by morning — sunrise photographs, a chef's recipe, a guide's diary, and the occasional unannounced opening. By invitation, never sold.
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            {status === "success" ? (
              <div className="flex flex-col items-start justify-center gap-5 py-8">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ background: "#E9C77B", color: "#1A0E2E" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12 L10 17 L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div
                    className="text-[10px] font-medium uppercase tracking-[0.32em]"
                    style={{ color: "rgba(233, 199, 123, 0.8)" }}
                  >
                    Subscribed
                  </div>
                  <p
                    className="mt-2 font-display"
                    style={{ color: "#FFFFFF", fontSize: "22px", lineHeight: 1.3, fontWeight: 400 }}
                  >
                    The first letter will arrive at the next solstice.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <label className="block">
                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.32em]"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    Your email
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="mt-3 block w-full bg-transparent px-0 py-3 text-[18px] outline-none"
                    style={{
                      color: "#FFFFFF",
                      borderBottom: "1px solid rgba(255,255,255,0.25)",
                      fontFamily: "var(--font-display)",
                    }}
                  />
                </label>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-4 inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-[11px] font-medium uppercase tracking-[0.28em] transition-all disabled:opacity-50"
                  style={{ background: "#E9C77B", color: "#1A0E2E" }}
                >
                  {status === "submitting" ? "Sending…" : "Request the Letter"}
                  <span aria-hidden>→</span>
                </button>
                <p className="mt-2 text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>
                  Four issues a year. We'll never share your address.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
