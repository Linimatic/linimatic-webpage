import type { Metadata } from "next";
import { buildMetadata, type Locale } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PersonCard, type Person } from "@/components/PersonCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({
    locale: locale as Locale,
    path: "/contact/quote",
    title: t("contactQuote.title"),
    description: t("contactQuote.description"),
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const teamPhotos = [
  "/images/team/torben-m-jensen.jpg",
  "/images/team/rene-johnsen.jpg",
  "/images/team/jan-v-jorgensen.jpg",
  "/images/team/rikke-ostrup-fisker.jpg",
  "/images/team/thomas-hjorth.jpg",
  "/images/team/dorthe-kondrup.jpg",
];

export default async function ContactQuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactQuotePage");
  const tPeople = await getTranslations("contactPeoplePage");

  const team = (tPeople.raw("team") as Person[]).slice(0, 3);

  return (
    <>
      <Breadcrumbs
        items={[{ label: t("breadcrumb"), href: "/contact/quote" }]}
      />

      <section className="bg-zinc-50 pb-24">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">

          {/* Hero */}
          <div className="max-w-2xl mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
                {t("eyebrow")}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
              {t("heading")}
            </h1>
            <p className="mt-4 text-lg text-zinc-600">{t("intro")}</p>
          </div>

          {/* Team */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-md sm:max-w-2xl lg:max-w-4xl mx-auto">
            {team.map((person, i) => (
              <PersonCard key={person.name} person={person} photo={teamPhotos[i]} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
