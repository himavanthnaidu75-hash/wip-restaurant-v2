import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import PastaScroll from "@/components/PastaScroll";
import HomeSections from "./HomeSections";

export const metadata: Metadata = {
  title: 'Handmade Pasta in Little Italy, NY',
  description:
    'Reserve a table at W.I.P Restaurant for handmade pasta, seasonal Italian cooking, and warm hospitality in Little Italy, New York.',
};

export default function Home() {
  const sequenceDir = path.join(process.cwd(), 'public/sequence');
  let images: string[] = [];
  
  try {
    const files = fs.readdirSync(sequenceDir);
    images = files
      .filter(file => file.endsWith('.png') || file.endsWith('.jpg'))
      .sort()
      .map(file => `/sequence/${file}`);
  } catch (error) {
    console.error("Error reading sequence directory:", error);
  }

  return (
    <main className="bg-[#5f452e] min-h-screen">
      <PastaScroll frames={images} />
      <HomeSections />
    </main>
  );
}
