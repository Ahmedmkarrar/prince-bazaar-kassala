"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { WHATSAPP_URL } from "@/lib/whatsapp";

interface Node {
  id: string;
  number: string;
  name: string;
  blurb: string;
  cx: number;
  cy: number;
  w: number;
  h: number;
  shape: "rect" | "round";
}

const NODES: Node[] = [
  { id: "royal", number: "01", name: "Royal Suites", blurb: "Four suite types, 49 rooms, mountain views", cx: 250, cy: 140, w: 100, h: 70, shape: "rect" },
  { id: "plaza", number: "02", name: "Commercial Plaza", blurb: "International retail, flagship boutiques", cx: 420, cy: 130, w: 120, h: 60, shape: "rect" },
  { id: "business", number: "03", name: "Business Center", blurb: "Boardrooms and coworking", cx: 620, cy: 280, w: 100, h: 80, shape: "rect" },
  { id: "culinary", number: "04", name: "Culinary Hub", blurb: "Restaurant, dine-in and room service", cx: 410, cy: 290, w: 130, h: 75, shape: "rect" },
  { id: "events", number: "05", name: "Event Pavilions", blurb: "Conference rooms and events pavilion", cx: 330, cy: 430, w: 150, h: 75, shape: "rect" },
  { id: "bazaar", number: "06", name: "The Bazaar", blurb: "Stalls, spice, textile, daily provisions", cx: 600, cy: 150, w: 110, h: 60, shape: "rect" },
  { id: "tourism", number: "07", name: "Tourism & Concierge", blurb: "Airport, mountain, cultural tours", cx: 790, cy: 200, w: 60, h: 60, shape: "round" },
];

const CONNECTIONS: [string, string][] = [
  ["royal", "plaza"],
  ["plaza", "bazaar"],
  ["plaza", "culinary"],
  ["bazaar", "culinary"],
  ["bazaar", "tourism"],
  ["culinary", "business"],
  ["culinary", "events"],
  ["business", "tourism"],
];

