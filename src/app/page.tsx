import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center text-center px-4 py-28 max-w-200 mx-auto w-full">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            AI-Powered Prompt Generator
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-[-2px] mb-6 leading-tight text-ink">
            Turn any image into a{" "}
            <span className="text-primary">perfect AI prompt</span>
          </h1>
          <p className="text-lg text-ink-muted max-w-xl mb-10 leading-relaxed">
            Upload a photo and let our AI analyze it to generate detailed,
            high-quality prompts for Midjourney, DALL·E, Stable Diffusion, and
            more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/generator"
              className="bg-primary hover:bg-primary-active text-on-primary px-8 py-3 rounded-full font-medium transition-colors"
            >
              Try it free →
            </Link>
            <Link
              href="/how-it-works"
              className="border border-hairline hover:border-ink-faint bg-surface px-8 py-3 rounded-full font-medium transition-colors text-ink"
            >
              How it works
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="bg-canvas-soft py-20 px-4">
          <div className="max-w-270 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 tracking-[-0.5px] text-ink">
              Everything you need to prompt better
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Any Image",
                  desc: "JPG, PNG, or WebP — drag and drop or click to upload. Up to 5 MB.",
                },
                {
                  title: "Instant Analysis",
                  desc: "Powered by Cloudflare AI's LLaVA vision model for fast, accurate results.",
                },
                {
                  title: "Style-Aware",
                  desc: "Choose a style hint (cinematic, anime, photorealistic) to guide the output.",
                },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  className="bg-surface border border-hairline rounded-xl p-6"
                >
                  <h3 className="font-bold text-lg mb-2 text-ink">{title}</h3>
                  <p className="text-ink-muted text-[15px] leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section className="py-20 px-4">
          <div className="max-w-200 mx-auto text-center bg-secondary rounded-2xl py-16 px-8">
            <h2 className="text-3xl font-bold text-on-primary mb-4 tracking-[-0.5px]">
              Start generating prompts today
            </h2>
            <p className="text-blue-200 mb-8">
              Free to try. No account required for your first 5 generations.
            </p>
            <Link
              href="/sign-up"
              className="bg-on-primary text-secondary hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Create free account
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
