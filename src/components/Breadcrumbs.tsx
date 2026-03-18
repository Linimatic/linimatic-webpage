import { JsonLd } from "@/components/JsonLd";
import { Link } from "@/i18n/routing";

type Crumb = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allCrumbs: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allCrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `https://linimatic.dk${crumb.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16 xl:px-20 pt-28 pb-4"
      >
        <ol className="flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase font-[family-name:var(--font-mono)]">
          {allCrumbs.map((crumb, i) => (
            <li key={crumb.href} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-zinc-300" aria-hidden="true">
                  /
                </span>
              )}
              {i < allCrumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  className="text-zinc-400 hover:text-zinc-700 transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-zinc-600">{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
