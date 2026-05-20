"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { COPY } from "@/lib/content";
import { TopBar } from "@/components/TopBar";

export default function WelcomePage() {
  const { language } = useI18n();
  const isAr = language === "ar";

  return (
    <main
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pt-24 lg:px-12"
      style={{
        background:
          "linear-gradient(180deg, var(--color-charcoal) 0%, #14101C 60%, var(--color-royal-deep) 100%)",
        color: "var(--color-ivory)",
      }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <TopBar />

      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="flex items-center justify-center gap-3">
          <span
            className="h-px w-12"
            style={{ background: "rgba(233, 199, 123, 0.65)" }}
          />
          <span
            className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
            style={{ color: "var(--color-gold-soft)" }}
          >
            {isAr ? "برنس بلازا كسلا" : "Prince Plaza Kassala"}
          </span>
          <span
            className="h-px w-12"
            style={{ background: "rgba(233, 199, 123, 0.65)" }}
          />
        </div>

        <h1
          className={`mt-10 tracking-[-0.015em] ${isAr ? "font-arabic" : "font-display"}`}
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(48px, 8vw, 104px)",
            lineHeight: isAr ? 1.15 : 1.02,
            fontWeight: 400,
          }}
        >
          {isAr ? "أهلاً بكم في إقامتكم" : "Welcome to Your Stay"}
        </h1>

        <p
          className={`mx-auto mt-8 max-w-xl text-[16px] leading-[1.85] sm:text-[18px] ${isAr ? "font-arabic" : ""}`}
          style={{ color: "rgba(255, 252, 245, 0.78)" }}
        >
          {COPY.welcome[language]}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className={`btn-gold ${isAr ? "font-arabic" : ""}`}
          >
            {isAr ? "ادخل البوابة" : "Enter the Plaza"}
            <span aria-hidden>{isAr ? "←" : "→"}</span>
          </Link>
        </div>

        <p
          className={`mt-16 text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
          style={{ color: "rgba(233, 199, 123, 0.55)" }}
        >
          {COPY.tagline[language]}
        </p>
      </div>
    </main>
  );
}
