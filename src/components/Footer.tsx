import Link from "next/link";

const footerLinks = {
  Product: [
    { href: "/generator", label: "Generator" },
    { href: "/gallery", label: "Gallery" },
    { href: "/pricing", label: "Pricing" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/faq", label: "FAQ" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-canvas-soft border-t border-hairline mt-auto">
      <div className="max-w-300 mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <p className="font-bold text-lg mb-2 text-ink">
              image<span className="text-primary">studio</span>
            </p>
            <p className="text-sm text-ink-muted max-w-45">
              Turn any image into a perfect AI art prompt.
            </p>
          </div>
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint mb-3">
                {section}
              </p>
              <ul className="flex flex-col gap-2">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-ink-secondary hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-hairline pt-6 text-center text-xs text-ink-faint">
          © {new Date().getFullYear()} imagestudio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
