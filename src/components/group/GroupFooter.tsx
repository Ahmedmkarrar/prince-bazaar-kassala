import Link from "next/link";
import { GROUP, SECTORS } from "@/lib/group";

export function GroupFooter() {
  return (
    <footer
      className="relative px-6 py-20 lg:px-12 lg:py-28"
      style={{ background: "var(--color-charcoal)", color: "var(--color-gold-pale)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[28px] tracking-[0.02em]">Shahad</span>
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "var(--color-gold)" }}
              >
                Group
              </span>
            </div>
            <p
              className="mt-6 max-w-md text-[14px] leading-[1.85]"
              style={{ color: "rgba(239,224,191,0.65)" }}
            >
              {GROUP.description} A reputation built on consistent performance, not on advertising.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/shahad/contact" className="btn-gold">Inquire</Link>
              <Link
                href="/shahad/about"
                className="btn-ghost"
                style={{ borderColor: "rgba(239,224,191,0.35)", color: "var(--color-gold-pale)" }}
              >
                About the Group
              </Link>
            </div>
          </div>

          <FooterCol title="Sectors">
            {SECTORS.map((s) => (
              <FooterLink key={s.id} href={s.href}>
                {s.short}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Group">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/about#leadership">Leadership</FooterLink>
            <FooterLink href="/about#reconstruction">Reconstruction</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterCol>

          <FooterCol title="Contact">
            <FooterLink>{GROUP.contact.phone}</FooterLink>
            <FooterLink>{GROUP.contact.email}</FooterLink>
            {GROUP.contact.addresses.map((a) => (
              <FooterLink key={a.label}>{a.label}</FooterLink>
            ))}
          </FooterCol>
        </div>

        <div
          className="mt-16 flex flex-col items-start justify-between gap-6 border-t pt-8 text-[11px] sm:flex-row sm:items-center"
          style={{ borderColor: "rgba(239,224,191,0.18)", color: "rgba(239,224,191,0.55)" }}
        >
          <span>© {new Date().getFullYear()} Shahad Group · All rights reserved.</span>
          <span
            className="font-medium uppercase tracking-[0.32em]"
            style={{ color: "rgba(239,224,191,0.4)" }}
          >
            Construction · Real Estate · Hospitality
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="sm:col-span-1 lg:col-span-2">
      <div
        className="text-[10px] font-medium uppercase tracking-[0.32em]"
        style={{ color: "var(--color-gold)" }}
      >
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
        <Link
          href={href}
          className="text-[13px] transition-colors hover:text-[var(--color-gold-soft)]"
          style={{ color: "rgba(239,224,191,0.7)" }}
        >
          {children}
        </Link>
      </li>
    );
  }
  return (
    <li className="text-[13px]" style={{ color: "rgba(239,224,191,0.7)" }}>
      {children}
    </li>
  );
}
