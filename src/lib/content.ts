export type ComplexId =
  | "royal-suites"
  | "commercial-plaza"
  | "business"
  | "culinary"
  | "events"
  | "bazaar"
  | "tourism";

export interface LocalisedText {
  en: string;
  ar: string;
}

export interface ComplexNode {
  id: ComplexId;
  number: string;
  name: LocalisedText;
  description: LocalisedText;
  image: string | null;
}

// Complex listing follows the docx order and uses the docx descriptions verbatim.
// Source: "Prince Plaza Kassala.docx" — Seven-Complex Experience.
export const COMPLEXES: ComplexNode[] = [
  {
    id: "royal-suites",
    number: "01",
    name: { en: "The Royal Suites", ar: "الأجنحة الملكية" },
    description: {
      en: "Luxury accommodations featuring panoramic views of the iconic Taka Mountains.",
      ar: "إقامات فاخرة بإطلالات بانورامية على جبال التاكا الشهيرة.",
    },
    image: "/hotel/room-twin-sm.webp",
  },
  {
    id: "commercial-plaza",
    number: "02",
    name: { en: "Commercial Plaza", ar: "البلازا التجارية" },
    description: {
      en: "A curated selection of retail outlets, bringing modern shopping to your doorstep.",
      ar: "تشكيلة منتقاة من المتاجر تجلب التسوق العصري إلى عتبة دارك.",
    },
    image: "/hotel/plaza-shops-sm.webp",
  },
  {
    id: "business",
    number: "03",
    name: { en: "Business Center", ar: "مركز الأعمال" },
    description: {
      en: "State-of-the-art meeting rooms and coworking spaces for the modern professional.",
      ar: "قاعات اجتماعات ومساحات عمل مشتركة بأحدث المعايير للمحترف العصري.",
    },
    image: "/hotel/conference-sm.webp",
  },
  {
    id: "culinary",
    number: "04",
    name: { en: "Culinary Hub", ar: "مركز الطهي" },
    description: {
      en: "A functional restaurant for a great dine-in experience, with in-room dining and room service throughout the property.",
      ar: "مطعم متكامل لتجربة طعام رائعة داخل المطعم، مع خدمة الطعام في الغرف على مدار إقامتك.",
    },
    image: "/hotel/restaurant-alt-sm.webp",
  },
  {
    id: "events",
    number: "05",
    name: { en: "Event Pavilions", ar: "أجنحة المناسبات" },
    description: {
      en: "Expansive spaces for weddings, conferences, and cultural celebrations.",
      ar: "فضاءات واسعة للأعراس والمؤتمرات والاحتفالات الثقافية.",
    },
    image: "/hotel/events-hall-sm.webp",
  },
  {
    id: "bazaar",
    number: "06",
    name: { en: "Bazaar", ar: "السوق" },
    description: {
      en: "From everyday essentials to unique treasures, our diverse range of stores has something for everyone.",
      ar: "من الأساسيات اليومية إلى الكنوز الفريدة، تشكيلتنا المتنوعة من المتاجر تضمّ ما يناسب الجميع.",
    },
    image: "/hotel/courtyard-bazaar-sm.webp",
  },
  {
    id: "tourism",
    number: "07",
    name: { en: "Tourism", ar: "السياحة" },
    description: {
      en: "Transport from and to airport plus destination of your dreams.",
      ar: "نقل من وإلى المطار، إلى جانب وجهة أحلامك.",
    },
    image: "/hotel/taka-rooftop-sm.webp",
  },
];

// Amenities mirror the docx "Complete Amenities" list — four items, verbatim.
export interface AmenityItem {
  label: LocalisedText;
  caption: LocalisedText;
}

