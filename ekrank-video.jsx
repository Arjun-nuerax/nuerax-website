const { useComposition } = window;
const E = window.Easing;
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const prog = (T, s, d) => cl((T - s) / d);
// three motion helpers
const enter = (T, s, d = 0.6) => E.easeOutCubic(prog(T, s, d));
const pop = (T, s, d = 0.5) => E.easeOutBack(prog(T, s, d));
const glide = (T, s, d = 1) => E.easeInOutCubic(prog(T, s, d));
const lerp = (a, b, p) => a + (b - a) * p;
const out = (T, s, d = 0.4) => 1 - glide(T, s, d);

const INK = '#0F172A', GRAD = 'linear-gradient(135deg,#6366F1 0%,#A855F7 50%,#EC4899 100%)';
const FONT_H = 'Poppins, sans-serif', FONT_B = 'Inter, sans-serif';
const SCR = { x: 860, y: 245, w: 840, h: 500 };

function camera(T, C) {
  const zoom = { x: SCR.x + SCR.w / 2, y: SCR.y + SCR.h / 2, s: 1.9 };
  const keys = [
    [0, 960, 560, 1.1], [C.Problem, 960, 540, 1.0], [C.Turn - 0.6, 760, 520, 1.12],
    [C.Turn + 0.9, 1040, 540, 1.0], [C.Create - 0.2, 1040, 540, 1.0], [C.Create + 1.1, zoom.x, zoom.y, zoom.s],
    [C.Relief - 0.3, zoom.x, zoom.y + 10, 1.98], [C.Relief + 1.2, 720, 520, 1.15], [C.End, 760, 530, 1.22], [C.End + 6, 760, 530, 1.22]];
  let i = 0; while (i < keys.length - 2 && T > keys[i + 1][0]) i++;
  const [t0, x0, y0, s0] = keys[i], [t1, x1, y1, s1] = keys[i + 1];
  const p = glide(T, t0, Math.max(0.001, t1 - t0));
  const x = lerp(x0, x1, p), y = lerp(y0, y1, p), s = lerp(s0, s1, p);
  return `translate(${960 - x * s}px,${540 - y * s}px) scale(${s})`;
}

