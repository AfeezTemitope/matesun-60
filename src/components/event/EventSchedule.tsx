import { event } from "@/lib/eventData";
import { Church, Wine } from "lucide-react";

export default function EventSchedule() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="script text-5xl text-center mb-2">Schedule</h2>
      <div className="gold-divider" />
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <ScheduleCard
          icon={<Church className="w-8 h-8 text-gold-400" />}
          title={event.schedule.church.title}
          time={`${event.schedule.church.startTime} – ${event.schedule.church.endTime}`}
          venue={event.schedule.church.venue}
          address={event.schedule.church.address}
        />
        <ScheduleCard
          icon={<Wine className="w-8 h-8 text-gold-400" />}
          title={event.schedule.reception.title}
          time={`${event.schedule.reception.startTime} – ${event.schedule.reception.endTime}`}
          venue={event.schedule.reception.venue}
          address={event.schedule.reception.address}
        />
      </div>
    </section>
  );
}

function ScheduleCard({ icon, title, time, venue, address }: {
  icon: React.ReactNode; title: string; time: string; venue: string; address: string;
}) {
  return (
    <div className="border border-gold-400/30 rounded-2xl p-8 text-center bg-chocolate-800/30 backdrop-blur-sm">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="serif text-2xl mb-3">{title}</h3>
      <p className="script text-3xl text-gold-400 mb-4">{time}</p>
      <p className="serif text-cream-100 font-medium">{venue}</p>
      <p className="text-sm text-cream-200/70 mt-1">{address}</p>
    </div>
  );
}
