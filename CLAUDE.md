# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # starts Next.js dev server at http://localhost:3000
npm run build      # production build
npm run start      # serve production build
npm run lint       # ESLint (next/core-web-vitals + next/typescript)
```

No test runner is configured.

## Architecture

**Framework**: Next.js 16 App Router with `next-intl` for i18n. All pages live under `src/app/[locale]/`.

**Internationalization** (`next-intl`):
- Supported locales: `en`, `fr`, `es` (default: `en`). Configured in `src/i18n/routing.ts`.
- Translation JSON files live in `messages/{locale}.json`. Keys are namespaced (e.g. `nav.generator`, `home.headline`).
- `next-intl/plugin` wraps the Next.js config in `next.config.ts` via `createNextIntlPlugin("./src/i18n/request.ts")`.
- Middleware (`src/middleware.ts`) handles locale detection/redirect for all non-API/non-asset routes.
- In server components, use `getTranslations` / `setRequestLocale`. In client components, use `useTranslations` / `useLocale`.
- Internal links must include the locale prefix: `/${locale}/generator`, not `/generator`.

**Route groups** (under `src/app/[locale]/`):
- `(marketing)/` — public pages (about, pricing, how-it-works, FAQ, contact, privacy, terms). Layout adds `Navbar` + `Footer`.
- `(app)/` — authenticated-area pages (dashboard, generator, gallery, history). Layout adds `Navbar` + `Footer`.
- `(auth)/` — sign-in/sign-up. Minimal centered layout with logo + `ThemeToggle`, no Navbar/Footer.
- The home page (`src/app/[locale]/page.tsx`) is outside route groups and renders its own Navbar/Footer inline.

**Styling**: Tailwind CSS v4 — no `tailwind.config` file. All theme tokens are defined in `src/app/globals.css` using CSS custom properties mapped via `@theme inline`. Custom semantic color tokens: `canvas`, `canvas-soft`, `surface`, `ink`, `ink-secondary`, `ink-muted`, `ink-faint`, `hairline`, `primary`, `primary-active`, `on-primary`, `secondary`. Use these in Tailwind classes (e.g. `text-ink`, `bg-surface`, `border-hairline`).

**Dark mode**: Class-based (`.dark` on `<html>`), toggled via `ThemeProvider` (`src/components/ThemeProvider.tsx`) which persists to `localStorage("theme")`. An inline `<script>` in the root layout prevents flash. The custom variant is defined as `@custom-variant dark (&:where(.dark, .dark *))` in `globals.css`.

**UI components**: `src/components/ui/` contains shadcn/ui-style primitives (button, input, label, card) using `class-variance-authority` + `clsx` + `tailwind-merge`. The `cn()` utility is in `src/lib/utils.ts`.

**Fonts**: Inter loaded via `next/font/google` in root `layout.tsx`, exposed as CSS variable `--font-inter`.

**API routes**: `src/app/api/analyze/route.ts` — POST endpoint that sends an uploaded image to Cloudflare Workers AI (LLaVA vision model) and returns an AI art prompt. Requires `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_API_TOKEN` env vars.

**Key components**:
- `DropZone` — client component for drag-and-drop image upload (JPEG/PNG/WebP, max 5 MB).
- `LanguageSwitcher` — locale picker in the navbar.
- `ThemeToggle` — dark/light mode button.

**Path alias**: `@/*` maps to `src/*`.

**Linting**: ESLint v9 flat config (`eslint.config.mjs`). No `.eslintrc`.

**Images**: `next/image` configured to allow `images.unsplash.com` as a remote pattern in `next.config.ts`.
