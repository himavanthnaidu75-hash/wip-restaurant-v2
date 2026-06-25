import type { Metadata } from 'next';
import SectionReveal from '@/components/SectionReveal';
import ReservationForm from './ReservationForm';

export const metadata: Metadata = {
  title: 'Reservations',
  description:
    'Reserve your table at W.I.P Restaurant for handmade pasta and warm hospitality in Little Italy, New York.',
};

export default function ReservationsPage() {
  return (
    <main className="min-h-screen px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto max-w-3xl">
        <SectionReveal className="mb-16 text-center">
          <div className="mx-auto mb-6 h-[1px] w-10 bg-[#d4a853]" />
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: '#d4a853' }}
          >
            Reservations
          </p>
          <h1 className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
            Reserve Your Table
          </h1>
          <div className="mx-auto mt-6 h-[1px] w-12 bg-[#d4a853]/40" />
          <p
            className="mx-auto mt-6 max-w-xl text-base leading-relaxed md:text-lg"
            style={{ color: 'rgba(255,255,255,0.62)' }}
          >
            Tell us when you would like to join us. We will confirm your
            reservation request by email within 2 hours.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <ReservationForm />
        </SectionReveal>
      </div>
    </main>
  );
}
