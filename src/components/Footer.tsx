import Link from 'next/link';

const quickLinks = [
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/contact', label: 'Contact' },
];

const focusClass =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853] focus-visible:ring-offset-2 focus-visible:ring-offset-[#3d2c1a]';

function SocialIcon({ path, label }: { path: string; label: string }) {
  return (
    <a
      href="#"
      className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:bg-[#d4a853] hover:text-[#3d2c1a]"
      style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.08)',
        color: 'rgba(255,255,255,0.45)',
      }}
      aria-label={`Follow us on ${label}`}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {path === 'instagram' && (
          <>
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
          </>
        )}
        {path === 'facebook' && (
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        )}
        {path === 'twitter' && (
          <>
            <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
            <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4"/>
          </>
        )}
        {path === 'tripadvisor' && (
          <>
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
            <path d="M16 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
            <path d="M12 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
          </>
        )}
      </svg>
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: '#3d2c1a',
        borderTop: '1px solid rgba(212,168,83,0.08)',
      }}
    >
      {/* Gold accent top line */}
      <div className="mx-auto h-[1px] w-20 bg-[#d4a853]/30" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-16 md:grid-cols-3 md:px-8 md:pt-20">
        {/* Brand */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d4a853]/10 backdrop-blur-sm">
              <span className="text-sm font-bold text-[#d4a853]">W</span>
            </div>
            <div className="flex items-baseline">
              <span
                className="text-2xl font-bold tracking-tighter"
                style={{ color: 'rgba(255,255,255,0.9)' }}
              >
                W.I.P
              </span>
              <span
                className="ml-1.5 text-xs font-semibold uppercase tracking-wider"
                style={{ color: '#d4a853' }}
              >
                Restaurant
              </span>
            </div>
          </div>
          <p
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Handcrafted pasta. Honest ingredients. Italian tradition, served with intention in the heart of Little Italy.
          </p>
          <div className="mt-6 flex gap-2.5" aria-label="Follow us on social media">
            <SocialIcon path="instagram" label="Instagram" />
            <SocialIcon path="facebook" label="Facebook" />
            <SocialIcon path="twitter" label="X (Twitter)" />
            <SocialIcon path="tripadvisor" label="TripAdvisor" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2
            className="mb-5 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: '#d4a853' }}
          >
            Quick Links
          </h2>
          <nav className="flex flex-col items-start gap-3" aria-label="Footer navigation">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={`Go to ${link.label}`}
                className={`rounded-sm text-sm transition-all duration-200 hover:text-[#d4a853] hover:translate-x-1 ${focusClass}`}
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact Info */}
        <div>
          <h2
            className="mb-5 text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: '#d4a853' }}
          >
            Contact &amp; Hours
          </h2>
          <address
            className="space-y-4 text-sm not-italic leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            <div className="flex items-start gap-3">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#d4a853]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>123 Pasta Lane, Little Italy, NY 10013</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="h-4 w-4 shrink-0 text-[#d4a853]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>(212) 555-0147</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="h-4 w-4 shrink-0 text-[#d4a853]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>hello@wiprestaurant.com</span>
            </div>
            <div className="flex items-start gap-3">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#d4a853]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <div>
                <p>Mon&ndash;Thu 5PM&ndash;10PM</p>
                <p>Fri&ndash;Sat 5PM&ndash;11PM</p>
                <p style={{ color: '#d4a853' }}>Sun CLOSED</p>
              </div>
            </div>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t px-5 py-6"
        style={{ borderColor: 'rgba(212,168,83,0.06)' }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-xs md:flex-row md:text-left">
          <p style={{ color: 'rgba(255,255,255,0.35)' }}>
            &copy; {new Date().getFullYear()} W.I.P Restaurant. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              aria-label="Read the Privacy Policy"
              className={`rounded-sm transition-colors duration-200 hover:text-[#d4a853] ${focusClass}`}
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Privacy Policy
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
            <Link
              href="/terms"
              aria-label="Read the Terms of Service"
              className={`rounded-sm transition-colors duration-200 hover:text-[#d4a853] ${focusClass}`}
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
