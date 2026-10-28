import { useState } from 'react';
import {
  MessageSquare, Calculator, GraduationCap, Settings, CreditCard, BookOpen,
  Bell, ChevronDown, Search, Menu, X, ArrowLeft
} from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { t } from '@/lib/i18n';
import { tenant } from '@/lib/data';
import { Logo, LangToggle } from './Brand';
import type { Lang } from '@/lib/i18n';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { route, setRoute, product, setProduct, lang } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navigateTo = (targetRoute: typeof route, targetProduct?: typeof product) => {
    if (targetProduct) setProduct(targetProduct);
    setRoute(targetRoute);
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-ink-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-ink-200 bg-white">
        <div className="px-4 py-4 border-b border-ink-200">
          <button onClick={() => setRoute('landing')} className="hover:opacity-80 transition text-left">
            <Logo />
          </button>
        </div>

        {/* Product toggle */}
        <div className="px-3 pt-4">
          <div className="grid grid-cols-2 gap-1 rounded-lg bg-ink-100 p-1 text-xs font-semibold">
            <button
              onClick={() => { setProduct('tax'); setRoute('chat'); }}
              className={`rounded-md py-2 transition ${product === 'tax' ? 'bg-white text-ink-900 shadow-card' : 'text-ink-500 hover:text-ink-800'}`}
            >
              Tax & Customs
            </button>
            <button
              onClick={() => { setProduct('academy'); setRoute('academy'); }}
              className={`rounded-md py-2 transition ${product === 'academy' ? 'bg-white text-ink-900 shadow-card' : 'text-ink-500 hover:text-ink-800'}`}
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
            <p className="text-[11px] leading-relaxed text-ink-500">
              {lang === 'en'
                ? 'Outputs are verified against NBR law corpus before display.'
                : 'প্রদর্শনের পূর্বে এনবিআর আইন কর্পাসের বিরুদ্ধে যাচাই করা হয়।'}
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer (Slide-over) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm transition-opacity animate-fade-up"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-72 max-w-[82vw] bg-white h-full shadow-2xl flex flex-col z-10 border-r border-ink-200">
            <div className="p-4 border-b border-ink-200 flex items-center justify-between">
              <button onClick={() => navigateTo('landing')} className="hover:opacity-80 transition text-left">
                <Logo size="sm" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-ink-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product toggle */}
            <div className="px-3 pt-3 pb-2">
              <div className="grid grid-cols-2 gap-1 rounded-lg bg-ink-100 p-1 text-xs font-semibold">
                <button
                  onClick={() => { setProduct('tax'); setRoute('chat'); setMobileMenuOpen(false); }}
                  className={`rounded-md py-2 transition ${product === 'tax' ? 'bg-white text-ink-900 shadow-card' : 'text-ink-500'}`}
                >
                  Tax & Customs
                </button>
                <button
                  onClick={() => { setProduct('academy'); setRoute('academy'); setMobileMenuOpen(false); }}
                  className={`rounded-md py-2 transition ${product === 'academy' ? 'bg-white text-ink-900 shadow-card' : 'text-ink-500'}`}
                >
                  AI Academy
                </button>
              </div>
            </div>

            <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto scrollbar-thin">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                {product === 'tax' ? 'Workspace Modules' : 'Learning Dashboard'}
              </div>
              {nav.map((n) => (
                <button
                  key={n.id}
                  onClick={() => navigateTo(n.id as typeof route)}
                  className={`nav-item w-full ${route === n.id ? 'nav-item-active' : ''}`}
                >
                  <n.icon className="w-4 h-4 shrink-0" />
                  {t(n.key, lang)}
                </button>
              ))}

              <div className="px-3 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                {product === 'tax' ? 'Switch to Academy' : 'Switch to Tax Platform'}
              </div>
              {(product === 'tax' ? acadNav : taxNav).map((n) => (
                <button
                  key={n.id}
                  onClick={() => navigateTo(n.id as typeof route, product === 'tax' ? 'academy' : 'tax')}
                  className="nav-item w-full text-ink-500"
                >
                  <n.icon className="w-4 h-4 shrink-0" />
                  {t(n.key, lang)}
                </button>
              ))}
            </nav>

            <div className="p-3 border-t border-ink-200 bg-ink-50 space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ink-700 to-teal-600 grid place-items-center text-white text-xs font-bold shrink-0">
                  {tenant.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-ink-900 truncate">{tenant.name}</div>
                  <div className="text-[10px] text-ink-400 truncate">{tenant.plan}</div>
                </div>
              </div>
              <button
                onClick={() => navigateTo('landing')}
                className="w-full btn-outline text-xs py-1.5 flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> {lang === 'en' ? 'Back to Landing' : 'ল্যান্ডিং পেজে ফিরুন'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 sm:h-16 shrink-0 items-center justify-between border-b border-ink-200 bg-white px-3 sm:px-4 md:px-6">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 -ml-1 text-ink-600 hover:text-ink-900 rounded-lg hover:bg-ink-100 transition active:scale-95"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button onClick={() => setRoute('landing')} className="md:hidden hover:opacity-80 transition">
              <Logo size="sm" />
            </button>

            <div className="hidden md:block min-w-0">
              <div className="text-sm font-semibold text-ink-900 truncate">{tenant.name}</div>
              <div className="flex items-center gap-2 text-[11px] text-ink-400">
                <span className="chip bg-ink-100 text-ink-600 py-0.5">{tenant.role[lang as Lang]}</span>
                <span>· {tenant.plan}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <div className="hidden lg:flex items-center gap-2 rounded-lg border border-ink-200 bg-ink-50 px-3 py-2 w-64">
              <Search className="w-4 h-4 text-ink-400" />
              <input
                placeholder={lang === 'en' ? 'Search SROs, HS codes…' : 'এসআরও খুঁজুন…'}
                className="bg-transparent text-sm outline-none w-full placeholder:text-ink-400"
              />
            </div>
            <LangToggle />
            <button className="relative btn-ghost p-2" aria-label="Notifications">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-status-danger" />
            </button>
            <div className="flex items-center gap-1 sm:gap-2 rounded-lg p-1 hover:bg-ink-100 transition cursor-pointer">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-ink-700 to-teal-600 grid place-items-center text-white text-xs font-bold">
                {tenant.initials}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-ink-400 hidden sm:block" />
            </div>
          </div>
        </header>

        {/* Scrollable View Content with safe area for mobile bottom nav */}
        <main className="flex-1 overflow-y-auto scrollbar-thin pb-20 md:pb-6">
          {children}
        </main>

        {/* Mobile Bottom Navigation Bar (fixed bottom) */}
        <nav className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-white/95 backdrop-blur-md border-t border-ink-200 px-3 py-1.5 shadow-lg flex items-center justify-around">
          {product === 'tax' ? (
            <>
              <button
                onClick={() => setRoute('chat')}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-semibold transition ${route === 'chat' ? 'text-teal-600 font-bold' : 'text-ink-500'}`}
              >
                <MessageSquare className="w-5 h-5" />
                {lang === 'en' ? 'AI Chat' : 'চ্যাট'}
              </button>
              <button
                onClick={() => setRoute('calc')}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-semibold transition ${route === 'calc' ? 'text-teal-600 font-bold' : 'text-ink-500'}`}
              >
                <Calculator className="w-5 h-5" />
                {lang === 'en' ? 'Tax Calc' : 'হিসাব'}
              </button>
              <button
                onClick={() => { setProduct('academy'); setRoute('academy'); }}
                className="flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-semibold text-ink-500 hover:text-ink-900 transition"
              >
                <GraduationCap className="w-5 h-5" />
                {lang === 'en' ? 'Academy' : 'একাডেমি'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-semibold text-ink-500 hover:text-ink-900 transition"
              >
                <Menu className="w-5 h-5" />
                {lang === 'en' ? 'Menu' : 'মেনু'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setRoute('academy')}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-semibold transition ${route === 'academy' ? 'text-teal-600 font-bold' : 'text-ink-500'}`}
              >
                <GraduationCap className="w-5 h-5" />
                {lang === 'en' ? 'Dashboard' : 'ড্যাশবোর্ড'}
              </button>
              <button
                onClick={() => setRoute('courses')}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-semibold transition ${route === 'courses' ? 'text-teal-600 font-bold' : 'text-ink-500'}`}
              >
                <BookOpen className="w-5 h-5" />
                {lang === 'en' ? 'Courses' : 'কোর্স'}
              </button>
              <button
                onClick={() => { setProduct('tax'); setRoute('chat'); }}
                className="flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-semibold text-ink-500 hover:text-ink-900 transition"
              >
                <MessageSquare className="w-5 h-5" />
                {lang === 'en' ? 'Tax AI' : 'ট্যাক্স'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-semibold text-ink-500 hover:text-ink-900 transition"
              >
                <Menu className="w-5 h-5" />
                {lang === 'en' ? 'Menu' : 'মেনু'}
              </button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
