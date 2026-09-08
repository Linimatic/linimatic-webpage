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

/**
 * News posts, newest first — this is the order the listing renders in.
 *
 * `date` is the publication date (ISO, no time): it drives the displayed date,
 * the JSON-LD `datePublished` and the sitemap `lastmod`, so it must be a real
 * date rather than a formatting choice. `image` is optional; posts without one
 * render as a text card.
 *
 * Adding a post = one entry here plus a matching `newsPage.items.<slug>` block
 * in ALL THREE message files (da, en, de). A slug listed here with no copy
 * behind it throws at build time, which is deliberate — a half-translated post
 * should never reach the site.
 */
const NEWS_SOURCE = [
  {
    slug: "zink-temadag-september-2026",
    date: "2026-08-11",
    image: "/images/zink-temadag/seminar-attendees.jpg",
  },
] as const;

export type NewsSlug = (typeof NEWS_SOURCE)[number]["slug"];

export type NewsPost = {
  slug: NewsSlug;
  /** ISO calendar day, e.g. "2026-08-11". */
  date: string;
  image?: string;
};

/** Widened on purpose: the list's length must stay open so `length === 0`
    (the empty state) is a real check and not a type error. */
export const NEWS_POSTS: readonly NewsPost[] = NEWS_SOURCE;

export const NEWS_SLUGS = NEWS_SOURCE.map((post) => post.slug) as readonly NewsSlug[];

export function isNewsSlug(slug: string): slug is NewsSlug {
  return (NEWS_SLUGS as readonly string[]).includes(slug);
}

export function getNewsPost(slug: NewsSlug) {
  return NEWS_POSTS.find((post) => post.slug === slug)!;
}

/**
 * Display form of a post's `date`, in the reader's language.
 * Forced to UTC: the dates are plain calendar days, and formatting them in the
 * server's local zone shifts them a day either side of midnight.
 */
export function formatNewsDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function isServiceSlug(slug: string): slug is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(slug);
}

export function isCaseSlug(slug: string): slug is CaseSlug {
  return (CASE_SLUGS as readonly string[]).includes(slug);
}
