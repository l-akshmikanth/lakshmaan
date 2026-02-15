import { useLanguage } from "@/i18n/LanguageContext";

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-primary/40 bg-background/60 backdrop-blur-sm text-sm font-semibold transition-all duration-300 hover:border-primary/80 hover:bg-primary/10 hover:scale-105 active:scale-95 select-none"
      aria-label={language === "kn" ? "Switch to English" : "ಕನ್ನಡಕ್ಕೆ ಬದಲಿಸಿ"}
      title={language === "kn" ? "Switch to English" : "ಕನ್ನಡಕ್ಕೆ ಬದಲಿಸಿ"}
    >
      <span
        className="transition-all duration-300"
        style={{ color: "hsl(43 76% 52%)" }}
      >
        {language === "kn" ? "EN" : "ಕ"}
      </span>
    </button>
  );
};

export default LanguageToggle;
