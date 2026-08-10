"use client";

import { useState, useEffect, useCallback, useRef, useId, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type CookiePreferences = {
  necessary: true; // always true, cannot be toggled
  analytics: boolean;
};

/** What is stored in the cookie: the choice plus proof of when it was given. */
type StoredConsent = CookiePreferences & {
  /** ISO timestamp of the moment the visitor made the choice (GDPR art. 7(1)). */
  ts: string;
  /** Version of the cookie/privacy policy the choice was given against. */
  v: number;
};

/**
 * Bump when the cookie policy changes materially. Stored choices from an older
 * version are treated as "not decided", so the visitor is asked again.
 */
const POLICY_VERSION = 2;

const COOKIE_NAME = "cookie_consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds
const OPEN_EVENT = "cookie-consent:open";
const CHANGE_EVENT = "cookie-consent:change";

const DEFAULT_PREFERENCES: CookiePreferences = { necessary: true, analytics: false };

function rawConsentCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  return match ? match[1] : null;
}

function parseStoredConsent(raw: string | null): StoredConsent | null {
  if (raw === null) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<StoredConsent>;
    // A choice made against an older policy is no longer a valid consent.
    if (parsed.v !== POLICY_VERSION) return null;
    return {
      necessary: true,
      analytics: parsed.analytics === true,
      ts: typeof parsed.ts === "string" ? parsed.ts : "",
      v: POLICY_VERSION,
    };
  } catch {
    return null;
  }
}

/**
 * The cookie is the source of truth, but `useSyncExternalStore` calls its
 * snapshot on every render and compares by identity — so the parsed result is
 * cached and only recomputed when the raw cookie string actually changes.
 */
let cachedRaw: string | null = null;
let cachedStored: StoredConsent | null = null;
let cachedPreferences: CookiePreferences = DEFAULT_PREFERENCES;
let cachePrimed = false;

function readConsentCache(): StoredConsent | null {
  const raw = rawConsentCookie();
  if (!cachePrimed || raw !== cachedRaw) {
    cachePrimed = true;
    cachedRaw = raw;
    cachedStored = parseStoredConsent(raw);
    cachedPreferences = cachedStored
      ? { necessary: true, analytics: cachedStored.analytics }
      : DEFAULT_PREFERENCES;
  }
  return cachedStored;
}

function getCookiePreferences(): CookiePreferences | null {
  const stored = readConsentCache();
  return stored ? cachedPreferences : null;
}

function subscribeToConsent(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

function setCookiePreferences(prefs: CookiePreferences) {
  const stored: StoredConsent = { ...prefs, ts: new Date().toISOString(), v: POLICY_VERSION };
  const value = encodeURIComponent(JSON.stringify(stored));
  // Secure can only be set over HTTPS — on plain-http localhost the browser
  // would drop the cookie entirely and the banner would never go away.
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(
    () => getCookiePreferences() ?? DEFAULT_PREFERENCES
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const headingId = useId();
  const t = useTranslations("cookies");

  useEffect(() => {
    const saved = getCookiePreferences();
    if (!saved) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      const saved = getCookiePreferences();
      if (saved) setPreferences(saved);
      setVisible(true);
      setShowDetails(true);
    };
    window.addEventListener(OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_EVENT, handleOpen);
  }, []);

  // Move focus to the banner when it appears. It is rendered last in the DOM,
  // so without this a keyboard or screen-reader user would have to traverse the
  // whole page before reaching the consent choice.
  useEffect(() => {
    if (visible) panelRef.current?.focus();
  }, [visible]);

  const commit = useCallback((prefs: CookiePreferences) => {
    setCookiePreferences(prefs);
    setPreferences(prefs);
    setVisible(false);
  }, []);

  const handleAcceptAll = useCallback(
    () => commit({ necessary: true, analytics: true }),
    [commit]
  );

  const handleRejectAll = useCallback(() => commit(DEFAULT_PREFERENCES), [commit]);

  const handleSavePreferences = useCallback(() => commit(preferences), [commit, preferences]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Backdrop — visual dimming only; must not block clicks on the rest of the page */}
      <div
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-sm animate-fade-up"
        style={{ animationDuration: "0.3s" }}
      />

      {/* Banner. Capped and scrollable: the panel grows when "customize" is
          open, and on a short screen the top — heading and policy links —
          would otherwise be clipped off the viewport with no way to reach it. */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-auto animate-fade-up" style={{ animationDuration: "0.4s" }}>
        <div
          ref={panelRef}
          role="dialog"
          aria-labelledby={headingId}
          tabIndex={-1}
          className="bg-zinc-950 border-t border-zinc-800 outline-none max-h-[85vh] overflow-y-auto"
        >
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6">
            {/* Main banner */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-ember flex-shrink-0" />
                  <h3 id={headingId} className="text-sm font-semibold text-white font-[family-name:var(--font-display)]">
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

              {/* Reject and accept must be equally easy to see and to reach
                  (EDPB 03/2022), so they share one style; "customize" is the
                  secondary action and is the only one visually de-emphasised. */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="px-5 py-2.5 text-[13px] font-medium tracking-wide text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 transition-all"
                >
                  {t("customize")}
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-6 py-2.5 text-[13px] font-semibold tracking-wide uppercase bg-white hover:bg-zinc-200 text-zinc-950 transition-all"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Necessary */}
                  <div className="flex gap-4">
                    <div className="pt-0.5">
                      <div className="w-10 h-5 bg-ember/30 rounded-full flex items-center justify-end px-0.5">
                        <div className="w-4 h-4 bg-ember rounded-full" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t("necessary.title")}</div>
                      <span className="inline-block mt-1 text-[10px] tracking-wider uppercase text-zinc-400 font-[family-name:var(--font-mono)]">{t("necessary.status")}</span>
                      <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
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
                      <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">
                        {t("analytics.description")}
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
 * Re-renders when the visitor changes their preferences, so consent-gated
 * scripts load or unload without a page reload.
 * Usage: const { analytics } = useCookieConsent();
 */
export function useCookieConsent(): CookiePreferences {
  return useSyncExternalStore(
    subscribeToConsent,
    () => {
      readConsentCache();
      return cachedPreferences;
    },
    // The server cannot read the cookie, so it always renders the "no consent"
    // state; React re-renders with the real value once hydration is done.
    () => DEFAULT_PREFERENCES
  );
}

/**
 * Whether the visitor has answered the consent banner yet. Returns null until
 * mounted, because the cookie is only readable on the client.
 *
 * Anything that puts UI on the screen must wait for this to be true — nothing
 * may cover the consent banner while a choice is still outstanding.
 */
export function useConsentDecided(): boolean | null {
  return useSyncExternalStore(
    subscribeToConsent,
    () => readConsentCache() !== null,
    () => null
  );
}