function Priya({ T, stress, smile, look, tilt }) {
  const blinkPhase = (T % 3.7);
  const blink = blinkPhase > 3.55 ? 0.12 : 1;
  const breathe = Math.sin(T * 1.6) * 2;
  const brow = stress * 7;
  const mouthY = 214, mw = 22, curve = lerp(-4, 12, smile);
  return (
    <svg viewBox="0 0 420 560" width="420" height="560" style={{ position: 'absolute', left: 280, top: 222, overflow: 'visible' }}>
      <g transform={`translate(0 ${breathe})`}>
        <path d="M40 560 C40 430 110 370 210 362 C310 370 380 430 380 560 Z" fill="#EC4899" />
        <path d="M118 560 C126 470 160 410 210 398 C250 410 300 470 312 560 Z" fill="#4338CA" />
        <path d="M232 372 C300 382 352 430 372 560 L300 560 C292 470 262 420 214 400 Z" fill="#4338CA" />
        <path d="M232 372 C300 382 352 430 372 560 L356 560 C336 440 290 396 228 384 Z" fill="#F59E0B" />
        <path d="M186 330 L234 330 L240 380 C226 396 196 396 180 380 Z" fill="#B9774F" />
        <g transform={`rotate(${tilt} 210 200)`}>
          <ellipse cx="300" cy="120" rx="44" ry="40" fill="#1E1B2E" />
          <path d="M120 170 C110 70 170 40 214 40 C268 40 316 76 304 176 L300 260 L124 260 Z" fill="#1E1B2E" />
          <ellipse cx="210" cy="190" rx="78" ry="96" fill="#C9875E" />
          <ellipse cx="134" cy="200" rx="12" ry="18" fill="#B9774F" />
          <ellipse cx="286" cy="200" rx="12" ry="18" fill="#B9774F" />
          <circle cx="134" cy="226" r="6" fill="#F59E0B" />
          <circle cx="286" cy="226" r="6" fill="#F59E0B" />
          <path d="M132 160 C140 92 180 70 212 72 C246 72 288 96 290 160 C270 120 240 104 212 104 C186 104 152 118 132 160 Z" fill="#1E1B2E" />
          <path d="M210 74 L210 104" stroke="#3B2F4A" strokeWidth="3" strokeLinecap="round" />
          <path d={`M160 ${158 + brow * 0.6} Q178 ${148 + brow} 196 ${154 + brow * 0.2}`} stroke="#1E1B2E" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d={`M224 ${154 + brow * 0.2} Q242 ${148 + brow} 260 ${158 + brow * 0.6}`} stroke="#1E1B2E" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="210" cy="140" r="5" fill="#E11D48" />
          <g transform={`translate(${look * 6} 0)`}>
            <ellipse cx="178" cy="182" rx="7" ry={8 * blink} fill="#1E1B2E" />
            <ellipse cx="242" cy="182" rx="7" ry={8 * blink} fill="#1E1B2E" />
          </g>
          <circle cx="178" cy="182" r="22" fill="none" stroke="#334155" strokeWidth="3" />
          <circle cx="242" cy="182" r="22" fill="none" stroke="#334155" strokeWidth="3" />
          <path d="M200 180 Q210 174 220 180" stroke="#334155" strokeWidth="3" fill="none" />
          <path d="M210 194 Q206 206 212 210" stroke="#A0613F" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d={`M${210 - mw} ${mouthY} Q210 ${mouthY + curve * 1.6} ${210 + mw} ${mouthY}`} stroke="#8A3B3B" strokeWidth="4.5" fill={smile > 0.6 ? '#FFFFFF' : 'none'} strokeLinecap="round" />
          <ellipse cx="160" cy="214" rx="12" ry="7" fill="#EC4899" opacity={0.18 + smile * 0.18} />
          <ellipse cx="260" cy="214" rx="12" ry="7" fill="#EC4899" opacity={0.18 + smile * 0.18} />
          <path d="M300 170 C318 200 316 250 300 280" stroke="#1E1B2E" strokeWidth="14" fill="none" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

function Papers({ T, C }) {
  const stacks = [930, 1110, 1290, 1470];
  const away = glide(T, C.Turn - 0.2, 0.9);
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, opacity: 1 - away, transform: `translateY(${away * 260}px)` }}>
      {stacks.map((x, si) => {
        const n = Math.round(lerp(2, 16 - si * 2, glide(T, C.Problem + si * 0.4, 3.2)));
        return Array.from({ length: n }).map((_, k) => (
          <div key={si + '-' + k} style={{ position: 'absolute', left: x + ((k * 37 + si * 11) % 9) - 4, top: 742 - k * 12, width: 170, height: 14, borderRadius: 3, background: k % 2 ? '#FFFFFF' : '#F8FAFC', border: '1px solid #CBD5E1', transform: `rotate(${((k * 53 + si * 7) % 7) - 3}deg)` }} />
        ));
      })}
      {[0, 1, 2].map(i => {
        const p = glide(T, C.Problem + 1 + i * 1.1, 1.4);
        return <div key={'f' + i} style={{ position: 'absolute', left: 1000 + i * 210, top: lerp(-120, 520 - i * 40, p), width: 120, height: 150, borderRadius: 6, background: '#FFFFFF', border: '1px solid #CBD5E1', boxShadow: '0 6px 20px rgba(15,23,42,.08)', opacity: p > 0.98 ? 0 : (p > 0 ? 1 : 0), transform: `rotate(${lerp(-30 + i * 25, 6, p)}deg)` }}>
          {[0, 1, 2, 3, 4].map(r => <div key={r} style={{ margin: '14px 14px 0', height: 6, borderRadius: 3, background: '#E2E8F0', width: 70 + ((r * 13) % 22) }} />)}
        </div>;
      })}
    </div>
  );
}

