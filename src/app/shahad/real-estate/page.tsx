import Link from "next/link";
import type { Metadata } from "next";
import { GroupNav } from "@/components/group/GroupNav";
import { GroupFooter } from "@/components/group/GroupFooter";
import { SectorHero } from "@/components/group/SectorHero";

export const metadata: Metadata = {
  title: "Shahad Real Estate",
  description:
    "A family-owned real estate firm with a quiet record of stewardship in Khartoum. Premium property development and institutional management for diplomatic and corporate partners.",
};

const PRACTICES = [
  {
    eyebrow: "01",
    title: "Premium Development",
    body:
      "Ground-up residential and commercial development in Khartoum's most considered neighbourhoods — designed for longevity, built with the group's own construction division.",
  },
  {
    eyebrow: "02",
    title: "Institutional Property Management",
    body:
      "Active management of a private portfolio of premier buildings on behalf of long-term partners. Owner-eye oversight on every detail, from compliance to upkeep.",
  },
  {
    eyebrow: "03",
    title: "Portfolio Stewardship",
    body:
      "Years of patient stewardship. We grow the portfolio carefully and discreetly, prioritising quality and partnership over volume.",
  },
];

const CLIENTS = [
  {
    title: "Diplomatic Missions & Embassies",
    body:
      "Secure, high-standard residences and offices for missions that require discretion, reliability, and a single accountable point of contact.",
  },
  {
    title: "International Organisations",
    body:
      "Turnkey premises for NGOs, UN agencies, and multinational entities — ready for occupancy, with operational support tailored to long-term missions.",
  },
  {
    title: "Corporate Partners",
    body:
      "Bespoke arrangements for established businesses and institutions building a serious base in Khartoum.",
  },
];

export default function RealEstatePage() {
  return (
    <main style={{ background: "var(--color-ivory)" }}>
      <GroupNav />
      <SectorHero
        eyebrow="Shahad Real Estate"
        title="A legacy of trust, quietly built."
        subtitle="Our family-owned firm has quietly stewarded a portfolio of premier buildings in Khartoum. No advertising. No billboards. Just consistent performance and the word of partners who have stayed with us."
        image="/sectors/real-estate.jpeg"
      />

      <Approach />
      <Practices />
      <Clients />
      <Cta />
      <GroupFooter />
    </main>
  );
}

function Approach() {
  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="hairline" />
            <span className="eyebrow">Our Approach</span>
          </div>
          <h2
            className="font-display mt-6 text-[36px] leading-[1.1] sm:text-[44px] lg:text-[52px]"
            style={{ color: "var(--color-charcoal)" }}
          >
            Reputation is our marketing. Quality is our currency.
          </h2>
        </div>
        <div className="lg:col-span-7">
          <div className="space-y-6 text-[16px] leading-[1.9]" style={{ color: "var(--color-stone)" }}>
            <p>
              Real estate in Khartoum demands more than a portfolio — it demands judgment. The
              right building in the right neighbourhood for the right partner is the work; the
              portfolio is the consequence.
            </p>
            <p>
              As a family business, we offer a level of personal oversight that larger
              corporations cannot replicate. Every property in our portfolio is held to the
              same standard. Every partnership is treated as long-term by default.
            </p>
            <p style={{ color: "var(--color-charcoal)", fontWeight: 500 }}>
              For sensitive enquiries — diplomatic, institutional, or corporate — please
              contact us directly. We do not list our portfolio publicly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Practices() {
  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32" style={{ background: "var(--color-bone-soft)" }}>
      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="hairline" />
            <span className="eyebrow">What We Do</span>
            <span className="hairline" style={{ transform: "scaleX(-1)" }} />
          </div>
          <h2
            className="font-display mt-6 text-[34px] leading-[1.1] sm:text-[42px]"
            style={{ color: "var(--color-charcoal)" }}
          >
            Three disciplines, one standard.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {PRACTICES.map((p) => (
            <div
              key={p.eyebrow}
              className="bg-[var(--color-ivory)] p-10"
              style={{ border: "1px solid var(--color-line)" }}
            >
              <div className="font-display text-[40px]" style={{ color: "var(--color-gold)" }}>
                {p.eyebrow}
              </div>
              <h3
                className="font-display mt-3 text-[24px] leading-[1.2]"
                style={{ color: "var(--color-charcoal)" }}
              >
                {p.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.85]" style={{ color: "var(--color-stone)" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="hairline" />
              <span className="eyebrow">Who We Serve</span>
            </div>
            <h2
              className="font-display mt-6 text-[32px] leading-[1.1] sm:text-[40px]"
              style={{ color: "var(--color-charcoal)" }}
            >
              The trusted choice for those who can&apos;t afford to choose wrong.
            </h2>
          </div>
          <div className="space-y-6 lg:col-span-8">
            {CLIENTS.map((c) => (
              <div
                key={c.title}
                className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-baseline sm:gap-12"
                style={{ borderColor: "var(--color-line)" }}
              >
                <h3
                  className="font-display text-[22px] leading-[1.2] sm:w-1/3"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  {c.title}
                </h3>
                <p className="text-[14px] leading-[1.85] sm:flex-1" style={{ color: "var(--color-stone)" }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section
      className="px-6 py-20 lg:px-12 lg:py-28"
      style={{ background: "var(--color-royal-deep)", color: "var(--color-gold-pale)" }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <span className="eyebrow" style={{ color: "var(--color-gold-soft)" }}>Private enquiries</span>
          <h2
            className="font-display mt-4 text-[32px] leading-[1.1] sm:text-[40px]"
            style={{ color: "#FFFCF5" }}
          >
            Looking for a serious property in Khartoum?
          </h2>
          <p className="mt-4 max-w-xl text-[14px] leading-[1.9]" style={{ color: "rgba(239,224,191,0.75)" }}>
            All enquiries are handled directly and discreetly. We respond within two business
            days with a brief tailored to your needs.
          </p>
        </div>
        <Link
          href="/shahad/contact"
          className="btn-gold"
          style={{ background: "linear-gradient(135deg, #EFE0BF 0%, #D4A861 100%)" }}
        >
          Contact Shahad Real Estate
        </Link>
      </div>
    </section>
  );
}
