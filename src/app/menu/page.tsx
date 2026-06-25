import type { Metadata } from 'next';
import MenuClient from './MenuClient';
import JsonLd from '@/components/JsonLd';

const SITE_URL = 'https://wiprestaurant.com';

const menuItems = [
  {
    name: 'Bruschetta Classica',
    description:
      'Toasted country bread with marinated tomatoes, basil, garlic, and extra virgin olive oil.',
    price: '$14',
    category: 'Antipasti',
    tags: ['V', 'DF'],
  },
  {
    name: 'Burrata e Prosciutto',
    description:
      'Creamy burrata with aged prosciutto, grilled focaccia, and saba.',
    price: '$18',
    category: 'Antipasti',
    tags: ['GF'],
  },
  {
    name: 'Carpaccio di Manzo',
    description:
      'Thinly sliced beef tenderloin with arugula, capers, lemon, and shaved parmesan.',
    price: '$19',
    category: 'Antipasti',
    tags: ['GF'],
  },
  {
    name: 'Truffle Tagliatelle',
    description:
      'Hand-rolled pasta with black truffle cream sauce and aged parmesan.',
    price: '$32',
    category: 'Primi',
    tags: ['V'],
  },
  {
    name: 'Lobster Ravioli',
    description:
      'Saffron-infused ravioli filled with fresh lobster, served in a bisque reduction.',
    price: '$34',
    category: 'Primi',
    tags: [],
  },
  {
    name: 'Wild Boar Pappardelle',
    description: 'Slow-braised wild boar ragu on house-made pappardelle.',
    price: '$28',
    category: 'Primi',
    tags: ['DF'],
  },
  {
    name: 'Cacio e Pepe',
    description:
      'Tonnarelli with Pecorino Romano, cracked black pepper, and pasta water emulsion.',
    price: '$24',
    category: 'Primi',
    tags: ['V'],
  },
  {
    name: 'Branzino al Forno',
    description:
      'Oven-roasted branzino with fennel, lemon, herbs, and salsa verde.',
    price: '$36',
    category: 'Secondi',
    tags: ['GF', 'DF'],
  },
  {
    name: 'Pollo alla Parmigiana',
    description:
      'Crisp chicken cutlet with tomato sugo, mozzarella, basil, and bitter greens.',
    price: '$30',
    category: 'Secondi',
    tags: [],
  },
  {
    name: 'Bistecca alla Fiorentina',
    description:
      'Grilled dry-aged steak with rosemary salt, charred lemon, and olive oil.',
    price: '$42',
    category: 'Secondi',
    tags: ['GF', 'DF'],
  },
  {
    name: 'Insalata Mista',
    description:
      'Market lettuces with shaved fennel, radish, herbs, and lemon vinaigrette.',
    price: '$12',
    category: 'Contorni',
    tags: ['V', 'GF', 'DF'],
  },
  {
    name: 'Verdure Grigliate',
    description:
      'Grilled seasonal vegetables with aged balsamic and parsley oil.',
    price: '$14',
    category: 'Contorni',
    tags: ['V', 'GF', 'DF'],
  },
  {
    name: 'Patate al Forno',
    description: 'Crisp roasted potatoes with rosemary, garlic, and sea salt.',
    price: '$12',
    category: 'Contorni',
    tags: ['V', 'GF', 'DF'],
  },
  {
    name: 'Tiramisu',
    description:
      'Espresso-soaked ladyfingers layered with mascarpone cream and cocoa.',
    price: '$14',
    category: 'Dolci',
    tags: ['V'],
  },
  {
    name: 'Panna Cotta',
    description:
      'Vanilla bean panna cotta with citrus compote and toasted pistachio.',
    price: '$13',
    category: 'Dolci',
    tags: ['V', 'GF'],
  },
  {
    name: 'Cannoli Siciliani',
    description:
      'Crisp pastry shells filled with sweet ricotta, orange zest, and chocolate.',
    price: '$12',
    category: 'Dolci',
    tags: ['V'],
  },
] as const;

