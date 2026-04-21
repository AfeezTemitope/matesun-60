'use client';
import { motion } from 'framer-motion';
import { event } from "@/lib/eventData";
import { Church, Wine } from "lucide-react";
import FloralCorner from "@/components/shared/FloralCorner";

export default function EventSchedule() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto relative">
      <FloralCorner position="top-right" className="opacity-40" />
      <h2 className="script text-5xl text-center mb-2">Schedule</h2>
      <div className="gold-divider" />
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <ScheduleCard
          index={0}
          icon={<Church className="w-8 h-8 text-gold-400" />}
          title={event.schedule.church.title}
          time={`${event.schedule.church.startTime} – ${event.schedule.church.endTime}`}
          venue={event.schedule.church.venue}
          address={event.schedule.church.address}
        />
        <ScheduleCard
          index={1}
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

function ScheduleCard({ index, icon, title, time, venue, address }: {
  index: number; icon: React.ReactNode; title: string; time: string; venue: string; address: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="border border-gold-400/30 rounded-2xl p-8 text-center bg-chocolate-800/30 backdrop-blur-sm hover:border-gold-400/60 transition-colors"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="serif text-2xl mb-3">{title}</h3>
      <p className="script text-3xl text-gold-400 mb-4">{time}</p>
      <p className="serif text-cream-100 font-medium">{venue}</p>
      <p className="text-sm text-cream-200/70 mt-1">{address}</p>
    </motion.div>
  );
}
