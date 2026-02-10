import { ScrollAnimate } from "./ScrollAnimate";
import { CalendarDays, Clock, MapPin } from "lucide-react";

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
    <section className="py-20 px-6">
      <ScrollAnimate className="text-center mb-14">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
          Join us for
        </p>
        <h2 className="font-serif text-3xl md:text-4xl gold-text font-semibold">
          Wedding Events
        </h2>
      </ScrollAnimate>

      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
        {events.map((event, i) => (
          <ScrollAnimate key={event.title} variant={event.variant} delay={i * 150}>
            <div className="glass rounded-2xl p-8 text-center hover:shadow-xl transition-shadow duration-300 h-full">
              <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-6">
                {event.title}
              </h3>

              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <CalendarDays className="w-4 h-4 text-primary" />
                  <span className="font-sans text-sm">{event.date}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-sans text-sm">{event.time}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
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
