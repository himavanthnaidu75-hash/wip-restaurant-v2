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
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="#c84b31"
          aria-hidden="true"
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
    <section className="px-5 py-24 md:px-8" style={{ backgroundColor: '#5f452e' }}>
      <SectionReveal className="mb-14 text-center">
        <p
          className="mb-4 text-sm font-semibold uppercase tracking-[0.16em]"
          style={{ color: '#c84b31' }}
        >
          What Guests Say
        </p>
        <h2 className="text-4xl font-semibold tracking-tighter md:text-5xl">
          Voices from Our Table
        </h2>
      </SectionReveal>

      <div className="mx-auto max-w-3xl">
        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-0 rounded-lg p-8 text-center"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <StarRating count={testimonials[current].rating} />
              <p
                className="mt-5 text-lg leading-7 md:text-xl"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                &ldquo;{testimonials[current].text}&rdquo;
              </p>
              <div className="mt-6">
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  {testimonials[current].name}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  {testimonials[current].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
            style={{
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.6)',
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
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '24px' : '8px',
                  backgroundColor: i === current ? '#c84b31' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
            style={{
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.6)',
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
