/**
 * Single source of truth for the slugs behind the two dynamic route trees.
 *
 * These lists were previously copied into the sitemap, both `[slug]` pages and
 * the OG card routes. The copies drifted — pages existed that the sitemap never
 * listed — so anything that enumerates routes must import from here.
 *
 * Order is significant: both pages index into the `services.items.N` /
 * `casesPage` translation arrays by position in `SERVICE_SLUGS`.
 */

export const SERVICE_SLUGS = [
  "prototyping",
  "die-casting",
  "post-processing",
  "surface-treatment",
  "quality",
  "assembly",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

/** Key each service uses inside the `serviceDetail` translation namespace. */
export const SERVICE_TITLE_KEY: Record<ServiceSlug, string> = {
  prototyping: "prototyping",
  "die-casting": "dieCasting",
  "post-processing": "postProcessing",
  "surface-treatment": "surfaceTreatment",
  quality: "quality",
  assembly: "assembly",
};

export const CASE_SLUGS = [
  "supplier-proximity",
  "velux-kanban",
  "frandsen-downlight",
  "one-collection-finn-juhl",
] as const;

export type CaseSlug = (typeof CASE_SLUGS)[number];

export function isServiceSlug(slug: string): slug is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(slug);
}

export function isCaseSlug(slug: string): slug is CaseSlug {
  return (CASE_SLUGS as readonly string[]).includes(slug);
}
