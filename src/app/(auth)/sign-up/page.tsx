import Link from "next/link";

export const metadata = {
  title: "Sign Up — imagestudio",
};

export default function SignUpPage() {
  return (
    <div className="w-full max-w-sm bg-surface border border-hairline rounded-xl p-8">
      <h1 className="text-2xl font-bold mb-1 text-ink">Create your account</h1>
      <p className="text-sm text-ink-muted mb-6">
        Free to start. No credit card required.
      </p>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Jane Doe"
            className="border border-hairline rounded-lg px-4 py-2.5 text-[15px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="border border-hairline rounded-lg px-4 py-2.5 text-[15px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-ink">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="••••••••"
            className="border border-hairline rounded-lg px-4 py-2.5 text-[15px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-active text-on-primary py-3 rounded-full font-medium text-sm transition-colors mt-2"
        >
          Create account
        </button>
      </form>

      <p className="text-center text-xs text-ink-faint mt-4">
        By signing up you agree to our{" "}
        <Link href="/terms" className="hover:underline text-ink-muted">Terms</Link> and{" "}
        <Link href="/privacy" className="hover:underline text-ink-muted">Privacy Policy</Link>.
      </p>

      <p className="text-center text-sm text-ink-muted mt-4">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-primary hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
