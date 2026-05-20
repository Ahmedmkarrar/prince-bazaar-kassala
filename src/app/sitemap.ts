import type { MetadataRoute } from "next";

const BASE = "https://prince-bazaar.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/welcome", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/shahad", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/shahad/about", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/shahad/construction", priority: 0.5, changeFrequency: "monthly" as const },
    { url: "/shahad/real-estate", priority: 0.5, changeFrequency: "monthly" as const },
    { url: "/shahad/prince-hotel", priority: 0.5, changeFrequency: "monthly" as const },
    { url: "/shahad/contact", priority: 0.4, changeFrequency: "monthly" as const },
  ];
  return routes.map((r) => ({
    url: `${BASE}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
