"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const PricingSwitch = ({ onSwitch, monthlyLabel, yearlyLabel }: { onSwitch: (value: string) => void; monthlyLabel: string; yearlyLabel: string }) => {
  const [selected, setSelected] = useState("0");
  const handleSwitch = (value: string) => { setSelected(value); onSwitch(value); };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-gray-700 p-1">
        <button onClick={() => handleSwitch("0")} className={cn("relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors", selected === "0" ? "text-white" : "text-gray-200")}>
          {selected === "0" && <motion.span layoutId="switch" className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600" transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
          <span className="relative">{monthlyLabel}</span>
        </button>
        <button onClick={() => handleSwitch("1")} className={cn("relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors", selected === "1" ? "text-white" : "text-gray-200")}>
          {selected === "1" && <motion.span layoutId="switch" className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600" transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
          <span className="relative flex items-center gap-2">{yearlyLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default function PricingSection6() {
  const [isYearly, setIsYearly] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("pricing");
  const locale = useLocale();
  const router = useRouter();

  const plans = [
    {
      name: t("freeName"), description: t("freeDesc"), price: 0, yearlyPrice: 0, free: true,
      buttonText: t("freeButton"), buttonVariant: "outline" as const, href: "/generator", planId: "free" as const,
      includes: [t("freeIncludes"), t("freeFeature1"), t("freeFeature2"), t("freeFeature3"), t("freeFeature4"), t("freeFeature5")],
    },
    {
      name: t("proName"), description: t("proDesc"), price: 9, yearlyPrice: 79,
      buttonText: t("proButton"), buttonVariant: "default" as const, popular: true, href: "/sign-up", planId: "pro" as const,
      includes: [t("proIncludes"), t("proFeature1"), t("proFeature2"), t("proFeature3"), t("proFeature4"), t("proFeature5")],
    },
    {
      name: t("teamName"), description: t("teamDesc"), price: 29, yearlyPrice: 249,
      buttonText: t("teamButton"), buttonVariant: "outline" as const, href: "/contact", planId: "team" as const,
      includes: [t("teamIncludes"), t("teamFeature1"), t("teamFeature2"), t("teamFeature3"), t("teamFeature4"), t("teamFeature5")],
    },
  ];

  async function handleCheckout(planId: "pro" | "team") {
    setCheckoutLoading(planId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, yearly: isYearly, locale }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutLoading(null);
      }
    } catch {
      setCheckoutLoading(null);
    }
  }

  const revealVariants = {
    visible: (i: number) => ({ y: 0, opacity: 1, filter: "blur(0px)", transition: { delay: i * 0.4, duration: 0.5 } }),
    hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
  };

  const togglePricingPeriod = (value: string) => setIsYearly(Number.parseInt(value) === 1);

  return (
    <div className="min-h-screen mx-auto relative bg-black overflow-x-hidden" ref={pricingRef}>
      <TimelineContent animationNum={4} timelineRef={pricingRef} customVariants={revealVariants} className="absolute top-0 h-96 w-screen overflow-hidden pointer-events-none [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]"></div>
        <SparklesComp density={400} direction="bottom" speed={1} color="#FFFFFF" className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]" />
      </TimelineContent>
      <TimelineContent animationNum={5} timelineRef={pricingRef} customVariants={revealVariants} className="absolute left-0 top-[-114px] w-full h-[113.625vh] flex flex-col items-start justify-start content-start flex-none flex-nowrap gap-2.5 overflow-hidden p-0 z-0 pointer-events-none">
        <div className="framer-1i5axl2">
          <div className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full" style={{ border: "200px solid #3131f5", filter: "blur(92px)", WebkitFilter: "blur(92px)" }}></div>
          <div className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full" style={{ border: "200px solid #3131f5", filter: "blur(92px)", WebkitFilter: "blur(92px)" }}></div>
        </div>
      </TimelineContent>

      <article className="text-center mb-6 pt-20 sm:pt-32 max-w-3xl mx-auto space-y-2 relative z-50 px-4">
        <h2 className="text-2xl sm:text-4xl font-medium text-white">
          <VerticalCutReveal splitBy="words" staggerDuration={0.15} staggerFrom="first" reverse={true} containerClassName="justify-center" transition={{ type: "spring", stiffness: 250, damping: 40, delay: 0 }}>
            {t("title")}
          </VerticalCutReveal>
        </h2>
        <TimelineContent as="p" animationNum={0} timelineRef={pricingRef} customVariants={revealVariants} className="text-gray-300">
          {t("description")}
        </TimelineContent>
        <TimelineContent as="div" animationNum={1} timelineRef={pricingRef} customVariants={revealVariants}>
          <PricingSwitch onSwitch={togglePricingPeriod} monthlyLabel={t("monthly")} yearlyLabel={t("yearly")} />
        </TimelineContent>
      </article>

      <div className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, #206ce8 0%, transparent 70%)", opacity: 0.6, mixBlendMode: "multiply" }} />

      <div className="grid md:grid-cols-3 max-w-5xl gap-4 py-6 mx-auto px-4">
        {plans.map((plan, index) => (
          <TimelineContent key={plan.name} as="div" animationNum={2 + index} timelineRef={pricingRef} customVariants={revealVariants}>
            <Card className={`relative text-white border-neutral-800 ${plan.popular ? "bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 shadow-[0px_-13px_300px_0px_#0900ff] z-20" : "bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 z-10"}`}>
              <CardHeader className="text-left">
                <div className="flex justify-between items-start">
                  <h3 className="text-3xl mb-2">{plan.name}</h3>
                  {plan.popular && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full px-2.5 py-1">
                      {t("mostPopular")}
                    </span>
                  )}
                </div>
                <div className="flex items-baseline">
                  {plan.free ? (
                    <span className="text-4xl font-semibold">{t("free")}</span>
                  ) : (
                    <>
                      <span className="text-4xl font-semibold">
                        $<NumberFlow format={{ currency: "USD" }} value={isYearly ? plan.yearlyPrice : plan.price} className="text-4xl font-semibold" />
                      </span>
                      <span className="text-gray-300 ml-1">/{isYearly ? t("year") : t("month")}</span>
                    </>
                  )}
                </div>
                {plan.free && <span className="text-sm text-gray-400">{t("firstGenerations")}</span>}
                <p className="text-sm text-gray-300 mb-4">{plan.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                {plan.free ? (
                  <button
                    onClick={() => router.push(`/${locale}/generator`)}
                    className="w-full mb-6 p-4 text-xl rounded-xl bg-gradient-to-t from-neutral-950 to-neutral-600 shadow-lg shadow-neutral-900 border border-neutral-800 text-white"
                  >
                    {plan.buttonText}
                  </button>
                ) : (
                  <button
                    onClick={() => handleCheckout(plan.planId as "pro" | "team")}
                    disabled={checkoutLoading === plan.planId}
                    className={cn(
                      "w-full mb-6 p-4 text-xl rounded-xl transition-opacity disabled:opacity-70",
                      plan.popular
                        ? "bg-gradient-to-t from-blue-500 to-blue-600 shadow-lg shadow-blue-800 border border-blue-500 text-white"
                        : "bg-gradient-to-t from-neutral-950 to-neutral-600 shadow-lg shadow-neutral-900 border border-neutral-800 text-white"
                    )}
                  >
                    {checkoutLoading === plan.planId ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {t("checkoutLoading")}
                      </span>
                    ) : (
                      plan.buttonText
                    )}
                  </button>
                )}
                <div className="space-y-3 pt-4 border-t border-neutral-700">
                  <h4 className="font-medium text-base mb-3">{plan.includes[0]}</h4>
                  <ul className="space-y-2">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 bg-neutral-500 rounded-full grid place-content-center"></span>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>
    </div>
  );
}
