import { ScrollAnimate } from "./ScrollAnimate";

const blessings = [
  {
    quote: "Two souls with but a single thought, two hearts that beat as one.",
    author: "Friedrich Halm",
  },
  {
    quote: "Where there is love there is life.",
    author: "Mahatma Gandhi",
  },
  {
    quote: "The highest happiness on earth is the happiness of marriage.",
    author: "William Lyon Phelps",
  },
];

const BlessingsSection = () => (
  <section className="py-20 px-6" id="blessings">
    <ScrollAnimate className="text-center mb-14">
      <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
        Words of love
      </p>
      <h2 className="font-serif text-3xl md:text-4xl gold-text font-semibold">
        Blessings
      </h2>
    </ScrollAnimate>

    <div className="max-w-3xl mx-auto grid gap-6 md:gap-8">
      {blessings.map((b, i) => (
        <ScrollAnimate
          key={i}
          variant={i % 2 === 0 ? "left" : "right"}
          delay={i * 150}
        >
          <div className="glass rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
            {/* Large quote mark */}
            <span className="absolute top-3 left-5 font-serif text-6xl text-primary/10 leading-none select-none">
              "
            </span>
            <p className="font-serif text-lg md:text-xl text-foreground italic leading-relaxed relative z-10">
              {b.quote}
            </p>
            <p className="mt-4 font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground">
              — {b.author}
            </p>
          </div>
        </ScrollAnimate>
      ))}
    </div>
  </section>
);

export default BlessingsSection;
