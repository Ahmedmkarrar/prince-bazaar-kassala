"use client";

import { useEffect, useState } from "react";

interface Turn {
  role: "user" | "assistant";
  text: string;
  tool?: string;
}

const SCRIPT: Turn[] = [
  {
    role: "user",
    text: "We're a family of four arriving from London, 14–18 December. We'd love a sunrise tour and a quiet dinner.",
  },
  {
    role: "assistant",
    text: "A pleasure — let me put together something quietly extraordinary for those December dates.",
    tool: "recommend_experience",
  },
  {
    role: "assistant",
    text: "I can offer a Presidential Suite with a connecting Royal Suite — both with mountain views. For your sunrise, our 4×4 leaves at 05:30 with cardamom coffee and a Beja guide. Dinner at the rooftop, a quiet table near the corner. Shall I hold these dates?",
  },
  {
    role: "user",
    text: "Yes please. Anything special for our daughter's birthday on the 16th?",
  },
  {
    role: "assistant",
    text: "Of course. A private cake from our pastry chef, a candle-lit corner of the courtyard, and an oud player at sunset. I've prepared your brief — tap through to WhatsApp and our front office will confirm every detail.",
    tool: "whatsapp_handoff",
  },
];

export function ConciergeDemo() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState<string[]>([""]);

  useEffect(() => {
    const current = SCRIPT[step];
    if (!current) return;

    let i = 0;
    const speed = current.role === "user" ? 30 : 18;
    const text = current.text;

    setTyped((prev) => {
      const out = [...prev];
      out[step] = "";
      return out;
    });

    const id = setInterval(() => {
      i++;
      setTyped((prev) => {
        const out = [...prev];
        out[step] = text.slice(0, i);
        return out;
      });
      if (i >= text.length) {
        clearInterval(id);
        setTimeout(() => {
          if (step < SCRIPT.length - 1) {
            setStep((s) => s + 1);
            setTyped((prev) => [...prev, ""]);
          } else {
            // restart after a pause
            setTimeout(() => {
              setStep(0);
              setTyped([""]);
            }, 4000);
          }
        }, current.role === "user" ? 600 : 1400);
      }
    }, speed);

    return () => clearInterval(id);
  }, [step]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-sm"
      style={{
        background: "rgba(255, 252, 245, 0.04)",
        border: "1px solid rgba(233, 199, 123, 0.18)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="flex items-center justify-between border-b px-5 py-4"
        style={{ borderColor: "rgba(233, 199, 123, 0.18)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: "#E9C77B", color: "#1A0E2E" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 3 L21 12 L12 21 L3 12 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
          </span>
          <div>
            <div
              className="text-[9px] font-medium uppercase tracking-[0.32em]"
              style={{ color: "rgba(233, 199, 123, 0.65)" }}
            >
              A Sample Conversation
            </div>
            <div
              className="text-[14px]"
              style={{ color: "#FFFFFF", fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Taka AI · Live preview
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.5)" }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#5FCB8B" }} />
          Replay
        </div>
      </div>

      <div className="space-y-4 px-5 py-6" style={{ minHeight: "440px" }}>
        {typed.map((text, i) => {
          const turn = SCRIPT[i];
          if (!turn) return null;
          const isUser = turn.role === "user";
          const showCursor = i === step && text.length < turn.text.length;
          return (
            <div key={i} className="space-y-2">
              <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-[1.55]"
                  style={
                    isUser
                      ? {
                          background: "rgba(233, 199, 123, 0.92)",
                          color: "#1A0E2E",
                          borderBottomRightRadius: "4px",
                        }
                      : {
                          background: "rgba(255,255,255,0.04)",
                          color: "#FFFFFF",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderBottomLeftRadius: "4px",
                        }
                  }
                >
                  {text}
                  {showCursor ? (
                    <span
                      className="ml-0.5 inline-block h-3 w-px align-middle"
                      style={{
                        background: isUser ? "#1A0E2E" : "#FFFFFF",
                        animation: "blink 0.8s infinite",
                      }}
                    />
                  ) : null}
                </div>
              </div>
              {turn.tool && text.length === turn.text.length ? (
                <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <span
                    className="text-[10px] font-medium uppercase tracking-[0.28em]"
                    style={{ color: "rgba(233, 199, 123, 0.7)" }}
                  >
                    ◇{" "}
                    {turn.tool === "recommend_experience"
                      ? "Curated · sunrise tour + dinner"
                      : turn.tool === "whatsapp_handoff"
                      ? "Handed to our team · WhatsApp"
                      : "Tool used"}
                  </span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