function Laptop({ T, C }) {
  const up = glide(T, C.Turn, 1.0);
  const imgs = [
    ['screenshots/web/01-t.png', -1, C.Create + 0.4],
    ['screenshots/web/create-exam.png', C.Create + 0.4, C.Monitor],
    ['screenshots/web/02-t.png', C.Monitor, C.Analyse],
    ['screenshots/web/03-t.png', C.Analyse, C.Students],
    ['screenshots/web/06-t.png', C.Students, C.Syllabus],
    ['screenshots/web/07-t.png', C.Syllabus, C.Relief + 0.6],
    ['screenshots/web/01-t.png', C.Relief + 0.6, 999]];
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, opacity: up, transform: `translateY(${(1 - up) * 240}px)` }}>
      <div style={{ position: 'absolute', left: SCR.x - 14, top: SCR.y - 14, width: SCR.w + 28, height: SCR.h + 28, borderRadius: 20, background: INK, boxShadow: '0 30px 80px rgba(15,23,42,.25)' }} />
      <div style={{ position: 'absolute', left: SCR.x, top: SCR.y, width: SCR.w, height: SCR.h, borderRadius: 8, overflow: 'hidden', background: '#F8FAFC' }}>
        {imgs.map(([src, a, b], i) => {
          const o = Math.min(enter(T, a, 0.35), out(T, b, 0.35));
          return <img key={i} src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', opacity: i === 0 ? out(T, b, 0.35) : o }} />;
        })}
      </div>
      <div style={{ position: 'absolute', left: SCR.x - 70, top: SCR.y + SCR.h + 14, width: SCR.w + 140, height: 18, borderRadius: '0 0 14px 14px', background: '#CBD5E1' }} />
    </div>
  );
}

function Room({ T, C }) {
  const spin = (T < C.Turn ? glide(T, C.Problem, C.Turn - C.Problem) * 1440 : 1440) + T * 6;
  const chai = enter(T, C.Relief + 0.4, 0.6);
  return (
    <>
      <div style={{ position: 'absolute', inset: 0, background: '#EEF2FF' }} />
      <div style={{ position: 'absolute', left: 110, top: 80, width: 640, height: 250, borderRadius: 16, background: '#FFFFFF', border: '10px solid #E2E8F0', fontFamily: FONT_H, color: '#6366F1', padding: '22px 30px', boxSizing: 'border-box', fontSize: 30, lineHeight: 1.6 }}>
        <div>F = qE</div><div style={{ color: '#EC4899' }}>∮ E · dA = q / ε₀</div><div style={{ color: '#06B6D4' }}>C = Q / V</div>
      </div>
      <div style={{ position: 'absolute', left: 1500, top: 70, width: 120, height: 120, borderRadius: '50%', background: '#FFFFFF', border: '8px solid #CBD5E1' }}>
        <div style={{ position: 'absolute', left: 52, top: 18, width: 4, height: 42, borderRadius: 2, background: INK, transformOrigin: '2px 42px', transform: `rotate(${spin}deg)` }} />
        <div style={{ position: 'absolute', left: 52, top: 30, width: 4, height: 30, borderRadius: 2, background: '#EC4899', transformOrigin: '2px 30px', transform: `rotate(${spin / 12 + 250}deg)` }} />
      </div>
      <div style={{ position: 'absolute', left: -200, top: 760, width: 2400, height: 520, background: '#E2E8F0' }} />
      <div style={{ position: 'absolute', left: -200, top: 760, width: 2400, height: 14, background: '#CBD5E1' }} />
      <div style={{ position: 'absolute', left: 700, top: 690, opacity: chai, transform: `translateY(${(1 - chai) * 20}px)` }}>
        <div style={{ width: 64, height: 70, borderRadius: '6px 6px 18px 18px', background: '#FFFFFF', border: '3px solid #CBD5E1' }} />
        <div style={{ position: 'absolute', left: 62, top: 16, width: 22, height: 28, borderRadius: '0 14px 14px 0', border: '4px solid #CBD5E1', borderLeft: 'none' }} />
        {[0, 1].map(i => <div key={i} style={{ position: 'absolute', left: 16 + i * 18, top: -50 - ((T * 30 + i * 20) % 30), width: 8, height: 36, borderRadius: 4, background: '#A855F7', opacity: 0.25 * (1 - ((T * 1 + i * .5) % 1)) }} />)}
      </div>
    </>
  );
}