export function ComplexMap() {
  const [active, setActive] = useState<string>(NODES[0].id);
  const node = NODES.find((n) => n.id === active) ?? NODES[0];

  return (
    <section
      className="relative overflow-hidden px-6 py-32 lg:px-12 lg:py-44"
      style={{ background: "var(--color-ivory)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-16 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "var(--color-mist)" }}
              >
                Master Plan · Sheet 01
              </span>
            </div>
            <h2
              className="mt-8 max-w-2xl font-display tracking-[-0.015em]"
              style={{
                color: "var(--color-charcoal)",
                lineHeight: 1.02,
                fontSize: "clamp(40px, 5.5vw, 76px)",
                fontWeight: 400,
              }}
            >
              Seven worlds, <em style={{ color: "var(--color-emerald-deep)" }}>connected</em>.
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-[1.85]" style={{ color: "var(--color-stone)" }}>
            The arcades that connect each complex are climate-controlled, lined in stone, and flow as one continuous walk. Hover any building to read its character.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <div
              className="relative w-full overflow-hidden"
              style={{
                background: "#FBF8F1",
                aspectRatio: "9 / 6",
                border: "1px solid var(--color-line)",
                boxShadow: "0 30px 60px -25px rgba(27, 26, 23, 0.18)",
              }}
            >
              {/* Title block (architectural drawing convention) */}
              <div
                className="absolute left-4 top-4 z-10 flex flex-col gap-1 px-3 py-2"
                style={{ borderLeft: "1px solid rgba(27,26,23,0.25)" }}
              >
                <span
                  className="text-[9px] font-medium uppercase tracking-[0.42em]"
                  style={{ color: "var(--color-mist)" }}
                >
                  Prince Plaza Kassala — Master Plan
                </span>
                <span
                  className="text-[8px] uppercase tracking-[0.32em]"
                  style={{ color: "var(--color-mist)", opacity: 0.7 }}
                >
                  Drawing 01 / Scale 1:1500 / Date 2026
                </span>
              </div>

              <svg viewBox="0 0 920 540" className="absolute inset-0 h-full w-full">
                <defs>
                  <pattern id="grid-fine" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(27,26,23,0.05)" strokeWidth="0.5" />
                  </pattern>
                  <pattern id="grid-bold" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(27,26,23,0.10)" strokeWidth="0.5" />
                  </pattern>
                  <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(14,59,46,0.25)" strokeWidth="0.7" />
                  </pattern>
                  <pattern id="hatch-active" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="5" stroke="rgba(14,59,46,0.85)" strokeWidth="0.9" />
                  </pattern>
                </defs>

                {/* Grid background */}
                <rect width="920" height="540" fill="url(#grid-fine)" />
                <rect width="920" height="540" fill="url(#grid-bold)" />

                {/* Site outline (property boundary) */}
                <rect
                  x="80"
                  y="60"
                  width="780"
                  height="430"
                  fill="none"
                  stroke="rgba(27,26,23,0.55)"
                  strokeWidth="1.2"
                />
                <rect
                  x="86"
                  y="66"
                  width="768"
                  height="418"
                  fill="none"
                  stroke="rgba(27,26,23,0.18)"
                  strokeWidth="0.5"
                />

                {/* Mountain edge (Taka, north-east) */}
                <path
                  d="M 700 60 L 740 38 L 780 50 L 820 32 L 860 60"
                  fill="none"
                  stroke="rgba(180, 90, 60, 0.6)"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
                <text
                  x="780"
                  y="28"
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="var(--font-sans)"
                  letterSpacing="0.32em"
                  fill="rgba(180, 90, 60, 0.7)"
                  style={{ textTransform: "uppercase" }}
                >
                  Taka Mountains
                </text>

                {/* Connecting arcades */}
                {CONNECTIONS.map(([a, b]) => {
                  const A = NODES.find((n) => n.id === a)!;
                  const B = NODES.find((n) => n.id === b)!;
                  const isActive = a === active || b === active;
                  return (
                    <line
                      key={`${a}-${b}`}
                      x1={A.cx}
                      y1={A.cy}
                      x2={B.cx}
                      y2={B.cy}
                      stroke={isActive ? "rgba(14,59,46,0.8)" : "rgba(27,26,23,0.30)"}
                      strokeWidth={isActive ? 1.6 : 1.1}
                      strokeDasharray="6 4"
                      style={{ transition: "all 0.4s ease" }}
                    />
                  );
                })}

                {/* Buildings */}
                {NODES.map((n) => {
                  const isActive = n.id === active;
                  const fill = isActive ? "url(#hatch-active)" : "url(#hatch)";
                  const stroke = isActive ? "rgba(14,59,46,1)" : "rgba(27,26,23,0.65)";

                  return (
                    <g
                      key={n.id}
                      onMouseEnter={() => setActive(n.id)}
                      onClick={() => setActive(n.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {n.shape === "round" ? (
                        <circle
                          cx={n.cx}
                          cy={n.cy}
                          r={n.w / 2}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={isActive ? 1.6 : 1}
                          style={{ transition: "all 0.4s ease" }}
                        />
                      ) : (
                        <rect
                          x={n.cx - n.w / 2}
                          y={n.cy - n.h / 2}
                          width={n.w}
                          height={n.h}
                          fill={fill}
                          stroke={stroke}
                          strokeWidth={isActive ? 1.6 : 1}
                          style={{ transition: "all 0.4s ease" }}
                        />
                      )}
                      {/* Building number in tiny circle */}
                      <circle
                        cx={n.cx - n.w / 2 + 12}
                        cy={n.cy - n.h / 2 + 12}
                        r="9"
                        fill="#FBF8F1"
                        stroke={stroke}
                        strokeWidth="0.8"
                      />
                      <text
                        x={n.cx - n.w / 2 + 12}
                        y={n.cy - n.h / 2 + 15}
                        textAnchor="middle"
                        fontSize="9"
                        fontFamily="var(--font-display)"
                        fill={isActive ? "var(--color-emerald-deep)" : "var(--color-charcoal)"}
                        fontWeight="500"
                      >
                        {n.number}
                      </text>
                      {/* Label below */}
                      <text
                        x={n.cx}
                        y={n.cy + n.h / 2 + 18}
                        textAnchor="middle"
                        fontSize="10"
                        fontFamily="var(--font-sans)"
                        letterSpacing="0.28em"
                        fontWeight="500"
                        fill={isActive ? "var(--color-emerald-deep)" : "rgba(27,26,23,0.6)"}
                        style={{ textTransform: "uppercase", transition: "fill 0.3s" }}
                      >
                        {n.name}
                      </text>
                    </g>
                  );
                })}

                {/* North marker */}
                <g transform="translate(820, 460)">
                  <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(27,26,23,0.4)" strokeWidth="0.6" />
                  <path d="M 0 -16 L 4 0 L 0 -2 L -4 0 Z" fill="rgba(14,59,46,0.85)" />
                  <path d="M 0 16 L 4 0 L 0 2 L -4 0 Z" fill="none" stroke="rgba(27,26,23,0.4)" strokeWidth="0.6" />
                  <text
                    x="0"
                    y="-26"
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="var(--font-display)"
                    fontStyle="italic"
                    fill="var(--color-emerald-deep)"
                  >
                    N
                  </text>
                </g>

                {/* Scale bar */}
                <g transform="translate(110, 510)">
                  <line x1="0" y1="0" x2="120" y2="0" stroke="rgba(27,26,23,0.6)" strokeWidth="1" />
                  <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(27,26,23,0.6)" strokeWidth="1" />
                  <line x1="40" y1="-2" x2="40" y2="2" stroke="rgba(27,26,23,0.4)" strokeWidth="0.8" />
                  <line x1="80" y1="-2" x2="80" y2="2" stroke="rgba(27,26,23,0.4)" strokeWidth="0.8" />
                  <line x1="120" y1="-3" x2="120" y2="3" stroke="rgba(27,26,23,0.6)" strokeWidth="1" />
                  <text x="0" y="14" fontSize="8" fontFamily="var(--font-sans)" letterSpacing="0.2em" fill="rgba(27,26,23,0.6)">
                    0
                  </text>
                  <text x="120" y="14" textAnchor="end" fontSize="8" fontFamily="var(--font-sans)" letterSpacing="0.2em" fill="rgba(27,26,23,0.6)">
                    50 M
                  </text>
                </g>

                {/* Latitude / longitude callout */}
                <text
                  x="860"
                  y="520"
                  textAnchor="end"
                  fontSize="8"
                  fontFamily="var(--font-sans)"
                  letterSpacing="0.32em"
                  fill="rgba(27,26,23,0.5)"
                  style={{ textTransform: "uppercase" }}
                >
                  15°27′N · 36°23′E
                </text>
              </svg>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div
              className="p-8"
              style={{
                background: "#FBF8F1",
                border: "1px solid var(--color-line)",
                boxShadow: "0 20px 50px -25px rgba(27, 26, 23, 0.2)",
              }}
            >
              <div className="flex items-baseline justify-between">
                <span
                  className="text-[10px] font-medium uppercase tracking-[0.42em]"
                  style={{ color: "var(--color-gold)" }}
                >
                  Building {node.number}
                </span>
                <span
                  className="text-[9px] uppercase tracking-[0.32em]"
                  style={{ color: "var(--color-mist)" }}
                >
                  Sheet 01.{node.number}
                </span>
              </div>
              <h3
                className="mt-4 font-display tracking-[-0.01em]"
                style={{
                  color: "var(--color-charcoal)",
                  fontSize: "32px",
                  lineHeight: 1.1,
                  fontWeight: 400,
                }}
              >
                {node.name}
              </h3>
              <p
                className="mt-4 text-[14px] leading-[1.8]"
                style={{ color: "var(--color-stone)" }}
              >
                {node.blurb}
              </p>

              <div
                className="mt-8 grid grid-cols-2 gap-px"
                style={{ background: "var(--color-line)" }}
              >
                <div className="px-3 py-3" style={{ background: "#FBF8F1" }}>
                  <div className="text-[9px] uppercase tracking-[0.28em]" style={{ color: "var(--color-mist)" }}>
                    To next complex
                  </div>
                  <div
                    className="mt-1 font-display"
                    style={{ color: "var(--color-emerald-deep)", fontSize: "16px" }}
                  >
                    ≈ 90 sec
                  </div>
                </div>
                <div className="px-3 py-3" style={{ background: "#FBF8F1" }}>
                  <div className="text-[9px] uppercase tracking-[0.28em]" style={{ color: "var(--color-mist)" }}>
                    Arcade
                  </div>
                  <div
                    className="mt-1 font-display"
                    style={{ color: "var(--color-emerald-deep)", fontSize: "16px" }}
                  >
                    Climate-controlled
                  </div>
                </div>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em]"
                style={{ color: "var(--color-emerald-deep)" }}
              >
                <span className="h-px w-6" style={{ background: "var(--color-emerald-deep)" }} />
                Reserve at this building
              </a>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2">
              {NODES.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setActive(n.id)}
                  className="aspect-square text-[10px] font-medium transition-all"
                  style={{
                    background: n.id === active ? "var(--color-emerald-deep)" : "#FBF8F1",
                    color: n.id === active ? "var(--color-gold-pale)" : "var(--color-charcoal)",
                    border: "1px solid var(--color-line)",
                    fontFamily: "var(--font-display)",
                  }}
                  aria-label={n.name}
                >
                  {n.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
