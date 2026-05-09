interface TakaSilhouetteProps {
  layer?: "back" | "mid" | "front";
  className?: string;
}

const PATHS = {
  back:
    "M0 280 L60 240 L130 220 L200 180 L260 200 L320 160 L380 180 L450 140 L520 170 L600 150 L680 175 L760 145 L840 165 L920 140 L1000 170 L1080 150 L1160 175 L1240 155 L1320 180 L1400 200 L1440 195 L1440 320 L0 320 Z",
  mid:
    "M0 320 L40 280 L120 250 L180 270 L260 220 L340 240 L420 200 L500 230 L560 215 L640 250 L720 220 L800 245 L880 215 L960 240 L1040 220 L1120 250 L1200 230 L1280 255 L1360 225 L1440 245 L1440 380 L0 380 Z",
  front:
    "M0 380 L60 360 L160 340 L240 360 L340 320 L440 350 L520 330 L600 365 L700 340 L800 370 L900 345 L1000 375 L1100 350 L1200 380 L1280 355 L1360 385 L1440 365 L1440 480 L0 480 Z",
} as const;

const FILLS = {
  back: "rgba(14, 59, 46, 0.6)",
  mid: "rgba(11, 47, 36, 0.85)",
  front: "rgba(8, 32, 24, 1)",
} as const;

export function TakaSilhouette({ layer = "back", className = "" }: TakaSilhouetteProps) {
  return (
    <svg
      viewBox="0 0 1440 480"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <path d={PATHS[layer]} fill={FILLS[layer]} />
    </svg>
  );
}
