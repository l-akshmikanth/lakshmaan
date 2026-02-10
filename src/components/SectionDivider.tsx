import { ScrollAnimate } from "./ScrollAnimate";

const SectionDivider = () => (
  <ScrollAnimate className="flex justify-center py-4" variant="scale">
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
  </ScrollAnimate>
);

export default SectionDivider;
