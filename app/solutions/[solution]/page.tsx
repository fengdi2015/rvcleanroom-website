import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { IndustrialLandingPage, type IndustrialSolution } from '@/components/industrial-landing-page';

const solutions: IndustrialSolution[] = [
  {
    slug: 'iso-class-5-cleanrooms',
    eyebrow: 'ISO 14644 cleanroom engineering',
    title: 'ISO Class 5 Cleanrooms',
    description: 'High-performance cleanroom systems engineered for processes that demand strict airborne particle control.',
    intro: 'An ISO Class 5 environment depends on more than a high air-change rate. The room layout, HEPA or ULPA filtration, airflow pattern, pressure cascade, envelope integrity, equipment heat load and operating procedures must work as one system. We coordinate these requirements from concept design through testing and qualification.',
    image: '/wp-content/uploads/2022/03/cleanroom_service.jpg',
    imageAlt: 'ISO Class 5 modular cleanroom interior',
    applications: ['Semiconductor assembly and inspection', 'Sterile and aseptic process support', 'Precision optics and photonics', 'Medical-device manufacturing', 'Critical research and testing'],
    considerations: [
      { title: 'Air cleanliness', text: 'Filter coverage, airflow velocity and recovery performance are selected around the process and occupancy.' },
      { title: 'Pressure control', text: 'Room relationships and airlocks support a stable pressure cascade across operating conditions.' },
      { title: 'Qualification', text: 'Testing plans address particle concentration, airflow, pressure, integrity and recovery as applicable.' },
    ],
    deliverables: ['User-requirement and concept review', 'Room layouts and HVAC calculations', 'Modular envelope and filtration equipment', 'Controls, monitoring and alarms', 'Installation, testing and validation support'],
  },
  {
    slug: 'gmp-cleanrooms',
    eyebrow: 'Pharmaceutical controlled environments',
    title: 'GMP-Compliant Cleanrooms',
    description: 'Cleanroom facilities designed for controlled pharmaceutical and biotechnology manufacturing workflows.',
    intro: 'GMP cleanroom design starts with product risk, personnel and material flow, cleaning strategy and the intended process. Our team translates the user requirement specification into coordinated room classifications, pressure relationships, finishes, utilities and environmental controls that can be commissioned and documented.',
    image: '/wp-content/uploads/2022/03/video_cover.jpg',
    imageAlt: 'GMP pharmaceutical cleanroom',
    applications: ['Pharmaceutical formulation and filling', 'Biotechnology processing', 'Medical-device production', 'Quality-control laboratories', 'Controlled packaging operations'],
    considerations: [
      { title: 'Process flow', text: 'Personnel, materials and waste routes are planned to reduce crossover and contamination risk.' },
      { title: 'Cleanable construction', text: 'Flush details, sealed penetrations and compatible finishes support repeatable cleaning procedures.' },
      { title: 'Documented control', text: 'Monitoring, alarms and qualification records provide evidence that the facility performs as intended.' },
    ],
    deliverables: ['URS and compliance design review', 'Zoning, flows and pressure cascade', 'Cleanroom envelope and hygienic details', 'HVAC, controls and environmental monitoring', 'Commissioning and qualification support'],
  },
  {
    slug: 'semiconductor-cleanrooms',
    eyebrow: 'Microelectronics contamination control',
    title: 'Semiconductor Cleanrooms',
    description: 'Low-contamination environments for semiconductor, electronics, optics and precision manufacturing.',
    intro: 'Sensitive electronic processes can be affected by particles, molecular contamination, electrostatic discharge, temperature drift and vibration. A successful facility coordinates these risks with equipment layouts, service chases, return-air paths, filtration, controls and maintenance access while protecting production uptime.',
    image: '/wp-content/uploads/2022/03/Cleanroom_Project_2-1-scaled.jpg',
    imageAlt: 'Semiconductor manufacturing cleanroom',
    applications: ['Wafer processing and packaging', 'Microelectronics assembly', 'Display and optical manufacturing', 'Lithography support areas', 'Precision component production'],
    considerations: [
      { title: 'Particle performance', text: 'Airflow paths and filter layouts are developed around tool locations and critical process zones.' },
      { title: 'Environmental stability', text: 'Temperature, humidity and pressure controls respond to tight process tolerances and equipment loads.' },
      { title: 'Service integration', text: 'Utility distribution and maintenance access are coordinated to reduce disruption inside clean zones.' },
    ],
    deliverables: ['Process and tool-layout coordination', 'Contamination-control zoning', 'HVAC and filtration engineering', 'Utility and service-area integration', 'Performance testing and handover documentation'],
  },
  {
    slug: 'laminar-flow-hoods',
    eyebrow: 'Localized clean-air equipment',
    title: 'Laminar Flow Hoods',
    description: 'Unidirectional filtered-air work zones for protecting sensitive products and laboratory processes.',
    intro: 'A laminar flow hood creates a localized clean zone by moving filtered air uniformly across the work area. Selection should account for the direction of airflow, required product protection, work opening, equipment heat load, operator access and the surrounding room. It must not be treated as a substitute for a biological safety cabinet when personnel or environmental containment is required.',
    image: '/wp-content/uploads/2022/03/cleanroom_service.jpg',
    imageAlt: 'Laminar flow clean-air work station',
    applications: ['Non-hazardous product assembly', 'Optical and electronic inspection', 'Media preparation', 'Sample handling', 'Clean component packaging'],
    considerations: [
      { title: 'Airflow direction', text: 'Horizontal or vertical flow is selected to protect the work while accommodating the process layout.' },
      { title: 'Filter performance', text: 'HEPA filtration and face velocity are matched to the cleanliness target and working configuration.' },
      { title: 'Safe application', text: 'Risk review confirms whether product protection alone is appropriate or containment equipment is needed.' },
    ],
    deliverables: ['Application and risk review', 'Equipment sizing and configuration', 'HEPA filtration and fan system', 'Lighting, controls and optional monitoring', 'Factory testing and site commissioning'],
  },
];

type PageProps = { params: Promise<{ solution: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map(({ slug }) => ({ solution: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { solution: slug } = await params;
  const solution = solutions.find((item) => item.slug === slug);
  if (!solution) return {};
  const url = `/solutions/${solution.slug}/`;
  return {
    title: solution.title,
    description: solution.description,
    alternates: { canonical: url },
    openGraph: { title: `${solution.title} | RV Cleanroom Systems`, description: solution.description, url },
  };
}

export default async function SolutionPage({ params }: PageProps) {
  const { solution: slug } = await params;
  const solution = solutions.find((item) => item.slug === slug);
  if (!solution) notFound();
  return <IndustrialLandingPage solution={solution} />;
}
