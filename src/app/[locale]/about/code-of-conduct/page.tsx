import type { Metadata } from "next";
import Image from "next/image";
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

  const intro = t.raw("intro") as string[];
  const purpose = t.raw("purpose") as string[];
  const childLabour = t.raw("childLabour") as string[];
  const discrimination = t.raw("discrimination") as string[];
  const workEnvironment = t.raw("workEnvironment") as string[];
  const antiCorruption = t.raw("antiCorruption") as string[];

  return (
    <article className="bg-zinc-50 pb-24">
      <Breadcrumbs
        items={[
          { label: tHeader("nav.sustainability"), href: "/about/sustainability" },
          { label: t("title"), href: "/about/code-of-conduct" },
        ]}
      />
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <div className="relative h-10 w-[180px] mb-8">
          <Image
            src="/images/brand/linimatic-logo-zinc.png"
            alt={tHeader("logoAlt")}
            fill
            className="object-contain object-left"
            sizes="180px"
          />
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-8 h-px bg-ember" />
          <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
            {t("eyebrow")}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)] mb-4">
          {t("title")}
        </h1>
        <p className="text-sm text-zinc-600 font-[family-name:var(--font-mono)] mb-12">
          {t("dateLabel")}
        </p>

        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-zinc-900 [&_h3]:font-[family-name:var(--font-display)] [&_h3]:mt-8 [&_h3]:mb-2 [&_p]:leading-relaxed [&_p]:mb-4">
          {intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h2>{t("purposeHeading")}</h2>
          {purpose.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h2>{t("workingConditionsHeading")}</h2>

          <h3>{t("freedomOfAssociationHeading")}</h3>
          <p>{t("freedomOfAssociationText")}</p>

          <h3>{t("forcedLaborHeading")}</h3>
          <p>{t("forcedLaborText")}</p>

          <h3>{t("termsOfEmploymentHeading")}</h3>
          <p>{t("termsOfEmploymentText")}</p>

          <h3>{t("accessToDataHeading")}</h3>
          <p>{t("accessToDataText")}</p>

          <h3>{t("childLabourHeading")}</h3>
          {childLabour.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h3>{t("discriminationHeading")}</h3>
          {discrimination.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h3>{t("workEnvironmentHeading")}</h3>
          {workEnvironment.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h2>{t("environmentHeading")}</h2>
          <p>{t("environmentText")}</p>

          <h2>{t("antiCorruptionHeading")}</h2>
          {antiCorruption.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <h2>{t("supplierSupplementHeading")}</h2>
          <p>{t("supplierSupplementText")}</p>

          <h3>{t("adherenceHeading")}</h3>
          <p>{t("adherenceText")}</p>

          <h3>{t("notificationHeading")}</h3>
          <p>{t("notificationText")}</p>
        </div>
      </div>
    </article>
  );
}
