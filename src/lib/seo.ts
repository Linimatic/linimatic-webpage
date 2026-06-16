import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_URL = "https://linimatic.dk";

export type Locale = (typeof routing.locales)[number];

const LOCALES = routing.locales as readonly Locale[];

/** Open Graph locale codes (language_TERRITORY) per app locale. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_DK",
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
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
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
          url: `${SITE_URL}/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: title,
        },
      ],
    },
  };
}
