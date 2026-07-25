import Link from "next/link";
import type { Metadata } from "next";
import { GroupNav } from "@/components/group/GroupNav";
import { GroupFooter } from "@/components/group/GroupFooter";
import { SectorHero } from "@/components/group/SectorHero";

export const metadata: Metadata = {
  title: "Shahad Contracting & Construction",
  description:
    "Large-scale construction, residential housing, restoration of war-damaged buildings, and consultancy across Sudan's reconstruction era.",
};

const SERVICES = [
  {
    eyebrow: "01",
    title: "Large-Scale Commercial & Residential",
    body:
      "Corporate headquarters, apartment complexes, and mixed-use buildings delivered turnkey — on time and on budget. A complete in-house team of architects, engineers, and site managers.",
  },
  {
    eyebrow: "02",
    title: "Small-Scale Housing",
    body:
      "Modern, affordable, durable family homes designed for today's Sudanese market. Specialised plans, modular methods, accelerated delivery.",
  },
  {
    eyebrow: "03",
    title: "Restoration & Repair",
    body:
      "Precision structural repairs and renovations for war-damaged buildings — bringing them back safer, stronger, and better than before. Every assessment grounded in engineering, not guesswork.",
  },
  {
    eyebrow: "04",
    title: "Consultancy & Planning",
    body:
      "Professional oversight from blueprint to final brick. Feasibility, design coordination, procurement, and site supervision for owners who want experienced eyes on every stage.",
  },
];

const STRENGTHS = [
  {
    title: "The power of experience.",
    body:
      "A portfolio of completed buildings across Sudan. We know the terrain, the climate, the regulatory environment, and the labour market better than anyone — because we built our practice in it.",
  },
  {
    title: "Optimised for this moment.",
    body:
      "Our team is structured for the urgency of reconstruction. Faster mobilisation, tighter cost control, and a clear-eyed view of what's actually possible on the ground today.",
  },
  {
    title: "One team, every discipline.",
    body:
      "Architects, engineers, project managers, foremen, and skilled tradespeople — all under one roof. No subcontracted gaps, no coordination tax, no surprises.",
  },
];

export default function ConstructionPage() {
  return (
    <main style={{ background: "var(--color-ivory)" }}>
      <GroupNav />
      <SectorHero
        eyebrow="Shahad Contracting & Construction"
        title="Rebuilding the future of Sudan."
        subtitle="Sudanese roots. Professional rigor. Global standards. From high-rise landmarks to family homes, the same disciplined hand on every site."
        image="/sectors/construction.jpeg"
      />

      <Services />
      <Why />
      <PortfolioPlaceholder />
      <Cta />
      <GroupFooter />
    </main>
  );
}

function Services() {
  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="hairline" />
              <span className="eyebrow">Our Services</span>
            </div>
            <h2
              className="font-display mt-6 text-[34px] leading-[1.1] sm:text-[42px] lg:text-[48px]"
              style={{ color: "var(--color-charcoal)" }}
            >
              Built for the work this country needs now.
            </h2>
            <p className="mt-6 text-[15px] leading-[1.9]" style={{ color: "var(--color-stone)" }}>
              Four service lines, calibrated to the realities of Sudan&apos;s reconstruction era —
              from new builds to restoration and the planning that holds them together.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {SERVICES.map((s) => (
              <div key={s.eyebrow} className="luxe-card p-8" style={{ borderRadius: "2px" }}>
                <div className="font-display text-[40px]" style={{ color: "var(--color-gold)" }}>
                  {s.eyebrow}
                </div>
                <h3
                  className="font-display mt-3 text-[22px] leading-[1.2]"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.8]" style={{ color: "var(--color-stone)" }}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32" style={{ background: "var(--color-bone-soft)" }}>
      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="hairline" />
            <span className="eyebrow">Why Shahad</span>
            <span className="hairline" style={{ transform: "scaleX(-1)" }} />
          </div>
          <h2
            className="font-display mt-6 text-[34px] leading-[1.1] sm:text-[44px]"
            style={{ color: "var(--color-charcoal)" }}
          >
            The game has changed. We are ready for it.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {STRENGTHS.map((s) => (
            <div key={s.title} className="bg-[var(--color-ivory)] p-10" style={{ border: "1px solid var(--color-line)" }}>
              <h3
                className="font-display text-[24px] leading-[1.2]"
                style={{ color: "var(--color-charcoal)" }}
              >
                {s.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.85]" style={{ color: "var(--color-stone)" }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioPlaceholder() {
  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-end justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="hairline" />
              <span className="eyebrow">Portfolio</span>
            </div>
            <h2
              className="font-display mt-6 text-[34px] leading-[1.1] sm:text-[42px]"
              style={{ color: "var(--color-charcoal)" }}
            >
              A portfolio of buildings. One uncompromised standard.
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-[1.85]" style={{ color: "var(--color-stone)" }}>
            Selected projects available on request. Full portfolio photography is being prepared
            for publication — please reach out for a private brief tailored to your project type.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="relative aspect-[4/3] overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-bone) 0%, var(--color-bone-soft) 50%, var(--color-line) 100%)",
                border: "1px solid var(--color-line)",
              }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center text-[10px] font-medium uppercase tracking-[0.4em]"
                style={{ color: "var(--color-mist)" }}
              >
                Project {String(i).padStart(2, "0")} · Coming soon
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section
      className="px-6 py-20 lg:px-12 lg:py-28"
      style={{ background: "var(--color-charcoal)", color: "var(--color-gold-pale)" }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <span className="eyebrow" style={{ color: "var(--color-gold-soft)" }}>Start a project</span>
          <h2
            className="font-display mt-4 text-[32px] leading-[1.1] sm:text-[40px]"
            style={{ color: "#FFFCF5" }}
          >
            Have a build in mind? Let&apos;s scope it.
          </h2>
          <p className="mt-4 max-w-xl text-[14px] leading-[1.9]" style={{ color: "rgba(239,224,191,0.7)" }}>
            New construction, restoration, or consultancy — every brief is treated as singular.
            We respond within two business days with a written proposal and a clear path forward.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/shahad/contact" className="btn-gold">Request a Quote</Link>
        </div>
      </div>
    </section>
  );
}
