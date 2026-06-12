"use client";

import { useEffect } from "react";
import { whatsappLink, WHATSAPP_URL } from "@/lib/whatsapp";
import { useI18n } from "@/lib/i18n";

// Global handover. Any CTA across the site dispatches `pb:open-reservation`;
// we catch it here and open WhatsApp with a language-appropriate, pre-filled
// message. This replaces the old multi-step booking modal — there is no
// on-site reservation flow any more, only the handover to the front office.
export function WhatsAppReserve() {
  const { language } = useI18n();
  const isAr = language === "ar";

  useEffect(() => {
    const open = () => {
      const url = isAr
        ? whatsappLink("مرحبًا — أرغب في حجز إقامة في برنس بلازا كسلا.")
        : WHATSAPP_URL;
      window.open(url, "_blank", "noopener,noreferrer");
    };
    window.addEventListener("pb:open-reservation", open);
    return () => window.removeEventListener("pb:open-reservation", open);
  }, [isAr]);

  return null;
}
