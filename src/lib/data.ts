import type { Lang } from './i18n';

export const tenant = {
  name: 'Saif Freight International Ltd.',
  role: { en: 'C&F Agent', bn: 'সি অ্যান্ড এফ এজেন্ট' },
  plan: 'Enterprise · NBR-licensed',
  user: 'Rakibul Hasan',
  initials: 'RH',
};

export type Citation = {
  id: string;
  label: string;
  title: string;
  kind: 'SRO' | 'section' | 'circular' | 'act';
  text: string;
};

export const citations: Record<string, Citation> = {
  'sro184': {
    id: 'sro184',
    label: 'SRO 184/2023',
    title: 'VAT exemption — edible oil imports',
    kind: 'SRO',
    text: '...the supply of imported crude soybean oil shall be exempt from Value Added Tax under section 4(2), subject to submission of Bill of Entry and LC copy.',
  },
  's42': {
    id: 's42',
    label: 's.4(2)',
    title: 'VAT Act 2012 — exempt supply',
    kind: 'section',
    text: 'The Government may, by notification, exempt any goods or services from the application of this Act.',
  },
  'hs1517': {
    id: 'hs1517',
    label: 'HS 1517.10.00',
    title: 'Margarine — tariff classification',
    kind: 'act',
    text: 'HS 1517.10.00: Margarine, excluding liquid margarine. CD rate 25%, RD 3%, SD 0%, VAT 15%.',
  },
  'circ12': {
    id: 'circ12',
    label: 'Circular 12/2024',
    title: 'Assessable value benchmark — edible oils',
    kind: 'circular',
    text: 'Assessable value benchmark for crude soybean oil: USD 1,180/MT. Declarations 10%+ below benchmark require justification.',
  },
  'ait52': {
    id: 'ait52',
    label: 's.52',
    title: 'Income Tax Ordinance — Advance Income Tax',
    kind: 'section',
    text: 'Advance Income Tax (AIT) shall be collected at source on imports at the rate specified in the relevant Finance Act, adjustable against final tax liability.',
  },
};

export type ChatTurn = {
  id: string;
  role: 'user' | 'ai';
  text: string;
  cites?: string[];
  pending?: boolean;
};

export const seedChat: ChatTurn[] = [
  {
    id: 'm1',
    role: 'user',
    text: 'What is the VAT treatment on importing crude soybean oil under SRO 184/2023?',
  },
  {
    id: 'm2',
    role: 'ai',
    text: 'Under SRO 184/2023, the import of crude soybean oil is exempt from VAT per s.4(2) of the VAT Act 2012, provided the Bill of Entry and LC copy are submitted. The standard duties (CD 25%, RD 3%) still apply — only the VAT component is waived.',
    cites: ['sro184', 's42'],
  },
];

export const streamedReply =
  'Based on SRO 184/2023 and Circular 12/2024: crude soybean oil imports are VAT-exempt under s.4(2), but the NBR benchmark assessable value is USD 1,180/MT. If your declared value falls more than 9% below this benchmark, Customs may raise a value query under section 32 of the Customs Act. I recommend attaching a justification memo with supplier invoices and market quotations.';

export const seedChatCustoms: ChatTurn[] = [
  {
    id: 'cm1',
    role: 'user',
    text: 'What HS code and duty rate apply to margarine imports?',
  },
  {
    id: 'cm2',
    role: 'ai',
    text: 'Margarine (excluding liquid margarine) falls under HS 1517.10.00, attracting Customs Duty 25% and Regulatory Duty 3%. There is no Supplementary Duty on this line. Confirm the product composition on the Bill of Entry matches the HS description to avoid a classification query.',
    cites: ['hs1517', 'circ12'],
  },
];

export const streamedReplyCustoms =
  'Per HS 1517.10.00, margarine attracts CD 25% and RD 3%, with no Supplementary Duty. Customs may still raise a classification query if the declared composition deviates from the tariff description — attach the product spec sheet and supplier declaration with the Bill of Entry to pre-empt an examination order.';

export const seedChatTax: ChatTurn[] = [
  {
    id: 'tm1',
    role: 'user',
    text: 'What Advance Income Tax (AIT) applies on this import, and is it adjustable?',
  },
  {
    id: 'tm2',
    role: 'ai',
    text: 'Under s.52 of the Income Tax Ordinance, AIT is collected at source at the point of import at the rate set by the current Finance Act. It is adjustable against your final income tax liability for the assessment year — retain the AIT payment certificate from Customs for your return.',
    cites: ['ait52'],
  },
];

export const streamedReplyTax =
  'AIT collected under s.52 at the import stage is an advance, not a final tax — it is credited against your assessed income tax liability for the year. Keep the Customs-issued AIT certificate; without it, the credit can be disallowed at assessment. If no return is filed, the AIT may be treated as final tax under the relevant Finance Act provision.';

