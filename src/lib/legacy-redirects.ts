/**
 * Redirect map from the old WordPress site (linimatic.eu) to this site.
 *
 * The old site put English at the root (`/services/`) and prefixed only the
 * other two languages (`/da/tjenester/`, `/de/dienstleistungen/`). This site
 * prefixes every locale, so old English URLs must land on `/en/...` — sending
 * them through locale detection instead would hand an English-language ranking
 * to whatever language the visitor's browser happens to ask for.
 *
 * These run as `redirects()` in next.config, which Next evaluates BEFORE the
 * proxy (see node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md
 * "Execution order"). That ordering matters: next-intl's middleware would
 * otherwise rewrite an unprefixed legacy path like `/casting-foundry` to
 * `/en/casting-foundry` and 404 it before any redirect could fire.
 *
 * Old articles with no counterpart on this site (retired news posts, case
 * stories that were not migrated) point at the closest topical hub rather than
 * the homepage — a redirect to an unrelated page is treated as a soft 404 and
 * passes nothing on.
 */

type LegacyRoute = {
  /** Old slug in each language, without locale prefix or outer slashes. */
  en: string;
  da: string;
  de: string;
  /** New path on this site, without locale prefix. */
  to: string;
};

const LEGACY_ROUTES: LegacyRoute[] = [
  // ── Core pages ──────────────────────────────────────────────────────────
  { en: "about-us", da: "om-os", de: "uber-uns", to: "/about" },
  { en: "contact", da: "kontakt", de: "kontakt", to: "/contact/people" },
  { en: "services", da: "tjenester", de: "dienstleistungen", to: "/services" },
  { en: "case-stories", da: "case-historier", de: "fallbeispiele", to: "/cases" },
  { en: "job", da: "job", de: "job", to: "/jobs" },
  {
    en: "code-of-conduct",
    da: "adfaerdskodeks",
    de: "verhaltenskodex",
    to: "/about/code-of-conduct",
  },

  // ── Service pages ───────────────────────────────────────────────────────
  {
    en: "prototypes-and-preseries",
    da: "prototyper-og-forserier",
    de: "prototypen-und-vorserien",
    to: "/services/prototyping",
  },
  { en: "casting-foundry", da: "stoberi", de: "gieserei", to: "/services/die-casting" },
  {
    en: "post-processing",
    da: "efterbehandling",
    de: "nachbearbeitung",
    to: "/services/post-processing",
  },
  {
    en: "surface-coating",
    da: "overfladebelaegning",
    de: "oberflachenbeschichtung",
    to: "/services/surface-treatment",
  },
  {
    en: "quality-assurance",
    da: "kvalitetssikring",
    de: "qualitatssicherung",
    to: "/services/quality",
  },
  {
    en: "mounting-and-assembly",
    da: "montering-og-samling",
    de: "montage-und-zusammenbau",
    to: "/services/assembly",
  },
  // DFM review lives inside the prototyping service on this site.
  {
    en: "design-and-casting-optimization",
    da: "design-og-optimering-af-stobning",
    de: "design-und-gussoptimierung",
    to: "/services/prototyping",
  },
  // Mould construction, tool life and fireproof tool storage. The die-casting
  // page carries this now — it covers tool life and the preventive maintenance
  // programme explicitly.
  {
    en: "casting-tools-and-storage",
    da: "stobevaerktojer-og-opbevaring",
    de: "gusswerkzeuge-und-lagerung",
    to: "/services/die-casting",
  },

  // ── Case studies migrated 1:1 (source URLs recorded in docs/cases/*.md) ──
  {
    en: "there-are-benefits-to-having-your-supplier-close-by",
    da: "der-er-fordele-ved-at-have-din-leverandor-taet-pa",
    de: "es-hat-vorteile-wenn-ihr-lieferant-in-der-nahe-ist",
    to: "/cases/supplier-proximity",
  },
  {
    en: "smooth-process-with-a-kanban-agreement",
    da: "smidig-proces-med-en-kanban-aftale",
    de: "reibungsloser-ablauf-mit-einer-kanban-vereinbarung",
    to: "/cases/velux-kanban",
  },
  {
    en: "faster-smarter-and-made-in-denmark",
    da: "hurtigere-smartere-og-fremstillet-i-danmark",
    de: "schneller-intelligenter-und-in-danemark-hergestellt",
    to: "/cases/frandsen-downlight",
  },
  {
    en: "to-relaunch-a-classic-design",
    da: "at-relancere-et-klassisk-design",
    de: "einen-design-klassiker-wieder-aufleben-zu-lassen",
    to: "/cases/one-collection-finn-juhl",
  },
  // The forecast-agreement article covers the same VELUX arrangement the
  // Kanban case study now tells.
  {
    en: "forecast-agreements",
    da: "forventningsaftaler",
    de: "prognosevereinbarungen",
    to: "/cases/velux-kanban",
  },

  // ── Unmigrated case stories whose subject IS a service ──────────────────
  // These three are Fritz Hansen and HOWE stories about Linimatic buying in the
  // other parts, assembling, quality-controlling and packing the finished item.
  // That is the assembly page's subject, so it satisfies the intent better than
  // a hub listing four unrelated customers.
  {
    en: "assembly-of-a-chair",
    da: "samling-af-en-stol",
    de: "montage-eines-stuhls",
    to: "/services/assembly",
  },
  {
    en: "to-rationalize-delivery",
    da: "at-rationalisere-leveringen",
    de: "die-lieferung-zu-rationalisieren",
    to: "/services/assembly",
  },
  { en: "to-be-flexible", da: "at-vaere-fleksibel", de: "flexibel-zu-sein", to: "/services/assembly" },

  // ── Case stories not migrated → cases overview ───────────────────────────
  // The Montana story spans casting, surface coating and packing, so no single
  // service page covers it — the overview is the honest destination.
  {
    en: "to-stand-on-your-own-legs",
    da: "at-sta-pa-egne-ben",
    de: "auf-eigenen-beinen-zu-stehen",
    to: "/cases",
  },
  {
    en: "development-and-production-better-than-in-china",
    da: "udvikling-og-produktion-bedre-end-i-kina",
    de: "entwicklung-und-produktion-besser-als-in-china",
    to: "/cases",
  },
  {
    en: "why-do-german-companies-choose-danish-suppliers",
    da: "hvorfor-vaelger-tyske-virksomheder-danske-leverandorer",
    de: "warum-wahlen-deutsche-unternehmen-danische-lieferanten",
    to: "/cases",
  },
  {
    en: "co-operation-agreement",
    da: "samarbejdsaftale",
    de: "co-operations-vertrag",
    to: "/services",
  },

  // ── Educational and product content ─────────────────────────────────────
  {
    en: "10-reasons-to-choose-die-casted-zink",
    da: "10-grunde-til-at-vaelge-trykstobt-zink",
    de: "10-grunde-sich-fur-zinkdruckguss-zu-entscheiden",
    to: "/why-zinc",
  },
  {
    en: "zink-as-sinkers-in-fishing-gear",
    da: "zink-som-bundgarn-i-fiskeredskaber",
    de: "zink-als-senkblei-in-fischereigeraten",
    to: "/zinkers",
  },
  {
    en: "zinc-replaces-environmentally-hazardous-lead-in-fishing-gear",
    da: "zink-erstatter-miljofarligt-bly-i-fiskeredskaber",
    de: "zink-ersetzt-umweltschadliches-blei-in-fanggeraten",
    to: "/zinkers",
  },
  {
    en: "zinc-theme-day-2023",
    da: "zink-temadag-2023",
    de: "zink-thementag-2023",
    to: "/zink-temadag",
  },

  // ── Old news section → the new one; individual retired posts have no
  //    counterpart here, so they still point at the closest topical page ─────
  { en: "news", da: "nyheder", de: "nachrichten", to: "/about/news" },
  {
    en: "linimatic-improve-casting-tool-maintenance",
    da: "linimatic-forbedrer-vedligeholdelse-af-stobevaerktoj",
    de: "linimatic-verbessert-die-wartung-von-gieswerkzeugen",
    to: "/services/die-casting",
  },
  {
    en: "linimatic-strengthens-the-organization",
    da: "linimatic-styrker-organisationen",
    de: "linimatic-starkt-die-organisation",
    to: "/about",
  },
  {
    en: "new-zinc-die-casting-machine-at-linimatic",
    da: "ny-zink-trykstobemaskine-hos-linimatic",
    de: "neue-zinkdruckgussmaschine-bei-linimatic",
    to: "/services/die-casting",
  },
  {
    en: "receive-our-newsletter",
    da: "modtag-vores-nyhedsbrev",
    de: "unseren-newsletter-erhalten",
    to: "/contact/people",
  },
  // The old site published its job ads under the same Danish slug in all three
  // language trees.
  ...[
    "maskinarbejder-industritekniker-eller-vaerktojsmager",
    "medarbejder-til-produktion",
    "medarbejder-til-production",
    "medarbejder-til-produktion-og-opstilling-pa-stobemaskiner",
    "kvalitets-og-miljoansvarlig",
    "lagermedarbejder-vi-soger-en-ny-kollega-til-vores-lager",
    "maskintekniker-produktions-teknolog",
    "vedligeholds-afdelingen-hos-linimatic-a-s-i-helsinge-soger-ny-medarbejder",
  ].map((slug) => ({ en: slug, da: slug, de: slug, to: "/jobs" })),

  // ── Policy pages ─────────────────────────────────────────────────────────
  { en: "cookie-policy", da: "cookiepolitik", de: "cookie-richtlinie", to: "/cookies" },
  { en: "data-policy", da: "datapolitik", de: "datenpolitik", to: "/privacy" },
  {
    en: "cookie-and-data-protection-policy",
    da: "cookie-og-databeskyttelsespolitik",
    de: "cookie-und-datenschutzpolitik",
    to: "/privacy",
  },
  {
    en: "about-us/linimatic-code-of-conduct",
    da: "om-os/linimatic-adfaerdskodeks",
    de: "uber-uns/linimatic-verhaltenskodex",
    to: "/about/code-of-conduct",
  },
];

