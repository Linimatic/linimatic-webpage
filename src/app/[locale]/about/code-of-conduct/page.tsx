import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { buildMetadata, type Locale } from "@/lib/seo";
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
    path: "/about/code-of-conduct",
    title: t("codeOfConduct.title"),
    description: t("codeOfConduct.description"),
    absoluteTitle: true,
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CodeOfConductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("codeOfConductPage");
  const tHeader = await getTranslations("header");

  return (
    <article className="bg-zinc-50 pb-24">
      <Breadcrumbs
        items={[
          { label: tHeader("nav.about"), href: "/about" },
          { label: t("title"), href: "/about/code-of-conduct" },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-ember" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
            {t("eyebrow")}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-8">
          {t("title")}
        </h1>
        <p className="text-base text-zinc-600 leading-relaxed">{t("intro")}</p>
      </div>
    </article>
  );
}
