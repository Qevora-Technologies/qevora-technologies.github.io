/**
 * Team members, in display order.
 *
 * PHOTOS: drop a file into `src/assets/team/` named after the member's `id`
 * (e.g. `mubashir-fayyaz.jpg`, `ali-raza.webp`). It's picked up automatically and
 * optimised at build time. Until a photo exists, the card shows initials.
 * Square photos, at least 800×800, work best.
 */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  linkedin?: string;
}

export const team: TeamMember[] = [
  { id: 'muhammad-hamza', name: 'Muhammad Hamza', role: 'Founder', skills: ['AWS & Cloud', 'Docker & K8s', 'PostgreSQL', 'Cybersecurity', 'Mobile Apps'] },
  { id: 'mubashir-fayyaz', name: 'Mubashir Fayyaz', role: 'Cybersecurity & DevOps Engineer', skills: ['Cybersecurity', 'DevOps', 'MERN Stack', 'Mobile Apps'] },
  { id: 'saad-aziz', name: 'Rao Saad Aziz', role: 'AI/ML Engineer & UI/UX Designer', skills: ['Machine Learning', 'LLM Apps', 'UI/UX Design'] },
  { id: 'muhammad-saad-malik', name: 'Muhammad Saad Malik', role: 'MERN Stack Developer', skills: ['MongoDB', 'Express & Node.js', 'React'] },
  { id: 'haseeb-ahmed', name: 'Haseeb Ahmed', role: 'Project Manager', skills: ['Project Management', 'Agile Delivery', 'Client Success'] },
];
