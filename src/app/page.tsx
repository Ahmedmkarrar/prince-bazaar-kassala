import dynamic from "next/dynamic";
import { Nav } from "@/components/Nav";
import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { Press } from "@/components/Press";
import { LiveAtmosphere } from "@/components/LiveAtmosphere";
import { Story } from "@/components/Story";
import { Loader } from "@/components/Loader";

// Below-the-fold sections — load on demand to keep the initial bundle slim.
const Interstitial = dynamic(() => import("@/components/Interstitial").then(m => ({ default: m.Interstitial })));
const HorizontalPan = dynamic(() => import("@/components/HorizontalPan").then(m => ({ default: m.HorizontalPan })));
const ComplexShowcase = dynamic(() => import("@/components/ComplexShowcase").then(m => ({ default: m.ComplexShowcase })));
const Suites = dynamic(() => import("@/components/Suites").then(m => ({ default: m.Suites })));
const SudanMap = dynamic(() => import("@/components/SudanMap").then(m => ({ default: m.SudanMap })));
const Tourism = dynamic(() => import("@/components/Tourism").then(m => ({ default: m.Tourism })));
const Conference = dynamic(() => import("@/components/Conference").then(m => ({ default: m.Conference })));
const AISection = dynamic(() => import("@/components/AISection").then(m => ({ default: m.AISection })));
const Amenities = dynamic(() => import("@/components/Amenities").then(m => ({ default: m.Amenities })));
const Gallery = dynamic(() => import("@/components/Gallery").then(m => ({ default: m.Gallery })));
const FAQ = dynamic(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));
const Footer = dynamic(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const CeoMessage = dynamic(() => import("@/components/CeoMessage").then(m => ({ default: m.CeoMessage })));
const Piedmont = dynamic(() => import("@/components/Piedmont").then(m => ({ default: m.Piedmont })));
const JourneyPlanner = dynamic(() => import("@/components/JourneyPlanner").then(m => ({ default: m.JourneyPlanner })));
const Concierge = dynamic(() => import("@/components/Concierge").then(m => ({ default: m.Concierge })));
const WhatsAppReserve = dynamic(() => import("@/components/WhatsAppReserve").then(m => ({ default: m.WhatsAppReserve })));

export default function Home() {
  return (
    <main>
      <Loader />
      <TopBar />
      <Nav />
      <Hero />
      <Press />
      <LiveAtmosphere />
      <Story />
      <Interstitial
        image="/hotel/room-king-sunset.jpg"
        eyebrow="The Plaza"
        line1="Quiet comfort, climate-controlled."
        line2="Considered details, throughout."
      />
      <HorizontalPan />
      <ComplexShowcase />
      <Suites />
      <SudanMap />
      <Tourism />
      <Piedmont />
      <JourneyPlanner />
      <CeoMessage />
      <Conference />
      <AISection />
      <Amenities />
      <Gallery />
      <FAQ />
      <Footer />
      <Concierge />
      <WhatsAppReserve />
    </main>
  );
}
