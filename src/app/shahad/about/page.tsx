import Link from "next/link";
import type { Metadata } from "next";
import { GroupNav } from "@/components/group/GroupNav";
import { GroupFooter } from "@/components/group/GroupFooter";
import { SectorHero } from "@/components/group/SectorHero";

export const metadata: Metadata = {
  title: "About Shahad Group",
  description:
    "From a Sudanese family firm to a multi-disciplinary group operating across construction, real estate, and hospitality. The story, the leadership, and the work ahead.",
};

export default function AboutPage() {
  return (
    <main style={{ background: "var(--color-ivory)" }}>
      <GroupNav />
      <SectorHero
        eyebrow="The Group"
        title="A family firm. A regional operator. One disciplined hand."
        subtitle="What began as a localised Sudanese venture has grown into a multi-disciplinary group. The work has expanded; the standard has not changed."
        image="/sectors/shahad-group.jpeg"
      />

      <Story />
      <Leadership />
      <Reconstruction />
      <Philosophy />
      <Cta />
      <GroupFooter />
    </main>
  );
}

function Story() {
  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="hairline" />
            <span className="eyebrow">Our Story</span>
          </div>
          <h2
            className="font-display mt-6 text-[36px] leading-[1.1] sm:text-[44px] lg:text-[52px]"
            style={{ color: "var(--color-charcoal)" }}
          >
            From a single venture to a multi-sector group.
          </h2>
        </div>
        <div className="lg:col-span-7">
          <div className="space-y-6 text-[16px] leading-[1.9]" style={{ color: "var(--color-stone)" }}>
            <p>
              Shahad Group began as a Sudanese family business focused on what it knew best:
              building durable, premium-quality structures and managing them with care. Through
              years of patient, mostly-private growth, the group expanded into adjacent
              sectors — real estate stewardship and, eventually, hospitality.
            </p>
            <p>
              Today, the group operates across construction, real estate, and hospitality —
              with active operations in Khartoum and Kassala, and an ongoing focus on the
              regions where we can do meaningful work. We grow deliberately, partner carefully,
              and prefer to be judged on what we&apos;ve built rather than what we&apos;ve announced.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section
      id="leadership"
      className="px-6 py-24 lg:px-12 lg:py-32"
      style={{ background: "var(--color-charcoal)", color: "var(--color-gold-pale)" }}
    >
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="hairline" style={{ background: "linear-gradient(90deg, var(--color-gold) 0%, transparent 100%)" }} />
            <span className="eyebrow" style={{ color: "var(--color-gold-soft)" }}>Leadership</span>
          </div>
          <h2
            className="font-display mt-6 text-[32px] leading-[1.15] sm:text-[40px]"
            style={{ color: "#FFFCF5" }}
          >
            A message from the founder.
          </h2>
        </div>
        <div className="lg:col-span-8">
          <blockquote
            className="font-display text-[22px] leading-[1.55] sm:text-[26px] lg:text-[28px]"
            style={{ color: "rgba(255,252,245,0.92)" }}
          >
            &ldquo;Years in, the question we ask ourselves hasn&apos;t changed. Not, &lsquo;Can we
            grow faster?&rsquo; — but, &lsquo;Are we still doing the work to the standard we set for
            ourselves on day one?&rsquo; That is the only question worth answering, and the only
            promise worth making to the people who choose to work with us.&rdquo;
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

function Reconstruction() {
  return (
    <section id="reconstruction" className="px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="hairline" />
            <span className="eyebrow">The Work Ahead</span>
          </div>
          <h2
            className="font-display mt-6 text-[34px] leading-[1.1] sm:text-[44px]"
            style={{ color: "var(--color-charcoal)" }}
          >
            A pivotal chapter — and the seriousness it deserves.
          </h2>
        </div>
        <div className="lg:col-span-7">
          <div className="space-y-6 text-[16px] leading-[1.9]" style={{ color: "var(--color-stone)" }}>
            <p>
              Sudan is entering a long period of reconstruction. The work to come is technical
              and human at once: structures to repair, neighbourhoods to rewire, and a sense of
              normalcy to rebuild for the millions of Sudanese returning to their homes.
            </p>
            <p>
              We&apos;ve organised the group for this work. Construction is mobilised for both new
              builds and restoration. Real estate is offering stable premises to the diplomatic
              and humanitarian organisations operating here. Hospitality is preparing to host
              the returning visitors, partners, and investors who will be part of this chapter.
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

function Philosophy() {
  const pillars = [
    {
      title: "Productivity",
      body:
        "Our work is judged by delivery — what gets built, what gets opened, what gets handed over. Process discipline is how we keep our promises.",
    },
    {
      title: "Client Satisfaction",
      body:
        "Repeat partnerships are the only marketing we trust. Every brief is treated as long-term by default.",
    },
    {
      title: "Continuous Evolution",
      body:
        "Methods improve. Materials improve. Our team improves. Standing still is the only standard we won’t accept.",
    },
  ];

  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32" style={{ background: "var(--color-bone-soft)" }}>
      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="hairline" />
            <span className="eyebrow">Our Philosophy</span>
            <span className="hairline" style={{ transform: "scaleX(-1)" }} />
          </div>
          <h2
            className="font-display mt-6 text-[34px] leading-[1.1] sm:text-[42px]"
            style={{ color: "var(--color-charcoal)" }}
          >
            We don&apos;t meet standards. We set them.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="bg-[var(--color-ivory)] p-10"
              style={{ border: "1px solid var(--color-line)" }}
            >
              <h3 className="font-display text-[24px]" style={{ color: "var(--color-charcoal)" }}>
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

function Cta() {
  return (
    <section
      className="px-6 py-20 lg:px-12 lg:py-28"
      style={{ background: "var(--color-royal-deep)", color: "var(--color-gold-pale)" }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <span className="eyebrow" style={{ color: "var(--color-gold-soft)" }}>Work with us</span>
          <h2
            className="font-display mt-4 text-[32px] leading-[1.1] sm:text-[40px]"
            style={{ color: "#FFFCF5" }}
          >
            Building, hosting, innovating — for a brighter future.
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
