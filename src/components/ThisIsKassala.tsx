"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";

type Landmark = {
  id: string;
  arabic: string;
  romanised: string;
  english: string;
  body: string;
  image: string;
  credit: string;
};

const LANDMARKS: Landmark[] = [
  {
    id: "taka",
    arabic: "جبال التاكا",
    romanised: "Jibāl al-Tākā",
    english: "The Taka Mountains",
    body:
      "Granite monoliths that rear from the desert floor. The Beja people have lived beneath their shadow for centuries; pilgrims, poets, and traders have paused at the springs at their feet for longer than any record can say. There is no real trail — every climb is a private negotiation with the rock.",
    image: "/sudan/taka-view.jpg",
    credit: "The eastern silhouette · Photo: Evon2023 / Wikimedia (CC0)",
  },
  {
    id: "khatmiyya",
    arabic: "مسجد الختمية",
    romanised: "Masjid al-Khatmiyyah",
    english: "The Khatmiyya Mosque",
    body:
      "At the foot of the Taka stands the tomb of Sayid Hasan al-Mirghani, founder of the Khatmiyya Sufi order — one of Sudan's most important spiritual lineages. Pilgrims arrive year-round; the dome and arcades of columns make for one of the most photographed sites in eastern Sudan. We arrange respectful visits with a local historian.",
    image: "/sudan/khatmiyya-tomb.jpg",
    credit: "A spiritual heart of Sudan · Photo: Wikimedia Commons",
  },
  {
    id: "gash",
    arabic: "نهر القاش",
    romanised: "Nahr al-Qāsh",
    english: "The Gash River",
    body:
      "A seasonal river that descends from the Eritrean highlands, floods Kassala once a year, and gives the region its impossibly green orchards. The Gash is the reason this city exists where it does — and the reason its grapefruit, oranges, and mangoes are reputed to be the sweetest in Sudan.",
    image: "/sudan/gash-river.jpg",
    credit: "The water that built the city · Photo: Bertramz / Wikimedia (CC BY 3.0)",
  },
  {
    id: "beja",
    arabic: "البجا",
    romanised: "Al-Bijā",
    english: "The Beja People",
    body:
      "The indigenous people of the Red Sea hills and the Kassala plains. Custodians of a poetry tradition older than Arabic literacy in the region, and of a code of hospitality (karam) that the rest of Sudan still measures itself against. Many of our concierge guides are Beja; the stories you'll hear are theirs.",
    image: "/sudan/kassala-city.jpg",
    credit: "Kassala, August 2019 · Photo: Omer6800000 / Wikimedia (CC BY-SA 4.0)",
  },
  {
    id: "bazaar",
    arabic: "السوق الكبير",
    romanised: "Al-Sūq al-Kabīr",
    english: "The Grand Bazaar of Kassala",
    body:
      "A souq that has traded with Eritrea, Egypt, and the Red Sea coast since the 19th century. Spice merchants, master tailors, silver smiths, indigo dyers — and the daily produce of the Gash valley. Our concierge walks visitors through with a guide who knows which stalls are worth your morning.",
    image: "/sudan/khatmiyya-columns.jpg",
    credit: "The arcades, Khatmiyya complex · Photo: Wikimedia Commons",
  },
];

export function ThisIsKassala() {
  return (
    <section
      id="kassala"
      className="relative px-6 py-32 lg:px-12 lg:py-44"
      style={{ background: "var(--color-bone-soft)" }}
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-10" style={{ background: "var(--color-gold)" }} />
              <span
                className="text-[10px] font-medium uppercase tracking-[0.42em]"
                style={{ color: "var(--color-mist)" }}
              >
                هذه كسلا · This is Kassala
              </span>
              <span
                className="h-px w-10"
                style={{ background: "var(--color-gold)", transform: "scaleX(-1)" }}
              />
            </div>
            <h2
              className="font-display mt-8 tracking-[-0.015em]"
              style={{
                color: "var(--color-charcoal)",
                fontSize: "clamp(40px, 5.5vw, 76px)",
                lineHeight: 1.02,
                fontWeight: 400,
              }}
            >
              The place behind the property.
            </h2>
            <p className="mt-8 text-[16px] leading-[1.9]" style={{ color: "var(--color-stone)" }}>
              Before the suites, before the bazaar, before any of this — there was Kassala.
              A city of granite spires, Sufi pilgrimage, and the sweetest fruit in Sudan;
              of Beja poetry, Egyptian foundations, and the steady rhythm of a riverbed
              that floods once a year and feeds everything that follows.
            </p>
            <p
              className="font-arabic mt-4 text-[18px] leading-[1.85]"
              dir="rtl"
              style={{ color: "var(--color-stone)" }}
            >
              قبل القصور، قبل السوق، قبل كلّ شيء — كانت كسلا.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {LANDMARKS.map((l, i) => (
            <Reveal key={l.id} delay={i * 90}>
              <article className="flex h-full flex-col">
                <div
                  className="relative aspect-[4/5] overflow-hidden"
                  style={{ background: "var(--color-bone)" }}
                >
                  <Image
                    src={l.image}
                    alt={l.english}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="transition-transform duration-[1400ms] hover:scale-[1.04]"
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 px-6 py-5"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, rgba(20,12,30,0.85) 100%)",
                    }}
                  >
                    <span
                      className="text-[10px] font-medium uppercase tracking-[0.4em]"
                      style={{ color: "var(--color-gold-soft)" }}
                    >
                      {l.credit}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3
                    className="font-display text-[26px] leading-[1.15]"
                    style={{ color: "var(--color-charcoal)" }}
                  >
                    {l.english}
                  </h3>
                  <span
                    className="font-arabic text-[20px] leading-none"
                    dir="rtl"
                    style={{ color: "var(--color-royal-deep)" }}
                  >
                    {l.arabic}
                  </span>
                </div>
                <span
                  className="mt-2 text-[10px] font-medium uppercase tracking-[0.4em]"
                  style={{ color: "var(--color-mist)" }}
                >
                  {l.romanised}
                </span>
                <p className="mt-4 text-[14px] leading-[1.85]" style={{ color: "var(--color-stone)" }}>
                  {l.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div
            className="mt-20 flex flex-col items-center justify-between gap-6 border-t pt-10 text-center sm:flex-row sm:text-left"
            style={{ borderColor: "var(--color-line)" }}
          >
            <p
              className="max-w-md text-[14px] leading-[1.85]"
              style={{ color: "var(--color-stone)" }}
            >
              Every visit is curated with a Beja guide, a local historian, or a senior member
              of the concierge team. Tell us what you want to understand — we'll build the day around it.
            </p>
            <a href="#concierge" className="btn-primary">
              Plan a Cultural Day
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
