/* ekRank hero: proctored exam flow, teacher laptop + student phone. No dependencies. */
(function () {
  'use strict';
  var root = document.getElementById('xf');
  if (!root) return;
  var win = root.querySelector('.xf-win'), cur = root.querySelector('.xf-cur');
  var phone = root.querySelector('.xp'), tapEl = root.querySelector('.xp-tap');
  var steps = [].slice.call(root.querySelectorAll('.xf-steps li'));
  var secs = [].slice.call(root.querySelectorAll('[data-sc]'));
  var title = root.querySelector('.xf-title'), stepl = root.querySelector('.xf-stepl');
  var cap = root.querySelector('.xf-cap'), capN = root.querySelector('.xf-capn'), capR = root.querySelector('.xf-capr'), capT = root.querySelector('.xf-capt');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- illustrated webcam avatars (no photos) ---------- */
  var P = [null,
    { bg: '#DBEAFE', sk: '#C68642', hr: '#1F2937', sh: '#93C5FD', l: 0 },
    { bg: '#FCE7F3', sk: '#A86B3C', hr: '#111827', sh: '#F9A8D4', l: 1 },
    { bg: '#E0E7FF', sk: '#E0AC69', hr: '#3F2A1D', sh: '#A5B4FC', l: 0 },
    { bg: '#DCFCE7', sk: '#8D5524', hr: '#111827', sh: '#86EFAC', l: 1 },
    { bg: '#FEF3C7', sk: '#D2A06D', hr: '#1F2937', sh: '#FCD34D', l: 0 },
    { bg: '#EDE9FE', sk: '#B5774B', hr: '#111827', sh: '#C4B5FD', l: 1 },
    { bg: '#CFFAFE', sk: '#7B4B2A', hr: '#0F172A', sh: '#67E8F9', l: 0 },
    { bg: '#FFE4E6', sk: '#E8B98A', hr: '#2B1B12', sh: '#FDA4AF', l: 1 }];
  function person(p, tx, ty, k, look) {
    var f = look ? ' transform="translate(6 1)"' : '';
    return '<g class="hd" transform="translate(' + tx + ' ' + ty + ') scale(' + k + ')">' +
      '<path d="M16 104C18 80 33 71 50 71s32 9 34 33z" fill="' + p.sh + '"/>' +
      '<rect x="44" y="58" width="12" height="15" rx="4" fill="' + p.sk + '"/>' +
      (p.l ? '<path d="M33 42c0-14 8-20 17-20s17 6 17 20v24h-7V44H40v22h-7z" fill="' + p.hr + '"/>' : '') +
      '<ellipse cx="50" cy="46" rx="15" ry="18" fill="' + p.sk + '"/>' +
      '<path d="M35 44c-1-15 8-21 15-21 8 0 16 5 15 21-3-8-8-11-15-11s-12 3-15 11z" fill="' + p.hr + '"/><g' + f + '>' +
      '<circle cx="44" cy="47" r="1.7" fill="#1F2937"/><circle cx="56" cy="47" r="1.7" fill="#1F2937"/>' +
      '<path d="M45.5 55.5q4.5 3 9 0" fill="none" stroke="#7C2D12" stroke-width="1.6" stroke-linecap="round"/></g></g>';
  }
  function avatar(n, mode) {
    var p = P[n] || P[1], s = '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<rect width="100" height="100" fill="' + p.bg + '"/><rect x="0" y="0" width="100" height="30" fill="#fff" opacity=".35"/>' +
      '<rect x="70" y="8" width="18" height="22" rx="2" fill="#fff" opacity=".55"/>';
    if (mode === 'two') s += person(P[6], -20, 8, 0.82) + person(p, 12, 4, 0.92);
    else if (mode === 'away') s += person(p, 3, 2, 1, true);
    else s += person(p, 0, 0, 1);
    return s + '</svg>';
  }
  root.querySelectorAll('[data-av]').forEach(function (e) {
    var c = e.classList, mode = c.contains('two') ? 'two' : c.contains('away') ? 'away' : '';
    e.insertAdjacentHTML('afterbegin', avatar(+e.getAttribute('data-av'), mode));
    if (mode === 'two') e.insertAdjacentHTML('beforeend', '<i class="bx" style="left:4%;top:24%;width:40%;height:48%"></i><i class="bx" style="left:47%;top:16%;width:42%;height:52%"></i>');
  });

  /* ---------- NTA-style OMR sheet (drawn, blank or filled + marked) ---------- */
  var KEY = 'BDACBADCCBDABDCACBDABCDBACDBCA', ANS = 'BDACBCDCCBDABACACBDABCDBDCDBCA';
  function omr(filled) {
    var s = '<svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><rect x="1" y="1" width="198" height="248" rx="4" fill="#FFF7FB" stroke="#F9A8D4"/>' +
      '<rect x="8" y="8" width="184" height="16" rx="2" fill="#FCE7F3"/><text x="100" y="19" text-anchor="middle" font-family="Inter,Arial" font-size="8" font-weight="700" fill="#9D174D" letter-spacing=".6">OMR ANSWER SHEET</text>';
    for (var t = 0; t < 22; t++) s += '<rect x="3" y="' + (32 + t * 9.6) + '" width="4" height="2.6" fill="#111827"/>';
    s += '<text x="13" y="34" font-family="Inter,Arial" font-size="5" font-weight="700" fill="#9D174D">ROLL NO.</text><rect x="12" y="37" width="46" height="9" fill="#fff" stroke="#F9A8D4" stroke-width=".6"/>';
    var roll = [1, 2, 0, 4, 2, 3];
    for (var c = 0; c < 6; c++) {
      if (filled) s += '<text x="' + (16 + c * 7.4) + '" y="44" font-family="Inter,Arial" font-size="6" font-weight="700" fill="#1F2937" text-anchor="middle">' + roll[c] + '</text>';
      for (var r = 0; r < 10; r++) {
        var on = filled && roll[c] === r;
        s += '<circle cx="' + (16 + c * 7.4) + '" cy="' + (52 + r * 7.2) + '" r="2.5" fill="' + (on ? '#1F2937' : '#fff') + '" stroke="#F472B6" stroke-width=".5"/>';
      }
    }
    for (var k = 0; k < 30; k++) {
      var col = Math.floor(k / 10), row = k % 10, x0 = 70 + col * 44, y = 42 + row * 19.5;
      s += '<text x="' + x0 + '" y="' + (y + 2) + '" font-family="Inter,Arial" font-size="5.5" font-weight="700" fill="#9D174D" text-anchor="end">' + (k + 1) + '</text>';
      for (var o = 0; o < 4; o++) {
        var cx = x0 + 6 + o * 8.6, L = 'ABCD'.charAt(o), pick = filled && L === ANS.charAt(k);
        s += '<circle cx="' + cx + '" cy="' + y + '" r="3" fill="' + (pick ? '#1F2937' : '#fff') + '" stroke="#F472B6" stroke-width=".55"/>';
        if (!pick) s += '<text x="' + cx + '" y="' + (y + 1.3) + '" font-family="Inter,Arial" font-size="3.6" fill="#F472B6" text-anchor="middle">' + L + '</text>';
        else s += '<circle class="om" style="transition-delay:' + (k * 0.035).toFixed(2) + 's" cx="' + cx + '" cy="' + y + '" r="4.6" fill="none" stroke="' + (ANS.charAt(k) === KEY.charAt(k) ? '#10B981' : '#EF4444') + '" stroke-width="1.3"/>';
      }
    }
    return s + '<rect x="12" y="236" width="60" height="6" fill="#fff" stroke="#F9A8D4" stroke-width=".5"/><text x="14" y="240.6" font-family="Inter,Arial" font-size="3.6" fill="#9D174D">Candidate signature</text></svg>';
  }
  root.querySelectorAll('.omr-gen').forEach(function (e) { e.innerHTML = omr(e.hasAttribute('data-fill')); });
  root.querySelectorAll('.kg').forEach(function (e) {
    var h = ''; for (var k = 0; k < 24; k++) h += '<span>' + (k + 1) + '<b>' + KEY.charAt(k) + '</b></span>'; e.innerHTML = h;
  });

  /* ---------- helpers ---------- */
  var idx = 0, timers = [], running = false, clockT = null, inst = false;
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function clear() { timers.forEach(clearTimeout); timers = []; clearInterval(clockT); }
  function q(s) { return root.querySelector(s); }
  function qa(s) { return [].slice.call(root.querySelectorAll(s)); }
  function add(s, c) { qa(s).forEach(function (e) { e.classList.add(c || 'show'); }); }
  function rm(s, c) { qa(s).forEach(function (e) { e.classList.remove(c || 'show'); }); }
  function txt(s, t) { qa(s).forEach(function (e) { e.textContent = t; }); }
  function act(k) { return q('[data-act="' + k + '"]'); }
  var PRESS = /btn-mini|ph-btn/;

  function pos(box, t) {
    var w = box.getBoundingClientRect(), r = t.getBoundingClientRect();
    if (!r.width || !w.width) return null;
    return { x: r.left - w.left + Math.min(r.width * 0.55, r.width - 8), y: r.top - w.top + r.height * 0.6 };
  }
  function moveTo(t) {
    if (inst || !t || !cur) return null;
    var p = pos(win, t); if (!p) return null;
    cur.style.transform = 'translate(' + p.x + 'px,' + p.y + 'px)';
    return p;
  }
  function press(t) {
    t.classList.add('on');
    if (PRESS.test(t.className)) later(function () { t.classList.remove('on'); }, 220);
  }
  function click(k) {
    var t = act(k); if (!t) return;
    if (inst) { if (!PRESS.test(t.className)) t.classList.add('on'); return; }
    var p = moveTo(t);
    later(function () {
      press(t);
      if (!p) return;
      var d = document.createElement('span'); d.className = 'xf-ring';
      d.style.left = p.x + 'px'; d.style.top = p.y + 'px';
      win.appendChild(d); setTimeout(function () { d.remove(); }, 600);
      cur.classList.remove('click'); void cur.offsetWidth; cur.classList.add('click');
    }, 650);
  }
  function tap(k, after) {
    var t = act(k); if (!t) return;
    if (inst) { if (!PRESS.test(t.className)) t.classList.add('on'); if (after) after(); return; }
    var w = phone.getBoundingClientRect(), r = t.getBoundingClientRect();
    if (r.width && w.width) {
      var x = r.left - w.left + r.width * 0.5, y = r.top - w.top + r.height * 0.55;
      tapEl.style.transform = 'translate(' + x + 'px,' + (y + 40) + 'px)';
      tapEl.classList.add('vis');
      later(function () { tapEl.style.transform = 'translate(' + x + 'px,' + y + 'px)'; }, 30);
    }
    later(function () {
      press(t);
      tapEl.classList.remove('press'); void tapEl.offsetWidth; tapEl.classList.add('press');
      later(function () { tapEl.classList.remove('vis'); }, 420);
      if (after) later(after, 250);
    }, 600);
  }
  function count(s) {
    qa(s).forEach(function (n) {
      var to = +n.getAttribute('data-to');
      if (inst || reduce) { n.textContent = to; return; }
      var t0 = performance.now(), d = 1300;
      (function f(now) {
        var k = Math.min(1, (now - t0) / d), e = 1 - Math.pow(1 - k, 3);
        n.textContent = Math.round(to * e);
        if (k < 1 && running) requestAnimationFrame(f); else n.textContent = to;
      })(t0);
    });
  }
  function fmt(s) { return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
  function clock(s) {
    txt('.clock,.ex-tm', fmt(s));
    if (inst) return;
    clockT = setInterval(function () { s--; txt('.clock,.ex-tm', fmt(s)); }, 1000);
  }
  function tile(n, cls, label) { var t = q('.tile:nth-child(' + n + ')'); if (!t) return; t.classList.add(cls); t.querySelector('.st').textContent = label; }
  function flags(n) { var f = q('.lv-n .fl'); f.textContent = n; f.classList.toggle('hot', n > 0); }
  function park() { if (cur.style.transform) return; var r = win.getBoundingClientRect(); if (r.width) cur.style.transform = 'translate(' + r.width * 0.72 + 'px,' + r.height * 0.7 + 'px)'; }
  function who(x) { root.setAttribute('data-who', x); park(); }
  function buzz() { if (inst) return; phone.classList.remove('buzz'); void phone.offsetWidth; phone.classList.add('buzz'); }
  function tilesIn() {
    qa('.tile').forEach(function (t, k) { if (inst) t.classList.add('show'); else later(function () { t.classList.add('show'); }, k * 170); });
  }

  /* ---------- scenes ---------- */
  var S = [
    { who: 't', t: 'Class, syllabus & questions', l: 'Create exam · step <b>1</b> of 3', dur: 5200,
      c: 'Pick the class and chapters. ekRank picks 30 questions by weightage, including past JEE papers.',
      a: [[300, function () { click('c12'); }], [800, function () { click('sa'); }], [1150, function () { click('sb'); }], [1500, function () { click('sc'); }],
          [1600, function () { count('.xs-count .cnt'); }], [2000, function () { click('t1'); }], [2350, function () { click('t2'); }],
          [2700, function () { click('t3'); }], [2850, function () { add('[data-act="ch1"]', 'on'); count('.qpanel .cnt'); add('.qmini'); add('.dmix'); }],
          [4200, function () { click('n1'); }]] },
    { who: 't', t: 'Online or offline (OMR)', l: 'Create exam · step <b>2</b> of 3', dur: 5900,
      c: 'Choose how each section writes: online with webcam and full-screen proctoring, or offline on OMR sheets.',
      a: [[300, function () { click('jee'); }], [950, function () { click('m1'); }], [1550, function () { click('m2'); }],
          [2200, function () { click('p1'); }], [2700, function () { click('p2'); }], [3200, function () { click('p3'); }], [3700, function () { click('p4'); }], [4800, function () { click('n2'); }]] },
    { who: 't', t: 'Approve & publish', l: 'Create exam · step <b>3</b> of 3', dur: 5600,
      c: 'HOD and principal approve. Publish, and online students get the exam on their phone.',
      a: [[300, function () { add('[data-act="a1"]', 'on'); }], [800, function () { add('[data-act="a2"]', 'on'); }], [1300, function () { add('[data-act="a3"]', 'on'); }],
          [2000, function () { click('pub'); }], [2750, function () { add('[data-sc="3"] .toast'); }],
          [2950, function () { who('s'); }], [3150, function () { add('[data-sc="1,2,3,4"] .notif'); buzz(); }]] },
    { who: 't', t: 'Question paper & OMR sheets', l: 'Offline exam · print', dur: 5400,
      c: 'For the offline section, the question paper, NTA-style OMR sheets and answer key are generated, ready to print.',
      pre: function () { add('[data-sc="1,2,3,4"] .notif'); },
      a: [[250, function () { add('.doc'); }], [3200, function () { click('print'); }], [3800, function () { add('[data-sc="4"] .toast'); }]] },
    { who: 's', t: 'Live exam · proctoring', l: 'During the exam', dur: 5300,
      c: 'Before the exam starts, the student’s camera, face and full-screen are checked.',
      pre: function () { txt('.clock,.ex-tm', '45:00'); },
      a: [[200, function () { count('.lv-n .jn'); tilesIn(); }], [450, function () { add('.cam', 'scan'); }],
          [800, function () { add('.chk li:nth-child(1)'); }], [1200, function () { add('.chk li:nth-child(2)'); }],
          [1600, function () { add('.chk li:nth-child(3)'); }], [2000, function () { add('.chk li:nth-child(4)'); }],
          [3000, function () { tap('start'); }]] },
    { who: 's', t: 'Live exam · proctoring', l: 'During the exam', dur: 5200,
      c: 'The student writes in a locked full-screen window while the teacher watches the class live.',
      pre: function () { txt('.lv-n .jn', '82'); var k = inst; inst = true; tilesIn(); inst = k; },
      a: [[0, function () { clock(42 * 60 + 18); }], [200, function () { count('.lv-n .wr'); }],
          [900, function () { moveTo(q('.tile:nth-child(3)')); }],
          [1400, function () { tap('ob'); }],
          [2700, function () { tap('save', function () { rm('[data-act="ob"]', 'on'); txt('.ex-q b', 'Q 15'); add('.ex-bar', 'nx15'); }); }]] },
    { who: 's', t: 'Live exam · proctoring', l: 'During the exam', dur: 6800,
      c: 'Leave the exam screen or move out of the camera and it is flagged. The student is warned, the teacher alerted.',
      pre: function () { txt('.lv-n .jn', '82'); txt('.lv-n .wr', '79'); var k = inst; inst = true; tilesIn(); inst = k; txt('.ex-q b', 'Q 15'); add('.ex-bar', 'nx15'); },
      a: [[0, function () { clock(38 * 60 + 5); }],
          [400, function () { add('.ps.exam', 'out'); }],
          [1100, function () { rm('.ps.exam', 'out'); add('.warn-m'); tile(1, 'red', 'Left screen 1/3'); add('.fa1'); flags(1); }],
          [1500, function () { moveTo(q('.fa1')); }],
          [2300, function () { tap('back', function () { rm('.warn-m'); }); }],
          [3100, function () { who('t'); }], [3300, function () { add('.pip', 'nof'); tile(1, 'red', 'No face'); add('.fa4'); }],
          [3800, function () { tile(2, 'amb', '2 faces'); add('.fa2'); flags(2); }],
          [4600, function () { rm('.pip', 'nof'); tile(1, 'red', 'Warned 1/3'); }],
          [5000, function () { tile(5, 'asub', 'Auto-submitted'); add('.fa3'); flags(3); }],
          [5300, function () { moveTo(q('.fa3')); }]] },
    { who: 't', t: 'Review flags', l: 'Proctoring review', dur: 5600,
      c: 'Review every flag with webcam snapshots. After 3 violations the exam submits itself.',
      a: [[250, function () { add('.snaps figure'); }], [1300, function () { var s = q('.snaps .bad .snap'); moveTo(s); if (s) later(function () { s.classList.add('zoom'); }, 650); }],
          [3000, function () { click('mark'); }], [3550, function () { add('[data-sc="8"] .toast'); }]] },
    { who: 't', t: 'Scan & evaluate OMR sheets', l: 'Offline exam · after the paper', dur: 6600,
      c: 'After the paper exam, scan the filled OMR sheets and upload them. ekRank reads every bubble and marks each sheet.',
      a: [[300, function () { click('up'); }], [1900, function () { var sh = q('.sheet'); sh.style.setProperty('--bh', sh.offsetHeight + 'px'); sh.classList.add('scan'); }],
          [3200, function () { add('.sheet'); count('.read .cnt'); qa('.mrow').forEach(function (m, k) { if (inst) m.classList.add('show'); else later(function () { m.classList.add('show'); }, k * 220); }); }],
          [5000, function () { add('[data-sc="9"] .toast'); }]] },
    { who: 's', t: 'Class results', l: 'After the exam', dur: 5200,
      c: 'Results the moment it ends, online and OMR students in one ranking: score, rank and why each mark was lost.',
      a: [[300, function () { count('[data-sc="10"] .cnt'); }], [450, function () { add('.hist'); add('.xdna'); }]] },
    { who: 't', t: 'What to teach next', l: 'After the exam', dur: 5800,
      c: 'See what to teach next and send practice in one tap. It lands in each student’s plan.',
      a: [[250, function () { add('.nx'); }], [2100, function () { click('practice'); }], [2650, function () { add('[data-sc="11"] .toast'); }],
          [3000, function () { who('s'); }], [3200, function () { add('[data-sc="11"] .notif'); buzz(); }]] }
  ];

  var DYN = ['on', 'show', 'scan', 'red', 'amb', 'asub', 'nof', 'hot', 'zoom', 'nx15', 'out'];
  function reset() {
    DYN.forEach(function (c) { qa('.' + c).forEach(function (e) { if (e.closest('.xf-steps') || e === cap) return; e.classList.remove(c); }); });
    txt('.tile .st', 'Writing'); txt('.lv-n .fl', '0'); txt('.ex-q b', 'Q 14');
    qa('.cnt').forEach(function (n) { n.textContent = '0'; });
    if (tapEl) tapEl.classList.remove('vis', 'press');
  }
  function head(i) {
    var s = S[i];
    title.textContent = s.t; stepl.innerHTML = s.l;
    root.setAttribute('data-who', s.who); root.setAttribute('data-s', i + 1); park();
    steps.forEach(function (li, k) { li.classList.toggle('cur', k === i); li.classList.toggle('done', k < i); });
    var ol = steps[0].parentNode;
    if (ol.scrollWidth > ol.clientWidth + 4) ol.scrollTo({ left: Math.max(0, steps[i].offsetLeft - steps[0].offsetLeft - 40), behavior: reduce ? 'auto' : 'smooth' });
    cap.classList.add('fade');
    setTimeout(function () { capN.textContent = i + 1; capR.textContent = s.who === 't' ? 'Teacher' : 'Student'; capR.classList.toggle('s', s.who === 's'); capT.textContent = s.c; cap.classList.remove('fade'); }, reduce ? 0 : 250);
  }
  function show(i, instant) {
    clear(); idx = i; inst = !!instant;
    secs.forEach(function (sc) { sc.classList.toggle('cur', sc.getAttribute('data-sc').split(',').indexOf(String(i + 1)) > -1); });
    reset(); head(i);
    if (S[i].pre) S[i].pre();
    if (instant) { S[i].a.forEach(function (a) { a[1](); }); inst = false; return; }
    S[i].a.forEach(function (a) { later(function () { if (running) a[1](); }, a[0] + 350); });
    later(function () { if (running) show((i + 1) % S.length, false); }, S[i].dur + 350);
  }

  function start() {
    if (running || reduce) return; running = true;
    show(idx, false);
  }
  function stop() { running = false; clear(); }

  steps.forEach(function (li, k) {
    li.addEventListener('click', function () {
      (window.dataLayer = window.dataLayer || []).push({ event: 'hero_flow_step', step: k + 1 });
      if (reduce) { show(k, true); return; }
      running = true; show(k, false);
    });
  });

  if (reduce) { show(6, true); return; }
  show(0, true); // static first frame until the hero scrolls into view
  // play only while the hero is on screen and the tab is visible
  var visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible && !document.hidden) start(); else stop();
    }, { threshold: 0.25 }).observe(root);
  } else start();
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else if (visible) start(); });
  var lastW = window.innerWidth, rt;
  window.addEventListener('resize', function () { if (window.innerWidth === lastW) return; lastW = window.innerWidth; clearTimeout(rt); rt = setTimeout(function () { if (running) show(idx, false); }, 250); });
})();
