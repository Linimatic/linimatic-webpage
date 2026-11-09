import type { Metadata } from "next";
import { buildMetadata, SITE_URL, type Locale } from "@/lib/seo";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { TestimonialFader } from "@/components/TestimonialFader";

type Model = "TF" | "RF";
type Rating = "good" | "neutral" | "bad";

// Standard range from the sinker price list (March 2022). The type code is the
// product's own designation — weight in grams / hole diameter in mm — and is
// shown verbatim in every language, since customers order by it.
const RANGE: Array<{
  model: Model;
  code: string;
  weight: number;
  hole: number;
  minOrder: number;
}> = [
  { model: "TF", code: "TF 50/6", weight: 50, hole: 6, minOrder: 1000 },
  { model: "TF", code: "TF 110/18", weight: 110, hole: 18, minOrder: 1000 },
  { model: "TF", code: "TF 150/7,5", weight: 150, hole: 7.5, minOrder: 1000 },
  { model: "TF", code: "TF 300/16", weight: 300, hole: 16, minOrder: 1000 },
  { model: "TF", code: "TF 1000/25", weight: 1000, hole: 25, minOrder: 250 },
  { model: "TF", code: "TF 2000/22", weight: 2000, hole: 22, minOrder: 50 },
  { model: "RF", code: "RF 250/35", weight: 250, hole: 35, minOrder: 250 },
  { model: "RF", code: "RF 400/46", weight: 400, hole: 46, minOrder: 250 },
  { model: "RF", code: "RF 800/56", weight: 800, hole: 56, minOrder: 250 },
];

const MODELS: Model[] = ["TF", "RF"];

// Columns: Linimatic sinkers, hand-cast zinc sinkers, lead sinkers — as rated
// in the sinker brochure.
const COMPARISON: Array<{ key: string; ratings: [Rating, Rating, Rating] }> = [
  { key: "environment", ratings: ["good", "good", "bad"] },
  { key: "workEnvironment", ratings: ["good", "good", "bad"] },
  { key: "assembly", ratings: ["good", "bad", "good"] },
  { key: "disassembly", ratings: ["good", "neutral", "neutral"] },
  { key: "reassembly", ratings: ["good", "neutral", "neutral"] },
  { key: "wear", ratings: ["good", "neutral", "bad"] },
  { key: "damage", ratings: ["good", "bad", "bad"] },
  { key: "lifetime", ratings: ["good", "bad", "bad"] },
  { key: "corrosion", ratings: ["good", "neutral", "good"] },
  { key: "initialCost", ratings: ["neutral", "bad", "good"] },
  { key: "totalCost", ratings: ["good", "bad", "bad"] },
];