function Callouts({ T, C }) {
  const card = { position: 'absolute', right: 90, top: 110, width: 480, background: 'rgba(255,255,255,.97)', borderRadius: 24, boxShadow: '0 24px 60px rgba(15,23,42,.22)', padding: '26px 30px', fontFamily: FONT_B, color: INK, boxSizing: 'border-box' };
  const sc = (a, b) => { const s = Math.min(pop(T, a), out(T, b)); return { opacity: cl(s), transform: `translateY(${(1 - s) * 30}px) scale(${0.96 + 0.04 * s})` }; };
  const row = (txt, at, c = '#6366F1') => { const p = pop(T, at, 0.4); return (
    <div key={txt} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, opacity: cl(p * 1.5) }}>
      <span style={{ width: 32, height: 32, flex: 'none', borderRadius: 999, display: 'grid', placeItems: 'center', background: p > 0.5 ? GRAD : '#F1F5F9', color: '#fff', fontWeight: 700, fontSize: 16, transform: `scale(${0.7 + 0.3 * p})` }}>✓</span>{txt}</div>); };
  const num = (v, a, d = 1.6) => Math.round(v * glide(T, a, d));
  const bar = (v, a, c = GRAD) => <div style={{ height: 12, borderRadius: 99, background: '#F1F5F9', overflow: 'hidden' }}><div style={{ height: '100%', width: `${v * glide(T, a, 1.4)}%`, background: c, borderRadius: 99 }} /></div>;
  const S = C.Create, M = C.Monitor, A = C.Analyse, St = C.Students, Sy = C.Syllabus;
  return (
    <>
      <div style={{ ...card, ...sc(S + 1.3, M - 0.3) }}>
        <div style={{ fontFamily: FONT_H, fontSize: 28, fontWeight: 600 }}>Electrostatics · Chapter Test</div>
        <div style={{ fontSize: 19, color: '#64748B', marginTop: 4 }}>Class 12 · Sections A &amp; C · JEE</div>
        <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>
          {row('Chapters & topics picked', S + 1.9)}{row('30 questions + PYQs', S + 2.5)}{row('Scheduled for 2 sections', S + 3.1)}</div>
      </div>
      <div style={{ ...card, ...sc(M + 0.4, A - 0.3) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 700, color: '#DB2777', letterSpacing: '.08em' }}>
          <span style={{ width: 12, height: 12, borderRadius: 99, background: '#EC4899', boxShadow: `0 0 0 ${6 + Math.sin(T * 6) * 3}px rgba(236,72,153,.2)` }} />LIVE</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 16 }}>
          {[['Joined', num(42, M + 0.6), INK], ['Writing', Math.max(0, num(42, M + 0.6) - num(42, M + 2.2, 3)), '#6366F1'], ['Submitted', num(42, M + 2.2, 3), '#059669']].map(([l, v, c]) =>
            <div key={l}><div style={{ fontFamily: FONT_H, fontSize: 52, fontWeight: 600, lineHeight: 1, color: c }}>{v}</div><div style={{ fontSize: 18, color: '#64748B', marginTop: 6 }}>{l}</div></div>)}
        </div>
      </div>
      <div style={{ ...card, ...sc(A + 0.4, St - 0.3) }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div><div style={{ fontSize: 18, color: '#64748B' }}>Class average</div><div style={{ fontFamily: FONT_H, fontSize: 52, fontWeight: 600 }}>{num(66, A + 0.7)}%</div></div>
          <div><div style={{ fontSize: 18, color: '#64748B' }}>Accuracy</div><div style={{ fontFamily: FONT_H, fontSize: 52, fontWeight: 600 }}>{num(72, A + 0.9)}%</div></div>
        </div>
        <div style={{ display: 'grid', gap: 10, marginTop: 10, fontSize: 18 }}>
          {[["Coulomb's law", 84, '#10B981'], ['Electric field', 61, '#F59E0B'], ["Gauss's law", 43, '#EC4899']].map(([t, v, c], i) =>
            <div key={t} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', gap: 12 }}><span>{t}</span>{bar(v, A + 1.6 + i * 0.3, c)}</div>)}
        </div>
      </div>
      <div style={{ ...card, ...sc(St + 0.4, Sy - 0.3) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 52, height: 52, borderRadius: 99, background: '#4F46E5', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 18 }}>KS</span>
          <div><div style={{ fontFamily: FONT_H, fontSize: 26, fontWeight: 600 }}>Kabir Singh</div><div style={{ fontSize: 18, color: '#B45309' }}>Needs support · −11 since last test</div></div>
        </div>
        <div style={{ display: 'grid', gap: 12, marginTop: 18 }}>{row('Practice on Electric field', St + 1.6)}{row('Follow-up note added', St + 2.3)}{row('PTM report ready', St + 3.0)}</div>
      </div>
      <div style={{ ...card, ...sc(Sy + 0.4, C.Relief - 0.2) }}>
        <div style={{ fontFamily: FONT_H, fontSize: 26, fontWeight: 600 }}>Physics · Class 12</div>
        <div style={{ display: 'grid', gap: 14, marginTop: 16, fontSize: 19 }}>
          {[['Taught', 78, '#6366F1'], ['Tested', 64, '#A855F7'], ['Learned', 58, '#10B981']].map(([t, v, c], i) =>
            <div key={t} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 56px', alignItems: 'center', gap: 12 }}><span>{t}</span>{bar(v, Sy + 0.9 + i * 0.4, c)}<span style={{ fontWeight: 600, textAlign: 'right' }}>{num(v, Sy + 0.9 + i * 0.4, 1.4)}%</span></div>)}
        </div>
      </div>
    </>
  );
}

function Caption({ T, C }) {
  const items = [
    [0.6, C.Problem - 0.2, '', 'Papers to set. Papers to check. 120 students.'],
    [C.Problem + 0.3, C.Turn - 0.2, '', 'By the time results arrive, the class has moved on.'],
    [C.Turn + 0.5, C.Create - 0.1, '', 'Then her school moved to ekRank.'],
    [C.Create + 0.5, C.Monitor - 0.1, '01', 'Create & manage exams'],
    [C.Monitor + 0.3, C.Analyse - 0.1, '02', 'Monitor assessments live'],
    [C.Analyse + 0.3, C.Students - 0.1, '03', 'Analyse performance'],
    [C.Students + 0.3, C.Syllabus - 0.1, '04', 'Track every student'],
    [C.Syllabus + 0.3, C.Relief - 0.1, '05', 'Track syllabus coverage'],
    [C.Relief + 0.8, C.End - 0.1, '', 'More time to teach.']];
  const cur = items.find(([a, b]) => T >= a && T < b + 0.3);
  if (!cur) return null;
  const s = Math.min(enter(T, cur[0], 0.5), out(T, cur[1], 0.3));
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 80, display: 'flex', justifyContent: 'center', opacity: s, transform: `translateY(${(1 - s) * 24}px)` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '22px 40px', borderRadius: 24, background: 'rgba(15,23,42,.92)', color: '#F1F5F9', fontFamily: FONT_H, fontSize: 52, fontWeight: 600, letterSpacing: '-.02em' }}>
        {cur[2] ? <span style={{ fontSize: 30, padding: '6px 14px', borderRadius: 14, background: GRAD, color: '#fff' }}>{cur[2]}</span> : null}{cur[3]}</div>
    </div>
  );
}

