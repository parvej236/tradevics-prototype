import { Check, Scale, GraduationCap, Sparkles } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { AIBadge } from './Brand';
import { PageHeader } from './ui';

type Plan = {
  id: string;
  icon: typeof Scale;
  name: { en: string; bn: string };
  tagline: { en: string; bn: string };
  price: { en: string; bn: string };
  period: { en: string; bn: string };
  features: { en: string[]; bn: string[] };
  highlight?: boolean;
  cta: { en: string; bn: string };
};

const plans: Plan[] = [
  {
    id: 'free',
    icon: Sparkles,
    name: { en: 'Free', bn: 'ফ্রি' },
    tagline: { en: 'Try AI Lawyer with limited prompts', bn: 'সীমিত প্রম্পট নিয়ে এআই লয়ার চেষ্টা করুন' },
    price: { en: '৳0', bn: '৳০' },
    period: { en: '/forever', bn: '/সর্বদা' },
    features: {
      en: ['10 AI Lawyer prompts / month', 'Basic SRO citations', 'Courses sold separately', 'Community support'],
      bn: ['মাসে ১০টি এআই লয়ার প্রম্পট', 'বেসিক এসআরও উদ্ধৃতি', 'কোর্স আলাদাভাবে ক্রয়যোগ্য', 'কমিউনিটি সাপোর্ট'],
    },
    cta: { en: 'Current plan', bn: 'বর্তমান প্ল্যান' },
  },
  {
    id: 'ai-lawyer',
    icon: Scale,
    name: { en: 'AI Lawyer', bn: 'এআই লয়ার' },
    tagline: { en: 'Unlimited legal AI for tax & customs', bn: 'ট্যাক্স ও কাস্টমসের জন্য আনলিমিটেড এআই' },
    price: { en: '৳1,500', bn: '৳১,৫০০' },
    period: { en: '/month', bn: '/মাস' },
    features: {
      en: ['Unlimited AI Lawyer prompts', 'SRO-grounded citations', 'Deterministic tax calculator', 'Priority support'],
      bn: ['আনলিমিটেড এআই লয়ার প্রম্পট', 'এসআরও-ভিত্তিক উদ্ধৃতি', 'নির্ধারিত ট্যাক্স ক্যালকুলেটর', 'প্রায়োরিটি সাপোর্ট'],
    },
    highlight: true,
    cta: { en: 'Upgrade', bn: 'আপগ্রেড' },
  },
  {
    id: 'ai-learning',
    icon: GraduationCap,
    name: { en: 'AI Learning', bn: 'এআই লার্নিং' },
    tagline: { en: 'Pay per course — no subscription', bn: 'প্রতি কোর্সে পরিশোধ — সাবস্ক্রিপশন নেই' },
    price: { en: 'From ৳800', bn: '৳৮০০ থেকে' },
    period: { en: '/course', bn: '/কোর্স' },
    features: {
      en: ['Buy individual courses à la carte', 'Lifetime access to purchased courses', 'MCQ quizzes with explanations', 'Certificate on completion'],
      bn: ['আলাদাভাবে পছন্দের কোর্স কিনুন', 'কেনা কোর্সে লাইফটাইম অ্যাক্সেস', 'ব্যাখ্যাসহ এমসিকিউ কুইজ', 'সম্পন্ন হলে সার্টিফিকেট'],
    },
    cta: { en: 'Browse courses', bn: 'কোর্স দেখুন' },
  },
];

export function SubscriptionsView() {
  const { lang, setRoute } = useApp();

  return (
    <div className="px-6 py-6 max-w-6xl mx-auto">
      <PageHeader
        title={lang === 'en' ? 'Subscriptions' : 'সাবস্ক্রিপশন'}
        subtitle={lang === 'en' ? 'Choose the plan that fits your workspace' : 'আপনার ওয়ার্কস্পেসের জন্য উপযুক্ত প্ল্যান বেছে নিন'}
        action={<AIBadge />}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`card p-6 flex flex-col ${p.highlight ? 'ring-2 ring-teal-500/30 border-teal-400' : ''}`}
          >
            {p.highlight && (
              <span className="chip bg-teal-50 text-teal-700 border border-teal-200 self-start mb-3">
                {lang === 'en' ? 'Most popular' : 'সবচেয়ে জনপ্রিয়'}
              </span>
            )}
            <div className="w-11 h-11 rounded-lg bg-ink-900 text-white grid place-items-center">
              <p.icon className="w-5 h-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink-900">{p.name[lang]}</h3>
            <p className="mt-1 text-xs text-ink-500 leading-relaxed">{p.tagline[lang]}</p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-ink-900">{p.price[lang]}</span>
              <span className="text-xs text-ink-400">{p.period[lang]}</span>
            </div>
            <ul className="mt-5 space-y-2.5 flex-1">
              {p.features[lang].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
                  <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" /> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => p.id === 'ai-learning' && setRoute('courses')}
              className={`mt-6 w-full ${p.highlight ? 'btn-primary' : 'btn-outline'}`}
            >
              {p.cta[lang]}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
