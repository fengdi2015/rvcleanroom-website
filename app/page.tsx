import { SitePage } from '@/components/site-page';
import { findPage } from '@/lib/site-pages';

export default function Home() {
  const page = findPage();
  if (!page) return null;
  return <SitePage bodyClass={page.bodyClass} html={page.html} styles={page.styles} />;
}
