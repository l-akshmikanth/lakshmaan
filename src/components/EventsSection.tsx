import { ScrollAnimate } from "./ScrollAnimate";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import KolamPattern from "./KolamPattern";

const events = [
  {
    title: "Reception",
    date: "Saturday, March 7, 2026",
    time: "7:00 PM onwards",
    venue: "Surabhi Kalyana Mantapa",
    variant: "left" as const,
  },
  {
    title: "Muhurtha",
    date: "Sunday, March 8, 2026",
    time: "10:30 AM onwards",
    venue: "Surabhi Kalyana Mantapa",
    variant: "right" as const,
  },
];

const EventsSection = () => {
  return (
    <section className="py-20 px-6 relative overflow-hidden" id="events">
      <KolamPattern className="absolute -right-20 top-10 w-[200px] h-[200px] opacity-40" />

      <ScrollAnimate className="text-center mb-14 relative z-10">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Join us for
        </p>
        <h2 className="font-serif text-3xl md:text-4xl gold-text font-semibold">
          Wedding Events
        </h2>
      </ScrollAnimate>

      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 relative z-10">
        {events.map((event, i) => (
          <ScrollAnimate key={event.title} variant={event.variant} delay={i * 150}>
            <div className="glass rounded-2xl p-8 text-center h-full event-card-shimmer group">
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-6 group-hover:gold-shimmer-text transition-all duration-300">
                {event.title}
              </h3>

              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <CalendarDays className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-sans text-sm">{event.date}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-110" style={{ transitionDelay: "100ms" }} />
                  <span className="font-sans text-sm">{event.time}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-110" style={{ transitionDelay: "200ms" }} />
                  <span className="font-sans text-sm">{event.venue}</span>
                </div>
              </div>
            </div>
          </ScrollAnimate>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
