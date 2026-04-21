'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { event } from "@/lib/eventData";
import FloralCorner from "@/components/shared/FloralCorner";

export default function PhotoGallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 4500, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    // Apply is-selected class for transform
    const applyClasses = () => {
      const slides = emblaApi.slideNodes();
      const idx = emblaApi.selectedScrollSnap();
      slides.forEach((node, i) => {
        node.classList.toggle('is-selected', i === idx);
      });
    };
    applyClasses();
    emblaApi.on('select', applyClasses);
    emblaApi.on('reInit', applyClasses);
  }, [emblaApi, onSelect]);

  if (event.gallery.length === 0) return null;

  return (
    <section className="py-20 px-0 max-w-6xl mx-auto relative">
      <FloralCorner position="top-left" className="opacity-40" />
      <FloralCorner position="bottom-right" className="opacity-40" />

      <h2 className="script text-5xl text-center mb-2">Gallery</h2>
      <div className="gold-divider" />

      <div className="relative mt-12">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {event.gallery.map((img, i) => (
              <div key={i} className="embla__slide">
                <button
                  onClick={() => setLightbox(i)}
                  className="block w-full aspect-[3/4] overflow-hidden rounded-2xl border-2 border-gold-400/40 hover:border-gold-400 transition-all shadow-2xl"
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    width={600}
                    height={800}
                    className="w-full h-full object-cover"
                    priority={i === 0}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-chocolate-800/70 backdrop-blur-sm border border-gold-400/40 rounded-full p-3 hover:bg-gold-400 hover:text-chocolate-700 transition z-10"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-chocolate-800/70 backdrop-blur-sm border border-gold-400/40 rounded-full p-3 hover:bg-gold-400 hover:text-chocolate-700 transition z-10"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {event.gallery.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === selectedIndex ? 'w-8 bg-gold-400' : 'w-2 bg-gold-400/30'
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-cream-100 hover:text-gold-400 transition"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>
          <Image
            src={event.gallery[lightbox].url}
            alt={event.gallery[lightbox].alt}
            width={1400}
            height={1400}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </section>
  );
}
