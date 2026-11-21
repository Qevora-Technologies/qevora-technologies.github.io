import React from 'react';
import { AGENCY_STATS } from '../data/agencyData';
import { Target, Zap, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-transparent relative border-t border-[#16366B]/50 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-radial from-[#38BDF8]/10 via-[#2563EB]/4 to-transparent blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-radial from-[#1D4ED8]/10 via-transparent to-transparent blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-3xl">
            A Multi-Disciplinary Technology Partner Built For{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#38BDF8]">
              Continuous Growth
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#E2E8F0]/80 max-w-2xl font-normal">
            We bridge the gap between creative design, deep technical engineering, and marketplace execution to turn ambitious ideas into enduring digital products.
          </p>
        </div>

        {/* Clean Stat Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {AGENCY_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 bg-[#0A2552] border border-[#16366B] hover:border-[#38BDF8]/60 glow-card-hover rounded-xl transition-all duration-300 group hover:-translate-y-1 shadow-lg shadow-[#020A18]/40"
            >
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-white group-hover:text-[#38BDF8] transition-colors mb-2 tracking-tight">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs uppercase tracking-widest font-bold text-[#93C5FD] mb-1 font-mono">
                {stat.label}
              </div>
              <div className="text-xs text-[#E2E8F0]/70 font-normal">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

        {/* 3 Core Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 bg-[#0A2552] border border-[#16366B] rounded-xl hover:border-[#38BDF8]/40 transition-all flex flex-col gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#071E42] border border-[#16366B] text-[#38BDF8] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">Innovation First</h3>
            <p className="text-sm text-[#E2E8F0]/75 leading-relaxed font-normal">
              We leverage modern architectures and intelligent automation workflows to keep your business ahead of technological shifts.
            </p>
          </div>

          <div className="p-7 bg-[#0A2552] border border-[#16366B] rounded-xl hover:border-[#38BDF8]/40 transition-all flex flex-col gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#071E42] border border-[#16366B] text-[#38BDF8] flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">Agile Velocity</h3>
            <p className="text-sm text-[#E2E8F0]/75 leading-relaxed font-normal">
              Iterative 1-2 week sprints, automated continuous delivery, and transparent weekly staging updates ensure you ship faster with zero downtime.
            </p>
          </div>

          <div className="p-7 bg-[#0A2552] border border-[#16366B] rounded-xl hover:border-[#38BDF8]/40 transition-all flex flex-col gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#071E42] border border-[#16366B] text-[#38BDF8] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">Engineering Excellence</h3>
            <p className="text-sm text-[#E2E8F0]/75 leading-relaxed font-normal">
              Type-safe code, scalable cloud infrastructure, and enterprise security compliance built to handle millions of requests seamlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

