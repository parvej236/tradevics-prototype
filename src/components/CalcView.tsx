import { Fragment, useState } from 'react';
import { ChevronDown, ChevronRight, Calculator, ShieldCheck, FileSpreadsheet, Check, X } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { PageHeader } from './ui';
import { taxLedger, totalTaxIncidence, assessableValue } from '@/lib/data';
import { bdt } from '@/lib/i18n';
import type { Lang } from '@/lib/i18n';

export function CalcView() {
  const { lang } = useApp();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ cd: true });

  return (
    <div className="px-3 sm:px-6 py-4 sm:py-6 max-w-5xl mx-auto">
      <PageHeader
        title={lang === 'en' ? 'Deterministic Tax Calculator' : 'নির্ধারিত ট্যাক্স ক্যালকুলেটর'}
        subtitle={lang === 'en' ? 'Auditable ledger · CD, RD, SD, VAT, AIT, AT — with SRO exemptions' : 'অডিটযোগ্য লেজার · সিডি, আরডি, এসডি, ভ্যাট, এআইটি, এটি — SRO অব্যাহতি সহ'}
      />

      {/* Inputs summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
        {[
          { l: lang === 'en' ? 'Assessable Value' : 'নিরূপণযোগ্য মূল্য', v: bdt(assessableValue, lang as Lang), s: 'USD 5,000 × 177' },
          { l: 'HS Code', v: '1517.10.00', s: lang === 'en' ? 'Margarine · edible' : 'মার্জারিন · ভোগ্য' },
          { l: lang === 'en' ? 'Applicable SRO' : 'প্রযোজ্য SRO', v: 'SRO 184/2023', s: lang === 'en' ? 'VAT exempt' : 'ভ্যাট অব্যাহতিকৃত' },
        ].map((c) => (
          <div key={c.l} className="card p-3.5 sm:p-4">
            <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-ink-400">{c.l}</div>
            <div className="mt-1 text-base sm:text-lg font-bold text-ink-900">{c.v}</div>
            <div className="text-xs text-ink-500 mt-0.5">{c.s}</div>
          </div>
        ))}
      </div>

      {/* Ledger table */}
      <div className="card overflow-hidden">
        <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-ink-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-ink-500" />
            <h3 className="text-sm font-bold text-ink-900">{lang === 'en' ? 'Auditable tax ledger' : 'অডিটযোগ্য ট্যাক্স লেজার'}</h3>
          </div>
          <span className="chip bg-teal-50 text-teal-700 border border-teal-200"><ShieldCheck className="w-3 h-3" /> {lang === 'en' ? 'Deterministic' : 'নির্ধারিত'}</span>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-ink-400 bg-ink-50/50">
                <th className="px-4 sm:px-5 py-3 font-semibold">{lang === 'en' ? 'Component' : 'উপাদান'}</th>
                <th className="px-4 sm:px-5 py-3 font-semibold">Rate</th>
                <th className="px-4 sm:px-5 py-3 font-semibold">{lang === 'en' ? 'Base' : 'ভিত্তি'}</th>
                <th className="px-4 sm:px-5 py-3 font-semibold text-right">{lang === 'en' ? 'Amount' : 'পরিমাণ'}</th>
                <th className="px-4 sm:px-5 py-3 font-semibold text-right">{lang === 'en' ? 'Steps' : 'ধাপ'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {taxLedger.map((l) => (
                <Fragment key={l.key}>
                  <tr className={`hover:bg-ink-50/50 transition ${l.exempt ? 'opacity-60' : ''}`}>
                    <td className="px-4 sm:px-5 py-3 sm:py-3.5">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <button onClick={() => setExpanded((e) => ({ ...e, [l.key]: !e[l.key] }))} className="text-ink-400 hover:text-ink-700">
                          {expanded[l.key] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                        <span className={`font-medium ${l.exempt ? 'line-through text-ink-500' : 'text-ink-900'}`}>{l.name[lang as Lang]}</span>
                        {l.exempt && <span className="chip bg-status-successSoft text-status-success text-[10px] py-0.5"><Check className="w-3 h-3" /> EXEMPT</span>}
                      </div>
                    </td>
                    <td className="px-4 sm:px-5 py-3 sm:py-3.5 text-ink-700 font-mono text-xs sm:text-sm">{l.rate}</td>
                    <td className="px-4 sm:px-5 py-3 sm:py-3.5 text-ink-600 text-xs">{l.base}</td>
                    <td className="px-4 sm:px-5 py-3 sm:py-3.5 text-right font-mono text-xs sm:text-sm">
                      <span className={l.exempt ? 'line-through text-ink-400' : 'font-semibold text-ink-900'}>
                        {bdt(l.amount, lang as Lang)}
                      </span>
                    </td>
                    <td className="px-4 sm:px-5 py-3 sm:py-3.5 text-right">
                      <span className="text-[11px] sm:text-xs text-ink-400 font-mono">{l.formula[lang as Lang].split('=')[0].trim()}</span>
                    </td>
                  </tr>
                  {expanded[l.key] && (
                    <tr className="bg-ink-50/40">
                      <td colSpan={5} className="px-4 sm:px-5 py-3 sm:py-4">
                        <div className="ml-2 sm:ml-6 rounded-lg border border-ink-200 bg-white p-3">
                          <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-ink-400 mb-1">{lang === 'en' ? 'Formula step' : 'সূত্র ধাপ'}</div>
                          <code className="text-xs font-mono text-ink-800 block break-all">{l.formula[lang as Lang]}</code>
                          <div className="mt-2 flex items-center gap-2 text-xs">
                            {l.exempt ? (
                              <span className="flex items-center gap-1 text-status-success font-semibold"><Check className="w-3.5 h-3.5" /> SRO 184/2023 exemption applied — amount struck off</span>
                            ) : (
                              <span className="flex items-center gap-1 text-ink-500"><Calculator className="w-3.5 h-3.5" /> {lang === 'en' ? 'Computed deterministically' : 'নির্ধারিতভাবে গণনা'}</span>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-ink-900 text-white">
                <td colSpan={3} className="px-4 sm:px-5 py-3.5 sm:py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wide text-ink-300">{lang === 'en' ? 'Total Tax Incidence' : 'মোট ট্যাক্স ঘটনা'}</span>
                  </div>
                </td>
                <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-right text-base sm:text-xl font-extrabold">{bdt(totalTaxIncidence, lang as Lang)}</td>
                <td className="px-4 sm:px-5 py-3.5 sm:py-4 text-right text-[11px] sm:text-xs text-ink-300">{((totalTaxIncidence / assessableValue) * 100).toFixed(1)}% of AV</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* exemption legend */}
      <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-ink-500">
        <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-status-success" /> {lang === 'en' ? 'SRO exemption applied' : 'SRO অব্যাহতি প্রয়োগ'}</span>
        <span className="flex items-center gap-1.5"><X className="w-3.5 h-3.5 text-ink-400" /> {lang === 'en' ? 'Strikethrough = waived' : 'কাটা = মওকুফ'}</span>
        <span className="flex items-center gap-1.5"><Calculator className="w-3.5 h-3.5 text-teal-500" /> {lang === 'en' ? 'Every step auditable & exportable' : 'প্রতিটি ধাপ অডিটযোগ্য'}</span>
      </div>
    </div>
  );
}
