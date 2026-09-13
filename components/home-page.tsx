/* oxlint-disable next/no-html-link-for-pages -- native links remain reliable in the vinext production runtime */
import Image from 'next/image';
import { ArrowRight, Building2, Check, CircuitBoard, FlaskConical, Gauge, Pill, Settings2, ShieldCheck, Utensils } from 'lucide-react';

const services = [
  { number: '01', title: 'Dust-Free Environments', text: 'Particle-controlled cleanrooms for electronics, semiconductor, optics and precision manufacturing processes.', image: '/wp-content/uploads/2022/03/Cleanroom_Project_6-2.jpg', alt: 'Completed dust-free cleanroom project' },
  { number: '02', title: 'GMP & Microbe-Controlled Rooms', text: 'Controlled environments planned around pharmaceutical, biotechnology, medical and laboratory requirements.', image: '/wp-content/uploads/2026/03/pharmaceutical-2-1024x576.png', alt: 'Pharmaceutical cleanroom production environment' },
  { number: '03', title: 'Modular Cleanroom Systems', text: 'Reconfigurable wall, ceiling, door, glazing and filtration systems manufactured for efficient project delivery.', image: '/wp-content/uploads/2022/03/Modular_Cleanroom-scaled.jpg', alt: 'Modular cleanroom installation' },
];
const industries = [
  { name: 'Pharmaceutical', detail: 'GMP production environments', icon: Pill },
  { name: 'Semiconductor', detail: 'Precision particle control', icon: CircuitBoard },
  { name: 'Food & Beverage', detail: 'Hygienic processing rooms', icon: Utensils },
  { name: 'Laboratories', detail: 'Research and testing spaces', icon: FlaskConical },
  { name: 'Medical Devices', detail: 'Controlled assembly facilities', icon: ShieldCheck },
  { name: 'Precision Industry', detail: 'Stable process environments', icon: Gauge },
];
const delivery = [
  ['01', 'Design & Engineering', 'Layout, airflow, pressure cascade, classification and regulatory planning.'],
  ['02', 'Manufacturing', 'Panels, doors, windows and supporting purification materials produced in Suzhou.'],
  ['03', 'Installation', 'Coordinated site assembly for modular envelopes, HVAC and cleanroom equipment.'],
  ['04', 'Testing & Validation', 'Commissioning support, performance testing and project documentation.'],
];
const standards = ['ISO 14644 cleanroom classification', 'ISO 9001 quality-management framework', 'Applicable GMP requirements', 'HEPA and ULPA filtration integrity', 'Temperature, humidity and pressure control', 'Project-specific validation protocols'];
const clients = [['THORLABS-1.jpg', 'Thorlabs'], ['MAGNA-1.jpg', 'Magna'], ['WIPAK.jpg', 'Wipak'], ['LENDLEASE-1.jpg', 'Lendlease'], ['MWGROUP-1.jpg', 'M+W Group'], ['ROCHE-1.jpg', 'Roche'], ['FOSUNPHARMA-1.jpg', 'Fosun Pharma'], ['NOVARTIS-1.jpg', 'Novartis']];

