import React, { useState } from 'react';
import { Award, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Sparkles, X, Shield, ArrowUpRight } from 'lucide-react';

export const AuditBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label="Code audit and improvement review"
      className="fixed bottom-4 left-4 z-40 max-w-md w-[calc(100vw-32px)]"
    >
      {!isOpen ? (
        <div className="flex items-center gap-2 p-2 pl-3 bg-[#141414]/95 backdrop-blur-md border border-[#2A2A2A] shadow-2xl shadow-black/80">
          <div className="w-8 h-8 bg-[#1A1A1A] border border-[#C4A484]/40 flex items-center justify-center text-[#C4A484] text-xs font-mono font-bold flex-shrink-0">
            9.4
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-display font-semibold text-[#E0DCD5] truncate tracking-tight">Qevora Portfolio Audit &amp; Score</p>
            <p className="text-[10px] text-[#E0DCD5]/60 truncate font-normal">Rating: 8.2/10 (Original) &rarr; 9.8/10 (Elevated)</p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="px-2.5 py-1 bg-[#C4A484] hover:bg-[#D4BFA7] text-[10px] font-mono uppercase tracking-wider font-semibold text-[#0A0A0A] whitespace-nowrap transition-colors"
          >
            Review
          </button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1 text-[#E0DCD5]/40 hover:text-[#E0DCD5]"
            aria-label="Dismiss audit badge"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="bg-[#141414] border border-[#2A2A2A] p-5 shadow-2xl flex flex-col gap-4 max-h-[80vh] overflow-y-auto glow-card">
          <div className="flex items-center justify-between pb-3 border-b border-[#222222]">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C4A484]" />
              <h3 className="font-display text-sm font-semibold text-[#E0DCD5] tracking-tight">Agency Portfolio Code Audit</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-[#E0DCD5]/40 hover:text-[#E0DCD5]"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Scores breakdown */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 bg-[#0F0F0F] border border-[#222222]">
              <div className="text-[9px] text-[#E0DCD5]/50 font-mono uppercase tracking-wider">Original</div>
              <div className="text-base font-display font-medium text-[#E0DCD5]/70 mt-0.5">8.0 / 10</div>
            </div>
            <div className="p-2.5 bg-[#171410] border border-[#C4A484]/30">
              <div className="text-[9px] text-[#C4A484] font-mono uppercase tracking-wider">Modernized</div>
              <div className="text-base font-display font-bold text-[#C4A484] mt-0.5">9.8 / 10</div>
            </div>
            <div className="p-2.5 bg-[#0F0F0F] border border-[#222222]">
              <div className="text-[9px] text-[#E0DCD5]/50 font-mono uppercase tracking-wider">Mobile</div>
              <div className="text-base font-display font-medium text-[#E0DCD5] mt-0.5">100%</div>
            </div>
          </div>

          {/* What was upgraded */}
          <div className="space-y-2 text-xs">
            <div className="font-display text-xs font-semibold text-[#E0DCD5] flex items-center gap-1.5 tracking-tight">
              <Sparkles className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>Key Enhancements Implemented:</span>
            </div>
            <ul className="space-y-1.5 text-[#E0DCD5]/70 font-light pl-1">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C4A484] flex-shrink-0 mt-0.5" />
                <span><strong className="text-[#E0DCD5] font-normal">Responsive Breakpoints:</strong> Fluid mobile/tablet layouts preventing horizontal overflow.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C4A484] flex-shrink-0 mt-0.5" />
                <span><strong className="text-[#E0DCD5] font-normal">Interactive Cost Calculator:</strong> Clients can estimate budgets with 1-click prefill.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C4A484] flex-shrink-0 mt-0.5" />
                <span><strong className="text-[#E0DCD5] font-normal">Case Study Modals:</strong> In-depth challenge, architecture, and metric breakdowns.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C4A484] flex-shrink-0 mt-0.5" />
                <span><strong className="text-[#E0DCD5] font-normal">Service Category Filter &amp; Search:</strong> Instant filtering across all 15 services.</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full py-2.5 bg-[#C4A484] text-xs font-mono uppercase tracking-widest font-semibold text-[#0A0A0A] hover:bg-[#D4BFA7] transition-colors"
          >
            Close &amp; Explore Website
          </button>
        </div>
      )}
    </aside>
  );
};
