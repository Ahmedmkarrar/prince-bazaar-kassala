import type { Metadata } from "next";
import { GroupNav } from "@/components/group/GroupNav";
import { GroupFooter } from "@/components/group/GroupFooter";
import { GROUP, SECTORS } from "@/lib/group";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Shahad Group directly. Construction, real estate, hospitality — every enquiry receives a written response within two business days.",
};

export default function ContactPage() {
  return (
    <main style={{ background: "var(--color-ivory)" }}>
      <GroupNav variant="solid" />
      <div className="h-20" />

      <section className="px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="hairline" />
                <span className="eyebrow">Get in touch</span>
              </div>
              <h1
                className="font-display mt-6 text-[44px] leading-[1.05] tracking-[-0.01em] sm:text-[58px] lg:text-[72px]"
                style={{ color: "var(--color-charcoal)" }}
              >
                Contact Shahad Group.
              </h1>
              <p className="mt-6 max-w-md text-[16px] leading-[1.85]" style={{ color: "var(--color-stone)" }}>
                Every enquiry — construction, real estate, hospitality, or general — receives
                a written response within two business days.
              </p>

              <div className="mt-12 space-y-8">
                <div>
                  <div
                    className="text-[10px] font-medium uppercase tracking-[0.32em]"
                    style={{ color: "var(--color-gold)" }}
                  >
                    Email
                  </div>
                  <a
                    href={`mailto:${GROUP.contact.email}`}
                    className="font-display mt-2 block text-[22px] transition-colors hover:text-[var(--color-royal-deep)]"
                    style={{ color: "var(--color-charcoal)" }}
                  >
                    {GROUP.contact.email}
                  </a>
                </div>

                <div>
                  <div
                    className="text-[10px] font-medium uppercase tracking-[0.32em]"
                    style={{ color: "var(--color-gold)" }}
                  >
                    Phone
                  </div>
                  <div
                    className="font-display mt-2 text-[22px]"
                    style={{ color: "var(--color-charcoal)" }}
                  >
                    {GROUP.contact.phone}
                  </div>
                </div>

                <div>
                  <div
                    className="text-[10px] font-medium uppercase tracking-[0.32em]"
                    style={{ color: "var(--color-gold)" }}
                  >
                    Offices
                  </div>
                  <ul className="mt-3 space-y-2">
                    {GROUP.contact.addresses.map((a) => (
                      <li key={a.label} className="text-[15px]" style={{ color: "var(--color-charcoal)" }}>
                        <span className="font-display text-[18px]">{a.label}</span>
                        <span
                          className="ml-3 text-[11px] font-medium uppercase tracking-[0.28em]"
                          style={{ color: "var(--color-mist)" }}
                        >
                          {a.line}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm sectors={SECTORS.map((s) => ({ id: s.id, name: s.short }))} />
            </div>
          </div>
        </div>
      </section>

      <GroupFooter />
    </main>
  );
}
