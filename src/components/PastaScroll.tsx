'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface PastaScrollProps {
  frames: string[];
}

const INITIAL_LOAD_COUNT = 50;

export default function PastaScroll({ frames }: PastaScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, Math.max(0, frames.length - 1)]);

  const renderFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const img = imagesRef.current[index];
    if (!img) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      context.scale(dpr, dpr);
    }

    const hRatio = displayWidth / img.width;
    const vRatio = displayHeight / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const drawW = img.width * ratio;
    const drawH = img.height * ratio;
    const offsetX = (displayWidth - drawW) / 2;
    const offsetY = (displayHeight - drawH) / 2;

    context.clearRect(0, 0, displayWidth, displayHeight);
    context.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, drawW, drawH);
  }, []);

  useEffect(() => {
    if (frames.length === 0) {
      setIsLoading(false);
      return;
    }

    imagesRef.current = new Array(frames.length).fill(null);
    let initialLoadedCount = 0;
    const targetInitialLoad = Math.min(frames.length, INITIAL_LOAD_COUNT);

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = frames[index];
        img.onload = () => {
          imagesRef.current[index] = img;
          resolve();
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${frames[index]}`);
          resolve();
        };
      });
    };

    const loadInitial = async () => {
      const promises: Promise<void>[] = [];
      for (let i = 0; i < targetInitialLoad; i++) {
        promises.push(
          loadImage(i).then(() => {
            initialLoadedCount++;
            setLoadProgress(Math.floor((initialLoadedCount / targetInitialLoad) * 100));
          })
        );
      }
      await Promise.all(promises);
      setIsLoading(false);
      for (let i = targetInitialLoad; i < frames.length; i++) {
        loadImage(i);
      }
    };

    loadInitial();
  }, [frames]);

  useEffect(() => {
    if (isLoading || frames.length === 0) return;

    const unsubscribe = frameIndex.on("change", (latest) => {
      const idx = Math.round(latest);
      if (idx !== currentFrameRef.current) {
        currentFrameRef.current = idx;
        renderFrame(idx);
      }
    });

    renderFrame(0);

    return () => unsubscribe();
  }, [isLoading, frames, frameIndex, renderFrame]);

  useEffect(() => {
    const handleResize = () => {
      if (!isLoading && frames.length > 0) {
        renderFrame(currentFrameRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [isLoading, frames, renderFrame]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: '#5f452e' }}>
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#c84b31] border-t-transparent"></div>
            <p style={{ color: 'rgba(255,255,255,0.6)' }} className="tracking-widest text-sm uppercase">
              Loading {loadProgress}%
            </p>
          </div>
        </div>
      )}

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          style={{ imageRendering: 'auto' }}
        />

        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full max-w-7xl mx-auto px-6">

            {/* 0% Scroll: Title */}
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.08, 0.12], [1, 1, 0]),
                y: useTransform(scrollYProgress, [0, 0.12], [0, -40])
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-center tracking-tight" style={{ color: 'rgba(255,255,255,0.9)' }}>
                W.I.P <span style={{ color: '#c84b31' }}>Restaurant</span>
              </h1>
            </motion.div>

            {/* 25% Scroll: Left text */}
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0.2, 0.25, 0.3, 0.35], [0, 1, 1, 0]),
                x: useTransform(scrollYProgress, [0.2, 0.35], [50, -50])
              }}
              className="absolute inset-y-0 left-6 md:left-24 flex items-center"
            >
              <h2 className="text-4xl md:text-6xl font-bold max-w-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                Fresh Ingredients.
              </h2>
            </motion.div>

            {/* 50% Scroll: Right text */}
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0.45, 0.5, 0.55, 0.6], [0, 1, 1, 0]),
                x: useTransform(scrollYProgress, [0.45, 0.6], [-50, 50])
              }}
              className="absolute inset-y-0 right-6 md:right-24 flex items-center justify-end"
            >
              <h2 className="text-4xl md:text-6xl font-bold max-w-sm text-right" style={{ color: 'rgba(255,255,255,0.9)' }}>
                Handmade with Love.
              </h2>
            </motion.div>

            {/* 75% Scroll: CTA */}
            <motion.div
              style={{
                opacity: useTransform(scrollYProgress, [0.7, 0.75, 1], [0, 1, 1]),
                y: useTransform(scrollYProgress, [0.7, 0.8], [50, 0])
              }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-8"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-center" style={{ color: 'rgba(255,255,255,0.9)' }}>
                Book Your Table
              </h1>
              <button
                className="px-8 py-4 text-white rounded-full font-medium tracking-wide transition-colors pointer-events-auto"
                style={{ backgroundColor: '#c84b31' }}
              >
                Reserve Now
              </button>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