export const AMENITIES: AmenityItem[] = [
  {
    label: { en: "High-speed Wi-Fi", ar: "واي فاي عالي السرعة" },
    caption: {
      en: "Throughout the entire complex.",
      ar: "في كل أرجاء المجمع.",
    },
  },
  {
    label: { en: "24/7 Concierge & Security", ar: "كونسيرج وأمن على مدار الساعة" },
    caption: {
      en: "Around-the-clock service and protection.",
      ar: "خدمة وحماية على مدار الساعة.",
    },
  },
  {
    label: { en: "Parking & Integrated Transport", ar: "مواقف ونقل متكامل" },
    caption: {
      en: "Ample parking and integrated transport links.",
      ar: "مواقف واسعة وروابط نقل متكاملة.",
    },
  },
  {
    label: { en: "Climate-controlled Environments", ar: "بيئات مكيّفة" },
    caption: {
      en: "For maximum comfort.",
      ar: "للحصول على أقصى درجات الراحة.",
    },
  },
];

// Gallery — real Prince Plaza Kassala photography supplied by the client.
// Indexes 0 and 5 render tall (portrait) — both hold images whose subject
// survives a vertical crop (facade elevation, corridor perspective).
// Sixteen entries fill the four-column grid with no short final row.
export const GALLERY = [
  "/hotel/exterior-facade-sm.webp",
  "/hotel/lobby-sm.webp",
  "/hotel/restaurant-alt-sm.webp",
  "/hotel/room-twin-warm-sm.webp",
  "/hotel/courtyard-bazaar-sm.webp",
  "/hotel/corridor-sm.webp",
  "/hotel/conference-sm.webp",
  "/hotel/taka-rooftop-sm.webp",
  "/hotel/bathroom-sm.webp",
  "/hotel/plaza-shops-sm.webp",
  "/hotel/room-door-sm.webp",
  "/hotel/reception-desk-sm.webp",
  "/hotel/kitchenette-sm.webp",
  "/hotel/taka-terrace-sm.webp",
  "/hotel/exterior-street-sm.webp",
  "/hotel/room-triple-sm.webp",
];

// Hero — the Prince Plaza frontage under a Kassala sky.
export const HERO_IMAGE = "/hotel/plaza-sky.webp";

// Atmospheric secondary image — Kassala's iconic Taka Mountains from the roof.
export const TAKA_IMAGE = "/hotel/taka-rooftop.webp";

// Architectural detail image — the Prince Hotel arched facade.
export const ARCHITECTURE_IMAGE = "/hotel/exterior-facade.webp";

// Piedmont Travel and Tourism — the agency team on site in the hotel.
export const PIEDMONT_IMAGE = "/hotel/piedmont-team.webp";

// Second full-bleed band — the Prince Hotel signage on the Kassala frontage.
export const ADDRESS_IMAGE = "/hotel/facade-sign.webp";

// The departments that run the complex, each with its own team photograph.
export interface TeamMember {
  image: string;
  role: LocalisedText;
  caption: LocalisedText;
}

export const TEAM: TeamMember[] = [
  {
    image: "/hotel/reception-team-sm.webp",
    role: { en: "Front Office", ar: "مكتب الاستقبال" },
    caption: {
      en: "Reception, staffed around the clock.",
      ar: "الاستقبال، بطاقم على مدار الساعة.",
    },
  },
  {
    image: "/hotel/team-housekeeping-sm.webp",
    role: { en: "Housekeeping", ar: "التدبير الفندقي" },
    caption: {
      en: "The team that turns over every room.",
      ar: "الفريق الذي يهيّئ كل غرفة.",
    },
  },
  {
    image: "/hotel/team-security-sm.webp",
    role: { en: "Security", ar: "الأمن" },
    caption: {
      en: "On the floors and at the gates, day and night.",
      ar: "في الطوابق وعلى البوابات، ليلًا ونهارًا.",
    },
  },
  {
    image: "/hotel/staff-entrance-sm.webp",
    role: { en: "Guest Relations", ar: "علاقات الضيوف" },
    caption: {
      en: "Arrivals, bookings, and everything after.",
      ar: "الوصول والحجوزات وكل ما يليها.",
    },
  },
  {
    image: "/hotel/staff-security-sm.webp",
    role: { en: "The Duty Desk", ar: "مكتب المناوبة" },
    caption: {
      en: "One point of contact, whatever the hour.",
      ar: "نقطة تواصل واحدة، في أي ساعة.",
    },
  },
];