const CONTACT_PHONE = "+45 5077 0224";
const CONTACT_EMAIL = "rif@linimatic.dk";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/zinkers",
    title: t("zinkers.title"),
    description: t("zinkers.description"),
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function RatingMark({ rating, label }: { rating: Rating; label: string }) {
  return (
    <span className="inline-flex items-center justify-center" title={label}>
      {rating === "good" && (
        <svg className="h-6 w-6 text-ember" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="11" />
          <path d="m7 12.5 3.2 3.2L17 9" fill="none" stroke="white" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {rating === "neutral" && (
        <svg className="h-6 w-6 text-zinc-400" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
          <path d="M8 12h8" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
        </svg>
      )}
      {rating === "bad" && (
        <svg className="h-6 w-6 text-zinc-700" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
          <path d="m9 9 6 6m0-6-6 6" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
        </svg>
      )}
      <span className="sr-only">{label}</span>
    </span>
  );
}

// Ring geometry for the RF drawing: centre-line radius, tube radius, and how
// much the ring is tilted towards the viewer (1 = seen from straight above).
const RING_RADIUS = 60;
const RING_TUBE = 19;
const RING_TILT = 0.55;

// Shaded perspective drawings of the two shapes — decorative, the text names them.
function ModelDrawing({ model }: { model: Model }) {
  const svgClass = "h-32 sm:h-40 w-auto max-w-full text-zinc-400";
  if (model === "TF") {
    return (
      <svg viewBox="0 0 220 140" className={svgClass} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <defs>
          <linearGradient id="tf-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#d4d4d8" />
            <stop offset="0.22" stopColor="#fafafa" />
            <stop offset="0.55" stopColor="#d4d4d8" />
            <stop offset="1" stopColor="#8b8b94" />
          </linearGradient>
          <linearGradient id="tf-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#c4c4c9" />
          </linearGradient>
        </defs>
        <g transform="rotate(-14 110 70)">
          <path d="M50 26 Q110 6 170 30 A10 30 0 0 1 170 90 Q110 114 50 94 Z" fill="url(#tf-body)" />
          <ellipse cx="50" cy="60" rx="14" ry="34" fill="url(#tf-face)" />
          <ellipse cx="50" cy="60" rx="10" ry="25" strokeOpacity={0.6} />
          <ellipse cx="50" cy="60" rx="6" ry="14" fill="#3f3f46" className="stroke-ember" />
          <ellipse cx="52.5" cy="60" rx="3.5" ry="10.5" fill="#71717a" stroke="none" />
        </g>
      </svg>
    );
  }
  // A torus is a sphere swept around a circle, so its outline is exactly the
  // tilted centre-line ellipse stroked at the tube's diameter. Lighter, thinner
  // strokes nudged upwards and blurred give the tube its round, top-lit shading.
  const tube = (dy: number, width: number, colour: string) => (
    <ellipse
      cx={110}
      cy={70 + dy}
      rx={RING_RADIUS}
      ry={RING_RADIUS * RING_TILT}
      stroke={colour}
      strokeWidth={width}
    />
  );
  return (
    <svg viewBox="0 0 220 140" className={svgClass} fill="none" aria-hidden="true">
      <defs>
        <filter id="rf-soft" x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation={RING_TUBE * 0.18} />
        </filter>
        <mask id="rf-outline" maskUnits="userSpaceOnUse" x="0" y="0" width="220" height="140">
          {tube(0, 2 * RING_TUBE, "white")}
        </mask>
      </defs>
      {tube(0, 2 * RING_TUBE, "#6b6b74")}
      <g mask="url(#rf-outline)">
        <g filter="url(#rf-soft)">
          {tube(-RING_TUBE * 0.12, 2 * RING_TUBE * 0.85, "#9c9ca5")}
          {tube(-RING_TUBE * 0.25, 2 * RING_TUBE * 0.62, "#c9c9cf")}
          {tube(-RING_TUBE * 0.36, 2 * RING_TUBE * 0.4, "#ececef")}
          {tube(-RING_TUBE * 0.44, 2 * RING_TUBE * 0.2, "#ffffff")}
        </g>
      </g>
    </svg>
  );
}

const SECTION = "py-12 sm:py-16 lg:py-20 border-t border-zinc-200";
const SHELL = "mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20";
const H2 = "text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)]";

export default async function ZinkersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("zinkersPage");
  const num = new Intl.NumberFormat(locale);

  const benefits = t.raw("benefits") as Array<{
    title: string;
    description: string;
  }>;
  const comparisonColumns = t.raw("comparisonColumns") as string[];
  const rangeNotes = t.raw("rangeNotes") as string[];

  const span = (values: number[]) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    return `${num.format(min)}–${num.format(max)}`;
  };

  // Google's Product parser demands one of `offers`, `review` or
  // `aggregateRating` before it accepts the node. Sinkers are quoted per order —
  // there is no published price — and we carry no reviews, so a `Product` node
  // here can only ever be a permanent "critical issue" in Search Console for a
  // rich result that could never render. Inventing a price to silence it would
  // be a lie in machine-readable form. This page therefore describes itself as
  // what it is: a page about a thing, with no rich-result contract to honour.
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "@id": `${SITE_URL}/${locale}/zinkers#page`,
    url: `${SITE_URL}/${locale}/zinkers`,
    name: t("heading"),
    description: t("intro"),
    inLanguage: locale,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/products/zinc-sinkers.jpg`,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: {
      "@type": "Thing",
      name: t("breadcrumb"),
      description: t("intro"),
    },
  };

  return (
    <>
      <JsonLd data={pageSchema} />
      <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/zinkers" }]} />

      {/* Hero */}
      <section className="bg-zinc-50 pb-12 sm:pb-16 lg:pb-20">
        <div className={SHELL}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-ember" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
                  {t("eyebrow")}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
                {t("heading")}
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-3xl">
                {t("intro")}
              </p>
              <a
                href="#sortiment"
                className="group mt-8 inline-flex items-center justify-center gap-3 bg-ember hover:bg-ember-light px-8 py-4 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all"
              >
                {t("specsButton")}
                <svg
                  className="h-4 w-4 transition-transform group-hover:translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
              </a>
              <div className="mt-8 bg-white border border-zinc-200 border-l-2 border-l-ember p-4 sm:p-5 max-w-md">
                <div className="min-w-0">
                  <div className="text-[11px] tracking-[0.2em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
                    {t("contactEyebrow")}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-zinc-900 font-[family-name:var(--font-display)]">
                    {t("contactName")}
                  </div>
                  <div className="mt-1 flex flex-col text-sm">
                    <a
                      href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                      className="py-0.5 text-zinc-700 hover:text-ember transition-colors font-[family-name:var(--font-mono)] whitespace-nowrap"
                    >
                      {CONTACT_PHONE}
                    </a>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="py-0.5 text-zinc-700 hover:text-ember transition-colors break-words"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/images/products/zinc-sinkers.jpg"
                alt={t("heroImageAlt")}
                width={1200}
                height={900}
                className="w-full max-w-lg lg:max-w-xl object-cover rounded-sm"
                sizes="(max-width: 1024px) 100vw, 700px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={`bg-white ${SECTION}`}>
        <div className={SHELL}>
          <div className="mb-10 lg:mb-12">
            <h2 className={H2}>{t("benefitsHeading")}</h2>
            <p className="mt-4 text-base text-zinc-600 max-w-2xl">
              {t("benefitsDescription")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200">
            {benefits.map((item) => (
              <div key={item.title} className="bg-white p-6 sm:p-8 lg:p-10">
                <div className="w-6 h-[2px] bg-ember mb-5" />
                <h3 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-display)] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Models */}
      <section className={`bg-zinc-50 ${SECTION}`}>
        <div className={SHELL}>
          <div className="mb-10 lg:mb-12">
            <h2 className={H2}>{t("modelsHeading")}</h2>
            <p className="mt-4 text-base text-zinc-600 max-w-2xl">
              {t("modelsDescription")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200">
            {MODELS.map((model) => {
              const items = RANGE.filter((r) => r.model === model);
              return (
                <div key={model} className="bg-zinc-50 p-6 sm:p-8 lg:p-10">
                  <ModelDrawing model={model} />
                  <div className="mt-6 flex items-baseline gap-3">
                    <span className="text-sm font-semibold text-ember font-[family-name:var(--font-mono)]">
                      {model}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-semibold text-zinc-900 font-[family-name:var(--font-display)]">
                      {t(`models.${model}.name`)}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                    {t(`models.${model}.description`)}
                  </p>
                  <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-zinc-200 pt-5">
                    <div>
                      <dt className="text-[11px] tracking-[0.2em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
                        {t("weightLabel")}
                      </dt>
                      <dd className="mt-1 text-base font-semibold text-zinc-900">
                        {span(items.map((r) => r.weight))} g
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] tracking-[0.2em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
                        {t("holeLabel")}
                      </dt>
                      <dd className="mt-1 text-base font-semibold text-zinc-900">
                        {span(items.map((r) => r.hole))} mm
                      </dd>
                    </div>
                  </dl>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Range */}
      <section id="sortiment" className={`bg-white scroll-mt-24 ${SECTION}`}>
        <div className={SHELL}>
          <div className="mb-10 lg:mb-12">
            <h2 className={H2}>{t("rangeHeading")}</h2>
            <p className="mt-4 text-base text-zinc-600 max-w-2xl">
              {t("rangeDescription")}
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {MODELS.map((model) => (
              <div key={model} className="overflow-x-auto">
                <table className="w-full min-w-[300px] border-collapse text-left">
                  <caption className="text-left pb-3 text-lg font-semibold text-zinc-900 font-[family-name:var(--font-display)]">
                    <span className="text-ember font-[family-name:var(--font-mono)] text-sm mr-3">{model}</span>
                    {t(`models.${model}.name`)}
                  </caption>
                  <thead>
                    <tr className="border-b-2 border-zinc-900 text-[11px] tracking-[0.1em] sm:tracking-[0.15em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
                      <th scope="col" className="py-2 pr-2 sm:pr-3 font-normal">{t("rangeColumns.type")}</th>
                      <th scope="col" className="py-2 px-2 sm:px-3 font-normal text-right">{t("rangeColumns.weight")}</th>
                      <th scope="col" className="py-2 px-2 sm:px-3 font-normal text-right">{t("rangeColumns.hole")}</th>
                      <th scope="col" className="py-2 pl-2 sm:pl-3 font-normal text-right">{t("rangeColumns.minOrder")}</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm sm:text-base tabular-nums">
                    {RANGE.filter((r) => r.model === model).map((r) => (
                      <tr key={r.code} className="border-b border-zinc-200">
                        <th scope="row" className="py-3 pr-2 sm:pr-3 font-semibold text-zinc-900 whitespace-nowrap">{r.code}</th>
                        <td className="py-3 px-2 sm:px-3 text-right text-zinc-700 whitespace-nowrap">{num.format(r.weight)} g</td>
                        <td className="py-3 px-2 sm:px-3 text-right text-zinc-700 whitespace-nowrap">{num.format(r.hole)} mm</td>
                        <td className="py-3 pl-2 sm:pl-3 text-right text-zinc-700 whitespace-nowrap">{num.format(r.minOrder)} {t("pcs")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          <ul className="mt-8 space-y-1 text-sm text-zinc-600">
            {rangeNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparison */}
      <section className={`bg-zinc-50 ${SECTION}`}>
        <div className={SHELL}>
          <div className="mb-10 lg:mb-12">
            <h2 className={H2}>{t("comparisonHeading")}</h2>
            <p className="mt-4 text-base text-zinc-600 max-w-2xl">
              {t("comparisonDescription")}
            </p>
          </div>
          <div className="max-w-4xl overflow-x-auto">
            <table className="w-full min-w-[300px] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-zinc-900">
                  <th scope="col" className="py-3 pr-3 text-[11px] tracking-[0.2em] uppercase text-zinc-500 font-normal font-[family-name:var(--font-mono)] align-bottom">
                    {t("comparisonCriterion")}
                  </th>
                  {comparisonColumns.map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className={`py-3 px-1 sm:px-2 w-[20%] text-center text-[11px] sm:text-sm font-semibold align-bottom ${i === 0 ? "text-ember" : "text-zinc-900"}`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.key} className="border-b border-zinc-200">
                    <th scope="row" className="py-3 pr-2 sm:pr-3 text-sm sm:text-base font-normal text-zinc-700">
                      {t(`comparisonRows.${row.key}`)}
                    </th>
                    {row.ratings.map((rating, i) => (
                      <td key={i} className={`py-3 px-1 sm:px-2 text-center ${i === 0 ? "bg-ember/5" : ""}`}>
                        <RatingMark rating={rating} label={t(`ratings.${rating}`)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600">
            {(["good", "neutral", "bad"] as const).map((rating) => (
              <li key={rating} className="flex items-center gap-2">
                <RatingMark rating={rating} label="" />
                {t(`ratings.${rating}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonial */}
      <section className={`bg-white ${SECTION}`}>
        <div className={SHELL}>
          <TestimonialFader
            items={[
              {
                quote: t("testimonial.quote"),
                author: t("testimonial.author"),
                role: t("testimonial.role"),
              },
            ]}
          />
          <p className="mt-4 text-sm text-zinc-500 max-w-xl mx-auto text-center">
            {t("testimonial.note")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-950 grain py-12 sm:py-16 lg:py-20 relative">
        <div className={`relative ${SHELL} text-center`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.02em] font-[family-name:var(--font-display)]">
            {t("ctaHeading")}
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-lg mx-auto">
            {t("ctaDescription")}
          </p>
          <div className="mt-8 flex flex-col items-center">
            <div className="text-xl sm:text-2xl font-semibold text-white font-[family-name:var(--font-display)]">
              {t("contactName")}
            </div>
            <div className="mt-1 text-sm text-zinc-400">{t("contactRole")}</div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-1 text-sm text-zinc-300 hover:text-white transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group inline-flex items-center justify-center gap-3 bg-ember hover:bg-ember-light px-8 py-4 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all"
            >
              {t("ctaEmailButton")}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
            <a
              href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
              className="inline-flex items-center min-h-11 text-zinc-300 hover:text-white transition-colors"
            >
              {t("ctaPhoneLabel")}&nbsp;<span className="font-semibold text-white whitespace-nowrap">{CONTACT_PHONE}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
