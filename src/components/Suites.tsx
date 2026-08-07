"use client";

import { Reveal } from "./Reveal";
import { Photo } from "./Photo";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { useI18n } from "@/lib/i18n";

type L = { en: string; ar: string };
interface Suite {
  name: L;
  capacity: L;
  view: L;
  image: string;
  /** Focal point for the tall arch crop — defaults to centre. */
  focus?: string;
  detail: L;
}

const SUITES: Suite[] = [
  {
    name: { en: "Single Suite", ar: "جناح فردي" },
    capacity: { en: "1 bed · 1 guest · 10 rooms", ar: "سرير واحد · ضيف واحد · ١٠ غرف" },
    view: { en: "Refrigerator, seating & amenities", ar: "ثلاجة وجلسة ومستلزمات" },
    image: "/hotel/room-single-desk.webp",
    detail: {
      en: "A comfortable single-bed suite. Inclusive of refrigerator, seating, towel and bathroom amenities, with twenty-four-hour reception.",
      ar: "جناح مريح بسرير فردي. يشمل ثلاجة وجلسة ومناشف ومستلزمات الحمّام، مع استقبال على مدار أربع وعشرين ساعة.",
    },
  },
  {
    name: { en: "Double Room", ar: "غرفة مزدوجة" },
    capacity: { en: "1 double bed · 2 guests · 13 rooms", ar: "سرير مزدوج · ضيفان · ١٣ غرفة" },
    view: { en: "Refrigerator, seating & amenities", ar: "ثلاجة وجلسة ومستلزمات" },
    // The room-double frame is a cramped letterbox dominated by a dark
    // wardrobe — the weakest room shot in the set. This one is warmer and
    // shows the seating area the copy promises.
    image: "/hotel/room-lounge.webp",
    detail: {
      en: "A double room with one bed. Inclusive of refrigerator, seating, towel and bathroom amenities, with twenty-four-hour reception.",
      ar: "غرفة مزدوجة بسرير واحد. تشمل ثلاجة وجلسة ومناشف ومستلزمات الحمّام، مع استقبال على مدار أربع وعشرين ساعة.",
    },
  },
  {
    name: { en: "Twin Suite", ar: "جناح بسريرين" },
    capacity: { en: "2 beds · 2 guests · 22 rooms", ar: "سريران · ضيفان · ٢٢ غرفة" },
    view: { en: "Refrigerator, seating & amenities", ar: "ثلاجة وجلسة ومستلزمات" },
    image: "/hotel/room-twin-warm.webp",
    detail: {
      en: "A twin suite with two separate beds. Inclusive of refrigerator, seating, towel and bathroom amenities, with twenty-four-hour reception.",
      ar: "جناح بسريرين منفصلين. يشمل ثلاجة وجلسة ومناشف ومستلزمات الحمّام، مع استقبال على مدار أربع وعشرين ساعة.",
    },
  },
  {
    name: { en: "Three Bed Suite", ar: "جناح بثلاثة أسرّة" },
    capacity: { en: "3 beds · up to 6 · 4 rooms", ar: "ثلاثة أسرّة · حتى ٦ ضيوف · ٤ غرف" },
    view: { en: "Refrigerator, seating & amenities", ar: "ثلاجة وجلسة ومستلزمات" },
    image: "/hotel/room-triple.webp",
    detail: {
      en: "A spacious three-bed suite for families and groups. Inclusive of refrigerator, seating, towel and bathroom amenities, with twenty-four-hour reception.",
      ar: "جناح واسع بثلاثة أسرّة للعائلات والمجموعات. يشمل ثلاجة وجلسة ومناشف ومستلزمات الحمّام، مع استقبال على مدار أربع وعشرين ساعة.",
    },
  },
];

/**
 * Slowly rotating gold seal.
 *
 * Sits clear of the plate rather than on it: on the old portrait arch the
 * overlap read as a wax seal on a tall frame, but on a landscape plate the same
 * offset covered live image area and looked applied.
 */
