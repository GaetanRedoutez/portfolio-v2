import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { locales, defaultLocale } from "./i18n";

export default function middleware(request: NextRequest) {
  // Handle i18n routing
  const response = createMiddleware({
    locales,
    defaultLocale,
    localeDetection: true,
    localePrefix: "as-needed",
  })(request);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(fr|en)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
