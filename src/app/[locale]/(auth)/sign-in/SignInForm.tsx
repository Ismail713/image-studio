"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { signIn } from "@/lib/auth/actions";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export default function SignInForm() {
  const t = useTranslations("signIn");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleOAuthSignIn(provider: "google" | "azure") {
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/${locale}/dashboard`,
      },
    });
    if (error) setError(error.message);
  }

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

      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          type="button"
          onClick={() => handleOAuthSignIn("google")}
          className="flex items-center justify-center gap-2 border border-hairline rounded-lg px-4 py-2.5 text-sm font-medium text-ink bg-surface hover:bg-canvas-soft transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
          <span>{t("google")}</span>
        </button>
        <button
          type="button"
          onClick={() => handleOAuthSignIn("azure")}
          className="flex items-center justify-center gap-2 border border-hairline rounded-lg px-4 py-2.5 text-sm font-medium text-ink bg-surface hover:bg-canvas-soft transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="#f1511b" d="M121.666 121.666H0V0h121.666z"></path><path fill="#80cc28" d="M256 121.666H134.335V0H256z"></path><path fill="#00adef" d="M121.663 256.002H0V134.336h121.663z"></path><path fill="#fbbc09" d="M256 256.002H134.335V134.336H256z"></path></svg>
          <span>{t("microsoft")}</span>
        </button>
      </div>

      <div className="relative mb-4">
        <div className="absolute inset-0 flex items-center">
          <hr className="w-full border-hairline border-dashed" />
        </div>
      </div>

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
