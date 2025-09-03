import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
export const locales = ["fr", "en"] as const;
export const defaultLocale = "fr" as const;

export default getRequestConfig(async ({ locale = defaultLocale }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locales.includes(locale as any)) notFound();

  return {
    locale,
    messages: (await import(`./translations/${locale}.json`)).default,
  };
});
