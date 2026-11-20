/* ekRank hero: animated create-exam flow. No dependencies. */
(function () {
  'use strict';
  var root = document.getElementById('xf');
  if (!root) return;
  var win = root.querySelector('.xf-win'), cur = root.querySelector('.xf-cur');
  var steps = [].slice.call(root.querySelectorAll('.xf-steps li'));
  var scenes = [].slice.call(root.querySelectorAll('.xs'));
  var title = root.querySelector('.xf-title'), stepl = root.querySelector('.xf-stepl'), prog = root.querySelector('.xf-prog i');
  var cap = root.querySelector('.xf-cap'), capN = root.querySelector('.xf-capn'), capT = root.querySelector('.xf-capt');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var S = [
    { t: 'Class & syllabus', l: 'Step <b>1</b> of 5', p: 20, dur: 4300,
      c: 'Pick the class and chapters. Weightage and past-paper counts are shown for every topic.',
      a: [[300, 'click', 'c12'], [900, 'click', 'sa'], [1400, 'click', 'sc'], [1500, 'count'], [1950, 'click', 't1'], [2400, 'click', 't2'], [2850, 'click', 't3'], [2950, 'on', 'ch1'], [3050, 'show', '.pop'], [3600, 'click', 'next1']] },
    { t: 'Questions', l: 'Step <b>2</b> of 5', p: 40, dur: 4300,
      c: 'ekRank picks 30 questions by weightage from 43,000+, including previous-year questions. Swap any in one click.',
      a: [[250, 'count'], [2300, 'click', 'swap'], [3650, 'click', 'next2']] },
    { t: 'Format', l: 'Step <b>3</b> of 5', p: 60, dur: 3500,
      c: 'Choose the pattern. JEE Main marking and the difficulty mix are set for you.',
      a: [[500, 'click', 'jee'], [2800, 'click', 'next3']] },
    { t: 'Schedule', l: 'Step <b>4</b> of 5', p: 80, dur: 3600,
      c: 'Schedule it online with proctoring, on OMR paper, or both.',
      a: [[600, 'click', 'online'], [1400, 'click', 'omr'], [2900, 'click', 'next4']] },
    { t: 'Approve & publish', l: 'Step <b>5</b> of 5', p: 100, dur: 4800,
      c: 'HOD and principal approve. Publish, and every student is notified — paper, answer key and OMR sheets are ready to print.',
      a: [[450, 'on', 'a1'], [1100, 'on', 'a2'], [1750, 'on', 'a3'], [2600, 'click', 'pub'], [3200, 'show', '.toast']] },
    { t: 'Live exam', l: 'During the exam', p: 100, dur: 4300,
      c: 'Watch it live: who joined, who is writing, who submitted — and anyone who left the screen.',
      a: [[200, 'count'], [200, 'clock'], [900, 'move', '.lv-n > div:nth-child(3)'], [2100, 'show', '.lv-alert']] },
    { t: 'Results', l: 'After the exam', p: 100, dur: 5600,
      c: 'Results the moment it closes, with exactly what to teach next. Send practice in one tap.',
      a: [[300, 'count'], [2900, 'click', 'practice'], [3450, 'show', '.toast']] }
  ];

  var idx = 0, timers = [], running = false, clockT = null;
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function clear() { timers.forEach(clearTimeout); timers = []; clearInterval(clockT); }

  function el(sc, key) { return sc.querySelector('[data-act="' + key + '"]'); }
  function moveTo(target) {
    if (!target || !cur) return;
    var w = win.getBoundingClientRect(), r = target.getBoundingClientRect();
    if (!r.width) return;
    var x = r.left - w.left + Math.min(r.width * 0.55, r.width - 8), y = r.top - w.top + r.height * 0.62;
    cur.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    return { x: x, y: y };
  }
  function ring(p) {
    if (!p) return;
    var d = document.createElement('span'); d.className = 'xf-ring';
    d.style.left = p.x + 'px'; d.style.top = p.y + 'px';
    win.appendChild(d); setTimeout(function () { d.remove(); }, 600);
    cur.classList.remove('click'); void cur.offsetWidth; cur.classList.add('click');
  }
  function count(sc, instant) {
    sc.querySelectorAll('.cnt').forEach(function (n) {
      var to = +n.getAttribute('data-to');
      if (instant || reduce) { n.textContent = to; return; }
      var t0 = performance.now(), d = 1300;
      (function f(now) {
        var k = Math.min(1, (now - t0) / d), e = 1 - Math.pow(1 - k, 3);
        n.textContent = Math.round(to * e);
        if (k < 1 && running) requestAnimationFrame(f); else n.textContent = to;
      })(t0);
    });
  }
  function clock(sc) {
    var c = sc.querySelector('.clock'), s = 28 * 60 + 41;
    if (!c) return;
    c.textContent = '28:41';
    clockT = setInterval(function () { s--; c.textContent = Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }, 1000);
  }
  function reset(sc) {
    sc.querySelectorAll('.on').forEach(function (e) { if (e.hasAttribute('data-act')) e.classList.remove('on'); });
    sc.querySelectorAll('.show').forEach(function (e) { e.classList.remove('show'); });
    sc.querySelectorAll('.cnt').forEach(function (n) { n.textContent = '0'; });
  }
  function act(sc, a, instant) {
    var type = a[1], key = a[2];
    if (type === 'count') return count(sc, instant);
    if (type === 'clock') return instant ? null : clock(sc);
    if (type === 'move') { if (!instant) moveTo(sc.querySelector(key)); return; }
    if (type === 'show') { sc.querySelectorAll(key).forEach(function (e) { e.classList.add('show'); }); return; }
    var t = el(sc, key); if (!t) return;
    if (type === 'on' || instant) { if (!/^next|^pub$/.test(key)) t.classList.add('on'); return; }
    // click: travel, then press
    var p = moveTo(t);
    later(function () {
      ring(p); t.classList.add('on');
      if (/^next|^pub$/.test(key)) later(function () { t.classList.remove('on'); }, 220);
    }, 650);
  }

  function head(i) {
    var s = S[i];
    title.textContent = s.t; stepl.innerHTML = s.l; prog.style.width = s.p + '%';
    steps.forEach(function (li, k) { li.classList.toggle('cur', k === i); li.classList.toggle('done', k < i); });
    var ol = steps[0].parentNode;
    if (ol.scrollWidth > ol.clientWidth + 4) ol.scrollTo({ left: Math.max(0, steps[i].offsetLeft - steps[0].offsetLeft - 40), behavior: reduce ? 'auto' : 'smooth' });
    cap.classList.add('fade');
    setTimeout(function () { capN.textContent = i + 1; capT.textContent = s.c; cap.classList.remove('fade'); }, reduce ? 0 : 250);
    root.setAttribute('data-s', i + 1);
  }

  function show(i, instant) {
    clear(); idx = i;
    scenes.forEach(function (sc, k) { sc.classList.toggle('cur', k === i); });
    var sc = scenes[i]; reset(sc); head(i);
    if (instant) { S[i].a.forEach(function (a) { act(sc, a, true); }); return; }
    S[i].a.forEach(function (a) { later(function () { if (running) act(sc, a, false); }, a[0] + 450); });
    later(function () { if (running) show((i + 1) % S.length, false); }, S[i].dur + 450);
  }

  function start() { if (running || reduce) return; running = true; show(idx, false); }
  function stop() { running = false; clear(); }

  steps.forEach(function (li, k) {
    li.addEventListener('click', function () {
      if (reduce) { show(k, true); return; }
      running = true; show(k, false);
      (window.dataLayer = window.dataLayer || []).push({ event: 'hero_flow_step', step: k + 1 });
    });
  });

  if (reduce) { show(4, true); return; }
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
