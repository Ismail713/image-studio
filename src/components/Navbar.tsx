"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/generator", label: "Generator" },
  { href: "/gallery", label: "Gallery" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-hairline bg-canvas sticky top-0 z-50">
      <nav className="max-w-300 mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight text-ink">
          image<span className="text-primary">studio</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 text-[15px] text-ink-muted">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`hover:text-ink transition-colors ${
                  pathname === href ? "text-ink font-medium" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-[15px] text-ink-muted hover:text-ink transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/sign-up"
            className="text-sm bg-primary hover:bg-primary-active text-on-primary px-5 py-1.5 rounded-full font-medium transition-colors"
          >
            Get started free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-canvas-soft transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-ink mb-1" />
          <span className="block w-5 h-0.5 bg-ink mb-1" />
          <span className="block w-5 h-0.5 bg-ink" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-hairline px-4 py-4 flex flex-col gap-4 text-[15px] bg-canvas">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`hover:text-ink transition-colors ${
                pathname === href ? "font-medium text-ink" : "text-ink-muted"
              }`}
            >
              {label}
            </Link>
          ))}
          <hr className="border-hairline" />
          <Link href="/sign-in" onClick={() => setMenuOpen(false)} className="text-ink-muted">
            Log in
          </Link>
          <Link
            href="/sign-up"
            onClick={() => setMenuOpen(false)}
            className="bg-primary hover:bg-primary-active text-on-primary px-5 py-2 rounded-full text-center font-medium transition-colors"
          >
            Get started free
          </Link>
        </div>
      )}
    </header>
  );
}
