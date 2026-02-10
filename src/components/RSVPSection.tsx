import { useState } from "react";
import { ScrollAnimate } from "./ScrollAnimate";
import { Send } from "lucide-react";

const RSVPSection = () => {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [events, setEvents] = useState<string[]>([]);

  const toggleEvent = (e: string) =>
    setEvents((prev) =>
      prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]
    );

  const handleSubmit = () => {
    const eventStr = events.length > 0 ? events.join(" & ") : "Both";
    const message = `Hello! I'd love to attend your wedding.\n\nName: ${name}\nGuests: ${guests}\nAttending: ${eventStr}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const isValid = name.trim().length > 0 && events.length > 0;

  return (
    <section className="py-20 px-6" id="rsvp">
      <ScrollAnimate className="text-center mb-14">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
          We'd love to see you
        </p>
        <h2 className="font-serif text-3xl md:text-4xl gold-text font-semibold">
          RSVP
        </h2>
      </ScrollAnimate>

      <ScrollAnimate className="max-w-md mx-auto">
        <div className="glass rounded-2xl p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              className="w-full bg-transparent border-b border-primary/30 py-2 font-serif text-lg text-foreground outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40"
              placeholder="Enter your name"
            />
          </div>

          {/* Guests */}
          <div>
            <label className="block font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">
              Number of Guests
            </label>
            <div className="flex gap-2">
              {["1", "2", "3", "4"].map((n) => (
                <button
                  key={n}
                  onClick={() => setGuests(n)}
                  className={`w-10 h-10 rounded-full font-sans text-sm font-medium transition-all duration-300 ${
                    guests === n
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "border border-primary/30 text-muted-foreground hover:border-primary/60"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Events */}
          <div>
            <label className="block font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
              Attending
            </label>
            <div className="flex flex-wrap gap-2">
              {["Reception", "Muhurtha", "Both"].map((e) => (
                <button
                  key={e}
                  onClick={() => {
                    if (e === "Both") {
                      setEvents(["Reception", "Muhurtha"]);
                    } else {
                      toggleEvent(e);
                    }
                  }}
                  className={`px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase transition-all duration-300 ${
                    (e === "Both" && events.length === 2) || events.includes(e)
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "border border-primary/30 text-muted-foreground hover:border-primary/60"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full py-3 rounded-full bg-primary text-primary-foreground font-sans text-sm tracking-wider uppercase font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg btn-ripple"
          >
            <Send className="w-4 h-4" />
            Send with Love
          </button>
        </div>
      </ScrollAnimate>
    </section>
  );
};

export default RSVPSection;
