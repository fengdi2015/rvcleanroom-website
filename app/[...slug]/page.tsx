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
  return page ? { title: page.title, description: page.description } : { title: 'Page not found | RV-Cleanroom' };
}

export default async function ImportedRoute({ params }: PageProps) {
  const page = findPage((await params).slug);
  if (!page) notFound();
  return <SitePage bodyClass={page.bodyClass} html={page.html} styles={page.styles} />;
}
