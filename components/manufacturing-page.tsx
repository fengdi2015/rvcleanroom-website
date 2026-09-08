/* oxlint-disable next/no-html-link-for-pages -- native navigation avoids ignored vinext client-link clicks */
import Image from 'next/image';

const factoryImage = '/wp-content/uploads/2022/03/FACTORY1.jpg';

const productFamilies = [
  {
    title: 'Rock wool fire-resistant panels',
    text: 'Standardized cleanroom wall and ceiling panels for projects that require fire resistance, thermal insulation and dependable dimensional consistency.',
  },
  {
    title: 'Aluminum honeycomb panels',
    text: 'Lightweight, rigid panel construction for cleanroom envelopes, equipment zones and industrial facilities with demanding finish requirements.',
  },
  {
    title: 'Paper honeycomb panels',
    text: 'Efficient sandwich-panel construction for controlled environments where low weight, cleanability and project economics must be balanced.',
  },
  {
    title: 'Magnesium composite panels',
    text: 'Composite cleanroom panels manufactured for stable performance, clean installation details and compatibility with modular room systems.',
  },
  {
    title: 'Color steel sandwich panels',
    text: 'Machine-made and project-configured panels supplied with matching profiles and supporting purification materials for complete cleanroom envelopes.',
  },
  {
    title: 'Supporting cleanroom materials',
    text: 'Coordinated doors, windows, ceiling components, profiles and installation materials reduce interface risk across large cleanroom projects.',
  },
];

const qualitySteps = [
  ['Incoming material inspection', 'Core materials, metal facings and purchased components are checked before they enter production.'],
  ['Controlled production', 'Automatic and manual integrated lines support repeatable panel forming, bonding, finishing and project-specific fabrication.'],
  ['In-process monitoring', 'Production teams monitor workmanship and product consistency at defined stages instead of relying only on final inspection.'],
  ['Finished-product testing', 'Completed products receive final checks before packing and release for domestic or export delivery.'],
];

const faq = [
  {
    question: 'Can RVCS manufacture cleanroom panels in bulk?',
    answer: 'Yes. RVCS operates integrated automatic and manual production lines with flexible production scheduling for large-volume engineering orders, repeat supply programs and phased project deliveries.',
  },
  {
    question: 'Is RVCS only a custom cleanroom engineering company?',
    answer: 'No. RVCS is a cleanroom manufacturer with standardized production of major sandwich-panel families and supporting purification materials. OEM and ODM configuration is available alongside series production and bulk supply.',
  },
  {
    question: 'Which cleanroom panel types does RVCS manufacture?',
    answer: 'The product range includes rock wool fire-resistant panels, aluminum honeycomb panels, paper honeycomb panels, magnesium composite panels and color steel sandwich panels, together with supporting cleanroom materials.',
  },
  {
    question: 'How does RVCS control manufacturing quality?',
    answer: 'Quality control covers incoming raw-material inspection, in-process monitoring and finished-product testing within an ISO 9001 quality-management framework and cleanroom projects designed for applicable GMP and ISO classification requirements.',
  },
];

