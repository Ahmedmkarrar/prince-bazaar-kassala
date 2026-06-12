"use client";

import Image from "next/image";
import { Logo } from "./Logo";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  const { language } = useI18n();
  const isAr = language === "ar";

  return (
    <footer
      id="contact"
      className="relative px-6 py-20 lg:px-12 lg:py-28"
      style={{ background: "var(--color-charcoal)", color: "var(--color-gold-pale)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className={`mt-6 max-w-sm text-[14px] leading-[1.8] ${isAr ? "font-arabic" : ""}`} style={{ color: "rgba(239,224,191,0.65)" }}>
              {t(
                "A pioneering seven-complex destination at the foot of the Taka Mountains. A Shahad Group destination, redefining hospitality across Eastern Sudan.",
                "وجهة رائدة من سبعة مجمّعات عند سفح جبال التاكا. وجهة من مجموعة شهد، تعيد تعريف الضيافة في شرق السودان.",
              )}
            </p>
            <div className="mt-8 flex gap-3">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`btn-gold ${isAr ? "font-arabic" : ""}`}>
                {t("Chat on WhatsApp", "تواصل عبر واتساب")}
              </a>
              <a href="#concierge" className={`btn-ghost ${isAr ? "font-arabic" : ""}`} style={{ borderColor: "rgba(239,224,191,0.35)", color: "var(--color-gold-pale)" }}>
                {t("Ask AI", "اسأل تاكا AI")}
              </a>
            </div>
          </div>

          <FooterCol title={t("Discover", "اكتشف")} isAr={isAr}>
            <FooterLink href="#story" isAr={isAr}>{t("Our Story", "قصتنا")}</FooterLink>
            <FooterLink href="#complex" isAr={isAr}>{t("The Complex", "المجمّع")}</FooterLink>
            <FooterLink href="#tourism" isAr={isAr}>{t("Tourism", "السياحة")}</FooterLink>
            <FooterLink href={WHATSAPP_URL} isAr={isAr}>{t("Reservations", "الحجوزات")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("Stay", "الإقامة")} isAr={isAr}>
            <FooterLink href="#suites" isAr={isAr}>{t("Suites", "الأجنحة")}</FooterLink>
            <FooterLink href="#conference" isAr={isAr}>{t("Conference", "المؤتمرات")}</FooterLink>
            <FooterLink href={WHATSAPP_URL} isAr={isAr}>{t("Check Rates", "الأسعار")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("Contact", "تواصل")} isAr={isAr}>
            <FooterLink isAr={isAr}>+249 96 510 5555</FooterLink>
            <FooterLink isAr={isAr}>Kassala@princehotel-sd.com</FooterLink>
            <FooterLink isAr={isAr}>events@princeplaza.sd</FooterLink>
            <FooterLink isAr={isAr}>{t("Kassala, Eastern Sudan", "كسلا، شرق السودان")}</FooterLink>
          </FooterCol>
        </div>

        <div
          className="mt-16 flex flex-col items-start justify-between gap-6 border-t pt-8 text-[11px] sm:flex-row sm:items-center"
          style={{ borderColor: "rgba(239,224,191,0.18)", color: "rgba(239,224,191,0.55)" }}
        >
          <div className="flex items-center gap-3">
            <span
              className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "rgba(239,224,191,0.5)" }}
            >
              {t("A Destination of", "وجهة من")}
            </span>
            <div
              className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full"
              style={{
                background: "linear-gradient(135deg, #F4EFE6 0%, #DCDCE2 100%)",
                boxShadow: "inset 0 0 0 1px rgba(233, 199, 123, 0.35)",
              }}
            >
              <Image
                src="/logos/shadgroup.jpeg"
                alt="Shahad Group"
                width={40}
                height={40}
                style={{ objectFit: "contain", width: "120%", height: "120%" }}
              />
            </div>
            <span className={isAr ? "font-arabic" : "font-display"} style={{ color: "rgba(239,224,191,0.85)", fontSize: "14px", letterSpacing: "0.08em" }}>
              {t("Shahad Group", "مجموعة شهد")}
            </span>
          </div>
          <div className="flex flex-col items-start gap-1 sm:items-end">
            <span className={isAr ? "font-arabic" : ""}>
              © {new Date().getFullYear()} {t("Shahad Group · All rights reserved.", "مجموعة شهد · جميع الحقوق محفوظة.")}
            </span>
            <span className={`font-medium uppercase tracking-[0.28em] ${isAr ? "font-arabic" : ""}`} style={{ color: "rgba(239,224,191,0.4)" }}>
              {t("Construction · Real Estate · Hospitality", "إنشاءات · عقارات · ضيافة")}
            </span>
          </div>
        </div>

        <div
          className="mt-8 border-t pt-6 text-[10px] leading-[1.7] sm:flex sm:items-start sm:justify-between sm:gap-8"
          style={{ borderColor: "rgba(239,224,191,0.12)", color: "rgba(239,224,191,0.4)" }}
        >
          <span className={`font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`}>{t("Image credits", "حقوق الصور")}</span>
          <span className={`mt-2 block sm:mt-0 sm:max-w-3xl ${isAr ? "font-arabic sm:text-left" : "sm:text-right"}`}>
            {t("All photography supplied by Prince Plaza Kassala.", "جميع الصور مقدّمة من برنس بلازا كسلا.")}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, isAr }: { title: string; children: React.ReactNode; isAr: boolean }) {
  return (
    <div className="sm:col-span-1 lg:col-span-2">
      <div className={`text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-gold)" }}>
        {title}
      </div>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ children, href, isAr }: { children: React.ReactNode; href?: string; isAr: boolean }) {
  if (href) {
    return (
      <li>
        <a href={href} className={`text-[13px] transition-colors hover:text-[var(--color-gold-soft)] ${isAr ? "font-arabic" : ""}`} style={{ color: "rgba(239,224,191,0.7)" }}>
          {children}
        </a>
      </li>
    );
  }
  return (
    <li className={`text-[13px] ${isAr ? "font-arabic" : ""}`} style={{ color: "rgba(239,224,191,0.7)" }}>
      {children}
    </li>
  );
}
