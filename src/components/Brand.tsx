import { useApp } from '@/lib/app-context';
import { t } from '@/lib/i18n';

export function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const { lang } = useApp();
  const dims = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const text = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg';
  return (
    <div className="flex items-center gap-2.5">
      <div className={`${dims} relative grid place-items-center rounded-lg bg-ink-900 text-white`}>
        <svg viewBox="0 0 24 24" className="w-2/3 h-2/3" fill="none">
          <path d="M4 14L9 9L13 13L20 5" stroke="#38b89f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="20" cy="5" r="2.2" fill="#38b89f" />
          <path d="M4 19H20" stroke="#a8b7cc" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className={`${text} font-bold text-ink-900 tracking-tight`}>{t('appName', lang)}</div>
        {size !== 'sm' && (
          <div className="text-[10px] font-medium text-ink-400 uppercase tracking-widest">AI · Tax & Customs</div>
        )}
      </div>
    </div>
  );
}

export function AIBadge(_props: { className?: string } = {}) {
  return null;
}

export function LangToggle() {
  const { lang, setLang } = useApp();
  return (
    <div className="inline-flex items-center rounded-lg border border-ink-200 bg-white p-0.5 text-xs font-semibold">
      <button
        onClick={() => setLang('en')}
        className={`px-2.5 py-1 rounded-md transition ${lang === 'en' ? 'bg-ink-900 text-white' : 'text-ink-500 hover:text-ink-800'}`}
      >
        EN
      </button>
      <button
        onClick={() => setLang('bn')}
        className={`px-2.5 py-1 rounded-md transition ${lang === 'bn' ? 'bg-ink-900 text-white' : 'text-ink-500 hover:text-ink-800'}`}
      >
        বাং
      </button>
    </div>
  );
}
