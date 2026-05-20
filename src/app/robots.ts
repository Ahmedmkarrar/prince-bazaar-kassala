import type { MetadataRoute } from "next";

const BASE = "https://prince-bazaar.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*", "/booking/*"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
