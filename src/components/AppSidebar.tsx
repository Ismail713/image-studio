"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useAuth } from "./AuthProvider";
import { signOut } from "@/lib/auth/actions";
import { LayoutDashboard, Sparkles, ImageIcon, History, LogOut } from "lucide-react";

export default function AppSidebar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("sidebar");
  const tAuth = useTranslations("auth");
  const { user } = useAuth();

  const links = [
    { href: `/${locale}/dashboard`, label: t("dashboard"), icon: LayoutDashboard },
    { href: `/${locale}/generator`, label: t("generator"), icon: Sparkles },
    { href: `/${locale}/gallery`, label: t("gallery"), icon: ImageIcon },
    { href: `/${locale}/history`, label: t("history"), icon: History },
  ];

  const initials = user?.user_metadata?.first_name
    ? (user.user_metadata.first_name as string).charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() ?? "?";

  const displayName = user?.user_metadata?.first_name || user?.email?.split("@")[0] || "";

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-hairline bg-canvas h-[calc(100dvh-3.5rem)] sticky top-14">
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-ink-muted hover:text-ink hover:bg-canvas-soft"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {user && (
        <div className="border-t border-hairline px-3 py-3">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-xs font-bold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink truncate">{displayName}</p>
              <p className="text-xs text-ink-muted truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut(locale)}
            className="mt-2 flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-ink-muted hover:text-ink hover:bg-canvas-soft transition-colors w-full"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {tAuth("signOut")}
          </button>
        </div>
      )}
    </aside>
  );
}
