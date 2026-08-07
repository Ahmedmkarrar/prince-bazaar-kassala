"use client";

import { Reveal } from "./Reveal";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { useI18n } from "@/lib/i18n";

type L = { en: string; ar: string };

interface ConferenceRoomCard {
  id: string;
  name: L;
  description: L;
  capacity: number;
  features: L[];
  image: string | null;
}

const ROOMS: ConferenceRoomCard[] = [
  {
    id: "events-pavilion",
    name: { en: "Events Pavilion", ar: "جناح المناسبات" },
    description: {
      en: "Our larger venue for weddings, conferences, and cultural celebrations — good for up to 100 guests, with a large screen and surround sound.",
      ar: "قاعتنا الأكبر للأعراس والمؤتمرات والاحتفالات الثقافية — تتّسع حتى ١٠٠ ضيف، بشاشة عرض كبيرة ونظام صوت محيطي.",
    },
    capacity: 100,
    features: [
      { en: "Good for up to 100 guests", ar: "تتّسع حتى ١٠٠ ضيف" },
      { en: "Large projection screen", ar: "شاشة عرض كبيرة" },
      { en: "Surround sound system", ar: "نظام صوت محيطي" },
      { en: "Wi-Fi throughout", ar: "إنترنت لاسلكي في كل مكان" },
    ],
    // The 100-guest venue gets the wide hall shot; the old events-hall frame was
    // a 620x500 crop (cropped to dodge a blurred microphone), upscaled to 720px
    // for the -sm variant. These two cards render ~680 CSS px wide, so they use
    // the full-size files — the -sm ones are visibly soft on a retina display.
    image: "/hotel/conference.webp",
  },
  {
    id: "conference-room",
    name: { en: "Conference Room", ar: "قاعة المؤتمرات" },
    description: {
      en: "A dedicated conference room for meetings, workshops, and corporate sessions — good for up to 60 guests, with Wi-Fi, a projector, and a full sound system.",
      ar: "قاعة مؤتمرات مخصّصة للاجتماعات وورش العمل والجلسات المؤسسية — تتّسع حتى ٦٠ ضيفًا، بإنترنت لاسلكي وجهاز عرض ونظام صوت متكامل.",
    },
    capacity: 60,
    features: [
      { en: "Good for up to 60 guests", ar: "تتّسع حتى ٦٠ ضيفًا" },
      { en: "Wi-Fi", ar: "إنترنت لاسلكي" },
      { en: "Projector", ar: "جهاز عرض" },
      { en: "Sound system", ar: "نظام صوت" },
    ],
    // Tighter angle on the same space, at a full 1280x720 source.
    image: "/hotel/conference-alt.webp",
  },
];

const CATERING_TIERS: { tier: L; note: L }[] = [
  { tier: { en: "Bronze", ar: "برونزية" }, note: { en: "Working lunch · plant-forward", ar: "غداء عمل · نباتي بالأساس" } },
  { tier: { en: "Silver", ar: "فضية" }, note: { en: "Three-course plated · regional flavours", ar: "ثلاثة أطباق · نكهات محلية" } },
  { tier: { en: "Gold", ar: "ذهبية" }, note: { en: "Five-course chef's menu · canapés on arrival", ar: "قائمة الشيف من خمسة أطباق · مقبّلات عند الوصول" } },
];

const arDigits = (n: number) => String(n).replace(/[0-9]/g, (d) => "٠١٢٣٤٥٦٧٨٩"[+d]);

