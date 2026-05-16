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

    const ease = 0.22;

    const onWheel = (e: WheelEvent) => {
      const path = (e.target as HTMLElement | null)?.closest("[data-no-smooth]");
      if (path) return;
      e.preventDefault();
      const delta = Math.max(-180, Math.min(180, e.deltaY));
      target += delta * 1.4;
      target = Math.max(0, Math.min(target, document.documentElement.scrollHeight - window.innerHeight));
      if (!active) {
        active = true;
        loop();
      }
    };

    const loop = () => {
      current += (target - current) * ease;
      const dist = Math.abs(target - current);
      if (dist < 0.4) {
        current = target;
        window.scrollTo(0, current);
        active = false;
        return;
      }
      window.scrollTo(0, current);
      raf = requestAnimationFrame(loop);
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
