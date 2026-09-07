import pageData from '@/app/_data/pages.json';

export type ImportedPage = (typeof pageData)[number];
export const pages = pageData as ImportedPage[];

export function routeFromSlug(slug?: string[]) {
  return slug?.length ? `/${slug.join('/')}/` : '/';
}

export function findPage(slug?: string[]) {
  const route = routeFromSlug(slug).toLowerCase();
  return pages.find((page) => page.route.toLowerCase() === route);
}
