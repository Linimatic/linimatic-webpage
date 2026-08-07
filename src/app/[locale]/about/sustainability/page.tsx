import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildMetadata, type Locale } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Link } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/about/sustainability",
    title: t("sustainability.title"),
    description: t("sustainability.description"),
    absoluteTitle: true,
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function SustainabilityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sustainabilityPage");

  const links = t.raw("links") as Array<{
    title: string;
    description: string;
    href: string;
  }>;

  return (
    <article className="bg-zinc-50 pb-24">
      <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/about/sustainability" }]} />
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-ember" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
            {t("eyebrow")}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-8">
          {t("title")}
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed">{t("intro")}</p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group block border border-zinc-200 bg-white p-6 hover:border-ember transition-colors"
            >
              <h2 className="text-lg font-semibold text-zinc-900 font-[family-name:var(--font-display)]">
                {link.title}
              </h2>
              <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{link.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-ember">
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
