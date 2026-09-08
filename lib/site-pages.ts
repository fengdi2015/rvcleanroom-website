import pageData from '@/app/_data/pages.json';

export type ImportedPage = (typeof pageData)[number];
export const pages = pageData as ImportedPage[];

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
  let html = page.html
    .replace(/<header\b[\s\S]*?<\/header>/i, '')
    .replace(/<footer\b[\s\S]*?<\/footer>/i, '')
    .replaceAll('ISO $ GMP Certified Cleanroom Manufacturer', 'ISO &amp; GMP Certified Cleanroom Manufacturer')
    .replaceAll('About RV-Cleanroom', 'About RV Cleanroom Systems')
    .replaceAll('RV-Cleanroom System company design, build and validate', 'RV Cleanroom Systems designs, builds and validates')
    .replaceAll('INDUSTRIES RV-CLEANROOM SERVES', 'INDUSTRIES RV CLEANROOM SYSTEMS SERVES')
    .replaceAll('RV-Cleanroom is a designer and manufacturer', 'RV Cleanroom Systems is a designer and manufacturer');
  if (page.route === '/about-us/') html = `${html}${manufacturingSummary}`;
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
