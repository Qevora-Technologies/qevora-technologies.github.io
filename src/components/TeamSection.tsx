import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../data/agencyData';
import { MessageSquare, Sparkles, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';

interface TeamSectionProps {
  onConsultSpecialist?: (name: string, role: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onConsultSpecialist }) => {
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const getInitials = (name: string): string => {
    const cleaned = name.replace(/\./g, '').trim();
    const parts = cleaned.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (cleaned.slice(0, 2) || 'QT').toUpperCase();
  };

  const handleConsult = (name: string, role: string) => {
    if (onConsultSpecialist) {
      onConsultSpecialist(name, role);
    } else {
      const el = document.getElementById('book') || document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="team" className="py-24 bg-transparent relative border-t border-[#16366B]/50 overflow-hidden scroll-mt-20">
      {/* Ambient background glow orbs */}
      <div
        className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-radial from-[#38BDF8]/10 via-[#2563EB]/5 to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-radial from-[#1D4ED8]/10 via-transparent to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Meet the Minds Behind{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#38BDF8]">
              QevoraTech
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#E2E8F0]/80 max-w-2xl font-normal">
            A collective of senior software engineers, AI architects, DevOps leaders, and growth specialists dedicated to shipping world-class digital products.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => {
            const hasImage = Boolean(member.image && member.image.trim() !== '' && !imageErrorMap[member.id]);
            const initials = getInitials(member.name);

            return (
              <div
                key={member.id}
                className="p-6 bg-[#0A2552] border border-[#16366B] hover:border-[#38BDF8]/60 glow-card-hover rounded-2xl transition-all duration-300 group hover:-translate-y-1.5 flex flex-col justify-between shadow-xl shadow-[#020A18]/40 relative"
              >
                <div>
                  {/* Photo / Monogram Avatar & Role Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#16366B] group-hover:border-[#38BDF8] transition-colors flex-shrink-0 shadow-md">
                      {hasImage ? (
                        <img
                          src={member.image}
                          alt={`Portrait of ${member.name}`}
                          loading="lazy"
                          onError={() => setImageErrorMap((prev) => ({ ...prev, [member.id]: true }))}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#071E42] via-[#0A2552] to-[#1D4ED8] flex flex-col items-center justify-center relative">
                          <span className="font-mono text-sm font-black text-white group-hover:text-[#38BDF8] transition-colors tracking-wider">
                            {initials}
                          </span>
                          <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#34A853] border border-[#071E42]" title="Active specialist" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-bold text-white group-hover:text-[#38BDF8] transition-colors tracking-tight truncate">
                        {member.name}
                      </h3>
                      <div className="text-[11px] font-mono text-[#93C5FD] uppercase tracking-wider font-semibold truncate">
                        {member.role}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-[#E2E8F0]/75 font-normal leading-relaxed mb-4 line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-[#071E42] text-[10px] font-mono text-[#93C5FD] border border-[#16366B] rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Featured Quote Pill */}
                  {member.featuredQuote && (
                    <div className="p-3 bg-[#071E42]/80 border border-[#16366B] text-[11px] text-[#E2E8F0]/80 italic mb-4 font-sans rounded-lg">
                      "{member.featuredQuote}"
                    </div>
                  )}
                </div>

                {/* Direct Consultation / Contact Action */}
                <div className="pt-3 border-t border-[#16366B] flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#94A3B8] uppercase tracking-wider">
                    <UserCheck className="w-3 h-3 text-[#34A853]" />
                    In-House Lead
                  </span>
                  <button
                    type="button"
                    onClick={() => handleConsult(member.name, member.role)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#071E42] hover:bg-[#38BDF8] text-[#38BDF8] hover:text-[#071E42] rounded-lg text-xs font-semibold border border-[#16366B] transition-colors cursor-pointer"
                    title={`Consult with ${member.name}`}
                  >
                    <span>Consult</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
