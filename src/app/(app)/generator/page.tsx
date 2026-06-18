"use client";

import { useCallback, useState } from "react";
import DropZone from "@/components/DropZone";

const STYLE_OPTIONS = [
  { value: "", label: "No preference" },
  { value: "photorealistic", label: "Photorealistic" },
  { value: "cinematic", label: "Cinematic" },
  { value: "anime", label: "Anime / Illustration" },
  { value: "oil painting", label: "Oil Painting" },
  { value: "digital art", label: "Digital Art" },
  { value: "watercolor", label: "Watercolor" },
];

export default function GeneratorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [style, setStyle] = useState("");
  const [prompt, setPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const analyzeFile = useCallback(async (fileToAnalyze: File, styleHint: string) => {
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
        setError(data.error ?? `Server error ${res.status}. Please try again.`);
      } else if (!data.prompt) {
        setError("The AI returned an empty response. Please try a different image.");
      } else {
        setPrompt(data.prompt);
      }
    } catch (err) {
      console.error("[generator] fetch error:", err);
      setError("Network error — could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  function handleFileSelect(selected: File) {
    setFile(selected);
    setPrompt(null);
    setError(null);
    const url = URL.createObjectURL(selected);
    setPreview(url);
    analyzeFile(selected, "");
  }

  function handleAnalyze() {
    if (!file) return;
    analyzeFile(file, style);
  }

  async function handleCopy() {
    if (!prompt) return;
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setFile(null);
    setPreview(null);
    setPrompt(null);
    setError(null);
    setStyle("");
  }

  return (
    <div className="max-w-200 mx-auto px-4 py-16 w-full">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2 tracking-tight text-ink">Generate a Prompt</h1>
        <p className="text-ink-muted text-[15px]">
          Upload an image and our AI will describe it as a detailed art prompt.
        </p>
      </div>

      {!preview ? (
        <DropZone onFileSelect={handleFileSelect} />
      ) : (
        <div className="flex flex-col gap-6">
          {/* Image preview */}
          <div className="relative rounded-xl overflow-hidden border border-hairline aspect-video flex items-center justify-center bg-canvas-soft">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Uploaded preview"
              className="max-h-72 max-w-full object-contain"
            />
            <button
              onClick={handleReset}
              className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-1.5 rounded-full transition-colors"
            >
              Change image
            </button>
          </div>

          {/* Style selector */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="style" className="text-sm font-medium text-ink">
              Style preference <span className="text-ink-faint">(optional)</span>
            </label>
            <select
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="border border-hairline rounded-sm px-3 py-2 text-[15px] bg-surface text-ink focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {STYLE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Analyze button */}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-primary hover:bg-primary-active disabled:opacity-60 text-on-primary py-3 rounded-full font-medium text-sm transition-colors"
          >
            {loading ? "Analyzing…" : prompt ? "Re-analyze with style" : "Analyze image"}
          </button>

          {/* Error */}
          {error && (
            <p role="alert" className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}

          {/* Result */}
          {prompt && (
            <div className="bg-surface border border-hairline rounded-xl p-6 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Generated Prompt
                </p>
                <button
                  onClick={handleCopy}
                  className="text-xs border border-hairline hover:border-primary hover:text-primary px-3 py-1.5 rounded-full transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="text-[15px] leading-relaxed text-ink-secondary">
                {prompt}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
