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
    path: "/about/co2",
    title: t("co2.title"),
    description: t("co2.description"),
    absoluteTitle: true,
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const co2Data: { year: number; value: number }[] = [
  { year: 2022, value: 1446 },
  { year: 2023, value: 1431 },
  { year: 2024, value: 1430 },
];

export default async function Co2Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("co2Page");
  const tHeader = await getTranslations("header");
  const numberFormat = new Intl.NumberFormat(locale);

  return (
    <article className="bg-zinc-50 pb-24">
      <Breadcrumbs
        items={[
          { label: tHeader("nav.sustainability"), href: "/about/sustainability" },
          { label: t("title"), href: "/about/co2" },
        ]}
      />
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

        <div className="mt-14">
          <span className="text-[11px] tracking-[0.15em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
            {t("dataLabel")}
          </span>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 border-t border-zinc-200">
            {co2Data.map((stat, i) => (
              <div
                key={stat.year}
                className={`py-6 ${i > 0 ? "sm:border-l border-zinc-200 sm:pl-6" : ""}`}
              >
                <div className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight font-[family-name:var(--font-mono)]">
                  {numberFormat.format(stat.value)}
                </div>
                <div className="mt-1 text-[11px] tracking-[0.1em] uppercase text-ember font-[family-name:var(--font-mono)]">
                  {t("unit")}
                </div>
                <div className="mt-2 text-sm text-zinc-500 font-[family-name:var(--font-mono)]">
                  {stat.year}
                </div>
              </div>
            ))}
            <div className="py-6 sm:border-l border-zinc-200 sm:pl-6">
              <div className="text-3xl sm:text-4xl font-bold text-zinc-300 tracking-tight font-[family-name:var(--font-mono)]">
                —
              </div>
              <div className="mt-1 text-[11px] tracking-[0.1em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
                {t("pendingLabel")}
              </div>
              <div className="mt-2 text-sm text-zinc-400 font-[family-name:var(--font-mono)]">
                2025
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-zinc-500 leading-relaxed">{t("note")}</p>
        </div>
      </div>
    </article>
  );
}
