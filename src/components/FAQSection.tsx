import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/agencyData';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-transparent relative border-t border-[#16366B]/50 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-radial from-[#38BDF8]/10 via-transparent to-transparent blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#E2E8F0]/80 max-w-2xl font-normal">
            Everything you need to know about our engagement models, warranties, sprint cycles, and technologies.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0A2552] border-[#38BDF8]/60 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                    : 'bg-[#071E42] border-[#16366B] hover:border-[#38BDF8]/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#38BDF8] bg-[#071E42] px-2.5 py-1 rounded border border-[#16366B] font-bold">
                      {item.category}
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#94A3B8] transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#38BDF8]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#E2E8F0]/80 font-normal leading-relaxed border-t border-[#16366B] animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Note */}
        <div className="mt-10 p-6 bg-[#0A2552] border border-[#16366B] rounded-2xl text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-[#020A18]/40">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#071E42] text-[#38BDF8] border border-[#16366B] flex items-center justify-center flex-shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-display font-bold text-white">Have a specific custom requirement?</h4>
              <p className="text-xs text-[#E2E8F0]/70 font-normal">Speak directly with our technical leads for an immediate feasibility check.</p>
            </div>
          </div>
          <a
            href="#book"
            className="px-5 py-2.5 bg-white hover:bg-[#38BDF8] text-xs uppercase tracking-widest font-bold text-[#071E42] rounded-lg border border-white transition-colors whitespace-nowrap inline-flex items-center gap-1.5 shadow-md"
          >
            <span>Book A Call</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

