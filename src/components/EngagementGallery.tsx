import { useState } from "react";
import { ScrollAnimate } from "./ScrollAnimate";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

import engagement1 from "@/assets/engagement-1.jpg";
import engagement2 from "@/assets/engagement-2.jpg";
import engagement3 from "@/assets/engagement-3.jpg";
import engagement4 from "@/assets/engagement-4.jpg";
import engagement5 from "@/assets/engagement-5.jpg";
import engagement6 from "@/assets/engagement-6.jpg";

const engagementPhotos = [
  { id: 1, src: engagement1, alt: "Couple in garden" },
  { id: 2, src: engagement2, alt: "Cake cutting ceremony" },
  { id: 3, src: engagement3, alt: "Intimate moments" },
  { id: 4, src: engagement4, alt: "Garland exchange" },
  { id: 5, src: engagement5, alt: "Close-up portrait" },
  { id: 6, src: engagement6, alt: "Bike ride together" },
];

const EngagementGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % engagementPhotos.length : null
    );
  const goPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + engagementPhotos.length) % engagementPhotos.length
        : null
    );

  return (
    <section className="py-20 px-6" id="gallery">
      <ScrollAnimate className="text-center mb-14">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
          {t("gallery.subtitle")}
        </p>
        <h2 className="font-serif text-3xl md:text-4xl gold-text font-semibold">
          {t("gallery.heading")}
        </h2>
        <p className="mt-3 font-sans text-sm text-muted-foreground">
          {t("gallery.date")}
        </p>
      </ScrollAnimate>

      {/* Photo grid with Ken Burns hover */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {engagementPhotos.map((photo, i) => (
          <ScrollAnimate key={photo.id} variant="scale" delay={i * 100}>
            <div
              className="aspect-square rounded-xl overflow-hidden cursor-pointer bg-champagne shadow-md hover:shadow-xl transition-all duration-500 ken-burns-hover glass-lift"
              onClick={() => openLightbox(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openLightbox(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </ScrollAnimate>
        ))}
      </div>

      {/* Lightbox with zoom transition */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10 transition-transform hover:scale-110"
            aria-label={t("gallery.closeAria")}
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 text-white/80 hover:text-white z-10 transition-transform hover:scale-110"
            aria-label={t("gallery.prevAria")}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img
            src={engagementPhotos[lightboxIndex].src}
            alt={engagementPhotos[lightboxIndex].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 text-white/80 hover:text-white z-10 transition-transform hover:scale-110"
            aria-label={t("gallery.nextAria")}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </section>
  );
};

export default EngagementGallery;
