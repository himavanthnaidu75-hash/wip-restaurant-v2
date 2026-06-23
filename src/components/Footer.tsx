import Link from 'next/link';

const quickLinks = [
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/contact', label: 'Contact' },
];

const focusClass =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c84b31] focus-visible:ring-offset-2 focus-visible:ring-offset-[#3d2c1a]';

export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: '#3d2c1a',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <div className="mb-4 flex items-baseline">
            <span
              className="text-2xl font-bold tracking-tighter"
              style={{ color: 'rgba(255,255,255,0.9)' }}
            >
              W.I.P
            </span>
            <span
              className="ml-1 text-sm font-semibold tracking-tight"
              style={{ color: '#c84b31' }}
            >
              Restaurant
            </span>
          </div>
          <p
            className="max-w-xs text-sm leading-6"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Handcrafted Pasta. Honest Ingredients.
          </p>
          <div className="mt-6 flex gap-3" aria-label="Social media placeholders">
            {['IG', 'FB', 'X'].map((label) => (
              <span
                key={label}
                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2
            className="mb-4 text-sm font-semibold uppercase tracking-[0.14em]"
            style={{ color: 'rgba(255,255,255,0.9)' }}
          >
            Quick Links
          </h2>
          <nav className="flex flex-col items-start gap-3" aria-label="Footer navigation">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={`Go to ${link.label}`}
                className={`rounded-sm text-sm transition-colors hover:text-[#c84b31] ${focusClass}`}
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2
            className="mb-4 text-sm font-semibold uppercase tracking-[0.14em]"
            style={{ color: 'rgba(255,255,255,0.9)' }}
          >
            Contact Info
          </h2>
          <address
            className="space-y-3 text-sm not-italic leading-6"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            <p>123 Pasta Lane, Little Italy, NY 10013</p>
            <p>(212) 555-0147</p>
            <p>hello@wiprestaurant.com</p>
            <p>
              Mon-Thu 5PM-10PM
              <br />
              Fri-Sat 5PM-11PM
              <br />
              Sun CLOSED
            </p>
          </address>
        </div>
      </div>

      <div
        className="border-t px-5 py-6"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-xs md:flex-row md:text-left">
          <p style={{ color: 'rgba(255,255,255,0.45)' }}>
            &copy; 2026 W.I.P Restaurant. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/privacy"
              aria-label="Read the Privacy Policy"
              className={`rounded-sm transition-colors hover:text-[#c84b31] ${focusClass}`}
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Privacy Policy
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>|</span>
            <Link
              href="/terms"
              aria-label="Read the Terms of Service"
              className={`rounded-sm transition-colors hover:text-[#c84b31] ${focusClass}`}
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
