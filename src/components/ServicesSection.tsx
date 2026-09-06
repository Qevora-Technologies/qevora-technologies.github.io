import React, { useState, useMemo } from 'react';
import { SERVICES_DATA } from '../data/agencyData';
import { ServiceCategory } from '../types';
import {
  Cpu,
  Cloud,
  Database,
  Network,
  Layout,
  Server,
  Smartphone,
  Globe,
  TrendingUp,
  Share2,
  ShoppingBag,
  Store,
  Package,
  Palette,
  Film,
  Headphones,
  Search,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const categories: { key: ServiceCategory; label: string; count: number }[] = [
    { key: 'all', label: 'All Services', count: SERVICES_DATA.length },
    { key: 'ai_cloud', label: 'AI & Cloud Infrastructure', count: SERVICES_DATA.filter(s => s.category === 'ai_cloud').length },
    { key: 'development', label: 'Web & Mobile Apps', count: SERVICES_DATA.filter(s => s.category === 'development').length },
    { key: 'ecommerce', label: 'E-Commerce & Marketplaces', count: SERVICES_DATA.filter(s => s.category === 'ecommerce').length },
    { key: 'creative', label: 'Creative Design & Branding', count: SERVICES_DATA.filter(s => s.category === 'creative').length },
  ];

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter(service => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.techStack.some(t => t.toLowerCase().includes(query)) ||
        service.deliverables.some(d => d.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const renderIcon = (iconName: string) => {
    const iconProps = { className: 'w-6 h-6' };
    switch (iconName) {
      case 'Cpu': return <Cpu {...iconProps} />;
      case 'Cloud': return <Cloud {...iconProps} />;
      case 'Database': return <Database {...iconProps} />;
      case 'Network': return <Network {...iconProps} />;
      case 'Layout': return <Layout {...iconProps} />;
      case 'Server': return <Server {...iconProps} />;
      case 'Smartphone': return <Smartphone {...iconProps} />;
      case 'Globe': return <Globe {...iconProps} />;
      case 'TrendingUp': return <TrendingUp {...iconProps} />;
      case 'Share2': return <Share2 {...iconProps} />;
      case 'ShoppingBag': return <ShoppingBag {...iconProps} />;
      case 'Store': return <Store {...iconProps} />;
      case 'Package': return <Package {...iconProps} />;
      case 'Palette': return <Palette {...iconProps} />;
      case 'Film': return <Film {...iconProps} />;
      case 'Headphones': return <Headphones {...iconProps} />;
      default: return <Sparkles {...iconProps} />;
    }
  };

  return (
    <section id="services" className="py-24 bg-transparent relative border-t border-[#16366B]/50 overflow-hidden">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-radial from-[#38BDF8]/10 via-[#2563EB]/4 to-transparent blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-radial from-[#1D4ED8]/10 via-transparent to-transparent blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Specialized Engineering &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#38BDF8]">
              Digital Solutions
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#E2E8F0]/80 max-w-2xl font-normal">
            From custom AI automation and cloud systems to full-stack applications and high-growth e-commerce operations.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold whitespace-nowrap transition-all rounded-lg flex items-center gap-2 border ${
                  selectedCategory === cat.key
                    ? 'bg-white text-[#071E42] border-white shadow-md'
                    : 'bg-[#0A2552] text-[#E2E8F0]/80 hover:text-white hover:bg-[#0E316B] border-[#16366B]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  selectedCategory === cat.key ? 'bg-[#071E42]/20 text-[#071E42] font-bold' : 'bg-[#071E42] text-[#38BDF8]'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Filter services or tech..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0A2552] border border-[#16366B] rounded-lg focus:border-[#38BDF8] focus:outline-none text-xs text-white placeholder:text-[#94A3B8] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-[#0A2552] border border-[#16366B] rounded-xl">
            <p className="text-white font-normal text-base">No services found matching "{searchQuery}"</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 text-xs uppercase tracking-widest text-[#38BDF8] hover:underline font-bold"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => {
              const isExpanded = expandedServiceId === service.id;

              return (
                <div
                  key={service.id}
                  className="flex flex-col justify-between p-6 sm:p-7 bg-[#0A2552] border border-[#16366B] hover:border-[#38BDF8]/60 glow-card-hover rounded-xl transition-all duration-300 group hover:-translate-y-1 relative shadow-lg shadow-[#020A18]/40"
                >
                  {service.popular && (
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#071E42] border border-[#38BDF8]/40 text-[#38BDF8] rounded-full text-[10px] font-mono uppercase font-bold shadow-sm">
                      <Sparkles className="w-2.5 h-2.5" />
                      Popular
                    </div>
                  )}

                  <div>
                    {/* Icon */}
                    <div className="w-12 h-12 bg-[#071E42] text-[#38BDF8] border border-[#16366B] rounded-lg flex items-center justify-center mb-5 group-hover:scale-105 group-hover:border-[#38BDF8] group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300">
                      {renderIcon(service.iconName)}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors tracking-tight">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#E2E8F0]/75 font-normal leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.techStack.map(tech => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 bg-[#071E42] text-[10px] font-mono text-[#93C5FD] border border-[#16366B] rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Deliverables Accordion */}
                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                        className="text-xs font-mono text-[#38BDF8] hover:underline flex items-center gap-1 uppercase tracking-wider font-semibold"
                      >
                        <span>{isExpanded ? 'Hide Key Deliverables ▲' : 'View Key Deliverables ▼'}</span>
                      </button>

                      {isExpanded && (
                        <div className="mt-3 p-3.5 bg-[#071E42] border border-[#16366B] rounded-lg flex flex-col gap-1.5 animate-fadeIn">
                          {service.deliverables.map((item, dIdx) => (
                            <div key={dIdx} className="flex items-center gap-2 text-xs text-[#E2E8F0] font-normal">
                              <CheckCircle className="w-3.5 h-3.5 text-[#38BDF8] flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 border-t border-[#16366B] flex items-center justify-between">
                    <span className="text-[11px] text-[#94A3B8] font-mono uppercase tracking-wider">
                      Specialist Led
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectServiceForBooking(service.title)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-bold text-white hover:text-[#38BDF8] transition-colors group-hover:translate-x-1 duration-200"
                    >
                      <span>Book This Service</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

