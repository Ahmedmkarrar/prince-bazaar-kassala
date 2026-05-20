interface BrandMarkProps {
  className?: string;
  color?: string;
  size?: number;
}

// Stylised four-lobed flower with hexagonal mountain core — references the real Prince Plaza logo geometry
export function BrandMark({ className = "", color = "currentColor", size = 64 }: BrandMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      aria-hidden
    >
      <g stroke={color} strokeWidth="0.7" fill="none" opacity="0.85">
        <path d="M 30 6 C 22 6 18 14 22 20 C 26 18 30 18 30 18 C 30 18 34 18 38 20 C 42 14 38 6 30 6 Z" />
        <path d="M 6 30 C 6 22 14 18 20 22 C 18 26 18 30 18 30 C 18 30 18 34 20 38 C 14 42 6 38 6 30 Z" />
        <path d="M 54 30 C 54 22 46 18 40 22 C 42 26 42 30 42 30 C 42 30 42 34 40 38 C 46 42 54 38 54 30 Z" />
        <path d="M 30 54 C 22 54 18 46 22 40 C 26 42 30 42 30 42 C 30 42 34 42 38 40 C 42 46 38 54 30 54 Z" />
        <path d="M 30 19 L 39 24 L 39 36 L 30 41 L 21 36 L 21 24 Z" />
        <path d="M 23 35 L 27 28 L 30 32 L 33 26 L 37 35" />
      </g>
    </svg>
  );
}

// Decorative section divider using the brand mark + line
export function BrandDivider({ color = "var(--color-gold)" }: { color?: string }) {
  return (
    <div className="flex items-center justify-center gap-5 py-2">
      <span className="h-px flex-1 max-w-[180px]" style={{ background: `linear-gradient(90deg, transparent, ${color})` }} />
      <BrandMark color={color} size={22} />
      <span className="h-px flex-1 max-w-[180px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </div>
  );
}
