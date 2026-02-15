import { useMemo } from "react";

/** A single petal's randomised style props */
interface PetalConfig {
  id: number;
  left: string;            // horizontal start %
  size: number;            // px
  opacity: number;
  duration: string;        // animation duration
  delay: string;           // animation delay
  swayClass: string;       // alternating sway direction
  rotate: number;          // initial rotation
}

const PETAL_COUNT = 10;

/**
 * Persistent full-viewport overlay of slowly drifting gold petal shapes.
 * Pure CSS animations — no JS scroll listeners.
 * `pointer-events: none` so nothing is blocked.
 */
const FloatingPetals = () => {
  const petals = useMemo<PetalConfig[]>(() => {
    return Array.from({ length: PETAL_COUNT }, (_, i) => ({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      size: 14 + Math.random() * 12,          // 14–26 px
      opacity: 0.07 + Math.random() * 0.08,   // 0.07–0.15
      duration: `${10 + Math.random() * 10}s`, // 10–20 s
      delay: `${-Math.random() * 20}s`,        // negative → starts mid-cycle so no blank gap
      swayClass: i % 2 === 0 ? "petal-drift-a" : "petal-drift-b",
      rotate: Math.floor(Math.random() * 360),
    }));
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {petals.map((p) => (
        <svg
          key={p.id}
          className={p.swayClass}
          width={p.size}
          height={p.size}
          viewBox="0 0 24 24"
          style={{
            position: "absolute",
            left: p.left,
            top: "-6%",
            opacity: p.opacity,
            animationDuration: p.duration,
            animationDelay: p.delay,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          {/* Organic petal / teardrop shape */}
          <path
            d="M12 2 C6 8, 4 14, 12 22 C20 14, 18 8, 12 2Z"
            fill="hsl(43 76% 52%)"
          />
        </svg>
      ))}
    </div>
  );
};

export default FloatingPetals;
