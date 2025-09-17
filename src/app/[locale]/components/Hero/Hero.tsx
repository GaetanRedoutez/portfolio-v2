import DarkVeil from "@/app/components/ui/DarkVeil";
import { SectionWrapper } from "@/app/components/ui/SectionWrapper";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "../../../components/ui/Button";

export const Hero = () => {
  const t = useTranslations("hero");
  return (
    <>
      <SectionWrapper
        id="home"
        className="bg-common-2"
        innerClassName="h-screen flex items-center justify-center "
      >
        <div className="absolute inset-0 z-0">
          {/* <DarkVeil hueShift={50} speed={1.2} /> */}
        </div>
        <div className="space-y-3 animate-slide-in-left text-center">
          <h1 className="text-4xl md:text-[6rem] font-bold bg-gradient-to-r from-mint-4 to-accent-4 bg-clip-text text-transparent animate-fade-in-up-delay-2">
            {t("name")}
          </h1>
          <div className="text-2xl md:text-6xl text-accent-3 animate-fade-in-up-delay-3">
            {t("title")}
          </div>
          <div className="text-md md:text-lg text-neutral-3 animate-fade-in-up-delay-3">
            {t("subtitle")}
          </div>
          <div className="flex gap-4 mt-8 animate-fade-in-up-delay-4 justify-center">
            <Link
              href="#projects"
              aria-label={t("cta1-label")}
              className="inline-block"
            >
              <Button>{t("cta1")}</Button>
            </Link>
            <Link
              href="#contact"
              aria-label={t("cta2-label")}
              className="inline-block"
            >
              <Button variant={"decorated"}>{t("cta2")}</Button>
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};