// Centralised, verbatim docx copy used across the site.
export const COPY = {
  tagline: {
    en: "Where Arabic Elegance Meets the Heart of Sudan",
    ar: "حيث تلتقي الأناقة العربية بقلب السودان",
  },
  hero_subtitle: {
    en: "Experience the New Standard of Rural Luxury",
    ar: "اختبر المعيار الجديد للفخامة الريفية",
  },
  welcome: {
    en: "Welcome to Prince Plaza Kassala, a pioneering architectural landmark designed to redefine the landscape of Eastern Sudan. More than just a place to stay, our interconnected seven-complex destination is a catalyst for urbanization, bringing world-class sophistication and modern convenience to the breathtaking rural beauty of Kassala.",
    ar: "أهلاً بكم في برنس بلازا كسلا، صرحٌ معماري رائد صُمم ليعيد تشكيل وجه شرق السودان. ليس مجرد مكان للإقامة، بل وجهة متكاملة من سبعة مجمعات مترابطة، وحافزٌ للتحضّر يجمع بين الرقي العالمي والراحة العصرية في قلب الجمال الريفي الخلاب لكسلا.",
  },
  vision_eyebrow: { en: "A Vision of Progress", ar: "رؤية للتقدّم" },
  vision_p1: {
    en: "Prince Plaza Kassala stands as a beacon of growth. By integrating high-end hospitality with vibrant commercial spaces, we are bridging the gap between urban luxury and rural charm.",
    ar: "يقف برنس بلازا كسلا منارةً للنمو. من خلال دمج الضيافة الراقية مع المساحات التجارية النابضة بالحياة، نُسدُّ الفجوة بين الفخامة الحضرية والسحر الريفي.",
  },
  vision_p2: {
    en: "Our complex is designed to spark local economic development while providing international travelers with a seamless, high-standard experience.",
    ar: "صُمم مجمعنا لإشعال التنمية الاقتصادية المحلية، مع تقديم تجربة سلسة وعالية المستوى للمسافرين الدوليين.",
  },
  complex_eyebrow: { en: "The Seven-Complex Experience", ar: "تجربة المجمعات السبعة" },
  complex_intro: {
    en: "Our unique architecture consists of seven interconnected hubs, each curated to offer a specific facet of the modern lifestyle:",
    ar: "تتألف هندستنا الفريدة من سبعة مجمعات مترابطة، كلٌّ منها مُصمَّم ليقدم وجهًا من وجوه الحياة العصرية:",
  },
  amenities_eyebrow: { en: "Complete Amenities", ar: "وسائل راحة متكاملة" },
  amenities_intro: {
    en: "We've thought of everything so you don't have to. At Prince Plaza, “complete” means:",
    ar: "فكّرنا في كل شيء حتى لا تضطر إلى ذلك. في برنس بلازا، “الاكتمال” يعني:",
  },
  tourism_eyebrow: { en: "Tourism Redefined", ar: "إعادة تعريف السياحة" },
  tourism_p1: {
    en: "Kassala is known for its stunning mountains and rich history. Prince Plaza serves as your luxury basecamp, allowing you to explore the rugged beauty of the region during the day and return to unparalleled comfort at night. We offer the perfect blend of adventure and relaxation.",
    ar: "تشتهر كسلا بجبالها الخلابة وتاريخها العريق. يخدمك برنس بلازا كقاعدة فاخرة، تنطلق منها لاستكشاف الجمال الوعر للمنطقة نهارًا، وتعود إلى راحة لا تُضاهى ليلًا. نقدّم المزيج المثالي بين المغامرة والاسترخاء.",
  },
  tourism_p2: {
    en: "Join the Urban Revolution in Kassala. Whether you are here for business, leisure, or to be a part of Sudan's future, Prince Plaza Kassala is your gateway to a new era.",
    ar: "انضمّ إلى ثورة المدن في كسلا. سواء جئت من أجل العمل أو الترفيه، أو لتكون جزءًا من مستقبل السودان، فإن برنس بلازا كسلا بوابتك إلى عهدٍ جديد.",
  },
  cta_book: { en: "Chat on WhatsApp", ar: "تواصل عبر واتساب" },
  cta_explore: { en: "Explore Prince Plaza", ar: "استكشف برنس بلازا" },

  // Piedmont Travel and Tourism — verbatim client copy.
  piedmont_eyebrow: {
    en: "Piedmont Travel and Tourism",
    ar: "بيدمونت للسفر والسياحة",
  },
  piedmont_intro: {
    en: "Piedmont Travel and Tourism is the premier on-site travel agency at the Prince Plaza Hotel in Kassala, Sudan, dedicated to providing seamless journey solutions for both local residents and international visitors.",
    ar: "بيدمونت للسفر والسياحة هي وكالة السفر الرئيسية داخل فندق برنس بلازا في كسلا، السودان، المكرّسة لتقديم حلول سفر متكاملة لكل من المقيمين المحليين والزوار الدوليين.",
  },
  piedmont_services_eyebrow: { en: "Core Services", ar: "الخدمات الأساسية" },
  piedmont_why_eyebrow: { en: "Why Choose Us", ar: "لماذا تختارنا" },
} as const;

