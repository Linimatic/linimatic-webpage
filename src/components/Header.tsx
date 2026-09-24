"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback, Fragment } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

const serviceKeys = [
  { key: "prototyping", href: "/services/prototyping" },
  { key: "dieCasting", href: "/services/die-casting" },
  { key: "postProcessing", href: "/services/post-processing" },
  { key: "surfaceTreatment", href: "/services/surface-treatment" },
  { key: "quality", href: "/services/quality" },
  { key: "assembly", href: "/services/assembly" },
  { key: "zinkTemadag", href: "/zink-temadag" },
];

const aboutKeys = [
  { key: "about", href: "/about" },
  { key: "news", href: "/about/news" },
];

const sustainabilityKeys = [
  { key: "co2", href: "/about/co2" },
  { key: "codeOfConduct", href: "/about/code-of-conduct" },
];

const contactKeys = [
  { key: "people", href: "/contact/people" },
  { key: "form", href: "/contact" },
];

const navKeys = [
  { key: "services", href: "/services", hasDropdown: true },
  { key: "cases", href: "/cases" },
  { key: "whyZinc", href: "/why-zinc" },
  { key: "zinkers", href: "/zinkers" },
  { key: "about", href: "/about", hasDropdown: true },
  { key: "sustainability", href: "/about/sustainability", hasDropdown: true },
  { key: "jobs", href: "/jobs" },
  { key: "contact", href: "/contact", hasDropdown: true },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const t = useTranslations("header");
  const tJobs = useTranslations("jobsPage");
  const tContact = useTranslations("contactTabs");
  const locale = useLocale();
  const pathname = usePathname();
  const jobCount = (tJobs.raw("positions") as unknown[]).length;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownKeyDown = useCallback(
    (itemKey: string) => (e: React.KeyboardEvent) => {
      const ref = dropdownRefs.current[itemKey];
      if (e.key === "Escape") {
        setOpenDropdown(null);
        ref?.querySelector("a")?.focus();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (openDropdown !== itemKey) {
          setOpenDropdown(itemKey);
        } else {
          const links = ref?.querySelectorAll<HTMLAnchorElement>("div[role='menu'] a");
          const current = document.activeElement;
          if (links) {
            const idx = Array.from(links).indexOf(current as HTMLAnchorElement);
            links[Math.min(idx + 1, links.length - 1)]?.focus();
          }
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const links = ref?.querySelectorAll<HTMLAnchorElement>("div[role='menu'] a");
        if (links) {
          const idx = Array.from(links).indexOf(document.activeElement as HTMLAnchorElement);
          if (idx <= 0) {
            setOpenDropdown(null);
            ref?.querySelector("a")?.focus();
          } else {
            links[idx - 1]?.focus();
          }
        }
      }
    },
    [openDropdown]
  );

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
          {/* Logo — white-text variant on the dark bar, original colors on the white bar */}
          <Link href="/" className="flex-shrink-0 relative z-10">
            <Image
              src="/images/brand/linimatic-logo-zinc-white.png"
              alt={t("logoAlt")}
              width={240}
              height={50}
              priority
              className={`h-10 wide:h-8 min-[1700px]:h-10 w-auto transition-opacity duration-300 ${scrolled ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src="/images/brand/linimatic-logo-zinc.png"
              alt=""
              aria-hidden="true"
              width={240}
              height={50}
              priority
              className={`absolute left-0 top-0 h-10 wide:h-8 min-[1700px]:h-10 w-auto transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
            />
          </Link>

          {/* Desktop Nav — only from `wide` (1400px); below that it lives in the drawer */}
          <nav className="hidden wide:flex items-center gap-0">
            {navKeys.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.key}
                  className="relative"
                  ref={(el) => {
                    dropdownRefs.current[item.key] = el;
                  }}
                  onMouseEnter={() => setOpenDropdown(item.key)}
                  onMouseLeave={() =>
                    setOpenDropdown((cur) => (cur === item.key ? null : cur))
                  }
                  onKeyDown={handleDropdownKeyDown(item.key)}
                >
                  <Link
                    href={item.href}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === item.key}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenDropdown((cur) => (cur === item.key ? null : item.key));
                      }
                    }}
                    className={`flex items-center gap-1 px-2.5 min-[1700px]:px-4 py-2 text-[12px] min-[1700px]:text-[13px] font-medium tracking-wide uppercase transition-colors ${
                      scrolled ? "text-zinc-600 hover:text-zinc-900" : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                    <svg className="h-3 w-3 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                  </Link>
                  {/* Always rendered, toggled with `invisible` rather than mounted on
                      open: a conditionally mounted panel keeps its links out of the
                      served HTML entirely, and a crawler never hovers, so
                      /about/co2 and /zink-temadag had no discoverable link at all.
                      `invisible` also keeps the closed menu out of the tab order. */}
                  <div
                    className={`absolute top-full left-0 pt-2 ${item.key === "services" ? "w-80" : "w-56"} ${
                      openDropdown === item.key ? "" : "invisible pointer-events-none"
                    }`}
                  >
                    <div role="menu" className={`rounded-sm shadow-2xl p-1.5 ${
                      scrolled
                        ? "bg-white border border-zinc-200"
                        : "bg-zinc-900 border border-zinc-700/50"
                    }`}>
                      {item.key === "services" ? (
                        <>
                          <Link
                            href="/services"
                            role="menuitem"
                            className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium text-ember rounded-sm transition-colors ${
                              scrolled ? "hover:bg-zinc-50" : "hover:bg-zinc-800"
                            }`}
                          >
                            {t("allServices")}
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                          <div className={`my-1 border-t ${scrolled ? "border-zinc-100" : "border-zinc-800"}`} />
                          {serviceKeys.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              role="menuitem"
                              className={`block px-4 py-2.5 text-sm rounded-sm transition-colors ${
                                scrolled
                                  ? "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                              }`}
                            >
                              {t(`servicesList.${service.key}`)}
                            </Link>
                          ))}
                        </>
                      ) : item.key === "about" ? (
                        aboutKeys.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            role="menuitem"
                            className={`block px-4 py-2.5 text-sm rounded-sm transition-colors ${
                              scrolled
                                ? "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                            }`}
                          >
                            {t(`aboutList.${sub.key}`)}
                          </Link>
                        ))
                      ) : item.key === "sustainability" ? (
                        sustainabilityKeys.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            role="menuitem"
                            className={`block px-4 py-2.5 text-sm rounded-sm transition-colors ${
                              scrolled
                                ? "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                            }`}
                          >
                            {t(`sustainabilityList.${sub.key}`)}
                          </Link>
                        ))
                      ) : (
                        contactKeys.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            role="menuitem"
                            className={`block px-4 py-2.5 text-sm rounded-sm transition-colors ${
                              scrolled
                                ? "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                            }`}
                          >
                            {tContact(sub.key)}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-2.5 min-[1700px]:px-4 py-2 text-[12px] min-[1700px]:text-[13px] font-medium tracking-wide uppercase transition-colors ${
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

          {/* Language switcher + CTA — stays in the bar from tablet up, next to the drawer button */}
          <div className="hidden sm:flex items-center gap-3 xl:gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 text-[13px] tracking-wide">
              {(['en', 'da', 'de'] as const).map((l, i) => (
                <Fragment key={l}>
                  {i > 0 && <span className="text-zinc-600">|</span>}
                  <Link href={pathname} locale={l} className={locale === l ? 'font-semibold text-ember' : scrolled ? 'text-zinc-600 hover:text-zinc-700' : 'text-zinc-400 hover:text-white'}>
                    {l.toUpperCase()}
                  </Link>
                </Fragment>
              ))}
            </div>
            {/* Phone only where there is room left over next to the full nav */}
            <a href="tel:+4548764040" className={`hidden min-[1800px]:block text-[13px] tracking-wide transition-colors font-[family-name:var(--font-mono)] ${
              scrolled ? "text-zinc-600 hover:text-zinc-700" : "text-zinc-400 hover:text-white"
            }`}>
              {t("phone")}
            </a>
            <Link
              href="/contact"
              className="relative px-3.5 min-[1700px]:px-6 py-2.5 text-[12px] min-[1700px]:text-[13px] font-semibold tracking-wide uppercase text-zinc-950 bg-ember hover:bg-ember-light transition-colors whitespace-nowrap"
            >
              {t("getQuote")}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className={`wide:hidden p-2.5 -mr-2.5 transition-colors ${scrolled ? "text-zinc-700" : "text-zinc-300"}`}
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
        <div className="wide:hidden bg-zinc-950 border-t border-zinc-800 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain">
          <nav className="px-6 sm:px-10 py-6 space-y-1">
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
            {/* Phone — the bar only shows it on very wide screens, so it belongs here */}
            <a
              href="tel:+4548764040"
              className="flex items-center gap-2 px-4 py-3 text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors font-[family-name:var(--font-mono)]"
              onClick={() => setMobileOpen(false)}
            >
              {t("phone")}
            </a>
            {/* Language switcher — the bar carries it from `sm` up */}
            <div className="sm:hidden flex items-center gap-1 px-4 py-3 text-[13px] tracking-wide">
              {(['en', 'da', 'de'] as const).map((l, i) => (
                <Fragment key={l}>
                  {i > 0 && <span className="text-zinc-600">|</span>}
                  <Link href={pathname} locale={l} className={locale === l ? 'font-semibold text-ember' : 'text-zinc-400 hover:text-white'}>
                    {l.toUpperCase()}
                  </Link>
                </Fragment>
              ))}
            </div>
            <div className="sm:hidden pt-4">
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
