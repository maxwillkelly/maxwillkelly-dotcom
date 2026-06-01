import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
};

export default sitemap;
