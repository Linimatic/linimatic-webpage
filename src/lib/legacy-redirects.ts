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
  /** Old slug in each language, without locale prefix or slashes. */
  en: string;
  da: string;
  de: string;
  /** New path on this site, without locale prefix. */
  to: string;
};

const LEGACY_ROUTES: LegacyRoute[] = [
  // ── Core pages ──────────────────────────────────────────────────────────
  { en: "about-us", da: "om-os", de: "uber-uns", to: "/about" },
  { en: "contact", da: "kontakt", de: "kontakt", to: "/contact" },
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

  // ── Retired news section → closest topical page ──────────────────────────
  { en: "news", da: "nyheder", de: "nachrichten", to: "/about" },
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
    to: "/contact",
  },
  // The old site published this job ad under the same Danish slug in all three
  // language trees.
  {
    en: "maskinarbejder-industritekniker-eller-vaerktojsmager",
    da: "maskinarbejder-industritekniker-eller-vaerktojsmager",
    de: "maskinarbejder-industritekniker-eller-vaerktojsmager",
    to: "/jobs",
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
  }

  return redirects;
}
