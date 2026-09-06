export type ServiceCategory = 'all' | 'ai_cloud' | 'development' | 'ecommerce' | 'creative';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  description: string;
  iconName: string;
  popular?: boolean;
  deliverables: string[];
  techStack: string[];
}

export type ProjectCategory = 'all' | 'web' | 'mobile' | 'cloud' | 'ecommerce' | 'marketing';

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  categoryLabel: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  challenge: string;
  solution: string;
  results: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  linkedinUrl?: string;
  featuredQuote?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  projectType: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface GoogleSheetSubmission {
  id: string;
  timestamp: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
  status: 'Pending' | 'In Review' | 'Contacted' | 'Booked';
  syncedToGoogleSheet: boolean;
}
