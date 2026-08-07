import Image from "next/image";

/**
 * Single entry point for every photograph on the site.
 *
 * The client photography is WhatsApp-compressed and tops out at 1280px, so the
 * two things that decide whether it reads as sharp are (a) never asking the
 * browser for more pixels than the file actually has, and (b) letting the image
 * optimiser resize from the largest master rather than from a pre-shrunk copy.
 * Both were being lost to `background-image`, which has no srcset at all.
 */

/** Warm 8x5 placeholder — matches the bone/ivory page ground, so the fade-in reads as paper, not grey. */
const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiNlOGRmY2YiLz48L3N2Zz4=";

/**
 * Two files where the "full-size" sibling is not actually the better master —
 * both are letterboxed crops that lost more height than the -sm copy kept
 * (room-double is 1180x430 against a 720x405 -sm; events-hall is 620x500
 * against 720x581). Upgrading these would trade resolution for a worse frame.
 */
const KEEP_SM = new Set(["room-double", "events-hall"]);

/**
 * Resolve a `-sm` thumbnail to its full-resolution master.
 *
 * Every other `-sm.webp` in /public/hotel has a 1280px sibling. Serving the
 * 720px copy into a slot wider than 720 device pixels was the single biggest
 * source of softness; pointing at the master lets Next downscale to the slot.
 */
function master(src: string): string {
  const stem = src.replace(/^.*\//, "").replace(/-sm\.(webp|jpg|jpeg|png)$/i, "");
  if (KEEP_SM.has(stem)) return src;
  return src.replace(/-sm\.(webp|jpg|jpeg|png)$/i, ".$1");
}

export interface PhotoProps {
  src: string;
  alt: string;
  /**
   * Slot width across breakpoints. Required — an accurate `sizes` is what stops
   * the browser over-fetching on mobile and under-fetching on desktop.
   */
  sizes: string;
  /** Focal point, e.g. "62% center". Defaults to centre. */
  position?: string;
  /** Set on above-the-fold images only. */
  priority?: boolean;
  /** Classes for the <img> itself — transforms, transitions, filters. */
  className?: string;
}

export function Photo({ src, alt, sizes, position, priority = false, className = "" }: PhotoProps) {
  return (
    <Image
      src={master(src)}
      alt={alt}
      fill
      sizes={sizes}
      // These sources are already lossy; re-compressing hard compounds the
      // artefacts, and at =<1280px the extra bytes are affordable.
      quality={88}
      priority={priority}
      placeholder="blur"
      blurDataURL={BLUR}
      className={`object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
