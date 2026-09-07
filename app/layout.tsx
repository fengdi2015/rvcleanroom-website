import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://rvcleans.com'),
  applicationName: 'RV Cleanroom Systems',
  title: {
    default: 'RV Cleanroom Systems | Turnkey Modular Cleanrooms & HVAC Engineering',
    template: '%s | RV Cleanroom Systems',
  },
  description: 'Cleanroom design, manufacturing, HVAC engineering, installation and validation for pharmaceutical, semiconductor and industrial facilities.',
  keywords: [
    'cleanroom manufacturer',
    'modular cleanrooms',
    'turnkey cleanroom',
    'cleanroom HVAC engineering',
    'GMP cleanroom',
    'ISO Class 5 cleanroom',
  ],
  category: 'Industrial engineering and manufacturing',
  openGraph: {
    type: 'website',
    siteName: 'RV Cleanroom Systems',
    title: 'RV Cleanroom Systems | Turnkey Modular Cleanrooms & HVAC Engineering',
    description: 'Turnkey cleanroom design, manufacturing, HVAC engineering, installation and validation.',
    url: 'https://rvcleans.com/',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://rvcleans.com/#organization',
  name: 'RV Cleanroom Systems',
  alternateName: ['RV-Cleanrooms', 'RVCS'],
  legalName: 'RV-Cleanroom System Co., Ltd.',
  url: 'https://rvcleans.com/',
  logo: 'https://rvcleans.com/wp-content/uploads/2018/07/Untitled-1.png',
  foundingDate: '1999',
  description: 'Designer and manufacturer of modular cleanrooms, cleanroom equipment and HVAC systems for pharmaceutical, semiconductor, food, automotive, cosmetics and laboratory facilities.',
  naics: ['541330', '333415'],
  isicV4: ['7110', '2829'],
  email: ['sales@rvcleans.com', 'info@rvcleans.com'],
  telephone: '+86-21-5109-7860',
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: 'Floor 5, No. 105, Lane 2891, Qilianshannan Road',
      addressLocality: 'Shanghai',
      addressCountry: 'CN',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'No. 80 Duncundong Road',
      addressLocality: 'Suzhou',
      addressCountry: 'CN',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: '+86-21-5109-7860',
    email: 'sales@rvcleans.com',
    availableLanguage: ['English', 'Chinese'],
  },
  sameAs: [
    'https://www.facebook.com/rvcleanroom',
    'https://x.com/RCleanroom1',
    'https://www.youtube.com/@rvcleans_com',
    'https://www.instagram.com/rvcleans/',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <link rel="preload" href="/fonts/650dac2664ae60a7d48b.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/d022c72c8821bd448e4d.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/wp-content/uploads/2018/07/Untitled-1.png" as="image" />
      </head>
      <body>{children}</body>
    </html>
  );
}
