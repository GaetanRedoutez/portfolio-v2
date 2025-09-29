import { SectionWrapper } from "@/app/components/ui/SectionWrapper";
import dbConnect from "@/lib/db";
import Skill, { ISkill } from "@/lib/models/Skill";
import iconMap from "@/lib/utils/iconMap";
import { QuestionMark } from "iconoir-react";
import { getTranslations } from "next-intl/server";
import React from "react";

export const Skills = async () => {
  const t = await getTranslations("skills");

  await dbConnect();
  const skills = await Skill.find().lean<ISkill[]>();

  const frontend = skills.filter((skill) => skill.type === "FRONT");
  const backend = skills.filter((skill) => skill.type === "BACK");
  const other = skills.filter((skill) => skill.type === "OTHER");

  return (
    <SectionWrapper
      id="projects"
      className="bg-gradient-to-b from-common-2 to-common-2/90"
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
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkillTypeArticle type={t("frontend")}>
          {frontend.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </SkillTypeArticle>
        <SkillTypeArticle type={t("backend")}>
          {backend.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </SkillTypeArticle>
        <SkillTypeArticle type={t("other")}>
          {other.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </SkillTypeArticle>
      </section>
    </SectionWrapper>
  );
};

function SkillCard({ skill }: { skill: ISkill }) {
  const Icon = iconMap[skill.icon] || QuestionMark; // fallback
  return (
    <div className="relative  px-6 py-2 rounded-md text-neutral-10 cursor-default overflow-hidden group animate-fade-in-up-delay-3 ">
      <div className="absolute inset-0 bg-gradient-to-br from-peach-1 to-peach-4 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-gradient-to-tl from-peach-2 to-peach-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10 flex items-center gap-2 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 " />
        <span>{skill.name}</span>
      </div>
    </div>
  );
}

function SkillTypeArticle({
  type,
  children,
}: {
  type: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 bg-neutral-1 px-6 py-2 rounded-md animate-fade-in-up-delay-3">
      <h3 className="text-center text-neutral-10 text-md">{type}</h3>
      {children}
    </div>
  );
}
