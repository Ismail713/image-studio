import Link from "next/link";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getUserSubscription } from "@/lib/stripe/queries";
import ManageSubscriptionButton from "./manage-subscription-button";

export default async function DashboardPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const subscription = await getUserSubscription();
  return <DashboardContent plan={subscription.plan} cancelAtPeriodEnd={subscription.cancelAtPeriodEnd} />;
}

function DashboardContent({ plan, cancelAtPeriodEnd }: { plan: "free" | "pro" | "team"; cancelAtPeriodEnd: boolean }) {
  const t = useTranslations("dashboard");

  const planLabels: Record<string, string> = {
    free: t("free"),
    pro: t("pro"),
    team: t("team"),
  };

  const stats = [
    { label: t("totalGenerations"), value: "—" },
    { label: t("savedPrompts"), value: "—" },
    { label: t("currentPlan"), value: planLabels[plan] || t("free") },
  ];
  const quickLinks = [
    { href: "/generator", label: t("newGeneration"), desc: t("newGenerationDesc") },
    { href: "/history", label: t("viewHistory"), desc: t("viewHistoryDesc") },
    { href: "/gallery", label: t("gallery"), desc: t("galleryDesc") },
    { href: "/pricing", label: t("upgradePlan"), desc: t("upgradePlanDesc") },
  ];

  return (
    <div className="max-w-270 mx-auto px-4 py-10 sm:py-16 w-full">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight text-ink">{t("title")}</h1>
        <p className="text-ink-muted text-[15px]">{t("welcome")}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-surface border border-hairline rounded-xl p-4 sm:p-6">
            <p className="text-sm text-ink-muted mb-1">{label}</p>
            <p className="text-2xl font-bold text-ink">{value}</p>
          </div>
        ))}
      </div>
      {plan !== "free" && (
        <div className="mb-8 sm:mb-10 flex items-center gap-3">
          <ManageSubscriptionButton />
          {cancelAtPeriodEnd && (
            <span className="text-sm text-ink-muted">{t("cancelPending")}</span>
          )}
        </div>
      )}
      <h2 className="text-lg font-bold mb-4 text-ink">{t("quickActions")}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {quickLinks.map(({ href, label, desc }) => (
          <Link key={href} href={href} className="group bg-surface border border-hairline hover:border-primary rounded-xl p-6 transition-colors">
            <p className="font-medium group-hover:text-primary transition-colors mb-1 text-ink">{label} →</p>
            <p className="text-sm text-ink-muted">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
