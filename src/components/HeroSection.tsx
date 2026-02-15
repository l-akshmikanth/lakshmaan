import { useEffect, useState } from "react";
import { ScrollAnimate } from "./ScrollAnimate";
import { useLanguage } from "@/i18n/LanguageContext";
import heroPhoto from "@/assets/hero-couple.jpg";

const HeroSection = () => {
  const [showName, setShowName] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showDivider, setShowDivider] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    const t1 = setTimeout(() => setShowName(true), 300);
    const t2 = setTimeout(() => setShowDivider(true), 1200);
    const t3 = setTimeout(() => setShowDate(true), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const groomName = t("hero.groomName");
  const brideName = t("hero.brideName");

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroPhoto}
          alt=""
          className="w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      </div>

      {/* Floating gold particles */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/30"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle-rise ${5 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      {/* Photo with rotating rings */}
      <div className="relative mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        {/* Outer rotating ring */}
        <div className="absolute -inset-4 rounded-full border border-primary/20 animate-rotate-slow" />
        {/* Inner counter-rotating ring */}
        <div className="absolute -inset-2 rounded-full border border-dashed border-primary/15 animate-rotate-slow-reverse" />
        {/* Pulsing glow ring */}
        <div className="absolute -inset-6 rounded-full border border-primary/10 animate-ring-pulse" />

        <div className="w-44 h-44 md:w-56 md:h-56 rounded-full border-4 border-primary/50 overflow-hidden shadow-lg shadow-primary/20 relative z-10">
          <img src={heroPhoto} alt={t("hero.photoAlt")} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Names with shimmer */}
      {showName && (
        <div className="text-center">
          {language === "kn" ? (
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide gold-text animate-fade-in">
              {groomName}
            </h1>
          ) : (
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide">
              {groomName.split("").map((char, i) => (
                <span
                  key={`g-${i}`}
                  className="inline-block gold-text animate-fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {char}
                </span>
              ))}
            </h1>
          )}
          <p
            className="font-serif text-2xl md:text-3xl text-primary/60 my-3 animate-fade-in italic animate-float"
            style={{ animationDelay: "0.8s" }}
          >
            {t("hero.and")}
          </p>
          {language === "kn" ? (
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide gold-text animate-fade-in" style={{ animationDelay: "0.8s" }}>
              {brideName}
            </h1>
          ) : (
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide">
              {brideName.split("").map((char, i) => (
                <span
                  key={`b-${i}`}
                  className="inline-block gold-text animate-fade-in"
                  style={{ animationDelay: `${800 + i * 60}ms` }}
                >
                  {char}
                </span>
              ))}
            </h1>
          )}
        </div>
      )}

      {/* Gold divider with shimmer */}
      {showDivider && (
        <div className="mt-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-divider-expand animate-shimmer" />
      )}

      {/* Date */}
      {showDate && (
        <p className="mt-6 font-sans text-lg md:text-xl tracking-[0.2em] uppercase text-muted-foreground animate-fade-up">
          {t("hero.date")}
        </p>
      )}

      {/* Scroll indicator */}
      {showDate && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-5 h-8 rounded-full border border-primary/30 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-primary/50 animate-fade-up" />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