export type DocKind = 'BOE' | 'Invoice' | 'LC';
export type DocRow = {
  id: string;
  name: string;
  kind: DocKind;
  status: 'extracted' | 'processing' | 'error';
  fields: { label: string; value: string; flag?: 'mismatch' | 'ok' | 'warn' }[];
};

export const seedDocs: DocRow[] = [
  {
    id: 'd1',
    name: 'Bill-of-Entry-C88012.pdf',
    kind: 'BOE',
    status: 'extracted',
    fields: [
      { label: 'HS Code', value: '1517.10.00', flag: 'mismatch' },
      { label: 'Declared Value', value: 'USD 1,072/MT', flag: 'warn' },
      { label: 'Country of Origin', value: 'Argentina' },
      { label: 'Importer BIN', value: '0107754321' },
      { label: 'Port', value: 'Chattogram (CPA)' },
    ],
  },
  {
    id: 'd2',
    name: 'Commercial-Invoice.pdf',
    kind: 'Invoice',
    status: 'extracted',
    fields: [
      { label: 'HS Code', value: '1511.90.10', flag: 'mismatch' },
      { label: 'Invoice Value', value: 'USD 1,072/MT' },
      { label: 'Supplier', value: 'Cargill Argentina S.A.' },
      { label: 'Payment Terms', value: 'L/C 90 days' },
    ],
  },
  {
    id: 'd3',
    name: 'LC-04567.pdf',
    kind: 'LC',
    status: 'extracted',
    fields: [
      { label: 'LC Value', value: 'USD 536,000' },
      { label: 'Issuing Bank', value: 'Sonali Bank Ltd.' },
      { label: 'Expiry', value: '12 Dec 2025' },
      { label: 'Advising Bank', value: 'HSBC Singapore' },
    ],
  },
];

export type Discrepancy = {
  id: string;
  severity: 'high' | 'medium' | 'low';
  field: string;
  boe: string;
  invoice: string;
  note: string;
};

export const discrepancies: Discrepancy[] = [
  {
    id: 'dp1',
    severity: 'high',
    field: 'HS Code',
    boe: '1517.10.00',
    invoice: '1511.90.10',
    note: 'HS mismatch between BOE and Invoice — likely misclassification (margarine vs crude oil).',
  },
  {
    id: 'dp2',
    severity: 'high',
    field: 'Assessable Value',
    boe: 'USD 1,072/MT',
    invoice: 'USD 1,072/MT',
    note: 'Declared value 9% below NBR benchmark (USD 1,180/MT) — triggers value query under s.32.',
  },
  {
    id: 'dp3',
    severity: 'low',
    field: 'Country of Origin',
    boe: 'Argentina',
    invoice: '—',
    note: 'Origin consistent; preferential COO not attached.',
  },
];

export type TaxLine = {
  key: string;
  name: { en: string; bn: string };
  rate: string;
  base: string;
  amount: number;
  exempt?: boolean;
  formula: { en: string; bn: string };
};

export const taxLedger: TaxLine[] = [
  {
    key: 'cd',
    name: { en: 'Customs Duty (CD)', bn: 'কাস্টমস ডিউটি' },
    rate: '25%',
    base: 'Assessable value',
    amount: 221250,
    formula: { en: 'CD = AV × 25% = 885,000 × 0.25', bn: 'সিডি = এভি × ২৫% = ৮,৮৫,০০০ × ০.২৫' },
  },
  {
    key: 'rd',
    name: { en: 'Regulatory Duty (RD)', bn: 'রেগুলেটরি ডিউটি' },
    rate: '3%',
    base: 'Assessable value',
    amount: 26550,
    formula: { en: 'RD = AV × 3% = 885,000 × 0.03', bn: 'আরডি = এভি × ৩% = ৮,৮৫,০০০ × ০.০৩' },
  },
  {
    key: 'sd',
    name: { en: 'Supplementary Duty (SD)', bn: 'সাপ্লিমেন্টারি ডিউটি' },
    rate: '0%',
    base: 'AV + CD + RD',
    amount: 0,
    formula: { en: 'SD = (AV+CD+RD) × 0%', bn: 'এসডি = (এভি+সিডি+আরডি) × ০%' },
  },
  {
    key: 'vat',
    name: { en: 'Value Added Tax (VAT)', bn: 'ভ্যাট' },
    rate: '15%',
    base: 'AV + CD + RD + SD',
    amount: 136733,
    formula: { en: 'VAT = (885,000+221,250+26,550) × 15% — EXEMPT per SRO 184/2023', bn: 'ভ্যাট = (...) × ১৫% — SRO 184/2023 অনুযায়ী অব্যাহতিকৃত' },
    exempt: true,
  },
  {
    key: 'ait',
    name: { en: 'Advance Income Tax (AIT)', bn: 'অগ্রিম আয়কর' },
    rate: '5%',
    base: 'Assessable value',
    amount: 44250,
    formula: { en: 'AIT = AV × 5%', bn: 'এআইটি = এভি × ৫%' },
  },
  {
    key: 'at',
    name: { en: 'Advance Trade Tax (AT)', bn: 'অগ্রিম বাণিজ্য কর' },
    rate: '1%',
    base: 'Assessable value',
    amount: 8850,
    formula: { en: 'AT = AV × 1%', bn: 'এটি = এভি × ১%' },
  },
];

