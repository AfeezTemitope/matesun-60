import { event } from "@/lib/eventData";

export default function ThankYouSection() {
  return (
    <section className="py-24 px-6 max-w-3xl mx-auto text-center">
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
    </section>
  );
}
