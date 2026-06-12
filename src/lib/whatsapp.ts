// WhatsApp is the single handover channel for the property.
// Every "reserve / book / enquire" CTA and the AI concierge funnel the guest
// here — straight into a chat with the front office, message pre-filled.

export const HOTEL_WHATSAPP = "+249965105555";

const DEFAULT_MSG_EN =
  "Marhaba — I'd like to enquire about a stay at Prince Plaza Kassala.";
const DEFAULT_MSG_AR =
  "مرحبًا — أرغب في الاستفسار عن الإقامة في برنس بلازا كسلا.";

// Build a wa.me deep link with an optional pre-filled message.
export function whatsappLink(message?: string, phone: string = HOTEL_WHATSAPP): string {
  const digits = phone.replace(/\D/g, "");
  const text = message ?? DEFAULT_MSG_EN;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

// Pre-computed default links — safe to use as constant hrefs in server or
// client components.
export const WHATSAPP_URL = whatsappLink();
export const WHATSAPP_URL_AR = whatsappLink(DEFAULT_MSG_AR);
