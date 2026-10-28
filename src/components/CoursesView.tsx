import { useState } from 'react';
import { Award, BookOpen, Check, Clock, Scale, ShieldCheck, Star, Users } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { AIBadge } from './Brand';
import { PageHeader } from './ui';
import { bdt } from '@/lib/i18n';
import type { Lang } from '@/lib/i18n';

type Course = {
  id: string;
  icon: typeof Scale;
  title: { en: string; bn: string };
  tutor: string;
  level: { en: string; bn: string };
  hours: number;
  rating: number;
  students: number;
  price: number;
  tag: { en: string; bn: string };
  features: { en: string[]; bn: string[] };
};

const courses: Course[] = [
  {
    id: 'c1',
    icon: Scale,
    title: { en: 'HS Classification Masterclass', bn: 'এইচএস ক্লাসিফিকেশন মাস্টারক্লাস' },
    tutor: 'Adv. Sumi Roy',
    level: { en: 'Intermediate', bn: 'মধ্যম' },
    hours: 6,
    rating: 4.8,
    students: 1240,
    price: 800,
    tag: { en: 'Bestseller', bn: 'বেস্টসেলার' },
    features: {
      en: ['HS code lookup & disputes', 'Real Bill of Entry case studies', 'Certificate on completion'],
      bn: ['এইচএস কোড লুকআপ ও বিরোধ', 'বিল অফ এন্ট্রি কেস স্টাডি', 'সম্পন্ন হলে সার্টিফিকেট'],
    },
  },
  {
    id: 'c2',
    icon: BookOpen,
    title: { en: 'VAT Law Fundamentals', bn: 'ভ্যাট আইনের মূলনীতি' },
    tutor: 'Barrister Kabir',
    level: { en: 'Beginner', bn: 'শিক্ষানবিস' },
    hours: 8,
    rating: 4.6,
    students: 980,
    price: 1000,
    tag: { en: 'New', bn: 'নতুন' },
    features: {
      en: ['VAT Act 2012, section by section', 'Exemptions & SRO mapping', 'Certificate on completion'],
      bn: ['ভ্যাট আইন ২০১২, ধারা অনুযায়ী', 'অব্যাহতি ও SRO ম্যাপিং', 'সম্পন্ন হলে সার্টিফিকেট'],
    },
  },
  {
    id: 'c3',
    icon: ShieldCheck,
    title: { en: 'Appeal Drafting Workshop', bn: 'আপিল ড্রাফটিং ওয়ার্কশপ' },
    tutor: 'Barrister Kabir',
    level: { en: 'Advanced', bn: 'উন্নত' },
    hours: 5,
    rating: 4.9,
    students: 612,
    price: 1200,
    tag: { en: 'Bestseller', bn: 'বেস্টসেলার' },
    features: {
      en: ['Show Cause Reply templates', 'Appeal Memo structure', 'Certificate on completion'],
      bn: ['শো কজ জবাব টেমপ্লেট', 'আপিল স্মারকলিপি কাঠামো', 'সম্পন্ন হলে সার্টিফিকেট'],
    },
  },
  {
    id: 'c4',
    icon: Award,
    title: { en: 'SRO Interpretation Lab', bn: 'SRO ব্যাখ্যা ল্যাব' },
    tutor: 'NBR Retd. Officer',
    level: { en: 'Intermediate', bn: 'মধ্যম' },
    hours: 4,
    rating: 4.7,
    students: 745,
    price: 900,
    tag: { en: 'Popular', bn: 'জনপ্রিয়' },
    features: {
      en: ['Reading SROs & circulars correctly', 'Exemption eligibility checklists', 'Certificate on completion'],
      bn: ['SRO ও সার্কুলার সঠিকভাবে পড়া', 'অব্যাহতি যোগ্যতা চেকলিস্ট', 'সম্পন্ন হলে সার্টিফিকেট'],
    },
  },
];

export function CoursesView() {
  const { lang } = useApp();
  const [purchased, setPurchased] = useState<Record<string, boolean>>({});

  return (
    <div className="px-6 py-6 max-w-6xl mx-auto">
      <PageHeader
        title={lang === 'en' ? 'Browse Courses' : 'কোর্স দেখুন'}
        subtitle={lang === 'en' ? 'Buy individual courses — lifetime access, no subscription' : 'আলাদাভাবে কোর্স কিনুন — লাইফটাইম অ্যাক্সেস, সাবস্ক্রিপশন নেই'}
        action={<AIBadge />}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {courses.map((c) => {
          const bought = purchased[c.id];
          return (
            <div key={c.id} className="card p-5 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-lg bg-ink-900 text-white grid place-items-center">
                  <c.icon className="w-5 h-5" />
                </div>
                <span className="chip bg-teal-50 text-teal-700 border border-teal-200">{c.tag[lang as Lang]}</span>
              </div>
              <h3 className="mt-4 text-sm font-bold text-ink-900 leading-snug">{c.title[lang as Lang]}</h3>
              <p className="mt-1 text-xs text-ink-500">{c.tutor} · {c.level[lang as Lang]}</p>

              <div className="mt-3 flex items-center gap-3 text-xs text-ink-500">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {c.hours}h</span>
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-status-warn" /> {c.rating}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {c.students}</span>
              </div>

              <ul className="mt-4 space-y-2 flex-1">
                {c.features[lang as Lang].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-ink-700">
                    <Check className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-extrabold text-ink-900">{bdt(c.price, lang as Lang)}</span>
                <span className="text-[10px] text-ink-400">{lang === 'en' ? 'one-time' : 'এককালীন'}</span>
              </div>

              <button
                onClick={() => setPurchased((p) => ({ ...p, [c.id]: true }))}
                disabled={bought}
                className={`mt-3 w-full ${bought ? 'btn-outline text-status-success border-status-success/30' : 'btn-primary'}`}
              >
                {bought ? <><Check className="w-4 h-4" /> {lang === 'en' ? 'Purchased' : 'ক্রয় সম্পন্ন'}</> : (lang === 'en' ? 'Buy course' : 'কোর্স কিনুন')}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
