'use client';
import { motion } from 'framer-motion';
import { event } from "@/lib/eventData";
import FloralCorner from "@/components/shared/FloralCorner";

export default function ThankYouSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
      className="py-24 px-6 max-w-3xl mx-auto text-center relative"
    >
      <FloralCorner position="top-left" className="opacity-40" />
      <FloralCorner position="top-right" className="opacity-40" />
      <h2 className="script text-6xl mb-4">Thank You</h2>
      <div className="gold-divider" />
      <p className="serif text-lg text-cream-100/90 mb-8 leading-relaxed mt-6">
        {event.thankYou.message}
      </p>
      <div className="border-t border-b border-gold-400/30 py-8 my-10">
        <p className="serif italic text-cream-200/90 text-lg md:text-xl">
          &ldquo;{event.thankYou.verse.text}&rdquo;
        </p>
        <p className="text-sm text-gold-400 mt-2 not-italic">— {event.thankYou.verse.reference}</p>
      </div>
      <div className="mt-12">
        <p className="text-xs tracking-[0.3em] text-cream-200/60 uppercase mb-3">With love from</p>
        <p className="script text-5xl md:text-6xl">{event.thankYou.creditName}</p>
      </div>
    </motion.section>
  );
}