function SealMark({ id }: { id: string }) {
  return (
    <div
      className="absolute -bottom-9 z-10 flex h-[76px] w-[76px] items-center justify-center rounded-full ltr:right-5 rtl:left-5"
      style={{
        background: "var(--color-ivory)",
        boxShadow: "var(--shadow-card)",
        border: "1px solid var(--color-line)",
      }}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="spin-slow h-full w-full" style={{ color: "var(--color-gold)" }}>
        <defs>
          <path id={id} d="M50,50 m-33,0 a33,33 0 1,1 66,0 a33,33 0 1,1 -66,0" fill="none" />
        </defs>
        <text fill="currentColor" fontSize="9.5" letterSpacing="2.2" style={{ textTransform: "uppercase", fontWeight: 500 }}>
          <textPath href={`#${id}`} startOffset="0">
            Prince Plaza · Kassala · Sudan ·
          </textPath>
        </text>
      </svg>
      <span className="absolute font-display text-[22px]" style={{ color: "var(--color-emerald-deep)" }}>
        ✦
      </span>
    </div>
  );
}

export function Suites() {
  const { language, t } = useI18n();
  const isAr = language === "ar";

  return (
    <section id="suites" className="px-6 lg:px-12 band-open" dir={isAr ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-20 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "var(--color-mist)" }}
              >
                {t("The Stay", "الإقامة")}
              </span>
            </div>
            <h2
              className={`mt-8 max-w-2xl t-chapter ${isAr ? "font-arabic" : "font-display"}`}
              style={{
                color: "var(--color-charcoal)",
                lineHeight: 1.02,
                fontWeight: 400,
              }}
            >
              {isAr ? (
                <>
                  ملاذات <em className="not-italic" style={{ color: "var(--color-emerald-deep)" }}>تطلّ على القمم</em>.
                </>
              ) : (
                <>
                  Sanctuaries with a <em style={{ color: "var(--color-emerald-deep)" }}>view of the spires</em>.
                </>
              )}
            </h2>
          </div>
          <p className={`max-w-md text-[16px] leading-[1.8] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-stone)" }}>
            {t(
              "Every room includes a refrigerator, seating, towels and bathroom amenities, with reception staffed around the clock. Tell us your dates and we'll match you to the right one.",
              "كل غرفة تشمل ثلاجة وجلسة ومناشف ومستلزمات الحمّام، مع استقبال على مدار الساعة. أخبرنا بتواريخك وسنرشدك إلى الأنسب لك.",
            )}
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-[920px] grid-cols-1 gap-x-16 gap-y-24 sm:grid-cols-2">
          {SUITES.map((s, i) => (
            <Reveal key={s.name.en} delay={i * 120}>
              <article className="group flex flex-col items-center text-center">
                <div className="photo-arch relative w-full max-w-[440px]" data-cursor="image">
                  <div className="photo-arch-inner photo-warm photo-grain aspect-plate">
                    <Photo
                      src={s.image}
                      alt={s.name.en}
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 44vw, 420px"
                      position={s.focus ?? "center"}
                      className="transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                    />
                  </div>
                  <SealMark id={`seal-${i}`} />
                </div>

                {/* Name, capacity, rate enquiry. The per-room eyebrow and
                    paragraph were dropped: every one of the four repeated the
                    same "inclusive of refrigerator, seating, towel and bathroom
                    amenities, with twenty-four-hour reception" sentence, so the
                    section said the same thing four times and ran to three and a
                    half screens on a phone. The shared inclusions are now stated
                    once, above. */}
                <div className="mt-10 flex flex-col items-center">
                  <h3 className={`text-[28px] leading-tight ${isAr ? "font-arabic" : "font-display"}`} style={{ color: "var(--color-charcoal)" }}>
                    {s.name[language]}
                  </h3>
                  <div className={`mt-1.5 text-[13px] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-mist)" }}>
                    {s.capacity[language]}
                  </div>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-7 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em] ${isAr ? "font-arabic" : ""}`}
                    style={{ color: "var(--color-emerald-deep)" }}
                  >
                    {t("Inquire rates", "استفسر عن الأسعار")}
                    <span aria-hidden>{isAr ? "←" : "→"}</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
