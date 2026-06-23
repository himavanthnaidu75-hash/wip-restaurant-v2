import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import PageTransition from '@/components/PageTransition';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'W.I.P Restaurant - Handmade Pasta in Little Italy, NY',
    template: '%s | W.I.P Restaurant',
  },
  description:
    'Experience authentic handmade pasta at W.I.P Restaurant. Fresh ingredients, traditional Italian recipes, and a warm atmosphere in the heart of Little Italy, New York.',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'W.I.P Restaurant',
    description: 'Authentic handmade pasta in Little Italy, NY',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'W.I.P Restaurant',
    description: 'Authentic handmade pasta in Little Italy, NY',
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CustomCursor />
        <a
          href="#main-content"
          className="sr-only z-[120] rounded-sm bg-white px-4 py-3 text-sm font-semibold text-[#3d2c1a] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:outline-none focus:ring-2 focus:ring-[#c84b31] focus:ring-offset-2"
        >
          Skip to content
        </a>
        <Navbar />
        <div id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </div>
        <Footer />
      </body>
    </html>
  );
}
