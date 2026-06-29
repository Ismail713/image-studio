import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArcGalleryHero } from "@/components/ui/arc-gallery-hero-component";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";

const heroImages = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546238232-20216dec9f72?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=400&auto=format&fit=crop",
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomePageContent locale={locale} />;
}

function HomePageContent({ locale }: { locale: string }) {
  const t = useTranslations("home");

  const features = [
    { title: t("featureImage"), desc: t("featureImageDesc") },
    { title: t("featureAnalysis"), desc: t("featureAnalysisDesc") },
    { title: t("featureStyle"), desc: t("featureStyleDesc") },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <ArcGalleryHero images={heroImages}>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 sm:mb-4 block">
            {t("eyebrow")}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-1px] sm:tracking-[-2px] mb-4 sm:mb-6 leading-tight text-ink">
            {t("headline")}{" "}
            <span className="text-primary">{t("headlineAccent")}</span>
          </h1>
          <p className="text-base sm:text-lg text-ink-muted max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <Link
              href={`/${locale}/generator`}
              className="bg-primary hover:bg-primary-active text-on-primary px-8 py-3 rounded-full font-medium transition-colors text-center"
            >
              {t("cta")}
            </Link>
            <Link
              href={`/${locale}/how-it-works`}
              className="border border-hairline hover:border-ink-faint bg-surface px-8 py-3 rounded-full font-medium transition-colors text-ink text-center"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </ArcGalleryHero>

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
