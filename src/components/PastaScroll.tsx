'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const heroWords = ['Handmade', 'Pasta,', 'Made', 'With', 'Soul'];

export default function PastaScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showHero, setShowHero] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);

  useEffect(() => {
    const t = setTimeout(() => setShowHero(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <motion.div
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden"
        style={{ opacity, scale: heroScale }}
      >
        {/* Content */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-5 text-center"
          style={{ y: heroY }}
        >
          {/* Gold accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: showHero ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-6 h-[1px] w-16 origin-center"
            style={{ backgroundColor: '#d4a853' }}
          />

          {/* Brand indicator */}
          {showHero && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-5 text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: '#d4a853' }}
            >
              W.I.P Restaurant &mdash; Little Italy
            </motion.p>
          )}

          <div className="mb-4 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2">
            {showHero &&
              heroWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    delay: 0.4 + i * 0.15,
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="font-display text-5xl font-semibold tracking-tight md:text-7xl lg:text-8xl"
                  style={{ color: 'rgba(255,255,255,0.95)' }}
                >
                  {word}
                </motion.span>
              ))}
          </div>

          {showHero && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-10 max-w-lg text-base leading-7 md:text-lg"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              Handmade pasta daily. Seasonal ingredients. Italian tradition, served with intention.
            </motion.p>
          )}

          {showHero && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7 }}
            >
              <a
                href="#intro"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#c84b31] px-8 py-4 text-sm font-semibold tracking-tight text-white transition-all duration-300 hover:bg-[#a63d27]"
              >
                <span className="relative z-10">Explore Our Menu</span>
                <svg
                  className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                <motion.div
                  className="absolute inset-0 -translate-x-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                    transition: 'transform 0.5s ease',
                  }}
                  whileHover={{ x: '200%' }}
                />
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Premium scroll indicator */}
        <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showHero ? 1 : 0 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              <svg
                width="14"
                height="22"
                viewBox="0 0 14 22"
                fill="none"
                aria-hidden="true"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="1" y="1" width="12" height="20" rx="6" />
                <circle cx="7" cy="7" r="1.5" fill="currentColor" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
