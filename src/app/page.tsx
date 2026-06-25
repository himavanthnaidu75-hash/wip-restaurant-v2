import type { Metadata } from 'next';
import PastaScroll from "@/components/PastaScroll";
import HomeSections from "./HomeSections";

export const metadata: Metadata = {
  title: 'Handmade Pasta in Little Italy, NY',
  description:
    'Reserve a table at W.I.P Restaurant for handmade pasta, seasonal Italian cooking, and warm hospitality in Little Italy, New York.',
  openGraph: {
    title: 'W.I.P Restaurant - Handmade Pasta in Little Italy, NY',
    description:
      'Handmade pasta, seasonal Italian cooking, and warm hospitality in Little Italy, New York.',
    url: '/',
    images: [
      {
        url: '/images/pasta-overhead.jpg',
        width: 1200,
        height: 630,
        alt: 'Overhead view of handmade pasta at W.I.P Restaurant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'W.I.P Restaurant - Handmade Pasta in Little Italy, NY',
    description:
      'Handmade pasta, seasonal Italian cooking, and warm hospitality in Little Italy, New York.',
    images: ['/images/pasta-overhead.jpg'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <main className="bg-[#5f452e] min-h-screen">
      <PastaScroll />
      <HomeSections />
    </main>
  );
}
