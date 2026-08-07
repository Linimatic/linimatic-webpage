import type {Metadata} from "next";
import {Fragment} from "react";
import Image from "next/image";
import Link from "next/link";
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {buildMetadata, type Locale} from '@/lib/seo';
import {HeroImageFader} from '@/components/HeroImageFader';
import {TestimonialFader} from '@/components/TestimonialFader';

/** Images/video that crossfade in the hero slot. Add more entries here to include them in the rotation. */
const heroItems = [
  { type: "image" as const, src: "/images/hero/facility-aerial.jpg", altKey: "hero.heroImageAlt3" },
  { type: "image" as const, src: "/images/services/die-casting-mold.png", altKey: "hero.heroImageAlt" },
  { type: "image" as const, src: "/images/hero/two-generations.png", altKey: "hero.heroImageAlt2" },
  { type: "video" as const, src: "/videos/hero/robot-cell.mp4", altKey: "hero.heroImageAlt4", durationMs: 8900 },
];

const caseImages = [
  { image: "/images/cases/supplier-proximity.jpg", href: "/cases/supplier-proximity" },
  { image: "/images/cases/velux-motor-frame.jpg", href: "/cases/velux-kanban" },
  { image: "/images/cases/frandsen-downlight.jpg", href: "/cases/frandsen-downlight" },
];

const teamPhotos = [
  "/images/team/torben-m-jensen.jpg",
  "/images/team/rene-johnsen.jpg",
  "/images/team/jan-v-jorgensen.jpg",
];

/** Each value-chain step links to the most relevant service detail page. */
const chainSlugs = [
  "prototyping",
  "die-casting",
  "die-casting",
  "quality",
  "assembly",
];

/** Map of client names to their logo files. Clients without logos show as styled text. */
const clientLogoMap: Record<string, { logo: string; width: number; height: number } | null> = {
  "Bang & Olufsen": { logo: "/images/clients/bang-olufsen.png", width: 84, height: 100 },
  "One Collection": { logo: "/images/clients/one-collection.png", width: 220, height: 100 },
  "Fritz Hansen": null,   // LOGO NEEDED — source from Fritz Hansen brand assets
  "VELUX": null,           // LOGO NEEDED — source from VELUX brand assets
  "HOWE": { logo: "/images/clients/howe.png", width: 160, height: 100 },
  "Montana": null,         // LOGO NEEDED — source from Montana brand assets
  "Frandsen": null,        // LOGO NEEDED — source from Frandsen brand assets
  "ClimaWin": { logo: "/images/clients/climawin.png", width: 270, height: 100 },
};

