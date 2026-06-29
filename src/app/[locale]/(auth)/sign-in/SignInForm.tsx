"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { signIn } from "@/lib/auth/actions";
import { Loader2 } from "lucide-react";

export default function SignInForm() {
  const t = useTranslations("signIn");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await signIn(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    const redirectTo = searchParams.get("redirectTo") || `/${locale}/dashboard`;
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <div className="w-full max-w-sm bg-surface border border-hairline rounded-xl p-8">
      <h1 className="text-2xl font-bold mb-1 text-ink">{t("heading")}</h1>
      <p className="text-sm text-ink-muted mb-6">{t("description")}</p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-ink">{t("email")}</label>
          <input id="email" name="email" type="email" autoComplete="email" required placeholder={t("emailPlaceholder")} className="border border-hairline rounded-lg px-4 py-2.5 text-[15px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-sm font-medium text-ink">{t("password")}</label>
            <a href="#" className="text-xs text-primary hover:underline">{t("forgotPassword")}</a>
          </div>
          <input id="password" name="password" type="password" autoComplete="current-password" required placeholder={t("passwordPlaceholder")} className="border border-hairline rounded-lg px-4 py-2.5 text-[15px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:bg-primary-active text-on-primary py-3 rounded-full font-medium text-sm transition-colors mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("signIn")}
        </button>
      </form>
      <p className="text-center text-sm text-ink-muted mt-6">
        {t("noAccount")}{" "}
        <Link href={`/${locale}/sign-up`} className="text-primary hover:underline font-medium">{t("signUp")}</Link>
      </p>
    </div>
  );
}
