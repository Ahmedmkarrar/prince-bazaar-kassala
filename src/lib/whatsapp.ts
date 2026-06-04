// Builds a WhatsApp deep link with a pre-filled booking handover message.
// Staff receives the full booking detail on their phone the moment the guest taps.

import type { Booking, Hotel } from "./data";

export function whatsappLink(phoneE164: string, message: string): string {
  const digits = phoneE164.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${encoded}`;
}

export function bookingMessage(
  booking: Booking,
  hotel: Hotel,
  language: "en" | "ar",
): string {
  if (language === "ar") return bookingMessageAr(booking, hotel);
  return bookingMessageEn(booking, hotel);
}

function fmtDate(iso: string, language: "en" | "ar"): string {
  const d = new Date(iso);
  const locale = language === "ar" ? "ar-EG" : "en-GB";
  return d.toLocaleDateString(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function bookingMessageEn(b: Booking, h: Hotel): string {
  const lines: string[] = [];
  lines.push(`Marhaba — I'd like to book ${h.name.en}.`);
  lines.push("");
  lines.push(`Reference: ${b.reference}`);
  lines.push("");
  lines.push(`Name: ${b.guestName}`);
  lines.push(`Email: ${b.guestEmail}`);
  lines.push(`Phone: ${b.guestPhone}`);
  lines.push("");
  lines.push(`Check-in:  ${fmtDate(b.checkIn, "en")}`);
  lines.push(`Check-out: ${fmtDate(b.checkOut, "en")}`);
  lines.push(`Nights: ${b.nights}    Guests: ${b.guests}`);
  lines.push("");
  lines.push(`Room: ${b.roomTypeId}`);
  if (b.addons.length > 0) {
    lines.push("");
    lines.push("Add-ons requested:");
    for (const a of b.addons) {
      lines.push(`  · ${a.name}`);
    }
  }
  lines.push("");
  lines.push("Rate: to be confirmed by our reservations team.");
  if (b.specialRequests) {
    lines.push("");
    lines.push(`Special requests: ${b.specialRequests}`);
  }
  lines.push("");
  lines.push(`Submitted from ${h.name.en} website.`);
  return lines.join("\n");
}

function bookingMessageAr(b: Booking, h: Hotel): string {
  const lines: string[] = [];
  lines.push(`مرحبًا — أرغب في الحجز في ${h.name.ar}.`);
  lines.push("");
  lines.push(`المرجع: ${b.reference}`);
  lines.push("");
  lines.push(`الاسم: ${b.guestName}`);
  lines.push(`البريد: ${b.guestEmail}`);
  lines.push(`الهاتف: ${b.guestPhone}`);
  lines.push("");
  lines.push(`تاريخ الوصول: ${fmtDate(b.checkIn, "ar")}`);
  lines.push(`تاريخ المغادرة: ${fmtDate(b.checkOut, "ar")}`);
  lines.push(`الليالي: ${b.nights}    الضيوف: ${b.guests}`);
  lines.push("");
  lines.push(`الغرفة: ${b.roomTypeId}`);
  if (b.addons.length > 0) {
    lines.push("");
    lines.push("الإضافات المطلوبة:");
    for (const a of b.addons) {
      lines.push(`  · ${a.name}`);
    }
  }
  lines.push("");
  lines.push("السعر: سيؤكده فريق الحجوزات.");
  if (b.specialRequests) {
    lines.push("");
    lines.push(`طلبات خاصة: ${b.specialRequests}`);
  }
  lines.push("");
  lines.push(`أُرسل من موقع ${h.name.ar}.`);
  return lines.join("\n");
}

