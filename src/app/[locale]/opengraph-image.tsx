import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Linimatic A/S — Zinc Die-Casting Foundry in Denmark";

const EMBER = "#D4702A";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const TAGLINE: Record<string, string> = {
  en: "Denmark's zinc die-casting foundry since 1967",
  da: "Danmarks zinktrykstøberi siden 1967",
  de: "Zinkdruckguss-Gießerei in Dänemark seit 1967",
};

const FOOTER: Record<string, string> = {
  en: "Prototype to series · ISO 9001 · Helsinge, Denmark",
  da: "Prototype til serie · ISO 9001 · Helsinge, Danmark",
  de: "Prototyp bis Serie · ISO 9001 · Helsinge, Dänemark",
};

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tagline = TAGLINE[locale] ?? TAGLINE.en;
  const footer = FOOTER[locale] ?? FOOTER.en;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
          padding: "80px",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 6,
              height: 44,
              background: EMBER,
              marginRight: 24,
            }}
          />
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#fafafa",
            }}
          >
            LINIMATIC A/S
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 960,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            color: "#a1a1aa",
            letterSpacing: "0.02em",
          }}
        >
          {footer}
        </div>
      </div>
    ),
    { ...size },
  );
}
