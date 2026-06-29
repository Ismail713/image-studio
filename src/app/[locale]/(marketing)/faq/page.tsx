"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-hairline py-5">
      <button className="w-full flex justify-between items-center text-left font-medium text-base gap-4 text-ink" onClick={() => setOpen((o) => !o)}>
        {q}
        <span className="text-primary shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-[15px] text-ink-muted leading-relaxed">{a}</p>}
    </div>
  );
}

export default function FAQPage() {
  const t = useTranslations("faq");
  const faqs = Array.from({ length: 7 }, (_, i) => ({
    q: t(`q${i + 1}`),
    a: t(`a${i + 1}`),
  }));

  return (
    <div className="max-w-150 mx-auto px-4 py-12 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center tracking-[-1px] text-ink">{t("title")}</h1>
      <p className="text-center text-ink-muted mb-8 sm:mb-12">{t("description")}</p>
      <div>
        {faqs.map(({ q, a }) => (
          <FAQItem key={q} q={q} a={a} />
        ))}
      </div>
    </div>
  );
}
