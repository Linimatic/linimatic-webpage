import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Why Zinc Die-Casting? Advantages, Alloys & Material Comparison",
  description:
    "Zinc die-casting offers ±0.05mm tolerances, 1M+ shot die life, and chrome-ready surfaces. Compare zinc vs aluminum vs plastic. Learn which Zamak alloy fits your project.",
  alternates: {
    canonical: "https://linimatic.dk/en/why-zinc",
    languages: {
      da: "https://linimatic.dk/da/why-zinc",
      en: "https://linimatic.dk/en/why-zinc",
      de: "https://linimatic.dk/de/why-zinc",
      "x-default": "https://linimatic.dk/en/why-zinc",
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function WhyZincPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("whyZincPage");

  const advantages = t.raw("advantages") as Array<{
    value: string;
    unit: string;
    label: string;
    description: string;
  }>;

  const comparisonHeaders = t.raw("comparison.headers") as string[];
  const comparisonRows = t.raw("comparison.rows") as Array<{
    property: string;
    zinc: string;
    aluminum: string;
    magnesium: string;
    plastic: string;
  }>;

  const alloyRows = t.raw("alloys.rows") as Array<{
    name: string;
    tensile: string;
    elongation: string;
    hardness: string;
    use: string;
  }>;

  const faqItems = t.raw("faq.items") as Array<{
    question: string;
    answer: string;
  }>;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />
      <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/why-zinc" }]} />

      {/* Hero */}
      <section className="bg-zinc-50 pb-20">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
                {t("eyebrow")}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
              {t("heading")}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-2xl">
              {t("intro")}
            </p>
          </div>
        </div>
      </section>

      {/* Key Advantages */}
      <section className="bg-white py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-12">
            {t("advantagesHeading")}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200">
            {advantages.map((adv) => (
              <div key={adv.label} className="bg-white p-8 sm:p-10">
                <div className="font-[family-name:var(--font-mono)] text-zinc-900 mb-3">
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight">
                    {adv.value}
                  </span>
                  {adv.unit && (
                    <span className="text-base text-zinc-400 ml-1">
                      {adv.unit}
                    </span>
                  )}
                </div>
                <div className="text-[11px] tracking-[0.15em] uppercase text-ember font-[family-name:var(--font-mono)] mb-3">
                  {adv.label}
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material Comparison Table */}
      <section className="bg-zinc-50 py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)]">
              {t("comparison.heading")}
            </h2>
            <p className="mt-4 text-base text-zinc-500 max-w-2xl">
              {t("comparison.description")}
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-zinc-300">
                  {comparisonHeaders.map((header, i) => (
                    <th
                      key={header}
                      className={`text-left py-4 pr-6 text-[11px] tracking-[0.15em] uppercase font-[family-name:var(--font-mono)] font-medium ${
                        i === 1
                          ? "text-ember"
                          : "text-zinc-500"
                      }`}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr
                    key={row.property}
                    className="border-b border-zinc-200 last:border-0"
                  >
                    <td className="py-3 pr-6 font-medium text-zinc-700">
                      {row.property}
                    </td>
                    <td className="py-3 pr-6 text-zinc-900 font-semibold font-[family-name:var(--font-mono)]">
                      {row.zinc}
                    </td>
                    <td className="py-3 pr-6 text-zinc-500 font-[family-name:var(--font-mono)]">
                      {row.aluminum}
                    </td>
                    <td className="py-3 pr-6 text-zinc-500 font-[family-name:var(--font-mono)]">
                      {row.magnesium}
                    </td>
                    <td className="py-3 text-zinc-500 font-[family-name:var(--font-mono)]">
                      {row.plastic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Zamak Alloy Guide */}
      <section className="bg-white py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-4">
            {t("alloys.heading")}
          </h2>
          <p className="text-base text-zinc-500 max-w-2xl mb-10">
            {t("alloys.description")}
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-zinc-300">
                  <th className="text-left py-4 pr-6 text-[11px] tracking-[0.15em] uppercase text-zinc-500 font-[family-name:var(--font-mono)] font-medium">
                    {t("alloys.colAlloy")}
                  </th>
                  <th className="text-left py-4 pr-6 text-[11px] tracking-[0.15em] uppercase text-zinc-500 font-[family-name:var(--font-mono)] font-medium">
                    {t("alloys.colTensile")}
                  </th>
                  <th className="text-left py-4 pr-6 text-[11px] tracking-[0.15em] uppercase text-zinc-500 font-[family-name:var(--font-mono)] font-medium">
                    {t("alloys.colElongation")}
                  </th>
                  <th className="text-left py-4 pr-6 text-[11px] tracking-[0.15em] uppercase text-zinc-500 font-[family-name:var(--font-mono)] font-medium">
                    {t("alloys.colHardness")}
                  </th>
                  <th className="text-left py-4 text-[11px] tracking-[0.15em] uppercase text-zinc-500 font-[family-name:var(--font-mono)] font-medium">
                    {t("alloys.colUse")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {alloyRows.map((row) => (
                  <tr
                    key={row.name}
                    className="border-b border-zinc-200 last:border-0"
                  >
                    <td className="py-3 pr-6 font-semibold text-zinc-900">
                      {row.name}
                    </td>
                    <td className="py-3 pr-6 text-zinc-600 font-[family-name:var(--font-mono)]">
                      {row.tensile}
                    </td>
                    <td className="py-3 pr-6 text-zinc-600 font-[family-name:var(--font-mono)]">
                      {row.elongation}
                    </td>
                    <td className="py-3 pr-6 text-zinc-600 font-[family-name:var(--font-mono)]">
                      {row.hardness}
                    </td>
                    <td className="py-3 text-zinc-500">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-zinc-50 py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-10 text-center">
              {t("faq.heading")}
            </h2>
            <div className="space-y-8">
              {faqItems.map((item) => (
                <div key={item.question}>
                  <h3 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-display)] mb-2">
                    {item.question}
                  </h3>
                  <p className="text-base text-zinc-500 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-950 grain py-20 relative">
        <div className="relative mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-[-0.02em] font-[family-name:var(--font-display)]">
            {t("ctaHeading")}
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-lg mx-auto">
            {t("ctaDescription")}
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 bg-ember hover:bg-ember-light px-8 py-4 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all"
            >
              {t("ctaButton")}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
