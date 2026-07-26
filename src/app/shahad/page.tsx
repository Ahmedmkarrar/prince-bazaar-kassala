import Image from "next/image";
import Link from "next/link";
import { GroupNav } from "@/components/group/GroupNav";
import { GroupFooter } from "@/components/group/GroupFooter";
import { SectorCard } from "@/components/group/SectorCard";
import { SECTORS, GROUP } from "@/lib/group";

export default function GroupHome() {
  return (
    <main id="main-content" style={{ background: "var(--color-ivory)" }}>
      <GroupNav />
      <HeroGroup />
      <Introduction />
      <SectorsGrid />
      <Reconstruction />
      <CEOMessage />
      <WhyPartner />
      <ContactBand />
      <GroupFooter />
    </main>
  );
}

function HeroGroup() {
  return (
    <section
      className="relative flex min-h-[100svh] items-end overflow-hidden"
      style={{ background: "var(--color-charcoal)" }}
    >
      <div className="absolute inset-0">
        <Image
          src="/sectors/shahad-group.jpeg"
          alt="Shahad Group"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.6 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,12,30,0.45) 0%, rgba(20,12,30,0.2) 30%, rgba(20,12,30,0.95) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-24 pt-40 lg:px-12 lg:pb-32 lg:pt-44">
        <div className="flex items-center gap-3">
          <span className="hairline" />
          <span className="eyebrow" style={{ color: "var(--color-gold-soft)" }}>
            {GROUP.tagline}
          </span>
        </div>
        <h1
          className="font-display mt-6 text-[48px] leading-[1.02] tracking-[-0.01em] sm:text-[68px] lg:text-[92px]"
          style={{ color: "#FFFCF5" }}
        >
          Welcome to <em className="not-italic" style={{ color: "var(--color-gold-soft)" }}>Shahad Group</em>.
        </h1>
        <p
          className="mt-8 max-w-2xl text-[16px] leading-[1.85] sm:text-[19px]"
          style={{ color: "rgba(255,252,245,0.85)" }}
        >
          A multi-disciplinary group with deep roots in Sudan. We build infrastructure,
          steward premium real estate, and host travellers across two of the country&apos;s
          most important regions — with a quiet, consistent commitment to quality.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link href="#sectors" className="btn-gold">Explore Sectors</Link>
          <Link
            href="/shahad/about"
            className="btn-ghost"
            style={{ borderColor: "rgba(255,252,245,0.35)", color: "#FFFCF5" }}
          >
            About the Group
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-8 right-6 z-10 hidden items-center gap-4 text-[10px] font-medium uppercase tracking-[0.42em] lg:flex lg:right-12"
        style={{ color: "rgba(255,252,245,0.5)" }}
      >
        Construction · Real Estate · Hospitality
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="hairline" />
            <span className="eyebrow">The Group</span>
          </div>
          <h2
            className="font-display mt-6 text-[36px] leading-[1.1] sm:text-[44px] lg:text-[54px]"
            style={{ color: "var(--color-charcoal)" }}
          >
            A reputation built on consistent performance — not on advertising.
          </h2>
        </div>
        <div className="lg:col-span-7">
          <div className="space-y-6 text-[16px] leading-[1.9]" style={{ color: "var(--color-stone)" }}>
            <p>
              Shahad Group operates across construction, real estate, and hospitality. From
              corporate headquarters and apartment complexes to family-run residences, from
              diplomatic-grade properties in Khartoum to integrated destinations in Kassala —
              the through-line is the same disciplined hand and the same uncompromising standard.
            </p>
            <p>
              As Sudan rebuilds, our role becomes both more practical and more meaningful: to
              put up structures that last, to host people who matter, and to invest in places
              that will define the country&apos;s next chapter.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
            <Stat number="4" label="Sectors under one group" />
            <Stat number="2" label="Sudanese regions of active operation" />
            <Stat number="1" label="Disciplined, family-led team" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-display text-[40px] leading-none" style={{ color: "var(--color-royal-deep)" }}>
        {number}
      </div>
      <div
        className="mt-2 text-[11px] font-medium uppercase leading-snug tracking-[0.22em]"
        style={{ color: "var(--color-mist)" }}
      >
        {label}
      </div>
    </div>
  );
}

