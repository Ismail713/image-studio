"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const footerLinks = {
    [t("product")]: [
      { href: `/${locale}/generator`, label: t("generator") },
      { href: `/${locale}/gallery`, label: t("gallery") },
      { href: `/${locale}/pricing`, label: t("pricing") },
    ],
    [t("company")]: [
      { href: `/${locale}/about`, label: t("about") },
      { href: `/${locale}/how-it-works`, label: t("howItWorks") },
      { href: `/${locale}/contact`, label: t("contact") },
    ],
    [t("legal")]: [
      { href: `/${locale}/privacy`, label: t("privacy") },
      { href: `/${locale}/terms`, label: t("terms") },
      { href: `/${locale}/faq`, label: t("faq") },
    ],
  };

  return (
    <footer className="bg-canvas-soft border-t border-hairline mt-auto">
      <div className="max-w-300 mx-auto px-4 py-8 sm:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-10">
          <div>
            <p className="font-bold text-lg mb-2 text-ink">
              image<span className="text-primary">studio</span>
            </p>
            <p className="text-sm text-ink-muted max-w-45">{t("tagline")}</p>
          </div>
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-3">
                {section}
              </p>
              <ul className="flex flex-col gap-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-ink-secondary hover:text-primary transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-hairline pt-6 text-center text-xs text-ink-faint">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
