import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";

// Import all assets that need preloading
import heroPhoto from "@/assets/hero-couple.jpg";
import engagement1 from "@/assets/engagement-1.jpg";
import engagement2 from "@/assets/engagement-2.jpg";
import engagement3 from "@/assets/engagement-3.jpg";
import engagement4 from "@/assets/engagement-4.jpg";
import engagement5 from "@/assets/engagement-5.jpg";
import engagement6 from "@/assets/engagement-6.jpg";
import weddingMusic from "@/assets/wedding-music.mp3";

const PRELOAD_IMAGES = [heroPhoto, engagement1, engagement2, engagement3, engagement4, engagement5, engagement6];
const SAFETY_TIMEOUT_MS = 4000;

const CurtainReveal = ({
  onRevealStart,
  onRevealComplete,
}: {
  onRevealStart: () => void;
  onRevealComplete: () => void;
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [fading, setFading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { t, perspective } = useLanguage();

  // Preload all images and audio before enabling the ribbon
  useEffect(() => {
    let cancelled = false;

    const imagePromises = PRELOAD_IMAGES.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // resolve even on error so we don't block
          img.src = src;
        })
    );

    const audioPromise = new Promise<void>((resolve) => {
      const audio = new Audio();
      audio.preload = "auto";
      audio.oncanplaythrough = () => resolve();
      audio.onerror = () => resolve();
      audio.src = weddingMusic;
    });

    // Safety timeout — force-enable after 4s
    const safetyTimer = setTimeout(() => {
      if (!cancelled) setLoaded(true);
    }, SAFETY_TIMEOUT_MS);

    Promise.all([...imagePromises, audioPromise]).then(() => {
      if (!cancelled) setLoaded(true);
    });

    return () => {
      cancelled = true;
      clearTimeout(safetyTimer);
    };
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    // Immediately tell the parent to start revealing the page behind
    onRevealStart();
    // Phase 1: Curtains slide open (1300ms)
    // Phase 2: Entire overlay fades out (900ms)
    setTimeout(() => setFading(true), 1300);
    // After full animation, tell parent to unmount us
    setTimeout(onRevealComplete, 2200);
  };

  // Generate fabric fold strips for realistic draping
  const renderFolds = (side: "left" | "right") => {
    const folds = 10;
    return Array.from({ length: folds }, (_, i) => {
      const position = (i / folds) * 100;
      const isLight = i % 2 === 0;
      return (
        <div
          key={i}
          className="absolute top-0 bottom-0"
          style={{
            left: `${position}%`,
            width: `${100 / folds}%`,
            background: isLight
              ? `linear-gradient(90deg, 
                  hsl(43 70% 35% / 0.0) 0%,
                  hsl(43 76% 52% / 0.15) 40%,
                  hsl(43 60% 60% / 0.2) 50%,
                  hsl(43 76% 52% / 0.1) 60%,
                  hsl(43 70% 35% / 0.0) 100%)`
              : `linear-gradient(90deg, 
                  hsl(43 70% 35% / 0.0) 0%,
                  hsl(43 80% 30% / 0.2) 30%,
                  hsl(43 80% 25% / 0.3) 50%,
                  hsl(43 80% 30% / 0.2) 70%,
                  hsl(43 70% 35% / 0.0) 100%)`,
          }}
        />
      );
    });
  };

  // Top gathered pleats
  const renderPleats = () =>
    Array.from({ length: 14 }, (_, i) => (
      <div
        key={i}
        className="absolute top-0"
        style={{
          left: `${i * 7.14}%`,
          width: "7.14%",
          height: "100%",
          background: `radial-gradient(ellipse at 50% 0%, 
            hsl(43 80% 25% / 0.35) 0%, 
            transparent 70%)`,
        }}
      />
    ));

  return (
    <div className={`fixed inset-0 z-50 ${fading ? "curtain-fade-out" : ""}`} aria-label={t("curtain.aria")}>
      {/* Language toggle */}
      <div className="absolute top-6 right-6 z-40">
        <LanguageToggle />
      </div>

      {/* Dark background behind curtains — fades out as curtains slide apart */}
      <div
        className={`absolute inset-0 ${isOpening ? "curtain-bg-fade" : ""}`}
        style={{
          background: `radial-gradient(ellipse at center, hsl(43 40% 20%) 0%, hsl(30 30% 10%) 100%)`,
        }}
      />

      {/* Decorative curtain rod — fades with background */}
      <div
        className={`absolute top-0 left-0 right-0 z-30 h-5 ${isOpening ? "curtain-bg-fade" : ""}`}
        style={{
          background: `linear-gradient(180deg, 
            hsl(43 76% 58%) 0%, 
            hsl(43 70% 45%) 40%, 
            hsl(43 80% 38%) 70%, 
            hsl(43 60% 30%) 100%)`,
          boxShadow: "0 4px 12px hsl(43 80% 20% / 0.6)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-white/30 to-transparent" />
      </div>

      {/* Left curtain */}
      <div
        className={`absolute top-5 bottom-0 left-0 w-[52%] z-20 curtain-panel ${
          isOpening ? "curtain-open-left" : ""
        }`}
      >
        {/* Base gold fabric */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(170deg,
              hsl(43 76% 52%) 0%,
              hsl(43 65% 45%) 25%,
              hsl(43 70% 42%) 50%,
              hsl(43 65% 45%) 75%,
              hsl(43 76% 52%) 100%)`,
          }}
        />

        {/* Vertical fabric folds */}
        {renderFolds("left")}

        {/* Top pleats */}
        <div className="absolute top-0 left-0 right-0 h-28">
          {renderPleats()}
        </div>

        {/* Inner shadow for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />

        {/* Subtle sheen */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(135deg, 
              transparent 20%, 
              hsl(43 60% 70% / 0.3) 45%, 
              transparent 55%)`,
          }}
        />

        {/* Bottom weight/hem */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/25 to-transparent" />

        {/* Gold fringe on inner edge */}
        <div
          className="absolute top-0 bottom-0 right-0 w-2"
          style={{
            background: `repeating-linear-gradient(180deg,
              hsl(43 76% 52%) 0px, 
              hsl(43 80% 38%) 4px, 
              hsl(43 60% 60%) 8px)`,
          }}
        />
      </div>

      {/* Right curtain */}
      <div
        className={`absolute top-5 bottom-0 right-0 w-[52%] z-20 curtain-panel ${
          isOpening ? "curtain-open-right" : ""
        }`}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(190deg,
              hsl(43 76% 52%) 0%,
              hsl(43 65% 45%) 25%,
              hsl(43 70% 42%) 50%,
              hsl(43 65% 45%) 75%,
              hsl(43 76% 52%) 100%)`,
          }}
        />

        {renderFolds("right")}

        <div className="absolute top-0 left-0 right-0 h-28">
          {renderPleats()}
        </div>

        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20" />

        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(225deg, 
              transparent 20%, 
              hsl(43 60% 70% / 0.3) 45%, 
              transparent 55%)`,
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/25 to-transparent" />

        <div
          className="absolute top-0 bottom-0 left-0 w-2"
          style={{
            background: `repeating-linear-gradient(180deg,
              hsl(43 76% 52%) 0px, 
              hsl(43 80% 38%) 4px, 
              hsl(43 60% 60%) 8px)`,
          }}
        />
      </div>

      {/* Red ribbon with bow — click target */}
      {!isOpening && (
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group transition-opacity duration-500 ${
            loaded ? "cursor-pointer opacity-100" : "pointer-events-none opacity-40"
          }`}
          onClick={loaded ? handleOpen : undefined}
          role="button"
          tabIndex={loaded ? 0 : -1}
          onKeyDown={(e) => loaded && e.key === "Enter" && handleOpen()}
          aria-label={t("curtain.pullRibbon")}
        >
          {/* Ribbon tails */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-1">
            <div
              className="w-5 h-24 rounded-b-full -rotate-6 shadow-lg"
              style={{
                background: `linear-gradient(180deg, hsl(0 70% 45%) 0%, hsl(0 75% 35%) 100%)`,
              }}
            />
            <div
              className="w-5 h-28 rounded-b-full rotate-6 shadow-lg"
              style={{
                background: `linear-gradient(180deg, hsl(0 70% 45%) 0%, hsl(0 75% 35%) 100%)`,
              }}
            />
          </div>

          {/* Bow left */}
          <div
            className="absolute -left-12 top-0 w-12 h-8 rounded-full -rotate-12 shadow-md"
            style={{
              background: `linear-gradient(135deg, hsl(0 65% 50%) 0%, hsl(0 70% 40%) 100%)`,
              border: "1px solid hsl(0 50% 55% / 0.4)",
            }}
          />
          {/* Bow right */}
          <div
            className="absolute -right-12 top-0 w-12 h-8 rounded-full rotate-12 shadow-md"
            style={{
              background: `linear-gradient(225deg, hsl(0 65% 50%) 0%, hsl(0 70% 40%) 100%)`,
              border: "1px solid hsl(0 50% 55% / 0.4)",
            }}
          />

          {/* Center knot */}
          <div
            className="relative w-9 h-9 rounded-full shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            style={{
              background: `radial-gradient(circle at 40% 35%, hsl(0 60% 55%), hsl(0 75% 35%))`,
              border: "2px solid hsl(0 50% 55% / 0.5)",
            }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: `hsl(43 76% 52%)` }}
            />
          </div>

          {/* Pulsing glow ring */}
          <div
            className="absolute -inset-6 rounded-full animate-pulse-glow pointer-events-none"
            style={{ background: `hsl(0 60% 50% / 0.15)` }}
          />

          {/* Text */}
          <p
            className="absolute top-44 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-sm tracking-[0.2em] uppercase animate-pulse-glow"
            style={{ color: `hsl(43 60% 70%)` }}
          >
            {loaded ? t("curtain.pullRibbon") : "Loading..."}
          </p>
          <p
            className="absolute top-52 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-xs italic"
            style={{ color: `hsl(43 60% 70% / 0.5)` }}
          >
            {perspective === "bride"
              ? `${t("hero.brideName")} & ${t("hero.groomName")}`
              : t("curtain.names")}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurtainReveal;
