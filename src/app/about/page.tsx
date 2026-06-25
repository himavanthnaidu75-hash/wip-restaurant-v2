import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Learn about W.I.P Restaurant, Chef Marco Bellini, and our commitment to handmade pasta, seasonal ingredients, and Italian tradition.',
  openGraph: {
    title: 'Our Story - W.I.P Restaurant',
    description:
      'Learn about W.I.P Restaurant, Chef Marco Bellini, and our commitment to handmade pasta and Italian tradition.',
    url: '/about',
    images: [
      {
        url: '/images/pasta-making.jpg',
        width: 1200,
        height: 630,
        alt: 'Chef crafting handmade pasta at W.I.P Restaurant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story - W.I.P Restaurant',
    description:
      'Learn about W.I.P Restaurant, Chef Marco Bellini, and our commitment to handmade pasta and Italian tradition.',
    images: ['/images/pasta-making.jpg'],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