export function HomePage() {
  return <main className="rv-home">
    <section className="rv-home__hero">
      <div className="rv-home__shell rv-home__hero-grid">
        <div className="rv-home__hero-copy">
          <p className="rv-home__eyebrow"><span /> Cleanroom engineering · manufacturing · validation</p>
          <h1>Complete cleanroom systems, <em>built piece by piece.</em></h1>
          <p className="rv-home__lead">RV Cleanroom Systems designs, manufactures, installs and validates controlled environments for pharmaceutical, electronics, food, medical and precision industrial facilities.</p>
          <div className="rv-home__actions"><a className="rv-home__button rv-home__button--primary" href="/contact/">Start Your Project <ArrowRight size={17} /></a><a className="rv-home__button rv-home__button--ghost" href="/manufacturing/">See Manufacturing</a></div>
        </div>
        <div className="rv-home__hero-visual" aria-label="RVCS cleanroom project and modular manufacturing">
          <div className="rv-home__flight-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="rv-home__hero-image"><Image src="/wp-content/uploads/2026/09/rvcs-suzhou-cleanroom-factory.jpeg" alt="RVCS cleanroom manufacturing factory in Suzhou, China" fill priority sizes="(max-width: 900px) 100vw, 52vw" /></div>
          <div className="rv-home__hero-stamp"><strong>RVCS</strong><span>Reliable · Validated<br />Cleanroom Systems</span></div>
          <div className="rv-home__hero-caption"><span>01 / 04</span><strong>From manufactured component<br />to controlled environment</strong></div>
        </div>
      </div>
      <div className="rv-home__shell"><dl className="rv-home__proof"><div><dt>1999</dt><dd>Established</dd></div><div><dt>Shanghai</dt><dd>Project office</dd></div><div><dt>Suzhou</dt><dd>Manufacturing factory</dd></div><div><dt>Worldwide</dt><dd>Project delivery</dd></div></dl></div>
    </section>

    <section className="rv-home__section rv-home__intro"><div className="rv-home__shell rv-home__split"><div><p className="rv-home__eyebrow"><span /> About RV Cleanroom Systems</p><h2>Precision is the result of persistent work.</h2></div><div className="rv-home__intro-copy"><p>RV-Cleanroom System Co., Ltd. provides one accountable source for cleanroom design, panel and component manufacturing, HVAC coordination, installation and validation support.</p><p>Our project office in Shanghai and manufacturing operation in Suzhou work together to support turnkey facilities, bulk panel orders, staged deliveries and repeat supply programs.</p><a className="rv-home__text-link" href="/about-us/">Learn about RVCS <ArrowRight size={16} /></a></div></div></section>

    <section className="rv-home__section rv-home__section--soft"><div className="rv-home__shell"><div className="rv-home__section-head"><div><p className="rv-home__eyebrow"><span /> Cleanroom services</p><h2>One system. Every critical layer.</h2></div><p>Choose a complete turnkey program or integrate RVCS manufacturing and engineering into your existing project team.</p></div><div className="rv-home__service-stack">{services.map((service) => <article className="rv-home__service-card" key={service.title}><div className="rv-home__service-number">{service.number}</div><div className="rv-home__service-image"><Image src={service.image} alt={service.alt} fill sizes="(max-width: 760px) 100vw, 42vw" /></div><div className="rv-home__service-body"><h3>{service.title}</h3><p>{service.text}</p><a href="/services/" aria-label={`Learn more about ${service.title}`}>View service <ArrowRight size={15} /></a></div></article>)}</div></div></section>

    <section className="rv-home__manufacturing"><div className="rv-home__shell rv-home__manufacturing-grid"><div className="rv-home__manufacturing-media"><Image src="/wp-content/uploads/2026/09/cleanroom-panels-ready-for-delivery.jpeg" alt="Cleanroom sandwich panels prepared at the RVCS factory for project delivery" fill sizes="(max-width: 900px) 100vw, 50vw" /><span><Building2 size={18} /> Suzhou manufacturing</span></div><div className="rv-home__manufacturing-copy"><p className="rv-home__eyebrow rv-home__eyebrow--light"><span /> Manufacturing strength</p><h2>Repeatable production. Reliable project supply.</h2><p>Integrated automatic and manual production resources support standardized panel families, detailed fabrication, OEM/ODM requirements and phased project supply.</p><ul><li><Check size={17} /> Bulk cleanroom panel orders and scheduled delivery</li><li><Check size={17} /> Incoming, in-process and finished-product inspection</li><li><Check size={17} /> Coordinated doors, windows, profiles and supporting materials</li></ul><a className="rv-home__button rv-home__button--light" href="/manufacturing/">Explore Manufacturing <ArrowRight size={17} /></a></div></div></section>

    <section className="rv-home__section"><div className="rv-home__shell"><div className="rv-home__section-head"><div><p className="rv-home__eyebrow"><span /> Industries</p><h2>Critical environments, clearly engineered.</h2></div><p>Classification, materials, airflow and documentation are selected around each process and governing requirement.</p></div><div className="rv-home__industry-grid">{industries.map(({ name, detail, icon: Icon }, index) => <a href="/services/" key={name}><b>0{index + 1}</b><Icon size={22} /><strong>{name}</strong><span>{detail}</span><ArrowRight className="rv-home__industry-arrow" size={16} /></a>)}</div></div></section>

    <section className="rv-home__section rv-home__section--soft"><div className="rv-home__shell"><div className="rv-home__section-head"><div><p className="rv-home__eyebrow"><span /> Turnkey delivery</p><h2>Progress through four exact stages.</h2></div><p>A coordinated scope reduces interface gaps between design, manufacturing, site installation and final performance testing.</p></div><ol className="rv-home__process">{delivery.map(([number, title, text]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol></div></section>

    <section className="rv-home__section rv-home__standards"><div className="rv-home__shell rv-home__standards-grid"><div><p className="rv-home__eyebrow"><span /> Quality and compliance</p><h2>Performance you can measure.</h2><p>Every project begins with the required cleanliness class, operating process and applicable regulatory framework. The final design, testing and documentation scope follows those requirements.</p><a className="rv-home__text-link" href="/contact/">Discuss your requirements <ArrowRight size={16} /></a></div><ul>{standards.map((standard) => <li key={standard}><Settings2 size={18} /><span>{standard}</span></li>)}</ul></div></section>

    <section className="rv-home__clients" aria-labelledby="rv-home-clients-title"><div className="rv-home__shell"><p className="rv-home__eyebrow"><span /> Project experience</p><h2 id="rv-home-clients-title">Trusted by global industrial clients.</h2><div className="rv-home__client-row">{clients.map(([file, name]) => <div key={name}><Image src={`/wp-content/uploads/2022/03/${file}`} alt={`${name} logo`} width={150} height={71} /></div>)}</div></div></section>
    <section className="rv-home__cta"><div className="rv-home__shell"><div><p className="rv-home__eyebrow rv-home__eyebrow--light"><span /> Start a project</p><h2>Build the next controlled environment.</h2><p>Share the industry, floor area, target classification and project location. Our team will help define the next engineering step.</p></div><a className="rv-home__button rv-home__button--light" href="/contact/">Request a Quote <ArrowRight size={17} /></a></div></section>
  </main>;
}
