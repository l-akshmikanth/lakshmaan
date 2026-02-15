import { ScrollAnimate } from "./ScrollAnimate";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import KolamPattern from "./KolamPattern";
import ScratchReveal from "./ScratchReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const EventsSection = () => {
  const { t } = useLanguage();

  const events = [
    {
      title: t("events.receptionTitle"),
      date: t("events.receptionDate"),
      time: t("events.receptionTime"),
      venue: t("events.venue"),
      variant: "left" as const,
    },
    {
      title: t("events.muhurthaTitle"),
      date: t("events.muhurthaDate"),
      time: t("events.muhurthaTime"),
      venue: t("events.venue"),
      variant: "right" as const,
    },
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden" id="events">
      <KolamPattern className="absolute -right-20 top-10 w-[200px] h-[200px] opacity-40" />

      <ScrollAnimate className="text-center mb-14 relative z-10">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
          {t("events.subtitle")}
        </p>
        <h2 className="font-serif text-3xl md:text-4xl gold-text font-semibold">
          {t("events.heading")}
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
                  <ScratchReveal text={event.date} />
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
