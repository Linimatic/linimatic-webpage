import type { MetadataRoute } from "next";
import { SITE_URL as BASE_URL } from "@/lib/seo";

const LOCALES = ["da", "en", "de"] as const;

// Stable last-content-update date. Bump this when the site's content materially
// changes — using `new Date()` would reset every entry's <lastmod> on each
// unrelated deploy, which Google learns to ignore as a noisy signal.
const LAST_UPDATED = new Date("2026-07-15");

const SERVICE_SLUGS = [
  "prototyping",
  "die-casting",
  "post-processing",
  "surface-treatment",
  "quality",
  "assembly",
];

const CASE_SLUGS = ["dewalt", "one-collection", "velux", "supplier-proximity"];

type StaticRoute = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

const staticRoutes: StaticRoute[] = [
  { path: "", priority: 1.0, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/cases", priority: 0.8, changeFrequency: "weekly" },
  { path: "/why-zinc", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/jobs", priority: 0.6, changeFrequency: "weekly" },
  { path: "/zinkers", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
];

function makeAlternates(path: string) {
  return {
    languages: Object.fromEntries([
      ...LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`]),
      ["x-default", `${BASE_URL}/en${path}`],
    ]),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static routes — one entry per locale
  for (const route of staticRoutes) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified: LAST_UPDATED,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: makeAlternates(route.path),
      });
    }
  }

  // Service pages
  for (const slug of SERVICE_SLUGS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/services/${slug}`,
        lastModified: LAST_UPDATED,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: makeAlternates(`/services/${slug}`),
      });
    }
  }

  // Case study pages
  for (const slug of CASE_SLUGS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/cases/${slug}`,
        lastModified: LAST_UPDATED,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: makeAlternates(`/cases/${slug}`),
      });
    }
  }

  return entries;
}
