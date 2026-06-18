"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What types of images can I upload?",
    a: "You can upload JPG, PNG, or WebP files up to 5 MB. Most photos, illustrations, and digital art work well.",
  },
  {
    q: "Is my image stored on your servers?",
    a: "No. Images are sent directly to the AI model for analysis and are never stored or logged by imagestudio.",
  },
  {
    q: "Which AI image generators work with the prompts?",
    a: "The prompts are optimized for Midjourney, DALL·E 3, Stable Diffusion, Adobe Firefly, and similar tools.",
  },
  {
    q: "What is the free plan limit?",
    a: "Free users get 5 image analyses per month. Upgrade to Pro for unlimited analyses.",
  },
  {
    q: "Can I choose a specific art style?",
    a: "Yes! The Generator page includes a style selector (cinematic, anime, photorealistic, oil painting, etc.) that guides the AI output.",
  },
  {
    q: "How accurate are the generated prompts?",
    a: "Accuracy depends on the input image. Clear, well-lit photos with distinct subjects produce the best prompts. Abstract or low-resolution images may yield less precise results.",
  },
  {
    q: "Do I need an account?",
    a: "No account is required for your first 5 generations on the free plan. Sign up for an account to track your history and access Pro features.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-hairline py-5">
      <button
        className="w-full flex justify-between items-center text-left font-medium text-base gap-4 text-ink"
        onClick={() => setOpen((o) => !o)}
      >
        {q}
        <span className="text-primary shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p className="mt-3 text-[15px] text-ink-muted leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="max-w-150 mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-4 text-center tracking-[-1px] text-ink">FAQ</h1>
      <p className="text-center text-ink-muted mb-12">
        Frequently asked questions about imagestudio.
      </p>
      <div>
        {faqs.map(({ q, a }) => (
          <FAQItem key={q} q={q} a={a} />
        ))}
      </div>
    </div>
  );
}
