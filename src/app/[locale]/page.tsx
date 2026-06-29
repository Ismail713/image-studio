import Link from "next/link";
import Footer from "@/components/Footer";
import { HeroLanding } from "@/components/ui/hero-1";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePageContent locale={locale} />;
}

function HomePageContent({ locale }: { locale: string }) {
  const t = useTranslations("home");
  const tNav = useTranslations("nav");

  const features = [
    { title: t("featureImage"), desc: t("featureImageDesc") },
    { title: t("featureAnalysis"), desc: t("featureAnalysisDesc") },
    { title: t("featureStyle"), desc: t("featureStyleDesc") },
  ];

  return (
    <>
      <main className="flex-1 flex flex-col">
        <HeroLanding
          logo={{
            src: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=40&h=40&auto=format&fit=crop",
            alt: "imagestudio logo",
            companyName: "imagestudio",
          }}
          navigation={[
            { name: tNav("generator"), href: `/${locale}/generator` },
            { name: tNav("gallery"), href: `/${locale}/gallery` },
            { name: tNav("howItWorks"), href: `/${locale}/how-it-works` },
            { name: tNav("pricing"), href: `/${locale}/pricing` },
          ]}
          loginText={tNav("logIn")}
          loginHref={`/${locale}/sign-in`}
          title={`${t("headline")} ${t("headlineAccent")}`}
          description={t("description")}
          announcementBanner={{
            text: t("eyebrow"),
            linkText: t("cta"),
            linkHref: `/${locale}/generator`,
          }}
          callToActions={[
            { text: tNav("getStarted"), href: `/${locale}/sign-up`, variant: "primary" },
            { text: t("ctaSecondary"), href: `/${locale}/how-it-works`, variant: "secondary" },
          ]}
          titleSize="large"
          gradientColors={{
            from: "oklch(0.588 0.199 265.866)",
            to: "oklch(0.488 0.243 264.376)",
          }}
        />

        <section className="bg-canvas-soft py-12 sm:py-20 px-4">
          <div className="max-w-270 mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 tracking-[-0.5px] text-ink">
              {t("featuresTitle")}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {features.map(({ title, desc }) => (
                <div
                  key={title}
                  className="bg-surface border border-hairline rounded-xl p-5 sm:p-6"
                >
                  <h3 className="font-bold text-lg mb-2 text-ink">{title}</h3>
                  <p className="text-ink-muted text-[15px] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-20 px-4">
          <div className="max-w-200 mx-auto text-center bg-secondary rounded-2xl py-10 sm:py-16 px-5 sm:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-on-primary mb-3 sm:mb-4 tracking-[-0.5px]">
              {t("ctaBannerTitle")}
            </h2>
            <p className="text-blue-200 mb-6 sm:mb-8 text-sm sm:text-base">{t("ctaBannerDesc")}</p>
            <Link
              href={`/${locale}/sign-up`}
              className="bg-on-primary text-secondary hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-colors inline-block"
            >
              {t("ctaBannerButton")}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
