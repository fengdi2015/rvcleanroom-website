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
  return routes.map((route) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: new URL(route, baseUrl).href,
      changeFrequency: route === '/' ? 'weekly' : 'monthly',
      priority: route === '/' ? 1 : route === '/manufacturing/' ? 0.9 : route.startsWith('/solutions/') ? 0.8 : 0.6,
    };
    if (route === '/manufacturing/') {
      entry.images = [
        '/wp-content/uploads/2026/09/rvcs-suzhou-cleanroom-factory.jpeg',
        '/wp-content/uploads/2026/09/rvcs-factory-operations-building.jpeg',
        '/wp-content/uploads/2026/09/cleanroom-panels-ready-for-delivery.jpeg',
        '/wp-content/uploads/2026/09/rvcs-factory-reception.jpeg',
      ].map((image) => new URL(image, baseUrl).href);
    }
    return entry;
  });
}
