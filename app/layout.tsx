import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RV-Cleanroom System',
  description: 'Cleanroom design, manufacturing, installation and validation services.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/650dac2664ae60a7d48b.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/d022c72c8821bd448e4d.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/wp-content/uploads/2018/07/Untitled-1.png" as="image" />
      </head>
      <body>{children}</body>
    </html>
  );
}
