const PLACEHOLDER_CARDS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  style: ["Cinematic", "Anime", "Oil Painting", "Photorealistic", "Digital Art", "Watercolor"][i],
  prompt:
    "A detailed AI art prompt will appear here once the gallery is populated with real community submissions.",
}));

export default function GalleryPage() {
  return (
    <div className="max-w-300 mx-auto px-4 py-16 w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 tracking-tight text-ink">Gallery</h1>
        <p className="text-ink-muted text-[15px]">
          Community-generated prompts. Get inspired, then make your own.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {["All", "Cinematic", "Anime", "Oil Painting", "Photorealistic", "Digital Art"].map(
          (tag) => (
            <button
              key={tag}
              className={`text-xs px-4 py-1.5 rounded-full border transition-colors ${
                tag === "All"
                  ? "bg-primary text-on-primary border-primary"
                  : "border-hairline hover:border-primary hover:text-primary text-ink-muted"
              }`}
            >
              {tag}
            </button>
          )
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLACEHOLDER_CARDS.map(({ id, style, prompt }) => (
          <div
            key={id}
            className="bg-surface border border-hairline rounded-xl overflow-hidden"
          >
            <div className="aspect-video bg-canvas-soft flex items-center justify-center text-ink-faint text-sm">
              Image thumbnail
            </div>
            <div className="p-5 flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                {style}
              </span>
              <p className="text-sm text-ink-muted leading-relaxed line-clamp-3">
                {prompt}
              </p>
              <button className="mt-2 self-start text-xs border border-hairline hover:border-primary hover:text-primary px-3 py-1.5 rounded-full transition-colors text-ink-secondary">
                Copy prompt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
