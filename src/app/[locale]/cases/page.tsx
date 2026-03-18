import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Case Studies — Zinc Die-Casting Projects",
  description:
    "Real zinc die-casting case studies from DeWalt, One Collection, VELUX and more. See how Linimatic solves complex manufacturing challenges with precision zamak components.",
  alternates: {
    canonical: "https://linimatic.dk/en/cases",
    languages: {
      da: "https://linimatic.dk/da/cases",
      en: "https://linimatic.dk/en/cases",
      de: "https://linimatic.dk/de/cases",
      "x-default": "https://linimatic.dk/en/cases",
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const caseImages: Record<string, string> = {
  dewalt: "/images/services/brake-bracket-component.jpg",
  "one-collection": "/images/cases/one-collection-finn-juhl.jpg",
  velux: "/images/cases/velux-motor-frame.jpg",
};

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("casesPage");

  const industries = t.raw("industries") as string[];
  const cases = t.raw("items") as Array<{
    slug: string;
    client: string;
    title: string;
    industry: string;
    metric: string;
    result: string;
  }>;

  return (
    <>
      <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/cases" }]} />

      {/* Hero */}
      <section className="bg-zinc-50 pb-12">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
                {t("eyebrow")}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
              {t("heading")}
            </h1>
            <p className="mt-6 text-lg text-zinc-500 leading-relaxed max-w-2xl">
              {t("description")}
            </p>
          </div>

          {/* Industry filter tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {industries.map((industry) => (
              <span
                key={industry}
                className="px-3 py-1.5 text-[11px] tracking-[0.1em] uppercase font-[family-name:var(--font-mono)] border border-zinc-300 text-zinc-500 hover:border-ember hover:text-ember transition-colors cursor-pointer"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Case Grid */}
      <section className="bg-zinc-50 pb-24">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {cases.map((item) => (
              <Link
                key={item.slug}
                href={`/cases/${item.slug}`}
                className="group relative bg-zinc-900 overflow-hidden"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={caseImages[item.slug] || "/images/services/casting-mold.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover opacity-50 group-hover:opacity-70 transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-ember font-[family-name:var(--font-mono)] mb-1">
                      {item.client}
                    </span>
                    <span className="inline-block text-[10px] tracking-[0.1em] uppercase text-zinc-500 font-[family-name:var(--font-mono)] ml-3">
                      {item.industry}
                    </span>
                    <h2 className="text-lg font-semibold text-white leading-tight font-[family-name:var(--font-display)] tracking-tight mt-2">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm text-zinc-400 font-[family-name:var(--font-mono)]">
                      {item.metric}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-ember">
                      {item.result}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
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
