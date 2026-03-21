"use client";

import { Analytics } from "@vercel/analytics/next";
import { useCookieConsent } from "@/components/CookieConsent";

export function ConsentAnalytics() {
  const { analytics } = useCookieConsent();

  if (!analytics) return null;

  return <Analytics />;
}
