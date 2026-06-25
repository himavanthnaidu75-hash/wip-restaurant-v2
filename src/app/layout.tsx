import type { Metadata } from 'next';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import PageTransition from '@/components/PageTransition';
import JsonLd from '@/components/JsonLd';
import AmbientBackground from '@/components/AmbientBackground';
import './globals.css';

const SITE_URL = 'https://wiprestaurant.com';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'W.I.P Restaurant - Handmade Pasta in Little Italy, NY',
    template: '%s | W.I.P Restaurant',
  },
  description:
    'Experience authentic handmade pasta at W.I.P Restaurant. Fresh ingredients, traditional Italian recipes, and a warm atmosphere in the heart of Little Italy, New York.',
  keywords: [
    'Italian restaurant',
    'handmade pasta',
    'Little Italy NYC',
    'New York Italian food',
    'fresh pasta',
    'fine dining',
    'Italian cuisine',
    'pasta restaurant',
    'NYC restaurant',
    'Little Italy restaurant',
  ],
  authors: [{ name: 'W.I.P Restaurant' }],
  creator: 'W.I.P Restaurant',
  publisher: 'W.I.P Restaurant',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#5f452e',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'W.I.P Restaurant',
  },
  openGraph: {
    title: 'W.I.P Restaurant - Handmade Pasta in Little Italy, NY',
    description:
      'Experience authentic handmade pasta at W.I.P Restaurant. Fresh ingredients, traditional Italian recipes, and a warm atmosphere in the heart of Little Italy, New York.',
    url: SITE_URL,
    siteName: 'W.I.P Restaurant',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/pasta-overhead.jpg',
        width: 1200,
        height: 630,
        alt: 'Handmade pasta dish at W.I.P Restaurant in Little Italy, New York',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'W.I.P Restaurant - Handmade Pasta in Little Italy, NY',
    description:
      'Experience authentic handmade pasta at W.I.P Restaurant. Fresh ingredients, traditional Italian recipes, and a warm atmosphere in the heart of Little Italy, New York.',
    images: ['/images/pasta-overhead.jpg'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Restaurant',
            name: 'W.I.P Restaurant',
            description:
              'Authentic handmade pasta restaurant in Little Italy, New York City.',
            url: SITE_URL,
            telephone: '+1-212-555-0147',
            email: 'hello@wiprestaurant.com',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '123 Pasta Lane',
              addressLocality: 'New York',
              addressRegion: 'NY',
              postalCode: '10013',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 40.7194,
              longitude: -73.9973,
            },
            image: `${SITE_URL}/images/pasta-overhead.jpg`,
            priceRange: '$$$',
            servesCuisine: 'Italian',
            menu: `${SITE_URL}/menu`,
            acceptsReservations: 'true',
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                opens: '17:00',
                closes: '22:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Friday', 'Saturday'],
                opens: '17:00',
                closes: '23:00',
              },
            ],
            sameAs: [],
          }}
        />
        <CustomCursor />
        <a
          href="#main-content"
          className="sr-only z-[120] rounded-sm bg-white px-4 py-3 text-sm font-semibold text-[#3d2c1a] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-[#c84b31] focus:ring-offset-2"
        >
          Skip to content
        </a>
        <AmbientBackground />
        <Navbar />
        <div id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </div>
        <Footer />
      </body>
    </html>
  );
}
