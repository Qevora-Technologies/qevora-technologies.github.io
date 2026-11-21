import React, { useState, useMemo } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, X, ShieldCheck, Clock } from 'lucide-react';

interface ProjectCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyEstimate: (estimateSummary: {
    service: string;
    budgetRange: string;
    scope: string;
    timeline: string;
    addons: string[];
  }) => void;
}

interface ProjectTier {
  id: string;
  name: string;
  baseCost: number;
  baseWeeks: number;
  description: string;
}

const PROJECT_TYPES: { id: string; name: string; multiplier: number; defaultService: string }[] = [
  { id: 'web', name: 'Web Application / Portal', multiplier: 1.0, defaultService: 'Web Development' },
  { id: 'mobile', name: 'Mobile App (iOS & Android)', multiplier: 1.35, defaultService: 'Mobile App Development' },
  { id: 'ai', name: 'AI System / LLM Integration', multiplier: 1.25, defaultService: 'Digital Marketing' },
  { id: 'cloud', name: 'AWS Cloud / DevOps Infrastructure', multiplier: 1.15, defaultService: 'AWS / Cloud Services' },
  { id: 'ecommerce', name: 'E-Commerce / Etsy & eBay Scale', multiplier: 0.9, defaultService: 'Etsy Account Management' },
  { id: 'branding', name: 'Branding & Video Production', multiplier: 0.75, defaultService: 'Graphic Designing' },
];

const TIERS: ProjectTier[] = [
  { id: 'starter', name: 'Starter MVP', baseCost: 850, baseWeeks: 2, description: 'Essential core features, clean UI, rapid turnaround' },
  { id: 'growth', name: 'Growth Business', baseCost: 2200, baseWeeks: 4, description: 'Advanced workflows, high concurrency, custom integrations' },
  { id: 'enterprise', name: 'Enterprise Custom', baseCost: 4800, baseWeeks: 8, description: 'High-availability architecture, multi-role security, custom SLA' }
];

const ADDONS = [
  { id: 'cicd', name: 'Automated CI/CD & Cloud Pipeline', cost: 400 },
  { id: 'seo', name: 'Full SEO & Metadata Architecture', cost: 350 },
  { id: 'support', name: '3-Month Post-Launch 24/7 SLA', cost: 600 },
  { id: 'ai_bot', name: 'Integrated AI Helpdesk Assistant', cost: 450 }
];

