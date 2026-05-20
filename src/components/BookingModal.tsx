"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";

type Localised = { en: string; ar: string };

interface Option {
  roomTypeId: string;
  name: Localised;
  shortName: Localised;
  description: Localised;
  view: Localised;
  capacity: number;
  sqm: number;
  image: string;
  nightlyRate: number;
  totalPrice: number;
  currency: string;
  unitsAvailable: number;
  available: boolean;
}

interface AddonOption {
  id: string;
  name: Localised | string;
  price: number;
  category: string;
}

interface AvailabilityResponse {
  hotel: { whatsapp: string; phone: string; email: string };
  nights: number;
  options: Option[];
  addons: AddonOption[];
  error?: string;
}

const today = () => new Date().toISOString().slice(0, 10);
const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
};
const plusDays = (iso: string, days: number) => {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

type Step = "search" | "details" | "success";

export function BookingModal() {
  const { language, t } = useI18n();
  const isAr = language === "ar";

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("search");

  // Search inputs
  const [checkIn, setCheckIn] = useState(today());
  const [checkOut, setCheckOut] = useState(tomorrow());
  const [guests, setGuests] = useState(2);

  // Availability state
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(null);
  const [loadingAvail, setLoadingAvail] = useState(false);
  const [selectedRoomTypeId, setSelectedRoomTypeId] = useState<string | null>(null);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([]);

  // Guest details
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [callPhone, setCallPhone] = useState<string | null>(null);
  const [bookingReference, setBookingReference] = useState<string | null>(null);

  // Open / close via custom event ──────────────────────────────────────
  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);
    window.addEventListener("pb:open-reservation", onOpen);
    window.addEventListener("pb:close-reservation", onClose);
    return () => {
      window.removeEventListener("pb:open-reservation", onOpen);
      window.removeEventListener("pb:close-reservation", onClose);
    };
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Fetch availability when dates change ────────────────────────────────
  const fetchAvailability = useCallback(async () => {
    if (new Date(checkOut) <= new Date(checkIn)) {
      setCheckOut(plusDays(checkIn, 1));
      return;
    }
    setLoadingAvail(true);
    setError(null);
    try {
      const url = `/api/booking?hotelId=prince-plaza-kassala&checkIn=${checkIn}&checkOut=${checkOut}`;
      const res = await fetch(url);
      const data: AvailabilityResponse = await res.json();
      setAvailability(data);
      // Auto-select first available room
      const firstAvailable = data.options.find((o) => o.available);
      if (firstAvailable && !selectedRoomTypeId) {
        setSelectedRoomTypeId(firstAvailable.roomTypeId);
      }
    } catch {
      setError(t("Could not check availability. Please try again.", "تعذّر التحقق من التوفّر. حاول مرة أخرى."));
    } finally {
      setLoadingAvail(false);
    }
  }, [checkIn, checkOut, selectedRoomTypeId, t]);

  useEffect(() => {
    if (open && step === "search") {
      void fetchAvailability();
    }
  }, [open, step, fetchAvailability]);

  // Reset modal state on close
  const resetAndClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep("search");
      setSelectedAddonIds([]);
      setError(null);
      setWhatsappUrl(null);
      setCallPhone(null);
      setBookingReference(null);
    }, 300);
  };

  // Totals ──────────────────────────────────────────────────────────────
  const selectedOption = useMemo(
    () => availability?.options.find((o) => o.roomTypeId === selectedRoomTypeId),
    [availability, selectedRoomTypeId],
  );
  const addonsTotal = useMemo(() => {
    if (!availability) return 0;
    return availability.addons
      .filter((a) => selectedAddonIds.includes(a.id))
      .reduce((s, a) => s + a.price, 0);
  }, [availability, selectedAddonIds]);
  const grandTotal = (selectedOption?.totalPrice ?? 0) + addonsTotal;
  const currency = selectedOption?.currency ?? "USD";

  // Submit ──────────────────────────────────────────────────────────────
  const submit = async () => {
    if (!selectedRoomTypeId || !availability) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          hotelId: "prince-plaza-kassala",
          roomTypeId: selectedRoomTypeId,
          guestName,
          guestEmail,
          guestPhone,
          guestLanguage: language,
          checkIn,
          checkOut,
          guests,
          addonIds: selectedAddonIds,
          specialRequests,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Submission failed");
        return;
      }
      setWhatsappUrl(data.whatsapp.url);
      setCallPhone(data.callPhone);
      setBookingReference(data.booking.reference);
      setStep("success");
    } catch {
      setError(t("Could not submit. Please try again.", "تعذّر الإرسال. حاول مرة أخرى."));
    } finally {
      setSubmitting(false);
    }
  };

  const canProceed =
    !!selectedOption && selectedOption.available && new Date(checkOut) > new Date(checkIn);
  const canSubmit = guestName.trim() && guestEmail.trim() && guestPhone.trim();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
      style={{ background: "rgba(20, 12, 30, 0.78)", backdropFilter: "blur(8px)" }}
      onClick={resetAndClose}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div
        className="relative max-h-[92svh] w-full max-w-[920px] overflow-y-auto rounded-t-3xl sm:rounded-2xl"
        style={{ background: "var(--color-ivory)", color: "var(--color-charcoal)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 lg:px-10"
          style={{
            background: "var(--color-ivory)",
            borderColor: "var(--color-line)",
          }}
        >
          <div>
            <div
              className={`text-[10px] font-medium uppercase tracking-[0.4em] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "var(--color-gold)" }}
            >
              {t("Reservation", "حجز")}
            </div>
            <div
              className={`font-display mt-1 text-[20px] sm:text-[24px] ${isAr ? "font-arabic" : ""}`}
            >
              {t("Prince Plaza Kassala", "برنس بلازا كسلا")}
            </div>
          </div>
          <button
            onClick={resetAndClose}
            aria-label={t("Close", "إغلاق")}
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ background: "var(--color-bone)", color: "var(--color-charcoal)" }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 lg:px-10 lg:py-8">
          {step === "search" ? (
            <SearchStep
              isAr={isAr}
              t={t}
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
              setCheckIn={setCheckIn}
              setCheckOut={setCheckOut}
              setGuests={setGuests}
              loading={loadingAvail}
              availability={availability}
              selectedRoomTypeId={selectedRoomTypeId}
              setSelectedRoomTypeId={setSelectedRoomTypeId}
              selectedAddonIds={selectedAddonIds}
              setSelectedAddonIds={setSelectedAddonIds}
              language={language}
            />
          ) : null}

          {step === "details" && selectedOption && availability ? (
            <DetailsStep
              isAr={isAr}
              t={t}
              language={language}
              selectedOption={selectedOption}
              availability={availability}
              selectedAddonIds={selectedAddonIds}
              checkIn={checkIn}
              checkOut={checkOut}
              guests={guests}
              guestName={guestName}
              guestEmail={guestEmail}
              guestPhone={guestPhone}
              specialRequests={specialRequests}
              setGuestName={setGuestName}
              setGuestEmail={setGuestEmail}
              setGuestPhone={setGuestPhone}
              setSpecialRequests={setSpecialRequests}
            />
          ) : null}

          {step === "success" && whatsappUrl ? (
            <SuccessStep
              isAr={isAr}
              t={t}
              whatsappUrl={whatsappUrl}
              callPhone={callPhone}
              reference={bookingReference}
              onClose={resetAndClose}
            />
          ) : null}

          {error ? (
            <div
              className="mt-6 rounded-lg p-4 text-[13px]"
              style={{ background: "rgba(248, 81, 73, 0.08)", color: "#b13a35" }}
            >
              {error}
            </div>
          ) : null}
        </div>

        {/* Footer — totals + CTA */}
        {step !== "success" ? (
          <div
            className="sticky bottom-0 border-t px-6 py-4 lg:px-10"
            style={{ background: "var(--color-ivory)", borderColor: "var(--color-line)" }}
          >
            <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div
                  className={`text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`}
                  style={{ color: "var(--color-mist)" }}
                >
                  {selectedOption ? t("To discuss", "للمناقشة") : t("Select a room", "اختر غرفة")}
                </div>
                {selectedOption ? (
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-[26px] sm:text-[30px]" style={{ color: "var(--color-royal-deep)" }}>
                      {currency} {grandTotal.toLocaleString()}
                    </span>
                    <span className={`text-[12px] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-stone)" }}>
                      · {availability?.nights} {t("nights", "ليلة")}
                    </span>
                  </div>
                ) : null}
              </div>
              <div className="flex gap-3">
                {step === "details" ? (
                  <button
                    onClick={() => setStep("search")}
                    className={`btn-ghost ${isAr ? "font-arabic" : ""}`}
                    type="button"
                  >
                    {t("Back", "رجوع")}
                  </button>
                ) : null}
                {step === "search" ? (
                  <button
                    onClick={() => canProceed && setStep("details")}
                    disabled={!canProceed}
                    className={`btn-primary ${isAr ? "font-arabic" : ""}`}
                    style={{ opacity: canProceed ? 1 : 0.4 }}
                    type="button"
                  >
                    {t("Continue", "متابعة")}
                    <span aria-hidden>{isAr ? "←" : "→"}</span>
                  </button>
                ) : null}
                {step === "details" ? (
                  <button
                    onClick={submit}
                    disabled={!canSubmit || submitting}
                    className={`btn-primary ${isAr ? "font-arabic" : ""}`}
                    style={{ opacity: canSubmit && !submitting ? 1 : 0.4 }}
                    type="button"
                  >
                    {submitting ? t("Sending…", "إرسال…") : t("Confirm on WhatsApp", "تأكيد عبر واتساب")}
                    <span aria-hidden>{isAr ? "←" : "→"}</span>
                  </button>
                ) : null}
              </div>
            </div>
            <p
              className={`mt-3 text-[11px] leading-[1.5] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "var(--color-mist)" }}
            >
              {t(
                "No payment is taken on this page. Our reservations team finalises everything by WhatsApp or phone.",
                "لا يتم استلام أي مبلغ على هذه الصفحة. فريق الحجوزات يُكمل كل شيء عبر الواتساب أو الهاتف.",
              )}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ─── Step components ──────────────────────────────────────────────────────

function SearchStep(props: {
  isAr: boolean;
  t: (en: string, ar: string) => string;
  checkIn: string;
  checkOut: string;
  guests: number;
  setCheckIn: (v: string) => void;
  setCheckOut: (v: string) => void;
  setGuests: (v: number) => void;
  loading: boolean;
  availability: AvailabilityResponse | null;
  selectedRoomTypeId: string | null;
  setSelectedRoomTypeId: (v: string) => void;
  selectedAddonIds: string[];
  setSelectedAddonIds: (v: string[]) => void;
  language: "en" | "ar";
}) {
  const {
    isAr,
    t,
    checkIn,
    checkOut,
    guests,
    setCheckIn,
    setCheckOut,
    setGuests,
    loading,
    availability,
    selectedRoomTypeId,
    setSelectedRoomTypeId,
    selectedAddonIds,
    setSelectedAddonIds,
    language,
  } = props;

  const toggleAddon = (id: string) => {
    setSelectedAddonIds(
      selectedAddonIds.includes(id)
        ? selectedAddonIds.filter((a) => a !== id)
        : [...selectedAddonIds, id],
    );
  };

  return (
    <div>
      {/* Date + guest pickers */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FieldLabel label={t("Check-in", "تاريخ الوصول")}>
          <input
            type="date"
            value={checkIn}
            min={today()}
            onChange={(e) => setCheckIn(e.target.value)}
            className="modal-input"
          />
        </FieldLabel>
        <FieldLabel label={t("Check-out", "تاريخ المغادرة")}>
          <input
            type="date"
            value={checkOut}
            min={plusDays(checkIn, 1)}
            onChange={(e) => setCheckOut(e.target.value)}
            className="modal-input"
          />
        </FieldLabel>
        <FieldLabel label={t("Guests", "الضيوف")}>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="modal-input"
          >
            {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </FieldLabel>
      </div>

      {/* Available rooms */}
      <div className="mt-8">
        <div
          className={`text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`}
          style={{ color: "var(--color-gold)" }}
        >
          {t("Available Rooms", "الغرف المتاحة")}
        </div>

        {loading ? (
          <div className="mt-4 grid grid-cols-1 gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-lg"
                style={{ background: "var(--color-bone)" }}
              />
            ))}
          </div>
        ) : null}

        {!loading && availability ? (
          <div className="mt-4 grid grid-cols-1 gap-3">
            {availability.options.map((o) => {
              const selected = o.roomTypeId === selectedRoomTypeId;
              return (
                <button
                  key={o.roomTypeId}
                  type="button"
                  onClick={() => o.available && setSelectedRoomTypeId(o.roomTypeId)}
                  disabled={!o.available}
                  className="group flex w-full items-stretch gap-4 rounded-lg border p-4 text-left transition-all"
                  style={{
                    borderColor: selected ? "var(--color-royal-deep)" : "var(--color-line)",
                    background: selected ? "var(--color-bone-soft)" : "transparent",
                    opacity: o.available ? 1 : 0.55,
                    cursor: o.available ? "pointer" : "not-allowed",
                  }}
                >
                  <div
                    className="h-20 w-20 flex-shrink-0 rounded bg-cover bg-center sm:h-24 sm:w-28"
                    style={{ backgroundImage: `url(${o.image})` }}
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div
                          className={`font-display text-[20px] leading-tight ${isAr ? "font-arabic" : ""}`}
                        >
                          {o.name[language]}
                        </div>
                        <div
                          className={`mt-1 text-[12px] ${isAr ? "font-arabic" : ""}`}
                          style={{ color: "var(--color-stone)" }}
                        >
                          {o.view[language]} · {o.capacity} {props.t("guests", "ضيوف")} · {o.sqm} m²
                        </div>
                      </div>
                      <div className={`text-right ${isAr ? "text-left" : ""}`}>
                        <div className="font-display text-[20px]" style={{ color: "var(--color-charcoal)" }}>
                          {o.currency} {o.nightlyRate}
                        </div>
                        <div
                          className={`text-[10px] uppercase tracking-[0.22em] ${isAr ? "font-arabic" : ""}`}
                          style={{ color: "var(--color-mist)" }}
                        >
                          {props.t("per night", "لكل ليلة")}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`mt-2 text-[11px] uppercase tracking-[0.22em] ${isAr ? "font-arabic" : ""}`}
                      style={{
                        color: o.available
                          ? selected
                            ? "var(--color-royal-deep)"
                            : "var(--color-gold)"
                          : "#b13a35",
                      }}
                    >
                      {o.available
                        ? selected
                          ? props.t("Selected", "تم الاختيار")
                          : `${o.unitsAvailable} ${props.t("available", "متاح")}`
                        : props.t("Unavailable", "غير متاح")}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {/* Add-ons */}
      {availability && availability.addons.length > 0 ? (
        <div className="mt-10">
          <div
            className={`text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`}
            style={{ color: "var(--color-gold)" }}
          >
            {t("Add-ons", "الإضافات")}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {availability.addons.map((a) => {
              const checked = selectedAddonIds.includes(a.id);
              const displayName = typeof a.name === "string" ? a.name : a.name[language];
              return (
                <label
                  key={a.id}
                  className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border px-4 py-3 transition-all"
                  style={{
                    borderColor: checked ? "var(--color-royal-deep)" : "var(--color-line)",
                    background: checked ? "var(--color-bone-soft)" : "transparent",
                  }}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAddon(a.id)}
                      className="h-4 w-4"
                    />
                    <span className={`text-[13px] ${isAr ? "font-arabic" : ""}`}>
                      {displayName}
                    </span>
                  </span>
                  <span className="font-display text-[14px]">USD {a.price}</span>
                </label>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DetailsStep(props: {
  isAr: boolean;
  t: (en: string, ar: string) => string;
  language: "en" | "ar";
  selectedOption: Option;
  availability: AvailabilityResponse;
  selectedAddonIds: string[];
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests: string;
  setGuestName: (v: string) => void;
  setGuestEmail: (v: string) => void;
  setGuestPhone: (v: string) => void;
  setSpecialRequests: (v: string) => void;
}) {
  const {
    isAr,
    t,
    language,
    selectedOption,
    availability,
    selectedAddonIds,
    checkIn,
    checkOut,
    guests,
    guestName,
    guestEmail,
    guestPhone,
    specialRequests,
    setGuestName,
    setGuestEmail,
    setGuestPhone,
    setSpecialRequests,
  } = props;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
      {/* Guest form */}
      <div className="lg:col-span-3">
        <div
          className={`text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`}
          style={{ color: "var(--color-gold)" }}
        >
          {t("Your Details", "تفاصيلك")}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FieldLabel label={t("Full name", "الاسم الكامل")}>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              placeholder={t("Sara Ahmed", "سارة أحمد")}
              className="modal-input"
            />
          </FieldLabel>
          <FieldLabel label={t("Email", "البريد الإلكتروني")}>
            <input
              type="email"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="modal-input"
            />
          </FieldLabel>
          <FieldLabel label={t("Phone (with country code)", "الهاتف (مع رمز الدولة)")}>
            <input
              type="tel"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              required
              placeholder="+249 ..."
              className="modal-input"
            />
          </FieldLabel>
          <FieldLabel label={t("Guests", "الضيوف")}>
            <input type="text" value={guests} readOnly className="modal-input" style={{ background: "var(--color-bone)" }} />
          </FieldLabel>
        </div>
        <div className="mt-4">
          <FieldLabel label={t("Special requests (optional)", "طلبات خاصة (اختياري)")}>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={3}
              placeholder={t(
                "e.g. late check-in, dietary requirements, airport pickup time",
                "مثال: تسجيل دخول متأخر، احتياجات غذائية، موعد استلام من المطار",
              )}
              className="modal-input"
            />
          </FieldLabel>
        </div>
      </div>

      {/* Summary */}
      <div className="lg:col-span-2">
        <div
          className="rounded-lg p-5"
          style={{ background: "var(--color-bone-soft)", border: "1px solid var(--color-line)" }}
        >
          <div
            className={`text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`}
            style={{ color: "var(--color-gold)" }}
          >
            {t("Booking Summary", "ملخص الحجز")}
          </div>
          <div className="mt-4 space-y-3 text-[13px]">
            <SummaryRow label={t("Room", "الغرفة")} value={selectedOption.name[language]} isAr={isAr} />
            <SummaryRow
              label={t("Dates", "التواريخ")}
              value={`${checkIn} → ${checkOut}`}
              isAr={isAr}
            />
            <SummaryRow
              label={t("Nights · Guests", "الليالي · الضيوف")}
              value={`${availability.nights} · ${guests}`}
              isAr={isAr}
            />
            <SummaryRow
              label={t("Rooms total", "إجمالي الغرف")}
              value={`${selectedOption.currency} ${selectedOption.totalPrice}`}
              isAr={isAr}
            />
            {availability.addons
              .filter((a) => selectedAddonIds.includes(a.id))
              .map((a) => (
                <SummaryRow
                  key={a.id}
                  label={typeof a.name === "string" ? a.name : a.name[language]}
                  value={`${selectedOption.currency} ${a.price}`}
                  isAr={isAr}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessStep(props: {
  isAr: boolean;
  t: (en: string, ar: string) => string;
  whatsappUrl: string;
  callPhone: string | null;
  reference: string | null;
  onClose: () => void;
}) {
  const { isAr, t, whatsappUrl, callPhone, reference, onClose } = props;

  // Auto-open WhatsApp on first render
  useEffect(() => {
    const id = setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 600);
    return () => clearTimeout(id);
  }, [whatsappUrl]);

  return (
    <div className="py-6 text-center">
      <div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-[28px]"
        style={{ background: "linear-gradient(135deg, var(--color-gold-soft) 0%, var(--color-gold) 100%)", color: "var(--color-charcoal)" }}
        aria-hidden
      >
        ✓
      </div>
      <h2
        className={`font-display mt-6 text-[28px] sm:text-[34px] ${isAr ? "font-arabic" : ""}`}
        style={{ color: "var(--color-charcoal)" }}
      >
        {t("Almost done.", "أوشكنا على الانتهاء.")}
      </h2>
      <p
        className={`mx-auto mt-4 max-w-md text-[14px] leading-[1.85] ${isAr ? "font-arabic" : ""}`}
        style={{ color: "var(--color-stone)" }}
      >
        {t(
          "We've recorded your request and opened WhatsApp with all the details pre-filled. Just press send. Our reservations team will reply within the same business day to finalise payment and confirm.",
          "سجّلنا طلبك وفتحنا واتساب بكل التفاصيل جاهزة. فقط اضغط إرسال. سيردّ فريق الحجوزات خلال يوم العمل نفسه لإكمال الدفع والتأكيد.",
        )}
      </p>

      {reference ? (
        <div className="mt-6 inline-flex flex-col items-center gap-1">
          <span
            className={`text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`}
            style={{ color: "var(--color-mist)" }}
          >
            {t("Booking reference", "مرجع الحجز")}
          </span>
          <span className="font-display text-[22px]" style={{ color: "var(--color-royal-deep)" }}>
            {reference}
          </span>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className={`btn-primary ${isAr ? "font-arabic" : ""}`}>
          {t("Open WhatsApp", "فتح واتساب")}
          <span aria-hidden>{isAr ? "←" : "→"}</span>
        </a>
        {callPhone ? (
          <a href={`tel:${callPhone}`} className={`btn-ghost ${isAr ? "font-arabic" : ""}`}>
            {t("Or call us", "أو اتصل بنا")} {callPhone}
          </a>
        ) : null}
      </div>

      <button
        onClick={onClose}
        className={`mt-10 text-[12px] uppercase tracking-[0.28em] ${isAr ? "font-arabic" : ""}`}
        style={{ color: "var(--color-mist)" }}
      >
        {t("Close", "إغلاق")}
      </button>
    </div>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span
        className="text-[10px] font-medium uppercase tracking-[0.32em]"
        style={{ color: "var(--color-gold)" }}
      >
        {label}
      </span>
      <div className="mt-2">{children}</div>
      <style jsx>{`
        :global(.modal-input) {
          width: 100%;
          padding: 0.7rem 0.9rem;
          border: 1px solid var(--color-line);
          background: transparent;
          color: var(--color-charcoal);
          font-family: var(--font-sans);
          font-size: 14px;
          border-radius: 6px;
          outline: none;
          transition: border-color 0.2s ease;
        }
        :global(.modal-input:focus) {
          border-color: var(--color-royal-deep);
        }
      `}</style>
    </label>
  );
}

function SummaryRow({ label, value, isAr }: { label: string; value: string; isAr: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className={isAr ? "font-arabic" : ""} style={{ color: "var(--color-stone)" }}>
        {label}
      </span>
      <span className={`font-display text-[15px] ${isAr ? "font-arabic" : ""}`}>{value}</span>
    </div>
  );
}
