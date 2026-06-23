'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const TOTAL_FRAMES = 260;

function generateFramePaths() {
  return Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    const num = String(i + 1).padStart(4, '0');
    return `/sequence/ezgif-frame-${num}.png`;
  });
}

const heroWords = ['Handmade', 'Pasta,', 'Made', 'With', 'Soul'];

export default function PastaScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const prevFrameRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [heroReady, setHeroReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const preloadImages = useCallback(async () => {
    const paths = generateFramePaths();
    const loadImage = (src: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    const batchSize = 20;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < paths.length; i += batchSize) {
      const batch = paths.slice(i, i + batchSize);
      const loaded = await Promise.all(batch.map(loadImage));
      images.push(...loaded);

      if (i === 0) setHeroReady(true);
    }

    imagesRef.current = images;
  }, []);

  useEffect(() => {
    preloadImages();
  }, [preloadImages]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (imagesRef.current[prevFrameRef.current]) {
        const w = rect.width;
        const h = rect.height;
        const img = imagesRef.current[prevFrameRef.current];
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = w / h;
        let drawW: number, drawH: number, offsetX: number, offsetY: number;

        if (imgRatio > canvasRatio) {
          drawH = h;
          drawW = h * imgRatio;
          offsetX = (w - drawW) / 2;
          offsetY = 0;
        } else {
          drawW = w;
          drawH = w / imgRatio;
          offsetX = 0;
          offsetY = (h - drawH) / 2;
        }

        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = (frameIndex: number) => {
      if (frameIndex === prevFrameRef.current) return;

      const img = imagesRef.current[frameIndex];
      if (!img) return;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = w / h;
      let drawW: number, drawH: number, offsetX: number, offsetY: number;

      if (imgRatio > canvasRatio) {
        drawH = h;
        drawW = h * imgRatio;
        offsetX = (w - drawW) / 2;
        offsetY = 0;
      } else {
        drawW = w;
        drawH = w / imgRatio;
        offsetX = 0;
        offsetY = (h - drawH) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

      prevFrameRef.current = frameIndex;
    };

    const unsubscribe = scrollYProgress.on('change', (v) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(v * TOTAL_FRAMES),
        );
        setCurrentFrame(frameIndex);
        drawFrame(frameIndex);
      });
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafRef.current);
    };
  }, [scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <motion.div
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden"
        style={{ opacity, y }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ backgroundColor: '#5f452e' }}
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center">
          <div className="mb-4 flex flex-wrap items-baseline justify-center gap-x-3">
            <AnimatePresence>
              {heroReady &&
                heroWords.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.12,
                      duration: 0.6,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="text-5xl font-semibold tracking-tighter md:text-7xl lg:text-8xl"
                    style={{ color: 'rgba(255,255,255,0.95)' }}
                  >
                    {word}
                  </motion.span>
                ))}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {heroReady && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7 }}
                className="mb-10 max-w-lg text-base leading-7 md:text-lg"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                Handmade pasta daily. Seasonal ingredients. Italian tradition, served with intention.
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {heroReady && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7 }}
              >
                <a
                  href="#intro"
                  className="rounded-full bg-[#c84b31] px-8 py-4 text-sm font-semibold tracking-tight text-white transition-colors hover:bg-[#a63d27]"
                >
                  Explore Our Menu
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: heroReady ? 0.4 : 0 }}
            transition={{ delay: 1.3 }}
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
            {String(currentFrame + 1).padStart(3, '0')} / {TOTAL_FRAMES}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
