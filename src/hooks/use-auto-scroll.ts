import { useEffect, useRef } from "react";

/**
 * Slowly auto-scrolls the page after `idleMs` of no user interaction.
 * If the user interacts (touch, wheel, key), scrolling pauses and
 * restarts after another `resumeIdleMs` of inactivity.
 */
const SCROLL_SPEED_PX_PER_SEC = 200;

// Only events that are 100% user-initiated.
// Avoid pointerdown/touchmove — they can fire from animated UI elements.
const USER_EVENTS: (keyof WindowEventMap)[] = [
  "wheel",
  "touchstart",
  "keydown",
];

export const useAutoScroll = (
  enabled: boolean,
  idleMs = 2000,
  resumeIdleMs = 3000
) => {
  const rafRef = useRef<number>(0);
  const timerRef = useRef<number>(0);
  const activeRef = useRef(false);
  const destroyedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    destroyedRef.current = false;

    const atBottom = () =>
      window.scrollY >=
      document.documentElement.scrollHeight - window.innerHeight - 1;

    const startScrolling = () => {
      if (destroyedRef.current || atBottom()) return;
      activeRef.current = true;
      let prev = performance.now();

      const step = (now: number) => {
        if (!activeRef.current || destroyedRef.current) return;

        const dt = (now - prev) / 1000;
        prev = now;

        // Clamp dt to avoid big jumps if the tab was backgrounded
        const clampedDt = Math.min(dt, 0.1);

        if (atBottom()) {
          pauseScrolling();
          return;
        }

        window.scrollBy(0, Math.round(SCROLL_SPEED_PX_PER_SEC * clampedDt));
        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    };

    const pauseScrolling = () => {
      activeRef.current = false;
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
      scheduleStart(resumeIdleMs);
    };

    const scheduleStart = (delay: number) => {
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        if (!destroyedRef.current) startScrolling();
      }, delay);
    };

    const onInteract = () => {
      if (activeRef.current) {
        pauseScrolling();
      } else {
        scheduleStart(resumeIdleMs);
      }
    };

    USER_EVENTS.forEach((e) =>
      window.addEventListener(e, onInteract, { passive: true })
    );

    scheduleStart(idleMs);

    return () => {
      destroyedRef.current = true;
      activeRef.current = false;
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
      USER_EVENTS.forEach((e) =>
        window.removeEventListener(e, onInteract)
      );
    };
  }, [enabled, idleMs, resumeIdleMs]);
};
