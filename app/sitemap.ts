import type { MetadataRoute } from 'next';
import { pages } from '@/lib/site-pages';

const solutionRoutes = [
  '/manufacturing/',
  '/solutions/iso-class-5-cleanrooms/',
  '/solutions/gmp-cleanrooms/',
  '/solutions/semiconductor-cleanrooms/',
  '/solutions/laminar-flow-hoods/',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rvcleans.com';
  const routes = [...pages.map((page) => page.route), ...solutionRoutes];
  return routes.map((route) => ({
    url: new URL(route, baseUrl).href,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/manufacturing/' ? 0.9 : route.startsWith('/solutions/') ? 0.8 : 0.6,
  }));
}
