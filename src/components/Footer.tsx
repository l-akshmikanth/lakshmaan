import { ScrollAnimate } from "./ScrollAnimate";

const Footer = () => {
  return (
    <footer className="py-20 px-6 text-center">
      <ScrollAnimate>
        {/* Decorative ornament */}
        <div className="flex justify-center mb-8">
          <svg width="80" height="30" viewBox="0 0 80 30" className="text-primary/40">
            <path
              d="M0 15 Q20 0 40 15 Q60 30 80 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle cx="40" cy="15" r="3" fill="currentColor" />
          </svg>
        </div>

        <p className="font-sans text-sm text-muted-foreground mb-6 max-w-md mx-auto leading-relaxed">
          We are blessed to have you in our lives and would be honored by your presence on our special day.
        </p>

        <h3 className="font-serif text-2xl md:text-3xl gold-text font-semibold">
          Lakshmikanth & Maanya
        </h3>

        <div className="mt-8 flex justify-center">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        <p className="mt-6 font-sans text-xs text-muted-foreground/60">
          Made with love 💛
        </p>
      </ScrollAnimate>
    </footer>
  );
};

export default Footer;