/**
 * Old URLs that do not fit the three-language table: Danish slugs the old site
 * spelled with "ø", and one-off spellings. Found by checking the Wayback
 * Machine's capture list of linimatic.eu against the live site (2026-10-26).
 */
const LEGACY_PATHS: { from: string; to: string }[] = [
  { from: "/da/10-grunde-til-at-vaelge-trykstøbt-zink", to: "/da/why-zinc" },
  {
    from: "/da/der-er-fordele-ved-at-have-din-leverandør-taet-pa",
    to: "/da/cases/supplier-proximity",
  },
  { from: "/da/design-og-optimering-af-støbning", to: "/da/services/prototyping" },
  { from: "/da/hvorfor-vaelger-tyske-virksomheder-danske-leverandører-", to: "/da/cases" },
  { from: "/da/ny-zinkstøbemaskine-hos-linimatic", to: "/da/services/die-casting" },
  { from: "/da/støbevaerktøjer-og-opbevaring", to: "/da/services/die-casting" },
  { from: "/da/zink-erstatter-miljøfarligt-bly-i-fiskeredskaber", to: "/da/zinkers" },
  { from: "/da/forventede-aftaler", to: "/da/cases/velux-kanban" },
  { from: "/de/giesserei", to: "/de/services/die-casting" },
  // A Danish news post the old site served from the English (root) tree.
  { from: "/linimatic-forbedre-stobevaerktojsvedligehold", to: "/da/services/die-casting" },
  { from: "/da/om-os/linimatic-code-of-conduct", to: "/da/about/code-of-conduct" },
  { from: "/de/uber-uns/linimatic-code-of-conduct", to: "/de/about/code-of-conduct" },
];

