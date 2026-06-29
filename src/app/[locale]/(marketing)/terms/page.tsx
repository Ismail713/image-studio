import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TermsContent />;
}

function TermsContent() {
  const t = useTranslations("terms");
  const sections = [1, 2, 3, 4, 5] as const;
  return (
    <div className="max-w-200 mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-4 tracking-[-1px] text-ink">{t("title")}</h1>
      <p className="text-ink-muted mb-10">{t("lastUpdated")}</p>
      <div className="flex flex-col gap-8 text-ink-secondary leading-relaxed text-[15px]">
        {sections.map((n) => (
          <section key={n}>
            <h2 className="text-xl font-bold mb-3 text-ink">{t(`section${n}Title`)}</h2>
            <p>{t(`section${n}`)}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
