import Image from "next/image";
import Link from "next/link";
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {routing} from '@/i18n/routing';

const serviceImages = [
  { image: "/images/services/prototypes.jpg", href: "/services/prototypes" },
  { image: "/images/services/foundry-machine-operator.jpg", href: "/services/casting-foundry" },
  { image: "/images/services/cnc-post-processing.jpg", href: "/services/post-processing" },
  { image: "/images/services/surface-coating-chrome.jpg", href: "/services/surface-coating" },
  { image: "/images/services/quality-assurance.jpg", href: "/services/quality-assurance" },
  { image: "/images/services/assembly.jpg", href: "/services/assembly" },
];

const caseImages = [
  { image: "/images/cases/supplier-proximity.jpg", href: "/cases/supplier-proximity" },
  { image: "/images/cases/one-collection-finn-juhl.jpg", href: "/cases/one-collection" },
  { image: "/images/cases/better-than-china.jpg", href: "/cases/better-than-china" },
];

const clientLogos = [
  { logo: "/images/clients/bang-olufsen.png", width: 84, height: 100 },
  { logo: "/images/clients/one-collection.png", width: 220, height: 100 },
  { logo: "/images/clients/howe.png", width: 160, height: 100 },
  { logo: "/images/clients/climawin.png", width: 270, height: 100 },
];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const statsItems = t.raw('stats.items') as Array<{value: string; label: string}>;
  const serviceItems = t.raw('services.items') as Array<{name: string; description: string}>;
  const caseItems = t.raw('cases.items') as Array<{title: string; client: string; metric: string}>;
  const whereWeShineItems = t.raw('whereWeShine.items') as Array<{number: string; title: string; description: string}>;
  const whyZincSpecs = t.raw('whyZinc.specs') as Array<{value: string; unit: string; label: string}>;
  const bulletPoints = t.raw('whyLinimatic.bulletPoints') as Array<{title: string; description: string}>;
  const clientNames = t.raw('clients.logos') as Array<{name: string}>;

  return (
    <>
      {/* ═══════════════════════════════════ HERO ═══════════════════════════════════ */}
      <section className="relative overflow-hidden bg-zinc-50">
        {/* Dark strip for header */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-zinc-950" />

        {/* Large faded Zn watermark */}
        <div className="absolute top-16 -right-20 text-[28rem] leading-none font-bold text-zinc-200/40 pointer-events-none select-none font-[family-name:var(--font-display)] hidden lg:block">
          {t('hero.watermark')}
        </div>

        <div className="relative mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20 pt-36 lg:pt-44 pb-0">
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-4 mb-8 animate-fade-up">
                <div className="w-12 h-px bg-ember" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
                  {t('hero.eyebrow')}
                </span>
              </div>

              {/* Headline */}
              <h1 className="animate-fade-up delay-1">
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold text-zinc-900 leading-[0.92] tracking-[-0.03em] font-[family-name:var(--font-display)]">
                  {t('hero.headline1')}
                </span>
                <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[0.92] tracking-[-0.03em] font-[family-name:var(--font-display)] mt-1">
                  {t('hero.headline2')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-ember via-ember-light to-ember">{t('hero.headlineAccent')}</span>
                </span>
              </h1>

              {/* Sub copy */}
              <p className="mt-8 text-xl sm:text-2xl text-zinc-600 font-medium leading-snug tracking-tight animate-fade-up delay-2 font-[family-name:var(--font-display)]">
                {t('hero.tagline')}
              </p>
              <p className="mt-4 text-base text-zinc-400 max-w-md leading-relaxed animate-fade-up delay-2">
                {t('hero.description')}
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-col sm:flex-row gap-3 animate-fade-up delay-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 bg-ember hover:bg-ember-light px-7 py-3.5 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all"
                >
                  {t('hero.ctaPrimary')}
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="group inline-flex items-center justify-center gap-3 border border-zinc-300 hover:border-zinc-500 px-7 py-3.5 text-sm font-semibold tracking-wide uppercase text-zinc-700 hover:text-zinc-900 transition-all"
                >
                  {t('hero.ctaSecondary')}
                </Link>
              </div>
            </div>

            {/* Right — Video with image fallback, larger and breaking out of container */}
            <div className="animate-fade-up delay-2 lg:-mr-16 xl:-mr-20">
              {/*
                VIDEO: Place hero video at /public/videos/hero.mp4 (and optionally hero.webm).
                Recommended: 1920x1080, 15-25s loop, H.264 MP4, no audio track, 4-8MB max.
              */}
              <div className="relative overflow-hidden aspect-[4/3] lg:aspect-[5/4]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/images/services/casting-mold.jpg"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  {/* Uncomment when video files are ready:
                  <source src="/videos/hero.webm" type="video/webm" />
                  <source src="/videos/hero.mp4" type="video/mp4" />
                  */}
                </video>
                <Image
                  src="/images/services/casting-mold.jpg"
                  alt={t('hero.heroImageAlt')}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                {/* Subtle gradient fade on left edge to blend with bg */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-50 to-transparent hidden lg:block" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip — dark band for visual rhythm */}
        <div className="mt-12 bg-zinc-950 grain">
          <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 animate-fade-up delay-4">
              {statsItems.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`py-8 lg:py-10 ${i > 0 ? "border-l border-zinc-800 pl-6 lg:pl-8" : ""} ${i >= 3 ? "hidden sm:block" : ""}`}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-[family-name:var(--font-mono)]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] tracking-[0.15em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ SERVICES ═══════════════════════════════════ */}
      <section className="bg-white py-24 sm:py-32 relative overflow-hidden">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          {/* Section header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-ember" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
                  {t('services.eyebrow')}
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
                {t('services.heading')}
              </h2>
            </div>
            <p className="text-lg text-zinc-500 leading-relaxed max-w-lg">
              {t('services.description')}
            </p>
          </div>

          {/* Services — top row: 1 wide + 2 standard, bottom row: 3 standard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* First card spans 2 columns on large screens */}
            <Link
              href={serviceImages[1].href}
              className="group relative overflow-hidden bg-zinc-950 sm:col-span-2 lg:col-span-1"
            >
              <div className="aspect-[16/10] sm:aspect-[21/9] lg:aspect-[4/3] relative overflow-hidden">
                <Image
                  src="/images/services/cnc-post-processing.jpg"
                  alt={t('services.imageAlts.cncMachining')}
                  fill
                  className="object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-70"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-7">
                  <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-ember font-[family-name:var(--font-mono)] mb-2">
                    {t('services.coreProcessLabel')}
                  </span>
                  <h3 className="text-xl font-bold text-white font-[family-name:var(--font-display)] tracking-tight">
                    {serviceItems[1].name}
                  </h3>
                  <p className="mt-1.5 text-sm text-zinc-300 leading-relaxed">
                    {serviceItems[1].description}
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-ember opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Remaining 5 services as uniform cards */}
            {[0, 2, 3, 4, 5].map((idx) => (
              <Link
                key={serviceItems[idx].name}
                href={serviceImages[idx].href}
                className="group relative overflow-hidden"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={serviceImages[idx].image}
                    alt={serviceItems[idx].name}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/10 to-transparent" />
                  <div className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-ember opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                    <h3 className="text-base font-semibold text-white font-[family-name:var(--font-display)] tracking-tight">
                      {serviceItems[idx].name}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-300 leading-relaxed">
                      {serviceItems[idx].description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/services"
              className="group inline-flex items-center gap-4 text-base font-semibold text-zinc-700 hover:text-zinc-900 transition-colors"
            >
              <span className="font-[family-name:var(--font-display)] text-lg">{t('services.viewAllServices')}</span>
              <div className="w-12 h-12 flex items-center justify-center border border-zinc-300 group-hover:border-ember group-hover:bg-ember transition-all duration-300">
                <svg className="h-5 w-5 text-zinc-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ WHY LINIMATIC ═══════════════════════════════════ */}
      <section className="bg-white relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Image side — full bleed */}
          <div className="relative min-h-[400px] lg:min-h-0">
            <Image
              src="/images/services/cnc-post-processing.jpg"
              alt={t('whyLinimatic.imageAlt')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 lg:bg-none" />
          </div>

          {/* Content side */}
          <div className="flex flex-col justify-center px-6 lg:px-20 xl:px-28 py-20 lg:py-28">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
                {t('whyLinimatic.eyebrow')}
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
              {t('whyLinimatic.heading')}
            </h2>

            <p className="mt-8 text-lg text-zinc-500 leading-relaxed max-w-lg">
              {t('whyLinimatic.description')}
            </p>

            <div className="mt-10 space-y-5">
              {bulletPoints.map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="mt-1.5 w-2 h-2 bg-ember flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-zinc-900">{item.title}</div>
                    <div className="text-sm text-zinc-500">{item.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 text-sm font-semibold text-zinc-900 hover:text-ember transition-colors"
              >
                <span className="border-b border-zinc-300 group-hover:border-ember pb-px transition-colors">{t('whyLinimatic.ourStory')}</span>
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ WHERE WE SHINE ═══════════════════════════════════ */}
      <section className="bg-zinc-100 py-24 sm:py-32 relative overflow-hidden">
        <div className="relative mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
                {t('whereWeShine.eyebrow')}
              </span>
              <div className="w-8 h-px bg-ember" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)]">
              {t('whereWeShine.heading')}
            </h2>
            <p className="mt-6 text-lg text-zinc-500 leading-relaxed">
              {t('whereWeShine.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-300">
            {whereWeShineItems.map((item) => (
              <div key={item.number} className="bg-white p-8 sm:p-10">
                <span className="text-4xl sm:text-4xl font-bold text-ember/80 font-[family-name:var(--font-mono)] leading-none">
                  {item.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900 font-[family-name:var(--font-display)] tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border border-zinc-400 hover:border-zinc-900 px-8 py-4 text-sm font-semibold tracking-wide uppercase text-zinc-700 hover:text-zinc-950 transition-all"
            >
              {t('whereWeShine.cta')}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ CASES ═══════════════════════════════════ */}
      <section className="bg-zinc-950 grain py-24 sm:py-32 relative">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-8 h-px bg-ember" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
                  {t('cases.eyebrow')}
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
                {t('cases.heading')}
              </h2>
            </div>
            <Link
              href="/cases"
              className="group inline-flex items-center gap-3 text-sm font-medium text-zinc-500 hover:text-white transition-colors"
            >
              <span className="border-b border-zinc-700 group-hover:border-zinc-400 pb-px transition-colors">{t('cases.allCases')}</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Cases grid — asymmetric: 1 large + 2 stacked */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-zinc-800">
            {/* Featured case */}
            <Link
              href={caseImages[0].href}
              className="lg:col-span-3 group relative bg-zinc-900 overflow-hidden"
            >
              <div className="aspect-[16/10] lg:aspect-[16/11] relative">
                <Image
                  src={caseImages[0].image}
                  alt={caseItems[0].title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-ember font-[family-name:var(--font-mono)] mb-3">
                    {caseItems[0].client}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight font-[family-name:var(--font-display)] tracking-tight max-w-md">
                    {caseItems[0].title}
                  </h3>
                  <p className="mt-2 text-sm text-zinc-400">{caseItems[0].metric}</p>
                </div>
              </div>
            </Link>

            {/* Two stacked cases */}
            <div className="lg:col-span-2 flex flex-col gap-px">
              {caseItems.slice(1).map((item, i) => (
                <Link
                  key={item.title}
                  href={caseImages[i + 1].href}
                  className="group relative bg-zinc-900 overflow-hidden flex-1"
                >
                  <div className="relative h-full min-h-[240px]">
                    <Image
                      src={caseImages[i + 1].image}
                      alt={item.title}
                      fill
                      className="object-cover opacity-50 group-hover:opacity-70 transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block text-[11px] tracking-[0.2em] uppercase text-ember font-[family-name:var(--font-mono)] mb-2">
                        {item.client}
                      </span>
                      <h3 className="text-lg font-semibold text-white leading-tight font-[family-name:var(--font-display)] tracking-tight">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-400">{item.metric}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ WHY ZINC ═══════════════════════════════════ */}
      <section className="bg-zinc-100 py-24 sm:py-32 relative overflow-hidden">
        {/* Subtle diagonal line decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-[600px] h-[600px] border border-zinc-200 rounded-full opacity-40" />
          <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] border border-zinc-200 rounded-full opacity-30" />
        </div>

        <div className="relative mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-8 h-px bg-ember" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-500 font-[family-name:var(--font-mono)]">
                {t('whyZinc.eyebrow')}
              </span>
              <div className="w-8 h-px bg-ember" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 tracking-[-0.02em] font-[family-name:var(--font-display)]">
              {t('whyZinc.heading')}
            </h2>
            <p className="mt-6 text-lg text-zinc-500 leading-relaxed">
              {t('whyZinc.description')}
            </p>
          </div>

          {/* Spec cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-300">
            {whyZincSpecs.map((spec) => (
              <div key={spec.label} className="bg-white p-8 sm:p-10 text-center">
                <div className="font-[family-name:var(--font-mono)] text-zinc-900">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                    {spec.value}
                  </span>
                  {spec.unit && (
                    <span className="text-lg sm:text-xl text-zinc-400 ml-1">{spec.unit}</span>
                  )}
                </div>
                <div className="mt-3 text-[11px] tracking-[0.2em] uppercase text-zinc-400 font-[family-name:var(--font-mono)]">
                  {spec.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/why-zinc"
              className="group inline-flex items-center gap-3 border border-zinc-400 hover:border-zinc-900 px-8 py-4 text-sm font-semibold tracking-wide uppercase text-zinc-700 hover:text-zinc-950 transition-all"
            >
              {t('whyZinc.cta')}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ CLIENTS ═══════════════════════════════════ */}
      <section className="bg-white py-16 border-y border-zinc-200">
        <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <span className="text-[11px] tracking-[0.3em] uppercase text-zinc-400 font-[family-name:var(--font-mono)] flex-shrink-0">
              {t('clients.trustedBy')}
            </span>
            <div className="w-px h-8 bg-zinc-200 hidden sm:block" />
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-14 gap-y-6">
              {clientNames.map((client, i) => (
                <Image
                  key={client.name}
                  src={clientLogos[i].logo}
                  alt={client.name}
                  width={clientLogos[i].width}
                  height={clientLogos[i].height}
                  className="h-8 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════ CTA ═══════════════════════════════════ */}
      <section className="bg-zinc-950 grain relative overflow-hidden">
        {/* Background detail */}
        <div className="absolute inset-0">
          <Image
            src="/images/services/brake-bracket-component.jpg"
            alt=""
            fill
            className="object-cover opacity-10"
            sizes="100vw"
          />
        </div>

        <div className="relative mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20 py-28 sm:py-36">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-[-0.02em] leading-[1.05] font-[family-name:var(--font-display)]">
              {t('cta.heading')}
            </h2>
            <p className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-lg">
              {t('cta.description')}
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-3 bg-ember hover:bg-ember-light px-8 py-4 text-sm font-semibold tracking-wide uppercase text-zinc-950 transition-all"
              >
                {t('cta.getInTouch')}
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a
                href="tel:+4548764040"
                className="inline-flex items-center justify-center gap-3 border border-zinc-600 hover:border-zinc-400 px-8 py-4 text-sm font-semibold tracking-wide text-zinc-300 hover:text-white transition-all font-[family-name:var(--font-mono)]"
              >
                {t('cta.phone')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
