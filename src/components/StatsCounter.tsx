'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

interface StatsCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export default function StatsCounter({ value, suffix = '', label }: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2200;
    let raf: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <p
        className="mb-1 text-4xl font-semibold tracking-tighter md:text-5xl"
        style={{ color: '#c84b31' }}
      >
        {display}{suffix}
      </p>
      <p
        className="text-sm font-semibold uppercase tracking-[0.12em]"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        {label}
      </p>
    </div>
  );
}
