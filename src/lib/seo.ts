import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

/**
 * Canonical origin for the whole site. Every absolute URL the site emits —
 * canonicals, hreflang, sitemap, robots, Open Graph, JSON-LD `@id` — must be
 * derived from this and never written out by hand, or the two copies drift and
 * entity references silently stop resolving.
 *
 * `.eu` rather than `.dk` on purpose. Google treats `.dk` as a country-code TLD
 * — "a strong signal … your site is explicitly intended for a certain country"
 * — which caps reach outside Denmark, while `.eu` is on Google's generic list
 * and carries no country lock-in. The old WordPress site already canonicalised
 * everything to linimatic.eu, so this is also where the existing search history
 * lives. Danish relevance is carried by the da pages, hreflang and the DK
 * address in the Organization schema, not by the suffix.
 */
export const SITE_URL = "https://linimatic.eu";

export type Locale = (typeof routing.locales)[number];

const LOCALES = routing.locales as readonly Locale[];

/** Open Graph locale codes (language_TERRITORY) per app locale. */
export const OG_LOCALE: Record<Locale, string> = {
  // en_GB, not en_DK: the English pages address international and German
  // buyers, and declaring them as Denmark-territory English narrows the
  // audience the .eu domain exists to reach. (Open Graph wants a real
  // language_TERRITORY pair, so bare "en" is not an option.)
  en: "en_GB",
  da: "da_DK",
  de: "de_DE",
};

/** OG locales for every language OTHER than the current one. */
export function ogAlternateLocales(locale: Locale): string[] {
  return LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]);
}

/**
 * Truncate text for a meta description without cutting a word in half.
 * Returns the text unchanged if it already fits; otherwise trims to the last
 * whole word within `max` and appends an ellipsis.
 */
export function metaDescription(text: string, max = 160): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:—-]+$/, "") + "…";
}

/**
 * Self-referencing canonical + bidirectional hreflang alternates for a path.
 * `path` starts with "/" (e.g. "/services") or is "" for the homepage.
 * Each locale's page points its canonical at ITSELF — never at the English
 * version — so Google indexes all three language variants independently.
 */
export function localizedAlternates(
  path: string,
  locale: Locale,
): NonNullable<Metadata["alternates"]> {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      "x-default": `${SITE_URL}/en${path}`,
    },
  };
}

/**
 * Compose full per-page metadata: localized title/description, self-referencing
 * canonical, hreflang alternates, and per-locale Open Graph.
 * Set `absoluteTitle` to bypass the "%s | Linimatic A/S" template (used by the
 * homepage, whose title already carries the brand).
 *
 * `ownOgImage` marks the segments that ship their own `opengraph-image` route
 * (services and cases, whose cards carry the page title). Everything else
 * points at the locale root card. The image has to be named explicitly here:
 * Next's `opengraph-image` file convention applies only to the segment that
 * declares it and does not cascade to nested routes, so relying on inheritance
 * silently drops og:image from every page that has no file of its own.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
  ownOgImage = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  ownOgImage?: boolean;
}): Metadata {
  const ogImage = `${SITE_URL}/${locale}${ownOgImage ? path : ""}/opengraph-image`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: localizedAlternates(path, locale),
    openGraph: {
      type: "website",
      siteName: "Linimatic A/S",
      title,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      locale: OG_LOCALE[locale],
      alternateLocale: ogAlternateLocales(locale),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: title,
        },
      ],
    },
  };
}
