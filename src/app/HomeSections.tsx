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
    price: '$24',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop&q=80',
    blur: 'LGFQa_01RjRi~qoLt6xu_3off6off6',
  },
  {
    name: 'Tagliatelle al Ragù',
    description: 'Hand-cut egg pasta, slow-cooked Bolognese',
    price: '$28',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop&q=80',
    blur: 'LJFfR*01K~aetRoLflob_3off6off6',
  },
  {
    name: 'Gnocchi al Pesto',
    description: 'Potato gnocchi, Genovese basil, pine nuts',
    price: '$26',
    image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=600&h=400&fit=crop&q=80',
    blur: 'LMDpW-01%gM{~qIoM{of_3off6off6',
  },
];

const sectionStyle = {
  backgroundColor: '#5f452e',
} satisfies CSSProperties;

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
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
      {/* ── Section Divider ─────────────────────────── */}
      <div className="section-divider mx-auto w-3/4" />

      {/* ── Intro ────────────────────────────────────── */}
      <section id="intro" className="relative z-10 px-5 py-28 md:px-8" style={sectionStyle}>
        <SectionReveal className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mb-6 h-[1px] bg-[#d4a853]"
          />
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: '#d4a853' }}
          >
            Welcome to W.I.P
          </p>
          <h2 className="font-display mb-6 text-4xl font-semibold tracking-tight md:text-6xl">
            Where every dish tells a story
          </h2>
          <div className="mx-auto mb-8 h-[1px] w-12 bg-[#d4a853]/40" />
          <p
            className="mx-auto max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: 'rgba(255,255,255,0.62)' }}
          >
            We craft handmade pasta daily using imported Italian flour, farm-fresh eggs, and seasonal ingredients sourced from local growers. Every plate is made to order, just as it would be in a true Italian kitchen.
          </p>
        </SectionReveal>
      </section>

      {/* ── Marquee ──────────────────────────────────── */}
      <Marquee />

      {/* ── Signature Dishes ─────────────────────────── */}
      <section className="px-5 py-28 md:px-8" style={sectionStyle}>
        <SectionReveal className="mb-16 text-center">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: '#d4a853' }}
          >
            From Our Kitchen
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Signature Dishes
          </h2>
          <div className="mx-auto mt-6 h-[1px] w-12 bg-[#d4a853]/40" />
        </SectionReveal>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {dishes.map((dish, i) => (
            <SectionReveal key={dish.name} delay={i * 0.1}>
              <div
                className="group relative overflow-hidden rounded-xl transition-all duration-500"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                    blurDataURL={dish.blur}
                  />
                  {/* Premium gradient overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(to top, rgba(61,44,26,0.95) 0%, rgba(61,44,26,0.1) 50%, transparent 80%)',
                    }}
                  />
                  {/* Gold accent line on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ backgroundColor: '#d4a853' }}
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 pb-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3
                        className="font-display mb-1.5 text-xl font-semibold tracking-tight"
                        style={{ color: 'rgba(255,255,255,0.95)' }}
                      >
                        {dish.name}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                      >
                        {dish.description}
                      </p>
                    </div>
                    <span
                      className="shrink-0 pt-1 text-lg font-semibold"
                      style={{ color: '#d4a853' }}
                    >
                      {dish.price}
                    </span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.3} className="mt-12 text-center">
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold tracking-tight transition-all duration-300 hover:border-[#d4a853] hover:text-[#d4a853]"
            style={{
              borderColor: 'rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            View Full Menu
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
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
          </Link>
        </SectionReveal>
      </section>

      {/* ── Stats Ticker ─────────────────────────────── */}
      <section
        className="border-y px-5 py-20 md:px-8"
        style={{
          backgroundColor: '#3d2c1a',
          borderColor: 'rgba(212,168,83,0.08)',
        }}
      >
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 md:grid-cols-4">
          {[
            { value: 8, suffix: '+', label: 'Years Open' },
            { value: 340, suffix: '+', label: 'Menu Frames Rendered' },
            { value: 12, suffix: '', label: 'Pasta Shapes' },
            { value: 98, suffix: '%', label: 'Guest Satisfaction' },
          ].map((stat) => (
            <div key={stat.label} className="group text-center">
              <p
                className="mb-1 font-display text-4xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-[#e8c882] md:text-5xl"
                style={{ color: '#d4a853' }}
              >
                <Counter target={stat.value} />
                {stat.suffix}
              </p>
              <p
                className="text-xs font-semibold uppercase tracking-[0.18em]"
                style={{ color: 'rgba(255,255,255,0.45)' }}
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
      <section
        className="relative overflow-hidden px-5 py-28 md:px-8"
        style={sectionStyle}
      >
        {/* Subtle background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #d4a853 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <SectionReveal className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mb-6 h-[1px] bg-[#d4a853]"
          />
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: '#d4a853' }}
          >
            Join Us
          </p>
          <h2 className="font-display mb-6 text-4xl font-semibold tracking-tight md:text-6xl">
            A table is waiting for you
          </h2>
          <div className="mx-auto mb-8 h-[1px] w-12 bg-[#d4a853]/40" />
          <p
            className="mx-auto mb-12 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: 'rgba(255,255,255,0.62)' }}
          >
            Open for dinner five nights a week. Walk-ins welcome, reservations recommended for parties of four or more.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/reservations"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#d4a853] px-8 py-4 text-sm font-semibold tracking-tight text-[#3d2c1a] transition-all duration-300 hover:bg-[#e8c882] hover:shadow-lg hover:shadow-[#d4a853]/20"
            >
              <span className="relative z-10">Reserve a Table</span>
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
            </Link>
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 rounded-full border px-8 py-4 text-sm font-semibold tracking-tight transition-all duration-300 hover:border-[#d4a853] hover:text-[#d4a853]"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              View Full Menu
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
            </Link>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
