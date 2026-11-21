import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/agencyData';
import { ProjectCategory, ProjectItem } from '../types';
import { CaseStudyModal } from './CaseStudyModal';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

interface PortfolioSectionProps {
  onBookSimilar: (projectTitle: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onBookSimilar }) => {
  const [selectedFilter, setSelectedFilter] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filters: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web & Systems' },
    { key: 'mobile', label: 'Mobile Apps' },
    { key: 'cloud', label: 'Cloud & DevOps' },
    { key: 'ecommerce', label: 'E-Commerce & Marketplaces' },
    { key: 'marketing', label: 'Digital Marketing' },
  ];

  const filteredProjects = selectedFilter === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter(p => p.category === selectedFilter);

  return (
    <section id="work" className="py-24 bg-transparent relative border-t border-[#16366B]/50 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-radial from-[#38BDF8]/10 via-transparent to-transparent blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-radial from-[#1D4ED8]/10 via-transparent to-transparent blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Featured Case Studies &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#38BDF8]">
              Deployments
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#E2E8F0]/80 max-w-2xl font-normal">
            Explore how we build resilient cloud architectures, mobile apps, e-commerce stores, and digital growth engines.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
          {filters.map(f => (
            <button
              key={f.key}
              type="button"
              onClick={() => setSelectedFilter(f.key)}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold whitespace-nowrap transition-all rounded-lg border ${
                selectedFilter === f.key
                  ? 'bg-white text-[#071E42] border-white shadow-md'
                  : 'bg-[#0A2552] text-[#E2E8F0]/80 hover:text-white hover:bg-[#0E316B] border-[#16366B]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-[#0A2552] border border-[#16366B] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#38BDF8]/60 glow-card-hover transition-all duration-300 hover:-translate-y-1.5 shadow-lg shadow-[#020A18]/40"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#071E42]">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2552] via-[#0A2552]/30 to-transparent" />

                {/* Primary Metric Badge */}
                {project.metrics.length > 0 && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-[#071E42]/90 backdrop-blur-md border border-[#16366B] rounded-full text-xs font-mono font-bold text-[#38BDF8] flex items-center gap-1 shadow-lg">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{project.metrics[0].value} {project.metrics[0].label}</span>
                  </div>
                )}

                {/* Category Pill */}
                <div className="absolute bottom-3 left-4">
                  <span className="text-[10px] font-mono tracking-wider uppercase font-bold text-white bg-[#071E42]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#16366B]">
                    {project.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#94A3B8] font-mono uppercase tracking-wider mb-1 font-bold">{project.client}</div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#E2E8F0]/75 font-normal leading-relaxed line-clamp-2 mb-4">
                    {project.shortDesc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 bg-[#071E42] text-[10px] font-mono text-[#93C5FD] border border-[#16366B] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-[#94A3B8]">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Link */}
                <button
                  type="button"
                  onClick={() => setActiveModalProject(project)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#071E42] hover:bg-white border border-[#16366B] hover:border-white rounded-lg text-xs uppercase tracking-widest font-bold text-white hover:text-[#071E42] transition-all group-hover:border-[#38BDF8]/50"
                >
                  <span>Explore Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onBookSimilar={onBookSimilar}
      />
    </section>
  );
};

