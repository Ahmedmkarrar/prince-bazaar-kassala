interface OrnamentProps {
  variant?: "light" | "dark" | "gold";
  className?: string;
}

export function Ornament({ variant = "light", className = "" }: OrnamentProps) {
  const stroke =
    variant === "dark"
      ? "rgba(239,224,191,0.45)"
      : variant === "gold"
      ? "var(--color-gold)"
      : "var(--color-gold)";
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span
        className="h-px flex-1 max-w-[180px]"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${stroke} 100%)` }}
      />
      <svg width="42" height="14" viewBox="0 0 42 14" fill="none" aria-hidden>
        <path
          d="M2 7 L8 7 M34 7 L40 7"
          stroke={stroke}
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M14 7 L21 2 L28 7 L21 12 Z"
          stroke={stroke}
          strokeWidth="0.8"
          fill="none"
        />
        <circle cx="21" cy="7" r="1.4" fill={stroke} />
        <path d="M11 7 L14 7 M28 7 L31 7" stroke={stroke} strokeWidth="0.8" strokeLinecap="round" />
      </svg>
      <span
        className="h-px flex-1 max-w-[180px]"
        style={{ background: `linear-gradient(90deg, ${stroke} 0%, transparent 100%)` }}
      />
    </div>
  );
}

export function Geometric({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 32" fill="none" aria-hidden className={className}>
      <g stroke={color} strokeWidth="0.6">
        {Array.from({ length: 9 }).map((_, i) => {
          const x = 16 + i * 21;
          return (
            <g key={i}>
              <path d={`M${x - 6} 16 L${x} 6 L${x + 6} 16 L${x} 26 Z`} />
              <circle cx={x} cy={16} r="1.2" fill={color} />
            </g>
          );
        })}
        <path d="M0 16 L200 16" strokeDasharray="1 4" opacity="0.4" />
      </g>
    </svg>
  );
}
