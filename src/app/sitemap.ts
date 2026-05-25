import type { MetadataRoute } from "next";
import { SEED_COMMUNITIES } from "@/lib/seed-data";

const SITE_URL = process.env.NEXT_PUBLIC_URL ?? "https://agora-network.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/manifesto`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/preview`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const communityRoutes: MetadataRoute.Sitemap = SEED_COMMUNITIES.map((c) => ({
    url: `${SITE_URL}/c/${c.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...communityRoutes];
}
