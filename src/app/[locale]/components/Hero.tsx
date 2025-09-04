import { useTranslations } from "next-intl";
import { Button } from "../../components/ui/Button";

export const Hero = () => {
  const t = useTranslations("hero");
  return (
    <section className="bg-neutral-10 min-h-screen">
      <div className="container mx-auto text-accent-1 grid h-screen place-items-center grid-cols-1 md:grid-cols-2 gap-8 px-4">
        <div className="space-y-3 animate-slide-in-left">
          <div className="text-lg md:text-xl animate-fade-in-up-delay">
            {t("greeting")}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-mint-4 to-accent-4 bg-clip-text text-transparent animate-fade-in-up-delay-2">
            {t("name")}
          </h1>
          <div className="text-xl md:text-2xl text-accent-3 animate-fade-in-up-delay-3">
            {t("title")}
          </div>
          <div className="text-md md:text-lg text-neutral-3 max-w-xl animate-fade-in-up-delay-3">
            {t("subtitle")}
          </div>
          <div className="flex gap-4 mt-8 animate-fade-in-up-delay-4">
            <Button>{t("cta1")}</Button>
            <Button variant={"decorated"}>{t("cta2")}</Button>
          </div>
        </div>

        <div className="flex justify-center items-center animate-fade-in-scale">
          <div className="relative w-80 h-80">
            {/* Cercles rotatifs */}
            <div className="absolute inset-0 rounded-full border-2 border-mint-5/30 animate-rotate-slow" />
            <div className="absolute inset-4 rounded-full border-2 border-sand-5/40 animate-rotate-reverse" />
            <div className="absolute inset-8 rounded-full border-2 border-accent-5/50 animate-rotate-fast" />

            {/* Code symbolique au centre */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl text-mint-4 animate-pulse font-mono">
                &lt;/&gt;
              </div>
            </div>

            {/* Particules flottantes */}
            <div className="absolute w-2 h-2 bg-mint-4 rounded-full top-[20%] left-[10%] animate-float-1" />
            <div className="absolute w-2 h-2 bg-mint-4 rounded-full top-[32%] left-[25%] animate-float-2" />
            <div className="absolute w-2 h-2 bg-mint-4 rounded-full top-[44%] left-[40%] animate-float-3" />
            <div className="absolute w-2 h-2 bg-mint-4 rounded-full top-[56%] left-[55%] animate-float-4" />
            <div className="absolute w-2 h-2 bg-mint-4 rounded-full top-[68%] left-[70%] animate-float-5" />
            <div className="absolute w-2 h-2 bg-mint-4 rounded-full top-[80%] left-[85%] animate-float-6" />
          </div>
        </div>
      </div>
    </section>
  );
};
