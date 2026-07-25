"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

type L = { en: string; ar: string };

interface Turn {
  role: "user" | "assistant";
  text: L;
  tool?: string;
}

const SCRIPT: Turn[] = [
  {
    role: "user",
    text: {
      en: "We're a family of four arriving from London, 14–18 December. We'd love a sunrise tour and a quiet dinner.",
      ar: "نحن عائلة من أربعة أفراد، نصل من لندن من ١٤ إلى ١٨ ديسمبر. نودّ جولة عند الشروق وعشاءً هادئًا.",
    },
  },
  {
    role: "assistant",
    text: {
      en: "A pleasure — let me put together something quietly extraordinary for those December dates.",
      ar: "بكل سرور — دعني أرتّب لكم شيئًا استثنائيًا بهدوء في تواريخ ديسمبر تلك.",
    },
    tool: "recommend_experience",
  },
  {
    role: "assistant",
    text: {
      en: "I can offer a Three Bed Suite with mountain views — perfect for a family of four. For your sunrise, our 4×4 leaves at 05:30 with cardamom coffee and a Beja guide. Dinner at the Culinary Hub, a quiet table near the corner. Shall I hold these dates?",
      ar: "أقترح جناحًا بثلاثة أسرّة بإطلالة على الجبال — مثالي لعائلة من أربعة. ولشروقكم، تنطلق سيارتنا الرباعية في ٠٥:٣٠ مع قهوة بالهيل ومرشد من البجا. والعشاء على السطح، طاولة هادئة في الزاوية. هل أحجز هذه التواريخ؟",
    },
  },
  {
    role: "user",
    text: {
      en: "Yes please. Anything special for our daughter's birthday on the 16th?",
      ar: "نعم من فضلك. هل من شيء مميّز لعيد ميلاد ابنتنا في السادس عشر؟",
    },
  },
  {
    role: "assistant",
    text: {
      en: "Of course. A private cake from our pastry chef, a candle-lit corner of the courtyard, and an oud player at sunset. I've prepared your brief — tap through to WhatsApp and our front office will confirm every detail.",
      ar: "بالطبع. كعكة خاصة من طاهي الحلويات لدينا، وركن مضاء بالشموع في الفناء، وعازف عود عند الغروب. لقد جهّزت طلبكم — انتقلوا عبر واتساب وسيؤكّد مكتب الاستقبال كل التفاصيل.",
    },
    tool: "whatsapp_handoff",
  },
];

export function ConciergeDemo() {
  const { language, t } = useI18n();
  const isAr = language === "ar";
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState<string[]>([""]);
  const [renderedLanguage, setRenderedLanguage] = useState(language);

  // Restart the demo whenever the language switches. Adjusting state during
  // render is React's documented way to reset on a changed value — doing it in
  // an effect would render one frame of the stale language first.
  if (renderedLanguage !== language) {
    setRenderedLanguage(language);
    setStep(0);
    setTyped([""]);
  }

  useEffect(() => {
    const current = SCRIPT[step];
    if (!current) return;

    let i = 0;
    const speed = current.role === "user" ? 30 : 18;
    const text = current.text[language];

    // Tracked so an unmount (or a language switch) cannot leave an advance /
    // restart timer running and stack duplicate demo loops on top of each other.
    const timers: number[] = [];

    const id = setInterval(() => {
      i++;
      setTyped((prev) => {
        const out = [...prev];
        out[step] = text.slice(0, i);
        return out;
      });
      if (i < text.length) return;

      clearInterval(id);
      timers.push(
        window.setTimeout(() => {
          if (step < SCRIPT.length - 1) {
            setStep((s) => s + 1);
            setTyped((prev) => [...prev, ""]);
            return;
          }
          // Loop back to the start after a pause.
          timers.push(
            window.setTimeout(() => {
              setStep(0);
              setTyped([""]);
            }, 4000),
          );
        }, current.role === "user" ? 600 : 1400),
      );
    }, speed);

    return () => {
      clearInterval(id);
      timers.forEach(clearTimeout);
    };
  }, [step, language]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-sm"
      style={{
        background: "rgba(255, 252, 245, 0.04)",
        border: "1px solid rgba(233, 199, 123, 0.18)",
        backdropFilter: "blur(8px)",
      }}
      dir={isAr ? "rtl" : "ltr"}
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
              className={`text-[9px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "rgba(233, 199, 123, 0.65)" }}
            >
              {t("A Sample Conversation", "محادثة نموذجية")}
            </div>
            <div
              className={`text-[14px] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "#FFFFFF", fontFamily: isAr ? undefined : "var(--font-display)", fontWeight: 400 }}
            >
              {t("Taka AI · Live preview", "تاكا AI · معاينة مباشرة")}
            </div>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.28em] ${isAr ? "font-arabic" : ""}`} style={{ color: "rgba(255,255,255,0.5)" }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#5FCB8B" }} />
          {t("Replay", "إعادة")}
        </div>
      </div>

      <div className="space-y-4 px-5 py-6" style={{ minHeight: "440px" }}>
        {typed.map((text, i) => {
          const turn = SCRIPT[i];
          if (!turn) return null;
          const isUser = turn.role === "user";
          const full = turn.text[language];
          const showCursor = i === step && text.length < full.length;
          return (
            <div key={i} className="space-y-2">
              <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-[1.55] ${isAr ? "font-arabic" : ""}`}
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
              {turn.tool && text.length === full.length ? (
                <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <span
                    className={`text-[10px] font-medium uppercase tracking-[0.28em] ${isAr ? "font-arabic" : ""}`}
                    style={{ color: "rgba(233, 199, 123, 0.7)" }}
                  >
                    ◇{" "}
                    {turn.tool === "recommend_experience"
                      ? t("Curated · sunrise tour + dinner", "منسّق · جولة شروق + عشاء")
                      : turn.tool === "whatsapp_handoff"
                      ? t("Handed to our team · WhatsApp", "أُحيل إلى فريقنا · واتساب")
                      : t("Tool used", "أداة مُستخدَمة")}
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
