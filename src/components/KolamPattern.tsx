const KolamPattern = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    className={`text-primary/[0.04] ${className}`}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Center lotus */}
    <circle cx="100" cy="100" r="8" />
    {/* Petals */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <ellipse
        key={angle}
        cx="100"
        cy="70"
        rx="6"
        ry="20"
        transform={`rotate(${angle} 100 100)`}
      />
    ))}
    {/* Outer dots ring */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
      const r = 55;
      const x = 100 + r * Math.cos((angle * Math.PI) / 180);
      const y = 100 + r * Math.sin((angle * Math.PI) / 180);
      return <circle key={angle} cx={x} cy={y} r="3" />;
    })}
    {/* Diamond frame */}
    <path
      d="M100 20 L180 100 L100 180 L20 100 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Outer circle */}
    <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

export default KolamPattern;