export interface PiedmontItem {
  title: { en: string; ar: string };
  body: { en: string; ar: string };
}

export const PIEDMONT_SERVICES: PiedmontItem[] = [
  {
    title: { en: "Comprehensive Transportation", ar: "نقل شامل" },
    body: {
      en: "Reliable airport transfers, private local drivers, and regional ground transport.",
      ar: "نقل موثوق من وإلى المطار، سائقون محليون خاصون، ونقل بري إقليمي.",
    },
  },
  {
    title: { en: "Domestic & International Flights", ar: "رحلات داخلية ودولية" },
    body: {
      en: "Hassle-free ticketing, route planning, and booking with major global airlines.",
      ar: "حجز تذاكر سلس، وتخطيط مسارات، وحجوزات مع كبرى شركات الطيران العالمية.",
    },
  },
  {
    title: { en: "Curated Sudan Tourism", ar: "سياحة سودانية منتقاة" },
    body: {
      en: "Guided excursions to Kassala's iconic Taka Mountains, historical sites, and cultural landmarks.",
      ar: "رحلات مرشَدة إلى جبال التاكا الشهيرة في كسلا والمواقع التاريخية والمعالم الثقافية.",
    },
  },
];

export const PIEDMONT_WHY: PiedmontItem[] = [
  {
    title: { en: "Prime Location", ar: "موقع متميز" },
    body: {
      en: "Conveniently based directly inside the Prince Plaza Hotel lobby for instant guest access.",
      ar: "نقع مباشرة داخل بهو فندق برنس بلازا للوصول الفوري من قِبل الضيوف.",
    },
  },
  {
    title: { en: "Dual Expertise", ar: "خبرة مزدوجة" },
    body: {
      en: "Tailored packages that respect local customs while meeting international hospitality standards.",
      ar: "باقات مصمّمة تحترم العادات المحلية مع تلبية معايير الضيافة الدولية.",
    },
  },
  {
    title: { en: "End-to-End Care", ar: "عناية شاملة" },
    body: {
      en: "Complete management of your itinerary from the moment you land until your final departure.",
      ar: "إدارة كاملة لبرنامج رحلتك من لحظة هبوطك حتى مغادرتك النهائية.",
    },
  },
];
