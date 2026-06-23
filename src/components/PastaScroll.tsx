'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const TOTAL_FRAMES = 260;

function generateFramePath(index: number): string {
  const num = String(index + 1).padStart(4, '0');
  return `/sequence/ezgif-frame-${num}.png`;
}

const heroWords = ['Handmade', 'Pasta,', 'Made', 'With', 'Soul'];

export default function PastaScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showHero, setShowHero] = useState(false);
  const [frameSrc, setFrameSrc] = useState('/sequence/ezgif-frame-001.png');
  const loadedFrames = useRef<Map<number, string>>(new Map());
  const prevFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const t = setTimeout(() => setShowHero(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const toLoad = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200, 220, 240, 259];
    toLoad.forEach((idx) => {
      if (loadedFrames.current.has(idx)) return;
      const img = new Image();
      img.onload = () => {
        loadedFrames.current.set(idx, generateFramePath(idx));
      };
      img.src = generateFramePath(idx);
    });

    const batchSize = 15;
    let start = 0;
    const interval = setInterval(() => {
      for (let i = start; i < Math.min(start + batchSize, TOTAL_FRAMES); i++) {
        if (loadedFrames.current.has(i)) continue;
        const idx = i;
        const img = new Image();
        img.onload = () => {
          loadedFrames.current.set(idx, generateFramePath(idx));
        };
        img.src = generateFramePath(idx);
      }
      start += batchSize;
      if (start >= TOTAL_FRAMES) clearInterval(interval);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const getNearestFrame = useCallback((target: number): string => {
    if (loadedFrames.current.has(target)) {
      return loadedFrames.current.get(target)!;
    }
    for (let offset = 0; offset < TOTAL_FRAMES; offset++) {
      const lower = target - offset;
      if (lower >= 0 && loadedFrames.current.has(lower)) return loadedFrames.current.get(lower)!;
      const upper = target + offset;
      if (upper < TOTAL_FRAMES && loadedFrames.current.has(upper)) return loadedFrames.current.get(upper)!;
    }
    return generateFramePath(0);
  }, []);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(v * TOTAL_FRAMES));
    if (frameIndex === prevFrameRef.current) return;
    prevFrameRef.current = frameIndex;
    setFrameSrc(getNearestFrame(frameIndex));
  });

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <motion.div
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden"
        style={{ opacity, y }}
      >
        <img
          src={frameSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ backgroundColor: '#5f452e' }}
        />

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center">
          <div className="mb-4 flex flex-wrap items-baseline justify-center gap-x-3">
            {showHero &&
              heroWords.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.12,
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="text-5xl font-semibold tracking-tighter md:text-7xl lg:text-8xl"
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
              transition={{ delay: 0.8, duration: 0.7 }}
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
              transition={{ delay: 1.0, duration: 0.7 }}
            >
              <a
                href="#intro"
                className="rounded-full bg-[#c84b31] px-8 py-4 text-sm font-semibold tracking-tight text-white transition-colors hover:bg-[#a63d27]"
              >
                Explore Our Menu
              </a>
            </motion.div>
          )}
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showHero ? 0.4 : 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg
                width="16"
                height="24"
                viewBox="0 0 16 24"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="1"
                  y="1"
                  width="14"
                  height="22"
                  rx="7"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <circle cx="8" cy="8" r="2" fill="white" />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 right-8 z-10 text-xs tabular-nums">
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>
            {String(prevFrameRef.current + 1).padStart(3, '0')} / {TOTAL_FRAMES}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
