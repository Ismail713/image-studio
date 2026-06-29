"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { LogOut, User } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { signOut } from "@/lib/auth/actions";

export default function UserMenu() {
  const { user } = useAuth();
  const locale = useLocale();
  const t = useTranslations("auth");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!user) return null;

  const displayName = user.user_metadata?.first_name || user.email?.split("@")[0] || "";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2 py-1.5 rounded-md hover:bg-canvas-soft transition-colors text-ink-muted hover:text-ink"
        aria-label={t("account")}
      >
        <User className="h-4 w-4" />
        <span className="text-xs font-medium">{displayName}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-surface border border-hairline rounded-lg shadow-lg py-1 min-w-[180px] z-50">
          <div className="px-3 py-2 border-b border-hairline">
            <p className="text-sm font-medium text-ink truncate">{user.email}</p>
          </div>
          <button
            onClick={() => {
              setOpen(false);
              signOut(locale);
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-ink-muted hover:text-ink hover:bg-canvas-soft transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>{t("signOut")}</span>
          </button>
        </div>
      )}
    </div>
  );
}
