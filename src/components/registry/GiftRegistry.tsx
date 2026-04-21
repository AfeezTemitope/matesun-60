'use client';
import { motion } from 'framer-motion';
import { event } from "@/lib/eventData";
import { Gift, CreditCard, Mail, Copy, Check } from "lucide-react";
import { useState } from "react";
import FloralCorner from "@/components/shared/FloralCorner";

export default function GiftRegistry() {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto relative">
      <FloralCorner position="top-left" className="opacity-40" />
      <h2 className="script text-5xl text-center mb-2">Gift Registry</h2>
      <div className="gold-divider" />
      <p className="text-center serif italic text-cream-200/80 mb-12 mt-6 max-w-lg mx-auto">
        Your presence is the greatest gift. If you wish to honour Mummy further, here are some options.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        <RegistryCard
          index={0}
          icon={<Gift className="w-8 h-8 text-gold-400" />}
          title="Amazon Wishlist"
          action={
            <a href={event.registry.wishlistUrl} target="_blank" rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2 border border-gold-400 text-gold-400 rounded-full text-sm hover:bg-gold-400 hover:text-chocolate-700 transition-colors">
              View Wishlist
            </a>
          }
        />
        <BankCard bank={event.registry.bank} index={1} />
        <RegistryCard
          index={2}
          icon={<Mail className="w-8 h-8 text-gold-400" />}
          title="Vouchers"
          action={<p className="text-sm text-cream-100 mt-4 break-all">{event.registry.voucherEmail}</p>}
        />
      </div>
    </section>
  );
}

function RegistryCard({ index, icon, title, action }: {
  index: number; icon: React.ReactNode; title: string; action: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="border border-gold-400/30 rounded-2xl p-6 text-center bg-chocolate-800/30 hover:border-gold-400/60 transition-colors"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="serif text-xl mb-2">{title}</h3>
      {action}
    </motion.div>
  );
}

function BankCard({ bank, index }: { bank: typeof event.registry.bank; index: number }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(bank.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="border border-gold-400/30 rounded-2xl p-6 text-center bg-chocolate-800/30 hover:border-gold-400/60 transition-colors"
    >
      <div className="flex justify-center mb-4"><CreditCard className="w-8 h-8 text-gold-400" /></div>
      <h3 className="serif text-xl mb-3">Monetary Gifts</h3>
      <div className="text-sm space-y-1 text-cream-100">
        <p className="text-cream-200/70">{bank.name}</p>
        <p className="font-medium">{bank.accountName}</p>
        <button onClick={handleCopy}
          className="inline-flex items-center gap-2 mt-2 font-mono text-gold-400 hover:text-gold-500 transition">
          {bank.accountNumber}
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </motion.div>
  );
}
