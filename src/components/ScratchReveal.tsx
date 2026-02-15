import { useRef, useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

interface ScratchRevealProps {
  text: string;
  width?: number;
  height?: number;
}

const ScratchReveal = ({ text, width = 260, height = 36 }: ScratchRevealProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Gold shimmer gradient
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "#b8860b");
    gradient.addColorStop(0.3, "#daa520");
    gradient.addColorStop(0.5, "#ffd700");
    gradient.addColorStop(0.7, "#daa520");
    gradient.addColorStop(1, "#b8860b");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add sparkle dots
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + Math.random() * 0.4})`;
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [width, height, revealed]);

  // Auto-reveal fallback after 5 seconds
  useEffect(() => {
    if (revealed) return;
    const timer = setTimeout(() => setRevealed(true), 5000);
    return () => clearTimeout(timer);
  }, [revealed]);

  const getPos = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  }, []);

  const doScratch = useCallback(
    (x: number, y: number) => {
      if (revealed) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fill();

      // Check scratch percentage
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let cleared = 0;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) cleared++;
      }
      const pct = cleared / (imageData.data.length / 4);
      if (pct > 0.30) {
        setRevealed(true);
      }
    },
    [revealed]
  );

  const scratch = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isScratching || revealed) return;
      const { x, y } = getPos(e);
      doScratch(x, y);
    },
    [isScratching, revealed, getPos, doScratch]
  );

  const startScratch = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      setIsScratching(true);
      // Immediate scratch on tap/click
      const { x, y } = getPos(e);
      doScratch(x, y);
    },
    [getPos, doScratch]
  );

  const stopScratch = () => setIsScratching(false);

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="relative" style={{ width, height }}>
        <span
          className={`absolute inset-0 flex items-center justify-center font-sans text-sm font-semibold text-foreground transition-opacity duration-500 ${
            revealed ? "opacity-100" : "opacity-0"
          }`}
        >
          {text}
        </span>
        {!revealed && (
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="absolute inset-0 rounded-md cursor-grab active:cursor-grabbing touch-none"
            style={{ width, height }}
            onMouseDown={startScratch}
            onMouseUp={stopScratch}
            onMouseLeave={stopScratch}
            onMouseMove={scratch}
            onTouchStart={startScratch}
            onTouchEnd={stopScratch}
            onTouchMove={scratch}
          />
        )}
      </div>
      {!revealed && (
        <span className="text-[10px] text-primary/50 mt-1 tracking-wider uppercase animate-pulse">
          {t("scratch.instruction")}
        </span>
      )}
    </div>
  );
};

export default ScratchReveal;
