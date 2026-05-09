"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;
    let active = false;

    const ease = 0.08;

    const onWheel = (e: WheelEvent) => {
      // Skip when over scrollable inner panes (chat panel, gallery)
      const path = (e.target as HTMLElement | null)?.closest("[data-no-smooth]");
      if (path) return;
      e.preventDefault();
      target += e.deltaY;
      target = Math.max(0, Math.min(target, document.documentElement.scrollHeight - window.innerHeight));
      if (!active) {
        active = true;
        loop();
      }
    };

    const loop = () => {
      current += (target - current) * ease;
      const dist = Math.abs(target - current);
      window.scrollTo(0, current);
      if (dist > 0.5) {
        raf = requestAnimationFrame(loop);
      } else {
        active = false;
      }
    };

    const onResize = () => {
      target = window.scrollY;
      current = window.scrollY;
    };

    const onAnchor = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const node = document.querySelector(id) as HTMLElement | null;
      if (!node) return;
      e.preventDefault();
      const rect = node.getBoundingClientRect();
      target = window.scrollY + rect.top - 0;
      target = Math.max(0, Math.min(target, document.documentElement.scrollHeight - window.innerHeight));
      if (!active) {
        active = true;
        loop();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onResize);
    document.addEventListener("click", onAnchor);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onAnchor);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
