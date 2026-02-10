import { useEffect, useState } from "react";
import { ScrollAnimate } from "./ScrollAnimate";
import heroPhoto from "@/assets/hero-couple.jpg";

const HeroSection = () => {
  const [showName, setShowName] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showDivider, setShowDivider] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowName(true), 300);
    const t2 = setTimeout(() => setShowDivider(true), 1200);
    const t3 = setTimeout(() => setShowDate(true), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const groomName = "Lakshmikanth";
  const brideName = "Maanya";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Sparkle particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Photo placeholder */}
      <div className="relative mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="w-44 h-44 md:w-56 md:h-56 rounded-full border-4 border-primary/50 overflow-hidden shadow-lg shadow-primary/20">
          <img src={heroPhoto} alt="Lakshmikanth & Maanya" className="w-full h-full object-cover" />
        </div>
        <div className="absolute -inset-2 rounded-full border border-primary/20 animate-pulse" />
      </div>

      {/* Names */}
      {showName && (
        <div className="text-center">
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
          <p
            className="font-serif text-2xl md:text-3xl text-primary/60 my-3 animate-fade-in italic"
            style={{ animationDelay: "0.8s" }}
          >
            &
          </p>
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
        </div>
      )}

      {/* Gold divider */}
      {showDivider && (
        <div className="mt-8 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-divider-expand" />
      )}

      {/* Date */}
      {showDate && (
        <p
          className="mt-6 font-sans text-lg md:text-xl tracking-[0.2em] uppercase text-muted-foreground animate-fade-up"
        >
          March 2026
        </p>
      )}
    </section>
  );
};

export default HeroSection;
