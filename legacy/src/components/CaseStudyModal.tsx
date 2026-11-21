import React from 'react';
import { ProjectItem } from '../types';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onBookSimilar: (projectTitle: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onBookSimilar }) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#020A18]/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0A2552] border border-[#16366B] rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image with Overlay */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-[#071E42]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2552] via-[#0A2552]/60 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-[#071E42]/80 hover:bg-[#071E42] text-white flex items-center justify-center rounded-full border border-[#16366B] transition-colors"
            aria-label="Close Case Study Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Tag on image bottom */}
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1 bg-[#071E42]/90 border border-[#38BDF8]/40 text-[#38BDF8] text-[10px] font-mono uppercase font-bold rounded-md mb-2">
              {project.categoryLabel}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            <p className="text-xs font-mono uppercase tracking-wider text-[#93C5FD]">Client: {project.client}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-[#071E42] border border-[#16366B] rounded-xl text-center">
            {project.metrics.map((m, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="font-display text-xl sm:text-2xl font-bold text-[#38BDF8] tracking-tight">
                  {m.value}
                </span>
                <span className="text-[10px] text-[#E2E8F0]/70 font-mono uppercase tracking-wider mt-0.5">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Detailed Overview */}
          <div>
            <h4 className="text-[10px] font-mono uppercase text-[#38BDF8] font-bold tracking-[0.2em] mb-2">Executive Overview</h4>
            <p className="text-[#E2E8F0]/85 text-sm sm:text-base font-normal leading-relaxed">{project.fullDesc}</p>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#071E42] border border-[#16366B] rounded-xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-mono text-white mb-2 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
                <span>The Challenge</span>
              </div>
              <p className="text-xs sm:text-sm text-[#E2E8F0]/75 font-normal leading-relaxed">{project.challenge}</p>
            </div>

            <div className="p-4 bg-[#071E42] border border-[#16366B] rounded-xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-mono text-white mb-2 font-bold">
                <Zap className="w-4 h-4 text-[#38BDF8]" />
                <span>Our Solution</span>
              </div>
              <p className="text-xs sm:text-sm text-[#E2E8F0]/75 font-normal leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Verified Results */}
          <div>
            <h4 className="text-[10px] font-mono uppercase text-[#38BDF8] font-bold tracking-[0.2em] mb-3">Key Results &amp; Outcomes</h4>
            <div className="flex flex-col gap-2">
              {project.results.map((res, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#E2E8F0] font-normal">
                  <CheckCircle2 className="w-4 h-4 text-[#38BDF8] flex-shrink-0 mt-0.5" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Used */}
          <div>
            <h4 className="text-[10px] font-mono uppercase text-[#38BDF8] font-bold tracking-[0.2em] mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#071E42] border border-[#16366B] rounded-md text-[10px] font-mono text-[#93C5FD]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="pt-4 border-t border-[#16366B] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#E2E8F0]/70 font-normal">
              Interested in achieving similar outcomes?
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#E2E8F0] hover:text-white bg-[#071E42] border border-[#16366B] rounded-lg"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookSimilar(project.title);
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs uppercase tracking-widest font-bold text-[#071E42] bg-white hover:bg-[#38BDF8] rounded-lg transition-colors shadow-md"
              >
                <span>Book Similar Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