export const totalTaxIncidence = taxLedger.reduce((s, l) => s + (l.exempt ? 0 : l.amount), 0);
export const assessableValue = 885000;

export type Notice = {
  id: string;
  title: string;
  section: string;
  deadlineDays: number;
  deadlineLabel: string;
  issued: string;
  severity: 'danger' | 'warn' | 'info';
};

export const notice: Notice = {
  id: 'n1',
  title: 'Show Cause Notice — Short-levy of VAT',
  section: 's.98, VAT Act 2012',
  deadlineDays: 7,
  deadlineLabel: '7 days',
  issued: '20 Oct 2026',
  severity: 'danger',
};

export const students = [
  { id: 's1', name: 'Ayesha Akter', cohort: 'Customs Pro · C24', progress: 78, cert: true, last: 'HS Classification Quiz' },
  { id: 's2', name: 'Tanvir Rahman', cohort: 'VAT Pro · V12', progress: 54, cert: false, last: 'Appeal Drafting Workshop' },
  { id: 's3', name: 'Nusrat Jahan', cohort: 'Customs Pro · C24', progress: 91, cert: true, last: 'Assessable Value Lab' },
  { id: 's4', name: 'Imran Khan', cohort: 'Tax Pro · T08', progress: 33, cert: false, last: 'SRO Interpretation 101' },
];

export const tenants = [
  { id: 't1', name: 'Saif Freight International', seats: 48, plan: 'Enterprise', status: 'active', usage: 82 },
  { id: 't2', name: 'BRAC Logistics Ltd.', seats: 120, plan: 'Enterprise', status: 'active', usage: 64 },
  { id: 't3', name: 'Kazi Farms Group', seats: 15, plan: 'Business', status: 'active', usage: 41 },
  { id: 't4', name: 'Muktijoddha Customs House', seats: 6, plan: 'Starter', status: 'trial', usage: 12 },
  { id: 't5', name: 'Daffodil Trade PLC', seats: 30, plan: 'Business', status: 'suspended', usage: 0 },
];

export const liveClasses = [
  { id: 'lc1', title: 'HS Classification Masterclass', tutor: 'Adv. Sumi Roy', time: 'Tonight · 8:00 PM', seats: 214, live: true },
  { id: 'lc2', title: 'Appeal Drafting Workshop', tutor: 'Barrister Kabir', time: 'Thu · 6:30 PM', seats: 87, live: false },
  { id: 'lc3', title: 'SRO Interpretation Lab', tutor: 'NBR Retd. Officer', time: 'Sat · 10:00 AM', seats: 152, live: false },
];

export const radarSkills = [
  { k: 'Classification', v: 82 },
  { k: 'Valuation', v: 68 },
  { k: 'VAT Law', v: 91 },
  { k: 'Appeals', v: 55 },
  { k: 'SROs', v: 74 },
  { k: 'Compliance', v: 88 },
];

export const quiz = [
  {
    q: 'Under SRO 184/2023, which component is exempt on crude soybean oil imports?',
    opts: ['Customs Duty', 'VAT', 'AIT', 'All duties'],
    ans: 1,
    explain: 'SRO 184/2023 exempts only VAT under s.4(2); CD, RD, AIT remain payable.',
  },
  {
    q: 'The assessable value benchmark for crude soybean oil (Circular 12/2024) is:',
    opts: ['USD 980/MT', 'USD 1,180/MT', 'USD 1,500/MT', 'No benchmark'],
    ans: 1,
    explain: 'Circular 12/2024 sets USD 1,180/MT; declarations 10%+ below trigger a value query.',
  },
  {
    q: 'A BOE shows HS 1517.10.00 but the invoice shows 1511.90.10. This is:',
    opts: ['Acceptable', 'A misclassification discrepancy', 'A clerical error only', 'Permitted for oils'],
    ans: 1,
    explain: 'HS mismatch between BOE and Invoice is a high-severity discrepancy requiring correction.',
  },
];

export function liveCountdown(lang: Lang) {
  return { en: 'Live now', bn: 'এখনই লাইভ' }[lang];
}
