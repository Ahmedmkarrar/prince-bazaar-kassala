"use client";

import { ConciergeDemo } from "./ConciergeDemo";
import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/i18n";

type L = { en: string; ar: string };

const FEATURES: { title: L; body: L }[] = [
  {
    title: { en: "Real-time answers", ar: "إجابات فورية" },
    body: { en: "Suites, event capacity, dining hours, the mountains.", ar: "الأجنحة، سعة المناسبات، أوقات الطعام، والجبال." },
  },
  {
    title: { en: "Seamless handover", ar: "تحويل سلس" },
    body: { en: "Your request, pre-filled into a WhatsApp chat with our team.", ar: "طلبك، مُعبّأ مسبقًا في محادثة واتساب مع فريقنا." },
  },
  {
    title: { en: "Tour curation", ar: "تنسيق الجولات" },
    body: { en: "Mountain expeditions, cultural walks, bazaar afternoons — tailored.", ar: "رحلات جبلية، جولات ثقافية، جولات في السوق — مصمّمة لك." },
  },
  {
    title: { en: "Multilingual hospitality", ar: "ضيافة متعددة اللغات" },
    body: { en: "Reply in Arabic, English, or your preferred language.", ar: "يردّ بالعربية أو الإنجليزية أو لغتك المفضّلة." },
  },
];

export function AISection() {
  const { language, t } = useI18n();
  const isAr = language === "ar";

  return (
    <section
      id="concierge"
      className="relative overflow-hidden px-6 py-32 lg:px-12 lg:py-44"
      style={{
        background:
          "linear-gradient(160deg, #1A0E2E 0%, #3B1660 50%, #1A0E2E 100%)",
      }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "rgba(233, 199, 123, 0.7)" }} />
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "rgba(233, 199, 123, 0.85)" }}
              >
                {t("The AI Concierge", "الكونسيرج الذكي")}
              </span>
            </div>
            <h2
              className={`mt-8 tracking-[-0.01em] ${isAr ? "font-arabic" : "font-display"}`}
              style={{
                color: "#FFFFFF",
                lineHeight: 1.02,
                fontSize: "clamp(40px, 5.5vw, 76px)",
                fontWeight: 400,
              }}
            >
              {isAr ? (
                <>
                  تعرّف على <em className="not-italic" style={{ color: "#E9C77B", fontWeight: 300 }}>تاكا AI</em>.
                  <br />
                  في الخدمة، كل ساعة.
                </>
              ) : (
                <>
                  Meet <em style={{ color: "#E9C77B", fontWeight: 300 }}>Taka AI</em>.
                  <br />
                  On duty, every hour.
                </>
              )}
            </h2>
            <p
              className={`mt-8 max-w-md text-[16px] leading-[1.8] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "rgba(255, 255, 255, 0.72)" }}
            >
              {t(
                "Fluent in Arabic and English, Taka AI answers your questions, plans your tour, shapes your wedding brief, then hands you straight to our front office on WhatsApp to confirm everything.",
                "بطلاقة في العربية والإنجليزية، يجيب تاكا AI عن أسئلتك، ويخطّط لجولتك، ويصوغ تفاصيل حفل زفافك، ثم يحوّلك مباشرةً إلى مكتب الاستقبال عبر واتساب لتأكيد كل شيء.",
              )}
            </p>

            <div className="mt-10 space-y-6">
              {FEATURES.map((f) => (
                <div
                  key={f.title.en}
                  className={`pl-5 ${isAr ? "border-r pr-5 pl-0" : "border-l"}`}
                  style={{ borderColor: "rgba(233, 199, 123, 0.4)" }}
                >
                  <div
                    className={`text-[19px] ${isAr ? "font-arabic" : "font-display"}`}
                    style={{ color: "#FFFFFF", fontWeight: 400 }}
                  >
                    {f.title[language]}
                  </div>
                  <div
                    className={`mt-1 text-[13px] leading-[1.7] ${isAr ? "font-arabic" : ""}`}
                    style={{ color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    {f.body[language]}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#concierge-live"
                className={`inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-all ${isAr ? "font-arabic" : ""}`}
                style={{ background: "#E9C77B", color: "#1A0E2E" }}
              >
                {t("Open Taka AI", "افتح تاكا AI")}
                <span aria-hidden>{isAr ? "←" : "→"}</span>
              </a>
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.28em] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {t("Instant · Multilingual · Always private", "فوري · متعدد اللغات · خصوصية دائمة")}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-span-7">
          <ConciergeDemo />
        </Reveal>
      </div>
    </section>
  );
}
