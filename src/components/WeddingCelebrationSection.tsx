import { ScrollAnimate } from "./ScrollAnimate";
import KolamPattern from "./KolamPattern";
import { useLanguage } from "@/i18n/LanguageContext";

const WeddingCelebrationSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 px-6 overflow-hidden" id="celebration">
      {/* Background kolam decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <KolamPattern className="w-[500px] h-[500px] text-primary/[0.04]" />
      </div>

      <div className="relative max-w-xl mx-auto text-center">
        {/* Animated badge */}
        <ScrollAnimate>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/20 mb-8">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary/60 animate-pulse" />
            <span className="font-sans text-sm tracking-wide gold-text font-medium">
              {t("celebration.badge")}
            </span>
          </div>
        </ScrollAnimate>

        {/* Heading */}
        <ScrollAnimate delay={150}>
          <h2 className="font-serif text-3xl md:text-4xl gold-text font-semibold mb-3">
            {t("celebration.heading")}
          </h2>

          {/* Decorative mangalya icon */}
          <div className="flex justify-center my-6">
            <svg width="80" height="32" viewBox="0 0 80 32" className="text-primary/40">
              <path
                d="M10 16 Q25 4 40 16 Q55 28 70 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="divider-draw"
              />
              <circle cx="40" cy="16" r="4" fill="currentColor" className="divider-dot" />
              <circle cx="40" cy="16" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" className="divider-dot" />
            </svg>
          </div>
        </ScrollAnimate>

        {/* Message */}
        <ScrollAnimate delay={300}>
          <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto">
            {t("celebration.message")}
          </p>
        </ScrollAnimate>

        {/* Gratitude */}
        <ScrollAnimate delay={450}>
          <p className="font-serif text-lg md:text-xl gold-shimmer-text font-medium">
            {t("celebration.gratitude")}
          </p>
        </ScrollAnimate>
      </div>
    </section>
  );
};

export default WeddingCelebrationSection;
