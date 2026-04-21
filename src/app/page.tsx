import HeroSection from "@/components/hero/HeroSection";
import WelcomeMessage from "@/components/event/WelcomeMessage";
import EventSchedule from "@/components/event/EventSchedule";
import PhotoGallery from "@/components/gallery/PhotoGallery";
import GiftRegistry from "@/components/registry/GiftRegistry";
import RSVPForm from "@/components/rsvp/RSVPForm";
import ThankYouSection from "@/components/thank-you/ThankYouSection";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <WelcomeMessage />
      <EventSchedule />
      <PhotoGallery />
      <GiftRegistry />
      <RSVPForm />
      <ThankYouSection />
      <Footer />
    </main>
  );
}
