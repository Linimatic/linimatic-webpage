import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

type ContactTabsProps = {
  active: "people" | "form";
};

export async function ContactTabs({ active }: ContactTabsProps) {
  const t = await getTranslations("contactTabs");

  const tabs: { key: "people" | "form"; href: string }[] = [
    { key: "people", href: "/contact/people" },
    { key: "form", href: "/contact" },
  ];

  return (
    <div className="flex items-center gap-1 border-b border-zinc-200 mb-12">
      {tabs.map((tab) => (
        <Link
          key={tab.key}
          href={tab.href}
          className={`px-5 py-3 text-sm font-medium tracking-wide transition-colors border-b-2 -mb-px ${
            active === tab.key
              ? "border-ember text-zinc-900"
              : "border-transparent text-zinc-500 hover:text-zinc-800"
          }`}
        >
          {t(tab.key)}
        </Link>
      ))}
    </div>
  );
}
