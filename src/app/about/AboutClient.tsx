'use client';

import type { CSSProperties } from 'react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import SectionReveal from '@/components/SectionReveal';
import StatsCounter from '@/components/StatsCounter';

const sectionStyle = {
  backgroundColor: '#5f452e',
} satisfies CSSProperties;

export default function AboutClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  });

  const kitchenY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const chefY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <main className="min-h-screen px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <SectionReveal className="mx-auto mb-20 max-w-3xl text-center">
          <p
            className="mb-4 text-sm font-semibold uppercase tracking-[0.16em]"
            style={{ color: '#c84b31' }}
          >
            Est. 2026
          </p>
          <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
            Our Story
          </h1>
          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-7 md:text-lg"
            style={{ color: 'rgba(255,255,255,0.62)' }}
          >
            W.I.P Restaurant is a fictional client demo, designed to show how a
            focused restaurant website can feel polished, warm, and commercial.
          </p>
        </SectionReveal>

        {/* ── Stats Row ─────────────────────────────── */}
        <SectionReveal className="mb-20">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <StatsCounter value={8} suffix="+" label="Years Open" />
            <StatsCounter value={12} label="Pasta Shapes" />
            <StatsCounter value={98} suffix="%" label="Guest Satisfaction" />
            <StatsCounter value={50} suffix="K+" label="Plates Served" />
          </div>
        </SectionReveal>

        <SectionReveal className="mb-20 md:mb-28">
          <section className="grid items-center gap-10 md:grid-cols-2 md:gap-16" ref={heroRef}>
            <div>
              <p
                className="mb-4 text-sm font-semibold uppercase tracking-[0.16em]"
                style={{ color: '#c84b31' }}
              >
                The Vision
              </p>
              <h2 className="mb-6 text-3xl font-semibold tracking-tighter md:text-5xl">
                Handmade pasta, seasonal ingredients, and a slower table.
              </h2>
              <div
                className="space-y-5 text-base leading-7 md:text-lg"
                style={{ color: 'rgba(255,255,255,0.62)' }}
              >
                <p>
                  W.I.P Restaurant begins with the belief that handmade pasta is
                  one of the clearest expressions of Italian hospitality. Flour,
                  eggs, salt, and time become something personal when every sheet
                  is rolled, cut, filled, and shaped by hand.
                </p>
                <p>
                  The menu follows the market rather than the calendar alone.
                  Spring herbs, summer tomatoes, autumn mushrooms, and winter
                  braises each find their place in dishes that respect tradition
                  while keeping the experience clean, modern, and exacting.
                </p>
              </div>
            </div>

            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-lg"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                y: kitchenY,
              }}
              aria-label="Professional restaurant kitchen interior"
            >
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=750&fit=crop&q=80"
                alt="Warm, professional restaurant kitchen interior with chefs at work"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="LGFQa_01RjRi~qoLt6xu_3off6off6"
              />
            </motion.div>
          </section>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <section className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <motion.div
              className="relative order-2 aspect-[4/5] overflow-hidden rounded-lg md:order-1"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                y: chefY,
              }}
              aria-label="Professional chef portrait"
            >
              <Image
                src="https://images.unsplash.com/photo-1577219491135-ce39808891a8?w=600&h=750&fit=crop&q=80"
                alt="Professional chef in a restaurant kitchen"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="LJFfR*01RjRi~qoLt6xu_3off6off6"
              />
            </motion.div>

            <div className="order-1 md:order-2">
              <p
                className="mb-4 text-sm font-semibold uppercase tracking-[0.16em]"
                style={{ color: '#c84b31' }}
              >
                The Chef
              </p>
              <h2 className="mb-6 text-3xl font-semibold tracking-tighter md:text-5xl">
                Chef Marco Bellini
              </h2>
              <div
                className="space-y-5 text-base leading-7 md:text-lg"
                style={{ color: 'rgba(255,255,255,0.62)' }}
              >
                <p>
                  Chef Marco Bellini brings 15 years of restaurant experience to
                  W.I.P Restaurant. He trained in Bologna, where he learned the
                  discipline of sfoglia, the hand-rolled pasta sheet that anchors
                  much of the region&apos;s cooking.
                </p>
                <p>
                  A James Beard nominee, Bellini believes the best plates are the
                  simplest ones: ingredients in season, handled with care, and
                  served without unnecessary noise. His cooking lets the pasta,
                  sauce, and produce speak clearly.
                </p>
              </div>
            </div>
          </section>
        </SectionReveal>
      </div>
    </main>
  );
}
