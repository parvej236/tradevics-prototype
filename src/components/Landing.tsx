import { useState } from 'react';
import { ArrowRight, ShieldCheck, FileCheck2, Calculator, GraduationCap, MessageSquare, FileText, ScanLine, Sparkles, Smartphone, KeyRound, Fingerprint, Check } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { t } from '@/lib/i18n';
import { Logo, AIBadge, LangToggle } from './Brand';

export function Landing() {
  const { lang, setRoute } = useApp();
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <Logo />
          <div className="flex items-center gap-2 md:gap-3">
            <LangToggle />
            <button onClick={() => setRoute('auth')} className="btn-ghost">{t('signIn', lang)}</button>
            <button onClick={() => setRoute('auth')} className="btn-primary">{t('getStarted', lang)} <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-ink-900/5 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-24 text-center">
          <div className="flex justify-center mb-6">
            <span className="chip bg-white border border-ink-200 text-ink-600 shadow-card">
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              {lang === 'en' ? 'NBR-aligned · Built for Bangladesh' : 'এনবিআর-সংযুক্ত · বাংলাদেশের জন্য'}
            </span>
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl md:text-6xl font-extrabold tracking-tight text-ink-900 leading-[1.05]">
            {lang === 'en' ? (
              <>The AI legal engine for <span className="text-teal-600">Customs, VAT & Tax</span> professionals.</>
            ) : (
              <>কাস্টমস, ভ্যাট ও ট্যাক্স পেশাদারদের জন্য <span className="text-teal-600">এআই আইনি ইঞ্জিন।</span></>
            )}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-500 leading-relaxed">
            {lang === 'en'
              ? 'Citations from live SROs, deterministic tax ledgers, document cross-checks, and an academy to upskill your team — one platform.'
              : 'লাইভ এসআরও থেকে উদ্ধৃতি, নির্ধারিত ট্যাক্স লেজার, ডকুমেন্ট ক্রস-চেক, এবং দলের দক্ষতা বাড়াতে একাডেমি — একই প্ল্যাটফর্ম।'}
          </p>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={() => setRoute('auth')} className="btn-primary px-6 py-3 text-base">
              {t('getStarted', lang)} <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => setRoute('auth')} className="btn-outline px-6 py-3 text-base">
              {t('signIn', lang)}
            </button>
          </div>
          <div className="mt-6 flex justify-center"><AIBadge /></div>
        </div>
      </section>

      {/* Two products */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900">
            {lang === 'en' ? 'Two products, one platform' : 'দুটি পণ্য, একই প্ল্যাটফর্ম'}
          </h2>
          <p className="mt-2 text-ink-500">{lang === 'en' ? 'Built for the tax bench and the classroom.' : 'ট্যাক্স বেঞ্চ ও ক্লাসরুমের জন্য।'}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <ProductCard
            icon={ShieldCheck}
            tone="ink"
            title="Tax & Customs AI"
            desc={lang === 'en' ? 'Chat with SRO-grounded AI, cross-check Bills of Entry, compute auditable tax ledgers, draft legal replies.' : 'SRO-ভিত্তিক এআই-এর সাথে চ্যাট, বিল অফ এন্ট্রি ক্রস-চেক, অডিটযোগ্য ট্যাক্স লেজার, আইনি জবাব তৈরি।'}
            features={lang === 'en' ? ['SRO citation chips', 'HS code discrepancy engine', 'Deterministic tax ledger', 'Show-cause drafting'] : ['এসআরও উদ্ধৃতি চিপ', 'HS কোড অমিল ইঞ্জিন', 'নির্ধারিত ট্যাক্স লেজার', 'শো-কজ ড্রাফটিং']}
            cta={lang === 'en' ? 'Explore Tax AI' : 'ট্যাক্স এআই দেখুন'}
            onClick={() => { setRoute('chat'); }}
          />
          <ProductCard
            icon={GraduationCap}
            tone="teal"
            title="AI Academy"
            desc={lang === 'en' ? 'Upskill your team with live classes, MCQ labs, skill radar, and NBR-recognized certificates.' : 'লাইভ ক্লাস, এমসিকিউ ল্যাব, স্কিল রাডার ও এনবিআর-স্বীকৃত সার্টিফিকেট দিয়ে দল দক্ষ করুন।'}
            features={lang === 'en' ? ['Live masterclasses', 'Instant-feedback quizzes', 'Skill radar tracking', 'QR certificates'] : ['লাইভ মাস্টারক্লাস', 'তাৎক্ষণিক কুইজ', 'স্কিল রাডার', 'কিউআর সার্টিফিকেট']}
            cta={lang === 'en' ? 'Explore Academy' : 'একাডেমি দেখুন'}
            onClick={() => setRoute('academy')}
          />
        </div>
      </section>

      {/* Credibility strip */}
      <section className="border-y border-ink-100 bg-ink-50">
        <div className="mx-auto max-w-6xl px-5 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { n: '4,200+', l: lang === 'en' ? 'Professionals onboarded' : 'পেশাদার অনবোর্ডেড' },
            { n: '18,500', l: lang === 'en' ? 'SROs & circulars indexed' : 'এসআরও ও সার্কুলার ইনডেক্সড' },
            { n: '99.2%', l: lang === 'en' ? 'Tax computation accuracy' : 'ট্যাক্স হিসাব নির্ভুলতা' },
            { n: 'NBR', l: lang === 'en' ? 'Law corpus aligned' : 'আইন কর্পাস সংযুক্ত' },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-3xl font-extrabold text-ink-900">{s.n}</div>
              <div className="mt-1 text-sm text-ink-500">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-tight text-ink-900">
            {lang === 'en' ? 'From query to filing in four steps' : 'জিজ্ঞাসা থেকে ফাইলিং চার ধাপে'}
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {[
            { icon: MessageSquare, n: '01', t: lang === 'en' ? 'Ask' : 'জিজ্ঞাসা', d: lang === 'en' ? 'Chat in EN/বাং — citations appear inline.' : 'এন/বাং-এ চ্যাট — উদ্ধৃতি ইনলাইন।' },
            { icon: ScanLine, n: '02', t: lang === 'en' ? 'Cross-check' : 'ক্রস-চেক', d: lang === 'en' ? 'Drop BOE + Invoice; catch HS mismatches.' : 'বিওই + ইনভয়েস; HS অমিল ধরুন।' },
            { icon: Calculator, n: '03', t: lang === 'en' ? 'Compute' : 'হিসাব', d: lang === 'en' ? 'Auditable CD/RD/VAT/AIT ledger with exemptions.' : 'অডিটযোগ্য সিডি/আরডি/ভ্যাট/এআইটি লেজার।' },
            { icon: FileText, n: '04', t: lang === 'en' ? 'Draft & file' : 'ড্রাফট ও ফাইল', d: lang === 'en' ? 'Generate show-cause replies & appeals.' : 'শো-কজ জবাব ও আপিল তৈরি।' },
          ].map((s, i) => (
            <div key={s.n} className={`card p-6 relative ${i < 3 ? 'md:after:content-[""] md:after:absolute md:after:top-1/2 md:after:-right-3 md:after:w-6 md:after:h-px md:after:bg-ink-200' : ''}`}>
              <div className="w-11 h-11 rounded-lg bg-ink-900 text-white grid place-items-center">
                <s.icon className="w-5 h-5" />
              </div>
              <div className="mt-4 text-xs font-bold text-teal-600">{s.n}</div>
              <div className="text-lg font-semibold text-ink-900 mt-1">{s.t}</div>
              <p className="mt-1.5 text-sm text-ink-500 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-ink-100 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-xs text-ink-400">© 2026 Tradevics AI · Dhaka, Bangladesh · This is a click-through prototype.</p>
          <LangToggle />
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ icon: Icon, tone, title, desc, features, cta, onClick }: {
  icon: typeof ShieldCheck; tone: 'ink' | 'teal'; title: string; desc: string; features: string[]; cta: string; onClick: () => void;
}) {
  const accent = tone === 'ink' ? 'from-ink-800 to-ink-900' : 'from-teal-500 to-teal-700';
  return (
    <div className="card p-8 group hover:shadow-float transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${accent} text-white grid place-items-center shadow-float`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="mt-5 text-xl font-bold text-ink-900">{title}</h3>
      <p className="mt-2 text-sm text-ink-500 leading-relaxed">{desc}</p>
      <ul className="mt-5 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-ink-700">
            <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 grid place-items-center"><Check className="w-3 h-3" /></span>
            {f}
          </li>
        ))}
      </ul>
      <button className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 group-hover:gap-2.5 transition-all">
        {cta} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export function Auth() {
  const { lang, setRoute } = useApp();
  const [step, setStep] = useState(0);
  const steps = [
    { icon: Smartphone, t: lang === 'en' ? 'Enter mobile' : 'মোবাইল দিন', d: lang === 'en' ? '+880 — we send a one-time code' : '+৮৮০ — আমরা ওটিপি পাঠাই' },
    { icon: KeyRound, t: lang === 'en' ? 'Verify OTP' : 'ওটিপি যাচাই', d: lang === 'en' ? '6-digit code delivered via SMS' : '৬-সংখ্যার কোড এসএমএস-এ' },
    { icon: Fingerprint, t: lang === 'en' ? 'Set passkey' : 'পাসকি সেট', d: lang === 'en' ? 'Biometric or device key — no passwords' : 'বায়োমেট্রিক বা ডিভাইস কী — পাসওয়ার্ড নেই' },
  ];

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between bg-ink-900 text-white p-12 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-40" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl" />
        <div className="relative"><Logo size="lg" /></div>
        <div className="relative">
          <h2 className="text-3xl font-bold leading-tight">
            {lang === 'en' ? 'No passwords. Just your phone and a passkey.' : 'পাসওয়ার্ড নেই। শুধু ফোন ও পাসকি।'}
          </h2>
          <p className="mt-4 text-ink-300 leading-relaxed">
            {lang === 'en'
              ? 'Tradevics uses passwordless authentication aligned with NIST 800-63B. Faster sign-in, stronger security.'
              : 'ট্রেডভিক্স NIST 800-63B অনুযায়ী পাসওয়ার্ডলেস প্রমাণীকরণ ব্যবহার করে। দ্রুত সাইন-ইন, শক্তিশালী নিরাপত্তা।'}
          </p>
          <div className="mt-8 flex gap-3"><AIBadge /></div>
        </div>
        <div className="relative flex items-center gap-3 text-ink-300 text-sm">
          <ShieldCheck className="w-5 h-5 text-teal-400" />
          {lang === 'en' ? 'Encrypted at rest · SOC2 controls' : 'এনক্রিপ্টেড · SOC2 নিয়ন্ত্রণ'}
        </div>
      </div>

      {/* Right auth flow */}
      <div className="flex flex-col items-center justify-center p-6 bg-ink-50">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <Logo />
            <LangToggle />
          </div>
          <h1 className="text-2xl font-bold text-ink-900">{lang === 'en' ? 'Welcome back' : 'স্বাগতম'}</h1>
          <p className="mt-1 text-sm text-ink-500">{lang === 'en' ? 'Sign in to your Tradevics workspace' : 'আপনার ট্রেডভিক্স ওয়ার্কস্পেসে সাইন ইন করুন'}</p>

          {/* Steps visual */}
          <div className="mt-8 flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={i} className="flex-1 flex items-center gap-2">
                <div className={`flex flex-col items-center gap-1.5 ${i <= step ? '' : 'opacity-40'}`}>
                  <div className={`w-10 h-10 rounded-full grid place-items-center transition ${i < step ? 'bg-teal-600 text-white' : i === step ? 'bg-ink-900 text-white ring-4 ring-teal-500/20' : 'bg-white border border-ink-200 text-ink-400'}`}>
                    {i < step ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                  </div>
                  <span className="text-[10px] font-semibold text-ink-500 text-center">{s.t}</span>
                </div>
                {i < steps.length - 1 && <div className={`flex-1 h-px ${i < step ? 'bg-teal-500' : 'bg-ink-200'} -mt-5`} />}
              </div>
            ))}
          </div>

          <div className="card mt-8 p-6">
            {step === 0 && (
              <>
                <label className="label">{lang === 'en' ? 'Mobile number' : 'মোবাইল নম্বর'}</label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-ink-300 bg-ink-50 text-sm text-ink-600 font-medium">+880</span>
                  <input className="input rounded-l-none" placeholder="1XXX-XXXXXX" defaultValue="1712-345678" />
                </div>
                <button className="btn-primary w-full mt-4" onClick={() => setStep(1)}>{lang === 'en' ? 'Send OTP' : 'ওটিপি পাঠান'} <ArrowRight className="w-4 h-4" /></button>
              </>
            )}
            {step === 1 && (
              <>
                <label className="label">{lang === 'en' ? '6-digit code' : '৬-সংখ্যার কোড'}</label>
                <div className="flex gap-2 justify-between">
                  {[4,8,2,1,0,7].map((d, i) => (
                    <div key={i} className="w-11 h-13 rounded-lg border border-ink-300 bg-white grid place-items-center text-xl font-bold text-ink-900 py-3" style={{ animationDelay: `${i*0.1}s` }}>{d}</div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-ink-500">{lang === 'en' ? 'Code expires in 04:58 ·' : 'কোড ০৪:৫৮ শেষ ·'} <button className="text-teal-600 font-semibold" onClick={() => setStep(0)}>{lang === 'en' ? 'resend' : 'পুনঃপ্রেরণ'}</button></p>
                <button className="btn-primary w-full mt-4" onClick={() => setStep(2)}>{lang === 'en' ? 'Verify' : 'যাচাই করুন'} <Check className="w-4 h-4" /></button>
              </>
            )}
            {step === 2 && (
              <div className="text-center py-2">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 grid place-items-center mx-auto">
                  <Fingerprint className="w-8 h-8" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink-900">{lang === 'en' ? 'Create your passkey' : 'আপনার পাসকি তৈরি করুন'}</h3>
                <p className="mt-1.5 text-sm text-ink-500">{lang === 'en' ? 'Touch the sensor or confirm on your device.' : 'সেন্সর স্পর্শ করুন বা ডিভাইসে নিশ্চিত করুন।'}</p>
                <button className="btn-primary w-full mt-5" onClick={() => setRoute('chat')}>
                  {lang === 'en' ? 'Enter workspace' : 'ওয়ার্কস্পেসে প্রবেশ'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          <p className="mt-6 text-center text-xs text-ink-400">
            {lang === 'en' ? 'By continuing you accept the ' : 'চালিয়ে যাওয়ার মাধ্যমে আপনি '}<span className="underline cursor-pointer">Terms</span>{' & '}<span className="underline cursor-pointer">Privacy</span>{lang === 'en' ? '.' : '।'}
          </p>
        </div>
      </div>
    </div>
  );
}
