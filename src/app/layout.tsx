import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Naskh_Arabic } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display-loaded",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-loaded",
  display: "swap",
});

const arabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-arabic-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prince-bazaar.vercel.app"),
  title: {
    default: "Prince Plaza Kassala — Where Arabic Elegance Meets the Heart of Sudan",
    template: "%s · Prince Plaza Kassala",
  },
  description:
    "A pioneering architectural landmark at the foot of the Taka Mountains. Royal Suites, Commercial Plaza, Business Centre, Culinary Hub, Event Pavilions, Bazaar, Tourism — your gateway to Eastern Sudan's new era.",
  keywords: [
    "Prince Plaza Kassala",
    "Kassala hotel",
    "Taka Mountains",
    "Sudan hotel",
    "Eastern Sudan tourism",
    "Shahad Group",
  ],
  openGraph: {
    title: "Prince Plaza Kassala",
    description: "Where Arabic Elegance Meets the Heart of Sudan.",
    type: "website",
    locale: "en_US",
    siteName: "Prince Plaza Kassala",
    images: [
      {
        url: "/hotel/room-king-warm.jpg",
        width: 1600,
        height: 1200,
        alt: "Prince Plaza Kassala — King Suite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prince Plaza Kassala",
    description: "Where Arabic Elegance Meets the Heart of Sudan.",
    images: ["/hotel/room-king-warm.jpg"],
  },
  alternates: {
    canonical: "/",
    languages: { en: "/", ar: "/" },
  },
};

// Schema.org structured data — tells Google + others this is a Hotel,
// shows rich results with location, price range, photo, contact details.
const HOTEL_LD = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Prince Plaza Kassala",
  alternateName: "برنس بلازا كسلا",
  description:
    "A pioneering architectural landmark at the foot of the Taka Mountains in Eastern Sudan. Seven interconnected complexes — Royal Suites, Commercial Plaza, Business Centre, Culinary Hub, Event Pavilions, Bazaar, Tourism.",
  url: "https://prince-bazaar.vercel.app",
  telephone: "+249-000-000-000",
  email: "Kassala@princehotel-sd.com",
  image: [
    "https://prince-bazaar.vercel.app/hotel/room-king-warm.jpg",
    "https://prince-bazaar.vercel.app/hotel/room-presidential.jpg",
    "https://prince-bazaar.vercel.app/hotel/room-family.jpg",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kassala",
    addressRegion: "Kassala State",
    addressCountry: "SD",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 15.4548,
    longitude: 36.4,
  },
  priceRange: "$$$",
  starRating: { "@type": "Rating", ratingValue: "5" },
  amenityFeature: [
    { "@type": "LocationFeatureSpecification", name: "High-speed Wi-Fi" },
    { "@type": "LocationFeatureSpecification", name: "24/7 Concierge & Security" },
    { "@type": "LocationFeatureSpecification", name: "Restaurant & Room Service" },
    { "@type": "LocationFeatureSpecification", name: "Business Centre" },
    { "@type": "LocationFeatureSpecification", name: "Event Pavilions" },
    { "@type": "LocationFeatureSpecification", name: "Climate-controlled" },
    { "@type": "LocationFeatureSpecification", name: "Parking & Airport Transfers" },
  ],
  brand: {
    "@type": "Organization",
    name: "Shahad Group",
  },
  inLanguage: ["en", "ar"],
};

const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Shahad Group",
  alternateName: "شهد جروب",
  url: "https://prince-bazaar.vercel.app/shahad",
  description:
    "A multi-disciplinary Sudanese group operating across construction, real estate, and hospitality.",
  founder: { "@type": "Person", name: "Isam Elshareef" },
  address: {
    "@type": "PostalAddress",
    addressCountry: "SD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${arabic.variable}`}>
      <head>
        {/* Preload the hero image so first paint is fast. */}
        <link
          rel="preload"
          as="image"
          href="/hotel/room-king-warm.jpg"
          fetchPriority="high"
        />
        {/* Schema.org structured data for rich Google results. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(HOTEL_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }}
        />
      </head>
      <body className="antialiased">
        <ScrollProgress />
        <SmoothScroll />
        <Cursor />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
