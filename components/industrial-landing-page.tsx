/* oxlint-disable next/no-html-link-for-pages -- native navigation avoids ignored vinext client-link clicks */
import Image from 'next/image';

export type IndustrialSolution = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  image: string;
  imageAlt: string;
  applications: string[];
  considerations: Array<{ title: string; text: string }>;
  deliverables: string[];
};

export function IndustrialLandingPage({ solution }: { solution: IndustrialSolution }) {
  const canonical = `https://rvcleans.com/solutions/${solution.slug}/`;
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: solution.title,
    description: solution.description,
    url: canonical,
    provider: { '@id': 'https://rvcleans.com/#organization' },
    areaServed: 'Worldwide',
    serviceType: 'Cleanroom engineering, manufacturing and installation',
  };

  return (
    <div className="industrial-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <main>
        <section className="industrial-hero">
          <div className="industrial-shell industrial-hero__grid">
            <div>
              <p className="industrial-eyebrow">{solution.eyebrow}</p>
              <h1>{solution.title}</h1>
              <p className="industrial-lead">{solution.description}</p>
              <div className="industrial-actions">
                <a className="industrial-button" href="/contact/">Discuss Your Project</a>
                <a className="industrial-text-link" href="/services/">View engineering services →</a>
              </div>
            </div>
            <Image src={solution.image} alt={solution.imageAlt} width={1200} height={800} priority />
          </div>
        </section>

        <section className="industrial-shell industrial-intro">
          <div>
            <p className="industrial-eyebrow">Designed around your process</p>
            <h2>Contamination control backed by practical engineering</h2>
          </div>
          <p>{solution.intro}</p>
        </section>

        <section className="industrial-band">
          <div className="industrial-shell">
            <p className="industrial-eyebrow">Engineering priorities</p>
            <h2>What the design must control</h2>
            <div className="industrial-card-grid">
              {solution.considerations.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="industrial-shell industrial-two-column">
          <div>
            <p className="industrial-eyebrow">Typical applications</p>
            <h2>Built for critical industrial environments</h2>
            <ul>{solution.applications.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <p className="industrial-eyebrow">Turnkey scope</p>
            <h2>From concept through qualification</h2>
            <ul>{solution.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="industrial-cta">
          <div className="industrial-shell">
            <div>
              <p className="industrial-eyebrow">Start with your requirements</p>
              <h2>Plan your cleanroom with RV Cleanroom Systems</h2>
            </div>
            <a className="industrial-button" href="/contact/">Request a Consultation</a>
          </div>
        </section>
      </main>

      <footer className="industrial-footer">
        <div className="industrial-shell">
          <strong>RV Cleanroom Systems</strong>
          <span>RV-Cleanroom System Co., Ltd.</span>
          <a href="mailto:sales@rvcleans.com">sales@rvcleans.com</a>
          <a href="tel:+862151097860">+86 21 5109 7860</a>
        </div>
      </footer>
    </div>
  );
}
