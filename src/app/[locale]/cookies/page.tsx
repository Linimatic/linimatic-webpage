import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cookiePolicyPage" });
  return {
    title: t("title"),
    description: t("whatAreCookiesText").slice(0, 155) + "...",
    alternates: {
      canonical: "https://linimatic.dk/en/cookies",
      languages: {
        da: "https://linimatic.dk/da/cookies",
        en: "https://linimatic.dk/en/cookies",
        de: "https://linimatic.dk/de/cookies",
        "x-default": "https://linimatic.dk/en/cookies",
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cookiePolicyPage");

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

        <div className="prose prose-zinc max-w-none text-zinc-600 space-y-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_h2]:font-[family-name:var(--font-display)] [&_h2]:mt-12 [&_h2]:mb-4 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-zinc-800 [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:leading-relaxed [&_table]:w-full [&_table]:text-sm [&_th]:text-left [&_th]:py-3 [&_th]:px-4 [&_th]:bg-zinc-100 [&_th]:text-zinc-600 [&_th]:font-medium [&_th]:text-[11px] [&_th]:tracking-wider [&_th]:uppercase [&_th]:font-[family-name:var(--font-mono)] [&_td]:py-3 [&_td]:px-4 [&_td]:border-b [&_td]:border-zinc-100">
          <h2>{t("whatAreCookiesHeading")}</h2>
          <p>{t("whatAreCookiesText")}</p>

          <h2>{t("howWeUseHeading")}</h2>
          <p>{t("howWeUseText")}</p>

          <h3>{t("necessaryHeading")}</h3>
          <p>{t("necessaryText")}</p>

          <table>
            <thead>
              <tr>
                <th>{t("tableCookie")}</th>
                <th>{t("tablePurpose")}</th>
                <th>{t("tableDuration")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-[family-name:var(--font-mono)] text-zinc-800">cookie_consent</td>
                <td>{t("consentCookiePurpose")}</td>
                <td>{t("consentCookieDuration")}</td>
              </tr>
            </tbody>
          </table>

          <h3>{t("analyticsHeading")}</h3>
          <p>{t("analyticsText")}</p>

          <h3>{t("marketingHeading")}</h3>
          <p>{t("marketingText")}</p>

          <h2>{t("managingHeading")}</h2>
          <p>{t("managingText1")}</p>
          <p>{t("managingText2")}</p>
          <p>{t("managingText3")}</p>

          <h2>{t("thirdPartyHeading")}</h2>
          <p>{t("thirdPartyText")}</p>

          <h2>{t("contactHeading")}</h2>
          <p>{t("contactText")}</p>
          <p>
            Linimatic A/S<br />
            Bomose Allé 12<br />
            DK-3200 Helsinge, Denmark<br />
            <a href="mailto:info@linimatic.dk" className="text-ember hover:text-ember-light transition-colors">
              info@linimatic.dk
            </a><br />
            <span className="font-[family-name:var(--font-mono)]">+45 4876 4040</span>
          </p>
        </div>
      </div>
    </article>
  );
}
