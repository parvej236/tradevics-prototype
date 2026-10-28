import { MessageSquare, Calculator, GraduationCap, Settings, CreditCard, BookOpen, Bell, ChevronDown, Search } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { t } from '@/lib/i18n';
import { tenant } from '@/lib/data';
import { Logo, AIBadge, LangToggle } from './Brand';
import type { Lang } from '@/lib/i18n';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { route, setRoute, product, setProduct, lang } = useApp();

  const taxNav = [
    { id: 'chat', icon: MessageSquare, key: 'chat' as const },
    { id: 'calc', icon: Calculator, key: 'calc' as const },
  ];
  const acadNav = [
    { id: 'academy', icon: GraduationCap, key: 'academy' as const },
    { id: 'courses', icon: BookOpen, key: 'courses' as const },
    { id: 'admin', icon: Settings, key: 'admin' as const },
    { id: 'subscriptions', icon: CreditCard, key: 'subscriptions' as const },
  ];

  const nav = product === 'tax' ? taxNav : acadNav;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-ink-50">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-ink-200 bg-white">
        <div className="px-4 py-4 border-b border-ink-200">
          <button onClick={() => setRoute('landing')} className="hover:opacity-80 transition">
            <Logo />
          </button>
        </div>

        {/* Product toggle */}
        <div className="px-3 pt-4">
          <div className="grid grid-cols-2 gap-1 rounded-lg bg-ink-100 p-1 text-xs font-semibold">
            <button
              onClick={() => { setProduct('tax'); setRoute('chat'); }}
              className={`rounded-md py-2 transition ${product === 'tax' ? 'bg-white text-ink-900 shadow-card' : 'text-ink-500'}`}
            >
              Tax & Customs
            </button>
            <button
              onClick={() => { setProduct('academy'); setRoute('academy'); }}
              className={`rounded-md py-2 transition ${product === 'academy' ? 'bg-white text-ink-900 shadow-card' : 'text-ink-500'}`}
            >
              AI Academy
            </button>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">
            {product === 'tax' ? 'Workspace' : 'Learning'}
          </div>
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => setRoute(n.id as typeof route)}
              className={`nav-item w-full ${route === n.id ? 'nav-item-active' : ''}`}
            >
              <n.icon className="w-4 h-4 shrink-0" />
              {t(n.key, lang)}
            </button>
          ))}
          {product === 'tax' && (
            <>
              <div className="px-3 pt-5 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">Platform</div>
              {acadNav.map((n) => (
                <button
                  key={n.id}
                  onClick={() => { setProduct('academy'); setRoute(n.id as typeof route); }}
                  className="nav-item w-full"
                >
                  <n.icon className="w-4 h-4 shrink-0" />
                  {t(n.key, lang)}
                </button>
              ))}
            </>
          )}
        </nav>

        <div className="border-t border-ink-200 p-3">
          <div className="rounded-lg bg-ink-50 p-3">
            <AIBadge />
            <p className="mt-2 text-[11px] leading-relaxed text-ink-500">
              {lang === 'en'
                ? 'Outputs are verified against NBR law corpus before display.'
                : 'প্রদর্শনের পূর্বে এনবিআর আইন কর্পাসের বিরুদ্ধে যাচাই করা হয়।'}
            </p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-4 md:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="md:hidden"><Logo size="sm" /></div>
            <div className="hidden md:block min-w-0">
              <div className="text-sm font-semibold text-ink-900 truncate">{tenant.name}</div>
              <div className="flex items-center gap-2 text-[11px] text-ink-400">
                <span className="chip bg-ink-100 text-ink-600">{tenant.role[lang as Lang]}</span>
                <span>· {tenant.plan}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden lg:flex items-center gap-2 rounded-lg border border-ink-200 bg-ink-50 px-3 py-2 w-64">
              <Search className="w-4 h-4 text-ink-400" />
              <input placeholder={lang === 'en' ? 'Search SROs, HS codes…' : 'এসআরও খুঁজুন…'} className="bg-transparent text-sm outline-none w-full placeholder:text-ink-400" />
            </div>
            <LangToggle />
            <button className="relative btn-ghost p-2">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-status-danger" />
            </button>
            <button className="flex items-center gap-2 rounded-lg p-1 pr-2 hover:bg-ink-100 transition">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ink-700 to-teal-600 grid place-items-center text-white text-xs font-bold">
                {tenant.initials}
              </div>
              <ChevronDown className="w-4 h-4 text-ink-400" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
