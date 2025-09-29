import { SectionWrapper } from "@/app/components/ui/SectionWrapper";
import { Github, Internet, Linkedin, Mail, MapPin, Phone } from "iconoir-react";
import { getTranslations } from "next-intl/server";
import ContactForm from "./ContactForm";

export const Contact = async () => {
  const t = await getTranslations("contact");

  return (
    <SectionWrapper
      id="contact"
      innerClassName="flex flex-col w-full py-2 lg:py-8"
      className="bg-gradient-to-br from-common-2/90 via-neutral-2 to-neutral-1 text-neutral-10"
    >
      <h2
        className="relative animate-fade-in-up-delay-3 text-center inline-block pb-2 text-xl md:text-4xl font-medium
        after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] 
        after:bg-gradient-to-r after:from-mint-10 after:to-mint-7"
      >
        {t("title")}
      </h2>
      <div>{t("subtitle")}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex flex-col gap-4">
            <div className=" text-l">{t("info")}</div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <div className="h-7 w-7 rounded-md bg-peach-7 flex items-center justify-center">
                  <Mail width={24} height={24} strokeWidth={2} />
                </div>
                <div>
                  <div>{t("email")}</div>
                  <a
                    target="_blank"
                    href={`mailto:${process.env.EMAIL_TO}`}
                    className="hover:text-mint-6 hover:underline"
                  >
                    {process.env.EMAIL_TO}
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="h-7 w-7 rounded-md bg-peach-7 flex items-center justify-center">
                  <Phone width={24} height={24} strokeWidth={2} />
                </div>
                <div>
                  <div>{t("phone")}</div>
                  <a
                    target="_blank"
                    href={`mailto:${process.env.PHONE_TO}`}
                    className="hover:text-mint-6 hover:underline"
                  >
                    {process.env.PHONE_TO}
                  </a>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="h-7 w-7 rounded-md bg-peach-7 flex items-center justify-center">
                  <MapPin width={24} height={24} strokeWidth={2} />
                </div>
                <div>
                  <div>{t("loc")}</div>
                  <div>{t("loc-pos")}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-l">{t("social")}</div>
              <div className="flex gap-2 items-center">
                <SocialWrapper href="https://github.com/GaetanRedoutez">
                  <Github width={24} height={24} strokeWidth={2} />{" "}
                </SocialWrapper>
                <SocialWrapper href="https://www.linkedin.com/in/ga%C3%ABtan-redoutez-b090a317b/?originalSubdomain=fr">
                  <Linkedin width={24} height={24} strokeWidth={2} />{" "}
                </SocialWrapper>
                <SocialWrapper href="https://www.gaetanredoutez.fr">
                  <Internet width={24} height={24} strokeWidth={2} />{" "}
                </SocialWrapper>
              </div>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </SectionWrapper>
  );
};

type SocialWrapperProps = {
  href: string;
  children: React.ReactNode;
};

const SocialWrapper = ({ href, children }: SocialWrapperProps) => {
  return (
    <a
      target="_blank"
      href={href}
      className="h-6 w-6 bg-neutral-1 text-neutral-10 rounded-md flex items-center justify-center hover:scale-110 transition-transform duration-300 hover:text-mint-6 hover:bg-neutral-2"
    >
      {children}
    </a>
  );
};
