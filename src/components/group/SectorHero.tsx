import Image from "next/image";

type SectorHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  align?: "left" | "center";
};

export function SectorHero({ eyebrow, title, subtitle, image, align = "left" }: SectorHeroProps) {
  return (
    <section
      className="relative flex min-h-[78vh] items-end overflow-hidden"
      style={{ background: "var(--color-charcoal)" }}
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.55 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,12,30,0.55) 0%, rgba(20,12,30,0.25) 35%, rgba(20,12,30,0.85) 100%)",
          }}
        />
      </div>

      <div
        className={`relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 pt-40 lg:px-12 lg:pb-28 lg:pt-44 ${
          align === "center" ? "text-center" : ""
        }`}
      >
        <div className={`${align === "center" ? "mx-auto" : ""} max-w-3xl`}>
          <div className="flex items-center gap-3" style={{ justifyContent: align === "center" ? "center" : "flex-start" }}>
            <span className="hairline" />
            <span className="eyebrow" style={{ color: "var(--color-gold-soft)" }}>
              {eyebrow}
            </span>
          </div>
          <h1
            className="font-display mt-6 text-[44px] leading-[1.05] tracking-[-0.01em] sm:text-[58px] lg:text-[76px]"
            style={{ color: "#FFFCF5" }}
          >
            {title}
          </h1>
          <p
            className="mt-6 max-w-2xl text-[15px] leading-[1.85] sm:text-[17px]"
            style={{ color: "rgba(255,252,245,0.8)" }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
