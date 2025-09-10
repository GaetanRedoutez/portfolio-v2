import { SectionWrapper } from "@/app/components/ui/SectionWrapper";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const About = () => {
  const t = useTranslations("about");

  return (
    <SectionWrapper
      id="about"
      className="bg-gradient-to-b from-common-2 to-accent-10/95"
      innerClassName="flex flex-col w-full py-2 lg:py-8"
    >
      <h2
        className="relative animate-fade-in-up-delay-3 text-center inline-block pb-2 text-xl md:text-2xl font-bold
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] 
        after:bg-gradient-to-r after:from-mint-10 after:to-mint-7"
      >
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 grow items-center md:grid-cols-2 w-full text-left gap-x-32">
        <div className="flex flex-col gap-4">
          <div className="relative w-32 h-32 mx-auto ">
            <div className="absolute inset-0 bg-gradient-to-r from-peach-4 to-mint-6 rounded-full p-1">
              <div className="w-full h-full bg-neutral-9 rounded-full p-1">
                <Image
                  src={"/photoprofil.png"}
                  alt={""}
                  width={350}
                  height={350}
                />
              </div>
            </div>
            <div className="absolute -inset-2 border border-mint-6 rounded-full opacity-30" />
          </div>
          <p className="text-left">
            Passionné par le développement web depuis plus de 4 ans, je crée des
            expériences numériques modernes et performantes. Mon expertise
            couvre l&#39;ensemble du stack technique, du design à la mise en
            production.
          </p>
          <p className="text-left">
            J&#39;aime particulièrement travailler avec les technologies
            modernes comme React, Next.js et Node.js pour créer des applications
            web qui allient performance et esthétique.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {parcours
            .sort((a, b) => b.date.start.localeCompare(a.date.start))
            .map((data, index) => {
              return <ParcoursTag key={index} data={data} />;
            })}
        </div>
      </div>
    </SectionWrapper>
  );
};

const ParcoursTag = ({ data }: { data: any }) => {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col items-center">
        <div className="h-[1rem] w-[1rem] rounded-full bg-sand-4" />
        <div className="h-full w-[4px] rounded-full bg-sand-4" />
      </div>
      <div>
        <div className="font-bold text-sand-5 text-sm">
          {data.date.start} {data.date.end && `- ${data.date.end}`}
        </div>
        <div className="font-semibold text-neutral-2 ">{data.title}</div>
        <div className="text-neutral-3">{data.subtitle}</div>
      </div>
    </div>
  );
};

const parcours = [
  {
    date: { start: "2018", end: "2023" },
    title: "Automaticien",
    subtitle: "Programmation et automatisation",
  },
  {
    date: { start: "2020", end: "2023" },
    title: "Début en développement",
    subtitle: "Formation autodidacte et premiers projets personnels",
  },
  {
    date: { start: "2023", end: "2024" },
    title: "Formation développeur web",
    subtitle: "Formation OpenClassrooms",
  },
  {
    date: { start: "2024" },
    title: "Alternance développeur web",
    subtitle: "Créations d'applications web React, Next.js et Java",
  },
];
