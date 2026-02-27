import { ExternalLink } from "lucide-react";
import { ScrollAnimate } from "./ScrollAnimate";
import { useLanguage } from "@/i18n/LanguageContext";

const Footer = () => {
  const { t, perspective } = useLanguage();

  const footerNames = perspective === "bride"
    ? `${t("hero.brideName")} & ${t("hero.groomName")}`
    : t("footer.names");

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
          {footerNames}
        </h3>

        <div className="mt-8 flex justify-center">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        <p className="mt-6 font-sans text-xs text-muted-foreground/60">
          {t("footer.madeWithLove")}
        </p>

        {/* Portfolio promo card */}
        <div className="mt-10 max-w-sm mx-auto glass rounded-2xl border border-primary/10 px-6 py-5">
          <p className="font-sans text-sm text-muted-foreground mb-3">
            {t("footer.promoTitle")}
          </p>
          <a
            href="https://l-akshmikanth.github.io/l-akshmikanth/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans text-sm font-medium gold-shimmer-text hover:opacity-80 transition-opacity"
          >
            {t("footer.promoLink")}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </ScrollAnimate>
    </footer>
  );
};

export default Footer;
