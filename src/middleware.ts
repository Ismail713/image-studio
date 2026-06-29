import { type NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/middleware";

const intlMiddleware = createIntlMiddleware(routing);

const protectedPatterns = ["/dashboard", "/history"];
const authRoutes = ["/sign-in", "/sign-up"];

function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/");
  return "/" + segments.slice(2).join("/");
}

function getLocaleFromPath(pathname: string): string {
  const segments = pathname.split("/");
  const locale = segments[1];
  if (routing.locales.includes(locale as "en" | "fr" | "es")) {
    return locale;
  }
  return routing.defaultLocale;
}

export default async function middleware(request: NextRequest) {
  const { user, supabaseResponse } = await updateSession(request);

  const { pathname } = request.nextUrl;
  const locale = getLocaleFromPath(pathname);
  const pathWithoutLocale = getPathWithoutLocale(pathname);

  if (!user && protectedPatterns.some((p) => pathWithoutLocale.startsWith(p))) {
    const signInUrl = new URL(`/${locale}/sign-in`, request.url);
    signInUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (user && authRoutes.some((p) => pathWithoutLocale.startsWith(p))) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  const intlResponse = intlMiddleware(request);

  supabaseResponse.cookies.getAll().forEach((cookie) => {
    intlResponse.cookies.set(cookie.name, cookie.value, cookie);
  });

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
