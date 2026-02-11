import { useRef, useState, useEffect, useCallback } from "react";

interface ScratchRevealProps {
  text: string;
  width?: number;
  height?: number;
}

const ScratchReveal = ({ text, width = 220, height = 32 }: ScratchRevealProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

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

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const scratch = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isScratching || revealed) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const { x, y } = getPos(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.fill();

      // Check scratch percentage
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let cleared = 0;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) cleared++;
      }
      const pct = cleared / (imageData.data.length / 4);
      if (pct > 0.45) {
        setRevealed(true);
      }
    },
    [isScratching, revealed]
  );

  const startScratch = () => setIsScratching(true);
  const stopScratch = () => setIsScratching(false);

  return (
    <div className="relative inline-flex flex-col items-center">
      <div className="relative" style={{ width, height }}>
        <span
          className={`absolute inset-0 flex items-center justify-center font-sans text-sm text-muted-foreground transition-opacity duration-500 ${
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
          Scratch to reveal
        </span>
      )}
    </div>
  );
};

export default ScratchReveal;
