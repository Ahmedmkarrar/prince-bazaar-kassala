import Image from "next/image";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative px-6 py-20 lg:px-12 lg:py-28"
      style={{ background: "var(--color-charcoal)", color: "var(--color-gold-pale)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo variant="light" />
            <p className="mt-6 max-w-sm text-[14px] leading-[1.8]" style={{ color: "rgba(239,224,191,0.65)" }}>
              A pioneering six-complex destination at the foot of the Taka Mountains. A Shahad Group destination, redefining hospitality across Eastern Sudan.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="#book" className="btn-gold">Reserve</a>
              <a href="#concierge" className="btn-ghost" style={{ borderColor: "rgba(239,224,191,0.35)", color: "var(--color-gold-pale)" }}>
                Ask AI
              </a>
            </div>
          </div>

          <FooterCol title="Discover">
            <FooterLink href="#story">Our Story</FooterLink>
            <FooterLink href="#complex">The Complex</FooterLink>
            <FooterLink href="#tourism">Tourism</FooterLink>
            <FooterLink href="#book">Reservations</FooterLink>
          </FooterCol>

          <FooterCol title="Stay">
            <FooterLink href="#suites">Royal Suite</FooterLink>
            <FooterLink href="#suites">Presidential</FooterLink>
            <FooterLink href="#availability">Availability</FooterLink>
            <FooterLink href="#conference">Conference</FooterLink>
          </FooterCol>

          <FooterCol title="Contact">
            <FooterLink>+249 ●●● ●●● ●●●</FooterLink>
            <FooterLink>reservations@princeplaza.sd</FooterLink>
            <FooterLink>events@princeplaza.sd</FooterLink>
            <FooterLink>Kassala, Eastern Sudan</FooterLink>
          </FooterCol>
        </div>

        <div
          className="mt-16 flex flex-col items-start justify-between gap-6 border-t pt-8 text-[11px] sm:flex-row sm:items-center"
          style={{ borderColor: "rgba(239,224,191,0.18)", color: "rgba(239,224,191,0.55)" }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] font-medium uppercase tracking-[0.42em]"
              style={{ color: "rgba(239,224,191,0.5)" }}
            >
              A Destination of
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
            <span className="font-display" style={{ color: "rgba(239,224,191,0.85)", fontSize: "14px", letterSpacing: "0.08em" }}>
              Shahad Group
            </span>
          </div>
          <div className="flex flex-col items-start gap-1 sm:items-end">
            <span>© {new Date().getFullYear()} Shahad Group · All rights reserved.</span>
            <span className="font-medium uppercase tracking-[0.28em]" style={{ color: "rgba(239,224,191,0.4)" }}>
              Construction · Real Estate · Hospitality
            </span>
          </div>
        </div>

        <div
          className="mt-8 border-t pt-6 text-[10px] leading-[1.7] sm:flex sm:items-start sm:justify-between sm:gap-8"
          style={{ borderColor: "rgba(239,224,191,0.12)", color: "rgba(239,224,191,0.4)" }}
        >
          <span className="font-medium uppercase tracking-[0.32em]">Image credits</span>
          <span className="mt-2 block sm:mt-0 sm:max-w-3xl sm:text-right">
            All photography supplied by Prince Plaza Kassala.
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="sm:col-span-1 lg:col-span-2">
      <div className="text-[10px] font-medium uppercase tracking-[0.32em]" style={{ color: "var(--color-gold)" }}>
        {title}
      </div>
      <ul className="mt-5 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({ children, href }: { children: React.ReactNode; href?: string }) {
  if (href) {
    return (
      <li>
        <a href={href} className="text-[13px] transition-colors hover:text-[var(--color-gold-soft)]" style={{ color: "rgba(239,224,191,0.7)" }}>
          {children}
        </a>
      </li>
    );
  }
  return (
    <li className="text-[13px]" style={{ color: "rgba(239,224,191,0.7)" }}>
      {children}
    </li>
  );
}
