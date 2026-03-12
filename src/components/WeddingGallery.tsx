import { useState } from "react";
import { ScrollAnimate } from "./ScrollAnimate";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

// Wedding photos — add wedding-1.jpg through wedding-6.jpg to src/assets/
import wedding1 from "@/assets/wedding-1.jpg";

// Bullet-time video from Insta 360
import bulletTimeVideo from "@/assets/bullet-time.mp4";

interface MediaItem {
  id: number | string;
  src: string;
  alt: string;
  type: "image" | "video";
  thumbnail?: string;
}

const weddingMedia: MediaItem[] = [
  { id: 1, src: wedding1, alt: "Wedding ceremony moment", type: "image" },
  { id: "bulletTime", src: bulletTimeVideo, alt: "Bullet time video", type: "video", thumbnail: wedding1 },
];

const WeddingGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % weddingMedia.length : null
    );
  const goPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + weddingMedia.length) % weddingMedia.length
        : null
    );

  return (
    <section className="py-20 px-6" id="wedding-gallery">
      <ScrollAnimate className="text-center mb-14">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
          {t("weddingGallery.subtitle")}
        </p>
        <h2 className="font-serif text-3xl md:text-4xl gold-text font-semibold">
          {t("weddingGallery.heading")}
        </h2>
        <p className="mt-3 font-sans text-sm text-muted-foreground">
          {t("weddingGallery.date")}
        </p>
      </ScrollAnimate>

      {/* Media grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {weddingMedia.map((media, i) => (
          <ScrollAnimate key={media.id} variant="scale" delay={i * 100}>
            <div
              className="aspect-square rounded-xl overflow-hidden cursor-pointer bg-champagne shadow-md hover:shadow-xl transition-all duration-500 ken-burns-hover glass-lift relative"
              onClick={() => openLightbox(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openLightbox(i)}
            >
              <img
                src={media.type === "video" ? (media.thumbnail || media.src) : media.src}
                alt={media.alt}
                className="w-full h-full object-cover"
                loading="eager"
              />
              {media.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-primary fill-primary ml-1" />
                  </div>
                </div>
              )}
            </div>
          </ScrollAnimate>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            aria-label={t("weddingGallery.closeAria")}
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 text-white/80 hover:text-white z-10"
            aria-label={t("weddingGallery.prevAria")}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 text-white/80 hover:text-white z-10"
            aria-label={t("weddingGallery.nextAria")}
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div
            className="max-w-4xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {weddingMedia[lightboxIndex].type === "video" ? (
              <video
                src={weddingMedia[lightboxIndex].src}
                controls
                autoPlay
                playsInline
                className="max-h-[85vh] rounded-lg"
              />
            ) : (
              <img
                src={weddingMedia[lightboxIndex].src}
                alt={weddingMedia[lightboxIndex].alt}
                className="max-h-[85vh] rounded-lg object-contain"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default WeddingGallery;
