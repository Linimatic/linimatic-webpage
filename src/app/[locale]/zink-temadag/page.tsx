import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata, type Locale } from "@/lib/seo";
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
    path: "/zink-temadag",
    title: t("zinkTemadag.title"),
    description: t("zinkTemadag.description"),
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ZinkTemadagPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("zinkTemadagPage");

  const agenda = t.raw("agenda") as string[];
  const dates = t.raw("dates") as string[];

  return (
    <>
      <Breadcrumbs items={[{ label: t("breadcrumb"), href: "/zink-temadag" }]} />

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
              <div className="mt-6 space-y-4">
                {t("intro")
                  .split("\n\n")
                  .map((paragraph, i) => (
                    <p key={i} className="text-lg sm:text-xl text-zinc-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[420px]">
              <Image
                src="/images/zink-temadag/seminar-attendees.jpg"
                alt={t("heroImageAlt")}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Next dates — prominent, right after the heading and the agenda */}
      <section className="bg-zinc-950 grain py-16 relative">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px bg-ember" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
              {t("datesHeading")}
            </span>
          </div>
          <div className="flex flex-wrap gap-5 sm:gap-6">
            {dates.map((date) => (
              <div
                key={date}
                className="border-2 border-ember bg-zinc-900/60 px-10 py-8 sm:px-14 sm:py-10"
              >
                <span className="text-4xl sm:text-6xl font-bold text-white font-[family-name:var(--font-mono)] tracking-tight">
                  {date}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-zinc-400">{t("datesNote")}</p>
        </div>
      </section>

      {/* Agenda */}
      <section className="bg-white py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-10">
            {t("agendaHeading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5 max-w-4xl">
            {agenda.map((item, i) => (
              <div key={item} className="flex items-start gap-4">
                <span className="text-sm font-bold text-ember font-[family-name:var(--font-mono)] leading-6 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base text-zinc-600 leading-6">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-zinc-600 max-w-2xl">{t("agendaNote")}</p>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-zinc-50 py-20 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-ember" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
              {t("contactHeading")}
            </span>
          </div>
          <p className="text-base text-zinc-600 leading-relaxed max-w-md">
            {t("contactDescription")}
          </p>
          <div className="mt-6">
            <div className="text-base font-semibold text-zinc-900">{t("contactName")}</div>
            <div className="text-sm text-zinc-600">{t("contactRole")}</div>
            <div className="mt-3 flex flex-col gap-1">
              <a
                href={`tel:${t("contactPhone").replace(/\s/g, "")}`}
                className="text-sm text-zinc-600 hover:text-ember transition-colors font-[family-name:var(--font-mono)]"
              >
                {t("contactPhone")}
              </a>
              <a
                href={`mailto:${t("contactEmail")}`}
                className="text-sm text-zinc-600 hover:text-ember transition-colors"
              >
                {t("contactEmail")}
              </a>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-ember hover:bg-ember-light px-8 py-4 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all"
            >
              {t("contactHeading")}
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
