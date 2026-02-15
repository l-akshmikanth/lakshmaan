import { ScrollAnimate } from "./ScrollAnimate";

/** Small decorative petal used beside the divider wave */
const MiniPetal = ({ className = "" }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    className={`text-primary/20 animate-float ${className}`}
  >
    <path
      d="M12 2 C6 8, 4 14, 12 22 C20 14, 18 8, 12 2Z"
      fill="currentColor"
    />
  </svg>
);

const SectionDivider = () => (
  <ScrollAnimate className="flex items-center justify-center gap-3 py-6" variant="scale">
    <MiniPetal className="-rotate-45 opacity-0 [.visible_&]:opacity-100 transition-opacity duration-700 delay-500" />
    <svg
      width="120"
      height="24"
      viewBox="0 0 120 24"
      className="text-primary/30"
      fill="none"
    >
      <path
        d="M0 12 Q15 2 30 12 Q45 22 60 12 Q75 2 90 12 Q105 22 120 12"
        stroke="currentColor"
        strokeWidth="1"
        className="divider-draw"
      />
      <circle cx="60" cy="12" r="2.5" fill="currentColor" className="divider-dot" />
      <circle cx="30" cy="12" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="90" cy="12" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
    <MiniPetal className="rotate-45 opacity-0 [.visible_&]:opacity-100 transition-opacity duration-700 delay-700" />
  </ScrollAnimate>
);

export default SectionDivider;
