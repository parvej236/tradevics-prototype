import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, FileText, Inbox, Calendar, AlertTriangle, ScanLine, Download, Eye, Clock } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { AIBadge } from './Brand';
import { PageHeader } from './ui';
import { notice } from '@/lib/data';

export function DraftView() {
  const { lang } = useApp();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const steps = lang === 'en'
    ? ['Document type', 'Party details', 'Facts & grounds', 'Review & generate']
    : ['ডকুমেন্ট প্রকার', 'পক্ষের তথ্য', 'তথ্য ও ভিত্তি', 'পর্যালোচনা ও তৈরি'];

  return (
    <div className="px-6 py-6 max-w-5xl mx-auto">
      <PageHeader
        title={lang === 'en' ? 'Document Generator' : 'ডকুমেন্ট জেনারেটর'}
        subtitle={lang === 'en' ? 'Form wizard → rich-text legal drafts · Show Cause Replies, Appeals' : 'ফর্ম উইজার্ড → রিচ-টেক্সট আইনি ড্রাফট · শো কজ জবাব, আপিল'}
        action={<AIBadge />}
      />

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-thin pb-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 shrink-0">
            <div className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${i < step ? 'bg-teal-600 text-white' : i === step ? 'bg-ink-900 text-white' : 'bg-white border border-ink-200 text-ink-500'}`}>
              <span className={`w-5 h-5 rounded-full grid place-items-center text-[10px] ${i < step ? 'bg-white/20' : i === step ? 'bg-teal-500' : 'bg-ink-100'}`}>
                {i < step ? <Check className="w-3 h-3" /> : i + 1}
              </span>
              {s}
            </div>
            {i < steps.length - 1 && <ArrowRight className="w-3 h-3 text-ink-300" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 card p-6">
          {step === 0 && (
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { t: 'Show Cause Reply', d: lang === 'en' ? 'Respond to NBR notice' : 'এনবিআর নোটিশের জবাব', a: true },
                { t: 'Appeal Memo', d: lang === 'en' ? 'Commissioner (Appeals)' : 'কমিশনার (আপিল)' },
                { t: 'Revision Petition', d: lang === 'en' ? 'To Appellate Tribunal' : 'আপিলেট ট্রাইব্যুনাল' },
                { t: 'Writ Petition', d: lang === 'en' ? 'High Court Division' : 'হাইকোর্ট বিভাগ' },
              ].map((o) => (
                <button key={o.t} onClick={() => setStep(1)} className={`text-left rounded-xl border p-4 transition hover:border-teal-400 hover:shadow-card ${o.a ? 'border-teal-400 bg-teal-50/50 ring-2 ring-teal-500/20' : 'border-ink-200 bg-white'}`}>
                  <FileText className="w-5 h-5 text-ink-500" />
                  <div className="mt-2 text-sm font-semibold text-ink-900">{o.t}</div>
                  <div className="text-xs text-ink-500">{o.d}</div>
                </button>
              ))}
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              {[
                { l: lang === 'en' ? 'Applicant name' : 'আবেদকের নাম', v: 'Saif Freight International Ltd.' },
                { l: 'BIN', v: '0107754321' },
                { l: lang === 'en' ? 'Notice reference' : 'নোটিশ রেফারেন্স', v: 'VAT/SCN/2026/4471' },
                { l: lang === 'en' ? 'Issuing authority' : 'ইস্যুকারী কর্তৃপক্ষ', v: 'Commissionerate of Customs, Chattogram' },
              ].map((f) => (
                <div key={f.l}>
                  <label className="label">{f.l}</label>
                  <input className="input" defaultValue={f.v} />
                </div>
              ))}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="label">{lang === 'en' ? 'Subject of dispute' : 'বিরোধের বিষয়'}</label>
                <textarea rows={2} className="input" defaultValue={lang === 'en' ? 'Short-levy of VAT on crude soybean oil import, Bill of Entry C88012.' : ''} />
              </div>
              <div>
                <label className="label">{lang === 'en' ? 'Grounds of reply' : 'জবাবের ভিত্তি'}</label>
                <div className="space-y-2">
                  {['SRO 184/2023 exempts crude soybean oil from VAT under s.4(2)', 'Bill of Entry & LC attached as evidence', 'Assessable value benchmark disputed per Circular 12/2024'].map((g, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg border border-ink-200 p-3 text-sm text-ink-700">
                      <Check className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" /> {g}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {step === 3 && !done && (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 grid place-items-center mx-auto"><FileText className="w-8 h-8" /></div>
              <h3 className="mt-4 text-lg font-bold text-ink-900">{lang === 'en' ? 'Ready to generate' : 'তৈরির জন্য প্রস্তুত'}</h3>
              <p className="mt-1 text-sm text-ink-500">{lang === 'en' ? 'Show Cause Reply · ~1,200 words · NBR format' : 'শো কজ জবাব · ~১,২০০ শব্দ · এনবিআর ফরম্যাট'}</p>
              <button onClick={() => setDone(true)} className="btn-primary mt-5 px-6 py-3">
                {lang === 'en' ? 'Generate draft' : 'ড্রাফট তৈরি করুন'} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
          {done && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-ink-900">{lang === 'en' ? 'Generated draft' : 'তৈরি ড্রাফট'}</h3>
                <div className="flex gap-2">
                  <button className="btn-ghost text-xs"><Eye className="w-3.5 h-3.5" /> {lang === 'en' ? 'Preview' : 'প্রিভিউ'}</button>
                  <button className="btn-outline text-xs py-1.5"><Download className="w-3.5 h-3.5" /> PDF</button>
                </div>
              </div>
              <div className="prose-sm rounded-lg border border-ink-200 bg-ink-50/40 p-5 text-sm leading-relaxed text-ink-800 max-h-96 overflow-y-auto scrollbar-thin font-serif">
                <p className="text-center font-bold text-base">SHOW CAUSE REPLY</p>
                <p className="text-center text-xs text-ink-500">Before the Commissioner of Customs, Chattogram</p>
                <p className="mt-3"><span className="font-semibold">Reference:</span> VAT/SCN/2026/4471 · <span className="font-semibold">Date:</span> 26 October 2026</p>
                <p className="mt-3">The Applicant, <span className="font-semibold">Saif Freight International Ltd.</span> (BIN 0107754321), most respectfully submits the following reply to the Show Cause Notice dated 20 October 2026:</p>
                <p className="mt-2 font-semibold">1. Preliminary Objection</p>
                <p>The impugned notice alleges short-levy of VAT on the import of crude soybean oil under Bill of Entry C88012. The Applicant submits that no VAT was payable on the said import pursuant to <span className="text-teal-700 font-semibold">SRO 184/2023</span>, which exempts crude soybean oil from Value Added Tax under <span className="text-teal-700 font-semibold">section 4(2)</span> of the VAT Act 2012.</p>
                <p className="mt-2 font-semibold">2. Factual Matrix</p>
                <p>The Bill of Entry and Letter of Credit (LC-04567) are annexed herewith as Annexure-A and Annexure-B respectively, evidencing the bona fide import…</p>
                <p className="mt-2 font-semibold">3. Legal Grounds</p>
                <p>i) SRO 184/2023 expressly exempts the supply in question;</p>
                <p>ii) The conditions precedent — submission of BOE and LC copy — have been fulfilled;</p>
                <p>iii) Per Circular 12/2024, the assessable value benchmark of USD 1,180/MT is rebuttable…</p>
                <p className="mt-3 italic text-ink-500">[Draft continues for ~1,200 words — AI-generated, guardrail-verified against NBR corpus.]</p>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          {!done && (
            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="btn-ghost"><ArrowLeft className="w-4 h-4" /> {lang === 'en' ? 'Back' : 'পেছনে'}</button>
              {step < 3 ? (
                <button onClick={() => setStep((s) => s + 1)} className="btn-primary">{lang === 'en' ? 'Continue' : 'এগিয়ে'} <ArrowRight className="w-4 h-4" /></button>
              ) : null}
            </div>
          )}
        </div>

        {/* Live preview side */}
        <div className="card p-5 h-fit lg:sticky lg:top-6">
          <div className="text-xs font-semibold uppercase tracking-wide text-ink-400 mb-3">{lang === 'en' ? 'Live outline' : 'লাইভ রূপরেখা'}</div>
          <ol className="space-y-2.5 text-sm">
            {['Header & reference', 'Preliminary objection', 'Factual matrix', 'Legal grounds', 'Prayer for relief', 'Annexures'].map((o, i) => (
              <li key={o} className="flex items-center gap-2.5">
                <span className={`w-5 h-5 rounded-full grid place-items-center text-[10px] font-bold ${i < (done ? 6 : step) ? 'bg-teal-600 text-white' : 'bg-ink-100 text-ink-400'}`}>{i < (done ? 6 : step) ? <Check className="w-3 h-3" /> : i+1}</span>
                <span className={i < (done ? 6 : step) ? 'text-ink-900 font-medium' : 'text-ink-400'}>{o}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 pt-4 border-t border-ink-100"><AIBadge /></div>
        </div>
      </div>
    </div>
  );
}

export function NoticeView() {
  const { lang } = useApp();
  return (
    <div className="px-6 py-6 max-w-4xl mx-auto">
      <PageHeader
        title={lang === 'en' ? 'Notice Intake' : 'নোটিশ গ্রহণ'}
        subtitle={lang === 'en' ? 'Scan a notice — we extract deadline, section & obligation' : 'নোটিশ স্ক্যান — আমরা সময়সীমা, ধারা ও বাধ্যবাধকতা বের করি'}
        action={<AIBadge />}
      />

      {/* Dropzone */}
      <div className="rounded-2xl border-2 border-dashed border-ink-300 bg-white p-8 text-center">
        <div className="w-12 h-12 rounded-xl bg-ink-900 text-white grid place-items-center mx-auto"><ScanLine className="w-6 h-6" /></div>
        <h3 className="mt-3 text-sm font-semibold text-ink-900">{lang === 'en' ? 'Scan or upload notice' : 'নোটিশ স্ক্যান বা আপলোড'}</h3>
        <p className="text-xs text-ink-500 mt-1">{lang === 'en' ? 'PDF, image — we OCR it' : 'PDF, ছবি — আমরা OCR করি'}</p>
      </div>

      {/* Deadline banner */}
      <div className="mt-6 rounded-xl border-2 border-status-danger/30 bg-gradient-to-r from-status-danger to-status-danger/80 text-white p-5 flex items-center gap-4 shadow-float">
        <div className="w-12 h-12 rounded-lg bg-white/20 grid place-items-center shrink-0"><Clock className="w-6 h-6" /></div>
        <div className="flex-1">
          <div className="text-xs font-semibold uppercase tracking-wide text-white/80">{lang === 'en' ? 'Deadline' : 'সময়সীমা'}</div>
          <div className="text-2xl font-extrabold">{lang === 'en' ? `${notice.deadlineDays} days` : `${notice.deadlineDays} দিন`} <span className="text-base font-medium opacity-90">— {notice.section}</span></div>
        </div>
        <button className="btn bg-white text-status-danger px-4 py-2 text-sm font-semibold hover:bg-white/90">{lang === 'en' ? 'Start reply' : 'জবাব শুরু'}</button>
      </div>

      {/* Extracted details */}
      <div className="mt-6 grid md:grid-cols-2 gap-5">
        <div className="card p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-ink-400 mb-3">{lang === 'en' ? 'Extracted metadata' : 'বের করা মেটাডেটা'}</div>
          <dl className="space-y-3 text-sm">
            {[
              { k: lang === 'en' ? 'Title' : 'শিরোনাম', v: notice.title },
              { k: lang === 'en' ? 'Section' : 'ধারা', v: notice.section },
              { k: lang === 'en' ? 'Issued' : 'ইস্যু', v: notice.issued },
              { k: lang === 'en' ? 'Issuing authority' : 'কর্তৃপক্ষ', v: 'Commissionerate of Customs, Chattogram' },
              { k: lang === 'en' ? 'Severity' : 'গুরুত্ব', v: 'Critical — criminal liability if unanswered' },
            ].map((r) => (
              <div key={r.k} className="flex justify-between gap-4">
                <dt className="text-ink-500 shrink-0">{r.k}</dt>
                <dd className="text-ink-900 font-medium text-right">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="card p-5">
          <div className="text-xs font-semibold uppercase tracking-wide text-ink-400 mb-3">{lang === 'en' ? 'Obligations & timeline' : 'বাধ্যবাধকতা ও সময়রেখা'}</div>
          <div className="space-y-3">
            {[
              { d: 'Day 0', t: lang === 'en' ? 'Notice received' : 'নোটিশ গৃহীত', s: 'done' },
              { d: `Day ${notice.deadlineDays}`, t: lang === 'en' ? 'File Show Cause Reply' : 'শো কজ জবাব দাখিল', s: 'now' },
              { d: `Day ${notice.deadlineDays + 30}`, t: lang === 'en' ? 'Hearing (if listed)' : 'শুনানি (যদি তালিকাভুক্ত)', s: 'future' },
              { d: `Day ${notice.deadlineDays + 90}`, t: lang === 'en' ? 'Appeal window closes' : 'আপিল উইন্ডো বন্ধ', s: 'future' },
            ].map((e, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${e.s === 'done' ? 'bg-status-success' : e.s === 'now' ? 'bg-status-danger ring-4 ring-status-danger/20' : 'bg-ink-200'}`} />
                <div>
                  <div className="text-xs font-semibold text-ink-400">{e.d}</div>
                  <div className={`text-sm ${e.s === 'now' ? 'text-status-danger font-semibold' : 'text-ink-800'}`}>{e.t}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-lg bg-status-warnSoft border border-status-warn/20 px-4 py-3">
        <AlertTriangle className="w-4 h-4 text-status-warn shrink-0 mt-0.5" />
        <p className="text-xs text-ink-700">{lang === 'en' ? 'This notice carries criminal liability under s.98 if not replied within 7 days. We recommend immediate action.' : 'এই নোটিশ s.98 অনুযায়ী ফৌজদারি দায়বদ্ধতা বহন করে। তাৎক্ষণিক ব্যবস্থা নিন।'}</p>
      </div>
    </div>
  );
}
