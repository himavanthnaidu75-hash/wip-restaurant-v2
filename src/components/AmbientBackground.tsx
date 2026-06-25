'use client';

import { useCallback, useEffect, useRef } from 'react';

const TOTAL_FRAMES = 260;

function framePath(index: number): string {
  return `/sequence/ezgif-frame-${String(index + 1).padStart(3, '0')}.png`;
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const framesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const currentFrameRef = useRef(-1);
  const pendingFrameRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const imgDims = useRef({ w: 0, h: 0 });

  // ─── Draw a single frame with object-fit: cover logic ──────────────
  const drawFrame = useCallback((index: number) => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const img = framesRef.current.get(index);
    if (!ctx || !canvas || !img) return;

    // Capture native image dimensions once
    if (imgDims.current.w === 0) {
      imgDims.current = { w: img.naturalWidth, h: img.naturalHeight };
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Use device pixel ratio for crisp rendering (cap at 2x for perf)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Size the canvas buffer to match viewport × DPR
    const bufW = Math.round(vw * dpr);
    const bufH = Math.round(vh * dpr);
    if (canvas.width !== bufW || canvas.height !== bufH) {
      canvas.width = bufW;
      canvas.height = bufH;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
    }

    // Cover-fit: scale up to fill, then center
    const { w: imgW, h: imgH } = imgDims.current;
    const imgAspect = imgW / imgH;
    const canvasAspect = bufW / bufH;

    let drawW: number, drawH: number;
    if (imgAspect > canvasAspect) {
      // Image is wider than canvas → fit by height, crop sides
      drawH = bufH;
      drawW = bufH * imgAspect;
    } else {
      // Image is taller → fit by width, crop top/bottom
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

  // ─── Setup canvas context ──────────────────────────────────────────
  useEffect(() => {
    if (canvasRef.current) {
      ctxRef.current = canvasRef.current.getContext('2d', { alpha: false });
    }
  }, []);

  // ─── Preload frames progressively ─────────────────────────────────
  useEffect(() => {
    const load = (idx: number) => {
      if (framesRef.current.has(idx)) return;
      const img = new Image();
      img.onload = () => {
        framesRef.current.set(idx, img);
        // Draw first frame as soon as it lands
        if (idx === 0 && currentFrameRef.current === -1) {
          drawFrame(0);
        }
        // If scroll was waiting for this frame, draw it now
        if (pendingFrameRef.current === idx) {
          drawFrame(idx);
          pendingFrameRef.current = null;
        }
      };
      img.src = framePath(idx);
    };

    // Priority batch: first 8 frames instantly
    for (let i = 0; i < 8; i++) load(i);

    // Load the rest in batches of 20, spaced 150ms apart
    let cursor = 8;
    const timer = setInterval(() => {
      const end = Math.min(cursor + 20, TOTAL_FRAMES);
      for (let i = cursor; i < end; i++) load(i);
      cursor = end;
      if (cursor >= TOTAL_FRAMES) clearInterval(timer);
    }, 150);

    return () => clearInterval(timer);
  }, [drawFrame]);

  // ─── Scroll-driven frame selection ────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return; // already queued

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
          // Frame not loaded yet — show the closest loaded frame and mark pending
          pendingFrameRef.current = frameIndex;
          // Find nearest loaded frame
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
    // Draw initial frame on mount
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
        style={{ display: 'block' }}
      />
      {/* Semi-transparent overlay — light enough to see the animation, 
          dark enough for white text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(20,14,8,0.45) 0%, rgba(30,20,12,0.35) 40%, rgba(20,14,8,0.55) 100%)',
        }}
      />
      {/* Film-grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  );
}
