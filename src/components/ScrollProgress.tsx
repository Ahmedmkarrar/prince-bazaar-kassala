"use client";

import { useEffect, useRef } from "react";

// A hairline gold reading-progress bar pinned to the very top of the viewport.
// Quiet, premium, and informative — it tracks how far through the page you are.
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[9998] h-[2px]" aria-hidden>
      <div
        ref={ref}
        className="h-full w-full origin-left"
        style={{
          transform: "scaleX(0)",
          background: "linear-gradient(90deg, var(--color-gold-soft) 0%, var(--color-gold) 50%, var(--color-royal-soft) 100%)",
          boxShadow: "0 0 12px rgba(182, 138, 62, 0.6)",
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
}
