import { ScrollAnimate } from "./ScrollAnimate";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-20 px-6 text-center">
      <ScrollAnimate>
        {/* Decorative ornament with draw animation */}
        <div className="flex justify-center mb-8">
          <svg width="120" height="40" viewBox="0 0 120 40" className="text-primary/40">
            <path
              d="M10 20 Q30 5 60 20 Q90 35 110 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="divider-draw"
            />
            <path
              d="M20 20 Q45 10 60 20 Q75 30 100 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="divider-draw"
              style={{ animationDelay: "0.3s" }}
            />
            <circle cx="60" cy="20" r="3" fill="currentColor" className="divider-dot" />
          </svg>
        </div>

        <p className="font-sans text-sm text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
          {t("footer.message")}
        </p>

        <h3 className="font-serif text-2xl md:text-3xl gold-shimmer-text font-semibold">
          {t("footer.names")}
        </h3>

        <div className="mt-8 flex justify-center">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        <p className="mt-6 font-sans text-xs text-muted-foreground/60">
          {t("footer.madeWithLove")}
        </p>
      </ScrollAnimate>
    </footer>
  );
};

export default Footer;
