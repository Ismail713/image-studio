import Link from "next/link";

export const metadata = {
  title: "Sign In — imagestudio",
};

export default function SignInPage() {
  return (
    <div className="w-full max-w-sm bg-surface border border-hairline rounded-xl p-8">
      <h1 className="text-2xl font-bold mb-1 text-ink">Welcome back</h1>
      <p className="text-sm text-ink-muted mb-6">
        Sign in to your imagestudio account.
      </p>

      <form className="flex flex-col gap-4">
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
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-sm font-medium text-ink">
              Password
            </label>
            <a href="#" className="text-xs text-primary hover:underline">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="border border-hairline rounded-lg px-4 py-2.5 text-[15px] bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-active text-on-primary py-3 rounded-full font-medium text-sm transition-colors mt-2"
        >
          Sign in
        </button>
      </form>

      <p className="text-center text-sm text-ink-muted mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-primary hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}
