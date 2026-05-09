"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Loader() {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 2400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setHidden(true), 700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(800px 500px at 50% 40%, #2C1240 0%, #1A0E2E 60%, #0E0719 100%)",
      }}
      aria-hidden={hidden}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(233, 199, 123, 0.10), transparent 60%)",
          opacity: progress,
        }}
      />

      <div className="relative flex flex-col items-center gap-8">
        <div
          className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full transition-transform duration-700 ease-out"
          style={{
            background: "linear-gradient(135deg, #F4EFE6 0%, #E0DCD3 100%)",
            transform: `scale(${0.85 + progress * 0.15})`,
            opacity: 0.6 + progress * 0.4,
            boxShadow: "0 30px 80px -20px rgba(93, 42, 134, 0.45), inset 0 0 0 1px rgba(233, 199, 123, 0.4)",
          }}
        >
          <Image
            src="/logos/princebazaar.jpeg"
            alt="Prince Bazaar Kassala"
            width={160}
            height={160}
            priority
            sizes="160px"
            style={{ objectFit: "contain", width: "120%", height: "120%" }}
          />
        </div>

        <div className="text-center">
          <div
            className="font-display"
            style={{
              color: "#FFFFFF",
              fontSize: "22px",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Prince Bazaar
          </div>
          <div
            className="mt-2 text-[10px] font-medium uppercase"
            style={{
              color: "rgba(233, 199, 123, 0.75)",
              letterSpacing: "0.42em",
            }}
          >
            Kassala · Eastern Sudan
          </div>
        </div>

        <div
          className="relative h-px w-56 overflow-hidden"
          style={{ background: "rgba(233, 199, 123, 0.18)" }}
        >
          <div
            className="absolute inset-y-0 left-0"
            style={{
              width: `${progress * 100}%`,
              background:
                "linear-gradient(90deg, transparent 0%, #E9C77B 50%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
