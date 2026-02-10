import { ScrollAnimate } from "./ScrollAnimate";

const FamiliesSection = () => {
  return (
    <section className="py-20 px-6">
      <ScrollAnimate className="max-w-2xl mx-auto text-center">
        <p className="font-sans text-sm tracking-[0.3em] uppercase text-muted-foreground mb-10">
          With the blessings of our families
        </p>
      </ScrollAnimate>

      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Groom's family */}
        <ScrollAnimate variant="left" delay={100} className="text-center">
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">
            Groom's Parents
          </p>
          <p className="font-serif text-2xl md:text-3xl text-foreground">
            Sheelavathi
          </p>
          <p className="font-serif text-lg text-primary/60 my-1">&</p>
          <p className="font-serif text-2xl md:text-3xl text-foreground">
            Murthy
          </p>
        </ScrollAnimate>

        {/* Bride's family */}
        <ScrollAnimate variant="right" delay={200} className="text-center">
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">
            Bride's Parents
          </p>
          <p className="font-serif text-2xl md:text-3xl text-foreground">
            Chandrakala
          </p>
          <p className="font-serif text-lg text-primary/60 my-1">&</p>
          <p className="font-serif text-2xl md:text-3xl text-foreground/70 italic">
            Late Venkatesh
          </p>
          <p className="text-xs text-muted-foreground mt-1">In loving memory</p>
        </ScrollAnimate>
      </div>

      {/* Decorative divider */}
      <ScrollAnimate delay={400} className="flex justify-center mt-16">
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </ScrollAnimate>
    </section>
  );
};

export default FamiliesSection;
