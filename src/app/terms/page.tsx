import type { Metadata } from 'next';
import SectionReveal from '@/components/SectionReveal';

const sections = [
  {
    title: '1. Reservations Policy',
    body: 'Reservation requests are subject to availability and are not final until confirmed. We hold confirmed reservations for a 15-minute grace period before releasing the table.',
  },
  {
    title: '2. Cancellation Policy',
    body: 'Please provide at least 24-hour notice for cancellations or material changes to your reservation so we can make the table available to other guests.',
  },
  {
    title: '3. Menu and Pricing',
    body: 'Menu items, ingredients, and pricing are subject to change based on seasonality, market availability, and restaurant operations.',
  },
  {
    title: '4. Allergen Information',
    body: 'Guests are responsible for informing our staff of allergies or dietary restrictions before ordering. We will make reasonable efforts to accommodate requests, but cross-contact may occur.',
  },
  {
    title: '5. Liability',
    body: 'To the fullest extent permitted by law, W.I.P Restaurant limits liability for indirect, incidental, or consequential damages connected to use of this website or restaurant services.',
  },
  {
    title: '6. Intellectual Property',
    body: 'All website content, branding, copy, layout, and visual presentation are owned by W.I.P Restaurant or its licensors and may not be reused without permission.',
  },
  {
    title: '7. Governing Law',
    body: 'These Terms of Service are governed by the laws of the State of New York, without regard to conflict of law principles.',
  },
  {
    title: '8. Contact Us',
    body: 'For questions about these terms, contact hello@wiprestaurant.com.',
  },
];

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Read the W.I.P Restaurant Terms of Service, including reservations, cancellations, menu changes, allergens, and governing law.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <SectionReveal className="mx-auto max-w-3xl">
        <p
          className="mb-4 text-sm font-semibold uppercase tracking-[0.16em]"
          style={{ color: '#c84b31' }}
        >
          Last updated: January 2026
        </p>
        <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
          Terms of Service
        </h1>
        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2
                className="mb-3 text-2xl font-semibold tracking-tighter"
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                {section.title}
              </h2>
              <p
                className="text-base leading-7"
                style={{ color: 'rgba(255,255,255,0.62)' }}
              >
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </SectionReveal>
    </main>
  );
}