export const metadata: Metadata = {
  title: 'Our Menu',
  description:
    'Explore handmade pasta, antipasti, secondi, contorni, and Italian desserts at W.I.P Restaurant in Little Italy, NY.',
  openGraph: {
    title: 'Our Menu - W.I.P Restaurant',
    description:
      'Handmade pasta, antipasti, secondi, contorni, and Italian desserts in Little Italy, NY.',
    url: '/menu',
    images: [
      {
        url: '/images/pasta-dish2.jpg',
        width: 1200,
        height: 630,
        alt: 'Menu highlights at W.I.P Restaurant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Menu - W.I.P Restaurant',
    description:
      'Handmade pasta, antipasti, secondi, contorni, and Italian desserts in Little Italy, NY.',
    images: ['/images/pasta-dish2.jpg'],
  },
  alternates: {
    canonical: '/menu',
  },
};

const menuJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: 'W.I.P Restaurant Menu',
  description: 'Handmade pasta, antipasti, secondi, contorni, and Italian desserts.',
  url: `${SITE_URL}/menu`,
  hasMenuSection: [
    {
      '@type': 'MenuSection',
      name: 'Antipasti',
      hasMenuItem: [
        {
          '@type': 'MenuItem',
          name: 'Bruschetta Classica',
          description: 'Toasted country bread with marinated tomatoes, basil, garlic, and extra virgin olive oil.',
          offers: { '@type': 'Offer', price: '14', priceCurrency: 'USD' },
        },
        {
          '@type': 'MenuItem',
          name: 'Burrata e Prosciutto',
          description: 'Creamy burrata with aged prosciutto, grilled focaccia, and saba.',
          offers: { '@type': 'Offer', price: '18', priceCurrency: 'USD' },
        },
        {
          '@type': 'MenuItem',
          name: 'Carpaccio di Manzo',
          description: 'Thinly sliced beef tenderloin with arugula, capers, lemon, and shaved parmesan.',
          offers: { '@type': 'Offer', price: '19', priceCurrency: 'USD' },
        },
      ],
    },
    {
      '@type': 'MenuSection',
      name: 'Primi',
      hasMenuItem: [
        {
          '@type': 'MenuItem',
          name: 'Truffle Tagliatelle',
          description: 'Hand-rolled pasta with black truffle cream sauce and aged parmesan.',
          offers: { '@type': 'Offer', price: '32', priceCurrency: 'USD' },
        },
        {
          '@type': 'MenuItem',
          name: 'Lobster Ravioli',
          description: 'Saffron-infused ravioli filled with fresh lobster, served in a bisque reduction.',
          offers: { '@type': 'Offer', price: '34', priceCurrency: 'USD' },
        },
        {
          '@type': 'MenuItem',
          name: 'Wild Boar Pappardelle',
          description: 'Slow-braised wild boar ragu on house-made pappardelle.',
          offers: { '@type': 'Offer', price: '28', priceCurrency: 'USD' },
        },
        {
          '@type': 'MenuItem',
          name: 'Cacio e Pepe',
          description: 'Tonnarelli with Pecorino Romano, cracked black pepper, and pasta water emulsion.',
          offers: { '@type': 'Offer', price: '24', priceCurrency: 'USD' },
        },
      ],
    },
    {
      '@type': 'MenuSection',
      name: 'Secondi',
      hasMenuItem: [
        {
          '@type': 'MenuItem',
          name: 'Branzino al Forno',
          description: 'Oven-roasted branzino with fennel, lemon, herbs, and salsa verde.',
          offers: { '@type': 'Offer', price: '36', priceCurrency: 'USD' },
        },
        {
          '@type': 'MenuItem',
          name: 'Pollo alla Parmigiana',
          description: 'Crisp chicken cutlet with tomato sugo, mozzarella, basil, and bitter greens.',
          offers: { '@type': 'Offer', price: '30', priceCurrency: 'USD' },
        },
        {
          '@type': 'MenuItem',
          name: 'Bistecca alla Fiorentina',
          description: 'Grilled dry-aged steak with rosemary salt, charred lemon, and olive oil.',
          offers: { '@type': 'Offer', price: '42', priceCurrency: 'USD' },
        },
      ],
    },
    {
      '@type': 'MenuSection',
      name: 'Dolci',
      hasMenuItem: [
        {
          '@type': 'MenuItem',
          name: 'Tiramisu',
          description: 'Espresso-soaked ladyfingers layered with mascarpone cream and cocoa.',
          offers: { '@type': 'Offer', price: '14', priceCurrency: 'USD' },
        },
        {
          '@type': 'MenuItem',
          name: 'Panna Cotta',
          description: 'Vanilla bean panna cotta with citrus compote and toasted pistachio.',
          offers: { '@type': 'Offer', price: '13', priceCurrency: 'USD' },
        },
        {
          '@type': 'MenuItem',
          name: 'Cannoli Siciliani',
          description: 'Crisp pastry shells filled with sweet ricotta, orange zest, and chocolate.',
          offers: { '@type': 'Offer', price: '12', priceCurrency: 'USD' },
        },
      ],
    },
  ],
};

export default function MenuPage() {
  return (
    <main className="min-h-screen px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <JsonLd data={menuJsonLd} />
      <MenuClient items={menuItems} />
    </main>
  );
}
