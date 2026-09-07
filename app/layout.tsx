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
      <body>{children}</body>
    </html>
  );
}
