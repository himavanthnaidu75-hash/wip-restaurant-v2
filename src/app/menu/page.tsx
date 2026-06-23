import type { Metadata } from 'next';
import MenuClient from './MenuClient';

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
};

export default function MenuPage() {
  return (
    <main className="min-h-screen px-5 pb-24 pt-28 md:px-8 md:pt-32">
      <MenuClient items={menuItems} />
    </main>
  );
}
