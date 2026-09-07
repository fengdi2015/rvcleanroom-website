import pageData from '@/app/_data/pages.json';

export type ImportedPage = (typeof pageData)[number];
export const pages = pageData as ImportedPage[];

const industryLinks = `
<section class="industry-solution-links" aria-labelledby="industry-solutions-title">
  <div class="industry-solution-links__inner">
    <p class="industry-solution-links__eyebrow">Engineered environments</p>
    <h2 id="industry-solutions-title">Industrial Cleanroom Solutions</h2>
    <p>Explore cleanroom systems engineered around contamination control, process requirements and regulatory compliance.</p>
    <div class="industry-solution-links__grid">
      <a href="/solutions/iso-class-5-cleanrooms/">ISO Class 5 Cleanrooms<span>Particle-control engineering for critical processes</span></a>
      <a href="/solutions/gmp-cleanrooms/">GMP-Compliant Cleanrooms<span>Controlled environments for pharmaceutical production</span></a>
      <a href="/solutions/semiconductor-cleanrooms/">Semiconductor Cleanrooms<span>Precision contamination control for electronics</span></a>
      <a href="/solutions/laminar-flow-hoods/">Laminar Flow Hoods<span>Localized unidirectional clean-air protection</span></a>
    </div>
  </div>
</section>`;

function enrichPage(page: ImportedPage) {
  let html = page.html.replace(
    /(<a\s+class=["']man_logo["'][^>]*>)([\s\S]*?)(<\/a>)/gi,
    '$1$2<span class="rv-brand-name">RV Cleanroom Systems</span>$3',
  );
  html = html.replace(/(<a\s+class=["']man_logo["'][^>]*)(>)/gi, '$1 aria-label="RV Cleanroom Systems"$2');
  html = html
    .replaceAll('ISO $ GMP Certified Cleanroom Manufacturer', 'ISO &amp; GMP Certified Cleanroom Manufacturer')
    .replaceAll('About RV-Cleanroom', 'About RV Cleanroom Systems')
    .replaceAll('RV-Cleanroom System company design, build and validate', 'RV Cleanroom Systems designs, builds and validates')
    .replaceAll('INDUSTRIES RV-CLEANROOM SERVES', 'INDUSTRIES RV CLEANROOM SYSTEMS SERVES')
    .replaceAll('RV-Cleanroom is a designer and manufacturer', 'RV Cleanroom Systems is a designer and manufacturer');
  if (page.route === '/') html = html.replace(/<footer\b/i, `${industryLinks}<footer`);
  return { ...page, html };
}

export function routeFromSlug(slug?: string[]) {
  return slug?.length ? `/${slug.join('/')}/` : '/';
}

export function findPage(slug?: string[]) {
  const route = routeFromSlug(slug).toLowerCase();
  const page = pages.find((item) => item.route.toLowerCase() === route);
  return page ? enrichPage(page) : undefined;
}
