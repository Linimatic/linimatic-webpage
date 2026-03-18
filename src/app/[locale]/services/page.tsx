import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Zinc Die-Casting Services — Prototype to Production",
  description:
    "Full-service zinc die-casting under one roof: prototyping, hot-chamber casting, CNC machining, surface coating, quality assurance & assembly. Helsinge, Denmark.",
  alternates: {
    canonical: "https://linimatic.dk/en/services",
    languages: {
      da: "https://linimatic.dk/da/services",
      en: "https://linimatic.dk/en/services",
      de: "https://linimatic.dk/de/services",
      "x-default": "https://linimatic.dk/en/services",
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const services = [
  {
    slug: "prototyping",
    icon: "01",
    label: "Design",
  },
  {
    slug: "die-casting",
    icon: "02",
    label: "Cast",
  },
  {
    slug: "post-processing",
    icon: "03",
    label: "Machine",
  },
  {
    slug: "surface-treatment",
    icon: "04",
    label: "Finish",
  },
  {
    slug: "quality",
    icon: "05",
    label: "Inspect",
  },
  {
    slug: "assembly",
    icon: "06",
    label: "Deliver",
  },
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const serviceItems = t.raw("items") as Array<{
    title: string;
    description: string;
    specs: string;
  }>;

  const capabilityRows = t.raw("capabilities") as Array<{
    service: string;
    keySpecs: string;
    certifications: string;
  }>;

  return (
    <>
      <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/services" }]} />

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
            <p className="mt-6 text-lg sm:text-xl text-zinc-500 leading-relaxed max-w-2xl">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Value Chain */}
      <section className="bg-white py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)]">
              {t("valueChainHeading")}
            </h2>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-8 right-8 h-px bg-zinc-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
              {services.map((service, i) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative"
                >
                  <div className="relative z-10 w-16 h-16 flex flex-col items-center justify-center bg-zinc-950 group-hover:bg-ember text-white transition-colors mb-4">
                    <span className="text-[9px] tracking-[0.04em] uppercase text-ember group-hover:text-zinc-950 font-[family-name:var(--font-mono)] leading-none transition-colors">
                      {service.label}
                    </span>
                    <span className="text-lg font-bold font-[family-name:var(--font-mono)] leading-none mt-1">
                      {service.icon}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-ember transition-colors font-[family-name:var(--font-display)] tracking-tight mb-1">
                    {serviceItems[i].title}
                  </h3>
                  <p className="text-[13px] text-zinc-400 leading-relaxed mb-2">
                    {serviceItems[i].description}
                  </p>
                  <p className="text-[10px] tracking-[0.05em] text-ember font-[family-name:var(--font-mono)]">
                    {serviceItems[i].specs}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capability Matrix */}
      <section className="bg-zinc-950 grain py-20 relative">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
                {t("matrixEyebrow")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-[-0.02em] font-[family-name:var(--font-display)]">
              {t("matrixHeading")}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-4 pr-8 text-[11px] tracking-[0.15em] uppercase text-zinc-500 font-[family-name:var(--font-mono)] font-medium">
                    {t("matrixCol1")}
                  </th>
                  <th className="text-left py-4 pr-8 text-[11px] tracking-[0.15em] uppercase text-zinc-500 font-[family-name:var(--font-mono)] font-medium">
                    {t("matrixCol2")}
                  </th>
                  <th className="text-left py-4 text-[11px] tracking-[0.15em] uppercase text-zinc-500 font-[family-name:var(--font-mono)] font-medium">
                    {t("matrixCol3")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {capabilityRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-zinc-800 last:border-0"
                  >
                    <td className="py-4 pr-8">
                      <Link
                        href={`/services/${services[i].slug}`}
                        className="text-white hover:text-ember transition-colors font-medium"
                      >
                        {row.service}
                      </Link>
                    </td>
                    <td className="py-4 pr-8 text-zinc-400 font-[family-name:var(--font-mono)] text-[13px]">
                      {row.keySpecs}
                    </td>
                    <td className="py-4 text-ember text-[13px] font-[family-name:var(--font-mono)]">
                      {row.certifications}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-white py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)]">
              {t("diffHeading")}
            </h2>
            <p className="mt-6 text-lg text-zinc-500 leading-relaxed">
              {t("diffDescription")}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {(
              t.raw("differentiators") as Array<{
                title: string;
                text: string;
              }>
            ).map((diff) => (
              <div key={diff.title} className="text-center">
                <div className="w-6 h-[2px] bg-ember mx-auto mb-4" />
                <h3 className="text-base font-semibold text-zinc-900 font-[family-name:var(--font-display)] mb-2">
                  {diff.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {diff.text}
                </p>
              </div>
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
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
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
            <a
              href="tel:+4548764040"
              className="inline-flex items-center justify-center gap-3 border border-zinc-600 hover:border-zinc-400 px-8 py-4 text-sm font-semibold tracking-wide text-zinc-300 hover:text-white transition-all font-[family-name:var(--font-mono)]"
            >
              +45 4876 4040
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
