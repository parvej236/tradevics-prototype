import { useState, useRef, useEffect, Fragment } from 'react';
import { Send, Mic, Paperclip, Volume2, Type, AlertTriangle, Sparkles, FileText, Package, Landmark, Percent, ArrowLeft, ArrowRight } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { AIBadge } from './Brand';
import { CitationChip, PageHeader } from './ui';
import {
  seedChat, streamedReply,
  seedChatCustoms, streamedReplyCustoms,
  seedChatTax, streamedReplyTax,
  type ChatTurn,
} from '@/lib/data';
import type { Lang } from '@/lib/i18n';

type AssistantId = 'customs' | 'tax' | 'vat';

type AssistantConfig = {
  id: AssistantId;
  icon: typeof Package;
  name: { en: string; bn: string };
  tagline: { en: string; bn: string };
  subtitle: { en: string; bn: string };
  placeholder: { en: string; bn: string };
  suggestions: { en: string[]; bn: string[] };
  seed: ChatTurn[];
  streamed: string;
};

const assistants: AssistantConfig[] = [
  {
    id: 'customs',
    icon: Package,
    name: { en: 'Customs AI', bn: 'কাস্টমস এআই' },
    tagline: { en: 'HS classification, duties & customs valuation', bn: 'এইচএস ক্লাসিফিকেশন, শুল্ক ও কাস্টমস ভ্যালুয়েশন' },
    subtitle: { en: 'Grounded in HS codes, Customs Act & valuation rulings', bn: 'এইচএস কোড, কাস্টমস আইন ও ভ্যালুয়েশন রুলিং-ভিত্তিক' },
    placeholder: { en: 'Ask about HS codes, CD/RD, customs valuation…', bn: 'এইচএস কোড, সিডি/আরডি, ভ্যালুয়েশন সম্পর্কে জিজ্ঞাসা…' },
    suggestions: {
      en: ['What HS code applies to margarine imports?', 'Explain CD vs RD', 'Customs valuation under WTO Agreement'],
      bn: ['মার্জারিন আমদানিতে কোন এইচএস কোড?', 'সিডি বনাম আরডি ব্যাখ্যা', 'WTO চুক্তির আওতায় কাস্টমস ভ্যালুয়েশন'],
    },
    seed: seedChatCustoms,
    streamed: streamedReplyCustoms,
  },
  {
    id: 'tax',
    icon: Landmark,
    name: { en: 'Tax AI', bn: 'ট্যাক্স এআই' },
    tagline: { en: 'Income tax, AIT & corporate tax guidance', bn: 'আয়কর, এআইটি ও কর্পোরেট ট্যাক্স গাইডেন্স' },
    subtitle: { en: 'Grounded in the Income Tax Ordinance & Finance Act', bn: 'আয়কর অধ্যাদেশ ও অর্থ আইন-ভিত্তিক' },
    placeholder: { en: 'Ask about AIT, corporate tax, assessment…', bn: 'এআইটি, কর্পোরেট ট্যাক্স, নিরূপণ সম্পর্কে জিজ্ঞাসা…' },
    suggestions: {
      en: ['What AIT rate applies on this import?', 'Is AIT adjustable against final tax?', 'Draft a reply to an income tax notice'],
      bn: ['এই আমদানিতে কোন এআইটি হার?', 'এআইটি চূড়ান্ত করের বিপরীতে সমন্বয়যোগ্য?', 'আয়কর নোটিশের জবাব তৈরি'],
    },
    seed: seedChatTax,
    streamed: streamedReplyTax,
  },
  {
    id: 'vat',
    icon: Percent,
    name: { en: 'VAT AI', bn: 'ভ্যাট এআই' },
    tagline: { en: 'VAT exemptions, SRO rulings & VAT Act 2012', bn: 'ভ্যাট অব্যাহতি, SRO রুলিং ও ভ্যাট আইন ২০১২' },
    subtitle: { en: 'SRO-grounded answers with inline citations', bn: 'ইনলাইন উদ্ধৃতিসহ SRO-ভিত্তিক উত্তর' },
    placeholder: { en: 'Ask about SROs, HS codes, VAT treatment…', bn: 'এসআরও, HS কোড, ভ্যাট সম্পর্কে জিজ্ঞাসা…' },
    suggestions: {
      en: ['What VAT applies to HS 1517.10.00?', 'Explain the SRO 184/2023 exemption', 'Draft a reply to a s.98 notice'],
      bn: ['HS 1517.10.00-এ কোন ভ্যাট?', 'SRO 184/2023 অব্যাহতি ব্যাখ্যা', 's.98 নোটিশের জবাব তৈরি'],
    },
    seed: seedChat,
    streamed: streamedReply,
  },
];

