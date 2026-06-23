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
      <SectionReveal className="mx-auto mb-12 max-w-3xl text-center">
        <p
          className="mb-4 text-sm font-semibold uppercase tracking-[0.16em]"
          style={{ color: '#c84b31' }}
        >
          Seasonal Italian Cooking
        </p>
        <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
          Our Menu
        </h1>
        <p
          className="mx-auto mt-5 max-w-2xl text-base leading-7 md:text-lg"
          style={{ color: 'rgba(255,255,255,0.62)' }}
        >
          A focused collection of handmade pastas, composed plates, and classic
          desserts built around the season.
        </p>
      </SectionReveal>

      <SectionReveal delay={0.08}>
        <div className="mb-12 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Menu categories">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className="rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c84b31] focus-visible:ring-offset-2 focus-visible:ring-offset-[#5f452e]"
                style={{
                  backgroundColor: isActive ? '#c84b31' : 'rgba(255,255,255,0.05)',
                  border: isActive
                    ? '1px solid #c84b31'
                    : '1px solid rgba(255,255,255,0.1)',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.68)',
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
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          {filteredItems.map((item) => (
            <motion.article
              key={item.name}
              layout
              className="group relative rounded-lg p-6 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              whileHover={{
                boxShadow: '0 8px 32px rgba(200,75,49,0.15)',
              }}
            >
              <div
                className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(135deg, rgba(200,75,49,0.08) 0%, transparent 60%)',
                }}
              />
              <div className="relative z-10">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <h2
                      className="text-xl font-semibold tracking-tight transition-colors duration-200 group-hover:text-[#f1b2a3]"
                      style={{ color: 'rgba(255,255,255,0.9)' }}
                    >
                      {item.name}
                    </h2>
                    <p
                      className="mt-1 text-xs font-semibold uppercase tracking-[0.14em]"
                      style={{ color: 'rgba(255,255,255,0.4)' }}
                    >
                      {item.category}
                    </p>
                  </div>
                  <p
                    className="text-lg font-semibold transition-colors duration-200"
                    style={{ color: '#c84b31' }}
                  >
                    {item.price}
                  </p>
                </div>
                <p
                  className="text-sm leading-6"
                  style={{ color: 'rgba(255,255,255,0.62)' }}
                >
                  {item.description}
                </p>
                {item.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2" aria-label="Dietary tags">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-2.5 py-1 text-xs font-semibold"
                        style={{
                          backgroundColor: 'rgba(200,75,49,0.16)',
                          border: '1px solid rgba(200,75,49,0.28)',
                          color: '#f1b2a3',
                        }}
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
        className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs"
        style={{ color: 'rgba(255,255,255,0.45)' }}
      >
        <span>V = Vegetarian</span>
        <span>GF = Gluten Free</span>
        <span>DF = Dairy Free</span>
      </div>
    </div>
  );
}
