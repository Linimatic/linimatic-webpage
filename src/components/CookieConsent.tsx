"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type CookiePreferences = {
  necessary: true; // always true, cannot be toggled
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_NAME = "cookie_consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

function getCookiePreferences(): CookiePreferences | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}

function setCookiePreferences(prefs: CookiePreferences) {
  const value = encodeURIComponent(JSON.stringify(prefs));
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    const saved = getCookiePreferences();
    return saved ?? { necessary: true, analytics: false, marketing: false };
  });
  const t = useTranslations("cookies");

  useEffect(() => {
    const saved = getCookiePreferences();
    if (!saved) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    const prefs: CookiePreferences = { necessary: true, analytics: true, marketing: true };
    setCookiePreferences(prefs);
    setPreferences(prefs);
    setVisible(false);
  }, []);

  const handleRejectAll = useCallback(() => {
    const prefs: CookiePreferences = { necessary: true, analytics: false, marketing: false };
    setCookiePreferences(prefs);
    setPreferences(prefs);
    setVisible(false);
  }, []);

  const handleSavePreferences = useCallback(() => {
    setCookiePreferences(preferences);
    setVisible(false);
  }, [preferences]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm pointer-events-auto animate-fade-up"
        style={{ animationDuration: "0.3s" }}
        onClick={() => setShowDetails(false)}
      />

      {/* Banner */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-auto animate-fade-up" style={{ animationDuration: "0.4s" }}>
        <div className="bg-zinc-950 border-t border-zinc-800">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6">
            {/* Main banner */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-ember flex-shrink-0" />
                  <h3 className="text-sm font-semibold text-white font-[family-name:var(--font-display)]">
                    {t("heading")}
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                  {t("description")}{" "}
                  {t("readOur")}{" "}
                  <Link href="/cookies" className="text-ember hover:text-ember-light underline underline-offset-2 transition-colors">
                    {t("cookiePolicy")}
                  </Link>{" "}
                  {t("and")}{" "}
                  <Link href="/privacy" className="text-ember hover:text-ember-light underline underline-offset-2 transition-colors">
                    {t("privacyPolicy")}
                  </Link>.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="px-5 py-2.5 text-[13px] font-medium tracking-wide text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 transition-all"
                >
                  {t("customize")}
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-5 py-2.5 text-[13px] font-medium tracking-wide text-zinc-300 hover:text-white border border-zinc-700 hover:border-zinc-500 transition-all"
                >
                  {t("rejectAll")}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2.5 text-[13px] font-semibold tracking-wide uppercase bg-ember hover:bg-ember-light text-zinc-950 transition-all"
                >
                  {t("acceptAll")}
                </button>
              </div>
            </div>

            {/* Expandable details */}
            {showDetails && (
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Necessary */}
                  <div className="flex gap-4">
                    <div className="pt-0.5">
                      <div className="w-10 h-5 bg-ember/30 rounded-full flex items-center justify-end px-0.5">
                        <div className="w-4 h-4 bg-ember rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t("necessary.title")}</div>
                      <span className="inline-block mt-1 text-[10px] tracking-wider uppercase text-zinc-500 font-[family-name:var(--font-mono)]">{t("necessary.status")}</span>
                      <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
                        {t("necessary.description")}
                      </p>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="flex gap-4">
                    <div className="pt-0.5">
                      <button
                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                        className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                          preferences.analytics ? "bg-ember/30 justify-end" : "bg-zinc-700 justify-start"
                        }`}
                        role="switch"
                        aria-checked={preferences.analytics}
                        aria-label={t("analytics.toggleAriaLabel")}
                      >
                        <div className={`w-4 h-4 rounded-full transition-colors ${
                          preferences.analytics ? "bg-ember" : "bg-zinc-500"
                        }`} />
                      </button>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t("analytics.title")}</div>
                      <span className={`inline-block mt-1 text-[10px] tracking-wider uppercase font-[family-name:var(--font-mono)] ${
                        preferences.analytics ? "text-ember" : "text-zinc-600"
                      }`}>
                        {preferences.analytics ? t("analytics.enabled") : t("analytics.disabled")}
                      </span>
                      <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
                        {t("analytics.description")}
                      </p>
                    </div>
                  </div>

                  {/* Marketing */}
                  <div className="flex gap-4">
                    <div className="pt-0.5">
                      <button
                        onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                        className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                          preferences.marketing ? "bg-ember/30 justify-end" : "bg-zinc-700 justify-start"
                        }`}
                        role="switch"
                        aria-checked={preferences.marketing}
                        aria-label={t("marketing.toggleAriaLabel")}
                      >
                        <div className={`w-4 h-4 rounded-full transition-colors ${
                          preferences.marketing ? "bg-ember" : "bg-zinc-500"
                        }`} />
                      </button>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t("marketing.title")}</div>
                      <span className={`inline-block mt-1 text-[10px] tracking-wider uppercase font-[family-name:var(--font-mono)] ${
                        preferences.marketing ? "text-ember" : "text-zinc-600"
                      }`}>
                        {preferences.marketing ? t("marketing.enabled") : t("marketing.disabled")}
                      </span>
                      <p className="mt-1.5 text-xs text-zinc-500 leading-relaxed">
                        {t("marketing.description")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleSavePreferences}
                    className="px-6 py-2.5 text-[13px] font-semibold tracking-wide uppercase bg-ember hover:bg-ember-light text-zinc-950 transition-all"
                  >
                    {t("savePreferences")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook to check cookie consent status from other components.
 * Usage: const { analytics, marketing } = useCookieConsent();
 */
export function useCookieConsent(): CookiePreferences {
  const [prefs] = useState<CookiePreferences>(() => {
    const saved = getCookiePreferences();
    return saved ?? { necessary: true, analytics: false, marketing: false };
  });

  return prefs;
}
