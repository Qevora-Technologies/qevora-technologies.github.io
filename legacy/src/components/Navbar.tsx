import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Instagram, Facebook } from 'lucide-react';
import { Logo } from './Logo';
import { FontSwitcher } from './FontSwitcher';
import { COMPANY_CONTACT } from '../data/agencyData';

interface NavbarProps {
  onOpenBook: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBook }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Team', href: '#team' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Determine active section
      const sections = ['home', 'about', 'services', 'work', 'team', 'faq', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#071E42]/95 backdrop-blur-md border-b border-[#16366B] py-3.5 shadow-xl shadow-[#020A18]/50'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Official Brand Logo */}
        <a
          href="#home"
          id="nav-logo-link"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center group transition-transform hover:opacity-95"
          aria-label="QevoraTech Home"
        >
          <Logo size="sm" showTagline={true} />
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-links" className="hidden md:flex items-center gap-7 text-xs uppercase tracking-widest font-semibold" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                id={`nav-link-${link.href.replace('#', '')}`}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`transition-colors relative py-1 ${
                  isActive
                    ? 'text-[#38BDF8]'
                    : 'text-[#E2E8F0]/80 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons: Font Switcher, Instagram, Facebook & Book Us */}
        <div className="hidden sm:flex items-center gap-2.5">
          <FontSwitcher />

          <a
            href={COMPANY_CONTACT.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-instagram-btn"
            className="p-2 rounded-full text-white/80 hover:text-[#E1306C] hover:bg-[#0A2552] border border-transparent hover:border-[#16366B] transition-all"
            aria-label="QevoraTech Instagram"
            title="Follow us on Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>

          <a
            href={COMPANY_CONTACT.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-facebook-btn"
            className="p-2 rounded-full text-white/80 hover:text-[#1877F2] hover:bg-[#0A2552] border border-transparent hover:border-[#16366B] transition-all"
            aria-label="QevoraTech Facebook"
            title="Connect on Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>

          <button
            type="button"
            id="nav-book-btn"
            onClick={onOpenBook}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold text-[#071E42] bg-white hover:bg-[#38BDF8] hover:text-[#071E42] shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <span>Book Us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          id="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-[#38BDF8] focus:outline-none"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="md:hidden fixed inset-x-0 top-[60px] bg-[#071E42]/98 backdrop-blur-xl border-b border-[#16366B] p-6 flex flex-col gap-4 shadow-2xl transition-all"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                id={`mobile-link-${link.href.replace('#', '')}`}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-xs uppercase tracking-widest font-semibold py-2.5 px-3 transition-colors rounded ${
                  activeSection === link.href.replace('#', '')
                    ? 'bg-[#0E316B] text-[#38BDF8] border-l-4 border-[#38BDF8]'
                    : 'text-[#E2E8F0]/80 hover:bg-[#0A2552] hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#16366B] flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-mono text-[#94A3B8]">Typography Style:</span>
              <FontSwitcher />
            </div>

            <a
              href={COMPANY_CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#0A2552] hover:bg-[#E1306C]/20 border border-[#16366B]"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span>Follow @qevoratechnologies on Instagram</span>
            </a>

            <a
              href={COMPANY_CONTACT.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#0A2552] hover:bg-[#1877F2]/20 border border-[#16366B]"
            >
              <Facebook className="w-4 h-4 text-[#1877F2]" />
              <span>Connect on Facebook</span>
            </a>

            <button
              type="button"
              id="mobile-book-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBook();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs uppercase tracking-widest font-bold text-[#071E42] bg-white hover:bg-[#38BDF8] transition-colors shadow-lg cursor-pointer"
            >
              <span>Book Us Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

