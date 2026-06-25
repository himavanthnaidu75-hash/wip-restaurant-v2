'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionReveal from '@/components/SectionReveal';

const categories = ['All', 'Antipasti', 'Primi', 'Secondi', 'Contorni', 'Dolci'] as const;

type Category = (typeof categories)[number];
type MenuItem = {
  name: string;
  description: string;
  price: string;
  category: Exclude<Category, 'All'>;
  tags: readonly string[];
};

interface MenuClientProps {
  items: readonly MenuItem[];
}

const tagKey: Record<string, string> = {
  V: 'Vegetarian',
  GF: 'Gluten Free',
  DF: 'Dairy Free',
};

export default function MenuClient({ items }: MenuClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') {
      return items;
    }

    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  return (
    <div className="mx-auto max-w-6xl">
      <SectionReveal className="mx-auto mb-16 max-w-3xl text-center">
        <div className="mx-auto mb-6 h-[1px] w-10 bg-[#d4a853]" />
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]"
          style={{ color: '#d4a853' }}
        >
          Seasonal Italian Cooking
        </p>
        <h1 className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
          Our Menu
        </h1>
        <div className="mx-auto mt-6 h-[1px] w-12 bg-[#d4a853]/40" />
        <p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
          style={{ color: 'rgba(255,255,255,0.62)' }}
        >
          A focused collection of handmade pastas, composed plates, and classic
          desserts built around the season.
        </p>
      </SectionReveal>

      <SectionReveal delay={0.08}>
        <div className="mb-14 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Menu categories">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className="relative rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853] focus-visible:ring-offset-2 focus-visible:ring-offset-[#5f452e]"
                style={{
                  backgroundColor: isActive ? 'rgba(212,168,83,0.12)' : 'rgba(255,255,255,0.04)',
                  border: isActive
                    ? '1px solid rgba(212,168,83,0.35)'
                    : '1px solid rgba(255,255,255,0.08)',
                  color: isActive ? '#d4a853' : 'rgba(255,255,255,0.6)',
                }}
                role="tab"
                aria-selected={isActive}
              >
                {category}
              </button>
            );
          })}
        </div>
      </SectionReveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          {filteredItems.map((item, index) => (
            <motion.article
              key={item.name}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
              className="group relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:-translate-y-1"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,168,83,0.06) 0%, transparent 60%)',
                }}
              />

              {/* Gold accent line on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[1px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ backgroundColor: 'rgba(212,168,83,0.3)' }}
              />

              <div className="relative z-10">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <h2
                      className="font-display text-xl font-semibold tracking-tight transition-colors duration-200"
                      style={{ color: 'rgba(255,255,255,0.9)' }}
                    >
                      {item.name}
                    </h2>
                    <p
                      className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]"
                      style={{ color: 'rgba(212,168,83,0.5)' }}
                    >
                      {item.category}
                    </p>
                  </div>
                  <p
                    className="shrink-0 pt-1 text-lg font-semibold"
                    style={{ color: '#d4a853' }}
                  >
                    {item.price}
                  </p>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.58)' }}
                >
                  {item.description}
                </p>
                {item.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2" aria-label="Dietary tags">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                        style={{
                          backgroundColor: 'rgba(212,168,83,0.08)',
                          border: '1px solid rgba(212,168,83,0.15)',
                          color: '#d4a853',
                        }}
                        title={tagKey[tag] || tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </AnimatePresence>

      <div
        className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs"
        style={{ color: 'rgba(255,255,255,0.4)' }}
      >
        {Object.entries(tagKey).map(([key, value]) => (
          <span key={key}>
            <span style={{ color: '#d4a853' }}>{key}</span> = {value}
          </span>
        ))}
      </div>
    </div>
  );
}
