export default function AboutPage() {
  return (
    <div className="max-w-200 mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-4 tracking-[-1px] text-ink">About imagestudio</h1>
      <p className="text-ink-muted text-lg mb-10">
        imagestudio is a free, AI-powered tool that turns any image into a
        detailed, ready-to-use prompt for AI image generators like Midjourney,
        DALL·E, and Stable Diffusion.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3 tracking-tight text-ink">What we do</h2>
        <p className="text-ink-secondary leading-relaxed">
          We use Cloudflare&apos;s LLaVA-1.5 vision model to analyze the content,
          style, colors, mood, and composition of your uploaded image, then
          synthesize that analysis into a detailed art prompt you can copy and
          paste directly into your favorite AI image tool.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-3 tracking-tight text-ink">Tech stack</h2>
        <ul className="list-disc list-inside text-ink-secondary space-y-2">
          <li>Next.js 16 (App Router) — frontend & API routes</li>
          <li>Cloudflare Workers AI — LLaVA-1.5 vision model inference</li>
          <li>Tailwind CSS v4 — styling</li>
          <li>TypeScript — type safety throughout</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3 tracking-tight text-ink">Contact</h2>
        <p className="text-ink-secondary">
          Have a question or feedback?{" "}
          <a href="/contact" className="text-primary hover:underline">
            Get in touch
          </a>
          .
        </p>
      </section>
    </div>
  );
}
