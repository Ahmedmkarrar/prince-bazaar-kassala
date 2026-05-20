"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Booking } from "@/lib/data";
import { TopBar } from "@/components/TopBar";
import { useI18n } from "@/lib/i18n";

const STATUS_COPY: Record<
  string,
  { en: string; ar: string; bg: string; fg: string; verbose: { en: string; ar: string } }
> = {
  pending: {
    en: "Pending",
    ar: "قيد المعالجة",
    bg: "rgba(233,199,123,0.16)",
    fg: "#E9C77B",
    verbose: {
      en: "Awaiting confirmation. Our team is reaching you on WhatsApp shortly to finalise payment.",
      ar: "بانتظار التأكيد. سيتواصل معك فريقنا على واتساب قريبًا لإكمال الدفع.",
    },
  },
  confirmed: {
    en: "Confirmed",
    ar: "مؤكَّد",
    bg: "rgba(95,203,139,0.16)",
    fg: "#5FCB8B",
    verbose: {
      en: "Your reservation is confirmed. We look forward to welcoming you to Kassala.",
      ar: "حجزك مؤكَّد. نتطلّع إلى استقبالك في كسلا.",
    },
  },
  checked_in: {
    en: "Checked-in",
    ar: "تم تسجيل الدخول",
    bg: "rgba(125,167,217,0.18)",
    fg: "#7DA7D9",
    verbose: {
      en: "You're with us. Enjoy your stay.",
      ar: "أنت معنا. استمتع بإقامتك.",
    },
  },
  checked_out: {
    en: "Checked-out",
    ar: "تم تسجيل المغادرة",
    bg: "rgba(200,168,224,0.16)",
    fg: "#C8A8E0",
    verbose: {
      en: "Thank you for staying with us. We hope to see you again.",
      ar: "شكرًا لإقامتك معنا. نأمل أن نراك مرة أخرى.",
    },
  },
  cancelled: {
    en: "Cancelled",
    ar: "ملغى",
    bg: "rgba(248,81,73,0.16)",
    fg: "#F88478",
    verbose: {
      en: "This reservation has been cancelled. Please reach out if this is unexpected.",
      ar: "تم إلغاء هذا الحجز. يرجى التواصل معنا إذا كان ذلك غير متوقع.",
    },
  },
  no_show: {
    en: "No-show",
    ar: "لم يحضر",
    bg: "rgba(248,81,73,0.16)",
    fg: "#F88478",
    verbose: {
      en: "Marked as a no-show. Please contact us if there's been a mistake.",
      ar: "مُسجَّل كعدم حضور. يرجى التواصل إذا كان هناك خطأ.",
    },
  },
};

const WHATSAPP_FALLBACK = "+249000000000";

