import type { Metadata } from 'next';
import { ManufacturingPage } from '@/components/manufacturing-page';

export const metadata: Metadata = {
  title: 'Cleanroom Panel Manufacturer China | Mass Production Factory',
  description: 'RVCS manufactures cleanroom sandwich panels and purification materials through integrated production lines for bulk projects, repeat supply and OEM/ODM orders.',
  keywords: [
    'cleanroom panels manufacture china',
    'cleanroom sandwich panel china',
    'clean room partition panels china',
    'cleanroom manufacturer china',
    'cleanroom panel mass production',
    'cleanroom materials supplier china',
  ],
  alternates: { canonical: '/manufacturing/' },
  openGraph: {
    title: 'Cleanroom Panel Manufacturing in China | RV Cleanroom Systems',
    description: 'Integrated cleanroom panel production for bulk engineering orders, repeat supply programs and OEM/ODM requirements.',
    url: '/manufacturing/',
    images: [{ url: '/wp-content/uploads/2026/09/rvcs-suzhou-cleanroom-factory.jpeg', alt: 'RVCS Suzhou cleanroom manufacturing factory in China' }],
  },
};

export default function Manufacturing() {
  return <ManufacturingPage />;
}
