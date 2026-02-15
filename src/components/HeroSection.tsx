import { useEffect, useState } from "react";
import { ScrollAnimate } from "./ScrollAnimate";
import { useLanguage } from "@/i18n/LanguageContext";
import heroPhoto from "@/assets/hero-couple.jpg";

const HeroSection = ({ revealed = false }: { revealed?: boolean }) => {
  const [showName, setShowName] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showDivider, setShowDivider] = useState(false);
  const { t, language, perspective } = useLanguage();

  useEffect(() => {
    if (!revealed) return;
    const t1 = setTimeout(() => setShowName(true), 300);
    const t2 = setTimeout(() => setShowDivider(true), 1200);
    const t3 = setTimeout(() => setShowDate(true), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [revealed]);

  const groomName = t("hero.groomName");
  const brideName = t("hero.brideName");

  // Swap name order based on perspective
  const firstName = perspective === "bride" ? brideName : groomName;
  const secondName = perspective === "bride" ? groomName : brideName;

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-end px-6 overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroPhoto}
          alt=""
          className="w-full h-full object-cover animate-ken-burns"
        />
        {/* Color fade — smooth transition from photo to site background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 via-[60%] to-background" />
      </div>

      {/* Floating gold petal particles */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {[...Array(15)].map((_, i) => (
          <svg
            key={i}
            className="absolute"
            width={6 + Math.random() * 8}
            height={6 + Math.random() * 8}
            viewBox="0 0 24 24"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.25 + Math.random() * 0.15,
              animation: `particle-rise ${5 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            <path
              d="M12 2 C6 8, 4 14, 12 22 C20 14, 18 8, 12 2Z"
              fill="hsl(43 76% 52%)"
            />
          </svg>
        ))}
      </div>

      {/* Names + date — anchored in the bottom 40% zone */}
      <div className="relative z-[2] pb-16 text-center">
      {showName && (
        <div>
          {language === "kn" ? (
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide gold-text animate-fade-in">
              {firstName}
            </h1>
          ) : (
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide">
              {firstName.split("").map((char, i) => (
                <span
                  key={`f-${i}`}
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
              {secondName}
            </h1>
          ) : (
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide">
              {secondName.split("").map((char, i) => (
                <span
                  key={`s-${i}`}
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
      </div>


    </section>
  );
};

export default HeroSection;
