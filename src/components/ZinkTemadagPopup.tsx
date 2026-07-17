"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const STORAGE_KEY = "zink_temadag_popup_seen_at";
const REAPPEAR_AFTER_MS = 7 * 24 * 60 * 60 * 1000; // once a week, like the old site
const SHOW_DELAY_MS = 2500;

export function ZinkTemadagPopup() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations("zinkTemadagPopup");

  useEffect(() => {
    const lastSeen = Number(localStorage.getItem(STORAGE_KEY) ?? 0);
    if (Date.now() - lastSeen < REAPPEAR_AFTER_MS) return;
    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [visible, dismiss]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm animate-fade-up"
        style={{ animationDuration: "0.3s" }}
        onClick={dismiss}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("heading")}
        className="relative bg-white max-w-md w-full shadow-2xl animate-fade-up overflow-hidden"
        style={{ animationDuration: "0.4s" }}
      >
        <div className="relative h-36 sm:h-40 bg-zinc-900">
          <Image
            src="/images/zink-temadag/zinc-ingots.png"
            alt={t("imageAlt")}
            fill
            priority
            className="object-cover"
            sizes="448px"
          />
          <button
            onClick={dismiss}
            aria-label={t("close")}
            className="absolute top-3 right-3 flex items-center justify-center h-8 w-8 rounded-full bg-zinc-950/50 text-white hover:bg-zinc-950/70 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 sm:p-10">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-8 h-px bg-ember" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
              {t("eyebrow")}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-[-0.02em] leading-tight font-[family-name:var(--font-display)]">
            {t("heading")}
          </h3>
          <p className="mt-3 text-sm text-zinc-500 leading-relaxed">{t("description")}</p>

          <Link
            href="/zink-temadag"
            onClick={dismiss}
            className="group mt-6 inline-flex items-center gap-3 bg-ember hover:bg-ember-light px-6 py-3 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all"
          >
            {t("cta")}
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
