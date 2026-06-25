'use client';

const items = [
  'Handmade Daily',
  '✦',
  'Seasonal Ingredients',
  '✦',
  'Italian Tradition',
  '✦',
  'Farm to Table',
  '✦',
  'Open Kitchen',
  '✦',
  'Pasta Fresca',
  '✦',
  'Imported Flour',
  '✦',
  'Family Recipe',
  '✦',
];

export default function Marquee() {
  return (
    <div
      className="overflow-hidden border-y py-5"
      style={{
        backgroundColor: '#3d2c1a',
        borderColor: 'rgba(212,168,83,0.08)',
      }}
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max gap-10">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.22em]"
            style={{
              color: item === '✦' ? '#d4a853' : 'rgba(255,255,255,0.35)',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
