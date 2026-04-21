'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { event } from '@/lib/eventData';

export default function RSVPForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    guest_name: '', guest_email: '', guest_phone: '',
    attendance_status: '', message: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.attendance_status) return;
    setStatus('submitting');
    const { error } = await supabase.from('rsvps').insert([form]);
    setStatus(error ? 'error' : 'success');
  }

  if (status === 'success') {
    return (
      <section className="py-20 px-6 max-w-xl mx-auto text-center">
        <h2 className="script text-6xl mb-4">Thank you</h2>
        <p className="serif text-lg text-cream-100/90">
          Your RSVP has been received. We look forward to celebrating with you.
        </p>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 max-w-xl mx-auto">
      <h2 className="script text-5xl text-center mb-2">RSVP</h2>
      <div className="gold-divider" />
      <p className="text-center text-cream-200/80 mb-8 text-sm mt-6">
        Kindly respond by {event.rsvpDeadline}
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Full Name" required value={form.guest_name}
          onChange={v => setForm({ ...form, guest_name: v })} />
        <Input label="Email" type="email" value={form.guest_email}
          onChange={v => setForm({ ...form, guest_email: v })} />
        <Input label="Phone" type="tel" value={form.guest_phone}
          onChange={v => setForm({ ...form, guest_phone: v })} />

        <div>
          <label className="block text-sm text-cream-200/80 mb-3">Will you attend?</label>
          <div className="grid grid-cols-2 gap-3">
            {['yes', 'no'].map(val => (
              <button key={val} type="button"
                onClick={() => setForm({ ...form, attendance_status: val })}
                className={`py-3 rounded-lg border transition-all ${
                  form.attendance_status === val
                    ? 'border-gold-400 bg-gold-400 text-chocolate-700 font-medium'
                    : 'border-gold-400/30 text-cream-100 hover:border-gold-400'
                }`}>
                {val === 'yes' ? 'Joyfully Yes' : 'Regretfully No'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-cream-200/80 mb-2">Message (optional)</label>
          <textarea value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            rows={3}
            className="w-full bg-chocolate-800/40 border border-gold-400/30 rounded-lg px-4 py-3 text-cream-100 placeholder:text-cream-200/40 focus:border-gold-400 focus:outline-none transition"
            placeholder="A warm message for Mummy..." />
        </div>

        <button type="submit"
          disabled={status === 'submitting' || !form.attendance_status}
          className="w-full bg-gold-400 text-chocolate-700 font-medium py-4 rounded-lg hover:bg-gold-500 disabled:opacity-50 transition">
          {status === 'submitting' ? 'Sending...' : 'Submit RSVP'}
        </button>

        {status === 'error' && (
          <p className="text-red-300 text-sm text-center">Something went wrong. Please try again.</p>
        )}
      </form>
    </section>
  );
}

function Input({ label, type = 'text', value, onChange, required }: {
  label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm text-cream-200/80 mb-2">
        {label} {required && <span className="text-gold-400">*</span>}
      </label>
      <input type={type} required={required} value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-chocolate-800/40 border border-gold-400/30 rounded-lg px-4 py-3 text-cream-100 placeholder:text-cream-200/40 focus:border-gold-400 focus:outline-none transition" />
    </div>
  );
}
