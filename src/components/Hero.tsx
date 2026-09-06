import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Layers, Sparkles, Terminal } from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onBookProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onBookProject
}) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center items-center pt-32 pb-20 overflow-hidden bg-transparent"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Main Display Title */}
        <h1
          id="hero-main-title"
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] max-w-4xl mb-6 tracking-tight"
        >
          Where Innovation Meets{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#93C5FD] to-[#38BDF8] drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]">
            Scalable Engineering.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          id="hero-subtext"
          className="text-base sm:text-xl text-[#E2E8F0]/80 font-normal leading-relaxed max-w-2xl mb-10"
        >
          We engineer high-performance web &amp; mobile software, custom AI automation workflows, scalable cloud systems, and high-impact digital growth for visionary enterprises.
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 w-full max-w-md sm:max-w-none">
          <button
            type="button"
            id="hero-book-cta-btn"
            onClick={onBookProject}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-extrabold text-[#071E42] bg-white hover:bg-[#38BDF8] shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            <span>Book Us Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            id="hero-services-cta-btn"
            onClick={onExploreServices}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold text-white hover:text-white bg-[#0A2552]/80 hover:bg-[#0E316B] border border-[#16366B] hover:border-[#38BDF8]/60 shadow-lg transition-all duration-200"
          >
            <Layers className="w-4 h-4 text-[#38BDF8]" />
            <span>Explore Solutions</span>
          </button>
        </div>

        {/* Clean Trust Indicators */}
        <div
          id="hero-trust-chips"
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 w-full max-w-4xl pt-8 border-t border-[#16366B]/80"
        >
          <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs font-semibold text-[#E2E8F0] bg-[#0A2552]/70 p-3.5 rounded-lg border border-[#16366B]">
            <ShieldCheck className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
            <span>Enterprise Security</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs font-semibold text-[#E2E8F0] bg-[#0A2552]/70 p-3.5 rounded-lg border border-[#16366B]">
            <Clock className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
            <span>100% On-Time Sprints</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs font-semibold text-[#E2E8F0] bg-[#0A2552]/70 p-3.5 rounded-lg border border-[#16366B]">
            <Sparkles className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
            <span>99.9% Uptime Guarantee</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs font-semibold text-[#E2E8F0] bg-[#0A2552]/70 p-3.5 rounded-lg border border-[#16366B]">
            <Terminal className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
            <span>Direct Senior Talent</span>
          </div>
        </div>
      </div>
    </section>
  );
};

