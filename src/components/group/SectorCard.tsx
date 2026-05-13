import Image from "next/image";
import Link from "next/link";
import type { Sector } from "@/lib/group";

export function SectorCard({ sector, index }: { sector: Sector; index: number }) {
  const isEven = index % 2 === 0;
  return (
    <Link
      href={sector.href}
      className="group relative block overflow-hidden"
      style={{ background: "var(--color-bone)" }}
    >
      <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[3/4]">
        <Image
          src={sector.image}
          alt={sector.name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="transition-transform duration-[1400ms] group-hover:scale-[1.06]"
          style={{ objectFit: "cover" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: isEven
              ? "linear-gradient(180deg, rgba(20,12,30,0.15) 0%, rgba(20,12,30,0.75) 100%)"
              : "linear-gradient(180deg, rgba(59,22,96,0.15) 0%, rgba(20,12,30,0.78) 100%)",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
          <span
            className="text-[10px] font-medium uppercase tracking-[0.4em]"
            style={{ color: "var(--color-gold-soft)" }}
          >
            {sector.tagline}
          </span>
          <h3
            className="font-display mt-3 text-[28px] leading-[1.1] sm:text-[32px] lg:text-[40px]"
            style={{ color: "#FFFCF5" }}
          >
            {sector.name}
          </h3>
          <p
            className="mt-4 max-w-md text-[14px] leading-[1.7]"
            style={{ color: "rgba(255,252,245,0.78)" }}
          >
            {sector.blurb}
          </p>
          <div
            className="mt-6 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] transition-all group-hover:gap-5"
            style={{ color: "var(--color-gold-pale)" }}
          >
            Discover
            <span aria-hidden>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
