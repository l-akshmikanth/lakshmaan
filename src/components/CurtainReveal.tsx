import { useState } from "react";

const CurtainReveal = ({ onOpen }: { onOpen: () => void }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(onOpen, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 cursor-pointer"
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleOpen()}
      aria-label="Tap to open invitation"
    >
      {/* Left curtain */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 curtain-texture shadow-2xl ${
          isOpening ? "animate-curtain-left" : ""
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
        {/* Vertical fabric folds */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-y-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ left: `${i * 20 + 10}%`, width: "8%" }}
            />
          ))}
        </div>
      </div>

      {/* Right curtain */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 curtain-texture shadow-2xl ${
          isOpening ? "animate-curtain-right" : ""
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10" />
        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-y-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ left: `${i * 20 + 10}%`, width: "8%" }}
            />
          ))}
        </div>
      </div>

      {/* Center text */}
      {!isOpening && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <p className="font-serif text-warm-white text-lg md:text-xl tracking-[0.3em] uppercase animate-pulse-glow">
            Tap to Open
          </p>
          <div className="mt-4 w-16 h-[1px] bg-warm-white/40" />
          <p className="mt-3 font-serif text-warm-white/60 text-sm italic">
            Lakshmikanth & Maanya
          </p>
        </div>
      )}
    </div>
  );
};

export default CurtainReveal;
