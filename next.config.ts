import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// CSP — locked down for production, looser in dev so HMR works.
const cspProd = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' fonts.googleapis.com",
  "font-src 'self' fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://*.unsplash.com https://images.unsplash.com https://upload.wikimedia.org",
  "connect-src 'self' https://api.anthropic.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  // Stops the page being embedded in another site's iframe (clickjacking).
  { key: "X-Frame-Options", value: "DENY" },
  // Prevents browsers MIME-sniffing content-types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Limit referrer leakage.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable powerful features the site doesn't use.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  // Force HTTPS for a year, include subdomains, opt into preload list.
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  // Tight CSP in production, omitted in dev so Next dev tools keep working.
  ...(isDev ? [] : [{ key: "Content-Security-Policy", value: cspProd }]),
  // Block XSS-style attacks in older browsers.
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // DNS prefetch.
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // Don't expose Next version in response headers.
  poweredByHeader: false,

  images: {
    // AVIF first — it holds detail far better than WebP at the low bitrates
    // these 1280px client photos need, which is most of the sharpness win.
    formats: ["image/avif", "image/webp"],
    // The client photography tops out at 1280px, so most of this ladder stays
    // low deliberately — asking for more only upscales. The exceptions are the
    // frames that fill the viewport and so were upscaled to 3840px masters:
    // the hero, the address band and the commercial-plaza panel. Every other
    // image carries an accurate `sizes`, so a 340px gallery cell never
    // requests the top rungs.
    deviceSizes: [360, 480, 640, 768, 960, 1080, 1280, 1600, 1920, 2560, 3840],
    imageSizes: [96, 128, 192, 256, 320, 384, 480, 640],
    // Next 16 rejects any quality not listed here (default is [75] only).
    // 88 is the site-wide value from <Photo>; 92 is the gallery lightbox.
    qualities: [75, 88, 92],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },

  async headers() {
    return [
      {
        // Apply to every route.
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Admin pages — additionally tell browsers and crawlers to stay out.
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
      {
        // API responses — never cache, never indexed.
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },
};

export default nextConfig;
