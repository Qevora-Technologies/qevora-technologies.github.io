import { ServiceItem, ProjectItem, TeamMember, Testimonial, FAQItem } from '../types';

export const AGENCY_STATS = [
  { value: 15, suffix: '+', label: 'Core Services', detail: 'End-to-end full stack & marketing' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', detail: 'Verified 5-star delivery score' },
  { value: 50, suffix: '+', label: 'Projects Shipped', detail: 'Across US, UK, UAE & Global' },
  { value: 7, suffix: '+', label: 'Dedicated Specialists', detail: 'Engineers, Designers & Managers' }
];

export const TECH_STACK = [
  { name: 'React / Next.js', category: 'Frontend' },
  { name: 'Flutter / Dart', category: 'Mobile' },
  { name: 'Node.js / Express', category: 'Backend' },
  { name: 'Python & AI', category: 'Machine Learning' },
  { name: 'AWS & Cloud', category: 'DevOps' },
  { name: 'PostgreSQL / Mongo', category: 'Databases' },
  { name: 'Shopify / Etsy', category: 'E-Commerce' },
  { name: 'Figma & UI/UX', category: 'Design' },
  { name: 'Docker & K8s', category: 'Infrastructure' },
  { name: 'Tailwind CSS', category: 'Styling' }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ai-engineering',
    title: 'AI & Intelligent Systems',
    category: 'ai_cloud',
    description: 'Custom AI agent architectures, LLM integrations, predictive algorithms, and automated machine learning workflows.',
    iconName: 'Cpu',
    popular: true,
    deliverables: ['Custom LLM integrations', 'Automated data pipelines', 'Chatbots & assistants', 'Computer vision & analytics'],
    techStack: ['Python', 'OpenAI', 'Gemini', 'LangChain', 'FastAPI']
  },
  {
    id: 'aws-cloud',
    title: 'Cloud Services & AWS',
    category: 'ai_cloud',
    description: 'High-availability infrastructure setup, AWS deployment, CI/CD automated pipelines, server monitoring, and zero-downtime migrations.',
    iconName: 'Cloud',
    popular: true,
    deliverables: ['AWS EC2, S3, ECS, Lambda', 'Terraform infrastructure as code', '24/7 Server monitoring & alerting', 'Automated backup systems'],
    techStack: ['AWS', 'Docker', 'Kubernetes', 'Nginx', 'GitHub Actions']
  },
  {
    id: 'database-deployment',
    title: 'Database Architecture & Deployment',
    category: 'ai_cloud',
    description: 'Scalable SQL/NoSQL database clustering, query tuning, disaster recovery, data encryption, and real-time synchronization.',
    iconName: 'Database',
    deliverables: ['PostgreSQL & MongoDB clusters', 'Redis caching layers', 'Automated daily snapshots', 'Zero-data-loss migrations'],
    techStack: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'MySQL']
  },
  {
    id: 'api-integration',
    title: 'API Integration & Microservices',
    category: 'ai_cloud',
    description: 'Connecting enterprise applications, payment gateways, ERPs, CRMs, and third-party systems via high-throughput secure endpoints.',
    iconName: 'Network',
    deliverables: ['Stripe/PayPal payment engines', 'Webhook ingestion handlers', 'OAuth 2.0 Auth pipelines', 'REST & GraphQL APIs'],
    techStack: ['GraphQL', 'REST', 'Postman', 'OAuth2', 'Webhooks']
  },
  {
    id: 'frontend-dev',
    title: 'Front-End Web Development',
    category: 'development',
    description: 'High-performance, ultra-responsive web applications built with modern component architectures and micro-interactions.',
    iconName: 'Layout',
    popular: true,
    deliverables: ['Responsive Web Apps (SPA/SSR)', 'Interactive dashboards', 'Core Web Vitals 95+ score', 'Pixel-perfect UI implementation'],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite']
  },
  {
    id: 'backend-dev',
    title: 'Back-End Engineering',
    category: 'development',
    description: 'Secure, scalable backend services with bulletproof authentication, business logic, role-based access, and high concurrent load.',
    iconName: 'Server',
    deliverables: ['High-load microservices', 'RBAC & Token security', 'Rate limiting & DDoS protection', 'Background queue workers'],
    techStack: ['Node.js', 'Express', 'NestJS', 'Go', 'Python']
  },
  {
    id: 'mobile-dev',
    title: 'Mobile App Development',
    category: 'development',
    description: 'Cross-platform native iOS & Android applications with buttery 60fps animations, offline storage, and push notifications.',
    iconName: 'Smartphone',
    popular: true,
    deliverables: ['Cross-platform iOS & Android', 'App Store & Google Play release', 'Offline-first sync engine', 'Push notifications & telemetry'],
    techStack: ['Flutter', 'Dart', 'Firebase', 'Swift', 'Kotlin']
  },
  {
    id: 'wordpress-services',
    title: 'WordPress & Headless CMS',
    category: 'development',
    description: 'Custom WordPress theme development, WooCommerce integration, security hardening, speed optimization, and CMS management.',
    iconName: 'Globe',
    deliverables: ['Custom lightweight theme builds', 'WooCommerce store setups', 'Speed & caching optimization', 'Site security audit'],
    techStack: ['WordPress', 'WooCommerce', 'PHP', 'Elementor', 'Headless WP']
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    category: 'ecommerce',
    description: 'Data-driven marketing campaigns to capture qualified buyer leads, maximize return on ad spend (ROAS), and expand market share.',
    iconName: 'TrendingUp',
    deliverables: ['Google Search & Meta Ads', 'Lead generation funnels', 'Conversion Rate Optimization (CRO)', 'Performance reporting'],
    techStack: ['Meta Ads', 'Google Ads', 'Analytics 4', 'Tag Manager', 'HubSpot']
  },
  {
    id: 'social-media',
    title: 'Social Media Management',
    category: 'ecommerce',
    description: 'End-to-end social media strategy, weekly visual asset calendar, organic audience growth, and community engagement.',
    iconName: 'Share2',
    deliverables: ['Monthly content calendars', 'Reels & short-form video plans', 'Community moderation', 'Influencer outreach'],
    techStack: ['Instagram', 'LinkedIn', 'TikTok', 'Buffer', 'Canva']
  },
  {
    id: 'etsy-selling',
    title: 'Etsy Launch & Growth Strategy',
    category: 'ecommerce',
    description: 'Turnkey onboarding and scale strategy for high-margin Etsy shops with niche validation, listing architecture, and tag research.',
    iconName: 'ShoppingBag',
    deliverables: ['Niche product validation', 'Store branding & setup', 'Etsy SEO tag architecture', 'Competitor pricing analysis'],
    techStack: ['eRank', 'Marmalead', 'Etsy Ads', 'Canva Pro']
  },
  {
    id: 'etsy-management',
    title: 'Etsy Account Management',
    category: 'ecommerce',
    description: 'Full day-to-day operations including rank tracking, keyword optimization, customer message handling, and order dispute resolution.',
    iconName: 'Store',
    deliverables: ['Daily keyword optimization', 'Customer messaging within 1hr', 'Inventory & mockup updating', 'Monthly revenue reports'],
    techStack: ['Etsy Shop Manager', 'Alura', 'Photoshop', 'Excel Analytics']
  },
  {
    id: 'ebay-management',
    title: 'eBay Store Management',
    category: 'ecommerce',
    description: 'Comprehensive eBay marketplace operations: bulk listings, promoted listings campaigns, top-rated seller compliance, and catalog hygiene.',
    iconName: 'Package',
    deliverables: ['High-converting titles & listings', 'Promoted listings management', 'Top-rated seller maintenance', 'Competitor benchmarking'],
    techStack: ['eBay Seller Hub', 'Terapeak', 'Zik Analytics']
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design & Branding',
    category: 'creative',
    description: 'Memorable brand identity packages, vector design, social media kits, pitch decks, and commercial marketing collateral.',
    iconName: 'Palette',
    deliverables: ['Logo & complete brand identity kit', 'Marketing banners & social templates', 'Vector illustrations & icons', 'Print & packaging ready assets'],
    techStack: ['Adobe Illustrator', 'Photoshop', 'Figma', 'InDesign']
  },
  {
    id: 'video-editing',
    title: 'Video Editing & Motion Graphics',
    category: 'creative',
    description: 'Cinematic corporate promo reels, high-converting social video ads, YouTube long-form editing, and animated lower-thirds.',
    iconName: 'Film',
    deliverables: ['Commercial video editing', 'Short-form Reels / TikToks', 'Dynamic typography & captions', 'Color grading & sound design'],
    techStack: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut Pro']
  },
  {
    id: 'customer-support',
    title: '24/7 Customer Support Services',
    category: 'creative',
    description: 'Omnichannel customer support representatives handling live chat, email helpdesks, and customer satisfaction tickets.',
    iconName: 'Headphones',
    deliverables: ['Live chat & email ticketing', 'Zendesk / Intercom setup', 'SOP knowledge base creation', 'Under 5-minute first response'],
    techStack: ['Zendesk', 'Intercom', 'Freshdesk', 'Crisp Chat', 'Slack']
  }
];

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'project-ecommerce',
    title: 'NovaMart E-Commerce Store',
    client: 'Global Lifestyle Retailer',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce / Web Development',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'A lightning-fast, conversion-optimized multi-vendor store with automated inventory sync and one-click checkout.',
    fullDesc: 'We engineered a headless e-commerce experience that slashed page load times by 68% and boosted mobile checkout conversions by 2.4x. Integrated real-time shipping calculation, multi-currency support, and Stripe payments.',
    metrics: [
      { label: 'Conversion Lift', value: '+240%' },
      { label: 'Load Time', value: '0.8s' },
      { label: 'Monthly GMV', value: '$320k+' }
    ],
    tags: ['Next.js', 'Shopify Storefront API', 'Tailwind CSS', 'Stripe'],
    challenge: 'The client had a legacy store experiencing 4.5-second load times and a 72% mobile cart abandonment rate during peak flash sales.',
    solution: 'Migrated to Next.js static generation with edge caching, rebuilt the cart with optimistic state updates, and streamlined the 1-step checkout flow.',
    results: [
      'Page load time reduced from 4.5s down to 0.8s',
      'Mobile checkout conversion rate increased by 240%',
      'Handled 25,000 concurrent visitors on Black Friday with zero downtime'
    ]
  },
  {
    id: 'project-social',
    title: 'Apex Dynamics Brand Growth',
    client: 'FinTech Startup',
    category: 'marketing',
    categoryLabel: 'Digital Marketing & Social Media',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'Omnichannel content strategy, motion design ads, and B2B lead generation campaign delivering 15x ROI.',
    fullDesc: 'Conducted customer psychographic research and implemented an aggressive video-first organic + paid growth system across LinkedIn and Meta platforms, driving over 8,000 qualified enterprise waitlist signups.',
    metrics: [
      { label: 'Follower Growth', value: '+450%' },
      { label: 'Cost Per Lead', value: '-58%' },
      { label: 'Waitlist Signups', value: '8.2k' }
    ],
    tags: ['Meta Ads', 'LinkedIn B2B', 'After Effects', 'Figma'],
    challenge: 'A newly funded fintech needed rapid market presence and investor credibility before their public product debut.',
    solution: 'Designed 40+ high-engagement motion infographics, executive thought leadership series, and targeted lookalike ad funnels.',
    results: [
      'Grew organic LinkedIn followers from 300 to 14,000 in 90 days',
      'Lowered B2B customer acquisition cost by 58%',
      'Featured on top industry newsletters and product launches'
    ]
  },
  {
    id: 'project-mobile',
    title: 'PulseFit Workout & Health Tracker',
    client: 'HealthTech Ventures',
    category: 'mobile',
    categoryLabel: 'Mobile App Development',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'Cross-platform Flutter mobile app featuring AI workout pose detection, Apple Health sync, and community challenges.',
    fullDesc: 'Engineered an offline-first fitness companion app for iOS and Android with on-device camera tracking, interactive graphs, workout logging, and real-time social leaderboards.',
    metrics: [
      { label: 'App Store Rating', value: '4.9 ★' },
      { label: 'Active Users', value: '65k+' },
      { label: 'Daily Retention', value: '42%' }
    ],
    tags: ['Flutter', 'Dart', 'Firebase', 'On-Device AI', 'HealthKit'],
    challenge: 'Building a responsive real-time pose tracking app that worked smoothly even on mid-range Android smartphones without thermal throttling.',
    solution: 'Leveraged lightweight TFLite models in isolated Dart background isolates with GPU acceleration and battery-friendly state persistence.',
    results: [
      'Maintained steady 60 FPS performance across 98% of tested devices',
      'Over 65,000 active monthly users in first 6 months',
      'Awarded "App of the Day" in the Fitness category'
    ]
  },
  {
    id: 'project-cloud',
    title: 'FinScale Enterprise AWS Infrastructure',
    client: 'SaaS Platform',
    category: 'cloud',
    categoryLabel: 'Cloud & DevOps Architecture',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'Automated multi-region Kubernetes cluster deployment with zero-downtime auto-scaling and SOC-2 compliance.',
    fullDesc: 'Architected and deployed enterprise-grade AWS infrastructure using Terraform and Amazon EKS. Implemented automated vulnerability scanning, centralized Grafana telemetry, and automated database failover.',
    metrics: [
      { label: 'Platform Uptime', value: '99.99%' },
      { label: 'Cloud Cost Cut', value: '-34%' },
      { label: 'Deployment Time', value: '4 min' }
    ],
    tags: ['AWS EKS', 'Terraform', 'Docker', 'Grafana', 'Prometheus'],
    challenge: 'The client faced unpredictable traffic spikes crashing their monolithic servers and incurring $12k/month in unoptimized cloud waste.',
    solution: 'Re-architected the system into containerized microservices managed by Kubernetes with spot-instance auto-scaling and caching.',
    results: [
      'Achieved 99.99% continuous uptime over 12 consecutive months',
      'Reduced monthly cloud infrastructure billing by 34%',
      'Automated deployment cycle reduced from 3 hours to under 4 minutes'
    ]
  },
  {
    id: 'project-marketplace',
    title: 'ArtisanCraft Etsy & eBay Scale',
    client: 'Handcrafted Goods Brand',
    category: 'ecommerce',
    categoryLabel: 'Etsy & Marketplace Growth',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'Complete listing optimization, SEO ranking overhaul, and customer support management driving $180k+ annual sales.',
    fullDesc: 'Took an underperforming shop with 12 stagnant listings and transformed it into a Star Seller powerhouse with over 200 optimized listings, professional product mockups, and strategic promoted ads.',
    metrics: [
      { label: 'Organic Search Rank', value: 'Top 3' },
      { label: 'Revenue Growth', value: '+380%' },
      { label: 'Star Seller Score', value: '100%' }
    ],
    tags: ['Etsy SEO', 'eBay Seller Hub', 'eRank', 'Photoshop'],
    challenge: 'The seller had high-quality products but zero keyword visibility on search and was struggling with shipping response deadlines.',
    solution: 'Rewrote all listing titles, tags, and descriptions using high-search low-competition keywords, paired with streamlined fulfillment SOPs.',
    results: [
      'Achieved Etsy Star Seller badge status within 60 days',
      'Generated over $180,000 in net revenue in the first year',
      'Maintained 100% 5-star customer feedback score'
    ]
  },
  {
    id: 'project-corporate',
    title: 'Vanguard Capital Corporate Portal',
    client: 'Investment Firm',
    category: 'web',
    categoryLabel: 'Web & Backend Development',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80',
    shortDesc: 'A high-security investor portal with real-time portfolio tracking, document signing, and interactive ROI calculators.',
    fullDesc: 'Built a bespoke digital client hub with end-to-end encrypted document delivery, interactive financial charts, and role-based access for wealth managers and clients.',
    metrics: [
      { label: 'AUM Tracked', value: '$45M+' },
      { label: 'Client Onboarding', value: '3x Faster' },
      { label: 'Security Score', value: 'A+' }
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind', 'DocuSign API'],
    challenge: 'Managing confidential client portfolios via email and PDF attachments was inefficient and posed security risks.',
    solution: 'Designed and deployed a HIPAA/SOC-2 ready private dashboard with two-factor authentication and live investment telemetry.',
    results: [
      'Client onboarding turnaround time accelerated by 300%',
      'Eliminated manual PDF handling for over 150 accredited investors',
      'Zero security incidents reported in 18 months of operation'
    ]
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'saad-aziz',
    name: 'Saad Aziz',
    role: 'E-Commerce Expert & Designer',
    bio: 'Specializes in multi-channel e-commerce growth, digital store optimization, branding design, and conversion-focused creative strategies.',
    image: '',
    skills: ['E-Commerce Strategy', 'Shopify & Etsy', 'Brand Identity', 'UI/UX Design'],
    featuredQuote: 'Design without conversion strategy is just art. We build e-commerce systems that generate measurable revenue.'
  },
  {
    id: 'mubashir',
    name: 'Mubashir',
    role: 'AI Engineer & Tech Lead',
    bio: 'Specializes in Artificial Intelligence, intelligent systems architecture, LLM agent pipelines, machine learning solutions, and backend logic.',
    image: '',
    skills: ['AI / LLMs', 'Python & PyTorch', 'Full-Stack Architecture', 'System Design'],
    featuredQuote: 'Empowering businesses with intelligent software that automates complexity and scales reliably.'
  },
  {
    id: 'm-hamza',
    name: 'M. Hamza',
    role: 'DevOps & Cloud Architect',
    bio: 'Specializes in cloud infrastructure, automated deployment pipelines, AWS architecture, Linux systems, server security, and system reliability.',
    image: '',
    skills: ['AWS Cloud', 'Docker & K8s', 'CI/CD Pipelines', 'Server Hardening'],
    featuredQuote: 'Reliability is a feature. We build infrastructure that scales effortlessly under any traffic spike.'
  },
  {
    id: 'ali-raza',
    name: 'Ali Raza',
    role: 'Full-Stack Software Developer',
    bio: 'Specializes in end-to-end software engineering, high-performance frontend interfaces, robust API services, and modern database modeling.',
    image: '',
    skills: ['React & Next.js', 'Node.js & Express', 'TypeScript', 'PostgreSQL'],
    featuredQuote: 'Writing clean, maintainable, and type-safe code that provides exceptional end-user experiences.'
  },
  {
    id: 'abu-bakar',
    name: 'Abu Bakar',
    role: 'Lead Designer & Video Editor',
    bio: 'Specializes in creative visual design, brand storytelling, cinematic video editing, social media motion graphics, and commercial media.',
    image: '',
    skills: ['Motion Graphics', 'Premiere Pro', 'Brand Visuals', 'Visual Storytelling'],
    featuredQuote: 'Visuals are the first handshake of your brand. We make sure that handshake leaves an indelible impression.'
  },
  {
    id: 'haseeb-ahmad',
    name: 'Haseeb Ahmad',
    role: 'HR & Operations Lead',
    bio: 'Responsible for human resources, agile team coordination, client-talent matching, and seamless organizational project workflows.',
    image: '',
    skills: ['Resource Planning', 'Agile Operations', 'Client Success', 'Team Leadership'],
    featuredQuote: 'Great projects are built by great teams with clear communication and shared accountability.'
  },
  {
    id: 'm-taha',
    name: 'M. Taha',
    role: 'Sales & Client Relations Executive',
    bio: 'Responsible for client consultation, solution scoping, project budgeting, and building long-term collaborative agency partnerships.',
    image: '',
    skills: ['Client Scoping', 'Solution Architecture', 'Partnership Growth', 'Tech Consulting'],
    featuredQuote: 'We dont just sell services — we partner with you to find the most cost-effective path to your business goals.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Marcus Vance',
    role: 'CTO & Co-Founder',
    company: 'FinScale Technologies',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'Qevora Technologies transformed our backend infrastructure. Hamza and Mubashir migrated our entire AWS deployment with zero downtime, and our monthly cloud bill dropped by 34%. Highly recommended!',
    projectType: 'Cloud & AI Infrastructure'
  },
  {
    id: 't-2',
    name: 'Elena Rostova',
    role: 'Head of Growth',
    company: 'Luxe Aura Apparel',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'Saad and his team restructured our Etsy and e-commerce store listings from the ground up. In just 45 days, our organic search traffic exploded and we hit the Etsy Star Seller status. True masters of their craft.',
    projectType: 'E-Commerce Management'
  },
  {
    id: 't-3',
    name: 'David Chen',
    role: 'Founder',
    company: 'PulseFit Interactive',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    content: 'Ali and the development team shipped our cross-platform Flutter app on schedule. The animations are ultra-smooth, and the codebase is remarkably clean. Communication throughout the project was outstanding.',
    projectType: 'Mobile App Development'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How does Qevora Technologies handle project management & communication?',
    answer: 'We believe in 100% transparency. Every client receives a dedicated project manager, access to a real-time Slack/WhatsApp channel, and a live Jira/Trello board with weekly staging builds for continuous feedback.',
    category: 'Process'
  },
  {
    question: 'Can you work with our existing codebase or cloud infrastructure?',
    answer: 'Yes! We frequently conduct code audits, cloud architecture reviews, and take over or refactor existing codebases in React, Next.js, Node.js, Flutter, AWS, and WordPress.',
    category: 'Technical'
  },
  {
    question: 'What are your payment terms and engagement models?',
    answer: 'We offer flexible engagement models: Fixed-Price Milestone Contracts (ideal for well-scoped projects with 30-40-30 milestone disbursements) and Monthly Dedicated Specialist Retainers (for ongoing engineering/marketing).',
    category: 'Pricing'
  },
  {
    question: 'Do you provide post-launch maintenance and 24/7 technical support?',
    answer: 'Absolutely. All our development projects include a 30-day post-launch warranty with zero-cost bug fixing. We also offer ongoing SLA maintenance packages including server monitoring, security patches, and content updates.',
    category: 'Support'
  },
  {
    question: 'How fast can our project kick off after booking?',
    answer: 'Once the project scope and agreement are approved, our discovery sprint typically starts within 48 to 72 hours. Our team allocates dedicated engineers and designers immediately.',
    category: 'Timeline'
  }
];

export const COMPANY_CONTACT = {
  email: 'qevoratechnologies@gmail.com',
  googleFormUrl: 'https://forms.gle/fH2U5CFLYPkw6ijt8',
  instagramUrl: 'https://www.instagram.com/qevoratechnologies?igsi=YWxvYTB2Z3JlejFx',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61591090485817',
  supportTime: 'Response within 24 hours',
  location: 'Global Remote Delivery'
};
