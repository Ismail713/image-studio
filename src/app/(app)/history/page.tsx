export default function HistoryPage() {
  return (
    <div className="max-w-200 mx-auto px-4 py-16 w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 tracking-tight text-ink">History</h1>
        <p className="text-ink-muted text-[15px]">
          Your past image analyses and generated prompts.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-hairline rounded-xl text-center gap-4">
        <span className="text-4xl">🕐</span>
        <p className="font-medium text-lg text-ink">No history yet</p>
        <p className="text-sm text-ink-muted max-w-xs">
          Your generated prompts will appear here once you&apos;re signed in and have
          run at least one analysis.
        </p>
        <a
          href="/generator"
          className="bg-primary hover:bg-primary-active text-on-primary px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
        >
          Generate a prompt
        </a>
      </div>
    </div>
  );
}
