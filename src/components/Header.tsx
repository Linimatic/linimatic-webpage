"use client";

import Image from "next/image";
import { useState, useEffect, Fragment } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";

const serviceKeys = [
  { key: "prototyping", href: "/services/prototyping" },
  { key: "dieCasting", href: "/services/die-casting" },
  { key: "postProcessing", href: "/services/post-processing" },
  { key: "surfaceTreatment", href: "/services/surface-treatment" },
  { key: "quality", href: "/services/quality" },
  { key: "assembly", href: "/services/assembly" },
];

const navKeys = [
  { key: "services", href: "/services", hasDropdown: true },
  { key: "cases", href: "/cases" },
  { key: "whyZinc", href: "/why-zinc" },
  { key: "about", href: "/about" },
  { key: "jobs", href: "/jobs" },
  { key: "contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("header");
  const tJobs = useTranslations("jobsPage");
  const locale = useLocale();
  const jobCount = (tJobs.raw("positions") as unknown[]).length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-zinc-950"
      }`}
    >
      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 relative z-10">
            <Image
              src="/images/brand/linimatic-logo.png"
              alt={t("logoAlt")}
              width={180}
              height={35}
              priority
              className={`h-7 w-auto transition-all duration-300 ${scrolled ? "brightness-0" : "brightness-0 invert"}`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0">
            {navKeys.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-5 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors ${
                      scrolled ? "text-zinc-600 hover:text-zinc-900" : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                    <svg className="h-3 w-3 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </Link>
                  {servicesOpen && (
                    <div className={`absolute top-full left-0 pt-2 w-80`}>
                    <div className={`rounded-sm shadow-2xl p-1.5 ${
                      scrolled
                        ? "bg-white border border-zinc-200"
                        : "bg-zinc-900 border border-zinc-700/50"
                    }`}>
                      <Link
                        href="/services"
                        className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium text-ember rounded-sm transition-colors ${
                          scrolled ? "hover:bg-zinc-50" : "hover:bg-zinc-800"
                        }`}
                      >
                        {t("allServices")}
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </Link>
                      <div className={`my-1 border-t ${scrolled ? "border-zinc-100" : "border-zinc-800"}`} />
                      {serviceKeys.map((service) => (
                        <Link
                          key={service.href}
                          href={service.href}
                          className={`block px-4 py-2.5 text-sm rounded-sm transition-colors ${
                            scrolled
                              ? "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                              : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                          }`}
                        >
                          {t(`servicesList.${service.key}`)}
                        </Link>
                      ))}
                    </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-5 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors ${
                    scrolled ? "text-zinc-600 hover:text-zinc-900" : "text-zinc-300 hover:text-white"
                  }`}
                >
                  {t(`nav.${item.key}`)}
                  {item.key === "jobs" && jobCount > 0 && (
                    <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold leading-none text-zinc-950 bg-ember rounded-sm font-[family-name:var(--font-mono)]">
                      {jobCount}
                    </span>
                  )}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 text-[13px] tracking-wide">
              {(['en', 'da', 'de'] as const).map((l, i) => (
                <Fragment key={l}>
                  {i > 0 && <span className="text-zinc-600">|</span>}
                  <Link href="/" locale={l} className={locale === l ? 'font-semibold text-ember' : scrolled ? 'text-zinc-400 hover:text-zinc-700' : 'text-zinc-500 hover:text-white'}>
                    {l.toUpperCase()}
                  </Link>
                </Fragment>
              ))}
            </div>
            <a href="tel:+4548764040" className={`text-[13px] tracking-wide transition-colors font-[family-name:var(--font-mono)] ${
              scrolled ? "text-zinc-400 hover:text-zinc-700" : "text-zinc-400 hover:text-white"
            }`}>
              {t("phone")}
            </a>
            <Link
              href="/contact"
              className="relative px-6 py-2.5 text-[13px] font-semibold tracking-wide uppercase text-zinc-950 bg-ember hover:bg-ember-light transition-colors"
            >
              {t("getQuote")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-zinc-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t("mobileMenuClose") : t("mobileMenuOpen")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-zinc-950 border-t border-zinc-800">
          <nav className="px-6 py-6 space-y-1">
            {navKeys.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="flex items-center gap-2 px-4 py-3 text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t(`nav.${item.key}`)}
                {item.key === "jobs" && jobCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold leading-none text-zinc-950 bg-ember rounded-sm font-[family-name:var(--font-mono)]">
                    {jobCount}
                  </span>
                )}
              </Link>
            ))}
            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-1 px-4 py-3 text-[13px] tracking-wide">
              {(['en', 'da', 'de'] as const).map((l, i) => (
                <Fragment key={l}>
                  {i > 0 && <span className="text-zinc-600">|</span>}
                  <Link href="/" locale={l} className={locale === l ? 'font-semibold text-ember' : 'text-zinc-500 hover:text-white'}>
                    {l.toUpperCase()}
                  </Link>
                </Fragment>
              ))}
            </div>
            <div className="pt-4">
              <Link
                href="/contact"
                className="block w-full py-3.5 text-center text-sm font-semibold tracking-wide uppercase text-zinc-950 bg-ember"
                onClick={() => setMobileOpen(false)}
              >
                {t("getQuote")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
