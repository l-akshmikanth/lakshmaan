import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const buildTransitionFrames = (sequence: string[]) => {
  if (sequence.length === 0) return [];

  let current = sequence[0];
  const frames: string[] = [];

  for (let i = 1; i < sequence.length; i += 1) {
    const next = sequence[i];
    let prefix = 0;

    while (
      prefix < current.length &&
      prefix < next.length &&
      current[prefix] === next[prefix]
    ) {
      prefix += 1;
    }

    for (let j = current.length; j > prefix; j -= 1) {
      frames.push(current.slice(0, j - 1));
    }

    for (let j = prefix + 1; j <= next.length; j += 1) {
      frames.push(next.slice(0, j));
    }

    current = next;
  }

  return frames;
};

const DEFAULT_DURATION_MS = 3600;
const INITIAL_HOLD_MS = 450;

const TypingIntro = ({
  sequence,
  totalDurationMs = DEFAULT_DURATION_MS,
  onComplete,
  fading = false,
  showBackdrop = true,
  subtitle = "",
}: {
  sequence: string[];
  totalDurationMs?: number;
  onComplete: () => void;
  fading?: boolean;
  showBackdrop?: boolean;
  subtitle?: string;
}) => {
  const [text, setText] = useState(sequence[0] ?? "");
  const [showFinal, setShowFinal] = useState(false);

  const frames = useMemo(() => buildTransitionFrames(sequence), [sequence]);

  useEffect(() => {
    if (sequence.length === 0) return;

    setText(sequence[0]);

    if (frames.length === 0) {
      onComplete();
      return;
    }

    const typingDuration = Math.max(800, totalDurationMs - INITIAL_HOLD_MS);
    const stepDuration = Math.max(24, Math.floor(typingDuration / frames.length));
    const timers: number[] = [];
    let index = 0;

    const scheduleNext = () => {
      setText(frames[index]);
      index += 1;

      if (index < frames.length) {
        timers.push(window.setTimeout(scheduleNext, stepDuration));
      } else {
        timers.push(window.setTimeout(() => {
          setShowFinal(true);
          timers.push(window.setTimeout(onComplete, 800));
        }, 250));
      }
    };

    timers.push(window.setTimeout(scheduleNext, INITIAL_HOLD_MS));

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [frames, onComplete, sequence, totalDurationMs]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex items-center justify-center px-6 text-center pointer-events-none",
        "transition-opacity duration-700",
        fading ? "opacity-0" : "opacity-100"
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0",
          showBackdrop
            ? "bg-[radial-gradient(ellipse_at_center,_hsl(43_40%_20%)_0%,_hsl(30_30%_10%)_100%)]"
            : "bg-transparent"
        )}
      />
      <div className="relative pointer-events-none -mt-32">
        {!showFinal ? (
          <p className="font-serif text-3xl md:text-5xl tracking-[0.25em] gold-text animate-text-reveal">
            <span className="animate-cursor-blink pr-1">{text}</span>
          </p>
        ) : (
          subtitle ? (
            <p
              className="font-sans text-sm md:text-base tracking-[0.3em] text-primary/60 animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              {subtitle}
            </p>
          ) : null
        )}
      </div>
    </div>
  );
};
export default TypingIntro;