/** Placeholder component — visually obvious amber banner for content Marc needs to provide */
function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative border-2 border-dashed border-amber-400 bg-amber-50 px-4 py-3 text-sm text-amber-800 rounded-sm">
      <span className="absolute -top-2.5 left-3 bg-amber-400 text-amber-950 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm">
        Content needed
      </span>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: "meta"});
  return buildMetadata({
    locale: locale as Locale,
    path: "",
    title: t("home.title"),
    description: t("home.description"),
    absoluteTitle: true,
  });
}

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const isPlaceholder = (text: string) => text.startsWith('PLACEHOLDER') || text.startsWith('PLADSHOLDER') || text.startsWith('PLATZHALTER');

  const statsItems = t.raw('stats.items') as Array<{value: string; label: string}>;
  const caseItems = t.raw('cases.items') as Array<{title: string; client: string; metric: string; result: string}>;
  const chainSteps = t.raw('valueChain.steps') as Array<{number: string; label: string; title: string; description: string; specs: string}>;
  const clientNames = t.raw('clients.logos') as Array<{name: string}>;
  const testimonials = (t.raw('clients.testimonials') as Array<{quote: string; author: string; role: string}>)
    .filter((item) => !isPlaceholder(item.quote));
  const teamMembers = t.raw('team.members') as Array<{name: string; role: string; phone: string; email: string}>;

  return (
    <>
      {/* ═══════════════════════════════════ HERO ═══════════════════════════════════ */}
      <section className="relative overflow-hidden bg-zinc-50">
        <div className="absolute top-0 left-0 right-0 h-20 bg-zinc-950" />
        <div className="absolute top-16 right-[50%] text-[28rem] leading-none font-bold text-zinc-300/30 pointer-events-none select-none font-[family-name:var(--font-display)] hidden lg:block">
          {t('hero.watermark')}
        </div>

        <div className="relative mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20 pt-36 lg:pt-44 pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8 animate-fade-up">
                <div className="w-12 h-px bg-ember" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
                  {t('hero.eyebrow')}
                </span>
              </div>
              <h1 className="animate-fade-up delay-1">
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold text-zinc-900 leading-[0.92] tracking-[-0.03em] font-[family-name:var(--font-display)]">
                  {t('hero.headline1')}
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[0.92] tracking-[-0.03em] font-[family-name:var(--font-display)] mt-1">
                  {t('hero.headline2')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-ember via-ember-light to-ember">{t('hero.headlineAccent')}</span>
                </span>
              </h1>
              <p className="mt-8 text-xl sm:text-2xl text-zinc-600 font-medium leading-snug tracking-tight animate-fade-up delay-2 font-[family-name:var(--font-display)]">
                {t('hero.tagline')}
              </p>
              <p className="mt-4 text-base text-zinc-600 max-w-md leading-relaxed animate-fade-up delay-2">
                {t('hero.description')}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3 animate-fade-up delay-3">
                <Link href="/contact" className="group inline-flex items-center justify-center gap-3 bg-ember hover:bg-ember-light px-7 py-3.5 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all">
                  {t('hero.ctaPrimary')}
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </Link>
                <Link href="/services" className="group inline-flex items-center justify-center gap-3 border border-zinc-300 hover:border-zinc-500 px-7 py-3.5 text-sm font-semibold tracking-wide uppercase text-zinc-700 hover:text-zinc-900 transition-all">
                  {t('hero.ctaSecondary')}
                </Link>
              </div>
            </div>
            <div className="animate-fade-up delay-2 lg:-mr-16 xl:-mr-20">
              <div className="relative aspect-[4/3] lg:aspect-square">
                <HeroImageFader items={heroItems.map((item) => ({ ...item, alt: t(item.altKey) }))} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-12 bg-zinc-950 grain">
          <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 animate-fade-up delay-4">
              {statsItems.map((stat, i) => (
                <div key={stat.label} className={`py-8 lg:py-10 ${i > 0 ? "border-l border-zinc-800 pl-6 lg:pl-8" : ""} ${i >= 3 ? "hidden sm:block" : ""}`}>
                  <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-[family-name:var(--font-mono)]">{stat.value}</div>
                  <div className="mt-1 text-[11px] tracking-[0.15em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Client logos — carousel on dark background */}
            <div className="border-t border-zinc-800 py-8">
              <div className="text-center mb-5">
                <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">{t('clients.trustedBy')}</span>
              </div>
              <div className="relative max-w-3xl mx-auto overflow-hidden">
                {/* Fade edges — dark variant */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

                {/* Each copy must have identical width — use margin-right on every item (including last) for seamless loop */}
                <div className="flex animate-logo-scroll w-max">
                  {[0, 1].map((copy) => (
                    <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 1}>
                      {clientNames.map((client) => {
                        const logoEntry = clientLogoMap[client.name];
                        if (logoEntry) {
                          return (
                            <Image
                              key={`${client.name}-${copy}`}
                              src={logoEntry.logo}
                              alt={client.name}
                              width={logoEntry.width}
                              height={logoEntry.height}
                              className="h-6 sm:h-7 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-90 transition-opacity duration-300 shrink-0 mr-12"
                            />
                          );
                        }
                        return (
                          <span key={`${client.name}-${copy}`} className="text-sm sm:text-base font-semibold text-zinc-400 hover:text-zinc-200 transition-colors font-[family-name:var(--font-display)] tracking-tight whitespace-nowrap shrink-0 mr-12">
                            {client.name}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ VALUE CHAIN ═══════════════════════════════════ */}
      <section className="bg-white py-24 sm:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          {/* Header */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">
                {t('valueChain.eyebrow')}
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
              {t('valueChain.heading')}
            </h2>
            <p className="mt-4 text-base text-zinc-600 leading-relaxed max-w-2xl">
              {t('valueChain.description')}
            </p>
          </div>

          {/* Connected value chain — 5 steps, each links to its service.
              Below lg the steps stack vertically (not a 2-col wrap) so the
              step order always reads top-to-bottom; a horizontal connector
              is used only at lg where all 5 steps sit in a single row. */}
          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-0">
            {chainSteps.map((step, i) => {
              const isLast = i === chainSteps.length - 1;
              return (
                <Fragment key={step.number}>
                  <Link
                    href={`/services/${chainSlugs[i]}`}
                    className="group relative flex flex-col"
                  >
                    {/* Step node + horizontal connector (lg only) */}
                    <div className="relative z-10 flex items-center gap-3 mb-5 lg:mb-6">
                      <div className="relative w-20 h-20 flex flex-col items-center justify-center bg-zinc-950 text-white shrink-0 px-2 transition-colors duration-300 group-hover:bg-ember">
                        <span className="absolute inset-x-0 top-0 h-[3px] bg-ember transition-colors duration-300 group-hover:bg-zinc-950" />
                        <span className="text-[10px] tracking-[0.08em] uppercase text-ember leading-none text-center font-[family-name:var(--font-mono)] transition-colors duration-300 group-hover:text-zinc-950">{step.label}</span>
                        <span className="text-xl font-bold leading-none mt-1 font-[family-name:var(--font-mono)] transition-colors duration-300 group-hover:text-zinc-950">{step.number}</span>
                      </div>
                      {!isLast && (
                        <div className="hidden lg:flex flex-1 items-center gap-1.5 pr-1">
                          <div className="flex-1 h-px bg-zinc-200" />
                          <svg className="h-3 w-3 shrink-0 text-zinc-300 transition-colors duration-300 group-hover:text-ember" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                          </svg>
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div className="pr-4 lg:pr-5 pb-8 lg:pb-0 flex flex-col flex-1">
                      <h3 className="text-base font-semibold text-zinc-900 group-hover:text-ember transition-colors duration-300 font-[family-name:var(--font-display)] tracking-tight mb-1.5">{step.title}</h3>
                      <p className="text-[15px] text-zinc-600 leading-relaxed">{step.description}</p>
                      <p className="mt-auto pt-3 text-[11px] tracking-[0.05em] text-ember font-[family-name:var(--font-mono)]">{step.specs}</p>
                    </div>
                  </Link>
                  {/* Vertical connector between stacked steps (below lg only) */}
                  {!isLast && (
                    <div className="flex lg:hidden justify-center py-1 mb-2">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-px h-6 bg-zinc-200" />
                        <svg className="h-3 w-3 text-zinc-300" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 8.25 12 15.75l7.5-7.5" />
                        </svg>
                      </div>
                    </div>
                  )}
                </Fragment>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link href="/contact" className="group inline-flex items-center gap-3 bg-ember hover:bg-ember-light px-8 py-4 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all">
              {t('valueChain.cta')}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </Link>
            <Link href="/services" className="group inline-flex items-center gap-3 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
              <span className="border-b border-zinc-300 group-hover:border-zinc-600 pb-px transition-colors">{t('valueChain.allServices')}</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ TESTIMONIAL ═══════════════════════════════════ */}
      <section className="bg-zinc-50 py-16 border-y border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          {testimonials.length === 0 ? (
            <div className="max-w-3xl mx-auto">
              <Placeholder>
                <strong>Customer testimonial needed.</strong> A quote from an engineering director or procurement manager at a named client (e.g. Fritz Hansen, VELUX, B&O) about reliability, complex geometry expertise, or the one-roof value chain. This single element can be more persuasive than any other section on the page.
              </Placeholder>
            </div>
          ) : (
            <TestimonialFader items={testimonials} />
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════ CASES ═══════════════════════════════════ */}
      <section className="bg-zinc-950 grain py-24 sm:py-32 relative">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-ember" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">{t('cases.eyebrow')}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">{t('cases.heading')}</h2>
            </div>
            <Link href="/cases" className="group inline-flex items-center gap-3 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              <span className="border-b border-zinc-700 group-hover:border-zinc-400 pb-px transition-colors">{t('cases.allCases')}</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {caseItems.map((item, i) => (
              <Link key={item.client} href={caseImages[i].href} className="group relative bg-zinc-900 overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <Image src={caseImages[i].image} alt={item.title} fill className="object-cover opacity-50 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent transition-opacity duration-700 group-hover:opacity-50" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <span className="inline-block text-base sm:text-lg tracking-[0.15em] uppercase text-ember font-[family-name:var(--font-mono)] mb-3">{item.client}</span>
                    <h3 className="text-lg font-semibold text-white leading-tight font-[family-name:var(--font-display)] tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm text-zinc-400 font-[family-name:var(--font-mono)]">{item.metric}</p>
                    {/* Result — placeholder styled visibly */}
                    {isPlaceholder(item.result) ? (
                      <div className="mt-3 border border-dashed border-amber-500/50 bg-amber-500/10 px-3 py-2 rounded-sm">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-amber-400 font-[family-name:var(--font-mono)]">Content needed: </span>
                        <span className="text-xs text-amber-300/80">{item.result.replace(/^(PLACEHOLDER|PLADSHOLDER|PLATZHALTER):\s*/, '')}</span>
                      </div>
                    ) : (
                      <p className="mt-3 text-sm font-semibold text-ember">{item.result}</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ TEAM ═══════════════════════════════════ */}
      <section className="bg-zinc-50 py-24 sm:py-32 border-t border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-mono)]">{t('team.eyebrow')}</span>
              <div className="w-8 h-px bg-ember" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)]">{t('team.heading')}</h2>
            <p className="mt-5 text-lg text-zinc-600 leading-relaxed">{t('team.description')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, i) => (
              <div key={member.name} className="bg-white border border-zinc-200 flex flex-col items-center text-center">
                <div className="relative aspect-[3/4] w-[57.6%] mt-6 bg-zinc-200">
                  <Image
                    src={teamPhotos[i]}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 58vw, 19vw"
                  />
                </div>
                <div className="p-6 flex flex-col items-center">
                  <h3 className="text-base font-semibold text-zinc-900 font-[family-name:var(--font-display)]">{member.name}</h3>
                  <p className="text-sm text-zinc-600">{member.role}</p>
                  <div className="mt-3 flex flex-col items-center gap-1">
                    <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="text-xs text-zinc-600 hover:text-ember transition-colors font-[family-name:var(--font-mono)]">{member.phone}</a>
                    <a href={`mailto:${member.email}`} className="text-xs text-zinc-600 hover:text-ember transition-colors">{member.email}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ CTA ═══════════════════════════════════ */}
      <section className="bg-zinc-950 grain relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/services/facility-2022.jpg" alt="" fill className="object-cover opacity-10" sizes="100vw" />
        </div>
        <div className="relative mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20 py-28 sm:py-36">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">{t('cta.heading')}</h2>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-lg">{t('cta.description')}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-ember font-[family-name:var(--font-mono)]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              {t('cta.responsePromise')}
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="group inline-flex items-center justify-center gap-3 bg-ember hover:bg-ember-light px-8 py-4 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all">
                {t('cta.getInTouch')}
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
              </Link>
              <a href="tel:+4548764040" className="inline-flex items-center justify-center gap-3 border border-zinc-600 hover:border-zinc-400 px-8 py-4 text-sm font-semibold tracking-wide text-zinc-300 hover:text-white transition-all font-[family-name:var(--font-mono)]">
                {t('cta.phone')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
