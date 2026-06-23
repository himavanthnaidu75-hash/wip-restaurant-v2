'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TOTAL_FRAMES = 260;

function generateFramePath(index: number): string {
  const num = String(index + 1).padStart(4, '0');
  return `/sequence/ezgif-frame-${num}.png`;
}

const heroWords = ['Handmade', 'Pasta,', 'Made', 'With', 'Soul'];

export default function PastaScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null),
  );
  const loadedCountRef = useRef(0);
  const prevFrameRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const pendingFrameRef = useRef(0);
  const canvasSizeRef = useRef({ w: 0, h: 0 });
  const [showHero, setShowHero] = useState(false);
  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);

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

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img) return;

    const { w, h } = canvasSizeRef.current;
    if (w === 0 || h === 0) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
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

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

    prevFrameRef.current = frameIndex;
    setCanvasReady(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        canvasSizeRef.current = { w: width, h: height };

        if (width > 0 && height > 0 && prevFrameRef.current === -1) {
          const img = imagesRef.current[pendingFrameRef.current];
          if (img) {
            drawFrame(pendingFrameRef.current);
          }
        }
      }
    });

    ro.observe(canvas);
    return () => ro.disconnect();
  }, [drawFrame]);

  useEffect(() => {
    let cancelled = false;

    const loadAll = async () => {
      const batchSize = 15;

      for (let start = 0; start < TOTAL_FRAMES; start += batchSize) {
        const end = Math.min(start + batchSize, TOTAL_FRAMES);
        const promises: Promise<void>[] = [];

        for (let i = start; i < end; i++) {
          const idx = i;
          const p = new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              if (cancelled) { resolve(); return; }
              imagesRef.current[idx] = img;
              loadedCountRef.current++;

              if (idx === 0) {
                setFallbackSrc(generateFramePath(0));
              }

              if (prevFrameRef.current === -1) {
                const { w, h } = canvasSizeRef.current;
                if (w > 0 && h > 0) {
                  drawFrame(idx);
                } else {
                  pendingFrameRef.current = idx;
                }
              }
              resolve();
            };
            img.onerror = () => {
              if (cancelled) { resolve(); return; }
              resolve();
            };
            img.src = generateFramePath(idx);
          });
          promises.push(p);
        }

        await Promise.all(promises);
      }
    };

    loadAll();
    return () => { cancelled = true; };
  }, [drawFrame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      if (prevFrameRef.current >= 0) {
        const img = imagesRef.current[prevFrameRef.current];
        if (img) drawFrame(prevFrameRef.current);
      }
    };

    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(v * TOTAL_FRAMES),
        );

        if (frameIndex === prevFrameRef.current) return;

        const img = imagesRef.current[frameIndex];
        if (!img) {
          for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
            const fallback = frameIndex + (offset % 2 === 1 ? -offset : offset);
            if (fallback >= 0 && fallback < TOTAL_FRAMES && imagesRef.current[fallback]) {
              drawFrame(fallback);
              break;
            }
          }
          return;
        }

        drawFrame(frameIndex);
      });
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafRef.current);
    };
  }, [scrollYProgress, drawFrame]);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <motion.div
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden"
        style={{ opacity, y }}
      >
        {fallbackSrc && (
          <img
            src={fallbackSrc}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${canvasReady ? 'opacity-0' : 'opacity-100'}`}
          />
        )}

        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ backgroundColor: '#5f452e' }}
          aria-hidden="true"
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
            {String(Math.min(TOTAL_FRAMES, Math.floor(
              (prevFrameRef.current >= 0 ? prevFrameRef.current : 0)
            ) + 1)).padStart(3, '0')} / {TOTAL_FRAMES}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
