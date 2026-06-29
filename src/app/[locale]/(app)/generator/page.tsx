"use client";

import { useCallback, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import DropZone from "@/components/DropZone";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { Copy, Check, RotateCcw, Wand2, Lock } from "lucide-react";
import { useTrialLimit } from "@/hooks/useTrialLimit";

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.4, duration: 0.5 },
  }),
  hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
};

export default function GeneratorPage() {
  const t = useTranslations("generator");
  const tTrial = useTranslations("trial");
  const locale = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [style, setStyle] = useState("");
  const [prompt, setPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showGate, setShowGate] = useState(false);

  const { canUse, triesRemaining, maxTries, recordUse } = useTrialLimit();

  const styleOptions = [
    { value: "", label: t("noPreference") },
    { value: "photorealistic", label: t("photorealistic") },
    { value: "cinematic", label: t("cinematic") },
    { value: "anime", label: t("anime") },
    { value: "oil painting", label: t("oilPainting") },
    { value: "digital art", label: t("digitalArt") },
    { value: "watercolor", label: t("watercolor") },
  ];

  const analyzeFile = useCallback(
    async (fileToAnalyze: File, styleHint: string) => {
      setLoading(true);
      setError(null);
      setPrompt(null);
      try {
        const formData = new FormData();
        formData.append("image", fileToAnalyze);
        if (styleHint) formData.append("style", styleHint);
        const res = await fetch("/api/analyze", { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? t("errorServer", { status: res.status }));
        } else if (!data.prompt) {
          setError(t("errorEmpty"));
        } else {
          setPrompt(data.prompt);
          recordUse();
        }
      } catch (err) {
        console.error("[generator] fetch error:", err);
        setError(t("errorNetwork"));
      } finally {
        setLoading(false);
      }
    },
    [t, recordUse]
  );

  function handleFileSelect(selected: File) {
    if (!canUse) {
      setShowGate(true);
      return;
    }
    setFile(selected);
    setPrompt(null);
    setError(null);
    setPreview(URL.createObjectURL(selected));
    analyzeFile(selected, "");
  }

  function handleAnalyze() {
    if (!file) return;
    if (!canUse) {
      setShowGate(true);
      return;
    }
    analyzeFile(file, style);
  }

  async function handleCopy() {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setFile(null); setPreview(null); setPrompt(null); setError(null); setStyle("");
  }

  return (
    <div className="min-h-screen relative bg-black overflow-x-hidden" ref={sectionRef}>
      <TimelineContent animationNum={4} timelineRef={sectionRef} customVariants={revealVariants} className="absolute top-0 h-96 w-screen overflow-hidden pointer-events-none [mask-image:radial-gradient(50%_50%,white,transparent)]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]"></div>
        <SparklesComp density={400} direction="bottom" speed={1} color="#FFFFFF" className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]" />
      </TimelineContent>
      <TimelineContent animationNum={5} timelineRef={sectionRef} customVariants={revealVariants} className="absolute left-0 top-[-114px] w-full h-[113.625vh] flex flex-col items-start justify-start content-start flex-none flex-nowrap gap-2.5 overflow-hidden p-0 z-0 pointer-events-none">
        <div><div className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full" style={{ border: "200px solid #3131f5", filter: "blur(92px)", WebkitFilter: "blur(92px)" }}></div></div>
      </TimelineContent>
      <div className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at center, #206ce8 0%, transparent 70%)", opacity: 0.6, mixBlendMode: "multiply" }} />

      <article className="text-center mb-6 sm:mb-8 pt-20 sm:pt-32 max-w-3xl mx-auto space-y-2 relative z-50 px-4">
        <h2 className="text-2xl sm:text-4xl font-medium text-white">
          <VerticalCutReveal splitBy="words" staggerDuration={0.15} staggerFrom="first" reverse={true} containerClassName="justify-center" transition={{ type: "spring", stiffness: 250, damping: 40, delay: 0 }}>
            {t("title")}
          </VerticalCutReveal>
        </h2>
        <TimelineContent as="p" animationNum={0} timelineRef={sectionRef} customVariants={revealVariants} className="text-gray-300">
          {t("description")}
        </TimelineContent>
      </article>

      {triesRemaining !== Infinity && triesRemaining > 0 && (
        <div className="relative z-50 max-w-2xl mx-auto px-4 mb-4">
          <p className="text-center text-sm text-gray-400">
            {tTrial("remaining", { count: triesRemaining, max: maxTries })}
          </p>
        </div>
      )}

      <TimelineContent as="div" animationNum={1} timelineRef={sectionRef} customVariants={revealVariants} className="relative z-50 max-w-2xl mx-auto px-4 pb-12 sm:pb-20">
        {!preview ? (
          <div className="rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-6">
            <DropZone onFileSelect={handleFileSelect} />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-700 aspect-video flex items-center justify-center bg-neutral-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Uploaded preview" className="max-h-48 sm:max-h-72 max-w-full object-contain" />
              <button onClick={handleReset} className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-1.5 rounded-full transition-colors backdrop-blur-sm">
                <RotateCcw className="h-3 w-3" />{t("changeImage")}
              </button>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-5">
              <label htmlFor="style" className="block text-sm font-medium text-gray-300 mb-2">
                {t("styleLabel")} <span className="text-gray-500">{t("styleOptional")}</span>
              </label>
              <select id="style" value={style} onChange={(e) => setStyle(e.target.value)} className="w-full border border-neutral-700 rounded-xl px-4 py-2.5 text-sm bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {styleOptions.map(({ value, label }) => (<option key={value} value={value}>{label}</option>))}
              </select>
            </div>
            <button onClick={handleAnalyze} disabled={loading} className="w-full bg-gradient-to-t from-blue-500 to-blue-600 shadow-lg shadow-blue-800 border border-blue-500 text-white py-3.5 rounded-xl font-medium text-sm transition-all hover:shadow-blue-700 disabled:opacity-60 flex items-center justify-center gap-2">
              <Wand2 className="h-4 w-4" />
              {loading ? t("analyzing") : prompt ? t("reAnalyze") : t("analyze")}
            </button>
            {error && <p role="alert" className="text-sm text-red-400 text-center">{error}</p>}
            {prompt && (
              <div className="rounded-2xl border border-neutral-700 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">{t("generatedPrompt")}</p>
                  <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white px-3 py-1.5 rounded-full transition-colors">
                    {copied ? (<><Check className="h-3 w-3 text-green-400" />{t("copied")}</>) : (<><Copy className="h-3 w-3" />{t("copy")}</>)}
                  </button>
                </div>
                <p className="text-sm leading-relaxed text-gray-300">{prompt}</p>
              </div>
            )}
          </div>
        )}
      </TimelineContent>

      {showGate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowGate(false)}>
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 max-w-md mx-4 text-center" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center mb-5">
              <Lock className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{tTrial("gateTitle")}</h3>
            <p className="text-sm text-gray-400 mb-6">{tTrial("gateDescription", { max: maxTries })}</p>
            <div className="flex flex-col gap-3">
              <Link href={`/${locale}/sign-up`} className="w-full bg-gradient-to-t from-blue-500 to-blue-600 text-white py-3 rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:shadow-blue-800 flex items-center justify-center gap-2">
                {tTrial("signUp")}
              </Link>
              <Link href={`/${locale}/sign-in`} className="w-full border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-white py-3 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2">
                {tTrial("signIn")}
              </Link>
            </div>
            <button onClick={() => setShowGate(false)} className="mt-4 text-xs text-gray-500 hover:text-gray-300 transition-colors">
              {tTrial("dismiss")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
