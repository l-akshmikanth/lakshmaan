import { ScrollAnimate } from "./ScrollAnimate";
import KolamPattern from "./KolamPattern";
import { useLanguage } from "@/i18n/LanguageContext";

const FamiliesSection = () => {
  const { t, perspective } = useLanguage();

  const groomFamily = (
    <ScrollAnimate variant={perspective === "bride" ? "right" : "left"} delay={perspective === "bride" ? 200 : 100} className="text-center">
      <p className="font-sans text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">
        {t("families.groomParents")}
      </p>
      <p className="font-serif text-2xl md:text-3xl text-foreground">
        {t("families.groomMother")}
      </p>
      <p className="font-serif text-lg text-primary/60 my-1">{t("families.and")}</p>
      <p className="font-serif text-2xl md:text-3xl text-foreground">
        {t("families.groomFather")}
      </p>
    </ScrollAnimate>
  );

  const brideFamily = (
    <ScrollAnimate variant={perspective === "bride" ? "left" : "right"} delay={perspective === "bride" ? 100 : 200} className="text-center">
      <p className="font-sans text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">
        {t("families.brideParents")}
      </p>
      <p className="font-serif text-2xl md:text-3xl text-foreground">
        {t("families.brideMother")}
      </p>
      <p className="font-serif text-lg text-primary/60 my-1">{t("families.and")}</p>
      <p className="font-serif text-2xl md:text-3xl text-foreground/70 italic">
        {t("families.brideFather")}
      </p>
      <p className="text-xs text-muted-foreground mt-1 animate-pulse-glow">{t("families.inMemory")}</p>
    </ScrollAnimate>
  );

  return (
    <section className="py-20 px-6 relative overflow-hidden" id="family">
      {/* Kolam watermark */}
      <KolamPattern className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-50 animate-parallax-drift" />

      <ScrollAnimate className="max-w-2xl mx-auto text-center relative z-10">
        <p className="font-sans text-sm tracking-[0.3em] uppercase text-muted-foreground mb-10">
          {t("families.blessing")}
        </p>
      </ScrollAnimate>

      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 relative z-10">
        {perspective === "bride" ? (
          <>
            {brideFamily}
            {groomFamily}
          </>
        ) : (
          <>
            {groomFamily}
            {brideFamily}
          </>
        )}
      </div>

      {/* Decorative divider */}
      <ScrollAnimate delay={400} className="flex justify-center mt-16">
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </ScrollAnimate>
    </section>
  );
};

export default FamiliesSection;
