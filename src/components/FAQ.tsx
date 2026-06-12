"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/i18n";

type L = { en: string; ar: string };

interface QA {
  q: L;
  a: L;
}

const SECTIONS: { title: L; items: QA[] }[] = [
  {
    title: { en: "Arrival & Travel", ar: "الوصول والسفر" },
    items: [
      {
        q: { en: "How do I get to Kassala?", ar: "كيف أصل إلى كسلا؟" },
        a: {
          en: "Most international guests fly into Khartoum International (KRT). From there, we arrange a private 5-hour overland transfer (≈480 km) or a 90-minute charter flight. Both can be booked through our concierge. Direct overland transfer is included in our airport-transfer add-on.",
          ar: "يصل معظم الضيوف الدوليين عبر مطار الخرطوم الدولي (KRT). ومن هناك، نرتّب نقلًا برّيًا خاصًا يستغرق نحو ٥ ساعات (≈٤٨٠ كم) أو رحلة طيران خاصة مدتها ٩٠ دقيقة. يمكن حجز كليهما عبر الكونسيرج. والنقل البرّي المباشر مشمول ضمن خدمة النقل من المطار.",
        },
      },
      {
        q: { en: "Do I need a visa to enter Sudan?", ar: "هل أحتاج تأشيرة لدخول السودان؟" },
        a: {
          en: "Most nationalities require a visa, generally arranged at the nearest Sudanese embassy in advance. Some passports qualify for a visa-on-arrival service through our partners. Share your nationality with our concierge and we'll provide a tailored advisory and an invitation letter where required.",
          ar: "تحتاج معظم الجنسيات إلى تأشيرة، تُرتَّب عادةً مسبقًا في أقرب سفارة سودانية. وتتأهل بعض الجوازات لخدمة التأشيرة عند الوصول عبر شركائنا. شارك جنسيتك مع الكونسيرج وسنقدّم لك إرشادًا مخصّصًا وخطاب دعوة عند الحاجة.",
        },
      },
      {
        q: { en: "What's the best time to visit?", ar: "ما أفضل وقت للزيارة؟" },
        a: {
          en: "October through March is the temperate season — daytime highs of 28–32°C, cool evenings, clear skies. April through September is hotter and we recommend a refreshed wardrobe. The Taka Mountains are spectacular year-round.",
          ar: "من أكتوبر حتى مارس هو الموسم المعتدل — درجات حرارة نهارية بين ٢٨ و٣٢ مئوية، أمسيات لطيفة، وسماء صافية. ومن أبريل حتى سبتمبر يكون الجو أكثر حرارة وننصح بملابس أخفّ. وتبقى جبال التاكا ساحرة على مدار العام.",
        },
      },
    ],
  },
  {
    title: { en: "At the Property", ar: "في المنشأة" },
    items: [
      {
        q: { en: "What languages are spoken at the hotel?", ar: "ما اللغات المتحدَّث بها في الفندق؟" },
        a: {
          en: "Arabic and English are spoken by all front-of-house staff. French, German, and Russian speakers are available on request. The concierge will pair you with a multilingual host on arrival if you wish.",
          ar: "يتحدّث جميع موظفي الاستقبال العربية والإنجليزية. ويتوفّر متحدّثون بالفرنسية والألمانية والروسية عند الطلب. وسيخصّص لك الكونسيرج مضيفًا متعدّد اللغات عند الوصول إن رغبت.",
        },
      },
      {
        q: { en: "What is the dress code?", ar: "ما قواعد اللباس؟" },
        a: {
          en: "Smart-casual throughout the day. Some restaurants and the rooftop request smart-elegant for dinner — collared shirts, dresses, no athletic wear. Out in Kassala, modest dress (covering shoulders and knees) is appreciated, especially in the bazaar and cultural quarter.",
          ar: "لباس أنيق-عملي طوال النهار. وتطلب بعض المطاعم والسطح لباسًا أنيقًا للعشاء — قمصان بياقة وفساتين، دون ملابس رياضية. وفي كسلا، يُستحسن اللباس المحتشم (يغطّي الكتفين والركبتين)، خاصةً في السوق والحيّ الثقافي.",
        },
      },
      {
        q: { en: "Do you accept credit cards?", ar: "هل تقبلون بطاقات الائتمان؟" },
        a: {
          en: "We accept all major international cards (Visa, Mastercard, American Express). USD, EUR, GBP, and AED are accepted in cash. Sudanese pounds are available at the property's exchange desk at competitive rates.",
          ar: "نقبل جميع البطاقات الدولية الرئيسية (فيزا، ماستركارد، أمريكان إكسبريس). ونقبل الدولار واليورو والجنيه الإسترليني والدرهم نقدًا. ويتوفّر الجنيه السوداني في مكتب الصرافة بالمنشأة بأسعار تنافسية.",
        },
      },
    ],
  },
  {
    title: { en: "Family & Accessibility", ar: "العائلة وسهولة الوصول" },
    items: [
      {
        q: { en: "Is the property family-friendly?", ar: "هل المكان مناسب للعائلات؟" },
        a: {
          en: "Yes. Our Three Bed Suite accommodates families and small groups. We offer in-room cribs, child-safe amenities, kid-curated menus at the restaurant, and a small daytime children's program.",
          ar: "نعم. يتّسع جناحنا بثلاثة أسرّة للعائلات والمجموعات الصغيرة. ونوفّر أسرّة أطفال في الغرف، ومستلزمات آمنة للأطفال، وقوائم طعام مخصّصة لهم في المطعم، وبرنامجًا نهاريًا صغيرًا للأطفال.",
        },
      },
      {
        q: { en: "Is the property wheelchair accessible?", ar: "هل المكان مهيّأ للكراسي المتحركة؟" },
        a: {
          en: "All public spaces and a designated set of suites are step-free with widened doorways and accessible bathrooms. Please flag any specific needs during booking and we'll prepare ahead of arrival.",
          ar: "جميع المساحات العامة ومجموعة مخصّصة من الأجنحة خالية من الدرجات، بأبواب موسّعة وحمّامات مهيّأة. يُرجى ذكر أي احتياجات خاصة عند الحجز وسنجهّزها قبل وصولك.",
        },
      },
    ],
  },
];

