import { useState, useEffect } from "react";
import { ScrollAnimate } from "./ScrollAnimate";

const MUHURTHAM_DATE = new Date("2026-03-08T10:30:00+05:30").getTime();

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = MUHURTHAM_DATE - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-20 px-6">
      <ScrollAnimate className="text-center mb-12">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Counting down to
        </p>
        <h2 className="font-serif text-3xl md:text-4xl gold-shimmer-text font-semibold">
          Muhurtha
        </h2>
      </ScrollAnimate>

      <div className="flex justify-center gap-3 md:gap-6 max-w-lg mx-auto">
        {units.map((unit, i) => (
          <ScrollAnimate key={unit.label} variant="scale" delay={i * 100}>
            <div className="glass rounded-xl p-4 md:p-6 min-w-[70px] md:min-w-[90px] text-center shadow-lg animate-breathe animate-border-shimmer"
                 style={{ animationDelay: `${i * 500}ms` }}>
              <span
                className="block font-serif text-3xl md:text-5xl font-bold text-foreground tabular-nums"
                style={{ perspective: "200px" }}
              >
                {String(unit.value).padStart(2, "0")}
              </span>
              <span className="block mt-2 font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground">
                {unit.label}
              </span>
            </div>
          </ScrollAnimate>
        ))}
      </div>
    </section>
  );
};

export default CountdownTimer;
