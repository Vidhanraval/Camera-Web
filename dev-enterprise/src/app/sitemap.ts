import type { MetadataRoute } from "next"
import { SITE_CONFIG } from "@/lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: SITE_CONFIG.url, changeFrequency: "daily" as const, priority: 1.0 },
    { url: `${SITE_CONFIG.url}/shop`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${SITE_CONFIG.url}/categories`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_CONFIG.url}/brands`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${SITE_CONFIG.url}/about`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${SITE_CONFIG.url}/contact`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_CONFIG.url}/services`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${SITE_CONFIG.url}/blog`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${SITE_CONFIG.url}/faq`, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${SITE_CONFIG.url}/policies/shipping`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${SITE_CONFIG.url}/policies/returns`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${SITE_CONFIG.url}/policies/privacy`, changeFrequency: "monthly" as const, priority: 0.4 },
    { url: `${SITE_CONFIG.url}/policies/terms`, changeFrequency: "monthly" as const, priority: 0.4 },
  ]

  return staticRoutes.map((route) => ({
    url: route.url,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