export function FAQ() {
  const { language, t } = useI18n();
  const isAr = language === "ar";
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="px-6 py-32 lg:px-12 lg:py-44" style={{ background: "var(--color-bone-soft)" }} dir={isAr ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-20 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
            <span
              className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "var(--color-mist)" }}
            >
              {t("Before You Arrive", "قبل وصولك")}
            </span>
          </div>
          <h2
            className={`mt-8 tracking-[-0.015em] ${isAr ? "font-arabic" : "font-display"}`}
            style={{
              color: "var(--color-charcoal)",
              fontSize: "clamp(40px, 5.5vw, 76px)",
              lineHeight: 1.02,
              fontWeight: 400,
            }}
          >
            {isAr ? (
              <>
                التفاصيل <em className="not-italic" style={{ color: "var(--color-royal-deep)" }}>الهادئة</em>، مسبقًا.
              </>
            ) : (
              <>
                The <em style={{ color: "var(--color-royal-deep)" }}>quiet</em> details, in advance.
              </>
            )}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-3">
            <ul className="space-y-3 text-[12px] font-medium uppercase tracking-[0.22em]">
              {SECTIONS.map((s, i) => (
                <li key={s.title.en} className={`flex items-baseline gap-3 ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-stone)" }}>
                  <span className="font-display tabular-nums" style={{ color: "var(--color-gold)", fontSize: "11px" }}>
                    {isAr ? `٠${"١٢٣٤٥"[i]}` : `0${i + 1}`}
                  </span>
                  {s.title[language]}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-9">
            {SECTIONS.map((s) => (
              <div key={s.title.en} className="mb-10">
                <h3
                  className={`mb-4 ${isAr ? "font-arabic" : "font-display"}`}
                  style={{ color: "var(--color-charcoal)", fontSize: "24px", fontWeight: 400 }}
                >
                  {s.title[language]}
                </h3>
                <div className="border-t" style={{ borderColor: "var(--color-line)" }}>
                  {s.items.map((item) => {
                    const id = `${s.title.en}-${item.q.en}`;
                    const isOpen = open === id;
                    return (
                      <div key={id} className="border-b" style={{ borderColor: "var(--color-line)" }}>
                        <button
                          onClick={() => setOpen(isOpen ? null : id)}
                          className={`flex w-full items-center justify-between gap-4 py-5 ${isAr ? "text-right" : "text-left"}`}
                          aria-expanded={isOpen}
                        >
                          <span
                            className={isAr ? "font-arabic" : "font-display"}
                            style={{
                              color: "var(--color-charcoal)",
                              fontSize: "18px",
                              fontWeight: 400,
                              fontStyle: isOpen && !isAr ? "italic" : "normal",
                            }}
                          >
                            {item.q[language]}
                          </span>
                          <span
                            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-transform"
                            style={{
                              background: isOpen ? "var(--color-royal-deep)" : "transparent",
                              border: isOpen ? "none" : "1px solid var(--color-line)",
                              color: isOpen ? "var(--color-gold-pale)" : "var(--color-charcoal)",
                              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                            }}
                          >
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <path d="M12 5 L12 19 M5 12 L19 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                          </span>
                        </button>
                        <div
                          className="overflow-hidden transition-all"
                          style={{
                            maxHeight: isOpen ? "400px" : "0",
                            opacity: isOpen ? 1 : 0,
                          }}
                        >
                          <p
                            className={`pb-6 text-[14px] leading-[1.85] ${isAr ? "font-arabic pl-12" : "pr-12"}`}
                            style={{ color: "var(--color-stone)" }}
                          >
                            {item.a[language]}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
