import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  Download,
  Copy,
  ExternalLink,
  Plus,
  RefreshCw,
  CheckCircle2,
  Settings,
  Search,
  Check,
  Sparkles,
  Link2
} from 'lucide-react';
import { GoogleSheetSubmission } from '../types';
import {
  getSavedSubmissions,
  saveSubmissionToSheet,
  exportToCsv,
  copyForGoogleSheetsPaste,
  getGoogleSheetWebhookUrl,
  setGoogleSheetWebhookUrl
} from '../utils/googleSheetService';

interface GoogleSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmissionSuccess?: (sub: GoogleSheetSubmission) => void;
}

export const GoogleSheetModal: React.FC<GoogleSheetModalProps> = ({
  isOpen,
  onClose,
  onSubmissionSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'sheet' | 'add' | 'settings'>('sheet');
  const [submissions, setSubmissions] = useState<GoogleSheetSubmission[]>(() => getSavedSubmissions());
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState(() => getGoogleSheetWebhookUrl());
  const [webhookSaved, setWebhookSaved] = useState(false);

  // Form fields for direct Google Sheet row insertion
  const [newRow, setNewRow] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    service: 'Web & Full-Stack Development',
    budget: '$1,000 – $3,000',
    timeline: 'Standard (3-4 weeks)',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [rowSuccess, setRowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRefresh = () => {
    setSubmissions(getSavedSubmissions());
  };

  const handleExportCsv = () => {
    exportToCsv(submissions);
  };

  const handleCopyTsv = async () => {
    const ok = await copyForGoogleSheetsPaste(submissions);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    setGoogleSheetWebhookUrl(webhookUrl);
    setWebhookSaved(true);
    setTimeout(() => setWebhookSaved(false), 3000);
  };

  const handleDirectAddRow = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const created = await saveSubmissionToSheet(newRow);
      setSubmissions(getSavedSubmissions());
      setRowSuccess(true);
      if (onSubmissionSuccess) onSubmissionSuccess(created);
      setTimeout(() => {
        setRowSuccess(false);
        setNewRow({
          fullName: '',
          companyName: '',
          email: '',
          phone: '',
          service: 'Web & Full-Stack Development',
          budget: '$1,000 – $3,000',
          timeline: 'Standard (3-4 weeks)',
          description: ''
        });
        setActiveTab('sheet');
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredSubmissions = submissions.filter(s => {
    const q = searchQuery.toLowerCase();
    return (
      s.fullName.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.service.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q) ||
      (s.companyName && s.companyName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#020A18]/85 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-[#0A2552] border border-[#16366B] rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#071E42] border-b border-[#16366B] flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F9D58]/20 border border-[#0F9D58]/40 text-[#34A853] flex items-center justify-center shadow-[0_0_15px_rgba(52,168,83,0.3)]">
              <FileSpreadsheet className="w-5 h-5 text-[#34A853]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="sheet-modal-title" className="font-display text-lg font-bold text-white tracking-tight">
                  QevoraTech Google Sheet Sync
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#0F9D58]/20 text-[#34A853] border border-[#0F9D58]/40">
                  LIVE SPREADSHEET
                </span>
              </div>
              <p className="text-xs text-[#E2E8F0]/70 font-normal">
                Real-time client booking log connected directly to Google Sheets
              </p>
            </div>
          </div>

          {/* Top Actions & Close */}
          <div className="flex items-center gap-2">
            <a
              href="https://sheets.new"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#071E42] hover:bg-[#16366B] text-white hover:text-[#38BDF8] border border-[#16366B] rounded-lg text-xs font-semibold transition-colors"
              title="Open empty spreadsheet in Google Sheets"
            >
              <span>Open Google Sheets</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#38BDF8]" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#94A3B8] hover:text-white hover:bg-[#071E42] rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 bg-[#071E42]/60 border-b border-[#16366B] flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('sheet')}
              className={`py-3 px-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'sheet'
                  ? 'border-[#38BDF8] text-[#38BDF8]'
                  : 'border-transparent text-[#94A3B8] hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Spreadsheet Records ({submissions.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('add')}
              className={`py-3 px-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'add'
                  ? 'border-[#38BDF8] text-[#38BDF8]'
                  : 'border-transparent text-[#94A3B8] hover:text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>Add Client Entry</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`py-3 px-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'settings'
                  ? 'border-[#38BDF8] text-[#38BDF8]'
                  : 'border-transparent text-[#94A3B8] hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Sheet Webhook Setup</span>
            </button>
          </div>

          {activeTab === 'sheet' && (
            <div className="flex items-center gap-2 py-2">
              <button
                type="button"
                onClick={handleCopyTsv}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#071E42] hover:bg-[#16366B] text-white border border-[#16366B] rounded-lg text-xs font-semibold transition-colors"
                title="Copy all records formatted for instant paste into Google Sheets"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#34A853]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied for Sheet!' : 'Copy for Google Sheets'}</span>
              </button>

              <button
                type="button"
                onClick={handleExportCsv}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#38BDF8] text-[#071E42] rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                type="button"
                onClick={handleRefresh}
                className="p-1.5 text-[#94A3B8] hover:text-white hover:bg-[#071E42] rounded-lg transition-colors"
                title="Refresh Records"
                aria-label="Refresh records"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: SPREADSHEET VIEW */}
          {activeTab === 'sheet' && (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="text"
                    placeholder="Search by client name, email, booking code, or service..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[#071E42] border border-[#16366B] rounded-lg text-xs text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
                <div className="text-xs font-mono text-[#94A3B8]">
                  Showing <strong className="text-white">{filteredSubmissions.length}</strong> of{' '}
                  <strong className="text-white">{submissions.length}</strong> entries
                </div>
              </div>

              {/* Styled Google Sheet Table */}
              <div className="border border-[#16366B] rounded-xl overflow-hidden bg-[#071E42]/80 shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#03132B] border-b border-[#16366B] text-[10px] font-mono uppercase text-[#94A3B8] tracking-wider">
                        <th className="py-3 px-4 font-bold border-r border-[#16366B]/60">Timestamp</th>
                        <th className="py-3 px-4 font-bold border-r border-[#16366B]/60">Booking ID</th>
                        <th className="py-3 px-4 font-bold border-r border-[#16366B]/60">Client &amp; Company</th>
                        <th className="py-3 px-4 font-bold border-r border-[#16366B]/60">Contact Details</th>
                        <th className="py-3 px-4 font-bold border-r border-[#16366B]/60">Service &amp; Budget</th>
                        <th className="py-3 px-4 font-bold border-r border-[#16366B]/60">Project Notes</th>
                        <th className="py-3 px-4 font-bold text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#16366B]/50 font-sans">
                      {filteredSubmissions.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-10 text-xs text-[#94A3B8]">
                            No matching client records found. Submit the booking form or click "Add Client Entry" to create a row.
                          </td>
                        </tr>
                      ) : (
                        filteredSubmissions.map((row, idx) => (
                          <tr
                            key={row.id || idx}
                            className="hover:bg-[#0A2552]/80 transition-colors group"
                          >
                            <td className="py-3 px-4 font-mono text-[11px] text-[#94A3B8] whitespace-nowrap border-r border-[#16366B]/40">
                              {row.timestamp}
                            </td>
                            <td className="py-3 px-4 font-mono text-xs font-bold text-[#38BDF8] whitespace-nowrap border-r border-[#16366B]/40">
                              {row.id}
                            </td>
                            <td className="py-3 px-4 border-r border-[#16366B]/40">
                              <div className="font-bold text-white">{row.fullName}</div>
                              {row.companyName && (
                                <div className="text-[11px] text-[#93C5FD] font-normal">{row.companyName}</div>
                              )}
                            </td>
                            <td className="py-3 px-4 border-r border-[#16366B]/40">
                              <a
                                href={`mailto:${row.email}`}
                                className="text-[#38BDF8] hover:underline block truncate max-w-[170px]"
                              >
                                {row.email}
                              </a>
                              <div className="text-[11px] text-[#94A3B8] font-mono">{row.phone}</div>
                            </td>
                            <td className="py-3 px-4 border-r border-[#16366B]/40">
                              <div className="text-white font-medium">{row.service}</div>
                              <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-[#0A2552] text-[10px] font-mono text-[#93C5FD] border border-[#16366B]">
                                {row.budget}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-[#E2E8F0]/80 max-w-[220px] truncate border-r border-[#16366B]/40 font-normal">
                              {row.description}
                            </td>
                            <td className="py-3 px-4 text-center whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                                  row.status === 'Booked'
                                    ? 'bg-[#0F9D58]/20 text-[#34A853] border border-[#0F9D58]/40'
                                    : row.status === 'In Review'
                                    ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40'
                                    : 'bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/40'
                                }`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tip info */}
              <div className="p-4 bg-[#071E42] border border-[#16366B] rounded-xl flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-xs text-[#E2E8F0]/80">
                  <Sparkles className="w-4 h-4 text-[#38BDF8] flex-shrink-0" />
                  <span>
                    Whenever a client submits the <strong>Book Us</strong> form on this website, their information is registered directly into this Google Sheet format and synced.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="mailto:qevoratechnologies@gmail.com"
                    className="text-xs text-[#38BDF8] hover:underline font-mono"
                  >
                    qevoratechnologies@gmail.com
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DIRECT ADD ENTRY FORM */}
          {activeTab === 'add' && (
            <div className="max-w-2xl mx-auto py-2">
              <div className="text-center mb-6">
                <h4 className="font-display text-xl font-bold text-white tracking-tight">
                  Add Entry Direct to Google Sheet
                </h4>
                <p className="text-xs text-[#E2E8F0]/80 mt-1 font-normal">
                  Manually log client consultation details or custom intake into the Google Sheet registry.
                </p>
              </div>

              {rowSuccess ? (
                <div className="p-8 bg-[#071E42] border border-[#34A853]/50 rounded-2xl text-center animate-fadeIn">
                  <CheckCircle2 className="w-12 h-12 text-[#34A853] mx-auto mb-3" />
                  <h5 className="text-lg font-bold text-white">Row Added to Google Sheet!</h5>
                  <p className="text-xs text-[#E2E8F0]/80 mt-1">
                    The client information has been recorded into the live spreadsheet registry.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDirectAddRow} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#E2E8F0]/80 tracking-wider mb-1 font-bold">
                        Client Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Jordan Smith"
                        value={newRow.fullName}
                        onChange={e => setNewRow({ ...newRow, fullName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#071E42] border border-[#16366B] rounded-lg text-xs text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#38BDF8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#E2E8F0]/80 tracking-wider mb-1 font-bold">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Acme Innovations"
                        value={newRow.companyName}
                        onChange={e => setNewRow({ ...newRow, companyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#071E42] border border-[#16366B] rounded-lg text-xs text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#38BDF8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#E2E8F0]/80 tracking-wider mb-1 font-bold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jordan@company.com"
                        value={newRow.email}
                        onChange={e => setNewRow({ ...newRow, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#071E42] border border-[#16366B] rounded-lg text-xs text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#38BDF8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#E2E8F0]/80 tracking-wider mb-1 font-bold">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 234-5678"
                        value={newRow.phone}
                        onChange={e => setNewRow({ ...newRow, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#071E42] border border-[#16366B] rounded-lg text-xs text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#38BDF8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#E2E8F0]/80 tracking-wider mb-1 font-bold">
                        Service Category *
                      </label>
                      <select
                        value={newRow.service}
                        onChange={e => setNewRow({ ...newRow, service: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#071E42] border border-[#16366B] rounded-lg text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                      >
                        <option value="Web & Full-Stack Development">Web & Full-Stack Development</option>
                        <option value="Mobile Application (iOS / Android)">Mobile Application (iOS / Android)</option>
                        <option value="AI & Automation Engineering">AI & Automation Engineering</option>
                        <option value="Cloud & DevOps Infrastructure">Cloud & DevOps Infrastructure</option>
                        <option value="E-Commerce & Marketplace Scaling (Amazon/Etsy)">E-Commerce & Marketplace Scaling (Amazon/Etsy)</option>
                        <option value="UI/UX Product Design & Branding">UI/UX Product Design & Branding</option>
                        <option value="Digital Growth & Performance Marketing">Digital Growth & Performance Marketing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase text-[#E2E8F0]/80 tracking-wider mb-1 font-bold">
                        Budget Bracket *
                      </label>
                      <select
                        value={newRow.budget}
                        onChange={e => setNewRow({ ...newRow, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#071E42] border border-[#16366B] rounded-lg text-xs text-white focus:outline-none focus:border-[#38BDF8]"
                      >
                        <option value="Under $500">Under $500</option>
                        <option value="$500 – $1,000">$500 – $1,000</option>
                        <option value="$1,000 – $3,000">$1,000 – $3,000</option>
                        <option value="$3,000 – $5,000">$3,000 – $5,000</option>
                        <option value="$5,000+">$5,000+</option>
                        <option value="Scope Assessment Needed">Scope Assessment Needed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-[#E2E8F0]/80 tracking-wider mb-1 font-bold">
                      Project Notes &amp; Specifications *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Brief details about the project requirements, milestones, or timeline..."
                      value={newRow.description}
                      onChange={e => setNewRow({ ...newRow, description: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#071E42] border border-[#16366B] rounded-lg text-xs text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#38BDF8] resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-6 bg-white hover:bg-[#38BDF8] text-[#071E42] rounded-xl text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{submitting ? 'Adding Row...' : 'Append Row to Google Sheet'}</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: WEBHOOK SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto py-2 space-y-6">
              <div className="text-center mb-6">
                <h4 className="font-display text-xl font-bold text-white tracking-tight">
                  Google Sheet Webhook &amp; Form Integration
                </h4>
                <p className="text-xs text-[#E2E8F0]/80 mt-1 font-normal">
                  Connect any live Google Sheet using a Google Apps Script Web App URL or Form Webhook.
                </p>
              </div>

              <form onSubmit={handleSaveWebhook} className="space-y-4 p-6 bg-[#071E42] border border-[#16366B] rounded-xl">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-[#38BDF8] tracking-wider mb-2 font-bold flex items-center gap-2">
                    <Link2 className="w-3.5 h-3.5" />
                    <span>Google Apps Script / Webhook Endpoint URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/.../exec"
                    value={webhookUrl}
                    onChange={e => setWebhookUrl(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0A2552] border border-[#16366B] rounded-lg text-xs text-white placeholder:text-[#94A3B8] focus:outline-none focus:border-[#38BDF8] font-mono"
                  />
                  <p className="text-[11px] text-[#94A3B8] mt-1.5">
                    Whenever a user submits the "Book Us" form, a payload containing all form fields is dispatched via POST to this URL.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {webhookSaved && (
                    <span className="text-xs text-[#34A853] flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      Webhook URL saved successfully!
                    </span>
                  )}
                  <div className="ml-auto">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#38BDF8] hover:bg-white text-[#071E42] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                    >
                      Save Webhook Configuration
                    </button>
                  </div>
                </div>
              </form>

              {/* Instructions Guide */}
              <div className="p-6 bg-[#071E42] border border-[#16366B] rounded-xl text-xs space-y-3">
                <h5 className="font-bold text-white text-sm">How to connect with Google Sheets in 3 steps:</h5>
                <ol className="list-decimal list-inside space-y-2 text-[#E2E8F0]/80 font-normal leading-relaxed">
                  <li>
                    Open a new Google Sheet at <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-[#38BDF8] underline">sheets.new</a> with headers (Timestamp, ID, Name, Email, Phone, Service, Budget, Notes).
                  </li>
                  <li>
                    Go to <strong>Extensions &gt; Apps Script</strong> in Google Sheets and create an HTTP `doPost(e)` listener that appends rows to `SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()`.
                  </li>
                  <li>
                    Click <strong>Deploy &gt; New Deployment &gt; Web App</strong>, set access to <em>Anyone</em>, and paste the generated URL above.
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
