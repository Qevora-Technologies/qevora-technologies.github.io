export interface Service {
  id: string;
  icon: 'brain' | 'code' | 'smartphone' | 'cloud' | 'shield' | 'pen' | 'cart';
  title: string;
  summary: string;
  includes: string[];
  /** Offered by the whole team — shown as a full-width card. */
  wholeTeam?: boolean;
}

export const services: Service[] = [
  {
    id: 'ai-ml',
    icon: 'brain',
    title: 'AI/ML & Automation',
    summary: 'Add AI to your product or automate the work that slows your team down.',
    includes: ['LLM features, chatbots & AI agents', 'Custom ML models', 'Workflow automation'],
  },
  {
    id: 'web',
    icon: 'code',
    title: 'Web Development',
    summary: 'Fast, scalable web apps — from your first MVP to a full SaaS platform.',
    includes: ['MERN & Next.js apps', 'SaaS dashboards & admin panels', 'APIs & integrations'],
  },
  {
    id: 'mobile',
    icon: 'smartphone',
    title: 'Mobile Apps',
    summary: 'Cross-platform apps for iOS and Android from a single codebase.',
    includes: ['iOS & Android apps', 'App Store & Play Store launch', 'Backend & push notifications'],
  },
  {
    id: 'cloud',
    icon: 'cloud',
    title: 'Cloud & DevOps',
    summary: 'Infrastructure that deploys automatically and scales with your users.',
    includes: ['AWS setup & migration', 'Docker & Kubernetes', 'CI/CD pipelines & monitoring'],
  },
  {
    id: 'security',
    icon: 'shield',
    title: 'Cybersecurity',
    summary: 'Find and fix weaknesses before attackers — or investors — do.',
    includes: ['Security audits & penetration testing', 'Server & cloud hardening', 'Secure code review'],
  },
  {
    id: 'design',
    icon: 'pen',
    title: 'UI/UX Design',
    summary: 'Clear, modern interfaces your users understand on first use.',
    includes: ['User research & wireframes', 'Figma prototypes', 'Design systems'],
  },
  {
    id: 'ecommerce',
    icon: 'cart',
    title: 'E-commerce & Marketing',
    summary: 'Launch your online store and bring in buyers — on Etsy, Shopify or your own site.',
    includes: [
      'Etsy shop setup & management',
      'Product listings & SEO',
      'Shopify & custom online stores',
      'Social media & ads marketing',
    ],
    wholeTeam: true,
  },
];
