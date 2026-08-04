"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { useCookieConsent } from "@/components/CookieConsent";

export function ConsentAnalytics() {
  const { analytics } = useCookieConsent();
  // Consent is read from a cookie that's only available client-side, so the
  // first client render must match the server's (always null) until mounted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || !analytics) return null;

  return <Analytics />;
}
