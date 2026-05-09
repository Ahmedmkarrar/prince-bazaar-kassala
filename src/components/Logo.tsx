import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: { coin: 36, type: "15px", sub: "8.5px" },
  md: { coin: 44, type: "17px", sub: "9px" },
  lg: { coin: 64, type: "22px", sub: "10px" },
} as const;

export function Logo({ className = "", variant = "dark", size = "md" }: LogoProps) {
  const titleColor = variant === "dark" ? "var(--color-charcoal)" : "#FFFFFF";
  const subColor = variant === "dark" ? "var(--color-royal)" : "#E9C77B";
  const dim = SIZES[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full"
        style={{
          width: dim.coin,
          height: dim.coin,
          background:
            variant === "dark"
              ? "linear-gradient(135deg, #FBF8F1 0%, #E5E0D2 100%)"
              : "linear-gradient(135deg, #F4EFE6 0%, #DCDCE2 100%)",
          boxShadow:
            variant === "dark"
              ? "0 2px 8px rgba(59, 22, 96, 0.18), inset 0 0 0 1px rgba(233, 199, 123, 0.45)"
              : "inset 0 0 0 1px rgba(233, 199, 123, 0.45)",
        }}
      >
        <Image
          src="/logos/princebazaar.jpeg"
          alt="Prince Bazaar Kassala"
          width={dim.coin}
          height={dim.coin}
          priority
          sizes={`${dim.coin}px`}
          style={{ objectFit: "contain", width: "120%", height: "120%" }}
        />
      </div>
      <div className="leading-tight">
        <div
          className="font-display"
          style={{
            color: titleColor,
            letterSpacing: "0.06em",
            fontSize: dim.type,
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          Prince Bazaar
        </div>
        <div
          className="font-medium uppercase"
          style={{
            fontSize: dim.sub,
            letterSpacing: "0.42em",
            color: subColor,
            marginTop: "1px",
          }}
        >
          Kassala
        </div>
      </div>
    </div>
  );
}
