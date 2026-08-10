"use client";

import { Analytics } from "@vercel/analytics/next";
import { useCookieConsent } from "@/components/CookieConsent";

export function ConsentAnalytics() {
  // Consent lives in a cookie the server cannot read, so this renders nothing
  // through hydration and only mounts Analytics once the client confirms a yes.
  const { analytics } = useCookieConsent();

  if (!analytics) return null;

  return <Analytics />;
}
