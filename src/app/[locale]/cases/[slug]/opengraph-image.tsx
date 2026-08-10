import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CASE_SLUGS } from "@/lib/routes";
import { ogCard, OG_FOOTER, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Linimatic A/S case study";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of CASE_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export default async function CaseOpengraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "caseDetail" });

  // The customer's name carries more weight in a shared card than the brand
  // does, so it takes the eyebrow slot here.
  return ogCard({
    eyebrow: t(`items.${slug}.client`).toUpperCase(),
    title: t(`items.${slug}.metaTitle`),
    footer: OG_FOOTER[locale] ?? OG_FOOTER.en,
  });
}
