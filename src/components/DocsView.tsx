import { useState } from 'react';
import { UploadCloud, FileCheck2, AlertTriangle, FileText, X, Paperclip, AlertCircle, Check, ShieldCheck } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { PageHeader } from './ui';
import { seedDocs, discrepancies, type DocKind } from '@/lib/data';

const kindColor: Record<DocKind, string> = {
  BOE: 'bg-blue-50 text-blue-700 border-blue-200',
  Invoice: 'bg-teal-50 text-teal-700 border-teal-200',
  LC: 'bg-amber-50 text-amber-700 border-amber-200',
};

const sevColor = {
  high: 'bg-status-dangerSoft text-status-danger border-status-danger/20',
  medium: 'bg-status-warnSoft text-status-warn border-status-warn/20',
  low: 'bg-ink-100 text-ink-600 border-ink-200',
};

export function DocsView() {
  const { lang } = useApp();
  const [docs, setDocs] = useState(seedDocs);
  const [dragOver, setDragOver] = useState(false);
  const [justifyOpen, setJustifyOpen] = useState<string | null>(null);

  const addMock = (kind: DocKind) => {
    const id = `d${Date.now()}`;
    setDocs((p) => [...p, {
      id, name: `${kind === 'BOE' ? 'Bill-of-Entry' : kind === 'Invoice' ? 'Invoice' : 'LC'}-${Math.floor(Math.random()*99999)}.pdf`,
      kind, status: 'extracted',
      fields: [
        { label: 'HS Code', value: '1507.10.00', flag: 'ok' },
        { label: 'Value', value: 'USD 1,180/MT', flag: 'ok' },
        { label: 'Importer', value: 'Saif Freight' },
      ],
    }]);
  };

  return (
    <div className="px-3 sm:px-6 py-4 sm:py-6 max-w-6xl mx-auto">
      <PageHeader
        title={lang === 'en' ? 'Document Upload & Cross-Check' : 'ডকুমেন্ট আপলোড ও ক্রস-চেক'}
        subtitle={lang === 'en' ? 'Drop BOE, Invoice, LC — structured extraction & discrepancy engine' : 'বিওই, ইনভয়েস, এলসি — স্ট্রাকচার্ড এক্সট্র্যাকশন ও অমিল ইঞ্জিন'}
      />

      {/* Dropzone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addMock('BOE'); }}
        className={`rounded-2xl border-2 border-dashed p-6 sm:p-10 text-center transition cursor-pointer ${dragOver ? 'border-teal-500 bg-teal-50/50' : 'border-ink-300 bg-white hover:border-teal-400'}`}
        onClick={() => addMock('BOE')}
      >
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-ink-900 text-white grid place-items-center mx-auto">
          <UploadCloud className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <h3 className="mt-3.5 sm:mt-4 text-sm sm:text-base font-semibold text-ink-900">{lang === 'en' ? 'Drag documents here' : 'ডকুমেন্ট এখানে টেনে আনুন'}</h3>
        <p className="mt-1 text-xs sm:text-sm text-ink-500">{lang === 'en' ? 'PDF, JPG, PNG · Bill of Entry, Invoice, LC' : 'PDF, JPG, PNG · বিল অফ এন্ট্রি, ইনভয়েস, এলসি'}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {(['BOE', 'Invoice', 'LC'] as DocKind[]).map((k) => (
            <button key={k} onClick={(e) => { e.stopPropagation(); addMock(k); }} className={`chip border ${kindColor[k]} hover:brightness-95`}>
              <Paperclip className="w-3 h-3" /> + {k}
            </button>
          ))}
        </div>
      </div>

      {/* Extraction cards */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {docs.map((d) => (
          <div key={d.id} className="card overflow-hidden animate-fade-up">
            <div className="flex items-center justify-between px-4 py-3 border-b border-ink-100 bg-ink-50/50">
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-ink-500 shrink-0" />
                <span className="text-sm font-semibold text-ink-800 truncate">{d.name}</span>
              </div>
              <span className={`chip border ${kindColor[d.kind]} shrink-0`}>{d.kind}</span>
            </div>
            <div className="p-4 space-y-2.5">
              {d.fields.map((f) => (
                <div key={f.label} className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-ink-500">{f.label}</span>
                  <span className={`flex items-center gap-1.5 font-medium ${f.flag === 'mismatch' ? 'text-status-danger' : f.flag === 'warn' ? 'text-status-warn' : 'text-ink-900'}`}>
                    {f.flag === 'mismatch' && <AlertCircle className="w-3.5 h-3.5" />}
                    {f.flag === 'warn' && <AlertTriangle className="w-3.5 h-3.5" />}
                    {f.flag === 'ok' && <Check className="w-3.5 h-3.5 text-status-success" />}
                    {f.value}
                  </span>
                </div>
              ))}
              <div className="pt-2 mt-1 border-t border-ink-100 flex items-center gap-1.5 text-xs font-semibold text-status-success">
                <FileCheck2 className="w-3.5 h-3.5" /> {lang === 'en' ? 'Extraction complete' : 'এক্সট্র্যাকশন সম্পূর্ণ'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Anomaly alert */}
      <div className="mt-5 sm:mt-6 rounded-xl border border-status-danger/20 bg-gradient-to-r from-status-dangerSoft to-white p-4 sm:p-5 flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        <div className="flex items-start gap-3 w-full sm:w-auto">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-status-danger text-white grid place-items-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0 sm:hidden">
            <h4 className="text-sm font-bold text-ink-900">{lang === 'en' ? 'Anomaly detected' : 'অস্বাভাবিকতা শনাক্ত'}</h4>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-ink-900 hidden sm:block">{lang === 'en' ? 'Anomaly detected' : 'অস্বাভাবিকতা শনাক্ত'}</h4>
          <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-ink-700 leading-relaxed">
            {lang === 'en' ? 'Declared value 9% below benchmark (USD 1,180/MT). ' : 'ঘোষিত মূল্য বেঞ্চমার্কের ৯% নিচে (USD 1,180/MT)。'}
            <span className="font-semibold">{lang === 'en' ? 'Likely to trigger a value query under s.32.' : 's.32 অনুযায়ী ভ্যালু কোয়েরি ট্রিগার হতে পারে।'}</span>
          </p>
        </div>
        <button onClick={() => setJustifyOpen('dp2')} className="w-full sm:w-auto btn-outline text-status-danger border-status-danger/30 hover:bg-status-dangerSoft px-4 py-2 shrink-0 text-xs sm:text-sm">
          {lang === 'en' ? 'Attach justification' : 'জবাবিয়া সংযুক্ত করুন'}
        </button>
      </div>

      {/* Discrepancy table */}
      <div className="mt-6 sm:mt-8 card overflow-hidden">
        <div className="px-4 sm:px-5 py-3.5 sm:py-4 border-b border-ink-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-ink-900">{lang === 'en' ? 'Discrepancy table' : 'অমিল ছক'}</h3>
          <span className="chip bg-status-dangerSoft text-status-danger">{discrepancies.length} {lang === 'en' ? 'issues' : 'সমস্যা'}</span>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm min-w-[560px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-ink-400 bg-ink-50/50">
                <th className="px-4 sm:px-5 py-3 font-semibold">{lang === 'en' ? 'Severity' : 'গুরুত্ব'}</th>
                <th className="px-4 sm:px-5 py-3 font-semibold">{lang === 'en' ? 'Field' : 'ক্ষেত্র'}</th>
                <th className="px-4 sm:px-5 py-3 font-semibold">Bill of Entry</th>
                <th className="px-4 sm:px-5 py-3 font-semibold">Invoice</th>
                <th className="px-4 sm:px-5 py-3 font-semibold">{lang === 'en' ? 'Note' : 'নোট'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {discrepancies.map((d) => (
                <tr key={d.id} className="hover:bg-ink-50/50 transition">
                  <td className="px-4 sm:px-5 py-3 sm:py-3.5">
                    <span className={`chip border capitalize ${sevColor[d.severity]}`}>{d.severity}</span>
                  </td>
                  <td className="px-4 sm:px-5 py-3 sm:py-3.5 font-medium text-ink-900">{d.field}</td>
                  <td className="px-4 sm:px-5 py-3 sm:py-3.5 text-ink-700 font-mono text-xs">{d.boe}</td>
                  <td className="px-4 sm:px-5 py-3 sm:py-3.5 text-ink-700 font-mono text-xs">{d.invoice}</td>
                  <td className="px-4 sm:px-5 py-3 sm:py-3.5 text-ink-600 text-xs leading-relaxed max-w-xs">{d.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Justification modal */}
      {justifyOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink-950/40 backdrop-blur-sm p-3.5 sm:p-4" onClick={() => setJustifyOpen(null)}>
          <div className="w-full max-w-lg card p-4 sm:p-6 animate-fade-up max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-status-warnSoft text-status-warn grid place-items-center"><ShieldCheck className="w-5 h-5" /></div>
                <div>
                  <h3 className="text-base font-bold text-ink-900">{lang === 'en' ? 'Attach justification' : 'জবাবিয়া সংযুক্ত করুন'}</h3>
                  <p className="text-xs text-ink-500">{lang === 'en' ? 'For declared-value variance' : 'ঘোষিত মূল্যের পার্থক্যের জন্য'}</p>
                </div>
              </div>
              <button onClick={() => setJustifyOpen(null)} className="btn-ghost p-1.5"><X className="w-4 h-4" /></button>
            </div>
            <div className="mt-5 space-y-4">
              <div>
                <label className="label">{lang === 'en' ? 'Reason' : 'কারণ'}</label>
                <select className="input">
                  <option>{lang === 'en' ? 'Market price decline (currency effect)' : 'বাজার মূল্য পতন (মুদ্রা প্রভাব)'}</option>
                  <option>{lang === 'en' ? 'Bulk discount from supplier' : 'সরবরাহকারীর বাল্ক ছাড়'}</option>
                  <option>{lang === 'en' ? 'Quality grade difference' : 'গুণমান গ্রেড পার্থক্য'}</option>
                </select>
              </div>
              <div>
                <label className="label">{lang === 'en' ? 'Supporting documents' : 'সহায়ক ডকুমেন্ট'}</label>
                <div className="rounded-lg border border-dashed border-ink-300 p-4 text-center text-xs text-ink-500">
                  <Paperclip className="w-5 h-5 mx-auto mb-1.5 text-ink-400" />
                  {lang === 'en' ? 'Drop supplier invoice, market quotation, L/C amendment' : 'সরবরাহকারী ইনভয়েস, বাজার উদ্ধৃতি, এলসি সংশোধন'}
                </div>
              </div>
              <div>
                <label className="label">{lang === 'en' ? 'Memo (AI-drafted)' : 'স্মারকলিপি (এআই-তৈরি)'}</label>
                <textarea rows={3} className="input" defaultValue={lang === 'en' ? 'Per Circular 12/2024, the variance of 9% from the USD 1,180/MT benchmark reflects a market correction effective Oct 2026. Supplier Cargill Argentina issued revised pricing under contract ARG-SOY-0456.' : ''} />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setJustifyOpen(null)} className="btn-ghost">{lang === 'en' ? 'Cancel' : 'বাতিল'}</button>
              <button onClick={() => setJustifyOpen(null)} className="btn-primary">{lang === 'en' ? 'Attach & save' : 'সংযুক্ত করুন'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
