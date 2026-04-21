'use client';
import { motion } from 'framer-motion';
import { event } from "@/lib/eventData";

export default function WelcomeMessage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9 }}
      className="py-20 px-6 max-w-2xl mx-auto text-center relative"
    >
      <div className="gold-divider" />
      <p className="serif text-lg md:text-xl text-cream-100/90 leading-relaxed">
        {event.welcomeMessage}
      </p>
      <div className="gold-divider" />
    </motion.section>
  );
}
