import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("about");
  return (
    <div className="max-w-200 mx-auto px-4 py-12 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-[-1px] text-ink">{t("title")}</h1>
      <p className="text-ink-muted text-base sm:text-lg mb-8 sm:mb-10">{t("intro")}</p>
      <section className="mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 tracking-tight text-ink">{t("whatWeDoTitle")}</h2>
        <p className="text-ink-secondary leading-relaxed">{t("whatWeDo")}</p>
      </section>
      <section className="mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 tracking-tight text-ink">{t("techStackTitle")}</h2>
        <ul className="list-disc list-inside text-ink-secondary space-y-2">
          <li>{t("tech1")}</li>
          <li>{t("tech2")}</li>
          <li>{t("tech3")}</li>
          <li>{t("tech4")}</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-3 tracking-tight text-ink">{t("contactTitle")}</h2>
        <p className="text-ink-secondary">
          {t("contactText")}{" "}
          <a href="/contact" className="text-primary hover:underline">→</a>
        </p>
      </section>
    </div>
  );
}
