"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useI18n } from "@/lib/i18n";

type Category = "stay" | "conference" | "event";
type RoomChoice = "royal" | "presidential" | "either" | null;
type ConferenceChoice = "atbara" | "gash" | "either" | null;

interface FormState {
  category: Category;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomChoice: RoomChoice;
  conferenceChoice: ConferenceChoice;
  layout: string;
  addons: string[];
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ADDONS = [
  { id: "airport-transfer", label: "Airport Transfer · Khartoum", priceUSD: 320 },
  { id: "kassala-transfer", label: "Airport Transfer · Kassala", priceUSD: 60 },
  { id: "mountain-sunrise", label: "Sunrise Tour of the Taka Mountains", priceUSD: 240 },
  { id: "cultural-walk", label: "Old Kassala Cultural Walk", priceUSD: 180 },
  { id: "private-chef", label: "Private Chef's Table", priceUSD: 380 },
  { id: "hammam", label: "Traditional Hammam Ritual", priceUSD: 180 },
  { id: "oud-evening", label: "Live Oud at Dinner", priceUSD: 280 },
];

const TOTAL_STEPS = 5;

const INITIAL: FormState = {
  category: "stay",
  checkIn: "",
  checkOut: "",
  guests: 2,
  roomChoice: null,
  conferenceChoice: null,
  layout: "",
  addons: [],
  name: "",
  email: "",
  phone: "",
  message: "",
};

function todayPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function ReservationModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);
  const { t, format, currency } = useI18n();

  useEffect(() => {
    const onOpen = () => {
      setForm({ ...INITIAL, checkIn: todayPlus(7), checkOut: todayPlus(10) });
      setStep(0);
      setReference(null);
      setOpen(true);
    };
    window.addEventListener("pb:open-reservation", onOpen);
    return () => window.removeEventListener("pb:open-reservation", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function next() {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else void submit();
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  async function submit() {
    if (!form.name || !form.email) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          category: form.category,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          guests: form.guests,
          conferenceRoom: form.conferenceChoice ?? undefined,
          addons: form.addons,
          message:
            form.message ||
            `Multi-step reservation. Room preference: ${form.roomChoice ?? "n/a"}. Layout: ${form.layout || "n/a"}. Add-ons: ${form.addons.join(", ") || "none"}.`,
        }),
      });
      const data = await res.json();
      setReference(data.reference ?? "PB-XXXXXX");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  const canAdvance = (() => {
    if (reference) return true;
    if (step === 0) return !!form.category;
    if (step === 1) return !!form.checkIn && !!form.checkOut && form.guests > 0;
    if (step === 2) return form.category === "stay" ? form.roomChoice !== null : form.conferenceChoice !== null;
    if (step === 3) return true;
    if (step === 4) return !!form.name && !!form.email;
    return false;
  })();

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6"
      style={{ background: "rgba(15, 8, 28, 0.78)", backdropFilter: "blur(8px)" }}
      data-no-smooth
      onClick={() => setOpen(false)}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-[1080px] overflow-hidden rounded-sm shadow-2xl"
        style={{ background: "var(--color-ivory)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left side — visual */}
        <div className="hidden lg:flex lg:w-[42%] flex-col" style={{ background: "var(--color-royal-deep)" }}>
          <div className="relative flex-1 overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1500964757637-229ea73306fc?w=1600&q=85&auto=format&fit=crop)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(59, 22, 96, 0.5) 0%, rgba(15, 8, 28, 0.92) 100%)",
              }}
            />
            <div className="relative flex h-full flex-col justify-between p-10">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full" style={{ background: "linear-gradient(135deg, #FBF8F1 0%, #E5E0D2 100%)" }}>
                  <Image
                    src="/logos/princebazaar.jpeg"
                    alt="Prince Bazaar"
                    width={40}
                    height={40}
                    style={{ objectFit: "contain", width: "120%", height: "120%" }}
                  />
                </div>
                <div className="leading-tight" style={{ color: "#FFFFFF" }}>
                  <div className="font-display" style={{ fontSize: "15px", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>
                    Prince Bazaar
                  </div>
                  <div className="text-[9px] font-medium uppercase" style={{ letterSpacing: "0.42em", color: "#E9C77B" }}>
                    Kassala
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-medium uppercase tracking-[0.42em]" style={{ color: "rgba(233, 199, 123, 0.85)" }}>
                  {t("Reserve Your Stay", "احجز إقامتك")}
                </div>
                <h2
                  className="mt-4 font-display tracking-[-0.01em]"
                  style={{ color: "#FFFFFF", fontSize: "40px", lineHeight: 1.05, fontWeight: 400 }}
                >
                  {t("A few quiet questions, and your arrival begins.", "أسئلة قليلة هادئة، ووصولك يبدأ.")}
                </h2>
                <p className="mt-5 text-[13px] leading-[1.8]" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {t(
                    "Each step takes a moment. Your details go directly to our reservations team, who reply within four hours with a tailored proposal.",
                    "كل خطوة تستغرق لحظة. تذهب تفاصيلك مباشرة إلى فريق الحجوزات الذي يرد خلال أربع ساعات بعرض مخصص.",
                  )}
                </p>
              </div>

              {!reference ? (
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {t("Step", "خطوة")} {step + 1} / {TOTAL_STEPS}
                  </div>
                  <div className="mt-3 flex gap-2">
                    {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                      <span
                        key={i}
                        className="h-px flex-1 transition-all"
                        style={{
                          background: i <= step ? "#E9C77B" : "rgba(255,255,255,0.2)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Right side — form */}
        <div className="relative flex flex-1 flex-col overflow-y-auto">
          <button
            onClick={() => setOpen(false)}
            className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-stone-100"
            style={{ color: "var(--color-charcoal)" }}
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          <div className="flex-1 px-8 py-12 sm:px-12 sm:py-14">
            {reference ? (
              <SuccessPanel reference={reference} name={form.name} t={t} />
            ) : (
              <>
                {step === 0 ? <StepCategory form={form} update={update} t={t} /> : null}
                {step === 1 ? <StepDates form={form} update={update} t={t} /> : null}
                {step === 2 ? <StepRoom form={form} update={update} t={t} /> : null}
                {step === 3 ? <StepAddons form={form} update={update} t={t} format={format} /> : null}
                {step === 4 ? <StepContact form={form} update={update} t={t} /> : null}
              </>
            )}
          </div>

          {!reference ? (
            <div
              className="flex items-center justify-between border-t px-8 py-5 sm:px-12"
              style={{ borderColor: "var(--color-line)" }}
            >
              <button
                onClick={back}
                disabled={step === 0}
                className="text-[11px] font-medium uppercase tracking-[0.22em] disabled:opacity-30"
                style={{ color: "var(--color-stone)" }}
              >
                ← {t("Back", "رجوع")}
              </button>
              <div className="flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: "var(--color-mist)" }}>
                <span>{currency}</span>
                <span className="h-3 w-px" style={{ background: "var(--color-line)" }} />
                <span>{step + 1} / {TOTAL_STEPS}</span>
              </div>
              <button
                onClick={next}
                disabled={!canAdvance || submitting}
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[11px] font-medium uppercase tracking-[0.22em] disabled:opacity-40"
                style={{ background: "var(--color-royal-deep)", color: "var(--color-gold-pale)" }}
              >
                {submitting
                  ? t("Sending…", "جارٍ الإرسال…")
                  : step === TOTAL_STEPS - 1
                  ? t("Submit Inquiry", "إرسال الطلب")
                  : t("Continue", "متابعة")}
                <span aria-hidden>→</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function StepCategory({
  form,
  update,
  t,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  t: (en: string, ar: string) => string;
}) {
  const options: { id: Category; en: string; ar: string; sub: string; subAr: string }[] = [
    { id: "stay", en: "A Stay", ar: "إقامة", sub: "Royal or Presidential Suite", subAr: "جناح ملكي أو رئاسي" },
    { id: "conference", en: "A Conference", ar: "مؤتمر", sub: "Atbara or Gash Room", subAr: "قاعة عطبرة أو القاش" },
    { id: "event", en: "An Event", ar: "مناسبة", sub: "Wedding, reception, celebration", subAr: "حفل زفاف، استقبال، احتفال" },
  ];
  return (
    <div>
      <Eyebrow>{t("Step One · The Occasion", "الخطوة الأولى · المناسبة")}</Eyebrow>
      <Heading>{t("What brings you to Kassala?", "ما الذي يجلبك إلى كسلا؟")}</Heading>
      <div className="mt-10 space-y-3">
        {options.map((o) => {
          const active = form.category === o.id;
          return (
            <button
              key={o.id}
              onClick={() => update("category", o.id)}
              className="block w-full rounded-sm border p-5 text-left transition-all"
              style={{
                background: active ? "var(--color-royal-deep)" : "var(--color-bone-soft)",
                borderColor: active ? "var(--color-royal-deep)" : "var(--color-line)",
              }}
            >
              <div
                className="font-display"
                style={{
                  color: active ? "#FFFFFF" : "var(--color-charcoal)",
                  fontSize: "22px",
                  fontWeight: 400,
                }}
              >
                {t(o.en, o.ar)}
              </div>
              <div
                className="mt-1 text-[12px]"
                style={{ color: active ? "rgba(255,255,255,0.7)" : "var(--color-mist)" }}
              >
                {t(o.sub, o.subAr)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDates({
  form,
  update,
  t,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  t: (en: string, ar: string) => string;
}) {
  return (
    <div>
      <Eyebrow>{t("Step Two · The Dates", "الخطوة الثانية · التواريخ")}</Eyebrow>
      <Heading>{t("When would you like to arrive?", "متى تود الوصول؟")}</Heading>
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label={t("Arrival", "الوصول")}>
          <input type="date" value={form.checkIn} onChange={(e) => update("checkIn", e.target.value)} className="modal-input" />
        </Field>
        <Field label={t("Departure", "المغادرة")}>
          <input type="date" value={form.checkOut} onChange={(e) => update("checkOut", e.target.value)} className="modal-input" />
        </Field>
        <Field label={t("Guests / Headcount", "عدد الضيوف")} className="sm:col-span-2">
          <input
            type="number"
            min={1}
            max={500}
            value={form.guests}
            onChange={(e) => update("guests", parseInt(e.target.value) || 1)}
            className="modal-input"
          />
        </Field>
      </div>
      <ModalStyles />
    </div>
  );
}

function StepRoom({
  form,
  update,
  t,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  t: (en: string, ar: string) => string;
}) {
  if (form.category === "stay") {
    const options = [
      { id: "royal" as const, name: "Royal Suite", sub: "King · 65 m² · mountain view" },
      { id: "presidential" as const, name: "Presidential Suite", sub: "2 BR · 140 m² · panoramic" },
      { id: "either" as const, name: "Either", sub: "Recommend the right one for me" },
    ];
    return (
      <div>
        <Eyebrow>{t("Step Three · The Suite", "الخطوة الثالثة · الجناح")}</Eyebrow>
        <Heading>{t("Which suite calls to you?", "أي جناح يناديك؟")}</Heading>
        <div className="mt-10 space-y-3">
          {options.map((o) => {
            const active = form.roomChoice === o.id;
            return (
              <button
                key={o.id}
                onClick={() => update("roomChoice", o.id)}
                className="block w-full rounded-sm border p-5 text-left"
                style={{
                  background: active ? "var(--color-royal-deep)" : "var(--color-bone-soft)",
                  borderColor: active ? "var(--color-royal-deep)" : "var(--color-line)",
                }}
              >
                <div className="font-display" style={{ color: active ? "#FFFFFF" : "var(--color-charcoal)", fontSize: "20px" }}>{o.name}</div>
                <div className="mt-1 text-[12px]" style={{ color: active ? "rgba(255,255,255,0.7)" : "var(--color-mist)" }}>{o.sub}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  // conference / event
  const options = [
    { id: "atbara" as const, name: "The Atbara Room", sub: "Up to 100 reception · 80 theatre" },
    { id: "gash" as const, name: "The Gash Room", sub: "Up to 50 reception · 40 theatre" },
    { id: "either" as const, name: "Either", sub: "Recommend the right one" },
  ];
  return (
    <div>
      <Eyebrow>{t("Step Three · The Room", "الخطوة الثالثة · القاعة")}</Eyebrow>
      <Heading>{t("Which room suits the occasion?", "أي قاعة تناسب المناسبة؟")}</Heading>
      <div className="mt-10 space-y-3">
        {options.map((o) => {
          const active = form.conferenceChoice === o.id;
          return (
            <button
              key={o.id}
              onClick={() => update("conferenceChoice", o.id)}
              className="block w-full rounded-sm border p-5 text-left"
              style={{
                background: active ? "var(--color-royal-deep)" : "var(--color-bone-soft)",
                borderColor: active ? "var(--color-royal-deep)" : "var(--color-line)",
              }}
            >
              <div className="font-display" style={{ color: active ? "#FFFFFF" : "var(--color-charcoal)", fontSize: "20px" }}>{o.name}</div>
              <div className="mt-1 text-[12px]" style={{ color: active ? "rgba(255,255,255,0.7)" : "var(--color-mist)" }}>{o.sub}</div>
            </button>
          );
        })}
      </div>
      <Field label={t("Layout", "التصميم")} className="mt-8">
        <select value={form.layout} onChange={(e) => update("layout", e.target.value)} className="modal-input">
          <option value="">{t("Not yet decided", "لم يتم اتخاذ القرار بعد")}</option>
          <option value="theatre">Theatre</option>
          <option value="boardroom">Boardroom</option>
          <option value="ushape">U-shape</option>
          <option value="reception">Reception</option>
        </select>
      </Field>
      <ModalStyles />
    </div>
  );
}

function StepAddons({
  form,
  update,
  t,
  format,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  t: (en: string, ar: string) => string;
  format: (usd: number) => string;
}) {
  const toggle = (id: string) => {
    update("addons", form.addons.includes(id) ? form.addons.filter((x) => x !== id) : [...form.addons, id]);
  };
  return (
    <div>
      <Eyebrow>{t("Step Four · The Extras", "الخطوة الرابعة · الإضافات")}</Eyebrow>
      <Heading>{t("What would make this perfect?", "ما الذي سيجعل هذا مثاليًا؟")}</Heading>
      <p className="mt-3 text-[13px]" style={{ color: "var(--color-mist)" }}>
        {t("Optional. Select any. We'll add them to your proposal.", "اختياري. حدد أيًا منها. سنضيفها إلى عرضك.")}
      </p>
      <div className="mt-8 space-y-2">
        {ADDONS.map((a) => {
          const checked = form.addons.includes(a.id);
          return (
            <button
              key={a.id}
              onClick={() => toggle(a.id)}
              className="flex w-full items-center justify-between rounded-sm border px-4 py-3 text-left transition-all"
              style={{
                background: checked ? "var(--color-royal-deep)" : "var(--color-ivory)",
                borderColor: checked ? "var(--color-royal-deep)" : "var(--color-line)",
                color: checked ? "#FFFFFF" : "var(--color-charcoal)",
              }}
            >
              <span className="flex items-center gap-3 text-[13px]">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full"
                  style={{ background: checked ? "#E9C77B" : "transparent", border: checked ? "none" : "1px solid var(--color-line)" }}
                >
                  {checked ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12 L10 17 L19 7" stroke="var(--color-royal-deep)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </span>
                {a.label}
              </span>
              <span className="text-[12px] font-medium uppercase tracking-[0.18em]" style={{ color: checked ? "#E9C77B" : "var(--color-mist)" }}>
                {format(a.priceUSD)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepContact({
  form,
  update,
  t,
}: {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  t: (en: string, ar: string) => string;
}) {
  return (
    <div>
      <Eyebrow>{t("Step Five · The Last Detail", "الخطوة الخامسة · التفصيل الأخير")}</Eyebrow>
      <Heading>{t("How may we reach you?", "كيف يمكننا الوصول إليك؟")}</Heading>
      <div className="mt-8 space-y-5">
        <Field label={t("Full name", "الاسم الكامل")}>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} className="modal-input" />
        </Field>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label={t("Email", "البريد الإلكتروني")}>
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="modal-input" />
          </Field>
          <Field label={t("Phone (optional)", "الهاتف (اختياري)")}>
            <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="modal-input" />
          </Field>
        </div>
        <Field label={t("Anything we should know?", "أي شيء يجب أن نعرفه؟")}>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder={t("Special requests, dietary needs, occasions to celebrate…", "طلبات خاصة، احتياجات غذائية، مناسبات للاحتفال...")}
            className="modal-input resize-none"
          />
        </Field>
      </div>
      <ModalStyles />
    </div>
  );
}

function SuccessPanel({ reference, name, t }: { reference: string; name: string; t: (en: string, ar: string) => string }) {
  const firstName = name.split(" ")[0] || t("guest", "ضيف");
  return (
    <div className="flex flex-col items-start gap-7 py-12">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: "var(--color-royal-deep)", color: "#E9C77B" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12 L10 17 L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div>
        <div className="text-[10px] font-medium uppercase tracking-[0.42em]" style={{ color: "var(--color-gold)" }}>
          {t("Inquiry received", "تم استلام الطلب")}
        </div>
        <h3 className="mt-3 font-display" style={{ fontSize: "40px", lineHeight: 1.05, fontWeight: 400 }}>
          {t(`Thank you, ${firstName}.`, `شكراً لك ${firstName}.`)}
        </h3>
        <p className="mt-5 max-w-md text-[15px] leading-[1.85]" style={{ color: "var(--color-stone)" }}>
          {t(
            "A reservations specialist will respond within four hours with a tailored proposal.",
            "سيقوم أخصائي الحجوزات بالرد خلال أربع ساعات بعرض مخصص.",
          )}
        </p>
        <div className="mt-6 inline-flex items-center gap-3 rounded-full border px-5 py-2.5" style={{ borderColor: "var(--color-line)" }}>
          <span className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-mist)" }}>
            {t("Reference", "المرجع")}
          </span>
          <span className="font-display" style={{ color: "var(--color-royal-deep)", fontSize: "16px" }}>{reference}</span>
        </div>
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-medium uppercase tracking-[0.42em]" style={{ color: "var(--color-gold)" }}>
      {children}
    </div>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-4 font-display tracking-[-0.01em]" style={{ color: "var(--color-charcoal)", fontSize: "clamp(28px, 3.4vw, 42px)", lineHeight: 1.1, fontWeight: 400 }}>
      {children}
    </h2>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-mist)" }}>
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function ModalStyles() {
  return (
    <style jsx global>{`
      .modal-input {
        width: 100%;
        background: var(--color-bone-soft);
        border: 1px solid var(--color-line);
        border-radius: 2px;
        padding: 0.85rem 1rem;
        font-size: 15px;
        color: var(--color-charcoal);
        font-family: var(--font-sans);
      }
      .modal-input:focus {
        outline: none;
        border-color: var(--color-royal-deep);
      }
    `}</style>
  );
}
