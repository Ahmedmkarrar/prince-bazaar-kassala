import Link from "next/link";
import type { Metadata } from "next";
import { GroupNav } from "@/components/group/GroupNav";
import { GroupFooter } from "@/components/group/GroupFooter";
import { SectorHero } from "@/components/group/SectorHero";

export const metadata: Metadata = {
  title: "Prince Hotel Khartoum",
  description:
    "Boutique comfort in Khartoum's Garden City. Walking distance from the Blue Nile, fifteen minutes from the airport, five minutes from the International Exhibition.",
};

const AMENITIES = [
  { label: "Business Centre", body: "Workstations and meeting space with high-speed Wi-Fi." },
  { label: "Fitness Centre", body: "On-site gym available to all guests during stay." },
  { label: "Wi-Fi Throughout", body: "Complimentary high-speed internet across the property." },
  { label: "Free Parking", body: "Secure on-site parking, included with every reservation." },
  { label: "Daily Housekeeping", body: "Rooms serviced daily by an experienced housekeeping team." },
  { label: "24-Hour Reception", body: "Concierge and reception available around the clock." },
];

const ROOMS = [
  {
    name: "Deluxe Room",
    body:
      "A considered, comfortable room finished in warm neutrals. Premium bedding, generous workspace, and the quiet that Garden City is known for.",
  },
  {
    name: "Executive Room",
    body:
      "Larger floor plan with a separate seating area. Designed for guests who treat the room as a base for the day's work, not just a bed for the night.",
  },
  {
    name: "Junior Suite",
    body:
      "A distinct living area in addition to the bedroom. Ideal for longer stays, family visits, and discreet small meetings.",
  },
];

export default function PrinceHotelPage() {
  return (
    <main id="main-content" style={{ background: "var(--color-ivory)" }}>
      <GroupNav />
      <SectorHero
        eyebrow="Prince Hotel Khartoum"
        title="A quiet, considered base in Garden City."
        subtitle="A boutique hotel in one of Khartoum's most established neighbourhoods — walking distance from the Blue Nile, five minutes from the International Exhibition, fifteen minutes from the airport."
        image="/sectors/prince-hotel.jpeg"
      />

      <Location />
      <Amenities />
      <Rooms />
      <Voice />
      <Booking />
      <GroupFooter />
    </main>
  );
}

function Location() {
  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="hairline" />
            <span className="eyebrow">The Address</span>
          </div>
          <h2
            className="font-display mt-6 text-[36px] leading-[1.1] sm:text-[44px] lg:text-[52px]"
            style={{ color: "var(--color-charcoal)" }}
          >
            Garden City. A short walk to the river.
          </h2>
        </div>
        <div className="lg:col-span-7">
          <div className="space-y-6 text-[16px] leading-[1.9]" style={{ color: "var(--color-stone)" }}>
            <p>
              Prince Hotel sits in Garden City, one of Khartoum&apos;s most established residential
              and diplomatic neighbourhoods. The Blue Nile and Nile Avenue are within walking
              distance; the city&apos;s principal venues and ministries are minutes away by car.
            </p>
            <p>
              For business travellers, the location is practical: five minutes on foot to the
              Khartoum International Exhibition, fifteen minutes by car to Khartoum International
              Airport. For longer stays, Garden City&apos;s quiet streets are part of the appeal.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6">
            <Distance value="5 min" label="To Exhibition" />
            <Distance value="15 min" label="To Airport" />
            <Distance value="4.5★" label="Guest rating" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Distance({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ borderTop: "1px solid var(--color-line)" }} className="pt-4">
      <div className="font-display text-[28px] sm:text-[32px]" style={{ color: "var(--color-royal-deep)" }}>
        {value}
      </div>
      <div
        className="mt-2 text-[10px] font-medium uppercase tracking-[0.3em]"
        style={{ color: "var(--color-mist)" }}
      >
        {label}
      </div>
    </div>
  );
}

