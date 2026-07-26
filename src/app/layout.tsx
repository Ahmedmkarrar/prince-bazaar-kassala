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
        url: "/hotel/plaza-sky.jpg",
        width: 1280,
        height: 720,
        alt: "Prince Plaza Kassala — the plaza frontage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prince Plaza Kassala",
    description: "Where Arabic Elegance Meets the Heart of Sudan.",
    images: ["/hotel/plaza-sky.jpg"],
  },
  // No `languages` map: English and Arabic are served from the same URL via the
  // in-page toggle, so emitting two hreflang links to "/" would contradict itself.
  alternates: {
    canonical: "/",
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
  telephone: "+249-96-510-5555",
  email: "Kassala@princehotel-sd.com",
  image: [
    "https://prince-bazaar.vercel.app/hotel/exterior-facade.jpg",
    "https://prince-bazaar.vercel.app/hotel/lobby.jpg",
    "https://prince-bazaar.vercel.app/hotel/restaurant-alt.jpg",
    "https://prince-bazaar.vercel.app/hotel/plaza-sky.jpg",
    "https://prince-bazaar.vercel.app/hotel/taka-rooftop.jpg",
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
  // No `starRating` — a star rating in structured data is a claim of official
  // classification. Restore it only once the property is formally rated;
  // unverified rich-result markup risks a Google manual action.
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
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${arabic.variable}`}
    >
      <head>
        {/* The language toggle is client state, so the server always renders
            English. Apply the stored choice before first paint, otherwise an
            Arabic visitor sees a flash of English + LTR layout on every load.
            Must stay in sync with STORAGE_KEY in lib/i18n.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("pb_locale_v1");if(!s)return;var l=JSON.parse(s).language;if(l==="ar"){document.documentElement.lang="ar";document.documentElement.dir="rtl";}}catch(e){}})();`,
          }}
        />
        {/* Preload the hero image so first paint is fast. */}
        <link
          rel="preload"
          as="image"
          href="/hotel/plaza-sky.webp"
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
        {/* First tab stop on every page. The homepage runs to 13 sections, so
            without this a keyboard or screen-reader user has to traverse the
            whole nav on every load (WCAG 2.4.1). Hidden until focused. */}
        <a href="#main-content" className="pb-skip-link">
          Skip to content
        </a>
        <ScrollProgress />
        <SmoothScroll />
        <Cursor />
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
