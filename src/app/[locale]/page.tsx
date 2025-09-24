import { getLocale } from "next-intl/server";
import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { Hero } from "../components/Hero/Hero";
import { Projects } from "../components/Projects/Projects";
import { Skills } from "../components/Skills";
import { IconoirProvider } from "iconoir-react";
import { Locale } from "../../../i18n";
import { NextIntlClientProvider } from "next-intl";

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const messages = (await import(`../../../translations/${locale}.json`))
    .default;
  console.log(messages);
  return (
    <main>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <IconoirProvider
          iconProps={{
            strokeWidth: 2,
            width: "1em",
            height: "1em",
          }}
        >
          <Hero {...{ locale }} />
          <About {...{ locale }} />
          <Projects />
          <Skills />
          <Contact />
        </IconoirProvider>
      </NextIntlClientProvider>
    </main>
  );
}
