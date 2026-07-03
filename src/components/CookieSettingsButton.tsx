"use client";

import { useTranslations } from "next-intl";
import { openCookieSettings } from "@/components/CookieConsent";

export function CookieSettingsButton() {
  const t = useTranslations("footer");

  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="hover:text-zinc-400 transition-colors"
    >
      {t("cookieSettings")}
    </button>
  );
}
