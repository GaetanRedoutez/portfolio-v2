import { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, locales } from "../../../i18n";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);

  return <>{children}</>;
}
