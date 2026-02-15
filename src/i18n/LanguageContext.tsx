import { createContext, useContext, useCallback, useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { translations, type Language, type TranslationStrings } from "./translations";

export type Perspective = "bride" | "groom";

interface LanguageContextType {
  language: Language;
  perspective: Perspective;
  toggleLanguage: () => void;
  t: (key: keyof TranslationStrings) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive language from URL path: /kn → Kannada, everything else → English
  const language: Language = location.pathname.startsWith("/kn") ? "kn" : "en";

  // Derive perspective from URL path: /en/bride or /kn/bride → "bride", otherwise "groom"
  const perspective: Perspective = location.pathname.includes("/bride") ? "bride" : "groom";

  // Sync the <html lang="..."> attribute so CSS :lang() selectors work
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = useCallback(() => {
    const newLang = language === "kn" ? "en" : "kn";
    // Preserve perspective segment when switching language
    const perspectiveSuffix = perspective === "bride" ? "/bride" : perspective === "groom" && location.pathname.includes("/groom") ? "/groom" : "";
    navigate(`/${newLang}${perspectiveSuffix}`);
  }, [language, perspective, location.pathname, navigate]);

  const t = useCallback(
    (key: keyof TranslationStrings): string => {
      return translations[language][key] ?? key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, perspective, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
