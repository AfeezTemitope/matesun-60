'use client';
import { motion } from 'framer-motion';
import { event } from "@/lib/eventData";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="text-center"
      >
        <p className="serif text-cream-200/80 tracking-[0.3em] text-sm mb-6 uppercase">
          Celebrating
        </p>
        <h1 className="script text-[7rem] md:text-[11rem] leading-none mb-2">
          {event.milestone}
        </h1>
        <h2 className="serif text-3xl md:text-5xl text-cream-100 font-light tracking-wide mb-8">
          Birthday Celebration
        </h2>
        <div className="gold-divider" />
        <p className="script text-4xl md:text-6xl text-cream-100 mb-8">
          {event.celebrantName}
        </p>
        <p className="serif italic text-cream-200/90 max-w-md mx-auto mb-6 text-base md:text-lg">
          &ldquo;{event.bibleVerse.text}&rdquo;
          <br />
          <span className="text-sm text-gold-400 not-italic">— {event.bibleVerse.reference}</span>
        </p>
        <div className="mt-12 inline-block border border-gold-400/40 px-8 py-3 rounded-sm">
          <p className="serif text-cream-100 tracking-widest text-lg">{event.date}</p>
        </div>
      </motion.div>
    </section>
  );
}
