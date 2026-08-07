import dynamic from "next/dynamic";
import { Nav } from "@/components/Nav";
import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { Press } from "@/components/Press";
import { LiveAtmosphere } from "@/components/LiveAtmosphere";
import { Story } from "@/components/Story";
import { Loader } from "@/components/Loader";
import { ADDRESS_IMAGE } from "@/lib/content";

// Below-the-fold sections — load on demand to keep the initial bundle slim.
const Interstitial = dynamic(() => import("@/components/Interstitial").then(m => ({ default: m.Interstitial })));
const HorizontalPan = dynamic(() => import("@/components/HorizontalPan").then(m => ({ default: m.HorizontalPan })));
const ComplexShowcase = dynamic(() => import("@/components/ComplexShowcase").then(m => ({ default: m.ComplexShowcase })));
const Suites = dynamic(() => import("@/components/Suites").then(m => ({ default: m.Suites })));
const SudanMap = dynamic(() => import("@/components/SudanMap").then(m => ({ default: m.SudanMap })));
const Conference = dynamic(() => import("@/components/Conference").then(m => ({ default: m.Conference })));
const AISection = dynamic(() => import("@/components/AISection").then(m => ({ default: m.AISection })));
const Amenities = dynamic(() => import("@/components/Amenities").then(m => ({ default: m.Amenities })));
const Team = dynamic(() => import("@/components/Team").then(m => ({ default: m.Team })));
const Gallery = dynamic(() => import("@/components/Gallery").then(m => ({ default: m.Gallery })));
const FAQ = dynamic(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));
const Footer = dynamic(() => import("@/components/Footer").then(m => ({ default: m.Footer })));
const CeoMessage = dynamic(() => import("@/components/CeoMessage").then(m => ({ default: m.CeoMessage })));
const Concierge = dynamic(() => import("@/components/Concierge").then(m => ({ default: m.Concierge })));
const WhatsAppReserve = dynamic(() => import("@/components/WhatsAppReserve").then(m => ({ default: m.WhatsAppReserve })));

export default function Home() {
  return (
    <main id="main-content">
      <Loader />
      <TopBar />
      <Nav />
      <Hero />
      <Press />
      <LiveAtmosphere />
      <Story />
      {/* The "Quiet comfort, climate-controlled" band sat here: a full-screen
          photograph carrying a slogan and no information. Removed on client
          feedback that the page ran long — of the two decorative bands, the
          Address one below at least tells you where the hotel is. */}
      <HorizontalPan />
      <ComplexShowcase />
      <Suites />
      <SudanMap />
      {/* Tourism, Piedmont Travel and the journey planner were removed on board
          feedback to eliminate tourism content. Their components remain in the
          repo, unimported, if that decision is reversed. */}
      <Interstitial
        image={ADDRESS_IMAGE}
        align="right"
        eyebrow={{ en: "The Address", ar: "العنوان" }}
        line1={{ en: "Prince Hotel, Kassala.", ar: "فندق برنس، كسلا." }}
        line2={{ en: "Minutes from the Taka.", ar: "دقائق من التاكا." }}
      />
      <CeoMessage />
      <Conference />
      <AISection />
      <Amenities />
      <Team />
      <Gallery />
      <FAQ />
      <Footer />
      <Concierge />
      <WhatsAppReserve />
    </main>
  );
}
