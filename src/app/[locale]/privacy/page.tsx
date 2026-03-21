import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  return {
    title: t("title"),
    description: t("dataControllerIntro"),
    alternates: {
      canonical: "https://linimatic.dk/en/privacy",
      languages: {
        da: "https://linimatic.dk/da/privacy",
        en: "https://linimatic.dk/en/privacy",
        de: "https://linimatic.dk/de/privacy",
        "x-default": "https://linimatic.dk/en/privacy",
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("privacyPage");

  const collectItems = t.raw("collectItems") as string[];
  const legalBasisItems = t.raw("legalBasisItems") as string[];
  const howWeUseItems = t.raw("howWeUseItems") as string[];
  const retentionItems = t.raw("retentionItems") as string[];
  const dataSharingItems = t.raw("dataSharingItems") as string[];
  const yourRightsItems = t.raw("yourRightsItems") as string[];

  return (
    <article className="bg-zinc-50 pt-32 pb-24">
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
        <p className="text-sm text-zinc-400 font-[family-name:var(--font-mono)] mb-12">
          {t("lastUpdated")}
        </p>

        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:leading-relaxed [&_ul]:space-y-2 [&_li]:text-zinc-600">
          <h2>{t("dataControllerHeading")}</h2>
          <p>{t("dataControllerIntro")}</p>
          <p>
            Linimatic A/S<br />
            Bomose Allé 12<br />
            DK-3200 Helsinge, Denmark<br />
            CVR: DK-20254386<br />
            <a href="mailto:info@linimatic.dk" className="text-ember hover:text-ember-light transition-colors">
              info@linimatic.dk
            </a><br />
            <span className="font-[family-name:var(--font-mono)]">+45 4876 4040</span>
          </p>

          <h2>{t("whatWeCollectHeading")}</h2>
          <p>{t("whatWeCollectIntro")}</p>
          <ul className="list-disc pl-5">
            {collectItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <h2>{t("legalBasisHeading")}</h2>
          <p>{t("legalBasisIntro")}</p>
          <ul className="list-disc pl-5">
            {legalBasisItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <h2>{t("howWeUseHeading")}</h2>
          <ul className="list-disc pl-5">
            {howWeUseItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <h2>{t("retentionHeading")}</h2>
          <p>{t("retentionIntro")}</p>
          <ul className="list-disc pl-5">
            {retentionItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>

          <h2>{t("dataSharingHeading")}</h2>
          <p>{t("dataSharingIntro")}</p>
          <ul className="list-disc pl-5">
            {dataSharingItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <p>{t("dataSharingNote")}</p>

          <h2>{t("yourRightsHeading")}</h2>
          <p>{t("yourRightsIntro")}</p>
          <ul className="list-disc pl-5">
            {yourRightsItems.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <p>{t("yourRightsContact")}</p>

          <h2>{t("complaintsHeading")}</h2>
          <p>{t("complaintsText")}</p>
          <p>
            Datatilsynet<br />
            Carl Jacobsens Vej 35<br />
            2500 Valby, Denmark<br />
            <span className="font-[family-name:var(--font-mono)]">+45 3319 3200</span><br />
            dt@datatilsynet.dk
          </p>

          <h2>{t("changesHeading")}</h2>
          <p>{t("changesText")}</p>
        </div>
      </div>
    </article>
  );
}
