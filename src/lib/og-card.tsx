import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const EMBER = "#D4702A";

/** Footer strip, per locale — same trust line the homepage card carries. */
export const OG_FOOTER: Record<string, string> = {
  en: "Prototype to series · ISO 9001 · Helsinge, Denmark",
  da: "Prototype til serie · ISO 9001 · Helsinge, Danmark",
  de: "Prototyp bis Serie · ISO 9001 · Helsinge, Dänemark",
};

/**
 * Step the headline down as it gets longer. A service or case title can run
 * three times the length of the homepage tagline, and at a fixed 76px the
 * long ones overflow the card instead of wrapping into it.
 */
function titleSize(title: string): number {
  if (title.length <= 40) return 76;
  if (title.length <= 70) return 60;
  if (title.length <= 110) return 48;
  return 40;
}

export function ogCard({
  eyebrow,
  title,
  footer,
}: {
  eyebrow: string;
  title: string;
  footer: string;
}) {
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
          <div style={{ width: 6, height: 44, background: EMBER, marginRight: 24 }} />
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#fafafa",
            }}
          >
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: titleSize(title),
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            {title}
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
    { ...OG_SIZE },
  );
}
