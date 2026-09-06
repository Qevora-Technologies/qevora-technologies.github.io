import React from 'react';
import { TESTIMONIALS } from '../data/agencyData';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-transparent relative border-t border-[#16366B]/50 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-radial from-[#38BDF8]/10 via-transparent to-transparent blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Trusted by Ambitious Founders &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#38BDF8]">
              Tech Leaders
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#E2E8F0]/80 max-w-2xl font-normal">
            Real outcomes and measurable bottom-line value delivered by our engineering and growth teams.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-8 bg-[#0A2552] border border-[#16366B] rounded-2xl hover:border-[#38BDF8]/50 glow-card-hover transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1 shadow-xl shadow-[#020A18]/40"
            >
              <Quote className="w-8 h-8 text-[#38BDF8]/20 absolute top-6 right-6" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#38BDF8] mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#38BDF8] text-[#38BDF8]" />
                  ))}
                  <span className="text-[11px] font-mono text-[#93C5FD] ml-1 font-bold">5.0 / 5.0</span>
                </div>

                {/* Content */}
                <p className="text-sm text-[#E2E8F0] font-sans leading-relaxed mb-6 font-normal">
                  "{t.content}"
                </p>
              </div>

              {/* Author & Project info */}
              <div className="pt-4 border-t border-[#16366B] flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="w-10 h-10 rounded-full object-cover border border-[#16366B]"
                />
                <div>
                  <h4 className="text-sm font-display font-bold text-white flex items-center gap-1.5 tracking-tight">
                    {t.name}
                    <ShieldCheck className="w-3.5 h-3.5 text-[#38BDF8]" />
                  </h4>
                  <p className="text-xs text-[#94A3B8]">{t.role}, {t.company}</p>
                  <span className="text-[10px] font-mono text-[#38BDF8] block mt-0.5 uppercase tracking-wider font-semibold">
                    Project: {t.projectType}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

