import Link from "next/link";

const stats = [
  { label: "Total generations", value: "—" },
  { label: "Saved prompts", value: "—" },
  { label: "Current plan", value: "Free" },
];

const quickLinks = [
  { href: "/generator", label: "New generation", desc: "Upload an image and generate a prompt" },
  { href: "/history", label: "View history", desc: "Browse your past image analyses" },
  { href: "/gallery", label: "Gallery", desc: "Explore public prompts from the community" },
  { href: "/pricing", label: "Upgrade plan", desc: "Unlock unlimited generations and more" },
];

export default function DashboardPage() {
  return (
    <div className="max-w-270 mx-auto px-4 py-16 w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2 tracking-tight text-ink">Dashboard</h1>
        <p className="text-ink-muted text-[15px]">
          Welcome back. Here&apos;s an overview of your activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map(({ label, value }) => (
          <div
            key={label}
            className="bg-surface border border-hairline rounded-xl p-6"
          >
            <p className="text-sm text-ink-muted mb-1">{label}</p>
            <p className="text-2xl font-bold text-ink">{value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-bold mb-4 text-ink">Quick actions</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {quickLinks.map(({ href, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="group bg-surface border border-hairline hover:border-primary rounded-xl p-6 transition-colors"
          >
            <p className="font-medium group-hover:text-primary transition-colors mb-1 text-ink">
              {label} →
            </p>
            <p className="text-sm text-ink-muted">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
