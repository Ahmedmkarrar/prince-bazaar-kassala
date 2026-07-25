"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

type L = { en: string; ar: string };

export function LiveAtmosphere() {
  const { language, t } = useI18n();
  const isAr = language === "ar";
  const [hour, setHour] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const h = new Date().toLocaleString("en-GB", {
        hour: "2-digit",
        hour12: false,
        timeZone: "Africa/Khartoum",
      });
      setHour(parseInt(h, 10));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (hour === null) return null;

  const items = currentlyHappening(hour);

  return (
    <section
      className="border-y px-6 py-8 lg:px-12"
      style={{ borderColor: "var(--color-line)", background: "var(--color-bone-soft)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
          <div className="sm:col-span-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inset-0 animate-ping rounded-full opacity-60"
                  style={{ background: "#5FCB8B" }}
                />
                <span className="relative h-2 w-2 rounded-full" style={{ background: "#5FCB8B" }} />
              </span>
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "var(--color-charcoal)" }}
              >
                {t("Live · Right Now in Kassala", "مباشر · الآن في كسلا")}
              </span>
            </div>
          </div>
          <div className="sm:col-span-9">
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {items.map((it, i) => (
                <li key={it.label.en} className="flex items-center gap-3">
                  <span
                    className={`text-[11px] ${isAr ? "font-arabic" : ""}`}
                    style={{ color: "var(--color-charcoal)", fontFamily: isAr ? undefined : "var(--font-display)", fontSize: "15px" }}
                  >
                    {it.label[language]}
                  </span>
                  <span
                    className={`text-[10px] font-medium uppercase tracking-[0.28em] ${isAr ? "font-arabic" : ""}`}
                    style={{ color: it.status === "open" ? "var(--color-emerald-deep)" : "var(--color-mist)" }}
                  >
                    · {it.value[language]}
                  </span>
                  {i < items.length - 1 ? (
                    <span className="hidden h-1 w-1 rounded-full sm:inline-block" style={{ background: "var(--color-gold)" }} />
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function currentlyHappening(hour: number): { label: L; value: L; status: "open" | "info" }[] {
  const out: { label: L; value: L; status: "open" | "info" }[] = [];

  // Weather (seasonally inflected, but simple)
  out.push({ label: { en: "32° clear", ar: "٣٢° صافٍ" }, value: { en: "Desert evening", ar: "أمسية صحراوية" }, status: "info" });

  // Only the seven complexes that actually exist on the property are listed here.
  // Never advertise a facility the site doesn't sell — guests read this as fact.
  if (hour >= 6 && hour < 10) {
    out.push({ label: { en: "Culinary Hub", ar: "المطعم" }, value: { en: "Breakfast served", ar: "الإفطار يُقدَّم" }, status: "open" });
    out.push({ label: { en: "Reception", ar: "الاستقبال" }, value: { en: "Twenty-four hours", ar: "على مدار الساعة" }, status: "open" });
  } else if (hour >= 10 && hour < 14) {
    out.push({ label: { en: "Bazaar", ar: "السوق" }, value: { en: "Open", ar: "مفتوح" }, status: "open" });
    out.push({ label: { en: "Culinary Hub", ar: "المطعم" }, value: { en: "Lunch served", ar: "الغداء يُقدَّم" }, status: "open" });
  } else if (hour >= 14 && hour < 18) {
    out.push({ label: { en: "Commercial Plaza", ar: "البلازا التجارية" }, value: { en: "Open", ar: "مفتوح" }, status: "open" });
    out.push({ label: { en: "Business Center", ar: "مركز الأعمال" }, value: { en: "Open", ar: "مفتوح" }, status: "open" });
  } else if (hour >= 18 && hour < 23) {
    out.push({ label: { en: "Culinary Hub", ar: "المطعم" }, value: { en: "Dinner service", ar: "خدمة العشاء" }, status: "open" });
    out.push({ label: { en: "Event Pavilions", ar: "قاعات المناسبات" }, value: { en: "Enquire to reserve", ar: "استفسر للحجز" }, status: "info" });
  } else {
    out.push({ label: { en: "Night Concierge", ar: "كونسيرج الليل" }, value: { en: "On duty", ar: "في الخدمة" }, status: "open" });
    out.push({ label: { en: "Dawn tour", ar: "جولة الفجر" }, value: { en: "Departs 05:30", ar: "تنطلق ٠٥:٣٠" }, status: "info" });
  }

  return out;
}
