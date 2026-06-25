import type { Metadata } from 'next';
import SectionReveal from '@/components/SectionReveal';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact W.I.P Restaurant in Little Italy, NY for general inquiries, reservations, events, and feedback.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <SectionReveal className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mx-auto mb-6 h-[1px] w-10 bg-[#d4a853]" />
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.25em]"
            style={{ color: '#d4a853' }}
          >
            Contact
          </p>
          <h1 className="font-display text-5xl font-semibold tracking-tight md:text-7xl">
            Get in Touch
          </h1>
          <div className="mx-auto mt-6 h-[1px] w-12 bg-[#d4a853]/40" />
          <p
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: 'rgba(255,255,255,0.62)' }}
          >
            Questions, private dining, feedback, and special requests all start
            here.
          </p>
        </SectionReveal>

        <div className="grid gap-10 md:grid-cols-[1fr_0.9fr] md:gap-14">
          <SectionReveal>
            <ContactForm />
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <aside
              className="rounded-xl p-6 md:p-8"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(212,168,83,0.1)',
              }}
            >
              <h2 className="font-display mb-6 text-2xl font-semibold tracking-tight">
                Visit Us
              </h2>
              <div className="space-y-6 text-sm leading-relaxed">
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#d4a853]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                      Address
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.62)' }}>
                      123 Pasta Lane, Little Italy, NY 10013
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#d4a853]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                      Phone
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.62)' }}>
                      (212) 555-0147
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#d4a853]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <div>
                    <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                      Email
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.62)' }}>
                      hello@wiprestaurant.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#d4a853]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div>
                    <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                      Hours
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.62)' }}>
                      Mon&ndash;Thu 5PM&ndash;10PM
                      <br />
                      Fri&ndash;Sat 5PM&ndash;11PM
                      <br />
                      <span style={{ color: '#d4a853' }}>Sun CLOSED</span>
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="group relative mt-8 aspect-[4/3] overflow-hidden rounded-xl"
                style={{ border: '1px solid rgba(212,168,83,0.12)' }}
                aria-label="Little Italy, New York streetscape"
              >
                <img
                  src="https://images.unsplash.com/photo-1569336415962-a4bd9f609a1b?w=600&h=450&fit=crop&q=80"
                  alt="Little Italy streetscape in New York City with historic brownstones and cafe awnings"
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-5 left-5 rounded-lg p-4 backdrop-blur-md"
                  style={{
                    backgroundColor: 'rgba(20,14,8,0.5)',
                    border: '1px solid rgba(212,168,83,0.15)',
                    color: 'rgba(255,255,255,0.82)',
                  }}
                >
                  <p className="text-sm font-semibold">Little Italy, NY</p>
                  <p className="mt-1 text-xs" style={{ color: 'rgba(255,255,255,0.58)' }}>
                    123 Pasta Lane
                  </p>
                </div>
              </div>
            </aside>
          </SectionReveal>
        </div>
      </div>
    </main>
  );
}