export function ChatView() {
  const { lang } = useApp();
  const [assistant, setAssistant] = useState<AssistantId | null>(null);

  if (!assistant) {
    return <AssistantPicker lang={lang} onPick={setAssistant} />;
  }

  const config = assistants.find((a) => a.id === assistant)!;
  return <ChatThread key={assistant} config={config} lang={lang} onSwitch={() => setAssistant(null)} />;
}

function AssistantPicker({ lang, onPick }: { lang: Lang; onPick: (id: AssistantId) => void }) {
  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="px-6 py-10 max-w-4xl mx-auto">
        <PageHeader
          title={lang === 'en' ? 'Choose your AI Assistant' : 'আপনার এআই সহকারী বেছে নিন'}
          subtitle={lang === 'en' ? 'Each assistant is specialized and grounded in its own area of law' : 'প্রতিটি সহকারী নিজ নিজ আইনি ক্ষেত্রে বিশেষায়িত ও ভিত্তিযুক্ত'}
          action={<AIBadge />}
        />
        <div className="grid md:grid-cols-3 gap-5">
          {assistants.map((a) => (
            <button
              key={a.id}
              onClick={() => onPick(a.id)}
              className="text-left card p-6 group hover:border-teal-400 hover:shadow-float transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-ink-900 text-white grid place-items-center">
                <a.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-ink-900">{a.name[lang]}</h3>
              <p className="mt-1.5 text-xs text-ink-500 leading-relaxed">{a.tagline[lang]}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 group-hover:gap-2.5 transition-all">
                {lang === 'en' ? 'Start chat' : 'চ্যাট শুরু'} <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChatThread({ config, lang, onSwitch }: { config: AssistantConfig; lang: Lang; onSwitch: () => void }) {
  const [turns, setTurns] = useState<ChatTurn[]>(config.seed);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [turns, streaming]);

  const send = () => {
    if (!input.trim() || streaming) return;
    const userTurn: ChatTurn = { id: `u${Date.now()}`, role: 'user', text: input };
    const aiId = `a${Date.now()}`;
    setTurns((p) => [...p, userTurn, { id: aiId, role: 'ai', text: '', pending: true }]);
    setInput('');
    setStreaming(true);
    streamReply(aiId);
  };

  const streamReply = (aiId: string) => {
    const words = config.streamed.split(' ');
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTurns((p) => p.map((m) => m.id === aiId ? { ...m, pending: false, text: words.slice(0, i).join(' ') } : m));
      if (i >= words.length) {
        clearInterval(interval);
        setStreaming(false);
        setTurns((p) => p.map((m) => m.id === aiId ? { ...m, cites: config.seed[config.seed.length - 1]?.cites ?? [] } : m));
      }
    }, 35);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-4 border-b border-ink-100 bg-white">
        <PageHeader
          title={config.name[lang]}
          subtitle={config.subtitle[lang]}
          action={
            <div className="flex items-center gap-2">
              <button onClick={onSwitch} className="btn-ghost text-xs">
                <ArrowLeft className="w-3.5 h-3.5" /> {lang === 'en' ? 'Switch assistant' : 'সহকারী পরিবর্তন'}
              </button>
              <AIBadge />
            </div>
          }
        />
      </div>

      {/* Amber disclaimer */}
      <div className="mx-6 mt-4 flex items-start gap-3 rounded-lg border border-status-warn/30 bg-status-warnSoft px-4 py-3">
        <AlertTriangle className="w-4 h-4 text-status-warn shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed text-ink-700">
          <span className="font-semibold">{lang === 'en' ? 'Missing BD precedent: ' : 'বিডি প্রিসিডেন্ট নেই: '}</span>
          {lang === 'en'
            ? 'No Bangladesh ruling found for sub-issues; AI fell back to OECD Customs Valuation principles. Treat as guidance.'
            : 'উপ-বিষয়ে বাংলাদেশী রায় পাওয়া যায়নি; এআই OECD কাস্টমস ভ্যালুয়েশন নীতিতে ফিরেছে। গাইডলাইন হিসেবে বিবেচনা করুন।'}
        </p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-6 py-6 space-y-6">
        {turns.map((m) => (
          <Fragment key={m.id}>
            {m.role === 'user' ? (
              <div className="flex gap-3 justify-end animate-fade-up">
                <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-ink-900 text-white px-4 py-3 text-sm leading-relaxed">
                  {m.text}
                </div>
                <div className="w-8 h-8 rounded-full bg-ink-300 grid place-items-center text-white text-xs font-bold shrink-0">RH</div>
              </div>
            ) : (
              <div className="flex gap-3 animate-fade-up">
                <div className="w-8 h-8 rounded-full bg-teal-600 grid place-items-center text-white shrink-0">
                  <config.icon className="w-4 h-4" />
                </div>
                <div className="max-w-[80%]">
                  <div className="rounded-2xl rounded-tl-sm bg-white border border-ink-200 px-4 py-3 text-sm leading-relaxed text-ink-800 shadow-card">
                    {m.text}
                    {m.pending && <span className="inline-block w-1.5 h-4 bg-teal-500 ml-0.5 animate-blink align-middle" />}
                  </div>
                  {m.cites && m.cites.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[11px] font-semibold text-ink-400 uppercase tracking-wide">{lang === 'en' ? 'Sources:' : 'উৎস:'}</span>
                      {m.cites.map((c) => <CitationChip key={c} id={c} />)}
                    </div>
                  )}
                  {!m.pending && m.text && (
                    <div className="mt-2 flex items-center gap-3 text-xs text-ink-400">
                      <button className="hover:text-ink-700 flex items-center gap-1"><Volume2 className="w-3 h-3" /> Listen</button>
                      <button className="hover:text-ink-700 flex items-center gap-1"><FileText className="w-3 h-3" /> Copy as memo</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {/* Suggestions */}
      {turns.length <= 2 && (
        <div className="px-6 pb-3 flex flex-wrap gap-2">
          {config.suggestions[lang].map((s) => (
            <button key={s} onClick={() => { setInput(s); }} className="chip bg-white border border-ink-200 text-ink-600 hover:border-teal-300 hover:text-teal-700 transition">
              <Sparkles className="w-3 h-3" /> {s}
            </button>
          ))}
        </div>
      )}

      {/* Composer */}
      <div className="border-t border-ink-100 bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-2 rounded-2xl border border-ink-300 bg-white p-2 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition shadow-card">
            <button className="btn-ghost p-2" title="Attach">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                rows={1}
                placeholder={config.placeholder[lang]}
                className="w-full resize-none bg-transparent px-1 py-2.5 text-sm outline-none placeholder:text-ink-400 max-h-32"
              />
            </div>
            {/* mic toggle */}
            <button
              onClick={() => setListening((l) => !l)}
              className={`relative p-2.5 rounded-xl transition ${listening ? 'bg-status-danger/10 text-status-danger' : 'btn-ghost'}`}
              title="Mic"
            >
              {listening && <span className="absolute inset-0 rounded-xl border-2 border-status-danger animate-pulse-ring" />}
              <Mic className="w-5 h-5" />
            </button>
            {/* voice/text reply switcher */}
            <button
              onClick={() => setVoiceMode((v) => !v)}
              className={`p-2.5 rounded-xl transition ${voiceMode ? 'bg-teal-50 text-teal-600' : 'btn-ghost'}`}
              title="Reply mode"
            >
              {voiceMode ? <Volume2 className="w-5 h-5" /> : <Type className="w-5 h-5" />}
            </button>
            <button onClick={send} disabled={!input.trim() || streaming} className="btn-primary px-4 py-2.5">
              <Send className="w-4 h-4" />
            </button>
          </div>
          {/* listening bars */}
          {listening && (
            <div className="mt-3 flex items-center gap-2 justify-center">
              <span className="text-xs font-semibold text-status-danger">{lang === 'en' ? 'Listening…' : 'শুনছি…'}</span>
              <div className="flex items-end gap-0.5 h-5">
                {[0,1,2,3,4,5,6].map((i) => (
                  <span key={i} className="w-1 bg-status-danger rounded-full animate-bar origin-bottom" style={{ height: '100%', animationDelay: `${i*0.1}s` }} />
                ))}
              </div>
            </div>
          )}
          {voiceMode && !listening && (
            <div className="mt-3 flex items-center gap-2 justify-center text-xs text-teal-600 font-semibold">
              <Volume2 className="w-3.5 h-3.5" /> {lang === 'en' ? 'Replies will be spoken aloud' : 'জবাব সশব্দে দেওয়া হবে'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
