import Link from 'next/link';
import SectionReveal from '@/components/SectionReveal';

const signatureDishes = [
  {
    name: 'Truffle Tagliatelle',
    description:
      'Hand-rolled pasta with black truffle cream sauce and aged parmesan',
    price: '$32',
    gradient: 'linear-gradient(135deg, #3d2c1a 0%, #7a5a3a 54%, #c8a46d 100%)',
  },
  {
    name: 'Lobster Ravioli',
    description:
      'Saffron-infused ravioli filled with fresh lobster, served in a bisque reduction',
    price: '$34',
    gradient: 'linear-gradient(135deg, #4a2019 0%, #8f3f2d 52%, #d78b61 100%)',
  },
  {
    name: 'Wild Boar Pappardelle',
    description: 'Slow-braised wild boar ragu on house-made pappardelle',
    price: '$28',
    gradient: 'linear-gradient(135deg, #2d2418 0%, #5f452e 50%, #9a6a42 100%)',
  },
];

export default function HomeSections() {
  return (
    <>
      <section id="intro" className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionReveal className="mx-auto mb-14 max-w-3xl text-center">
            <p
              className="mb-4 text-sm font-semibold uppercase tracking-[0.16em]"
              style={{ color: '#c84b31' }}
            >
              Our Philosophy
            </p>
            <h1 className="text-4xl font-semibold tracking-tighter md:text-6xl">
              Where Every Dish Tells a Story
            </h1>
            <p
              className="mt-6 text-base leading-7 md:text-lg"
              style={{ color: 'rgba(255,255,255,0.62)' }}
            >
              W.I.P Restaurant is built around pasta made by hand, sauces cooked
              with patience, and ingredients chosen at their seasonal peak. Our
              kitchen honors Italian tradition while leaving space for a modern
              New York point of view.
            </p>
          </SectionReveal>

          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <SectionReveal>
              <div className="space-y-5 text-base leading-7 md:text-lg">
                <p style={{ color: 'rgba(255,255,255,0.68)' }}>
                  Every morning begins with flour, eggs, and a long wooden table.
                  Tagliatelle is rolled thin, ravioli is folded one piece at a
                  time, and each shape is matched to the sauce it carries best.
                </p>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>
                  The room is warm but restrained: candlelight, thoughtful wine,
                  and plates that feel generous without being loud. It is a
                  restaurant for slow dinners and small celebrations.
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.12}>
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-lg"
                style={{
                  background:
                    'radial-gradient(circle at 28% 30%, rgba(255,255,255,0.18), transparent 26%), linear-gradient(135deg, #3d2c1a 0%, #7d5a39 48%, #c84b31 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                aria-label="Styled handmade pasta photo placeholder"
              >
                <div
                  className="absolute inset-x-8 bottom-8 rounded-lg p-5"
                  style={{
                    backgroundColor: 'rgba(25,17,10,0.36)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <p
                    className="text-sm font-semibold uppercase tracking-[0.16em]"
                    style={{ color: 'rgba(255,255,255,0.58)' }}
                  >
                    Handmade Daily
                  </p>
                  <p
                    className="mt-2 text-2xl font-semibold tracking-tighter"
                    style={{ color: 'rgba(255,255,255,0.9)' }}
                  >
                    Fresh pasta, warm table, honest craft.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <section
        id="signature-dishes"
        className="px-5 py-24 md:px-8 md:py-32"
        style={{
          backgroundColor: '#4f3925',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="mx-auto max-w-7xl">
          <SectionReveal className="mb-14 text-center">
            <p
              className="mb-4 text-sm font-semibold uppercase tracking-[0.16em]"
              style={{ color: '#c84b31' }}
            >
              Signature Dishes
            </p>
            <h2 className="text-4xl font-semibold tracking-tighter md:text-5xl">
              Crafted by Hand
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {signatureDishes.map((dish, index) => (
              <SectionReveal key={dish.name} delay={index * 0.08}>
                <article
                  className="h-full overflow-hidden rounded-lg"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div
                    className="aspect-[4/3]"
                    style={{ background: dish.gradient }}
                    aria-label={`${dish.name} styled dish placeholder`}
                  />
                  <div className="p-6">
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <h3
                        className="text-xl font-semibold tracking-tight"
                        style={{ color: 'rgba(255,255,255,0.9)' }}
                      >
                        {dish.name}
                      </h3>
                      <p
                        className="text-lg font-semibold"
                        style={{ color: '#c84b31' }}
                      >
                        {dish.price}
                      </p>
                    </div>
                    <p
                      className="text-sm leading-6"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      {dish.description}
                    </p>
                  </div>
                </article>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="reservation-cta" className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <SectionReveal>
            <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">
              Reserve Your Table
            </h2>
            <p
              className="mx-auto mt-6 max-w-2xl text-base leading-7 md:text-lg"
              style={{ color: 'rgba(255,255,255,0.62)' }}
            >
              Join us for an unforgettable evening of handmade pasta and warm
              hospitality.
            </p>
            <Link
              href="/reservations"
              className="mt-9 inline-flex rounded-full bg-[#c84b31] px-8 py-4 text-sm font-semibold tracking-tight text-white transition-colors hover:bg-[#a63d27] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c84b31] focus-visible:ring-offset-2 focus-visible:ring-offset-[#5f452e]"
              aria-label="Reserve a table at W.I.P Restaurant"
            >
              Reserve Now
            </Link>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
