import { selectionBridgeConfig } from './src/lib/selection/config';
const selectionBridge = selectionBridgeConfig();
import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { legacyRedirects } from "./src/lib/legacy-redirects";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactCompiler: true,
  redirects: async () => legacyRedirects(),
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        ...(selectionBridge.xFrameOptions ? [{key: 'X-Frame-Options', value: selectionBridge.xFrameOptions}] : []),
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: https:",
            "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
            selectionBridge.frameAncestors,
          ].join("; "),
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
