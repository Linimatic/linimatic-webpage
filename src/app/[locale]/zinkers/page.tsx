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
    path: "/zinkers",
    title: t("zinkers.title"),
    description: t("zinkers.description"),
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ZinkersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("zinkersPage");

  const whyItems = t.raw("why") as Array<{
    title: string;
    description: string;
  }>;

  const applications = t.raw("applications") as string[];

  return (
    <>
      <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/zinkers" }]} />

      {/* Hero */}
      <section className="bg-zinc-50 pb-20">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
              <p className="mt-6 text-lg sm:text-xl text-zinc-600 leading-relaxed">
                {t("intro")}
              </p>
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

      {/* Why zinc, not lead */}
      <section className="bg-white py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)]">
              {t("whyHeading")}
            </h2>
            <p className="mt-4 text-base text-zinc-600 max-w-2xl">
              {t("whyDescription")}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-zinc-200">
            {whyItems.map((item) => (
              <div key={item.title} className="bg-white p-8 sm:p-10">
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

      {/* Applications */}
      <section className="bg-zinc-50 py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-12">
            {t("applicationsHeading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-zinc-200">
            {applications.map((app) => (
              <div
                key={app}
                className="bg-zinc-50 p-6 sm:p-8 flex items-center gap-4"
              >
                <div className="w-6 h-[2px] bg-ember shrink-0" />
                <span className="text-base text-zinc-700 font-medium">
                  {app}
                </span>
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
