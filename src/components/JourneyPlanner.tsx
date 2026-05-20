"use client";

import { useEffect, useMemo, useState } from "react";
import type { TourismPackage, TransportRoute, Hotel } from "@/lib/data";
import { useI18n } from "@/lib/i18n";

type Tab = "flights" | "tourism" | "transport";

interface ApiResponse {
  hotel: Hotel;
  tourismPackages: TourismPackage[];
  transportRoutes: TransportRoute[];
}

export function JourneyPlanner() {
  const { language, t } = useI18n();
  const isAr = language === "ar";
  const [tab, setTab] = useState<Tab>("tourism");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [selected, setSelected] = useState<{
    kind: "tourism" | "transport";
    item: TourismPackage | TransportRoute;
  } | null>(null);
  const [flightDraft, setFlightDraft] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: 1,
    cabin: "economy",
    name: "",
    phone: "",
    notes: "",
  });

  useEffect(() => {
    void fetch("/api/journey", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {});
  }, []);

  const whatsapp = data?.hotel?.whatsapp ?? "+249000000000";

  return (
    <section
      id="journey"
      className="relative px-6 py-32 lg:px-12 lg:py-44"
      style={{ background: "var(--color-ivory)" }}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.42em] ${isAr ? "font-arabic" : ""}`}
                style={{ color: "var(--color-mist)" }}
              >
                {t("Plan Your Journey", "خطّط لرحلتك")}
              </span>
            </div>
            <h2
              className={`mt-8 tracking-[-0.015em] ${isAr ? "font-arabic" : "font-display"}`}
              style={{
                color: "var(--color-charcoal)",
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: 1.08,
                fontWeight: 400,
              }}
            >
              {t("Flights, tours, and every kilometre in between.", "رحلات جوية، جولات، وكل كيلومتر بينهما.")}
            </h2>
            <p
              className={`mt-6 max-w-md text-[15px] leading-[1.85] ${isAr ? "font-arabic" : ""}`}
              style={{ color: "var(--color-stone)" }}
            >
              {t(
                "Through Piedmont Travel & Tourism, our on-site agency handles every part of your journey — domestic and international flights, curated Sudan tours, and ground transport from the moment you land.",
                "عبر بيدمونت للسفر والسياحة، وكالتنا داخل الفندق تتولى كل جزء من رحلتك — الرحلات الداخلية والدولية، جولات سودانية منتقاة، والنقل البري من لحظة هبوطك.",
              )}
            </p>
          </div>

          <div className="lg:col-span-7">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              <TabPill active={tab === "tourism"} onClick={() => setTab("tourism")} isAr={isAr}>
                {t("Tourism", "السياحة")}
              </TabPill>
              <TabPill active={tab === "transport"} onClick={() => setTab("transport")} isAr={isAr}>
                {t("Transportation", "النقل")}
              </TabPill>
              <TabPill active={tab === "flights"} onClick={() => setTab("flights")} isAr={isAr}>
                {t("Flights", "الرحلات الجوية")}
              </TabPill>
            </div>

            {/* Body */}
            <div className="mt-6">
              {tab === "tourism" ? (
                <CardList
                  items={data?.tourismPackages ?? []}
                  language={language}
                  t={t}
                  onSelect={(item) => setSelected({ kind: "tourism", item })}
                />
              ) : null}
              {tab === "transport" ? (
                <CardList
                  items={data?.transportRoutes ?? []}
                  language={language}
                  t={t}
                  onSelect={(item) => setSelected({ kind: "transport", item })}
                />
              ) : null}
              {tab === "flights" ? (
                <FlightForm
                  language={language}
                  t={t}
                  draft={flightDraft}
                  setDraft={setFlightDraft}
                  whatsapp={whatsapp}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {selected ? (
        <InquiryModal
          kind={selected.kind}
          item={selected.item}
          language={language}
          t={t}
          whatsapp={whatsapp}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </section>
  );
}

// ─── Tab + card list ────────────────────────────────────────────────────

function TabPill({
  active,
  onClick,
  children,
  isAr,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  isAr: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors ${isAr ? "font-arabic" : ""}`}
      style={{
        background: active ? "var(--color-royal-deep)" : "transparent",
        color: active ? "var(--color-gold-pale)" : "var(--color-stone)",
        border: `1px solid ${active ? "var(--color-royal-deep)" : "var(--color-line)"}`,
      }}
    >
      {children}
    </button>
  );
}

