import type { MetadataRoute } from "next";

import { portfolioProjects } from "@/content";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = portfolioProjects.map(
    (project) => ({
      url: `${siteUrl}${project.route}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: project.tier === "flagship" ? 0.9 : 0.7,
    }),
  );

  return [...staticRoutes, ...projectRoutes];
}
