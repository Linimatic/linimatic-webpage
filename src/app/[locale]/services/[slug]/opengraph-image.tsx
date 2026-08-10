import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SERVICE_SLUGS, SERVICE_TITLE_KEY, type ServiceSlug } from "@/lib/routes";
import { ogCard, OG_FOOTER, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Linimatic A/S service";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of SERVICE_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export default async function ServiceOpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "serviceDetail" });
  const titleKey = SERVICE_TITLE_KEY[slug as ServiceSlug];

  return ogCard({
    eyebrow: "LINIMATIC A/S",
    title: t(`${titleKey}.title`),
    footer: OG_FOOTER[locale] ?? OG_FOOTER.en,
  });
}