type ListItem = TourismPackage | TransportRoute;

function CardList({
  items,
  language,
  t,
  onSelect,
}: {
  items: ListItem[];
  language: "en" | "ar";
  t: (en: string, ar: string) => string;
  onSelect: (item: ListItem) => void;
}) {
  const isAr = language === "ar";
  if (items.length === 0) {
    return (
      <div className="rounded-lg border px-6 py-10 text-center text-[13px]" style={{ borderColor: "var(--color-line)", color: "var(--color-mist)" }}>
        {t("Loading…", "جارٍ التحميل…")}
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-1 gap-3">
      {items.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => onSelect(item)}
            className="group flex w-full items-stretch justify-between gap-5 rounded-lg border p-5 text-left transition-all hover:border-[var(--color-gold)]"
            style={{ borderColor: "var(--color-line)", background: "transparent" }}
          >
            <div className="flex-1">
              <div className={`font-display text-[20px] leading-[1.2] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-charcoal)" }}>
                {item.title[language]}
              </div>
              <div className={`mt-1 text-[11px] font-medium uppercase tracking-[0.28em] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-gold)" }}>
                {item.duration[language]}
              </div>
              <p className={`mt-3 text-[13px] leading-[1.7] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-stone)" }}>
                {item.description[language]}
              </p>
            </div>
            <div className={`flex flex-col items-end justify-between text-right ${isAr ? "items-start text-left" : ""}`}>
              <div>
                <div className="font-display text-[24px]" style={{ color: "var(--color-royal-deep)" }}>
                  ${item.priceUsd}
                </div>
                <div className={`mt-0.5 text-[10px] uppercase tracking-[0.28em] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-mist)" }}>
                  {t("from", "من")}
                </div>
              </div>
              <span className={`text-[11px] font-medium uppercase tracking-[0.28em] transition-all ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-gold)" }}>
                {t("Inquire", "استفسر")} {isAr ? "←" : "→"}
              </span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

// ─── Flight form (inquiry only) ─────────────────────────────────────────

interface FlightDraft {
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  passengers: number;
  cabin: string;
  name: string;
  phone: string;
  notes: string;
}

function FlightForm({
  language,
  t,
  draft,
  setDraft,
  whatsapp,
}: {
  language: "en" | "ar";
  t: (en: string, ar: string) => string;
  draft: FlightDraft;
  setDraft: (d: FlightDraft) => void;
  whatsapp: string;
}) {
  const isAr = language === "ar";

  const canSubmit = draft.from.trim() && draft.to.trim() && draft.departDate && draft.name.trim() && draft.phone.trim();

  const buildWhatsappUrl = () => {
    const lines = isAr
      ? [
          "مرحبًا — أرغب في حجز رحلة جوية عبر بيدمونت.",
          "",
          `من: ${draft.from}`,
          `إلى: ${draft.to}`,
          `تاريخ الذهاب: ${draft.departDate}`,
          draft.returnDate ? `تاريخ العودة: ${draft.returnDate}` : null,
          `الركاب: ${draft.passengers}`,
          `الدرجة: ${draft.cabin}`,
          "",
          `الاسم: ${draft.name}`,
          `الهاتف: ${draft.phone}`,
          draft.notes ? `ملاحظات: ${draft.notes}` : null,
        ]
      : [
          "Hello — I'd like to book a flight through Piedmont.",
          "",
          `From: ${draft.from}`,
          `To: ${draft.to}`,
          `Depart: ${draft.departDate}`,
          draft.returnDate ? `Return: ${draft.returnDate}` : null,
          `Passengers: ${draft.passengers}`,
          `Cabin: ${draft.cabin}`,
          "",
          `Name: ${draft.name}`,
          `Phone: ${draft.phone}`,
          draft.notes ? `Notes: ${draft.notes}` : null,
        ];
    const msg = lines.filter(Boolean).join("\n");
    return `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      className="rounded-lg border p-6"
      style={{ borderColor: "var(--color-line)", background: "transparent" }}
    >
      <div className={`text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-gold)" }}>
        {t("Flight enquiry", "استفسار عن رحلة")}
      </div>
      <p className={`mt-2 text-[13px] leading-[1.75] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-stone)" }}>
        {t(
          "Tell us your route and dates. Our travel desk replies on WhatsApp with options from major global airlines.",
          "أخبرنا بمسارك وتواريخك. مكتب السفر يردّ عبر واتساب بخيارات من كبرى شركات الطيران العالمية.",
        )}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label={t("From (city / airport)", "من (المدينة / المطار)")}>
          <Input value={draft.from} onChange={(v) => setDraft({ ...draft, from: v })} placeholder={t("e.g. Khartoum (KRT)", "مثال: الخرطوم (KRT)")} />
        </Field>
        <Field label={t("To", "إلى")}>
          <Input value={draft.to} onChange={(v) => setDraft({ ...draft, to: v })} placeholder={t("e.g. Dubai (DXB)", "مثال: دبي (DXB)")} />
        </Field>
        <Field label={t("Depart", "تاريخ الذهاب")}>
          <Input type="date" value={draft.departDate} onChange={(v) => setDraft({ ...draft, departDate: v })} />
        </Field>
        <Field label={t("Return (optional)", "العودة (اختياري)")}>
          <Input type="date" value={draft.returnDate} onChange={(v) => setDraft({ ...draft, returnDate: v })} />
        </Field>
        <Field label={t("Passengers", "الركاب")}>
          <Input
            type="number"
            value={String(draft.passengers)}
            onChange={(v) => setDraft({ ...draft, passengers: Math.max(1, Math.min(9, Number(v) || 1)) })}
          />
        </Field>
        <Field label={t("Cabin", "الدرجة")}>
          <select
            value={draft.cabin}
            onChange={(e) => setDraft({ ...draft, cabin: e.target.value })}
            className="mt-1.5 w-full rounded-md px-3 py-2 text-[14px] outline-none"
            style={{ border: "1px solid var(--color-line)", background: "var(--color-ivory)", color: "var(--color-charcoal)" }}
          >
            <option value="economy">{t("Economy", "اقتصادي")}</option>
            <option value="premium-economy">{t("Premium Economy", "اقتصادي مميز")}</option>
            <option value="business">{t("Business", "رجال الأعمال")}</option>
            <option value="first">{t("First", "الأولى")}</option>
          </select>
        </Field>
        <Field label={t("Your name", "اسمك")}>
          <Input value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
        </Field>
        <Field label={t("Phone (with country code)", "الهاتف (مع رمز الدولة)")}>
          <Input type="tel" value={draft.phone} onChange={(v) => setDraft({ ...draft, phone: v })} placeholder="+249 ..." />
        </Field>
      </div>
      <div className="mt-4">
        <Field label={t("Notes (optional)", "ملاحظات (اختياري)")}>
          <textarea
            value={draft.notes}
            onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
            rows={2}
            placeholder={t("flexible dates, preferred airline, baggage…", "تواريخ مرنة، خط طيران مفضّل، الأمتعة…")}
            className="mt-1.5 w-full rounded-md px-3 py-2 text-[14px] outline-none"
            style={{ border: "1px solid var(--color-line)", background: "var(--color-ivory)", color: "var(--color-charcoal)" }}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col items-stretch justify-end gap-3 sm:flex-row sm:items-center">
        <a
          href={canSubmit ? buildWhatsappUrl() : undefined}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => {
            if (!canSubmit) e.preventDefault();
          }}
          className={`btn-primary justify-center ${isAr ? "font-arabic" : ""}`}
          style={{ opacity: canSubmit ? 1 : 0.5, pointerEvents: canSubmit ? "auto" : "none" }}
        >
          {t("Send via WhatsApp", "إرسال عبر واتساب")}
          <span aria-hidden>{isAr ? "←" : "→"}</span>
        </a>
      </div>
    </div>
  );
}

// ─── Inquiry modal (tourism / transport) ────────────────────────────────

function InquiryModal({
  kind,
  item,
  language,
  t,
  whatsapp,
  onClose,
}: {
  kind: "tourism" | "transport";
  item: ListItem;
  language: "en" | "ar";
  t: (en: string, ar: string) => string;
  whatsapp: string;
  onClose: () => void;
}) {
  const isAr = language === "ar";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whenStr, setWhenStr] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const kindLabel = kind === "tourism" ? t("tourism package", "باقة سياحية") : t("transport", "نقل");

  const buildUrl = useMemo(() => {
    const lines = isAr
      ? [
          `مرحبًا — أود الاستفسار عن ${kindLabel}.`,
          "",
          `الخدمة: ${item.title.ar}`,
          `المدة: ${item.duration.ar}`,
          `السعر التقريبي: $${item.priceUsd}`,
          "",
          `الاسم: ${name}`,
          `الهاتف: ${phone}`,
          whenStr ? `التاريخ المفضّل: ${whenStr}` : null,
          `عدد الأشخاص: ${partySize}`,
          notes ? `ملاحظات: ${notes}` : null,
        ]
      : [
          `Hello — I'd like to inquire about a ${kindLabel}.`,
          "",
          `Service: ${item.title.en}`,
          `Duration: ${item.duration.en}`,
          `Indicative price: $${item.priceUsd}`,
          "",
          `Name: ${name}`,
          `Phone: ${phone}`,
          whenStr ? `Preferred date: ${whenStr}` : null,
          `Party size: ${partySize}`,
          notes ? `Notes: ${notes}` : null,
        ];
    const msg = lines.filter(Boolean).join("\n");
    return `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
  }, [item, name, phone, whenStr, partySize, notes, whatsapp, isAr, kindLabel]);

  const canSubmit = name.trim() && phone.trim();

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
      style={{ background: "rgba(20, 12, 30, 0.78)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
      dir={isAr ? "rtl" : "ltr"}
    >
      <div
        className="relative max-h-[92svh] w-full max-w-[640px] overflow-y-auto rounded-t-3xl sm:rounded-2xl"
        style={{ background: "var(--color-ivory)", color: "var(--color-charcoal)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4"
          style={{ background: "var(--color-ivory)", borderColor: "var(--color-line)" }}
        >
          <div>
            <div className={`text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-gold)" }}>
              {kind === "tourism" ? t("Tourism", "السياحة") : t("Transportation", "النقل")}
            </div>
            <div className={`mt-1 font-display text-[22px] ${isAr ? "font-arabic" : ""}`}>
              {item.title[language]}
            </div>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "var(--color-bone)" }} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="px-6 py-6">
          <div
            className="rounded-lg p-4"
            style={{ background: "var(--color-bone-soft)", border: "1px solid var(--color-line)" }}
          >
            <div className={`text-[10px] font-medium uppercase tracking-[0.32em] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-gold)" }}>
              {item.duration[language]} · ${item.priceUsd} {t("from", "من")}
            </div>
            <p className={`mt-3 text-[13px] leading-[1.85] ${isAr ? "font-arabic" : ""}`} style={{ color: "var(--color-stone)" }}>
              {item.description[language]}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label={t("Your name", "اسمك")}>
              <Input value={name} onChange={setName} />
            </Field>
            <Field label={t("Phone", "الهاتف")}>
              <Input type="tel" value={phone} onChange={setPhone} placeholder="+249 ..." />
            </Field>
            <Field label={t("Preferred date", "التاريخ المفضّل")}>
              <Input type="date" value={whenStr} onChange={setWhenStr} />
            </Field>
            <Field label={t("Party size", "عدد الأشخاص")}>
              <Input
                type="number"
                value={String(partySize)}
                onChange={(v) => setPartySize(Math.max(1, Math.min(20, Number(v) || 1)))}
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label={t("Notes (optional)", "ملاحظات (اختياري)")}>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder={t("dietary needs, accessibility, time preference…", "احتياجات غذائية، إمكانية الوصول، توقيت مفضّل…")}
                className="mt-1.5 w-full rounded-md px-3 py-2 text-[14px] outline-none"
                style={{ border: "1px solid var(--color-line)", background: "var(--color-ivory)", color: "var(--color-charcoal)" }}
              />
            </Field>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onClose}
              className={`btn-ghost flex-1 justify-center ${isAr ? "font-arabic" : ""}`}
              type="button"
            >
              {t("Cancel", "إلغاء")}
            </button>
            <a
              href={canSubmit ? buildUrl : undefined}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                if (!canSubmit) e.preventDefault();
              }}
              className={`btn-primary flex-1 justify-center ${isAr ? "font-arabic" : ""}`}
              style={{ opacity: canSubmit ? 1 : 0.5, pointerEvents: canSubmit ? "auto" : "none" }}
            >
              {t("Send via WhatsApp", "إرسال عبر واتساب")}
              <span aria-hidden>{isAr ? "←" : "→"}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Tiny form helpers ──────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-gold)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

function Input({
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1.5 w-full rounded-md px-3 py-2 text-[14px] outline-none"
      style={{ border: "1px solid var(--color-line)", background: "var(--color-ivory)", color: "var(--color-charcoal)" }}
    />
  );
}