export function LookupClient({
  reference,
  prefilledEmail,
}: {
  reference: string;
  prefilledEmail: string;
}) {
  const { language, t } = useI18n();
  const isAr = language === "ar";

  const [email, setEmail] = useState(prefilledEmail);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoTried, setAutoTried] = useState(false);

  async function lookup(emailToUse: string) {
    if (!emailToUse.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/booking/${encodeURIComponent(reference)}?email=${encodeURIComponent(emailToUse)}`,
      );
      const data = await res.json();
      if (!res.ok) {
        setError(
          t(
            "We couldn't find a booking matching that reference and email. Please check both and try again.",
            "لم نتمكن من العثور على حجز مطابق لهذا المرجع والبريد الإلكتروني. يرجى التحقق والمحاولة مرة أخرى.",
          ),
        );
        setBooking(null);
        return;
      }
      setBooking(data.booking);
    } catch {
      setError(t("Network error. Please try again.", "خطأ في الشبكة. حاول مرة أخرى."));
    } finally {
      setLoading(false);
    }
  }

  // Auto-lookup if email is already in URL
  useEffect(() => {
    if (prefilledEmail && !autoTried) {
      setAutoTried(true);
      void lookup(prefilledEmail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefilledEmail]);

  return (
    <main
      className="relative min-h-screen"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% -10%, rgba(93, 42, 134, 0.25) 0%, transparent 60%), #0E0719",
        color: "var(--color-ivory)",
      }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <TopBar />
      <div className="h-12" />

      <div className="mx-auto max-w-[820px] px-6 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center">
          <Link
            href="/"
            className={`inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
            style={{ color: "var(--color-gold-soft)" }}
          >
            <span aria-hidden>{isAr ? "→" : "←"}</span>
            {t("Prince Plaza Kassala", "برنس بلازا كسلا")}
          </Link>
          <h1
            className={`font-display mt-6 text-[44px] leading-tight tracking-[-0.015em] sm:text-[56px] ${isAr ? "font-arabic" : ""}`}
            style={{ color: "#FFFFFF" }}
          >
            {t("Your Reservation", "حجزك")}
          </h1>
          <p
            className={`mt-4 text-[14px] ${isAr ? "font-arabic" : ""}`}
            style={{ color: "rgba(255,252,245,0.6)" }}
          >
            {t("Reference", "المرجع")} ·{" "}
            <span className="font-display text-[16px]" style={{ color: "var(--color-gold-soft)" }}>
              {reference}
            </span>
          </p>
        </div>

        {/* Lookup form (only if no booking loaded) */}
        {!booking ? (
          <div
            className="mt-12 rounded-2xl border p-8 lg:p-10"
            style={{
              background: "rgba(20, 16, 28, 0.55)",
              borderColor: "rgba(233, 199, 123, 0.18)",
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              className={`text-[14px] leading-[1.85] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "rgba(255,252,245,0.78)" }}
            >
              {t(
                "Enter the email used on the booking to view the full details.",
                "أدخل البريد الإلكتروني المُستخدم في الحجز لعرض كامل التفاصيل.",
              )}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void lookup(email);
              }}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-md px-4 py-3 text-[14px] outline-none transition-colors focus:border-[var(--color-gold-soft)]"
                style={{
                  background: "rgba(14, 7, 25, 0.7)",
                  border: "1px solid rgba(233, 199, 123, 0.22)",
                  color: "rgba(255,252,245,0.9)",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className={`rounded-md px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] ${isAr ? "font-arabic" : ""}`}
                style={{
                  background: "var(--color-gold)",
                  color: "#14101C",
                  opacity: loading ? 0.5 : 1,
                }}
              >
                {loading ? t("Loading…", "جارٍ التحميل…") : t("View booking", "عرض الحجز")}
              </button>
            </form>

            {error ? (
              <div
                className={`mt-4 rounded-md border-l-4 px-4 py-3 text-[13px] leading-[1.7] ${isAr ? "font-arabic" : ""}`}
                style={{ background: "rgba(248,81,73,0.08)", borderColor: "#F88478", color: "#FFAEA5" }}
              >
                {error}
              </div>
            ) : null}
          </div>
        ) : (
          <BookingCard booking={booking} language={language} t={t} />
        )}

        {/* Footer help */}
        <div
          className={`mt-12 text-center text-[12px] leading-[1.85] ${isAr ? "font-arabic" : ""}`}
          style={{ color: "rgba(255,252,245,0.45)" }}
        >
          {t(
            "Lost your reference? Reach our reservations team on WhatsApp or by phone — we'll find you in seconds.",
            "هل فقدت المرجع؟ تواصل مع فريق الحجوزات عبر واتساب أو الهاتف — سنجدك في ثوانٍ.",
          )}
        </div>
      </div>
    </main>
  );
}

function BookingCard({
  booking,
  language,
  t,
}: {
  booking: Booking;
  language: "en" | "ar";
  t: (en: string, ar: string) => string;
}) {
  const isAr = language === "ar";
  const status = STATUS_COPY[booking.status] ?? STATUS_COPY.pending;
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString(isAr ? "ar-EG" : "en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const whatsappLink = `https://wa.me/${(booking.guestPhone || WHATSAPP_FALLBACK).replace(/\D/g, "")}`;

  return (
    <div className="mt-12 space-y-6">
      {/* Status hero */}
      <div
        className="rounded-2xl border p-8 text-center lg:p-12"
        style={{
          background: status.bg,
          borderColor: `${status.fg}33`,
        }}
      >
        <div
          className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
          style={{ color: status.fg }}
        >
          {t("Status", "الحالة")}
        </div>
        <div
          className={`font-display mt-3 text-[40px] leading-tight sm:text-[48px] ${isAr ? "font-arabic" : ""}`}
          style={{ color: "#FFFFFF" }}
        >
          {status[language]}
        </div>
        <p
          className={`mx-auto mt-4 max-w-md text-[14px] leading-[1.85] ${isAr ? "font-arabic" : ""}`}
          style={{ color: "rgba(255,252,245,0.75)" }}
        >
          {status.verbose[language]}
        </p>
      </div>

      {/* Stay summary */}
      <div
        className="rounded-2xl border"
        style={{
          background: "rgba(20, 16, 28, 0.55)",
          borderColor: "rgba(233, 199, 123, 0.18)",
        }}
      >
        <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0" style={{ borderColor: "rgba(233, 199, 123, 0.12)" }}>
          <div className="p-7">
            <Label isAr={isAr}>{t("Check-in", "تاريخ الوصول")}</Label>
            <div className={`font-display mt-2 text-[22px] ${isAr ? "font-arabic" : ""}`} style={{ color: "#FFFFFF" }}>
              {fmt(booking.checkIn)}
            </div>
            <div className={`mt-1 text-[12px] ${isAr ? "font-arabic" : ""}`} style={{ color: "rgba(255,252,245,0.5)" }}>
              {t("From 14:00", "ابتداءً من ١٤:٠٠")}
            </div>
          </div>
          <div className="p-7">
            <Label isAr={isAr}>{t("Check-out", "تاريخ المغادرة")}</Label>
            <div className={`font-display mt-2 text-[22px] ${isAr ? "font-arabic" : ""}`} style={{ color: "#FFFFFF" }}>
              {fmt(booking.checkOut)}
            </div>
            <div className={`mt-1 text-[12px] ${isAr ? "font-arabic" : ""}`} style={{ color: "rgba(255,252,245,0.5)" }}>
              {t("By 12:00", "حتى ١٢:٠٠")}
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-3 border-t text-center"
          style={{ borderColor: "rgba(233, 199, 123, 0.12)" }}
        >
          <Stat label={t("Nights", "ليالٍ")} value={String(booking.nights)} isAr={isAr} />
          <Stat label={t("Guests", "الضيوف")} value={String(booking.guests)} isAr={isAr} />
          <Stat label={t("Room", "الغرفة")} value={booking.roomTypeId} isAr={isAr} />
        </div>
      </div>

      {/* Pricing */}
      <div
        className="rounded-2xl border p-7"
        style={{
          background: "rgba(20, 16, 28, 0.55)",
          borderColor: "rgba(233, 199, 123, 0.18)",
        }}
      >
        <Label isAr={isAr}>{t("Pricing", "التسعير")}</Label>

        <div className="mt-5 space-y-3 text-[14px]">
          <Row
            isAr={isAr}
            label={`${booking.roomTypeId} · ${booking.nights} ${t("nights", "ليالٍ")}`}
            value={`${booking.currency} ${booking.baseTotal.toLocaleString()}`}
          />
          {booking.addons.map((a) => (
            <Row key={a.id} isAr={isAr} label={a.name} value={`${booking.currency} ${a.price.toLocaleString()}`} muted />
          ))}
        </div>

        <div
          className="mt-6 flex items-baseline justify-between border-t pt-5"
          style={{ borderColor: "rgba(233, 199, 123, 0.18)" }}
        >
          <span className={`text-[12px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-gold-soft)" }}>
            {t("Grand total", "الإجمالي")}
          </span>
          <span className="font-display text-[32px]" style={{ color: "var(--color-gold-soft)" }}>
            {booking.currency} {booking.grandTotal.toLocaleString()}
          </span>
        </div>

        {booking.status === "pending" ? (
          <p
            className={`mt-5 text-[12px] leading-[1.7] ${isAr ? "font-arabic" : ""}`}
            style={{ color: "rgba(255,252,245,0.55)" }}
          >
            {t(
              "Payment is taken by our reservations team via WhatsApp or phone. The total above is what we'll be discussing.",
              "يتم استلام الدفع من قبل فريق الحجوزات عبر واتساب أو الهاتف. المبلغ الإجمالي أعلاه هو ما سنناقشه.",
            )}
          </p>
        ) : null}
      </div>

      {/* Special requests */}
      {booking.specialRequests ? (
        <div
          className="rounded-2xl border p-7"
          style={{
            background: "rgba(20, 16, 28, 0.55)",
            borderColor: "rgba(233, 199, 123, 0.18)",
          }}
        >
          <Label isAr={isAr}>{t("Special requests", "طلبات خاصة")}</Label>
          <p
            className={`mt-3 text-[14px] leading-[1.85] italic ${isAr ? "font-arabic" : ""}`}
            style={{ color: "rgba(255,252,245,0.85)" }}
          >
            &ldquo;{booking.specialRequests}&rdquo;
          </p>
        </div>
      ) : null}

      {/* Guest */}
      <div
        className="rounded-2xl border p-7"
        style={{
          background: "rgba(20, 16, 28, 0.55)",
          borderColor: "rgba(233, 199, 123, 0.18)",
        }}
      >
        <Label isAr={isAr}>{t("Guest", "الضيف")}</Label>
        <div className={`font-display mt-3 text-[22px] ${isAr ? "font-arabic" : ""}`} style={{ color: "#FFFFFF" }}>
          {booking.guestName}
        </div>
        <div className="mt-2 space-y-1 text-[13px]" style={{ color: "rgba(255,252,245,0.65)" }}>
          <div>{booking.guestEmail}</div>
          <div>{booking.guestPhone}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className={`flex-1 rounded-md px-5 py-3 text-center text-[11px] font-medium uppercase tracking-[0.22em] ${isAr ? "font-arabic" : ""}`}
          style={{ background: "var(--color-gold)", color: "#14101C" }}
        >
          {t("Message Reservations", "تواصل مع الحجوزات")}
        </a>
        <Link
          href={`/booking/${encodeURIComponent(booking.reference)}/print?email=${encodeURIComponent(booking.guestEmail)}`}
          className={`flex-1 rounded-md border px-5 py-3 text-center text-[11px] font-medium uppercase tracking-[0.22em] ${isAr ? "font-arabic" : ""}`}
          style={{
            borderColor: "rgba(233, 199, 123, 0.32)",
            color: "var(--color-gold-soft)",
            background: "transparent",
          }}
        >
          {t("Print / Save PDF", "طباعة / حفظ PDF")}
        </Link>
      </div>
    </div>
  );
}

function Label({ children, isAr }: { children: React.ReactNode; isAr: boolean }) {
  return (
    <div
      className={`text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`}
      style={{ color: "var(--color-gold-soft)" }}
    >
      {children}
    </div>
  );
}

function Stat({ label, value, isAr }: { label: string; value: string; isAr: boolean }) {
  return (
    <div className="p-6">
      <div className={`text-[10px] font-medium uppercase tracking-[0.28em] ${isAr ? "font-arabic" : ""}`} style={{ color: "rgba(255,252,245,0.5)" }}>
        {label}
      </div>
      <div className="font-display mt-2 text-[28px]" style={{ color: "#FFFFFF" }}>
        {value}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  isAr,
  muted,
}: {
  label: string;
  value: string;
  isAr: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span
        className={isAr ? "font-arabic" : ""}
        style={{ color: muted ? "rgba(255,252,245,0.6)" : "rgba(255,252,245,0.85)" }}
      >
        {muted ? "· " : ""}
        {label}
      </span>
      <span className="font-display">{value}</span>
    </div>
  );
}