/**
 * Pages on THIS site whose slug changed after they were published. Unlike the
 * table above these use the same slug in every language, because this site's
 * paths are not localised — only the locale prefix differs.
 *
 * A slug is part of the published URL: once a page has been in the sitemap it
 * may sit in someone's Google result or bookmark, so a rename needs an entry
 * here rather than leaving the old address to 404.
 */
const RENAMED_ROUTES: { from: string; to: string }[] = [
  // The contact form was removed; visitors are sent to the staff contacts.
  { from: "/contact", to: "/contact/people" },
  // The zinc info day was announced for 16 August 2026; the real date is
  // 16 September 2026, so the slug's month was wrong (corrected 2026-08-12).
  {
    from: "/about/news/zink-temadag-august-2026",
    to: "/about/news/zink-temadag-september-2026",
  },
];

export type Redirect = {
  source: string;
  destination: string;
  permanent: boolean;
};

/**
 * Expand the table into one permanent redirect per old URL.
 * Old English URLs sat at the root, so their source has no locale segment.
 */
export function legacyRedirects(): Redirect[] {
  const redirects: Redirect[] = [];

  for (const route of LEGACY_ROUTES) {
    redirects.push({
      source: `/${route.en}`,
      destination: `/en${route.to}`,
      permanent: true,
    });
    redirects.push({
      source: `/da/${route.da}`,
      destination: `/da${route.to}`,
      permanent: true,
    });
    redirects.push({
      source: `/de/${route.de}`,
      destination: `/de${route.to}`,
      permanent: true,
    });
    // Pages missing a translation were served under the English slug in the
    // other trees too (/da/about-us/). Skipped where that path is a live page
    // on this site, e.g. /da/services.
    for (const locale of ["da", "de"] as const) {
      if (route.en !== route[locale] && `/${route.en}` !== route.to) {
        redirects.push({
          source: `/${locale}/${route.en}`,
          destination: `/${locale}${route.to}`,
          permanent: true,
        });
      }
    }
  }

  // Sources match the request path as sent, so "ø" must be percent-encoded.
  for (const route of LEGACY_PATHS) {
    redirects.push({ source: encodeURI(route.from), destination: route.to, permanent: true });
  }

  for (const route of RENAMED_ROUTES) {
    for (const locale of ["en", "da", "de"]) {
      redirects.push({
        source: `/${locale}${route.from}`,
        destination: `/${locale}${route.to}`,
        permanent: true,
      });
    }
  }

  return redirects;
}
