import type { Metadata } from 'next';
import PastaScroll from "@/components/PastaScroll";
import HomeSections from "./HomeSections";

export const metadata: Metadata = {
  title: 'Handmade Pasta in Little Italy, NY',
  description:
    'Reserve a table at W.I.P Restaurant for handmade pasta, seasonal Italian cooking, and warm hospitality in Little Italy, New York.',
};

export default function Home() {
  return (
    <main className="bg-[#5f452e] min-h-screen">
      <PastaScroll />
      <HomeSections />
    </main>
  );
}
