"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type CursorMode = "default" | "image" | "cta" | "drag";

const FINE_POINTER = "(pointer: fine)";

// A media query is external state, so read it through useSyncExternalStore
// rather than assigning it into state from an effect. The server snapshot is
// `false` so the bespoke cursor never appears in the SSR markup.
function subscribeFinePointer(onChange: () => void) {
  const mql = window.matchMedia(FINE_POINTER);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function useFinePointer(): boolean {
  return useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
}

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const enabled = useFinePointer();

  useEffect(() => {
    if (!enabled) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("[data-cursor]");
      const cursorAttr = interactive?.getAttribute("data-cursor") as CursorMode | null;
      if (cursorAttr) {
        setMode(cursorAttr);
        return;
      }
      const isLink = target.closest("a, button, [role='button'], input, textarea, select, label");
      setMode(isLink ? "cta" : "default");
    };

    const tick = () => {
      const dx = mx - rx;
      const dy = my - ry;
      rx += dx * 0.18;
      ry += dy * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    document.documentElement.style.cursor = "none";
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.style.cursor = "";
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize = mode === "image" ? 88 : mode === "cta" ? 48 : mode === "drag" ? 96 : 32;
  const ringOpacity = mode === "image" || mode === "drag" ? 1 : mode === "cta" ? 0.85 : 0.55;
  const ringBg =
    mode === "image"
      ? "rgba(233, 199, 123, 0.92)"
      : mode === "drag"
      ? "rgba(255, 255, 255, 0.92)"
      : "transparent";
  const ringBorder =
    mode === "image"
      ? "1px solid rgba(0,0,0,0.15)"
      : "1px solid rgba(255,255,255,0.7)";
  const labelText = mode === "image" ? "+ View" : mode === "drag" ? "Drag" : "";
  const dotOpacity = mode === "image" || mode === "drag" ? 0 : 1;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full transition-opacity"
        style={{
          background: "#FFFFFF",
          mixBlendMode: "difference",
          opacity: dotOpacity,
        }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full transition-[width,height,background,opacity,border-color] duration-300 ease-out"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          background: ringBg,
          border: ringBorder,
          opacity: ringOpacity,
          color: mode === "image" || mode === "drag" ? "#3B1660" : "#FFFFFF",
          mixBlendMode: mode === "image" || mode === "drag" ? "normal" : "difference",
        }}
        aria-hidden
      >
        {labelText ? (
          <span
            ref={labelRef}
            className="text-[9px] font-medium uppercase tracking-[0.32em]"
            style={{ color: "#3B1660" }}
          >
            {labelText}
          </span>
        ) : null}
      </div>
    </>
  );
}
