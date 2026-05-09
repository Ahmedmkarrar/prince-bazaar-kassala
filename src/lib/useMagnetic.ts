"use client";

import { useEffect, useRef } from "react";

export function useMagnetic(strength = 0.25) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;

    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      tx = x * strength;
      ty = y * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        node.style.transform = `translate(${tx}px, ${ty}px)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      node.style.transform = "translate(0, 0)";
    };

    node.addEventListener("mousemove", onMove as EventListener);
    node.addEventListener("mouseleave", onLeave as EventListener);
    return () => {
      node.removeEventListener("mousemove", onMove as EventListener);
      node.removeEventListener("mouseleave", onLeave as EventListener);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}
