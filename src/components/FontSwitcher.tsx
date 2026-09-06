import React, { useState, useEffect } from 'react';
import { Type, Check, Sparkles } from 'lucide-react';

export interface FontOption {
  id: string;
  name: string;
  displayFont: string;
  bodyFont: string;
  badge: string;
  description: string;
}

export const FONT_OPTIONS: FontOption[] = [
  {
    id: 'syne-jakarta',
    name: 'Tech Editorial',
    displayFont: 'Syne',
    bodyFont: 'Plus Jakarta Sans',
    badge: 'Recommended',
    description: 'Visionary, bold display with ultra-clean digital interface readability'
  },
  {
    id: 'space-outfit',
    name: 'Cyber Kinetic',
    displayFont: 'Space Grotesk',
    bodyFont: 'Outfit',
    badge: 'Futuristic',
    description: 'Algorithmic monospace-inspired headings with sleek modern geometry'
  },
  {
    id: 'outfit-inter',
    name: 'Silicon Valley',
    displayFont: 'Outfit',
    bodyFont: 'Inter',
    badge: 'Enterprise',
    description: 'Executive SaaS aesthetic with world-class typographic clarity'
  },
  {
    id: 'epilogue-jakarta',
    name: 'Architectural Tech',
    displayFont: 'Epilogue',
    bodyFont: 'Plus Jakarta Sans',
    badge: 'High Impact',
    description: 'Dense, muscular headline punch paired with refined precision body'
  }
];

export const FontSwitcher: React.FC = () => {
  const [currentFont, setCurrentFont] = useState<string>(() => {
    return localStorage.getItem('qevoratech_font_style') || 'syne-jakarta';
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-font-style', currentFont);
    localStorage.setItem('qevoratech_font_style', currentFont);
  }, [currentFont]);

  const activeOption = FONT_OPTIONS.find((f) => f.id === currentFont) || FONT_OPTIONS[0];

  return (
    <div className="relative inline-block text-left z-30">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A2552]/85 hover:bg-[#0E316B] border border-[#16366B] hover:border-[#38BDF8]/60 text-xs font-mono text-[#E2E8F0] shadow-sm backdrop-blur-md transition-all cursor-pointer group"
        title="Change Typography / Font Style"
        aria-expanded={isOpen}
      >
        <Type className="w-3.5 h-3.5 text-[#38BDF8] group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline text-[#94A3B8]">Font:</span>
        <span className="text-[#38BDF8] font-bold">{activeOption.name}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop click dismiss */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#0A2552]/95 border border-[#16366B] shadow-2xl backdrop-blur-xl z-50 p-3 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-2 border-b border-[#16366B] mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span className="font-mono text-xs text-white font-bold uppercase tracking-wider">
                  Recommended Font Styles
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#94A3B8]">Live Preview</span>
            </div>

            <div className="flex flex-col gap-1.5 max-h-[380px] overflow-y-auto">
              {FONT_OPTIONS.map((option) => {
                const isSelected = option.id === currentFont;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setCurrentFont(option.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#071E42] border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                        : 'bg-[#0A2552] border-transparent hover:border-[#16366B] hover:bg-[#071E42]/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white tracking-tight">
                          {option.name}
                        </span>
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${
                            isSelected
                              ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8]'
                              : 'bg-[#16366B] border-transparent text-[#94A3B8]'
                          }`}
                        >
                          {option.badge}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#38BDF8]" />}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#93C5FD] mb-1">
                      <span>Headings: {option.displayFont}</span>
                      <span className="text-[#64748B]">•</span>
                      <span>Body: {option.bodyFont}</span>
                    </div>

                    <p className="text-[11px] text-[#E2E8F0]/70 font-sans leading-snug">
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
