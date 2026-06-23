import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Learn about W.I.P Restaurant, Chef Marco Bellini, and our commitment to handmade pasta, seasonal ingredients, and Italian tradition.',
};

export default function AboutPage() {
  return <AboutClient />;
}
