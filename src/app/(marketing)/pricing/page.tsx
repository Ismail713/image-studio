const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying it out.",
    features: [
      "5 image analyses per month",
      "Standard prompt quality",
      "Copy to clipboard",
      "No account required",
    ],
    cta: "Get started",
    href: "/generator",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For creators who prompt daily.",
    features: [
      "Unlimited image analyses",
      "Enhanced prompt quality",
      "Style presets (cinematic, anime, etc.)",
      "History & saved prompts",
      "Priority processing",
    ],
    cta: "Start Pro",
    href: "/sign-up",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "per month",
    description: "For studios and agencies.",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Shared gallery",
      "API access",
      "Priority support",
    ],
    cta: "Contact us",
    href: "/contact",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-270 mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 tracking-[-1px] text-ink">Simple, honest pricing</h1>
        <p className="text-lg text-ink-muted">
          Start free. Upgrade when you need more.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl p-8 flex flex-col gap-6 border ${
              plan.highlighted
                ? "border-primary bg-canvas-soft"
                : "border-hairline bg-surface"
            }`}
          >
            {plan.highlighted && (
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Most Popular
              </span>
            )}
            <div>
              <p className="text-lg font-bold mb-1 text-ink">{plan.name}</p>
              <p className="text-3xl font-bold text-ink">
                {plan.price}{" "}
                <span className="text-sm font-normal text-ink-muted">
                  {plan.period}
                </span>
              </p>
              <p className="text-[15px] text-ink-muted mt-2">
                {plan.description}
              </p>
            </div>
            <ul className="flex flex-col gap-2 flex-1">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="text-[15px] text-ink-secondary flex items-start gap-2"
                >
                  <span className="text-primary mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={plan.href}
              className={`text-center py-3 rounded-full font-medium text-sm transition-colors ${
                plan.highlighted
                  ? "bg-primary hover:bg-primary-active text-on-primary"
                  : "border border-hairline hover:border-ink-faint text-ink"
              }`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
