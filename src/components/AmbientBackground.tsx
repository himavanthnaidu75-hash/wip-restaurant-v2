'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 260;
const INITIAL_BATCH = 30;
const BATCH_SIZE = 25;
const BATCH_DELAY = 80;

function framePath(index: number): string {
  return `/sequence/ezgif-frame-${String(index + 1).padStart(3, '0')}.webp`;
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const framesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef(-1);
  const pendingFrameRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const imgDims = useRef({ w: 0, h: 0 });
  const [ready, setReady] = useState(false);
  const loadedCountRef = useRef(0);

  const drawFrame = useCallback((index: number) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const img = framesRef.current.get(index);
    if (!ctx || !canvas || !img) return;

    if (imgDims.current.w === 0) {
      imgDims.current = { w: img.naturalWidth, h: img.naturalHeight };
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const bufW = Math.round(vw * dpr);
    const bufH = Math.round(vh * dpr);
    if (canvas.width !== bufW || canvas.height !== bufH) {
      canvas.width = bufW;
      canvas.height = bufH;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
    }

    const { w: imgW, h: imgH } = imgDims.current;
    const imgAspect = imgW / imgH;
    const canvasAspect = bufW / bufH;

    let drawW: number, drawH: number;
    if (imgAspect > canvasAspect) {
      drawH = bufH;
      drawW = bufH * imgAspect;
    } else {
      drawW = bufW;
      drawH = bufW / imgAspect;
    }

    const offsetX = (bufW - drawW) / 2;
    const offsetY = (bufH - drawH) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.clearRect(0, 0, bufW, bufH);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

    currentFrameRef.current = index;
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext('2d', { alpha: false });
    }
  }, []);

  // ─── Preload frames with priority batching ───────────────────────
  useEffect(() => {
    const load = (idx: number): Promise<void> => {
      if (framesRef.current.has(idx)) return Promise.resolve();
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          framesRef.current.set(idx, img);
          loadedCountRef.current++;

          if (idx === 0 && currentFrameRef.current === -1) {
            drawFrame(0);
          }
          if (pendingFrameRef.current === idx) {
            drawFrame(idx);
            pendingFrameRef.current = null;
          }

          // Show after first batch lands
          if (loadedCountRef.current === INITIAL_BATCH) {
            setReady(true);
          }

          resolve();
        };
        img.onerror = () => resolve();
        img.src = framePath(idx);
      });
    };

    // Phase 1: load first INITIAL_BATCH frames, then show
    const loadInitial = async () => {
      const batch = [];
      for (let i = 0; i < INITIAL_BATCH; i++) {
        batch.push(load(i));
      }
      await Promise.all(batch);
      setReady(true);
    };
    loadInitial();

    // Phase 2: load remaining frames in background batches
    let cursor = INITIAL_BATCH;
    const timer = setInterval(() => {
      const end = Math.min(cursor + BATCH_SIZE, TOTAL_FRAMES);
      if (cursor >= TOTAL_FRAMES) {
        clearInterval(timer);
        return;
      }
      for (let i = cursor; i < end; i++) load(i);
      cursor = end;
    }, BATCH_DELAY);

    return () => clearInterval(timer);
  }, [drawFrame]);

  // ─── Scroll-driven frame selection ────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;

        const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
        const frameIndex = Math.min(
          Math.floor(progress * TOTAL_FRAMES),
          TOTAL_FRAMES - 1
        );

        if (frameIndex === currentFrameRef.current) return;

        if (framesRef.current.has(frameIndex)) {
          drawFrame(frameIndex);
        } else {
          pendingFrameRef.current = frameIndex;
          for (let delta = 1; delta < 10; delta++) {
            const below = frameIndex - delta;
            const above = frameIndex + delta;
            if (below >= 0 && framesRef.current.has(below)) {
              drawFrame(below);
              break;
            }
            if (above < TOTAL_FRAMES && framesRef.current.has(above)) {
              drawFrame(above);
              break;
            }
          }
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [drawFrame]);

  // ─── Handle resize ────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => {
      if (currentFrameRef.current >= 0) {
        drawFrame(currentFrameRef.current);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [drawFrame]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          display: 'block',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out',
        }}
      />
      {/* Loading indicator */}
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1209]">
          <div className="flex flex-col items-center gap-4">
            <div className="h-1 w-32 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#d4a853]"
                style={{
                  animation: 'loading-bar 2s ease-in-out forwards',
                }}
              />
            </div>
            <p className="text-sm tracking-widest text-white/40 uppercase">
              Loading...
            </p>
          </div>
        </div>
      )}
      {/* Semi-transparent overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(20,14,8,0.45) 0%, rgba(30,20,12,0.35) 40%, rgba(20,14,8,0.55) 100%)',
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.6s ease-in-out',
        }}
      />
      {/* Film-grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
          opacity: ready ? 0.025 : 0,
        }}
      />
    </div>
  );
}
