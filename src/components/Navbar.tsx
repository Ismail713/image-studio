"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "./AuthProvider";
import UserMenu from "./UserMenu";
import { signOut } from "@/lib/auth/actions";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("nav");
  const tAuth = useTranslations("auth");
  const locale = useLocale();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { href: `/${locale}/generator`, label: t("generator") },
    { href: `/${locale}/gallery`, label: t("gallery") },
    { href: `/${locale}/how-it-works`, label: t("howItWorks") },
    { href: `/${locale}/pricing`, label: t("pricing") },
  ];

  return (
    <header className="border-b border-hairline bg-canvas/95 backdrop-blur-md sticky top-0 z-100">
      <nav className="max-w-300 mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-bold text-lg tracking-tight text-ink">
          image<span className="text-primary">studio</span>
        </Link>

        <ul className="hidden md:flex items-center gap-6 text-[15px] text-ink-muted">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`hover:text-ink transition-colors ${
                  pathname === href ? "text-ink font-medium" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          {!isLoading && (
            user ? (
              <UserMenu />
            ) : (
              <>
                <Link
                  href={`/${locale}/sign-in`}
                  className="text-[15px] text-ink-muted hover:text-ink transition-colors px-2"
                >
                  {t("logIn")}
                </Link>
                <Link
                  href={`/${locale}/sign-up`}
                  className="text-sm bg-primary hover:bg-primary-active text-on-primary px-5 py-1.5 rounded-full font-medium transition-colors"
                >
                  {t("getStarted")}
                </Link>
              </>
            )
          )}
        </div>

        <div className="flex md:hidden items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="relative p-2 w-10 h-10 rounded-md hover:bg-canvas-soft transition-colors flex items-center justify-center"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={t("toggleMenu")}
            aria-expanded={menuOpen}
          >
            <span className={`absolute block w-5 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute block w-5 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? "opacity-0 scale-0" : "opacity-100"}`} />
            <span className={`absolute block w-5 h-0.5 bg-ink transition-all duration-300 ${menuOpen ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-[calc(100dvh-3.5rem)] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="border-t border-hairline px-5 py-5 flex flex-col gap-5 text-[15px] bg-canvas">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`hover:text-ink transition-colors py-1 ${
                pathname === href ? "font-medium text-ink" : "text-ink-muted"
              }`}
            >
              {label}
            </Link>
          ))}
          <hr className="border-hairline" />
          {!isLoading && (
            user ? (
              <>
                <span className="text-ink-muted text-sm truncate">{user.email}</span>
                <button
                  onClick={() => { setMenuOpen(false); signOut(locale); }}
                  className="text-ink-muted hover:text-ink transition-colors text-left py-1"
                >
                  {tAuth("signOut")}
                </button>
              </>
            ) : (
              <>
                <Link href={`/${locale}/sign-in`} onClick={() => setMenuOpen(false)} className="text-ink-muted py-1">
                  {t("logIn")}
                </Link>
                <Link
                  href={`/${locale}/sign-up`}
                  onClick={() => setMenuOpen(false)}
                  className="bg-primary hover:bg-primary-active text-on-primary px-5 py-2.5 rounded-full text-center font-medium transition-colors"
                >
                  {t("getStarted")}
                </Link>
              </>
            )
          )}
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 top-14 bg-black/20 backdrop-blur-sm z-[-1] md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
