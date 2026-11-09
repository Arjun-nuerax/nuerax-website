/* ekRank website behaviour — vanilla JS, no dependencies. */
(function () {
  'use strict';
  var CFG = window.EKRANK_CONFIG || {};
  var WA = CFG.whatsapp || '917331120766';
  var dl = (window.dataLayer = window.dataLayer || []);
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- CTA click tracking (GTM) ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-cta]');
    if (a) dl.push({ event: 'cta_click', cta_id: a.getAttribute('data-cta'), link_url: a.href || '' });
  }, true);

  /* ---------- Config-driven links ---------- */
  var yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
  var ios = $('#store-ios'), android = $('#store-android');
  if (ios) ios.href = CFG.appStoreUrl || CFG.webAppUrl || ios.href;
  if (android) android.href = CFG.playStoreUrl || CFG.webAppUrl || android.href;
  $$('a[href^="https://wa.me/"]').forEach(function (a) {
    a.href = a.href.replace(/wa\.me\/\d+/, 'wa.me/' + WA);
  });

  /* ---------- Header + sticky mobile CTA on scroll ---------- */
  var header = $('#header'), sticky = $('#sticky'), demo = $('#demo');
  var ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    var atDemo = demo && demo.getBoundingClientRect().top < window.innerHeight * 0.8;
    sticky.classList.toggle('show', y > 600 && !atDemo);
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- Hero product film ---------- */
  /* Keeps playing while the visitor scrolls. As the film slides out of view the
     sound fades with it; once it is (almost) fully off-screen, audio and voice-over
     fade to silence and the film is closed, leaving the play button ready again. */
  var shot = $('#hero-shot'), playBtn = $('#play-film'), heroShot = shot.closest('.hero-shot');
  var film = null, closeBtn = null, io = null, stopping = false, fadeRaf = 0, gain = 1;
  var STOP_AT = 0.1;          // visible share at which the film stops
  var FULL_AT = 0.6;          // visible share at/above which volume is full
  function filmWin() { try { return film && film.contentWindow; } catch (e) { return null; } }
  function setGain(g) {
    gain = Math.max(0, Math.min(1, g));
    var w = filmWin();
    if (!w) return;
    try {
      w.__ekGain = gain; // read by the film on every frame (music + new voice lines)
      Array.prototype.forEach.call(w.document.querySelectorAll('video,audio'), function (m) {
        m.volume = Math.min(m.volume, 0.8 * gain + 0.0001);
      });
    } catch (e) {}
  }
  function silence() {
    var w = filmWin();
    try {
      if (w && w.speechSynthesis) w.speechSynthesis.cancel();
      if (w) Array.prototype.forEach.call(w.document.querySelectorAll('video,audio'), function (m) { m.pause(); });
    } catch (e) {}
  }
  function teardown() {
    cancelAnimationFrame(fadeRaf);
    silence();
    if (io) { io.disconnect(); io = null; }
    if (film) film.remove();
    if (closeBtn) closeBtn.remove();
    film = closeBtn = null; stopping = false; gain = 1;
    heroShot.classList.remove('playing');
    playBtn.hidden = false;
  }
  function stopFilm(reason, ms) {
    if (!film || stopping) return;
    stopping = true;
    dl.push({ event: 'video_stop', video_title: 'ekRank Teacher App film', reason: reason });
    var w = filmWin();
    try { if (w && w.speechSynthesis) w.speechSynthesis.cancel(); } catch (e) {} // voice can't fade; end it first
    var dur = reduceMotion ? 0 : (ms == null ? 700 : ms), from = gain, t0 = performance.now();
    film.classList.add('fading');
    (function step(now) {
      var p = dur ? Math.min(1, (now - t0) / dur) : 1;
      setGain(from * (1 - p) * (1 - p));
      if (p < 1) fadeRaf = requestAnimationFrame(step); else teardown();
    })(t0);
  }
  playBtn.addEventListener('click', function () {
    if (film) return;
    film = document.createElement('iframe');
    film.className = 'film';
    film.src = 'film.html?embed=1';
    film.title = 'ekRank Teacher App product film';
    film.allow = 'autoplay';
    closeBtn = document.createElement('button');
    closeBtn.type = 'button'; closeBtn.className = 'film-close'; closeBtn.setAttribute('aria-label', 'Close film');
    closeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F1F5F9" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    closeBtn.addEventListener('click', function () { stopFilm('close', 350); playBtn.focus(); });
    shot.appendChild(film); shot.appendChild(closeBtn);
    playBtn.hidden = true;
    heroShot.classList.add('playing');
    closeBtn.focus({ preventScroll: true });
    dl.push({ event: 'video_start', video_title: 'ekRank Teacher App film' });
    gain = 1;
    if ('IntersectionObserver' in window) {
      var th = []; for (var i = 0; i <= 20; i++) th.push(i / 20);
      io = new IntersectionObserver(function (es) {
        if (!film || stopping) return;
        var r = es[es.length - 1].intersectionRatio;
        if (r <= STOP_AT) { stopFilm('scrolled_away'); return; }
        setGain(Math.min(1, (r - STOP_AT) / (FULL_AT - STOP_AT)));
      }, { threshold: th });
      io.observe(shot);
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && film) { stopFilm('escape', 350); playBtn.focus(); } });
  document.addEventListener('visibilitychange', function () { if (document.hidden) silence(); });
  window.addEventListener('pagehide', silence);

  /* ---------- "One school day" tabs (auto-advance every 6s) ---------- */
  var DAY = [
    { time: '08:30', t: 'Plan', h: 'Open the app. Know what matters today.', d: 'Priorities, follow-ups and the day’s live exam — on one screen.' },
    { time: '09:00', t: 'Create', h: 'A full chapter test in five steps.', d: 'Pick chapters and topics with weightage. Questions and PYQs come from the Question Bank.' },
    { time: '11:00', t: 'Monitor', h: 'Watch the exam as it happens.', d: 'Joined, writing, submitted — live, by class and section.' },
    { time: '11:46', t: 'Results', h: 'Results the moment it closes.', d: 'Every attempt scored. See who needs attention and which topics to reteach.' },
    { time: '12:00', t: 'Reteach', h: 'Turn gaps into targeted practice.', d: 'Students who need focus get practice on exactly the topics they missed.' }
  ];
  var tabsEl = $('#day-tabs'), panel = $('#day-panel'), imgs = $$('#day-imgs img');
  var cur = 0, auto = !reduceMotion, dayTimer, visible = true;
  tabsEl.innerHTML = DAY.map(function (x, i) {
    return '<button type="button" role="tab" class="tab" id="dt-' + i + '" aria-controls="day-panel" aria-selected="false" tabindex="-1">' +
      '<span class="tm">' + x.time + '</span><span class="tt">' + x.t + '</span><span class="bar" aria-hidden="true"></span></button>';
  }).join('');
  var tabs = $$('.tab', tabsEl);
  function showDay(i) {
    cur = i;
    tabs.forEach(function (b, j) {
      var on = j === i;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
      b.classList.toggle('done', j < i);
      b.classList.remove('running');
    });
    if (auto) { void tabs[i].offsetWidth; tabs[i].classList.add('running'); }
    panel.setAttribute('aria-labelledby', 'dt-' + i);
    $('#day-time').textContent = DAY[i].time;
    $('#day-h3').textContent = DAY[i].h;
    $('#day-d').textContent = DAY[i].d;
    imgs.forEach(function (im, j) { im.classList.toggle('on', j === i); });
    // On phones the tabs scroll sideways: keep the active one in view (without moving the page)
    if (tabsEl.scrollWidth > tabsEl.clientWidth + 4) {
      var left = tabs[i].offsetLeft - tabs[0].offsetLeft;
      tabsEl.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }
  function stopAuto() { auto = false; clearInterval(dayTimer); tabs.forEach(function (b) { b.classList.remove('running'); }); }
  function startAuto() {
    clearInterval(dayTimer);
    dayTimer = setInterval(function () { if (auto && visible && !document.hidden) showDay((cur + 1) % DAY.length); }, 6000);
  }
  tabs.forEach(function (b, i) {
    b.addEventListener('click', function () { stopAuto(); showDay(i); });
    b.addEventListener('keydown', function (e) {
      var k = e.key, n = null;
      if (k === 'ArrowRight' || k === 'ArrowDown') n = (i + 1) % DAY.length;
      else if (k === 'ArrowLeft' || k === 'ArrowUp') n = (i - 1 + DAY.length) % DAY.length;
      else if (k === 'Home') n = 0; else if (k === 'End') n = DAY.length - 1;
      if (n !== null) { e.preventDefault(); stopAuto(); showDay(n); tabs[n].focus(); }
    });
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: 0.2 }).observe(panel);
  }
  showDay(0);
  if (auto) startAuto();

  /* ---------- FAQ accordion (one open at a time) ---------- */
  var qs = $$('.faq-q');
  qs.forEach(function (q) {
    q.addEventListener('click', function () {
      var open = q.getAttribute('aria-expanded') === 'true';
      qs.forEach(function (o) { o.setAttribute('aria-expanded', 'false'); $('#' + o.getAttribute('aria-controls')).hidden = true; });
      if (!open) { q.setAttribute('aria-expanded', 'true'); $('#' + q.getAttribute('aria-controls')).hidden = false; dl.push({ event: 'faq_open', faq: q.textContent.replace('+', '').trim() }); }
    });
  });

  /* ---------- Demo form ---------- */
  var form = $('#demo-form'), success = $('#demo-success'), btn = $('#submit-btn'), formErr = $('#form-error');
  var F = { inst: $('#f-inst'), contact: $('#f-contact'), mobile: $('#f-mobile') };
  var tried = false, sending = false;

  function normMobile(v) { return v.replace(/\D/g, '').replace(/^(?:91|0)(?=\d{10}$)/, ''); }
  function validate() {
    var e = {};
    if (!F.inst.value.trim()) e.inst = 'Enter your institution name.';
    if (!F.contact.value.trim()) e.contact = "Enter the contact person's name.";
    var m = normMobile(F.mobile.value);
    if (!F.mobile.value.trim()) e.mobile = 'Enter a mobile number.';
    else if (!/^[6-9]\d{9}$/.test(m)) e.mobile = 'Enter a valid 10-digit Indian mobile number.';
    return e;
  }
  function paint(e) {
    Object.keys(F).forEach(function (k) {
      F[k].setAttribute('aria-invalid', String(!!e[k]));
      $('#f-' + k + '-err').textContent = e[k] || '';
    });
  }
  Object.keys(F).forEach(function (k) {
    F[k].addEventListener('input', function () { if (tried) paint(validate()); });
  });
  F.mobile.addEventListener('blur', function () {
    var m = normMobile(F.mobile.value);
    if (/^\d{10}$/.test(m)) F.mobile.value = m.slice(0, 5) + ' ' + m.slice(5);
  });

  function post(url, body) {
    return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r; });
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (sending) return;
    tried = true;
    formErr.hidden = true;
    var e = validate(); paint(e);
    var firstBad = ['inst', 'contact', 'mobile'].filter(function (k) { return e[k]; })[0];
    if (firstBad) { F[firstBad].focus(); return; }
    if ($('#f-hp').value) { showSuccess(); return; } // bot trap

    var lead = {
      inst: F.inst.value.trim(), contact: F.contact.value.trim(), mobile: '+91 ' + normMobile(F.mobile.value)
    };
    var msg = 'New demo request — ekRank\nInstitution: ' + lead.inst + '\nContact: ' + lead.contact + '\nMobile: ' + lead.mobile;
    var waLink = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
    $('#wa-confirm').href = waLink;
    dl.push({ event: 'generate_lead', form_id: 'demo', currency: 'INR', value: CFG.leadValue || 199 });

    if (CFG.openWhatsAppOnSubmit !== false) window.open(waLink, '_blank', 'noopener');

    sending = true; btn.disabled = true; btn.textContent = 'Sending…';
    var jobs = [];
    if (CFG.leadEmail) {
      jobs.push(post('https://formsubmit.co/ajax/' + encodeURIComponent(CFG.leadEmail), {
        _subject: 'New demo request — ' + lead.inst, _template: 'table', _captcha: 'false',
        Institution: lead.inst, 'Contact person': lead.contact, Mobile: lead.mobile, Page: location.href
      }));
    }
    if (CFG.leadWebhook) {
      jobs.push(post(CFG.leadWebhook, { institution: lead.inst, contact: lead.contact, mobile: lead.mobile, page: location.href, submittedAt: new Date().toISOString() }));
    }
    var settle = Promise.allSettled ? Promise.allSettled(jobs) : Promise.all(jobs.map(function (p) { return p.then(function () { return { status: 'fulfilled' }; }, function () { return { status: 'rejected' }; }); }));
    settle.then(function (res) {
      sending = false; btn.disabled = false; btn.textContent = 'Discuss pricing — Book a demo';
      var anyOk = !jobs.length || res.some(function (r) { return r.status === 'fulfilled'; });
      if (anyOk || CFG.openWhatsAppOnSubmit !== false) {
        showSuccess();
      } else {
        formErr.innerHTML = 'We couldn’t send that just now. Please <a href="' + waLink + '" target="_blank" rel="noopener">send it on WhatsApp</a> or call +91 73311 20766.';
        formErr.hidden = false;
      }
    });
  });

  function showSuccess() {
    form.hidden = true; success.hidden = false; success.focus();
  }
  $('#reset-form').addEventListener('click', function () {
    form.reset(); tried = false; paint({}); formErr.hidden = true;
    success.hidden = true; form.hidden = false; F.inst.focus();
  });
})();
