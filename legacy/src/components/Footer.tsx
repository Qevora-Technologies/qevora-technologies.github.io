import React, { useState, useEffect } from 'react';
import { ArrowUp, CheckCircle2, ShieldCheck, Mail, Sparkles, Instagram, Facebook, ExternalLink } from 'lucide-react';
import { COMPANY_CONTACT } from '../data/agencyData';

interface FooterProps {
  onBookClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookClick, onOpenGoogleSheet }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020612]/75 backdrop-blur-sm text-[#E2E8F0]/80 text-sm border-t border-[#16366B]/50 pt-16 pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#16366B]">
          {/* Brand Col */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38BDF8] to-[#1D4ED8] flex items-center justify-center text-white font-mono text-xs font-black shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                |:
              </div>
              <span className="font-display font-black text-xl text-white tracking-tight">
                Qevora<span className="text-[#38BDF8]">Tech</span>
              </span>
            </a>
            <p className="text-xs text-[#E2E8F0]/80 font-normal max-w-sm leading-relaxed">
              Engineering high-performance web platforms, mobile apps, AI automation pipelines, and scalable e-commerce infrastructure for forward-thinking enterprises.
            </p>

            {/* Social & Google Sheet Link badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={COMPANY_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-instagram-btn"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0A2552] hover:bg-[#E1306C]/20 border border-[#16366B] hover:border-[#E1306C]/60 text-white rounded-lg text-xs font-semibold transition-all group"
                aria-label="QevoraTech Instagram"
              >
                <Instagram className="w-3.5 h-3.5 text-[#E1306C] group-hover:scale-110 transition-transform" />
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
              </a>

              <a
                href={COMPANY_CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-facebook-btn"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0A2552] hover:bg-[#1877F2]/20 border border-[#16366B] hover:border-[#1877F2]/60 text-white rounded-lg text-xs font-semibold transition-all group"
                aria-label="QevoraTech Facebook"
              >
                <Facebook className="w-3.5 h-3.5 text-[#1877F2] group-hover:scale-110 transition-transform" />
                <span>Facebook</span>
                <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
              </a>

              <a
                href={`mailto:${COMPANY_CONTACT.email}`}
                id="footer-email-btn"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0A2552] hover:bg-[#16366B] border border-[#16366B] hover:border-[#38BDF8]/40 text-white rounded-lg text-xs font-semibold transition-all"
                aria-label="Email QevoraTech"
              >
                <Mail className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Email Us</span>
              </a>
            </div>

            {/* Newsletter */}
            <div className="mt-2">
              <span className="text-[10px] font-mono uppercase text-[#38BDF8] tracking-[0.2em] block mb-2 font-bold">
                Tech Briefings &amp; Insights
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs text-[#38BDF8] bg-[#0A2552] p-2.5 rounded-lg border border-[#16366B]">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>You're subscribed to QevoraTech insights.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-[#071E42] border border-[#16366B] rounded-lg text-xs text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#38BDF8]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white hover:bg-[#38BDF8] text-[10px] font-mono uppercase tracking-widest font-bold text-[#071E42] rounded-lg transition-colors shadow-sm"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-xs font-normal text-[#E2E8F0]/80">
              <li><a href="#services" className="hover:text-[#38BDF8] transition-colors">Web &amp; Full-Stack Dev</a></li>
              <li><a href="#services" className="hover:text-[#38BDF8] transition-colors">Mobile App Development</a></li>
              <li><a href="#services" className="hover:text-[#38BDF8] transition-colors">AI &amp; Automation</a></li>
              <li><a href="#services" className="hover:text-[#38BDF8] transition-colors">Cloud &amp; DevOps Hosting</a></li>
              <li><a href="#services" className="hover:text-[#38BDF8] transition-colors">Amazon &amp; Etsy Scaling</a></li>
              <li><a href="#services" className="hover:text-[#38BDF8] transition-colors">UI/UX Design Systems</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-normal text-[#E2E8F0]/80">
              <li><a href="#about" className="hover:text-[#38BDF8] transition-colors">About QevoraTech</a></li>
              <li><a href="#work" className="hover:text-[#38BDF8] transition-colors">Portfolio &amp; Work</a></li>
              <li><a href="#team" className="hover:text-[#38BDF8] transition-colors">Specialist Team</a></li>
              <li><a href="#faq" className="hover:text-[#38BDF8] transition-colors">Client FAQ</a></li>
              <li><a href="#book" className="hover:text-[#38BDF8] transition-colors font-bold text-[#38BDF8]">Book Us</a></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <p className="text-xs text-[#E2E8F0]/80 font-normal mb-2">
              Airline Society, Lahore, Punjab, Pakistan
            </p>
            <a
              href={`mailto:${COMPANY_CONTACT.email}`}
              className="text-xs text-[#38BDF8] font-mono mb-4 block break-all hover:underline"
            >
              {COMPANY_CONTACT.email}
            </a>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={COMPANY_CONTACT.googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white hover:bg-[#38BDF8] text-[10px] uppercase tracking-wider text-[#071E42] font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm"
              >
                <span>Book Us</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={COMPANY_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#0A2552] hover:bg-[#E1306C]/20 text-[10px] uppercase tracking-wider text-white hover:text-pink-300 font-semibold rounded-lg border border-[#16366B] hover:border-[#E1306C]/60 transition-colors flex items-center gap-1"
              >
                <Instagram className="w-3 h-3 text-[#E1306C]" />
                <span>Instagram</span>
              </a>
              <a
                href={COMPANY_CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#0A2552] hover:bg-[#1877F2]/20 text-[10px] uppercase tracking-wider text-white hover:text-blue-300 font-semibold rounded-lg border border-[#16366B] hover:border-[#1877F2]/60 transition-colors flex items-center gap-1"
              >
                <Facebook className="w-3 h-3 text-[#1877F2]" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-normal text-[#94A3B8]">
          <p>© 2026 QevoraTech. Innovation Starts Here. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-[#94A3B8]">
            <span className="flex items-center gap-1.5 text-[#38BDF8]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Guaranteed SLA Delivery
            </span>
            <span>•</span>
            <span>Worldwide Service</span>
          </div>
        </div>
      </div>

      {/* Floating Back to Top */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-[#0A2552] hover:bg-[#38BDF8] text-white hover:text-[#071E42] border border-[#16366B] rounded-xl shadow-2xl transition-all duration-300 hover:-translate-y-1"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </footer>
  );
};
