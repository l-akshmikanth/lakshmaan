import { useState } from "react";
import { ScrollAnimate } from "./ScrollAnimate";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const placeholderPhotos = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  src: `/placeholder.svg`,
  alt: `Engagement photo ${i + 1}`,
}));

const EngagementGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % placeholderPhotos.length : null
    );
  const goPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + placeholderPhotos.length) % placeholderPhotos.length
        : null
    );

  return (
    <section className="py-20 px-6">
      <ScrollAnimate className="text-center mb-14">
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-muted-foreground mb-3">
          A beautiful beginning
        </p>
        <h2 className="font-serif text-3xl md:text-4xl gold-text font-semibold">
          Our Engagement
        </h2>
        <p className="mt-3 font-sans text-sm text-muted-foreground">
          October 13, 2025
        </p>
      </ScrollAnimate>

      {/* Photo grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {placeholderPhotos.map((photo, i) => (
          <ScrollAnimate key={photo.id} variant="scale" delay={i * 80}>
            <div
              className="aspect-square rounded-xl overflow-hidden cursor-pointer bg-champagne hover:shadow-lg transition-all duration-300 hover:scale-[1.03]"
              onClick={() => openLightbox(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openLightbox(i)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </ScrollAnimate>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 text-white/80 hover:text-white z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img
            src={placeholderPhotos[lightboxIndex].src}
            alt={placeholderPhotos[lightboxIndex].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 text-white/80 hover:text-white z-10"
            aria-label="Next photo"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </section>
  );
};

export default EngagementGallery;
