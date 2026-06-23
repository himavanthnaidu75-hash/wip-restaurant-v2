'use client';

import type { CSSProperties } from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SectionReveal from '@/components/SectionReveal';
import Marquee from '@/components/Marquee';
import Testimonials from '@/components/Testimonials';

const dishes = [
  {
    name: 'Cacio e Pepe',
    description: 'Tonnarelli, pecorino romano, cracked black pepper',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop&q=80',
    blur: 'LGFQa_01RjRi~qoLt6xu_3off6off6',
  },
  {
    name: 'Tagliatelle al Ragù',
    description: 'Hand-cut egg pasta, slow-cooked Bolognese',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop&q=80',
    blur: 'LJFfR*01K~aetRoLflob_3off6off6',
  },
  {
    name: 'Gnocchi al Pesto',
    description: 'Potato gnocchi, Genovese basil, pine nuts',
    image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=600&h=400&fit=crop&q=80',
    blur: 'LMDpW-01%gM{~qIoM{of_3off6off6',
  },
];

const sectionStyle = {
  backgroundColor: '#5f452e',
} satisfies CSSProperties;

function Counter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const valueRef = useRef(0);

  if (isInView && ref.current && valueRef.current === 0) {
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      if (ref.current) ref.current.textContent = String(current);
      valueRef.current = current;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return <span ref={ref}>0</span>;
}

export default function HomeSections() {
  return (
    <>
      {/* ── Intro ────────────────────────────────────── */}
      <section id="intro" className="relative z-10 px-5 py-24 md:px-8" style={sectionStyle}>
        <SectionReveal className="mx-auto max-w-4xl text-center">
          <p
            className="mb-4 text-sm font-semibold uppercase tracking-[0.16em]"
            style={{ color: '#c84b31' }}
          >
            Welcome to W.I.P
          </p>
          <h2 className="mb-6 text-4xl font-semibold tracking-tighter md:text-6xl">
            Where every dish tells a story
          </h2>
          <p
            className="mx-auto max-w-2xl text-base leading-7 md:text-lg"
            style={{ color: 'rgba(255,255,255,0.62)' }}
          >
            We craft handmade pasta daily using imported Italian flour, farm-fresh eggs, and seasonal ingredients sourced from local growers. Every plate is made to order, just as it would be in a true Italian kitchen.
          </p>
        </SectionReveal>
      </section>

      {/* ── Marquee ──────────────────────────────────── */}
      <Marquee />

      {/* ── Signature Dishes ─────────────────────────── */}
      <section className="px-5 py-24 md:px-8" style={sectionStyle}>
        <SectionReveal className="mb-14 text-center">
          <p
            className="mb-4 text-sm font-semibold uppercase tracking-[0.16em]"
            style={{ color: '#c84b31' }}
          >
            From Our Kitchen
          </p>
          <h2 className="text-4xl font-semibold tracking-tighter md:text-5xl">
            Signature Dishes
          </h2>
        </SectionReveal>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {dishes.map((dish, i) => (
            <SectionReveal key={dish.name} delay={i * 0.1}>
              <div
                className="group relative overflow-hidden rounded-lg transition-transform duration-300 hover:-translate-y-1"
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={dish.blur}
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
                    style={{
                      background: 'linear-gradient(to top, rgba(61,44,26,0.95) 0%, transparent 60%)',
                    }}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3
                    className="mb-1 text-lg font-semibold tracking-tight"
                    style={{ color: 'rgba(255,255,255,0.95)' }}
                  >
                    {dish.name}
                  </h3>
                  <p
                    className="text-sm leading-5"
                    style={{ color: 'rgba(255,255,255,0.65)' }}
                  >
                    {dish.description}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── Stats Ticker ─────────────────────────────── */}
      <section
        className="border-y px-5 py-16 md:px-8"
        style={{
          backgroundColor: '#3d2c1a',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
      >
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 md:grid-cols-4">
          {[
            { value: 8, suffix: '+', label: 'Years Open' },
            { value: 340, suffix: '+', label: 'Menu Frames Rendered' },
            { value: 12, suffix: '', label: 'Pasta Shapes' },
            { value: 98, suffix: '%', label: 'Guest Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="mb-1 text-4xl font-semibold tracking-tighter md:text-5xl"
                style={{ color: '#c84b31' }}
              >
                <Counter target={stat.value} />
                {stat.suffix}
              </p>
              <p
                className="text-sm font-semibold uppercase tracking-[0.12em]"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────── */}
      <Testimonials />

      {/* ── Hours CTA ────────────────────────────────── */}
      <section className="px-5 py-24 md:px-8" style={sectionStyle}>
        <SectionReveal className="mx-auto max-w-4xl text-center">
          <p
            className="mb-4 text-sm font-semibold uppercase tracking-[0.16em]"
            style={{ color: '#c84b31' }}
          >
            Join Us
          </p>
          <h2 className="mb-6 text-4xl font-semibold tracking-tighter md:text-6xl">
            A table is waiting for you
          </h2>
          <p
            className="mx-auto mb-10 max-w-2xl text-base leading-7 md:text-lg"
            style={{ color: 'rgba(255,255,255,0.62)' }}
          >
            Open for dinner five nights a week. Walk-ins welcome, reservations recommended for parties of four or more.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/reservations"
              className="rounded-full bg-[#c84b31] px-8 py-4 text-sm font-semibold tracking-tight text-white transition-colors hover:bg-[#a63d27]"
            >
              Reserve a Table
            </Link>
            <Link
              href="/menu"
              className="rounded-full px-8 py-4 text-sm font-semibold tracking-tight transition-colors"
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              View Full Menu
            </Link>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
