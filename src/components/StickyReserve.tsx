"use client";

import { useEffect, useState } from "react";

export function StickyReserve() {
  const [show, setShow] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const limit = window.innerHeight * 0.95;
      setShow(y > limit);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setHidden(y > docH - 600); // hide near the booking form / footer
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed bottom-6 left-1/2 z-30 -translate-x-1/2 transition-all duration-500 ${
        show && !hidden ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div
        className="pointer-events-auto flex items-center gap-2 rounded-full px-2 py-2 shadow-2xl"
        style={{
          background: "var(--color-ivory)",
          border: "1px solid var(--color-line)",
          boxShadow: "0 24px 60px -12px rgba(14, 59, 46, 0.35)",
        }}
      >
        <input
          type="date"
          aria-label="Check-in"
          className="rounded-full border-none bg-transparent px-3 py-2 text-[12px]"
          style={{ color: "var(--color-charcoal)", minWidth: "130px" }}
        />
        <span className="h-4 w-px" style={{ background: "var(--color-line)" }} />
        <input
          type="date"
          aria-label="Check-out"
          className="rounded-full border-none bg-transparent px-3 py-2 text-[12px]"
          style={{ color: "var(--color-charcoal)", minWidth: "130px" }}
        />
        <span className="h-4 w-px" style={{ background: "var(--color-line)" }} />
        <select
          aria-label="Guests"
          className="rounded-full border-none bg-transparent px-2 py-2 text-[12px]"
          style={{ color: "var(--color-charcoal)" }}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("pb:open-reservation"))}
          className="btn-primary ml-2"
          style={{ padding: "0.625rem 1.25rem" }}
        >
          Reserve
        </button>
      </div>
    </div>
  );
}
