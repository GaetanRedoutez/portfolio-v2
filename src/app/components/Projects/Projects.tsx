import { SectionWrapper } from "@/app/components/ui/SectionWrapper";
import dbConnect from "@/lib/db";
import Project, { IProject } from "@/lib/models/Project";
import { getTranslations } from "next-intl/server";
import { Locale } from "../../../../i18n";
import { Card } from "./Card";

export const Projects = async ({ locale }: { locale: Locale }) => {
  const t = await getTranslations("projects");

  await dbConnect();
  const projects = await Project.find().lean<IProject[]>();
  return (
    <SectionWrapper
      id="projects"
      className="bg-gradient-to-b from-common-2/90 to-common-2"
      innerClassName="flex flex-col w-full py-2 lg:py-8"
    >
      <h2
        className="relative animate-fade-in-up-delay-3 text-center inline-block pb-2 text-xl md:text-4xl font-medium
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] 
        after:bg-gradient-to-r after:from-mint-10 after:to-mint-7"
      >
        {t("title")}
      </h2>
      <div className="text-neutral-3">{t("subtitle")}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} {...project} />
        ))}
      </div>
    </SectionWrapper>
  );
};
