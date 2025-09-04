import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = "fr" as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const resolvedLocale = (await requestLocale) ?? defaultLocale;

  if (!locales.includes(resolvedLocale as Locale)) notFound();

  return {
    locale: resolvedLocale,
    messages: (await import(`./translations/${resolvedLocale}.json`)).default,
  };
});
