"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";

interface City {
  id: string;
  name: string;
  x: number;
  y: number;
  note: string;
  highlight?: boolean;
}

const CITIES: City[] = [
  { id: "khartoum", name: "Khartoum", x: 658, y: 345, note: "Capital · 480 km" },
  { id: "kassala", name: "Kassala", x: 900, y: 353, note: "Prince Bazaar", highlight: true },
  { id: "portsudan", name: "Port Sudan", x: 950, y: 129, note: "Red Sea · 380 km" },
  { id: "atbara", name: "Atbara", x: 749, y: 232, note: "Junction of Niles" },
  { id: "wadihalfa", name: "Wadi Halfa", x: 583, y: 11, note: "Northern Border" },
  { id: "wadmadani", name: "Wad Madani", x: 720, y: 410, note: "Gezira plain" },
  { id: "nyala", name: "Nyala", x: 180, y: 535, note: "Darfur" },
];

const SUDAN_PATH =
  "M 580 8 L 480 12 L 280 20 L 140 30 L 110 180 L 95 320 L 100 480 L 130 600 L 220 690 L 350 695 L 500 700 L 620 698 L 700 695 L 760 640 L 820 540 L 870 430 L 905 350 L 935 250 L 968 170 L 980 90 L 950 30 L 820 18 L 700 10 Z";

const NILE_PATH =
  "M 660 700 Q 670 600, 680 500 Q 700 420, 700 340 Q 710 260, 740 200 Q 770 120, 760 40";

