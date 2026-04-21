#!/bin/bash
# ============================================================
# Yemisi 60th — Gift Registry Update
# - Remove voucher card
# - Add sort code to bank details
# - Update bank details: Nationwide, Mrs P.O Hamed Matesun, 04217543, 07 12 26
# - Recenter grid as 2 columns (Amazon + Monetary Gifts)
# Run from inside yemisi60/ folder: bash fix-registry.sh
# ============================================================

set -e

REGISTRY_FILE="src/components/registry/GiftRegistry.tsx"
DATA_FILE="src/lib/eventData.ts"

echo ""
echo "🎁 Updating Gift Registry..."
echo ""

for f in "$REGISTRY_FILE" "$DATA_FILE"; do
  if [ ! -f "$f" ]; then
    echo "❌ Error: $f not found. Run from yemisi60/ folder."
    exit 1
  fi
done

cp "$REGISTRY_FILE" "$REGISTRY_FILE.bak"
cp "$DATA_FILE" "$DATA_FILE.bak2"
echo "✓ Backups created"

python << 'PYEOF'
import re

# ============================================================
# 1. UPDATE EVENTDATA.TS — bank details + remove voucher, add sortCode
# ============================================================

data_path = "src/lib/eventData.ts"
with open(data_path, "r", encoding="utf-8") as f:
    data = f.read()

# Replace the entire registry block
new_registry = '''registry: {
    wishlistUrl: "https://www.amazon.co.uk/registries/gl/guest-view/1PKVQDDJVC77S?ref_=cm_sw_r_apann_ggr-subnav-share_TVV488D99GP945381WHE&language=en-US",
    bank: {
      name: "Nationwide",
      accountName: "Mrs P.O Hamed Matesun",
      accountNumber: "04217543",
      sortCode: "07 12 26",
    },
  }'''

# Match the whole registry: { ... } block, including nested bank: { ... }
# Handle voucherEmail being present or absent
pattern = r'registry:\s*\{[\s\S]*?voucherEmail:\s*"[^"]*",?\s*\}'
if re.search(pattern, data):
    data = re.sub(pattern, new_registry, data, count=1)
    print("✓ eventData.ts — registry updated (voucherEmail removed, bank details set, sortCode added)")
else:
    # Fallback — registry block without voucherEmail
    pattern2 = r'registry:\s*\{[\s\S]*?bank:\s*\{[\s\S]*?\}[\s\S]*?\}'
    if re.search(pattern2, data):
        data = re.sub(pattern2, new_registry, data, count=1)
        print("✓ eventData.ts — registry updated (bank details set, sortCode added)")
    else:
        print("❌ Could not find registry block in eventData.ts — manual edit needed")
        exit(1)

with open(data_path, "w", encoding="utf-8") as f:
    f.write(data)


# ============================================================
# 2. REWRITE GIFTREGISTRY.TSX — 2 columns, no voucher, show sort code
# ============================================================

registry_path = "src/components/registry/GiftRegistry.tsx"
new_registry_component = '''\'use client\';
import { motion } from \'framer-motion\';
import { event } from "@/lib/eventData";
import { Gift, CreditCard, Copy, Check } from "lucide-react";
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
      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
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
      className="border border-gold-400/30 rounded-2xl p-6 text-center bg-chocolate-800/30 hover:border-gold-400/60 transition-colors flex flex-col items-center justify-center"
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="serif text-xl mb-2">{title}</h3>
      {action}
    </motion.div>
  );
}

function BankCard({ bank, index }: {
  bank: { name: string; accountName: string; accountNumber: string; sortCode: string };
  index: number;
}) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (value: string, field: string) => {
    navigator.clipboard.writeText(value.replace(/\\s/g, \'\'));
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
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
      <h3 className="serif text-xl mb-4">Monetary Gifts</h3>
      <div className="text-sm space-y-3 text-cream-100">
        <div>
          <p className="text-xs uppercase tracking-wider text-cream-200/60 mb-1">Bank</p>
          <p className="font-medium">{bank.name}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-cream-200/60 mb-1">Account Name</p>
          <p className="font-medium">{bank.accountName}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-cream-200/60 mb-1">Sort Code</p>
          <button
            onClick={() => handleCopy(bank.sortCode, \'sort\')}
            className="inline-flex items-center gap-2 font-mono text-gold-400 hover:text-gold-500 transition"
          >
            {bank.sortCode}
            {copiedField === \'sort\' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-cream-200/60 mb-1">Account Number</p>
          <button
            onClick={() => handleCopy(bank.accountNumber, \'acct\')}
            className="inline-flex items-center gap-2 font-mono text-gold-400 hover:text-gold-500 transition"
          >
            {bank.accountNumber}
            {copiedField === \'acct\' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
'''

with open(registry_path, "w", encoding="utf-8") as f:
    f.write(new_registry_component)
print("✓ GiftRegistry.tsx — rewritten: 2 columns, no voucher, sort code + account number both copyable")

PYEOF

rm -rf .next
echo "✓ Wiped .next"

echo ""
echo "✅ Done!"
echo ""
echo "📋 Changes:"
echo "   • Removed voucher card"
echo "   • Grid now 2 columns (Amazon + Bank), centered in narrower max-width"
echo "   • Added sort code field (07 12 26) with copy button"
echo "   • Bank details: Nationwide / Mrs P.O Hamed Matesun / 04217543"
echo "   • Each field now clearly labeled (Bank / Account Name / Sort Code / Account Number)"
echo "   • Sort code and account number are both tap-to-copy"
echo ""
echo "📋 Restart & preview:"
echo "    npm run dev"
echo "    Ctrl+Shift+R"
echo ""
echo "📋 Deploy:"
echo "    git add ."
echo "    git commit -m \"feat(registry): 2-column layout, remove vouchers, add sort code\""
echo "    git push"
echo ""
echo "🔙 Undo: cp $REGISTRY_FILE.bak $REGISTRY_FILE && cp $DATA_FILE.bak2 $DATA_FILE"
echo ""
