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
        <SectionReveal className="mx-auto mb-14 max-w-3xl text-center">
          <p
            className="mb-4 text-sm font-semibold uppercase tracking-[0.16em]"
            style={{ color: '#c84b31' }}
          >
            Contact
          </p>
          <h1 className="text-5xl font-semibold tracking-tighter md:text-7xl">
            Get in Touch
          </h1>
          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-7 md:text-lg"
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
              className="rounded-lg p-6 md:p-8"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <h2 className="mb-6 text-2xl font-semibold tracking-tighter">
                Visit Us
              </h2>
              <div className="space-y-5 text-sm leading-6">
                <div>
                  <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Address
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.62)' }}>
                    123 Pasta Lane, Little Italy, NY 10013
                  </p>
                </div>
                <div>
                  <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Phone
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.62)' }}>
                    (212) 555-0147
                  </p>
                </div>
                <div>
                  <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Email
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.62)' }}>
                    hello@wiprestaurant.com
                  </p>
                </div>
                <div>
                  <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Hours
                  </p>
                  <p style={{ color: 'rgba(255,255,255,0.62)' }}>
                    Mon-Thu 5PM-10PM
                    <br />
                    Fri-Sat 5PM-11PM
                    <br />
                    Sun CLOSED
                  </p>
                </div>
              </div>

              <div
                className="mt-8 aspect-[4/3] rounded-lg"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(200,75,49,0.68) 0%, rgba(95,69,46,0.95) 45%, rgba(61,44,26,1) 100%)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                aria-label="Styled map placeholder for Little Italy"
              >
                <div className="flex h-full items-end p-5">
                  <div
                    className="rounded-lg p-4"
                    style={{
                      backgroundColor: 'rgba(20,14,8,0.38)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.82)',
                    }}
                  >
                    <p className="text-sm font-semibold">Little Italy, NY</p>
                    <p className="mt-1 text-xs" style={{ color: 'rgba(255,255,255,0.58)' }}>
                      123 Pasta Lane
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </SectionReveal>
        </div>
      </div>
    </main>
  );
}
