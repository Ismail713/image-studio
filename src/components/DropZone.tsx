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
    e.target.value = "";
  }

  function openFilePicker() {
    inputRef.current?.click();
  }

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={openFilePicker}
        className={[
          "flex flex-col items-center justify-center gap-6",
          "w-full rounded-xl border-2 border-dashed px-8 py-14 cursor-pointer",
          "transition-colors duration-150 select-none",
          isDragging
            ? "border-primary bg-blue-50 dark:bg-blue-950/30"
            : "border-hairline bg-surface hover:border-ink-faint",
        ].join(" ")}
      >
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
            isDragging ? "text-primary" : "text-ink-faint",
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
            isDragging ? "text-primary" : "text-ink-secondary",
          ].join(" ")}
        >
          Drag and drop your image here
        </p>

        <span className="bg-primary hover:bg-primary-active text-on-primary text-sm font-medium px-6 py-2.5 rounded-full transition-colors">
          Browse files
        </span>

        <p className="text-xs text-ink-faint">JPG, PNG, WebP · max 5 MB</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        onChange={onInputChange}
        className="block w-full text-sm text-ink-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary file:text-on-primary hover:file:bg-primary-active file:cursor-pointer"
      />

      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