function EndCard({ T, C, total }) {
  const bg = Math.max(glide(T, C.End, 0.8), 1 - glide(T, 0, 0.8));
  const a = (d) => enter(T, C.End + d, 0.7);
  const st = (d) => ({ opacity: a(d), transform: `translateY(${(1 - a(d)) * 30}px)` });
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#0A0F1E', opacity: bg, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
      <div style={{ position: 'absolute', left: '50%', top: '40%', width: 1300, height: 800, transform: 'translate(-50%,-50%)', background: 'radial-gradient(closest-side,rgba(99,102,241,.35),rgba(168,85,247,.12) 55%,transparent)' }} />
      <div style={{ position: 'relative', display: 'grid', justifyItems: 'center', gap: 26 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, ...st(0.3) }}>
          <img src="assets/ekrank-logo-v6-dark.png" alt="ekRank" style={{ height: 96, width: 'auto' }} />
        </div>
        <div style={{ fontFamily: FONT_H, fontSize: 84, fontWeight: 600, letterSpacing: '-.04em', lineHeight: 1.02, color: '#F1F5F9', ...st(0.7) }}>Teach the class.<br /><span style={{ fontStyle: 'italic', fontWeight: 500, background: 'linear-gradient(135deg,#818CF8,#C084FC 45%,#F472B6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingRight: 8 }}>Not the paperwork.</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, padding: '18px 34px', borderRadius: 22, background: 'rgba(17,26,46,.85)', border: '1px solid #33425F', ...st(1.2) }}>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}><span style={{ fontFamily: FONT_H, fontSize: 52, fontWeight: 600, color: '#F1F5F9', letterSpacing: '-.03em' }}>₹199</span><span style={{ fontFamily: FONT_B, fontSize: 24, color: '#CBD5E1' }}>per student / month</span></span>
          <span style={{ width: 1, height: 48, background: '#33425F' }} />
          <span style={{ fontFamily: FONT_B, fontSize: 24, lineHeight: 1.4, color: '#CBD5E1', textAlign: 'left' }}>Flexible plans for institutions<br /><span style={{ color: '#C084FC', fontWeight: 600 }}>Fully customisable</span></span>
        </div>
        <div style={{ marginTop: 12, padding: '22px 44px', borderRadius: 20, background: GRAD, color: '#fff', fontFamily: FONT_B, fontSize: 32, fontWeight: 600, boxShadow: '0 16px 50px rgba(168,85,247,.45)', ...st(1.8) }}>Discuss pricing — Book a demo</div>
        <div style={{ display: 'flex', gap: 40, fontFamily: FONT_B, fontSize: 28, fontWeight: 600, color: '#F1F5F9', ...st(2.3) }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ width: 40, height: 40, borderRadius: 12, background: '#10B981', display: 'grid', placeItems: 'center' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.6-4.8A8.5 8.5 0 1 1 7.8 19.4z" /></svg></span>+91 73311 20766</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}><span style={{ width: 40, height: 40, borderRadius: 12, background: '#22D3EE', display: 'grid', placeItems: 'center' }}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg></span>hello@ekrank.com</span>
        </div>
      </div>
    </div>
  );
}

const VO = [[0.6,'Every week: papers to set, papers to check. For a hundred and twenty students.'],[4.6,"By the time results come out, the class has moved on. I'm Priya, Physics, Class 12."],[9,'Then our school moved to ekRank.'],[12.6,'Now I build a JEE or NEET paper in minutes, and schedule it for every section.'],[18.4,"During the exam, I see who's joined, who's writing and who's submitted."],[24.4,'The moment it ends, I know the scores, the accuracy, and which topics need work.'],[30.4,'If a student slips, I see it, and I follow up the same day.'],[36.4,"And I can see what I've taught, what's been tested, and what my students have learnt."],[42.6,'Less paperwork. More time to teach.'],[47,'ekRank. Just one hundred and ninety-nine rupees per student, per month. Book your free demo today.']];
function useSound(T, playing, voiceOn) {
  const ref = React.useRef(null), last = React.useRef(T), voice = React.useRef(null);
  React.useEffect(() => { const pick = () => { const v = speechSynthesis.getVoices(); const MALE = /\bmale\b|rishi|ravi|prabhat|hemant|madhur|daniel|david|mark|george|alex|fred|aaron|arthur|guy|ryan|thomas|oliver/i, FEM = /female|veena|heera|neerja|swara|kalpana|aditi|raveena|samantha|karen|moira|tessa|serena|kate|susan|zira|hazel|sonia|libby|aria|jenny|natasha/i;
      const ok = v.filter(x => /^en|^hi/i.test(x.lang) && !MALE.test(x.name));
      voice.current = ok.find(x => /en-IN/i.test(x.lang) && FEM.test(x.name)) || ok.find(x => /en-IN/i.test(x.lang)) || ok.find(x => FEM.test(x.name)) || ok[0] || null; }; pick(); speechSynthesis.onvoiceschanged = pick; return () => speechSynthesis.cancel(); }, []);
  React.useEffect(() => {
    const a = ref.current; if (!a) return;
    a.volume = voiceOn ? 0.35 : 0.8;
    if (Math.abs(a.currentTime - T) > 0.25) a.currentTime = Math.max(0, T);
    if (playing && a.paused) a.play().catch(() => {}); if (!playing && !a.paused) a.pause();
    if (!playing) { speechSynthesis.cancel(); last.current = T; return; }
    if (voiceOn) VO.forEach(([at, line]) => { if (last.current < at && T >= at && T - at < 0.5) { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(line); if (voice.current) u.voice = voice.current; u.lang = 'en-IN'; u.rate = 0.96; u.pitch = 1.18; u.volume = 1; speechSynthesis.speak(u); } });
    last.current = T;
  });
  return ref;
}

function Piece() {
  const { T, CUES: C, authoredTotal, playing } = useComposition();
  const voiceOn = (window.__ekVoice ?? true);
  const audioRef = useSound(T, playing, voiceOn);
  const stress = glide(T, C.Problem + 0.5, 2.5) * out(T, C.Turn + 0.3, 0.8);
  const smile = Math.max(0.35 * (1 - stress), glide(T, C.Turn + 0.6, 0.8) * 0.75, glide(T, C.Relief + 0.6, 0.8));
  const look = glide(T, C.Turn + 0.4, 0.6) * out(T, C.Relief + 0.8, 0.6);
  const tilt = lerp(0, -4, stress) + glide(T, C.Relief + 0.8, 1) * 5;
  React.useEffect(() => { const r = document.querySelector('[data-video-root]'); if (r) r.setAttribute('data-screen-label', 'Video ' + Math.floor(T) + 's'); }, [Math.floor(T)]);
  return (
    <div data-video-root="" style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#EEF2FF', fontFamily: FONT_B }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: camera(T, C) }}>
        <Room T={T} C={C} />
        <Priya T={T} stress={stress} smile={smile} look={look} tilt={tilt} />
        <div style={{ position: 'absolute', left: -200, top: 774, width: 2400, height: 400, background: '#E2E8F0' }} />
        <Papers T={T} C={C} />
        <Laptop T={T} C={C} />
      </div>
      <Callouts T={T} C={C} />
      <Caption T={T} C={C} />
      <EndCard T={T} C={C} total={authoredTotal} />
      <video ref={audioRef} src="assets/ekrank-video-music.wav" data-om-exportable-video-play-start="0" data-om-exportable-video-play-end="53.5" playsInline preload="auto" style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />
    </div>
  );
}

function EkVideo() {
  const [t, setTweak] = window.useTweaks(window.TWEAK_DEFAULTS || { motionEditor: true, voice: true });
  window.__ekVoice = t.voice !== false;
  const embed = /[?&]embed=1/.test(location.search);
  React.useEffect(() => { if (!embed) return; const s = document.createElement('style'); s.textContent = '[data-omelette-chrome]{display:none!important}'; document.head.appendChild(s); }, []);
  return (
    <>
      <window.CompositionStage width={1920} height={1080} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg="#0A0F1E">
        <Piece />
      </window.CompositionStage>
      {!embed && <window.TweaksPanel>
        <window.TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
        <window.TweakToggle label="Voice-over (preview)" value={t.voice !== false} onChange={(v) => setTweak('voice', v)} />
      </window.TweaksPanel>}
    </>
  );
}
window.EkVideo = EkVideo;