export function SudanMap() {
  const [active, setActive] = useState<string>("kassala");
  const node = CITIES.find((c) => c.id === active) ?? CITIES[1];

  return (
    <section
      className="relative px-6 py-32 lg:px-12 lg:py-44"
      style={{ background: "var(--color-charcoal)", color: "#FFFFFF" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "rgba(233, 199, 123, 0.7)" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "rgba(233, 199, 123, 0.85)" }}
              >
                Where We Are
              </span>
            </div>
            <h2
              className="mt-8 font-display tracking-[-0.015em]"
              style={{
                color: "#FFFFFF",
                fontSize: "clamp(40px, 5.5vw, 72px)",
                lineHeight: 1.02,
                fontWeight: 400,
              }}
            >
              At the eastern
              <br />
              <em style={{ color: "#E9C77B", fontWeight: 300 }}>edge of Sudan</em>.
            </h2>

            <p
              className="mt-8 max-w-md text-[15px] leading-[1.85]"
              style={{ color: "rgba(255, 255, 255, 0.7)" }}
            >
              Kassala sits at the meeting point of three landscapes — the Nile valley to the west, the Red Sea coast to the north-east, and the Ethiopian highlands rising to the south.
            </p>

            <div className="mt-10 border-t pt-8" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              <ul className="space-y-4">
                {[
                  ["480 km", "From Khartoum International"],
                  ["380 km", "From Port Sudan & the Red Sea"],
                  ["3.5 hrs", "Direct charter flight option"],
                  ["1 km", "From the Taka Mountains"],
                ].map(([k, v]) => (
                  <li key={v} className="flex items-baseline justify-between gap-4">
                    <span
                      className="font-display tabular-nums"
                      style={{ color: "#E9C77B", fontSize: "20px", fontWeight: 400 }}
                    >
                      {k}
                    </span>
                    <span
                      className="text-[12px]"
                      style={{ color: "rgba(255, 255, 255, 0.6)" }}
                    >
                      {v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-8">
            <div className="relative">
              <svg
                viewBox="0 0 1000 720"
                className="h-auto w-full"
                style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.4))" }}
              >
                <defs>
                  <linearGradient id="land" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#1a1a17" />
                    <stop offset="1" stopColor="#2a2620" />
                  </linearGradient>
                  <pattern id="dotgrid" width="14" height="14" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.4" fill="rgba(233,199,123,0.18)" />
                  </pattern>
                </defs>

                {/* Background */}
                <rect width="1000" height="720" fill="url(#dotgrid)" />

                {/* Red Sea */}
                <path
                  d="M 980 90 L 960 200 L 940 300 L 920 400 L 1000 400 L 1000 90 Z"
                  fill="rgba(233, 199, 123, 0.05)"
                  stroke="rgba(233, 199, 123, 0.18)"
                  strokeWidth="0.5"
                />
                <text
                  x="965"
                  y="240"
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="var(--font-sans)"
                  letterSpacing="0.32em"
                  fill="rgba(233, 199, 123, 0.5)"
                  style={{ textTransform: "uppercase" }}
                  transform="rotate(90, 965, 240)"
                >
                  Red Sea
                </text>

                {/* Sudan landmass */}
                <path
                  d={SUDAN_PATH}
                  fill="url(#land)"
                  stroke="rgba(233, 199, 123, 0.55)"
                  strokeWidth="1"
                />

                {/* Nile (stylized) */}
                <path
                  d={NILE_PATH}
                  fill="none"
                  stroke="rgba(180, 200, 220, 0.55)"
                  strokeWidth="1.4"
                  strokeDasharray="2 3"
                />
                <text
                  x="745"
                  y="540"
                  fontSize="9"
                  fontFamily="var(--font-display)"
                  fontStyle="italic"
                  fill="rgba(180, 200, 220, 0.7)"
                >
                  The Nile
                </text>

                {/* Taka Mountains marker near Kassala */}
                <g>
                  <path
                    d="M 870 332 L 882 320 L 894 332 L 906 318 L 918 332 Z"
                    fill="none"
                    stroke="rgba(233, 199, 123, 0.7)"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <text
                    x="888"
                    y="312"
                    textAnchor="middle"
                    fontSize="8"
                    fontFamily="var(--font-sans)"
                    letterSpacing="0.32em"
                    fill="rgba(233, 199, 123, 0.65)"
                    style={{ textTransform: "uppercase" }}
                  >
                    Taka Mountains
                  </text>
                </g>

                {/* Cities */}
                {CITIES.map((c) => {
                  const isActive = c.id === active;
                  const isUs = c.highlight;
                  return (
                    <g
                      key={c.id}
                      onMouseEnter={() => setActive(c.id)}
                      onClick={() => setActive(c.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {isUs ? (
                        <>
                          <circle
                            cx={c.x}
                            cy={c.y}
                            r="20"
                            fill="rgba(233, 199, 123, 0.15)"
                            style={{ transition: "all 0.4s" }}
                          />
                          <circle
                            cx={c.x}
                            cy={c.y}
                            r="11"
                            fill="rgba(233, 199, 123, 0.35)"
                          />
                          <circle cx={c.x} cy={c.y} r="5" fill="#E9C77B" />
                        </>
                      ) : (
                        <circle
                          cx={c.x}
                          cy={c.y}
                          r={isActive ? 5 : 3.5}
                          fill={isActive ? "#FFFFFF" : "rgba(255,255,255,0.7)"}
                          style={{ transition: "all 0.3s" }}
                        />
                      )}
                      <text
                        x={c.x + 14}
                        y={c.y + 4}
                        fontSize="11"
                        fontFamily="var(--font-display)"
                        fill={isUs ? "#E9C77B" : isActive ? "#FFFFFF" : "rgba(255,255,255,0.85)"}
                        fontWeight={isUs ? "500" : "400"}
                        style={{ transition: "all 0.3s" }}
                      >
                        {c.name}
                      </text>
                      {isUs ? (
                        <text
                          x={c.x + 14}
                          y={c.y + 18}
                          fontSize="8"
                          fontFamily="var(--font-sans)"
                          letterSpacing="0.32em"
                          fill="rgba(233, 199, 123, 0.65)"
                          style={{ textTransform: "uppercase" }}
                        >
                          Prince Bazaar
                        </text>
                      ) : null}
                    </g>
                  );
                })}

                {/* Connection line from Khartoum to Kassala */}
                <line
                  x1="658"
                  y1="345"
                  x2="900"
                  y2="353"
                  stroke="rgba(233, 199, 123, 0.45)"
                  strokeWidth="0.8"
                  strokeDasharray="3 4"
                />

                {/* Compass */}
                <g transform="translate(940, 660)">
                  <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
                  <path d="M 0 -16 L 4 0 L 0 16 L -4 0 Z" fill="rgba(233, 199, 123, 0.85)" />
                  <text
                    x="0"
                    y="-26"
                    textAnchor="middle"
                    fontSize="9"
                    fill="rgba(255,255,255,0.65)"
                    fontFamily="var(--font-sans)"
                    letterSpacing="0.32em"
                  >
                    N
                  </text>
                </g>

                {/* Country label */}
                <text
                  x="500"
                  y="380"
                  textAnchor="middle"
                  fontSize="14"
                  fontFamily="var(--font-display)"
                  fontStyle="italic"
                  fill="rgba(255, 255, 255, 0.25)"
                  letterSpacing="0.2em"
                  style={{ textTransform: "uppercase" }}
                >
                  Republic of Sudan
                </text>
              </svg>

              {/* Active city detail */}
              <div
                className="absolute bottom-0 left-0 right-0 mx-auto max-w-md p-6"
                style={{
                  background: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(233, 199, 123, 0.2)",
                  borderRadius: "2px",
                }}
              >
                <div className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "#E9C77B" }}>
                  {node.note}
                </div>
                <div className="mt-2 font-display" style={{ color: "#FFFFFF", fontSize: "26px", fontWeight: 400 }}>
                  {node.name}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
