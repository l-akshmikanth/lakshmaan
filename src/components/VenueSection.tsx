import { ScrollAnimate } from "./ScrollAnimate";
import { MapPin, Navigation } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const VenueSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-6" id="venue">
      <ScrollAnimate className="text-center mb-14">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
          {t("venue.subtitle")}
        </p>
        <h2 className="font-serif text-3xl md:text-4xl gold-text font-semibold">
          {t("venue.heading")}
        </h2>
      </ScrollAnimate>

      <ScrollAnimate className="max-w-3xl mx-auto">
        <div className="glass rounded-2xl overflow-hidden shadow-lg event-card-shimmer">
          {/* Map */}
          <div className="w-full h-[300px] md:h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3894.8862296256284!2d76.87035809999999!3d12.5236953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bafa0ff8ebd15ff%3A0x7a9e7cc53834f8fe!2sSurabhi%20Kalyana%20Mantapa!5e0!3m2!1sen!2sin!4v1770710331241!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("venue.mapTitle")}
            />
          </div>

          {/* Venue info */}
          <div className="p-6 md:p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                {t("venue.name")}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              {t("venue.location")}
            </p>
            <a
              href="https://www.google.com/maps/place/Surabhi+Kalyana+Mantapa/@12.5236953,76.8703581,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-sans text-sm font-medium hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg btn-ripple group"
            >
              <Navigation className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              {t("venue.getDirections")}
            </a>
          </div>
        </div>
      </ScrollAnimate>
    </section>
  );
};

export default VenueSection;
