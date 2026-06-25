'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionReveal from '@/components/SectionReveal';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Regular Guest',
    text: 'The cacio e pepe here is the best I have ever had outside of Rome. You can taste the care in every bite.',
    rating: 5,
  },
  {
    name: 'James L.',
    role: 'Food Blogger',
    text: 'W.I.P Restaurant understands that simplicity is the ultimate sophistication. The pasta is perfect every time.',
    rating: 5,
  },
  {
    name: 'Elena R.',
    role: 'Private Event Host',
    text: 'We hosted our anniversary dinner here. The attention to detail, from the food to the atmosphere, was exceptional.',
    rating: 5,
  },
  {
    name: 'Michael T.',
    role: 'Neighborhood Local',
    text: 'I come here every Friday. The ragù reminds me of my grandmother\'s cooking in Bologna. Truly authentic.',
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#d4a853"
          aria-hidden="true"
          className="drop-shadow-[0_0_4px_rgba(212,168,83,0.3)]"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden px-5 py-28 md:px-8" style={{ backgroundColor: '#5f452e' }}>
      {/* Decorative corner accents */}
      <div className="pointer-events-none absolute left-8 top-8 h-16 w-[1px] bg-[#d4a853]/20" />
      <div className="pointer-events-none absolute left-8 top-8 h-[1px] w-16 bg-[#d4a853]/20" />
      <div className="pointer-events-none absolute right-8 bottom-8 h-16 w-[1px] bg-[#d4a853]/20" />
      <div className="pointer-events-none absolute right-8 bottom-8 h-[1px] w-16 bg-[#d4a853]/20" />

      <SectionReveal className="mb-16 text-center">
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]"
          style={{ color: '#d4a853' }}
        >
          What Guests Say
        </p>
        <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          Voices from Our Table
        </h2>
        <div className="mx-auto mt-6 h-[1px] w-12 bg-[#d4a853]/40" />
      </SectionReveal>

      <div className="mx-auto max-w-3xl">
        <div className="relative min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 rounded-2xl p-10 text-center"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(212,168,83,0.1)',
              }}
            >
              <div className="flex justify-center">
                <StarRating count={testimonials[current].rating} />
              </div>

              {/* Decorative quote marks */}
              <div
                className="pointer-events-none select-none font-display text-6xl leading-none"
                style={{ color: 'rgba(212,168,83,0.15)' }}
              >
                &ldquo;
              </div>

              <p
                className="-mt-4 text-lg leading-relaxed md:text-xl"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                {testimonials[current].text}
              </p>

              <div className="mt-8">
                <div className="mx-auto mb-2 h-[1px] w-8 bg-[#d4a853]/30" />
                <p
                  className="text-sm font-semibold tracking-tight"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  {testimonials[current].name}
                </p>
                <p
                  className="mt-0.5 text-xs uppercase tracking-[0.15em]"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:border-[#d4a853] hover:text-[#d4a853]"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width: i === current ? '28px' : '8px',
                  backgroundColor: i === current ? '#d4a853' : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:border-[#d4a853] hover:text-[#d4a853]"
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
