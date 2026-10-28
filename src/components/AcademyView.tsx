import { useState } from 'react';
import { Play, Check, X, QrCode, GraduationCap, Radio, Users, BookOpen, Award, TrendingUp, Clock, Plus, Search, MoreVertical } from 'lucide-react';
import { useApp } from '@/lib/app-context';
import { AIBadge } from './Brand';
import { PageHeader } from './ui';
import { students, liveClasses, radarSkills, quiz, tenants } from '@/lib/data';

function Radar({ skills, lang }: { skills: { k: string; v: number }[]; lang: string }) {
  const size = 220, cx = size/2, cy = size/2, R = 80;
  const n = skills.length;
  const pt = (i: number, r: number) => {
    const ang = (Math.PI*2*i)/n - Math.PI/2;
    return [cx + Math.cos(ang)*r, cy + Math.sin(ang)*r];
  };
  const poly = (vals: number[]) => vals.map((v, i) => { const [x,y]=pt(i, (v/100)*R); return `${x},${y}`; }).join(' ');
  const rings = [25, 50, 75, 100];
  return (
    <svg width={size} height={size} className="mx-auto">
      {rings.map((r) => <polygon key={r} points={poly(skills.map(()=>r))} fill="none" stroke="#e9eef5" strokeWidth="1" />)}
      {skills.map((_, i) => { const [x,y]=pt(i, R); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e9eef5" strokeWidth="1" />; })}
      <polygon points={poly(skills.map(s=>s.v))} fill="rgba(28,155,133,0.2)" stroke="#1c9b85" strokeWidth="2" />
      {skills.map((s, i) => {
        const [x,y] = pt(i, (s.v/100)*R);
        return <circle key={s.k} cx={x} cy={y} r="3" fill="#1c9b85" />;
      })}
      {skills.map((s, i) => {
        const [x,y] = pt(i, R+18);
        return <text key={s.k} x={x} y={y} textAnchor="middle" className="fill-ink-600" style={{ fontSize: 10, fontWeight: 600 }}>{lang==='en'?s.k:s.k}</text>;
      })}
    </svg>
  );
}

export function AcademyView() {
  const { lang } = useApp();
  const [quizIdx, setQuizIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const q = quiz[quizIdx];

  const pick = (i: number) => {
    if (revealed) return;
    setPicked(i);
    setRevealed(true);
    if (i === q.ans) setScore((s) => s + 1);
  };
  const next = () => {
    if (quizIdx < quiz.length - 1) { setQuizIdx((i)=>i+1); setPicked(null); setRevealed(false); }
  };

  return (
    <div className="px-6 py-6 max-w-6xl mx-auto">
      <PageHeader
        title={lang === 'en' ? 'AI Academy' : 'এআই একাডেমি'}
        subtitle={lang === 'en' ? 'Your learning dashboard — skills, live classes, quizzes & certificates' : 'আপনার লার্নিং ড্যাশবোর্ড — দক্ষতা, লাইভ ক্লাস, কুইজ ও সার্টিফিকেট'}
        action={<AIBadge />}
      />

      {/* Top KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: TrendingUp, l: lang === 'en' ? 'Avg progress' : 'গড় অগ্রগতি', v: '78%', c: 'text-teal-600' },
          { icon: Award, l: lang === 'en' ? 'Certificates' : 'সার্টিফিকেট', v: '3', c: 'text-status-success' },
          { icon: BookOpen, l: lang === 'en' ? 'Courses' : 'কোর্স', v: '7', c: 'text-ink-600' },
          { icon: Clock, l: lang === 'en' ? 'Hours' : 'ঘণ্টা', v: '42.5', c: 'text-status-warn' },
        ].map((k) => (
          <div key={k.l} className="card p-4">
            <k.icon className={`w-5 h-5 ${k.c}`} />
            <div className="mt-2 text-2xl font-bold text-ink-900">{k.v}</div>
            <div className="text-xs text-ink-500">{k.l}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Skill radar — removed from prototype, code kept in Radar() below for future use */}

        {/* Live classes */}
        <div className="card p-5 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-ink-900">{lang === 'en' ? 'Live & upcoming classes' : 'লাইভ ও আসন্ন ক্লাস'}</h3>
            <button className="text-xs font-semibold text-teal-600">{lang === 'en' ? 'View all' : 'সব দেখুন'}</button>
          </div>
          <div className="space-y-3">
            {liveClasses.map((c) => (
              <div key={c.id} className="flex items-center gap-4 rounded-lg border border-ink-100 p-3 hover:border-teal-300 transition">
                <div className={`w-11 h-11 rounded-lg grid place-items-center shrink-0 ${c.live ? 'bg-status-danger text-white' : 'bg-ink-100 text-ink-600'}`}>
                  {c.live ? <Radio className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-ink-900 truncate">{c.title}</div>
                  <div className="text-xs text-ink-500">{c.tutor} · {c.time}</div>
                </div>
                {c.live && <span className="chip bg-status-dangerSoft text-status-danger animate-pulse"><Radio className="w-3 h-3" /> Live</span>}
                <div className="text-xs text-ink-400 hidden sm:flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {c.seats}</div>
                <button className={`btn-primary text-xs py-1.5 px-3 ${c.live ? '' : 'btn-outline'}`}><Play className="w-3 h-3" /> {c.live ? (lang==='en'?'Join':'যোগ') : (lang==='en'?'Remind':'স্মারক')}</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quiz */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="card p-5 lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-ink-900">{lang === 'en' ? 'MCQ Quiz · SRO 184/2023' : 'এমসিকিউ কুইজ · SRO 184/2023'}</h3>
            <span className="chip bg-teal-50 text-teal-700">{quizIdx+1}/{quiz.length} · {lang==='en'?'Score':'স্কোর'} {score}</span>
          </div>
          <p className="text-sm font-medium text-ink-900 mb-4">{q.q}</p>
          <div className="space-y-2.5">
            {q.opts.map((o, i) => {
              const isAns = i === q.ans;
              const isPicked = i === picked;
              let cls = 'border-ink-200 hover:border-teal-300 bg-white';
              if (revealed) {
                if (isAns) cls = 'border-status-success bg-status-successSoft';
                else if (isPicked) cls = 'border-status-danger bg-status-dangerSoft';
                else cls = 'border-ink-200 bg-white opacity-60';
              }
              return (
                <button key={i} onClick={() => pick(i)} className={`w-full text-left rounded-lg border px-4 py-3 text-sm transition flex items-center justify-between ${cls}`}>
                  <span className={revealed && isAns ? 'text-status-success font-semibold' : revealed && isPicked ? 'text-status-danger font-semibold' : 'text-ink-800'}>{o}</span>
                  {revealed && isAns && <Check className="w-4 h-4 text-status-success" />}
                  {revealed && isPicked && !isAns && <X className="w-4 h-4 text-status-danger" />}
                </button>
              );
            })}
          </div>
          {revealed && (
            <div className="mt-4 rounded-lg bg-teal-50 border border-teal-200 p-3 animate-fade-up">
              <p className="text-xs text-ink-700"><span className="font-semibold text-teal-700">{lang === 'en' ? 'Explanation: ' : 'ব্যাখ্যা: '}</span>{q.explain}</p>
              {quizIdx < quiz.length - 1 ? (
                <button onClick={next} className="btn-primary mt-3 text-xs py-2">{lang === 'en' ? 'Next question' : 'পরবর্তী প্রশ্ন'} →</button>
              ) : (
                <p className="mt-3 text-sm font-bold text-teal-700">{lang === 'en' ? 'Quiz complete! Final score:' : 'কুইজ সম্পূর্ণ! চূড়ান্ত স্কোর:'} {score}/{quiz.length}</p>
              )}
            </div>
          )}
        </div>

        {/* QR Certificate — removed from prototype, markup kept below for future use
        <div className="card p-5">
          <h3 className="text-sm font-bold text-ink-900 mb-1">{lang === 'en' ? 'Certificate' : 'সার্টিফিকেট'}</h3>
          <p className="text-xs text-ink-500 mb-3">{lang === 'en' ? 'Customs Pro · Cohort C24' : 'কাস্টমস প্রো · কোহর্ট C24'}</p>
          <div className="relative rounded-xl border-2 border-ink-300 bg-gradient-to-br from-white to-ink-50 p-5 text-center">
            <div className="flex justify-center mb-2"><Award className="w-8 h-8 text-teal-600" /></div>
            <div className="text-[10px] uppercase tracking-widest text-ink-400 font-semibold">Certificate of Completion</div>
            <div className="mt-1 text-base font-bold text-ink-900">Rakibul Hasan</div>
            <div className="text-xs text-ink-600 mt-1">Customs Pro · C24</div>
            <div className="mt-3 flex justify-center">
              <div className="w-16 h-16 rounded bg-white border border-ink-200 grid place-items-center">
                <QrCode className="w-12 h-12 text-ink-900" />
              </div>
            </div>
            <div className="mt-2 text-[9px] text-ink-400 font-mono">verify.tradevics.ai/c/C24-RH</div>
          </div>
          <button className="btn-outline w-full mt-3 text-xs py-2"><QrCode className="w-3.5 h-3.5" /> {lang === 'en' ? 'Verify & share' : 'যাচাই ও শেয়ার'}</button>
        </div>
        */}
      </div>
    </div>
  );
}

export function AdminView() {
  const { lang } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filtered = tenants.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="px-6 py-6 max-w-6xl mx-auto">
      <PageHeader
        title={lang === 'en' ? 'Admin Portal' : 'অ্যাডমিন পোর্টাল'}
        subtitle={lang === 'en' ? 'Tenant management · KPIs · usage' : 'টেন্যান্ট ব্যবস্থাপনা · কেপিআই · ব্যবহার'}
        action={<button onClick={() => setAddOpen(true)} className="btn-primary"><Plus className="w-4 h-4" /> {lang === 'en' ? 'Add Tenant' : 'টেন্যান্ট যোগ'}</button>}
      />

      {/* KPI tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { l: lang === 'en' ? 'Total tenants' : 'মোট টেন্যান্ট', v: '248', d: '+12 this month', up: true },
          { l: lang === 'en' ? 'Active seats' : 'সক্রিয় সিট', v: '3,420', d: '+186', up: true },
          { l: lang === 'en' ? 'MRR' : 'মাসিক আয়', v: 'BDT 18.4L', d: '+8.2%', up: true },
          { l: lang === 'en' ? 'Churn' : 'চার্ন', v: '1.8%', d: '-0.4%', up: true },
        ].map((k) => (
          <div key={k.l} className="card p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-400">{k.l}</div>
            <div className="mt-1 text-2xl font-bold text-ink-900">{k.v}</div>
            <div className={`text-xs mt-0.5 ${k.up ? 'text-status-success' : 'text-status-danger'}`}>{k.d}</div>
          </div>
        ))}
      </div>

      {/* Tenant table */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-ink-100 flex items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-ink-900">{lang === 'en' ? 'Tenants' : 'টেন্যান্ট'}</h3>
          <div className="flex items-center gap-2 rounded-lg border border-ink-200 bg-ink-50 px-3 py-2 w-56">
            <Search className="w-4 h-4 text-ink-400" />
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder={lang==='en'?'Search…':'খুঁজুন…'} className="bg-transparent text-sm outline-none w-full" />
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-ink-400 bg-ink-50/50">
                <th className="px-5 py-3 font-semibold">{lang === 'en' ? 'Tenant' : 'টেন্যান্ট'}</th>
                <th className="px-5 py-3 font-semibold">Seats</th>
                <th className="px-5 py-3 font-semibold">Plan</th>
                <th className="px-5 py-3 font-semibold">{lang === 'en' ? 'Usage' : 'ব্যবহার'}</th>
                <th className="px-5 py-3 font-semibold">{lang === 'en' ? 'Status' : 'অবস্থা'}</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-ink-50/50 transition">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-ink-900 text-white grid place-items-center text-xs font-bold">{t.name.slice(0,2).toUpperCase()}</div>
                      <span className="font-medium text-ink-900">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-ink-700">{t.seats}</td>
                  <td className="px-5 py-3.5">
                    <span className={`chip ${t.plan==='Enterprise'?'bg-teal-50 text-teal-700':t.plan==='Business'?'bg-blue-50 text-blue-700':'bg-ink-100 text-ink-600'}`}>{t.plan}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2 w-32">
                      <div className="flex-1 h-1.5 rounded-full bg-ink-100 overflow-hidden">
                        <div className={`h-full rounded-full ${t.usage>70?'bg-status-warn':'bg-teal-500'}`} style={{ width: `${t.usage}%` }} />
                      </div>
                      <span className="text-xs text-ink-500 w-8">{t.usage}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`chip capitalize ${t.status==='active'?'bg-status-successSoft text-status-success':t.status==='trial'?'bg-status-warnSoft text-status-warn':'bg-status-dangerSoft text-status-danger'}`}>{t.status}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right"><button className="btn-ghost p-1.5"><MoreVertical className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add tenant modal */}
      {addOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink-950/40 backdrop-blur-sm p-4" onClick={()=>setAddOpen(false)}>
          <div className="w-full max-w-md card p-6 animate-fade-up" onClick={(e)=>e.stopPropagation()}>
            <h3 className="text-base font-bold text-ink-900">{lang === 'en' ? 'Add new tenant' : 'নতুন টেন্যান্ট যোগ'}</h3>
            <div className="mt-5 space-y-4">
              {[
                { l: lang === 'en' ? 'Organization' : 'প্রতিষ্ঠান', v: '' },
                { l: 'Admin email', v: '' },
                { l: lang === 'en' ? 'NBR license no.' : 'এনবিআর লাইসেন্স নং', v: '' },
              ].map((f) => (
                <div key={f.l}><label className="label">{f.l}</label><input className="input" defaultValue={f.v} placeholder="…" /></div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div><label className="label">Plan</label><select className="input"><option>Starter</option><option>Business</option><option>Enterprise</option></select></div>
                <div><label className="label">Seats</label><input className="input" type="number" defaultValue={10} /></div>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={()=>setAddOpen(false)} className="btn-ghost">{lang === 'en' ? 'Cancel' : 'বাতিল'}</button>
              <button onClick={()=>setAddOpen(false)} className="btn-primary">{lang === 'en' ? 'Create tenant' : 'টেন্যান্ট তৈরি'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
