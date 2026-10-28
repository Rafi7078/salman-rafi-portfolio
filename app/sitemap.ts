
import type { MetadataRoute } from "next";

import { siteConfig } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.isIndexable) {
    return [];
  }

  return [
    {
      url: siteConfig.origin,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
