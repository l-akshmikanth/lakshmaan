import { useState } from "react";
import { Heart } from "lucide-react";
import { useMusic } from "@/hooks/use-music";
import { useLanguage } from "@/i18n/LanguageContext";

interface BloomingHeart {
  id: number;
  variant: "left" | "right";
}

const HeartbeatButton = () => {
  const [isBeating, setIsBeating] = useState(false);
  const [bloomingHearts, setBloomingHearts] = useState<BloomingHeart[]>([]);
  const [showNameMerge, setShowNameMerge] = useState(false);
  const { playing, pause, play } = useMusic();
  const { t, language } = useLanguage();

  const vibrate = (pattern: number[]) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const handleClick = () => {
    if (isBeating) return;

    setIsBeating(true);
    setShowNameMerge(true);

    // Spawn two hearts representing the couple
    const timestamp = Date.now();
    const newHearts: BloomingHeart[] = [
      { id: timestamp, variant: "left" },
      { id: timestamp + 1, variant: "right" },
    ];
    setBloomingHearts((prev) => [...prev, ...newHearts]);

    // Remove hearts after animation completes
    setTimeout(() => {
      setBloomingHearts((prev) =>
        prev.filter((h) => h.id !== timestamp && h.id !== timestamp + 1)
      );
    }, 3000);

    // Hide name merge after animation completes
    setTimeout(() => {
      setShowNameMerge(false);
    }, 3500);

    // Pause music
    const wasPlaying = playing;
    if (wasPlaying) {
      pause();
    }

    // Heartbeat pattern: lub-dub repeated twice
    // First cycle: LUB (200ms) - pause (70ms) - DUB (150ms)
    // Short pause between cycles: 300ms
    // Second cycle: LUB (200ms) - pause (70ms) - DUB (150ms)
    vibrate([200, 70, 150, 300, 200, 70, 150]);

    // Resume music after heartbeat sequence (2 lub-dubs)
    setTimeout(() => {
      setIsBeating(false);
      if (wasPlaying) {
        play();
      }
    }, 2800); // Animation duration + small buffer
  };

  // Get names based on language
  const groomName = t("hero.groomName"); // Lakshmikanth / ಲಕ್ಷ್ಮೀಕಾಂತ್
  const brideName = t("hero.brideName"); // Maanya / ಮಾನ್ಯ
  const combinedName = language === "kn" ? "ಲಕ್ಷ್ಮಣ್" : "LakshMaan";

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isBeating}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full glass flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group disabled:cursor-not-allowed"
        aria-label={t("heartbeat.aria")}
      >
        <Heart
          className={`w-7 h-7 text-red-500 fill-red-500/80 transition-all ${
            isBeating ? "animate-heartbeat-pulse" : "group-hover:scale-110"
          }`}
        />
        {isBeating && (
          <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-heartbeat-ring" />
        )}
      </button>

      {/* Double Heart Bloom Effect - representing the couple */}
      {bloomingHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed bottom-[38px] left-[38px] z-50 pointer-events-none"
          style={{
            animation: `heart-bloom-${heart.variant} 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
          }}
        >
          <Heart
            className={`w-6 h-6 fill-current ${
              heart.variant === "left" 
                ? "text-red-500" 
                : "text-gold"
            }`}
            style={{
              filter: heart.variant === "left" 
                ? "drop-shadow(0 2px 8px rgba(239, 68, 68, 0.4))" 
                : "drop-shadow(0 2px 8px rgba(234, 179, 8, 0.4))",
            }}
          />
        </div>
      ))}

      {/* Name Merge Animation - Lakshmikanth + Maanya = Lakshmaan */}
      {showNameMerge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          {/* Soft full-screen backdrop blur */}
          <div
            className="absolute inset-0 animate-heart-backdrop-fade"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 40%, transparent 70%)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          {/* Proper heart-shaped backdrop with pulse */}
          <svg
            className="absolute animate-heart-backdrop-pulse"
            viewBox="0 0 512 512"
            width="420"
            height="420"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <defs>
              <radialGradient id="heart-bg-grad" cx="50%" cy="45%" r="55%">
                <stop offset="0%"  stopColor="rgba(255,255,255,0.97)" />
                <stop offset="50%" stopColor="rgba(255,240,240,0.92)" />
                <stop offset="85%" stopColor="rgba(255,230,230,0.80)" />
                <stop offset="100%" stopColor="rgba(255,220,220,0)" />
              </radialGradient>
              <filter id="heart-blur">
                <feGaussianBlur stdDeviation="8" />
              </filter>
            </defs>
            {/* Heart path using cubic bézier curves */}
            <path
              d="M256 448
                 C200 400, 16 304, 16 192
                 C16 112, 80 48, 160 48
                 C208 48, 240 80, 256 112
                 C272 80, 304 48, 352 48
                 C432 48, 496 112, 496 192
                 C496 304, 312 400, 256 448Z"
              fill="url(#heart-bg-grad)"
              filter="url(#heart-blur)"
            />
            {/* Sharper inner heart for definition */}
            <path
              d="M256 430
                 C205 385, 32 296, 32 192
                 C32 120, 90 58, 160 58
                 C206 58, 238 86, 256 118
                 C274 86, 306 58, 352 58
                 C422 58, 480 120, 480 192
                 C480 296, 307 385, 256 430Z"
              fill="rgba(255,245,245,0.5)"
            />
          </svg>
          
          <div className="relative w-full max-w-2xl text-center">
            {/* Hearts merging above names */}
            {/* Left heart (red) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                animation: "heart-merge-visual-left 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
              }}
            >
              <Heart className="w-12 h-12 fill-current text-red-500" />
            </div>

            {/* Right heart (yellow) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                animation: "heart-merge-visual-right 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
              }}
            >
              <Heart className="w-12 h-12 fill-current text-yellow-400" />
            </div>

            {/* Combined heart (red) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                animation: "heart-combine-visual 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
              }}
            >
              <Heart className="w-16 h-16 fill-current text-red-500 drop-shadow-2xl" />
            </div>

            {/* Groom name from left (red) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                animation: "name-merge-left 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
              }}
            >
              <span className="font-serif text-3xl md:text-4xl font-bold text-red-500 drop-shadow-lg">
                {groomName}
              </span>
            </div>

            {/* Bride name from right (yellow) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                animation: "name-merge-right 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
              }}
            >
              <span className="font-serif text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-lg">
                {brideName}
              </span>
            </div>

            {/* Combined name appears (gold - mix of brown + yellow) */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                animation: "name-combine 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
              }}
            >
              <span className="font-serif text-4xl md:text-5xl font-bold gold-text drop-shadow-2xl">
                {combinedName}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeartbeatButton;
