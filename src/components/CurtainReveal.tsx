import { useState } from "react";

const CurtainReveal = ({ onOpen }: { onOpen: () => void }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(onOpen, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50"
      aria-label="Wedding invitation curtain"
    >
      {/* Background behind curtains */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950 to-amber-900" />

      {/* Curtain rod */}
      <div className="absolute top-0 left-0 right-0 z-30 h-6 bg-gradient-to-b from-yellow-700 via-yellow-600 to-yellow-800 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-2" />
      </div>
      {/* Rod finials */}
      <div className="absolute top-0 left-0 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-800 z-40 shadow-lg -translate-x-1" />
      <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-800 z-40 shadow-lg translate-x-1" />

      {/* Left curtain */}
      <div
        className={`absolute top-6 bottom-0 left-0 w-[55%] z-20 transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-top-left ${
          isOpening ? "-translate-x-[110%] scale-x-50" : ""
        }`}
      >
        {/* Base fabric */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-800 via-red-700 to-red-900" />
        
        {/* Fabric folds - realistic draping effect */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              left: `${i * 12.5}%`,
              width: "12.5%",
              background: `linear-gradient(90deg, 
                rgba(0,0,0,0.15) 0%, 
                rgba(255,255,255,0.08) 30%, 
                rgba(255,255,255,0.12) 50%, 
                rgba(0,0,0,0.1) 70%, 
                rgba(0,0,0,0.2) 100%)`,
            }}
          />
        ))}

        {/* Top gathered pleats */}
        <div className="absolute top-0 left-0 right-0 h-32">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0"
              style={{
                left: `${i * 8.3}%`,
                width: "8.3%",
                height: "100%",
                background: `linear-gradient(180deg, 
                  rgba(0,0,0,0.25) 0%, 
                  rgba(255,255,255,0.06) 40%, 
                  transparent 100%)`,
                borderRadius: "0 0 50% 50%",
              }}
            />
          ))}
        </div>

        {/* Velvet sheen */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-black/15" />
        
        {/* Bottom hem weight */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-red-950 to-transparent" />
        
        {/* Gold trim on inner edge */}
        <div className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-r from-yellow-700/60 via-yellow-500/40 to-yellow-600/50" />
        
        {/* Tassel at inner edge */}
        <div className="absolute right-0 top-24">
          <div className="w-4 h-20 bg-gradient-to-b from-yellow-600 via-yellow-500 to-yellow-700 rounded-b-full shadow-md" />
          <div className="w-6 h-10 -ml-1 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-b-full opacity-80" />
        </div>
      </div>

      {/* Right curtain */}
      <div
        className={`absolute top-6 bottom-0 right-0 w-[55%] z-20 transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] origin-top-right ${
          isOpening ? "translate-x-[110%] scale-x-50" : ""
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-red-800 via-red-700 to-red-900" />
        
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0"
            style={{
              left: `${i * 12.5}%`,
              width: "12.5%",
              background: `linear-gradient(90deg, 
                rgba(0,0,0,0.2) 0%, 
                rgba(255,255,255,0.1) 30%, 
                rgba(255,255,255,0.08) 50%, 
                rgba(0,0,0,0.12) 70%, 
                rgba(0,0,0,0.15) 100%)`,
            }}
          />
        ))}

        <div className="absolute top-0 left-0 right-0 h-32">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0"
              style={{
                left: `${i * 8.3}%`,
                width: "8.3%",
                height: "100%",
                background: `linear-gradient(180deg, 
                  rgba(0,0,0,0.25) 0%, 
                  rgba(255,255,255,0.06) 40%, 
                  transparent 100%)`,
                borderRadius: "0 0 50% 50%",
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-l from-white/5 via-transparent to-black/15" />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-red-950 to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-l from-yellow-700/60 via-yellow-500/40 to-yellow-600/50" />
        
        <div className="absolute left-0 top-24">
          <div className="w-4 h-20 bg-gradient-to-b from-yellow-600 via-yellow-500 to-yellow-700 rounded-b-full shadow-md" />
          <div className="w-6 h-10 -ml-1 bg-gradient-to-b from-yellow-600 to-yellow-800 rounded-b-full opacity-80" />
        </div>
      </div>

      {/* Red ribbon bow in center */}
      {!isOpening && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && handleOpen()}
          aria-label="Pull ribbon to open invitation"
        >
          {/* Ribbon tails hanging down */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-5 h-28 bg-gradient-to-b from-red-600 via-red-500 to-red-700 rounded-b-full transform -rotate-6 shadow-lg" />
            <div className="w-5 h-32 bg-gradient-to-b from-red-600 via-red-500 to-red-700 rounded-b-full transform rotate-6 shadow-lg" />
          </div>

          {/* Bow left loop */}
          <div className="absolute -left-14 top-1 w-14 h-10 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 transform -rotate-12 shadow-md border border-red-400/30" />
          {/* Bow right loop */}
          <div className="absolute -right-14 top-1 w-14 h-10 rounded-full bg-gradient-to-bl from-red-500 via-red-600 to-red-700 transform rotate-12 shadow-md border border-red-400/30" />
          
          {/* Bow center knot */}
          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-800 shadow-xl border-2 border-red-400/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <div className="w-3 h-3 rounded-full bg-yellow-400/80 shadow-inner" />
          </div>

          {/* Pulsing glow */}
          <div className="absolute -inset-8 rounded-full bg-red-500/20 animate-pulse-glow pointer-events-none" />

          {/* Text below ribbon */}
          <p className="absolute top-52 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-yellow-200/90 text-sm tracking-[0.2em] uppercase animate-pulse-glow">
            Pull the ribbon
          </p>
          <p className="absolute top-60 left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-yellow-200/50 text-xs italic">
            Lakshmikanth & Maanya
          </p>
        </div>
      )}
    </div>
  );
};

export default CurtainReveal;
