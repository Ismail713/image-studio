"use client";

import { useRef, useState } from "react";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

interface DropZoneProps {
  onFileSelect: (file: File) => void;
}

function validate(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "Only JPG, PNG, and WebP images are accepted.";
  }
  if (file.size > MAX_BYTES) {
    return "File must be under 5 MB.";
  }
  return null;
}

export default function DropZone({ onFileSelect }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFile(file: File) {
    const err = validate(file);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    onFileSelect(file);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function onDragLeave(e: React.DragEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // reset so the same file can be re-selected after an error
    e.target.value = "";
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div
        role="button"
        tabIndex={0}
        aria-label="Drop zone — click or drag an image here"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={[
          "flex flex-col items-center justify-center gap-4",
          "w-full rounded-2xl border-2 border-dashed px-8 py-16 cursor-pointer",
          "transition-colors duration-150 select-none outline-none",
          "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900",
          isDragging
            ? "border-indigo-400 bg-indigo-950/30"
            : "border-zinc-600 bg-zinc-800/40 hover:border-zinc-400 hover:bg-zinc-800/60",
        ].join(" ")}
      >
        {/* Upload icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={[
            "w-12 h-12 transition-colors duration-150",
            isDragging ? "text-indigo-400" : "text-zinc-400",
          ].join(" ")}
          aria-hidden
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>

        <p
          className={[
            "text-base font-medium text-center transition-colors duration-150",
            isDragging ? "text-indigo-300" : "text-zinc-300",
          ].join(" ")}
        >
          Drop your art image here or click to upload
        </p>

        <p className="text-xs text-zinc-500">JPG, PNG, WebP · max 5 MB</p>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        className="sr-only"
        tabIndex={-1}
        onChange={onInputChange}
      />
    </div>
  );
}
