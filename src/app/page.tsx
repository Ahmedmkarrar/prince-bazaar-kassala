import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Press } from "@/components/Press";
import { LiveAtmosphere } from "@/components/LiveAtmosphere";
import { Story } from "@/components/Story";
import { Awards } from "@/components/Awards";
import { Interstitial } from "@/components/Interstitial";
import { HorizontalPan } from "@/components/HorizontalPan";
import { ComplexShowcase } from "@/components/ComplexShowcase";
import { ComplexMap } from "@/components/ComplexMap";
import { ArchitectsNote } from "@/components/ArchitectsNote";
import { Suites } from "@/components/Suites";
import { Availability } from "@/components/Availability";
import { DayAt } from "@/components/DayAt";
import { Heritage } from "@/components/Heritage";
import { SudanMap } from "@/components/SudanMap";
import { Tourism } from "@/components/Tourism";
import { Conference } from "@/components/Conference";
import { ChefsTable } from "@/components/ChefsTable";
import { Testimonials } from "@/components/Testimonials";
import { AISection } from "@/components/AISection";
import { Letters } from "@/components/Letters";
import { Amenities } from "@/components/Amenities";
import { Gallery } from "@/components/Gallery";
import { FAQ } from "@/components/FAQ";
import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";
import { Concierge } from "@/components/Concierge";
import { Loader } from "@/components/Loader";
import { StickyReserve } from "@/components/StickyReserve";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ReservationModal } from "@/components/ReservationModal";

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
      <Awards />
      <Interstitial
        image="https://images.unsplash.com/photo-1500964757637-229ea73306fc?w=2400&q=90&auto=format&fit=crop"
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
      <SudanMap />
      <Tourism />
      <Conference />
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
