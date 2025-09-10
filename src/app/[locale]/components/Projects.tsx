import { SectionWrapper } from "@/app/components/ui/SectionWrapper";
import { useTranslations } from "next-intl";
import React from "react";

export const Projects = () => {
  const t = useTranslations("projects");

  return (
    <SectionWrapper
      id="projects"
      className="bg-gradient-to-b from-accent-10/95 to-accent-10/85"
      innerClassName="flex flex-col w-full h-screen py-2 lg:py-8"
    >
      <h2
        className="relative animate-fade-in-up-delay-3 text-center inline-block pb-2 text-xl md:text-2xl font-bold
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] 
        after:bg-gradient-to-r after:from-mint-10 after:to-mint-7"
      >
        {t("title")}
      </h2>
    </SectionWrapper>
  );
};
