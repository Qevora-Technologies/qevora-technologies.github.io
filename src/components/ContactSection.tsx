import React, { useState } from 'react';
import {
  Mail,
  Instagram,
  Facebook,
  ExternalLink,
  Sparkles,
  Calendar,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  ArrowRight,
  FileSpreadsheet
} from 'lucide-react';
import { COMPANY_CONTACT } from '../data/agencyData';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(COMPANY_CONTACT.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="contact"
      className="py-24 bg-transparent relative border-t border-[#16366B]/50 overflow-hidden scroll-mt-20"
    >
      {/* Target anchor for Book Us buttons */}
      <div id="book" className="absolute -top-24" />

      {/* Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-radial from-[#38BDF8]/12 via-[#2563EB]/5 to-transparent blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Section Headline */}
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 max-w-3xl mx-auto">
          Ready to Bring Your Vision to Life?
        </h2>

        {/* Subtitle */}
        <p className="text-[#E2E8F0]/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          Submit your project requirements through our official intake form. Every submission syncs directly into our Google Sheets pipeline and alerts our team at{' '}
          <span className="text-[#38BDF8] font-semibold">{COMPANY_CONTACT.email}</span>.
        </p>

        {/* The Two Primary Action Buttons: "Book Us" and "Book Us Today" */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {/* Button 1: Book Us */}
          <a
            href={COMPANY_CONTACT.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-book-us-primary"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-bold text-white bg-[#0A2552] hover:bg-[#0E316B] border border-[#16366B] hover:border-[#38BDF8] shadow-lg hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] transition-all duration-200 cursor-pointer group"
          >
            <Calendar className="w-4 h-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
            <span>Book Us</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#38BDF8] transition-colors" />
          </a>

          {/* Button 2: Book Us Today */}
          <a
            href={COMPANY_CONTACT.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-book-us-today-primary"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full text-xs uppercase tracking-widest font-bold text-[#071E42] bg-white hover:bg-[#38BDF8] hover:text-[#071E42] shadow-[0_0_30px_rgba(56,189,248,0.35)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] transition-all duration-200 active:scale-95 cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-[#071E42] group-hover:rotate-12 transition-transform" />
            <span>Book Us Today</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Sync Transparency Note */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A2552]/60 border border-[#16366B] text-[11px] font-mono text-[#94A3B8] mb-16">
          <FileSpreadsheet className="w-3.5 h-3.5 text-[#34A853]" />
          <span>Connected to Google Forms &amp; Sheets intake form</span>
        </div>

        {/* Channels & Official Company Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Email Channel Card */}
          <div className="p-6 rounded-2xl bg-[#0A2552]/80 border border-[#16366B] hover:border-[#38BDF8]/40 shadow-xl backdrop-blur-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8] mb-4 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] mb-1">
                Company Email (Inquiries Sent Here)
              </div>
              <a
                href={`mailto:${COMPANY_CONTACT.email}`}
                className="text-sm sm:text-base font-bold text-white hover:text-[#38BDF8] transition-colors break-all block mb-2"
              >
                {COMPANY_CONTACT.email}
              </a>
              <p className="text-xs text-[#E2E8F0]/70 leading-relaxed mb-4">
                Send your RFPs, project scopes, or custom technical questions directly to our executive mailbox.
              </p>
            </div>

            <div className="pt-3 border-t border-[#16366B]/60 flex items-center justify-between">
              <a
                href={`mailto:${COMPANY_CONTACT.email}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#38BDF8] hover:text-[#7DD3FC]"
              >
                <span>Compose Mail</span>
                <ArrowRight className="w-3 h-3" />
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#071E42] border border-[#16366B] text-[11px] font-mono text-[#E2E8F0] hover:text-white hover:border-[#38BDF8] transition-all cursor-pointer"
                title="Copy Email Address"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-[#34A853]" /> : <Copy className="w-3 h-3 text-[#94A3B8]" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Instagram Account Card */}
          <div className="p-6 rounded-2xl bg-[#0A2552]/80 border border-[#16366B] hover:border-[#E1306C]/40 shadow-xl backdrop-blur-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#E1306C]/10 border border-[#E1306C]/30 flex items-center justify-center text-[#E1306C] mb-4 group-hover:scale-105 transition-transform">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] mb-1">
                Instagram Official
              </div>
              <a
                href={COMPANY_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-white hover:text-[#E1306C] transition-colors block mb-2"
              >
                @qevoratechnologies
              </a>
              <p className="text-xs text-[#E2E8F0]/70 leading-relaxed mb-4">
                Follow our official feed for case studies, product teardowns, design prototypes, and engineering insights.
              </p>
            </div>

            <div className="pt-3 border-t border-[#16366B]/60">
              <a
                href={COMPANY_CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#E1306C] hover:text-pink-300"
              >
                <span>View Instagram Page</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Facebook Account Card */}
          <div className="p-6 rounded-2xl bg-[#0A2552]/80 border border-[#16366B] hover:border-[#1877F2]/40 shadow-xl backdrop-blur-md transition-all flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/30 flex items-center justify-center text-[#1877F2] mb-4 group-hover:scale-105 transition-transform">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#94A3B8] mb-1">
                Facebook Official
              </div>
              <a
                href={COMPANY_CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-bold text-white hover:text-[#1877F2] transition-colors block mb-2"
              >
                Qevora Technologies
              </a>
              <p className="text-xs text-[#E2E8F0]/70 leading-relaxed mb-4">
                Connect with us on Facebook for company announcements, tech updates, and verified agency news.
              </p>
            </div>

            <div className="pt-3 border-t border-[#16366B]/60">
              <a
                href={COMPANY_CONTACT.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#1877F2] hover:text-blue-300"
              >
                <span>View Facebook Page</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Guarantees Strip */}
        <div className="mt-12 pt-8 border-t border-[#16366B]/60 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#38BDF8]" />
            <span>Under 24-Hour Discovery Response</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
            <span>Strict Client Confidentiality &amp; NDA</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#38BDF8]" />
            <span>Senior Full-Stack Talent Allocation</span>
          </div>
        </div>
      </div>
    </section>
  );
};
