import type { Metadata } from 'next';
import SectionReveal from '@/components/SectionReveal';

const sections = [
  {
    title: '1. Information We Collect',
    body: 'We collect the information you provide when making a reservation or contacting us, including your name, email address, phone number, reservation details, party size, and any special requests you choose to share.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use your information to manage reservations, communicate confirmations and updates, respond to inquiries, improve the guest experience, and maintain accurate operational records.',
  },
  {
    title: '3. Cookies and Tracking',
    body: 'This demo website is designed to use essential cookies only when needed for basic site functionality. It does not require invasive tracking to provide the restaurant browsing experience.',
  },
  {
    title: '4. Third-Party Services',
    body: 'We may rely on third-party services for payment processing, analytics, hosting, or reservation support. Those providers are expected to process information only as needed to deliver their services.',
  },
  {
    title: '5. Data Security',
    body: 'We use reasonable safeguards such as encryption, access controls, and limited internal access to help protect guest information from unauthorized use or disclosure.',
  },
  {
    title: '6. Your Rights',
    body: 'You may request access to your information, ask us to correct inaccurate details, or request deletion of your data by contacting us directly.',
  },
  {
    title: "7. Children's Privacy",
    body: 'This website and restaurant experience are not directed at children under 13, and we do not knowingly collect personal information from children under 13.',
  },
  {
    title: '8. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated effective date.',
  },
  {
    title: '9. Contact Us',
    body: 'For privacy questions or requests, contact us at privacy@wiprestaurant.com.',
  },
];

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read the W.I.P Restaurant Privacy Policy, including how reservation and contact information is collected, used, and protected.',
};

export default function PrivacyPage() {
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
          Privacy Policy
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
