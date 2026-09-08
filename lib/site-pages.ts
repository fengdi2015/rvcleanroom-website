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

const manufacturingSummary = `
<section class="manufacturing-summary" aria-labelledby="manufacturing-summary-title">
  <div class="manufacturing-summary__inner">
    <div class="manufacturing-summary__image"><img src="/wp-content/uploads/2022/03/FACTORY1.jpg" alt="RVCS cleanroom panel manufacturing factory in China" loading="lazy"></div>
    <div class="manufacturing-summary__content">
      <p class="industry-solution-links__eyebrow">Manufacturing strength</p>
      <h2 id="manufacturing-summary-title">Cleanroom Panel Mass Production in China</h2>
      <p>RVCS operates integrated automatic and manual production lines for standardized cleanroom sandwich panels and supporting purification materials. Flexible production scheduling supports large-volume engineering orders, repeat supply programs, phased deliveries and OEM/ODM requirements.</p>
      <ul>
        <li>Rock wool, aluminum honeycomb, paper honeycomb, magnesium composite and color steel panel production</li>
        <li>Incoming-material inspection, in-process monitoring and finished-product testing</li>
        <li>Factory supply for pharmaceutical, medical, food, electronics, semiconductor and laboratory projects</li>
      </ul>
      <a class="manufacturing-summary__link" href="/manufacturing/">Explore manufacturing capability →</a>
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
  html = html.replace(
    /(<li id="menu-item-3151"[^>]*><a href="\/products\/"[^>]*>Products<\/a><\/li>)/i,
    '<li id="menu-item-manufacturing" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-manufacturing"><a href="/manufacturing/">Manufacturing</a></li>$1',
  );
  if (page.route === '/') html = html.replace(/<footer\b/i, `${manufacturingSummary}${industryLinks}<footer`);
  if (page.route === '/about-us/') html = html.replace(/<footer\b/i, `${manufacturingSummary}<footer`);
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
