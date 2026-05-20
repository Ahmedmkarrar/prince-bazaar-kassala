export type Sector = {
  id: string;
  name: string;
  short: string;
  tagline: string;
  href: string;
  image: string;
  blurb: string;
};

export const SECTORS: Sector[] = [
  {
    id: "construction",
    name: "Shahad Contracting & Construction",
    short: "Construction",
    tagline: "Rebuilding the Future",
    href: "/shahad/construction",
    image: "/sectors/construction.jpeg",
    blurb:
      "Large-scale builds, restoration, and consultancy across Sudan's reconstruction era. One disciplined, family-led team.",
  },
  {
    id: "real-estate",
    name: "Shahad Real Estate",
    short: "Real Estate",
    tagline: "A Legacy of Stewardship",
    href: "/shahad/real-estate",
    image: "/sectors/real-estate.jpeg",
    blurb:
      "Institutional property management and premium development for diplomatic missions, international organisations, and corporate partners in Khartoum.",
  },
  {
    id: "prince-hotel",
    name: "Prince Hotel Khartoum",
    short: "Prince Hotel",
    tagline: "Garden City Hospitality",
    href: "/shahad/prince-hotel",
    image: "/sectors/prince-hotel.jpeg",
    blurb:
      "Boutique comfort in Khartoum's Garden City — walking distance from the Blue Nile, minutes from the airport and the city's principal venues.",
  },
  {
    id: "prince-bazaar",
    name: "Prince Plaza Kassala",
    short: "Prince Plaza",
    tagline: "At the Foot of the Taka Mountains",
    href: "/",
    image: "/sectors/prince-bazaar.jpeg",
    blurb:
      "An integrated destination of suites, villas, dining and commerce at the foot of Kassala's iconic Taka Mountains. Eastern Sudan's new landmark.",
  },
];

export const GROUP = {
  name: "Shahad Group",
  tagline: "Elevating Excellence Across Borders",
  description:
    "A multi-disciplinary group with operations rooted in Sudan, building across construction, real estate, and hospitality.",
  contact: {
    email: "contact@shahadgroup.com",
    phone: "+249 ●●● ●●● ●●●",
    addresses: [
      { label: "Khartoum, Sudan", line: "Head office" },
      { label: "Kassala, Sudan", line: "Eastern Sudan operations" },
    ],
  },
};
