import type { Metadata } from 'next';
import SectionReveal from '@/components/SectionReveal';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Learn about W.I.P Restaurant, Chef Marco Bellini, and our commitment to handmade pasta, seasonal ingredients, and Italian tradition.',
};

export default function AboutPage() {
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

        <SectionReveal className="mb-20 md:mb-28">
          <section className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
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

            <div
              className="aspect-[4/5] rounded-lg"
              style={{
                background:
                  'radial-gradient(circle at 30% 24%, rgba(255,255,255,0.16), transparent 24%), linear-gradient(150deg, #3d2c1a 0%, #765538 50%, #c84b31 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              aria-label="Styled kitchen placeholder"
            />
          </section>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <section className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div
              className="order-2 aspect-[4/5] rounded-lg md:order-1"
              style={{
                background:
                  'radial-gradient(circle at 66% 28%, rgba(255,255,255,0.14), transparent 24%), linear-gradient(150deg, #2f2116 0%, #5f452e 48%, #9f6040 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              aria-label="Styled chef portrait placeholder"
            />

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
