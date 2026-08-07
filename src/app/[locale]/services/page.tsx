import type { Metadata } from "next";
import { buildMetadata, type Locale } from "@/lib/seo";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/services",
    title: t("services.title"),
    description: t("services.description"),
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const services = [
  {
    slug: "prototyping",
    icon: "01",
    label: "Design",
    image: "/images/services/design-simulation.jpg",
  },
  {
    slug: "die-casting",
    icon: "02",
    label: "Cast",
    image: "/images/services/die-casting-operators-daw125.jpg",
  },
  {
    slug: "post-processing",
    icon: "03",
    label: "Machine",
    image: "/images/services/cnc-post-processing.jpg",
  },
  {
    slug: "surface-treatment",
    icon: "04",
    label: "Finish",
    image: "/images/services/surface-coating-belux-chrome-painted.jpg",
  },
  {
    slug: "quality",
    icon: "05",
    label: "Inspect",
    image: "/images/services/quality-assurance.jpg",
  },
  {
    slug: "assembly",
    icon: "06",
    label: "Deliver",
    image: "/images/services/assembly.jpg",
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
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
                {t("eyebrow")}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
              {t("heading")}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-2xl">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Capability catalog */}
      <section className="bg-white py-14 sm:py-16 lg:py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-ember" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
              {t("catalogEyebrow")}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)]">
            {t("catalogHeading")}
          </h2>
          <p className="mt-4 text-base text-zinc-600 leading-relaxed max-w-2xl">
            {t("catalogDescription")}
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col bg-white border border-zinc-200 hover:border-zinc-300 overflow-hidden transition-colors"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                  <Image
                    src={service.image}
                    alt={serviceItems[i].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-[11px] font-bold text-ember font-[family-name:var(--font-mono)] leading-none">
                      {service.icon}
                    </span>
                    <span className="w-4 h-px bg-zinc-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
                      {service.label}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-ember transition-colors font-[family-name:var(--font-display)] tracking-tight">
                    {serviceItems[i].title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 leading-relaxed flex-1">
                    {serviceItems[i].description}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-[10px] tracking-[0.05em] text-ember font-[family-name:var(--font-mono)]">
                      {serviceItems[i].specs}
                    </span>
                    <svg className="h-4 w-4 text-zinc-600 group-hover:text-ember transition-all group-hover:translate-x-1 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Capability Matrix */}
      <section className="bg-zinc-950 grain py-14 sm:py-16 lg:py-20 relative">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
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
                  <th className="text-left py-4 pr-8 text-[11px] tracking-[0.15em] uppercase text-zinc-400 font-[family-name:var(--font-mono)] font-medium">
                    {t("matrixCol1")}
                  </th>
                  <th className="text-left py-4 pr-8 text-[11px] tracking-[0.15em] uppercase text-zinc-400 font-[family-name:var(--font-mono)] font-medium">
                    {t("matrixCol2")}
                  </th>
                  <th className="text-left py-4 text-[11px] tracking-[0.15em] uppercase text-zinc-400 font-[family-name:var(--font-mono)] font-medium">
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
      <section className="bg-white py-14 sm:py-16 lg:py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)]">
              {t("diffHeading")}
            </h2>
            <p className="mt-6 text-lg text-zinc-600 leading-relaxed">
              {t("diffDescription")}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
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
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {diff.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-950 grain py-14 sm:py-16 lg:py-20 relative">
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
