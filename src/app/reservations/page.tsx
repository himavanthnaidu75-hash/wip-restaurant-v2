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
        <SectionReveal className="mb-12 text-center">
          <p
            className="mb-4 text-sm font-semibold uppercase tracking-[0.16em]"
            style={{ color: '#c84b31' }}
          >
            Reservations
          </p>
          <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
            Reserve Your Table
          </h1>
          <p
            className="mx-auto mt-5 max-w-xl text-base leading-7 md:text-lg"
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
