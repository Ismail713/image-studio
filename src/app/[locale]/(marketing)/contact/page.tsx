import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("contact");
  return (
    <div className="max-w-150 mx-auto px-4 py-12 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-[-1px] text-ink">{t("title")}</h1>
      <p className="text-ink-muted mb-8 sm:mb-10">{t("description")}</p>
      <form action="mailto:ismailsghir29@gmail.com" method="POST" encType="text/plain" className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-ink">{t("name")}</label>
          <input id="name" name="name" type="text" required className="border border-hairline rounded-lg px-4 py-2.5 text-[15px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary" placeholder={t("namePlaceholder")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-ink">{t("email")}</label>
          <input id="email" name="email" type="email" required className="border border-hairline rounded-lg px-4 py-2.5 text-[15px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary" placeholder={t("emailPlaceholder")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-medium text-ink">{t("message")}</label>
          <textarea id="message" name="message" rows={5} required className="border border-hairline rounded-lg px-4 py-2.5 text-[15px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary resize-y" placeholder={t("messagePlaceholder")} />
        </div>
        <button type="submit" className="bg-primary hover:bg-primary-active text-on-primary py-3 rounded-full font-medium text-sm transition-colors w-full sm:w-auto sm:self-start px-10">{t("send")}</button>
      </form>
    </div>
  );
}
