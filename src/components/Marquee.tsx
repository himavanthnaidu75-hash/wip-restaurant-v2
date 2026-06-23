'use client';

const items = [
  'Handmade Daily',
  '•',
  'Seasonal Ingredients',
  '•',
  'Italian Tradition',
  '•',
  'Farm to Table',
  '•',
  'Open Kitchen',
  '•',
  'Pasta Fresca',
  '•',
];

export default function Marquee() {
  return (
    <div
      className="overflow-hidden border-y py-4"
      style={{
        backgroundColor: '#3d2c1a',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max gap-8">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.16em]"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