function Amenities() {
  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32" style={{ background: "var(--color-bone-soft)" }}>
      <div className="mx-auto max-w-[1400px]">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="hairline" />
            <span className="eyebrow">What&apos;s on Site</span>
            <span className="hairline" style={{ transform: "scaleX(-1)" }} />
          </div>
          <h2
            className="font-display mt-6 text-[34px] leading-[1.1] sm:text-[42px]"
            style={{ color: "var(--color-charcoal)" }}
          >
            Everything a working stay needs, nothing it doesn&apos;t.
          </h2>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {AMENITIES.map((a) => (
            <div key={a.label} style={{ borderTop: "1px solid var(--color-line)" }} className="pt-6">
              <h3
                className="font-display text-[20px] leading-[1.2]"
                style={{ color: "var(--color-charcoal)" }}
              >
                {a.label}
              </h3>
              <p className="mt-2 text-[13px] leading-[1.8]" style={{ color: "var(--color-stone)" }}>
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rooms() {
  return (
    <section className="px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col items-end justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="hairline" />
              <span className="eyebrow">The Rooms</span>
            </div>
            <h2
              className="font-display mt-6 text-[34px] leading-[1.1] sm:text-[42px]"
              style={{ color: "var(--color-charcoal)" }}
            >
              Comfort over flash. Every room.
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-[1.85]" style={{ color: "var(--color-stone)" }}>
            Three room categories, all designed to the same standard. Photographs and live
            availability are being prepared for publication alongside the new booking system.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {ROOMS.map((r) => (
            <div key={r.name} className="luxe-card p-10" style={{ borderRadius: "2px" }}>
              <h3
                className="font-display text-[26px] leading-[1.2]"
                style={{ color: "var(--color-charcoal)" }}
              >
                {r.name}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.85]" style={{ color: "var(--color-stone)" }}>
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Voice() {
  return (
    <section
      className="px-6 py-24 lg:px-12 lg:py-32"
      style={{ background: "var(--color-charcoal)", color: "var(--color-gold-pale)" }}
    >
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <span className="hairline" style={{ background: "linear-gradient(90deg, var(--color-gold) 0%, transparent 100%)" }} />
            <span className="eyebrow" style={{ color: "var(--color-gold-soft)" }}>Guest Voice</span>
          </div>
          <h2
            className="font-display mt-6 text-[30px] leading-[1.15] sm:text-[38px]"
            style={{ color: "#FFFCF5" }}
          >
            Quiet, comfortable, attentive — and exceptional value.
          </h2>
        </div>
        <div className="lg:col-span-7">
          <blockquote
            className="font-display text-[22px] leading-[1.55] sm:text-[26px]"
            style={{ color: "rgba(255,252,245,0.92)" }}
          >
            &ldquo;A comfortable and quiet hotel where the staff treated guests wonderfully —
            and the food was excellent.&rdquo;
          </blockquote>
          <div className="mt-6 text-[12px] font-medium uppercase tracking-[0.3em]" style={{ color: "var(--color-gold-soft)" }}>
            Verified guest review · 4.5★ on independent travel review platforms
          </div>
        </div>
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section
      className="px-6 py-20 lg:px-12 lg:py-28"
      style={{ background: "var(--color-royal-deep)", color: "var(--color-gold-pale)" }}
    >
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <span className="eyebrow" style={{ color: "var(--color-gold-soft)" }}>Reservations</span>
          <h2
            className="font-display mt-4 text-[32px] leading-[1.1] sm:text-[40px]"
            style={{ color: "#FFFCF5" }}
          >
            Plan your stay at the Prince Hotel.
          </h2>
          <p className="mt-4 max-w-xl text-[14px] leading-[1.9]" style={{ color: "rgba(239,224,191,0.75)" }}>
            Online reservations are launching alongside the new booking system. In the meantime,
            please send us your dates and we&apos;ll come back within the same business day with
            availability and rates.
          </p>
        </div>
        <Link
          href="/shahad/contact"
          className="btn-gold"
          style={{ background: "linear-gradient(135deg, #EFE0BF 0%, #D4A861 100%)" }}
        >
          Request a Reservation
        </Link>
      </div>
    </section>
  );
}
