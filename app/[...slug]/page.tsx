import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SitePage } from '@/components/site-page';
import { findPage, pages } from '@/lib/site-pages';

type PageProps = { params: Promise<{ slug: string[] }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return pages.filter((page) => page.route !== '/').map((page) => ({ slug: page.route.split('/').filter(Boolean) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = findPage((await params).slug);
  if (!page) return { title: 'Page not found' };
  const title = page.title
    .replace(/RV-Cleanroom(?: System)?(?: China)?/gi, 'RV Cleanroom Systems')
    .replace(/RV-Clean\b/gi, 'RV Cleanroom Systems')
    .replace(/\bRV Cleanroom\b(?! Systems)/gi, 'RV Cleanroom Systems')
    .replace(/\s*\|\s*RV Cleanroom Systems\s*$/i, '');
  return {
    title,
    description: page.description,
    alternates: { canonical: page.route },
    openGraph: { title, description: page.description, url: page.route },
  };
}

export default async function ImportedRoute({ params }: PageProps) {
  const page = findPage((await params).slug);
  if (!page) notFound();
  return <SitePage bodyClass={page.bodyClass} html={page.html} styles={page.styles} />;
}