export function ManufacturingPage() {
  const manufacturingSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://rvcleans.com/manufacturing/#webpage',
        url: 'https://rvcleans.com/manufacturing/',
        name: 'Cleanroom Panel Manufacturing in China | RV Cleanroom Systems',
        description: 'RVCS manufactures cleanroom sandwich panels and supporting purification materials through integrated production lines for bulk projects, repeat supply and OEM/ODM requirements.',
        about: { '@id': 'https://rvcleans.com/#organization' },
      },
      {
        '@type': 'OfferCatalog',
        '@id': 'https://rvcleans.com/manufacturing/#catalog',
        name: 'Cleanroom panel and purification material manufacturing',
        itemListElement: productFamilies.map((product) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Product',
            name: product.title,
            description: product.text,
            manufacturer: { '@id': 'https://rvcleans.com/#organization' },
          },
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };

  return (
    <div className="industrial-page manufacturing-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(manufacturingSchema) }} />
      <header className="industrial-header">
        <a className="industrial-brand" href="/" aria-label="RV Cleanroom Systems home">
          <Image src="/wp-content/uploads/2018/07/Untitled-1.png" alt="RV Cleanroom Systems" width={92} height={50} />
          <span>RV Cleanroom Systems</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/about-us/">About Us</a>
          <a href="/manufacturing/" aria-current="page">Manufacturing</a>
          <a href="/products/">Products</a>
          <a href="/services/">Services</a>
          <a href="/cleanroom-project/">Projects</a>
          <a className="industrial-header__cta" href="/contact/">Request a Quote</a>
        </nav>
      </header>

      <main>
        <section className="industrial-hero">
          <div className="industrial-shell industrial-hero__grid">
            <div>
              <p className="industrial-eyebrow">China cleanroom manufacturing</p>
              <h1>Cleanroom Panel Mass Production and Project Supply</h1>
              <p className="industrial-lead">RVCS is a cleanroom panel manufacturer with integrated production lines, standardized quality control and flexible scheduling for bulk engineering orders, repeat supply programs and OEM/ODM requirements.</p>
              <div className="industrial-actions">
                <a className="industrial-button" href="/contact/">Discuss Production Requirements</a>
                <a className="industrial-text-link" href="/products/">View cleanroom products →</a>
              </div>
            </div>
            <Image src={factoryImage} alt="RVCS cleanroom panel manufacturing factory in China" width={1600} height={800} priority />
          </div>
        </section>

        <section className="industrial-shell manufacturing-intro">
          <div>
            <p className="industrial-eyebrow">Manufacturer profile</p>
            <h2>Standardized production built for industrial purchasing</h2>
          </div>
          <div className="manufacturing-copy">
            <p>RV Cleanroom Systems manufactures cleanroom sandwich panels and supporting purification materials for pharmaceutical, medical, food-processing, electronics, semiconductor and laboratory facilities. Independent product development and full-process manufacturing allow the factory to coordinate panel systems, supporting components and project delivery from one supply base.</p>
            <p>The factory combines advanced automatic equipment with manual production capability. This structure supports repeatable series production and the detailed fabrication required at interfaces, corners, penetrations and other project-specific locations. RVCS can schedule large-volume bulk orders, phased deliveries and OEM/ODM production without presenting itself as a custom-only workshop.</p>
          </div>
        </section>

        <section className="manufacturing-capacity" aria-labelledby="capacity-title">
          <div className="industrial-shell">
            <p className="industrial-eyebrow">Production capability</p>
            <h2 id="capacity-title">A factory organized for volume, consistency and delivery</h2>
            <div className="manufacturing-capacity__grid">
              <article><strong>Integrated lines</strong><span>Automatic and manual production resources cover machine-made panels and detailed supporting fabrication.</span></article>
              <article><strong>Bulk project orders</strong><span>Flexible scheduling supports large cleanroom projects, repeat procurement and staged site-delivery plans.</span></article>
              <article><strong>Standard product families</strong><span>Mainstream core and facing combinations provide a defined purchasing base across multiple cleanroom applications.</span></article>
              <article><strong>OEM and ODM support</strong><span>Dimensions, materials, finishes and system details can be configured when a project or distribution program requires them.</span></article>
            </div>
          </div>
        </section>

        <section className="industrial-shell manufacturing-products" aria-labelledby="product-families-title">
          <p className="industrial-eyebrow">Manufactured product range</p>
          <h2 id="product-families-title">Cleanroom panels and coordinated purification materials</h2>
          <p className="manufacturing-section-lead">RVCS production covers established cleanroom panel constructions for fire resistance, thermal insulation, acoustic control, dust control and cleanable modular enclosures.</p>
          <div className="manufacturing-product-grid">
            {productFamilies.map((product) => (
              <article key={product.title}>
                <h3>{product.title}</h3>
                <p>{product.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="manufacturing-quality">
          <div className="industrial-shell manufacturing-quality__grid">
            <div>
              <p className="industrial-eyebrow">Quality system</p>
              <h2>Inspection throughout the manufacturing process</h2>
              <p>Production procedures operate within an ISO 9001 quality-management framework. Cleanroom products and project selections are developed for the applicable cleanliness classification and GMP requirements; final compliance depends on the complete installed system, operating process and validation scope.</p>
            </div>
            <ol>
              {qualitySteps.map(([title, text]) => (
                <li key={title}><strong>{title}</strong><span>{text}</span></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="industrial-shell manufacturing-markets">
          <div>
            <p className="industrial-eyebrow">Supply programs</p>
            <h2>Manufacturing support for enterprise projects and repeat buyers</h2>
          </div>
          <div>
            <p>RVCS supplies cleanroom contractors, engineering companies, facility owners, distributors and industrial procurement teams. The manufacturing model supports complete project packages, scheduled batches, replacement and expansion orders, and repeat panel programs for multi-site customers.</p>
            <ul>
              <li>Pharmaceutical and biotechnology production</li>
              <li>Medical-device and healthcare facilities</li>
              <li>Food processing and controlled packaging</li>
              <li>Electronics and semiconductor manufacturing</li>
              <li>Laboratories and precision industrial environments</li>
            </ul>
          </div>
        </section>

        <section className="manufacturing-faq industrial-shell" aria-labelledby="manufacturing-faq-title">
          <p className="industrial-eyebrow">Procurement questions</p>
          <h2 id="manufacturing-faq-title">Cleanroom manufacturing FAQ</h2>
          <div className="manufacturing-faq__grid">
            {faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="industrial-cta">
          <div className="industrial-shell">
            <div>
              <p className="industrial-eyebrow">Factory-direct project supply</p>
              <h2>Send your panel schedule, drawings or cleanroom requirements</h2>
            </div>
            <a className="industrial-button" href="/contact/">Contact the Manufacturing Team</a>
          </div>
        </section>
      </main>

      <footer className="industrial-footer">
        <div className="industrial-shell">
          <strong>RV-Cleanroom System Co., Ltd.</strong>
          <span>Cleanroom panel manufacturer and turnkey cleanroom supplier in China</span>
          <a href="mailto:sales@rvcleans.com">sales@rvcleans.com</a>
        </div>
      </footer>
    </div>
  );
}
