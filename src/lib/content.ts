export type ComplexId =
  | "royal-suites"
  | "commercial-plaza"
  | "bazaar"
  | "wellness"
  | "culinary"
  | "business"
  | "events"
  | "villas"
  | "tourism";

export interface ComplexNode {
  id: ComplexId;
  number: string;
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
}

export const COMPLEXES: ComplexNode[] = [
  {
    id: "royal-suites",
    number: "01",
    name: "The Royal Suites",
    tagline: "Panoramic views of the Taka Mountains",
    description:
      "Sanctuaries of unhurried luxury. Each suite is a curated retreat — handwoven textiles, oak floors, and floor-to-ceiling glass framing the granite spires of Kassala.",
    highlights: ["King & Presidential layouts", "Private balconies", "24-hour butler service", "Mountain or garden views"],
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "commercial-plaza",
    number: "02",
    name: "Commercial Plaza",
    tagline: "Modern shopping at your doorstep",
    description:
      "A curated selection of international retail outlets — fashion, electronics, beauty, lifestyle. The mall experience refined for the heart of Kassala, climate-controlled and walkable from every suite.",
    highlights: ["International retail", "Flagship boutiques", "Lifestyle & beauty", "Curated for the property"],
    image: "https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "bazaar",
    number: "03",
    name: "The Bazaar",
    tagline: "Everyday essentials to one-of-a-kind treasures",
    description:
      "Where master artisans sit beside daily-needs vendors — spice, textile, silver, indigo, and the small things you didn't know you needed. The soul of Kassala, refined.",
    highlights: ["Curated artisan stalls", "Spice & textile market", "Daily provisions", "Custom tailoring"],
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "wellness",
    number: "04",
    name: "Wellness & Spa",
    tagline: "A sanctuary for rejuvenation",
    description:
      "Hammam, steam, full-service gym, and traditional Sudanese rituals. We honour generations of healing knowledge and pair it with the precision of contemporary wellness.",
    highlights: ["Traditional hammam", "Personal training studio", "Couples' treatment suites", "Cold plunge & sauna"],
    image: "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "culinary",
    number: "05",
    name: "The Culinary Hub",
    tagline: "Sudanese flavour, world technique",
    description:
      "Multiple dining venues from sunrise to last-call. A signature mountain-view restaurant, a courtyard café, an after-hours lounge, and a private chef's table.",
    highlights: ["Signature restaurant", "Rooftop lounge", "Courtyard café", "Private chef's table"],
    image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "business",
    number: "06",
    name: "Business Center",
    tagline: "Where commerce meets ceremony",
    description:
      "State-of-the-art meeting rooms, coworking studios, and a private boardroom. Built for the diplomat, the founder, and the strategist working between continents.",
    highlights: ["Six private meeting rooms", "Live-translation boardroom", "Coworking studio", "Press & media suite"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "events",
    number: "07",
    name: "Event Pavilions",
    tagline: "Weddings, conferences, cultural celebrations",
    description:
      "Expansive ballrooms and open-air pavilions designed for weddings worth a thousand photographs and conferences worth a thousand decisions.",
    highlights: ["Grand ballroom (800 guests)", "Open-air pavilion", "Cultural amphitheatre", "Full-service planning"],
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "villas",
    number: "08",
    name: "Private Villas",
    tagline: "Garden-fronted, fully furnished",
    description:
      "Long-stay residences for families, embassies, and executives. Walled gardens, private chefs on request, and the same five-star service as the Royal Suites.",
    highlights: ["2–4 bedroom layouts", "Walled private gardens", "Optional private chef", "Long-stay rates"],
    image: "https://images.unsplash.com/photo-1613553474179-e1eda3ea5734?w=1600&q=85&auto=format&fit=crop",
  },
  {
    id: "tourism",
    number: "09",
    name: "Tourism & Concierge",
    tagline: "From the airport to the summit",
    description:
      "Curated journeys to the Taka Mountains, Totil, and the markets of Kassala. Airport transfers, multi-day expeditions, and bespoke itineraries — all arranged through your dedicated concierge.",
    highlights: ["Airport transfers", "Mountain expeditions", "Cultural tours", "Bespoke itineraries"],
    image: "https://images.unsplash.com/photo-1500964757637-229ea73306fc?w=1600&q=85&auto=format&fit=crop",
  },
];

export const AMENITIES = [
  { label: "High-speed Wi-Fi", caption: "Throughout every complex" },
  { label: "24/7 Concierge", caption: "Every hour, every request" },
  { label: "Private Security", caption: "Discreet, always present" },
  { label: "Climate Control", caption: "Engineered for the desert" },
  { label: "Ample Parking", caption: "Valet on arrival" },
  { label: "Integrated Transport", caption: "Airport to atrium" },
];

export const GALLERY = [
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1400&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500964757637-229ea73306fc?w=1400&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=1400&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?w=1400&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1400&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1400&q=85&auto=format&fit=crop",
];

export const HERO_IMAGE =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=2400&q=90&auto=format&fit=crop";

export const TAKA_IMAGE =
  "https://images.unsplash.com/photo-1500964757637-229ea73306fc?w=2400&q=90&auto=format&fit=crop";

export const ARCHITECTURE_IMAGE =
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=2400&q=90&auto=format&fit=crop";
