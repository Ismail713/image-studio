import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function HistoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HistoryContent />;
}

function HistoryContent() {
  const t = useTranslations("history");
  return (
    <div className="max-w-200 mx-auto px-4 py-10 sm:py-16 w-full">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight text-ink">{t("title")}</h1>
        <p className="text-ink-muted text-[15px]">{t("description")}</p>
      </div>
      <div className="flex flex-col items-center justify-center py-16 sm:py-24 border-2 border-dashed border-hairline rounded-xl text-center gap-4 px-4">
        <span className="text-4xl">🕐</span>
        <p className="font-medium text-lg text-ink">{t("empty")}</p>
        <p className="text-sm text-ink-muted max-w-xs">{t("emptyDesc")}</p>
        <a href="/generator" className="bg-primary hover:bg-primary-active text-on-primary px-6 py-2.5 rounded-full text-sm font-medium transition-colors">{t("generatePrompt")}</a>
      </div>
    </div>
  );
}
