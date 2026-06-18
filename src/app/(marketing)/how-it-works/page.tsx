const steps = [
  {
    number: "01",
    title: "Upload your image",
    desc: "Drag and drop or click to upload any JPG, PNG, or WebP image up to 5 MB. Your image is processed securely and never stored.",
  },
  {
    number: "02",
    title: "AI analyzes the visual",
    desc: "Our LLaVA-1.5 vision model examines the subject, colors, mood, lighting, composition, and style of your image in seconds.",
  },
  {
    number: "03",
    title: "Copy your prompt",
    desc: "Get a detailed, structured prompt ready to paste into Midjourney, DALL·E, Stable Diffusion, or any other AI image generator.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="max-w-270 mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 tracking-[-1px] text-ink">How it works</h1>
        <p className="text-lg text-ink-muted max-w-xl mx-auto">
          Three simple steps to go from any image to a perfect AI art prompt.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {steps.map(({ number, title, desc }) => (
          <div key={number} className="flex-1 bg-surface border border-hairline rounded-xl p-6">
            <span className="text-5xl font-bold text-primary/20 select-none">
              {number}
            </span>
            <div className="mt-2">
              <h2 className="text-xl font-bold mb-3 text-ink">{title}</h2>
              <p className="text-ink-muted leading-relaxed text-[15px]">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <a
          href="/generator"
          className="bg-primary hover:bg-primary-active text-on-primary px-8 py-3 rounded-full font-medium transition-colors"
        >
          Try it now →
        </a>
      </div>
    </div>
  );
}
