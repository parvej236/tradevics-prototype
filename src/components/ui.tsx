import { useState, type ReactNode } from 'react';
import { citations } from '@/lib/data';
import { FileText, Scale, BookOpen, FileBadge } from 'lucide-react';

const kindIcon: Record<string, typeof FileText> = {
  SRO: FileBadge,
  section: Scale,
  circular: BookOpen,
  act: FileText,
};

const kindColor: Record<string, string> = {
  SRO: 'bg-teal-50 text-teal-700 border-teal-200',
  section: 'bg-ink-100 text-ink-700 border-ink-200',
  circular: 'bg-amber-50 text-amber-700 border-amber-200',
  act: 'bg-blue-50 text-blue-700 border-blue-200',
};

export function CitationChip({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const c = citations[id];
  if (!c) return null;
  const Icon = kindIcon[c.kind] ?? FileText;
  return (
    <span className="relative inline-flex">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`chip border ${kindColor[c.kind]} hover:brightness-95 transition cursor-pointer`}
      >
        <Icon className="w-3 h-3" />
        {c.label}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full z-50 mt-2 w-80 rounded-xl border border-ink-200 bg-white p-4 shadow-float animate-fade-up">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-ink-500" />
              <div className="text-xs font-bold uppercase tracking-wide text-ink-400">{c.kind}</div>
            </div>
            <div className="mt-1.5 text-sm font-semibold text-ink-900">{c.title}</div>
            <p className="mt-2 text-xs leading-relaxed text-ink-600 border-l-2 border-teal-300 pl-3 italic">
              {c.text}
            </p>
            <button className="mt-3 text-xs font-semibold text-teal-600 hover:text-teal-700">
              Open in law corpus →
            </button>
          </div>
        </>
      )}
    </span>
  );
}

export function StatusPill({ status }: { status: 'ok' | 'warn' | 'danger' | 'info' }) {
  const map = {
    ok: 'bg-status-successSoft text-status-success',
    warn: 'bg-status-warnSoft text-status-warn',
    danger: 'bg-status-dangerSoft text-status-danger',
    info: 'bg-ink-100 text-ink-600',
  };
  const label = { ok: 'Verified', warn: 'Review', danger: 'Action', info: 'Info' };
  return <span className={`chip ${map[status]}`}>{label[status]}</span>;
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
