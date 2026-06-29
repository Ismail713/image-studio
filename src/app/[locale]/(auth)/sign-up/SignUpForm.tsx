"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth/actions";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export default function SignUpForm() {
  const t = useTranslations("signUp");
  const tAuth = useTranslations("auth");
  const locale = useLocale();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
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
    const result = await signUp(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    setSuccess(true);
    setIsLoading(false);
  }

  if (success) {
    return (
      <div className="bg-card w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md">
        <div className="p-8 text-center">
          <h1 className="mb-2 text-xl font-semibold text-ink">{tAuth("checkEmail")}</h1>
          <p className="text-sm text-ink-muted">{tAuth("confirmationSent")}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md">
      <div className="p-8 pb-6">
        <div>
          <h1 className="mb-1 text-xl font-semibold text-ink">{t("heading")}</h1>
          <p className="text-sm text-ink-muted">{t("description")}</p>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button type="button" variant="outline" className="flex items-center justify-center gap-2" onClick={() => handleOAuthSignIn("google")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>
            <span>{t("google")}</span>
          </Button>
          <Button type="button" variant="outline" className="flex items-center justify-center gap-2" onClick={() => handleOAuthSignIn("azure")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256"><path fill="#f1511b" d="M121.666 121.666H0V0h121.666z"></path><path fill="#80cc28" d="M256 121.666H134.335V0H256z"></path><path fill="#00adef" d="M121.663 256.002H0V134.336h121.663z"></path><path fill="#fbbc09" d="M256 256.002H134.335V134.336H256z"></path></svg>
            <span>{t("microsoft")}</span>
          </Button>
        </div>
        <hr className="my-4 border-dashed" />
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="firstname" className="block text-sm">{t("firstname")}</Label>
              <Input type="text" required name="firstname" id="firstname" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname" className="block text-sm">{t("lastname")}</Label>
              <Input type="text" required name="lastname" id="lastname" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="block text-sm">{t("username")}</Label>
            <Input type="email" required name="email" id="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pwd" className="text-sm">{t("password")}</Label>
            <Input type="password" required name="pwd" id="pwd" />
          </div>
          <Button className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {t("continue")}
          </Button>
        </div>
      </div>
      <div className="bg-muted rounded-(--radius) border p-3">
        <p className="text-accent-foreground text-center text-sm">
          {t("haveAccount")}
          <Button asChild variant="link" className="px-2">
            <Link href={`/${locale}/sign-in`}>{t("signIn")}</Link>
          </Button>
        </p>
      </div>
    </form>
  );
}