export const ProjectCalculator: React.FC<ProjectCalculatorProps> = ({
  isOpen,
  onClose,
  onApplyEstimate
}) => {
  const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0].id);
  const [selectedTier, setSelectedTier] = useState(TIERS[1].id);
  const [isRush, setIsRush] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['cicd']);

  const calculation = useMemo(() => {
    const pType = PROJECT_TYPES.find(p => p.id === selectedType) || PROJECT_TYPES[0];
    const pTier = TIERS.find(t => t.id === selectedTier) || TIERS[1];

    let cost = pTier.baseCost * pType.multiplier;
    let weeks = pTier.baseWeeks;

    selectedAddons.forEach(addonId => {
      const addon = ADDONS.find(a => a.id === addonId);
      if (addon) cost += addon.cost;
    });

    if (isRush) {
      cost *= 1.2;
      weeks = Math.max(1, Math.round(weeks * 0.65));
    }

    const minCost = Math.round(cost * 0.9);
    const maxCost = Math.round(cost * 1.15);

    let budgetBracket = '$1,000 – $3,000';
    if (maxCost < 1000) budgetBracket = '$500 – $1,000';
    else if (minCost >= 3000 && maxCost <= 5000) budgetBracket = '$3,000 – $5,000';
    else if (minCost > 5000) budgetBracket = '$5,000+';

    return {
      minCost,
      maxCost,
      weeks,
      budgetBracket,
      defaultService: pType.defaultService,
      scopeName: pTier.name
    };
  }, [selectedType, selectedTier, isRush, selectedAddons]);

  if (!isOpen) return null;

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    const pType = PROJECT_TYPES.find(p => p.id === selectedType);
    const pTier = TIERS.find(t => t.id === selectedTier);

    onApplyEstimate({
      service: pType ? pType.defaultService : 'Web Development',
      budgetRange: calculation.budgetBracket,
      scope: pTier ? pTier.name : 'Growth Business',
      timeline: `${calculation.weeks} weeks ${isRush ? '(Expedited)' : ''}`,
      addons: selectedAddons.map(id => ADDONS.find(a => a.id === id)?.name || id)
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#111111] border border-[#2A2A2A] shadow-2xl p-6 sm:p-8 my-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#222222] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1A1A1A] text-[#C4A484] border border-[#2A2A2A] flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-[#E0DCD5] tracking-tight">
                Interactive Project Estimator
              </h3>
              <p className="text-xs text-[#E0DCD5]/60 font-normal">
                Configure your project requirements to calculate estimated investment &amp; delivery timeline.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#E0DCD5]/60 hover:text-white hover:bg-[#1A1A1A] transition-colors border border-transparent hover:border-[#2A2A2A]"
            aria-label="Close Estimator"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Project Type */}
        <div className="mb-6">
          <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#C4A484] mb-2">
            1. Select Project Domain
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PROJECT_TYPES.map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() => setSelectedType(type.id)}
                className={`p-3 text-left text-xs font-medium transition-all border ${
                  selectedType === type.id
                    ? 'bg-[#1C1712] border-[#C4A484] text-[#E0DCD5] shadow-md'
                    : 'bg-[#141414] border-[#262626] text-[#E0DCD5]/70 hover:border-[#333333]'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Scope & Tier */}
        <div className="mb-6">
          <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#C4A484] mb-2">
            2. Choose Scope &amp; Scale
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TIERS.map(tier => (
              <button
                key={tier.id}
                type="button"
                onClick={() => setSelectedTier(tier.id)}
                className={`p-3.5 text-left transition-all border flex flex-col justify-between ${
                  selectedTier === tier.id
                    ? 'bg-[#1C1712] border-[#C4A484] text-[#E0DCD5] shadow-md'
                    : 'bg-[#141414] border-[#262626] text-[#E0DCD5]/70 hover:border-[#333333]'
                }`}
              >
                <div>
                  <div className="text-xs font-serif font-bold text-[#E0DCD5] mb-1">{tier.name}</div>
                  <div className="text-[11px] text-[#E0DCD5]/60 font-light leading-snug">{tier.description}</div>
                </div>
                <div className="text-[10px] font-mono text-[#C4A484] uppercase tracking-wider mt-2">
                  ~{tier.baseWeeks} weeks delivery
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Add-ons & Accelerators */}
        <div className="mb-6">
          <label className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#C4A484] mb-2">
            3. Recommended Engineering Add-ons
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ADDONS.map(addon => {
              const isChecked = selectedAddons.includes(addon.id);
              return (
                <button
                  key={addon.id}
                  type="button"
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-3 text-left text-xs transition-all border flex items-center justify-between ${
                    isChecked
                      ? 'bg-[#1C1712] border-[#C4A484] text-[#E0DCD5]'
                      : 'bg-[#141414] border-[#262626] text-[#E0DCD5]/60 hover:text-[#E0DCD5]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3.5 h-3.5 flex items-center justify-center ${
                      isChecked ? 'bg-[#C4A484] text-black font-bold' : 'border border-[#333333]'
                    }`}>
                      {isChecked && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span>{addon.name}</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#C4A484]">+${addon.cost}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Expedited Delivery Toggle */}
        <div className="flex items-center justify-between p-3.5 bg-[#141414] border border-[#262626] mb-6">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#C4A484]" />
            <div>
              <div className="text-xs font-display font-bold text-[#E0DCD5] tracking-tight">Expedited Delivery (Rush Sprint)</div>
              <div className="text-[11px] text-[#E0DCD5]/60 font-normal">Accelerates delivery by ~35% with dedicated overtime sprint engineers</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsRush(!isRush)}
            className={`w-10 h-5.5 rounded-full p-0.5 transition-colors ${
              isRush ? 'bg-[#C4A484]' : 'bg-[#262626]'
            }`}
          >
            <div className={`w-4.5 h-4.5 rounded-full bg-black transition-transform ${
              isRush ? 'translate-x-4.5 bg-[#0A0A0A]' : 'translate-x-0 bg-white/70'
            }`} />
          </button>
        </div>

        {/* Calculated Output Banner */}
        <div className="p-5 bg-[#161616] border border-[#2A2A2A] mb-6 glow-card">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="border-r border-[#2A2A2A] pr-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#E0DCD5]/50">Estimated Investment</div>
              <div className="font-display text-xl sm:text-2xl font-bold text-[#C4A484] mt-0.5 tracking-tight">
                ${calculation.minCost.toLocaleString()} – ${calculation.maxCost.toLocaleString()}
              </div>
              <div className="text-[10px] text-[#E0DCD5]/50 font-mono uppercase tracking-wider mt-0.5">Fixed Milestone Pricing</div>
            </div>
            <div className="pl-2">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#E0DCD5]/50">Target Timeline</div>
              <div className="font-display text-xl sm:text-2xl font-bold text-[#E0DCD5] mt-0.5 tracking-tight">
                {calculation.weeks} {calculation.weeks === 1 ? 'Week' : 'Weeks'}
              </div>
              <div className="text-[10px] text-[#E0DCD5]/50 font-mono uppercase tracking-wider mt-0.5">Iterative Sprint Delivery</div>
            </div>
          </div>
        </div>

        {/* Apply CTA */}
        <button
          type="button"
          onClick={handleApply}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#C4A484] hover:bg-[#D4BFA7] text-xs uppercase tracking-widest font-semibold text-[#0A0A0A] transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Apply Estimate &amp; Pre-fill Booking Form</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
