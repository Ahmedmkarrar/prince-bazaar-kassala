import dynamic from "next/dynamic";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Press } from "@/components/Press";
import { LiveAtmosphere } from "@/components/LiveAtmosphere";
import { Story } from "@/components/Story";
import { Loader } from "@/components/Loader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";

// Below-the-fold sections — load on demand to keep the initial bundle slim.
const Karam = dynamic(() => import("@/components/Karam").then(m => ({ default: m.Karam })));
const FoundersNote = dynamic(() => import("@/components/FoundersNote").then(m => ({ default: m.FoundersNote })));
const Awards = dynamic(() => import("@/components/Awards").then(m => ({ default: m.Awards })));
const Interstitial = dynamic(() => import("@/components/Interstitial").then(m => ({ default: m.Interstitial })));
const HorizontalPan = dynamic(() => import("@/components/HorizontalPan").then(m => ({ default: m.HorizontalPan })));
const ComplexShowcase = dynamic(() => import("@/components/ComplexShowcase").then(m => ({ default: m.ComplexShowcase })));
const ComplexMap = dynamic(() => import("@/components/ComplexMap").then(m => ({ default: m.ComplexMap })));
const ArchitectsNote = dynamic(() => import("@/components/ArchitectsNote").then(m => ({ default: m.ArchitectsNote })));
const Suites = dynamic(() => import("@/components/Suites").then(m => ({ default: m.Suites })));
const Availability = dynamic(() => import("@/components/Availability").then(m => ({ default: m.Availability })));
const DayAt = dynamic(() => import("@/components/DayAt").then(m => ({ default: m.DayAt })));
const Heritage = dynamic(() => import("@/components/Heritage").then(m => ({ default: m.Heritage })));
const SudanMap = dynamic(() => import("@/components/SudanMap").then(m => ({ default: m.SudanMap })));
const Tourism = dynamic(() => import("@/components/Tourism").then(m => ({ default: m.Tourism })));
const ThisIsKassala = dynamic(() => import("@/components/ThisIsKassala").then(m => ({ default: m.ThisIsKassala })));
const EventsShowcase = dynamic(() => import("@/components/EventsShowcase").then(m => ({ default: m.EventsShowcase })));
const Conference = dynamic(() => import("@/components/Conference").then(m => ({ default: m.Conference })));
const ChefsTable = dynamic(() => import("@/components/ChefsTable").then(m => ({ default: m.ChefsTable })));
const Testimonials = dynamic(() => import("@/components/Testimonials").then(m => ({ default: m.Testimonials })));
const AISection = dynamic(() => import("@/components/AISection").then(m => ({ default: m.AISection })));
const Letters = dynamic(() => import("@/components/Letters").then(m => ({ default: m.Letters })));
const Amenities = dynamic(() => import("@/components/Amenities").then(m => ({ default: m.Amenities })));
const Gallery = dynamic(() => import("@/components/Gallery").then(m => ({ default: m.Gallery })));
const FAQ = dynamic(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));
const BookingForm = dynamic(() => import("@/components/BookingForm").then(m => ({ default: m.BookingForm })));
const Footer = dynamic(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const Concierge = dynamic(() => import("@/components/Concierge").then(m => ({ default: m.Concierge })));
const StickyReserve = dynamic(() => import("@/components/StickyReserve").then(m => ({ default: m.StickyReserve })));
const ReservationModal = dynamic(() => import("@/components/ReservationModal").then(m => ({ default: m.ReservationModal })));

export default function Home() {
  return (
    <main>
      <Loader />
      <SmoothScroll />
      <Cursor />
      <Nav />
      <Hero />
      <Press />
      <LiveAtmosphere />
      <Story />
      <Karam />
      <FoundersNote />
      <Awards />
      <Interstitial
        image="/sudan/taka-view.jpg"
        eyebrow="The Mountain"
        line1="Granite spires that have watched"
        line2="over Kassala for ten thousand years."
      />
      <HorizontalPan />
      <ComplexShowcase />
      <ComplexMap />
      <ArchitectsNote />
      <Suites />
      <Availability />
      <Interstitial
        image="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=2400&q=90&auto=format&fit=crop"
        eyebrow="The Courtyard"
        line1="Where the fountain runs at dawn"
        line2="and the day begins slowly."
        align="right"
      />
      <DayAt />
      <Heritage />
      <ThisIsKassala />
      <SudanMap />
      <Tourism />
      <Conference />
      <EventsShowcase />
      <ChefsTable />
      <Testimonials />
      <AISection />
      <Letters />
      <Amenities />
      <Gallery />
      <FAQ />
      <BookingForm />
      <Footer />
      <Concierge />
      <StickyReserve />
      <ReservationModal />
    </main>
  );
}