export function Conference() {
  const { language, t } = useI18n();
  const isAr = language === "ar";

  return (
    <section
      id="conference"
      className="relative px-6 lg:px-12 band"
      style={{ background: "var(--color-bone-soft)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-20 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
            <span
              className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "var(--color-mist)" }}
            >
              {t("Conference & Boardroom", "المؤتمرات وقاعات الاجتماعات")}
            </span>
          </div>
          <h2
            className={`mt-8 t-chapter ${isAr ? "font-arabic" : "font-display"}`}
            style={{
              color: "var(--color-charcoal)",
              lineHeight: 1.02,
              fontWeight: 400,
            }}
          >
            {isAr ? (
              <>
                قاعتان،
                <br />
                <em className="not-italic" style={{ color: "var(--color-emerald-deep)" }}>بمعيارٍ واحد</em>.
              </>
            ) : (
              <>
                Two rooms, one
                <br />
                <em style={{ color: "var(--color-emerald-deep)" }}>standard</em>.
              </>
            )}
          </h2>
          <p className={`mt-8 text-[16px] leading-[1.8] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-stone)" }}>
            {t(
              "For diplomatic delegations, executive retreats, press briefings, and family councils. Both rooms are released to one party per session — no shared lobby, no overheard conversation.",
              "للوفود الدبلوماسية، وخلوات الإدارة، والمؤتمرات الصحفية، والمجالس العائلية. تُخصَّص كل قاعة لجهة واحدة في كل جلسة — دون ردهة مشتركة، ودون حديثٍ يُسمع.",
            )}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {ROOMS.map((r, i) => (
            <Reveal key={r.id} delay={i * 100}>
              <article className="flex h-full flex-col">
                <div
                  className="relative aspect-[4/3] overflow-hidden rounded-sm"
                  data-cursor="image"
                  style={{
                    background: r.image
                      ? `url(${r.image}) center/cover no-repeat`
                      : "linear-gradient(135deg, var(--color-royal-deep) 0%, #14101C 60%, var(--color-charcoal) 100%)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)" }}
                  />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className={`text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`} style={{ color: "rgba(233, 199, 123, 0.95)" }}>
                      {t("Conference", "قاعة")}
                    </div>
                    <div className={`mt-1 ${isAr ? "font-arabic" : "font-display"}`} style={{ color: "#FFFFFF", fontSize: "30px", lineHeight: 1.05, fontWeight: 400 }}>
                      {r.name[language]}
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex-1">
                  <p className={`text-[15px] leading-[1.8] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-stone)" }}>
                    {r.description[language]}
                  </p>

                  <div className="mt-7">
                    <div className={`text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-mist)" }}>
                      {t("Capacity", "السعة")}
                    </div>
                    <div className="mt-3 flex items-baseline gap-3">
                      <span className="font-display tabular-nums" style={{ color: "var(--color-emerald-deep)", fontSize: "44px", lineHeight: 1, fontWeight: 400 }}>
                        {isAr ? arDigits(r.capacity) : r.capacity}
                      </span>
                      <span className={`text-[12px] font-medium uppercase tracking-[0.22em] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-mist)" }}>
                        {t("guests", "ضيف")}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-7 space-y-2">
                    {r.features.map((f) => (
                      <li key={f.en} className={`flex items-start gap-3 text-[13px] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-charcoal)" }}>
                        <span className="mt-[7px] inline-block h-px w-3 flex-shrink-0" style={{ background: "var(--color-gold)" }} />
                        {f[language]}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 inline-flex items-center gap-2 self-start text-[11px] font-medium uppercase tracking-[0.22em] ${isAr ? "font-arabic" : ""}`}
                  style={{ color: "var(--color-emerald-deep)" }}
                >
                  <span className="h-px w-6" style={{ background: "var(--color-emerald-deep)" }} />
                  {t("Inquire", "استفسر")} — {r.name[language]}
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Catering tiers */}
        <Reveal delay={120}>
          <div className="mt-24 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-mist)" }}>
                {t("Catering Tiers", "باقات الضيافة")}
              </div>
              <h3
                className={`mt-3 ${isAr ? "font-arabic" : "font-display"}`}
                style={{ color: "var(--color-charcoal)", fontSize: "32px", lineHeight: 1.1, fontWeight: 400 }}
              >
                {t("Three menus, by the head.", "ثلاث قوائم، للفرد.")}
              </h3>
              <p className={`mt-4 text-[14px] leading-[1.85] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-stone)" }}>
                {t(
                  "Curated by Chef Husna. Each tier honours regional flavour and adapts to dietary needs — Halal, vegetarian, gluten-free.",
                  "من إعداد الشيف حسنى. تحترم كل باقة النكهة المحلية وتراعي الاحتياجات الغذائية — حلال، نباتي، وخالٍ من الغلوتين.",
                )}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-px sm:grid-cols-3 lg:col-span-8" style={{ background: "var(--color-line)" }}>
              {CATERING_TIERS.map((tier) => (
                <div key={tier.tier.en} className="px-6 py-7" style={{ background: "var(--color-ivory)" }}>
                  <div className={`text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-gold)" }}>
                    {tier.tier[language]}
                  </div>
                  <div
                    className={`mt-3 ${isAr ? "font-arabic" : "font-display"}`}
                    style={{ color: "var(--color-emerald-deep)", fontSize: "28px", lineHeight: 1, fontWeight: 400 }}
                  >
                    {t("On request", "عند الطلب")}
                  </div>
                  <div className={`mt-1 text-[10px] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-mist)" }}>
                    {t("per person", "للفرد")}
                  </div>
                  <div className={`mt-5 text-[13px] leading-[1.7] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-charcoal)" }}>
                    {tier.note[language]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
