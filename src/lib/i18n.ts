export type Lang = 'en' | 'bn';

export const dict = {
  appName: { en: 'Tradevics', bn: 'ট্রেডভিক্স' },
  appTag: { en: 'AI for Bangladesh Customs, VAT & Tax', bn: 'বাংলাদেশ কাস্টমস, ভ্যাট ও ট্যাক্সের জন্য এআই' },
  signIn: { en: 'Sign In', bn: 'সাইন ইন' },
  getStarted: { en: 'Get Started', bn: 'শুরু করুন' },
  // nav
  chat: { en: 'AI Assistant', bn: 'এআই সহকারী' },
  docs: { en: 'Doc Cross-Check', bn: 'ডক ক্রস-চেক' },
  calc: { en: 'Tax Calculator', bn: 'ট্যাক্স ক্যালকুলেটর' },
  draft: { en: 'Doc Generator', bn: 'ডক জেনারেটর' },
  notice: { en: 'Notice Intake', bn: 'নোটিশ গ্রহণ' },
  academy: { en: 'AI Academy', bn: 'এআই একাডেমি' },
  admin: { en: 'Admin Portal', bn: 'অ্যাডমিন পোর্টাল' },
  subscriptions: { en: 'Subscriptions', bn: 'সাবস্ক্রিপশন' },
  courses: { en: 'Browse Courses', bn: 'কোর্স দেখুন' },
  // badge
  aiGuard: { en: '', bn: '' },
} as const;

export type Key = keyof typeof dict;

export function t(key: Key, lang: Lang): string {
  return dict[key][lang];
}

export function bdt(n: number, lang: Lang = 'en'): string {
  const formatted = new Intl.NumberFormat(lang === 'bn' ? 'bn-BD' : 'en-IN', {
    maximumFractionDigits: 2,
  }).format(n);
  return lang === 'bn' ? `৳${formatted}` : `BDT ${formatted}`;
}
