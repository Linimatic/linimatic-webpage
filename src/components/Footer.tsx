import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const serviceHrefs = [
  "/services/prototyping",
  "/services/die-casting",
  "/services/post-processing",
  "/services/surface-treatment",
  "/services/quality",
  "/services/assembly",
];

const companyLinkEntries: { key: string; href: string }[] = [
  { key: "aboutUs", href: "/about" },
  { key: "cases", href: "/cases" },
  { key: "whyZinc", href: "/why-zinc" },
  { key: "careers", href: "/jobs" },
  { key: "zinkers", href: "/zinkers" },
];

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-zinc-950 text-zinc-400">
      {/* Top rule */}
      <div className="border-t border-zinc-800" />

      <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20 pt-20 pb-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Image
              src="/images/brand/linimatic-tagline-white.png"
              alt={t("logoAlt")}
              width={200}
              height={40}
              className="h-7 w-auto opacity-80 mb-6"
            />
            <p className="text-sm leading-relaxed max-w-xs">
              {t("brandDescription")}
            </p>
            <div className="mt-8 flex gap-5">
              <a
                href="https://www.linkedin.com/company/linimatic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-ember transition-colors"
                aria-label={t("linkedInAriaLabel")}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-[11px] font-semibold text-zinc-500 tracking-[0.2em] uppercase mb-5 font-[family-name:var(--font-mono)]">
              {t("servicesHeading")}
            </h3>
            <ul className="space-y-3">
              {serviceHrefs.map((href, i) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors"
                  >
                    {t(`serviceLinks.${i}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold text-zinc-500 tracking-[0.2em] uppercase mb-5 font-[family-name:var(--font-mono)]">
              {t("companyHeading")}
            </h3>
            <ul className="space-y-3">
              {companyLinkEntries.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 hover:text-white transition-colors"
                  >
                    {t(`companyLinks.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-semibold text-zinc-500 tracking-[0.2em] uppercase mb-5 font-[family-name:var(--font-mono)]">
              {t("contactHeading")}
            </h3>
            <address className="not-italic space-y-3 text-sm">
              <p>{t("address.street")}</p>
              <p>{t("address.postalCity")}</p>
              <p>{t("address.country")}</p>
              <div className="pt-3 space-y-2">
                <p>
                  <a href="tel:+4548764040" className="font-[family-name:var(--font-mono)] text-zinc-300 hover:text-ember transition-colors">
                    {t("phone")}
                  </a>
                </p>
                <p>
                  <a href="mailto:info@linimatic.dk" className="text-zinc-300 hover:text-ember transition-colors">
                    {t("email")}
                  </a>
                </p>
              </div>
            </address>
          </div>
        </div>

        {/* Sub-footer */}
        <div className="mt-16 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-zinc-600 font-[family-name:var(--font-mono)] tracking-wide">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-8 text-[11px] text-zinc-600 font-[family-name:var(--font-mono)] tracking-wide">
            <Link href="/privacy" className="hover:text-zinc-400 transition-colors">{t("privacy")}</Link>
            <Link href="/cookies" className="hover:text-zinc-400 transition-colors">{t("cookies")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