function SectorsGrid() {
  return (
    <section id="sectors" className="px-6 py-24 lg:px-12 lg:py-32" style={{ background: "var(--color-bone-soft)" }}>
      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="hairline" />
            <span className="eyebrow">Our Sectors</span>
            <span className="hairline" style={{ transform: "scaleX(-1)" }} />
          </div>
          <h2
            className="font-display mt-6 text-[36px] leading-[1.1] sm:text-[44px] lg:text-[54px]"
            style={{ color: "var(--color-charcoal)" }}
          >
            Four divisions. One disciplined hand.
          </h2>
          <p className="mt-6 text-[15px] leading-[1.85]" style={{ color: "var(--color-stone)" }}>
            Each sector operates independently, yet shares a common foundation: deep local
            insight, a long horizon, and a quiet refusal to cut corners.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {SECTORS.map((sector, i) => (
            <SectorCard key={sector.id} sector={sector} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Reconstruction() {
  return (
    <section id="reconstruction" className="relative overflow-hidden px-6 py-24 lg:px-12 lg:py-32">
      <div className="bg-arabesque absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="hairline" />
            <span className="eyebrow">A Pivotal Chapter</span>
          </div>
          <h2
            className="font-display mt-6 text-[34px] leading-[1.1] sm:text-[42px] lg:text-[50px]"
            style={{ color: "var(--color-charcoal)" }}
          >
            Sudan is rebuilding. We are ready.
          </h2>
        </div>
        <div className="lg:col-span-7">
          <div className="space-y-6 text-[16px] leading-[1.9]" style={{ color: "var(--color-stone)" }}>
            <p>
              In January 2026, the Sudanese government returned to Khartoum and the long work
              of reconstruction began in earnest. Roads need clearing, neighbourhoods need
              rewiring, and buildings need to come back to life — safer and better than before.
            </p>
            <p>
              Shahad has the local knowledge, the workforce, and the discipline to operate
              in this environment. Our construction division is optimised for the urgency of
              this moment; our real estate division provides stable, secure premises to the
              diplomatic and humanitarian organisations doing the work alongside us.
            </p>
            <p style={{ color: "var(--color-charcoal)", fontWeight: 500 }}>
              The opportunity to help rebuild Sudan is a responsibility we take seriously.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CEOMessage() {
  return (
    <section id="leadership" className="px-6 py-24 lg:px-12 lg:py-32" style={{ background: "var(--color-charcoal)" }}>
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="hairline" style={{ background: "linear-gradient(90deg, var(--color-gold) 0%, transparent 100%)" }} />
            <span className="eyebrow" style={{ color: "var(--color-gold-soft)" }}>From the Founder</span>
          </div>
          <h2
            className="font-display mt-6 text-[32px] leading-[1.15] sm:text-[40px]"
            style={{ color: "#FFFCF5" }}
          >
            A message from the chairman.
          </h2>
        </div>
        <div className="lg:col-span-8">
          <blockquote
            className="font-display text-[22px] leading-[1.55] sm:text-[26px] lg:text-[28px]"
            style={{ color: "rgba(255,252,245,0.92)" }}
          >
            &ldquo;Every project we take on — whether a high-rise in Khartoum, a renovated
            home in a recovering neighbourhood, or a guest&apos;s first night at the Prince Hotel —
            is an opportunity to demonstrate that quality, discipline, and respect are still
            possible at scale in Sudan. That is the only standard worth measuring ourselves
            against.&rdquo;
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <div
              className="h-12 w-12 rounded-full"
              style={{ background: "linear-gradient(135deg, var(--color-gold-soft) 0%, var(--color-gold) 100%)" }}
              aria-hidden
            />
            <div>
              <div className="font-display text-[18px]" style={{ color: "#FFFCF5" }}>
                Founder &amp; Chairman
              </div>
              <div
                className="text-[11px] font-medium uppercase tracking-[0.3em]"
                style={{ color: "var(--color-gold-soft)" }}
              >
                Shahad Group
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyPartner() {
  const pillars = [
    {
      eyebrow: "01",
      title: "Proven Track Record",
      body:
        "A portfolio of completed work and years of quiet stewardship — performance that speaks before we do.",
    },
    {
      eyebrow: "02",
      title: "Innovation-Driven",
      body:
        "Modern methods, sustainable materials, and processes refined over years of practice. Discipline, not improvisation.",
    },
    {
      eyebrow: "03",
      title: "Client-Centric",
      body:
        "Your vision is our blueprint; your satisfaction is the only success metric we recognise. Every brief is treated as singular.",
    },
  ];

  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.eyebrow}
              className="luxe-card p-10"
              style={{ borderRadius: "2px" }}
            >
              <div className="font-display text-[44px]" style={{ color: "var(--color-gold)" }}>
                {p.eyebrow}
              </div>
              <h3
                className="font-display mt-4 text-[26px] leading-[1.2]"
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

function ContactBand() {
  return (
    <section
      className="px-6 py-20 lg:px-12 lg:py-28"
      style={{ background: "var(--color-royal-deep)", color: "var(--color-gold-pale)" }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <span className="eyebrow" style={{ color: "var(--color-gold-soft)" }}>Get in touch</span>
          <h2
            className="font-display mt-4 text-[34px] leading-[1.1] sm:text-[42px]"
            style={{ color: "#FFFCF5" }}
          >
            Let&apos;s build, host, and innovate — together.
          </h2>
        </div>
        <Link
          href="/shahad/contact"
          className="btn-gold"
          style={{ background: "linear-gradient(135deg, #EFE0BF 0%, #D4A861 100%)" }}
        >
          Contact Shahad Group
        </Link>
      </div>
    </section>
  );
}
