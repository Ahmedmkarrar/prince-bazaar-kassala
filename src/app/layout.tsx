import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Noto_Naskh_Arabic } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
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
  title: "Prince Bazaar Kassala — Where Urban Elegance Meets the Heart of Sudan",
  description:
    "A pioneering six-complex destination at the foot of the Taka Mountains. Royal Suites, Bazaar, Wellness, Culinary Hub, Business Center, Event Pavilions, Villas — your gateway to Eastern Sudan's new era.",
  keywords: [
    "Prince Bazaar Kassala",
    "Kassala hotel",
    "Taka Mountains",
    "Sudan luxury hotel",
    "Eastern Sudan tourism",
    "Shahad Group",
  ],
  openGraph: {
    title: "Prince Bazaar Kassala",
    description: "Where Urban Elegance Meets the Heart of Sudan.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${arabic.variable}`}>
      <body className="antialiased">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
