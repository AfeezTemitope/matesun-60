'use client';
import { useEffect, useState } from 'react';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
}

export default function FallingPetals({ count = 18 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 6,
      size: 10 + Math.random() * 14,
      drift: -30 + Math.random() * 60,
    }));
    setPetals(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 petal-fall"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            // @ts-expect-error CSS custom property
            '--drift': `${p.drift}px`,
          }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 20 20">
            <path
              d="M10,2 C13,2 16,5 16,9 C16,13 13,17 10,18 C7,17 4,13 4,9 C4,5 7,2 10,2 Z"
              fill="#d4af37"
              opacity="0.55"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
