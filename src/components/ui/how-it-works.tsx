"use client";

import { cn } from "@/lib/utils";
import { Upload, Cpu, ClipboardCopy } from "lucide-react";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { useTranslations } from "next-intl";
import type React from "react";

interface HowItWorksProps extends React.HTMLAttributes<HTMLElement> {}

interface StepCardProps {
  icon: React.ReactNode;
  stepNumber: number;
  stepLabel: string;
  title: string;
  description: string;
  benefits: string[];
}

const StepCard: React.FC<StepCardProps> = ({ icon, stepNumber, stepLabel, title, description, benefits }) => (
  <Card className="relative text-white border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:border-blue-500/30">
    <CardContent className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15 text-blue-400 border border-blue-500/20">{icon}</div>
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400/70">{stepLabel}</span>
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
      <p className="mb-5 text-sm text-gray-400 leading-relaxed">{description}</p>
      <ul className="space-y-2.5">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0"></span>
            <span className="text-sm text-gray-300">{benefit}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export const HowItWorks: React.FC<HowItWorksProps> = ({ className, ...props }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("howItWorks");

  const revealVariants = {
    visible: (i: number) => ({ y: 0, opacity: 1, filter: "blur(0px)", transition: { delay: i * 0.4, duration: 0.5 } }),
    hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
  };

  const stepsData = [
    {
      icon: <Upload className="h-5 w-5" />,
      title: t("step1Title"),
      description: t("step1Desc"),
      benefits: [t("step1Benefit1"), t("step1Benefit2"), t("step1Benefit3")],
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: t("step2Title"),
      description: t("step2Desc"),
      benefits: [t("step2Benefit1"), t("step2Benefit2"), t("step2Benefit3")],
    },
    {
      icon: <ClipboardCopy className="h-5 w-5" />,
      title: t("step3Title"),
      description: t("step3Desc"),
      benefits: [t("step3Benefit1"), t("step3Benefit2"), t("step3Benefit3")],
    },
  ];

  return (
    <section id="how-it-works" className={cn("w-full min-h-screen relative bg-black overflow-x-hidden", className)} ref={sectionRef} {...props}>
      <TimelineContent animationNum={4} timelineRef={sectionRef} customVariants={revealVariants} className="absolute top-0 h-96 w-screen overflow-hidden pointer-events-none [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]"></div>
        <SparklesComp density={400} direction="bottom" speed={1} color="#FFFFFF" className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]" />
      </TimelineContent>
      <TimelineContent animationNum={5} timelineRef={sectionRef} customVariants={revealVariants} className="absolute left-0 top-[-114px] w-full h-[113.625vh] flex flex-col items-start justify-start content-start flex-none flex-nowrap gap-2.5 overflow-hidden p-0 z-0 pointer-events-none">
        <div><div className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full" style={{ border: "200px solid #3131f5", filter: "blur(92px)", WebkitFilter: "blur(92px)" }}></div></div>
      </TimelineContent>
      <div className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, #206ce8 0%, transparent 70%)", opacity: 0.6, mixBlendMode: "multiply" }} />

      <article className="text-center mb-6 pt-20 sm:pt-32 max-w-3xl mx-auto space-y-2 relative z-50 px-4">
        <h2 className="text-2xl sm:text-4xl font-medium text-white">
          <VerticalCutReveal splitBy="words" staggerDuration={0.15} staggerFrom="first" reverse={true} containerClassName="justify-center" transition={{ type: "spring", stiffness: 250, damping: 40, delay: 0 }}>
            {t("title")}
          </VerticalCutReveal>
        </h2>
        <TimelineContent as="p" animationNum={0} timelineRef={sectionRef} customVariants={revealVariants} className="text-gray-300">
          {t("description")}
        </TimelineContent>
      </article>

      <TimelineContent as="div" animationNum={1} timelineRef={sectionRef} customVariants={revealVariants} className="relative mx-auto mb-8 w-full max-w-4xl z-50 px-4 hidden sm:block">
        <div aria-hidden="true" className="absolute left-[calc(16.6667%+1rem)] top-1/2 h-0.5 w-[calc(66.6667%-2rem)] -translate-y-1/2 bg-neutral-700"></div>
        <div className="relative grid grid-cols-3">
          {stepsData.map((_, index) => (
            <div key={index} className="flex h-9 w-9 items-center justify-center justify-self-center rounded-full bg-neutral-800 font-semibold text-white ring-4 ring-black border border-neutral-700 text-sm">
              {index + 1}
            </div>
          ))}
        </div>
      </TimelineContent>

      <div className="grid md:grid-cols-3 max-w-4xl gap-4 py-6 mx-auto px-4 relative z-10 pb-12 sm:pb-6">
        {stepsData.map((step, index) => (
          <TimelineContent key={index} as="div" animationNum={2 + index} timelineRef={sectionRef} customVariants={revealVariants}>
            <StepCard icon={step.icon} stepNumber={index + 1} stepLabel={t("step", { number: index + 1 })} title={step.title} description={step.description} benefits={step.benefits} />
          </TimelineContent>
        ))}
      </div>
    </section>
  );
};
