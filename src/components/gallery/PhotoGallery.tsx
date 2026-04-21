'use client';
import { useState } from 'react';
import Image from 'next/image';
import { event } from "@/lib/eventData";

export default function PhotoGallery() {
  const [selected, setSelected] = useState<string | null>(null);

  if (event.gallery.length === 0) return null;

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="script text-5xl text-center mb-2">Gallery</h2>
      <div className="gold-divider" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mt-12">
        {event.gallery.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(img.url)}
            className="aspect-square overflow-hidden rounded-lg border border-gold-400/20 hover:border-gold-400/60 transition-all"
          >
            <Image
              src={img.url} alt={img.alt}
              width={400} height={400}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelected(null)}
        >
          <Image src={selected} alt="Gallery" width={1200} height={1200}
            className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </section>
  );
}
