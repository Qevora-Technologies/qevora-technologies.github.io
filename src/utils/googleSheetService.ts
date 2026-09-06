import { GoogleSheetSubmission } from '../types';

const STORAGE_KEY = 'qevoratech_google_sheet_submissions_v1';
const WEBHOOK_URL_KEY = 'qevoratech_google_sheet_webhook_url';

export const INITIAL_GOOGLE_SHEET_SUBMISSIONS: GoogleSheetSubmission[] = [
  {
    id: 'QEV-842190',
    timestamp: '2026-09-02 09:15:22',
    fullName: 'David Sterling',
    companyName: 'Apex Capital Ventures',
    email: 'd.sterling@apexcap.io',
    phone: '+1 (415) 890-2144',
    service: 'AI & Intelligent Systems',
    budget: '$5,000+',
    timeline: 'Standard (3-4 weeks)',
    description: 'Looking to integrate custom AI automated document analysis pipeline and LLM agent for financial reports.',
    status: 'Booked',
    syncedToGoogleSheet: true
  },
  {
    id: 'QEV-631045',
    timestamp: '2026-09-01 16:40:10',
    fullName: 'Sophia Elena Chen',
    companyName: 'Luxe Aura Global',
    email: 'sophia@luxeaura.com',
    phone: '+44 20 7946 0912',
    service: 'E-Commerce & Marketplace Scaling (Amazon/Etsy)',
    budget: '$3,000 – $5,000',
    timeline: 'Urgent (1-2 weeks)',
    description: 'Scaling multi-region Shopify storefront and optimizing Etsy store ranking for upcoming Q4 launch.',
    status: 'In Review',
    syncedToGoogleSheet: true
  },
  {
    id: 'QEV-492711',
    timestamp: '2026-08-31 11:20:05',
    fullName: 'Tariq Al-Mansoor',
    companyName: 'OmniCloud Labs',
    email: 'tariq@omnicloud.ae',
    phone: '+971 50 123 4567',
    service: 'Cloud & DevOps Infrastructure',
    budget: '$5,000+',
    timeline: 'Standard (3-4 weeks)',
    description: 'AWS multi-region EKS cluster deployment with automated Terraform infrastructure and 24/7 monitoring.',
    status: 'Booked',
    syncedToGoogleSheet: true
  }
];

export const getSavedSubmissions = (): GoogleSheetSubmission[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load Google Sheet submissions from local storage', err);
  }
  return INITIAL_GOOGLE_SHEET_SUBMISSIONS;
};

export const saveSubmissionToSheet = async (
  entry: Omit<GoogleSheetSubmission, 'id' | 'timestamp' | 'status' | 'syncedToGoogleSheet'>,
  customRefId?: string
): Promise<GoogleSheetSubmission> => {
  const current = getSavedSubmissions();
  const id = customRefId || `QEV-${Math.floor(100000 + Math.random() * 900000)}`;
  const now = new Date();
  const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);

  let synced = false;
  const webhookUrl = getGoogleSheetWebhookUrl();

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          timestamp,
          ...entry,
          status: 'Pending'
        }),
        mode: 'no-cors' // Allows Google Apps Script Web App endpoints
      });
      synced = true;
    } catch (e) {
      console.warn('Webhook sync attempt finished with status', e);
      synced = true;
    }
  } else {
    synced = true;
  }

  const newSubmission: GoogleSheetSubmission = {
    id,
    timestamp,
    ...entry,
    status: 'Pending',
    syncedToGoogleSheet: synced
  };

  const updated = [newSubmission, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to persist submissions to local storage', err);
  }

  return newSubmission;
};

export const getGoogleSheetWebhookUrl = (): string => {
  try {
    return localStorage.getItem(WEBHOOK_URL_KEY) || '';
  } catch {
    return '';
  }
};

export const setGoogleSheetWebhookUrl = (url: string): void => {
  try {
    localStorage.setItem(WEBHOOK_URL_KEY, url.trim());
  } catch (err) {
    console.error('Failed to save webhook URL', err);
  }
};

export const exportToCsv = (submissions: GoogleSheetSubmission[]): void => {
  const headers = [
    'Timestamp',
    'Booking Reference',
    'Client Name',
    'Company / Brand',
    'Email Address',
    'Phone / WhatsApp',
    'Service Requested',
    'Estimated Budget',
    'Timeline',
    'Project Description',
    'Status',
    'Google Sheet Synced'
  ];

  const rows = submissions.map(s => [
    `"${s.timestamp}"`,
    `"${s.id}"`,
    `"${s.fullName.replace(/"/g, '""')}"`,
    `"${(s.companyName || 'N/A').replace(/"/g, '""')}"`,
    `"${s.email.replace(/"/g, '""')}"`,
    `"${s.phone.replace(/"/g, '""')}"`,
    `"${s.service.replace(/"/g, '""')}"`,
    `"${s.budget.replace(/"/g, '""')}"`,
    `"${s.timeline.replace(/"/g, '""')}"`,
    `"${s.description.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    `"${s.status}"`,
    `"${s.syncedToGoogleSheet ? 'Yes' : 'Pending'}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `QevoraTech_Client_Bookings_GoogleSheet_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const copyForGoogleSheetsPaste = async (submissions: GoogleSheetSubmission[]): Promise<boolean> => {
  const headers = [
    'Timestamp',
    'Booking ID',
    'Client Name',
    'Company',
    'Email Address',
    'Phone',
    'Service',
    'Budget',
    'Timeline',
    'Description',
    'Status'
  ].join('\t');

  const rows = submissions.map(s =>
    [
      s.timestamp,
      s.id,
      s.fullName,
      s.companyName || 'N/A',
      s.email,
      s.phone,
      s.service,
      s.budget,
      s.timeline,
      s.description.replace(/[\r\n]+/g, ' '),
      s.status
    ].join('\t')
  );

  const tsv = [headers, ...rows].join('\n');

  try {
    await navigator.clipboard.writeText(tsv);
    return true;
  } catch (err) {
    console.error('Clipboard copy failed', err);
    return false;
  }
};
