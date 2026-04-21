import { event } from "@/lib/eventData";

export default function WelcomeMessage() {
  return (
    <section className="py-20 px-6 max-w-2xl mx-auto text-center">
      <div className="gold-divider" />
      <p className="serif text-lg md:text-xl text-cream-100/90 leading-relaxed">
        {event.welcomeMessage}
      </p>
      <div className="gold-divider" />
    </section>
  );
}
