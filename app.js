document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const menuButton = document.getElementById('menu-button');
  const mobileNav = document.getElementById('mobile-nav');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }, { passive: true });

  menuButton?.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const id = anchor.getAttribute('href');
      const target = id && document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const slides = [
    'assets/product-video/export-video/screenshots/web/01-t.png',
    'assets/product-video/export-video/screenshots/web/02-t.png',
    'assets/product-video/export-video/screenshots/web/03-t.png',
    'assets/product-video/export-video/screenshots/web/create-exam.png',
    'assets/product-video/export-video/screenshots/web/06-t.png',
    'assets/product-video/export-video/screenshots/web/07-t.png'
  ];

  const videoStyles = document.createElement('style');
  videoStyles.textContent = `
    .product-video-modal { width: min(92vw, 900px); max-width: none; padding: 0; border: 0; border-radius: 24px; background: transparent; color: #f8fafc; box-shadow: 0 28px 90px rgba(0,0,0,.55); overflow: hidden; }
    .product-video-modal::backdrop { background: rgba(8, 10, 29, .82); backdrop-filter: blur(8px); }
    .product-video-card { position: relative; padding: 22px; background: linear-gradient(145deg, #121936, #271650 58%, #11162e); }
    .product-video-brand { display: flex; align-items: center; min-height: 38px; margin-bottom: 14px; }
    .product-video-brand img { width: 128px; height: auto; display: block; }
    .product-video-close { position: absolute; top: 12px; right: 16px; border: 0; background: transparent; color: #fff; font-size: 30px; line-height: 1; cursor: pointer; opacity: .8; }
    .product-video-close:hover { opacity: 1; }
    .product-video-frame { aspect-ratio: 16 / 9; overflow: hidden; border-radius: 14px; background: #080b1a; display: grid; place-items: center; }
    .product-video-slide { display: block; width: 100%; height: 100%; object-fit: contain; }
    .product-video-controls { display: flex; justify-content: space-between; gap: 16px; padding: 14px 2px 0; color: #c6cbea; font: 600 14px/1.4 system-ui, sans-serif; }
    .product-video-progress { color: #b8a1ff; }
    @media (max-width: 600px) { .product-video-card { padding: 14px; } .product-video-brand img { width: 104px; } .product-video-controls { font-size: 12px; } }
  `;
  document.head.append(videoStyles);

  const modal = document.createElement('dialog');
  modal.className = 'product-video-modal';
  modal.innerHTML = `
    <div class="product-video-card" role="document">
      <button class="product-video-close" type="button" aria-label="Close product video">×</button>
      <div class="product-video-brand"><img src="assets/product-video/export-video/assets/ekrank-logo-v6-dark.png" alt="ekRank" /></div>
      <div class="product-video-frame"><img class="product-video-slide" alt="ekRank teacher app preview" /></div>
      <div class="product-video-controls"><span class="product-video-caption">Teach smarter. Reteach sooner.</span><span class="product-video-progress" aria-live="polite"></span></div>
      <audio class="product-video-audio" preload="auto" src="assets/product-video/export-video/assets/ekrank-video-music.wav"></audio>
    </div>`;
  document.body.append(modal);

  const slide = modal.querySelector('.product-video-slide');
  const progress = modal.querySelector('.product-video-progress');
  const audio = modal.querySelector('.product-video-audio');
  const closeButton = modal.querySelector('.product-video-close');
  let timer;
  let index = 0;

  const renderSlide = () => {
    slide.src = slides[index];
    progress.textContent = `${index + 1} / ${slides.length}`;
  };
  const stopVideo = () => {
    clearInterval(timer);
    audio.pause();
    audio.currentTime = 0;
    modal.close();
  };
  const startVideo = (event) => {
    const trigger = event.composedPath().find((element) => element instanceof Element && (element.matches('button, [role="button"]') || element.getAttribute('aria-label')));
    if (!trigger) return;
    const label = `${trigger.getAttribute('aria-label') || ''} ${trigger.textContent || ''}`;
    if (!label.includes('45-second') && !label.includes('45 second')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    index = 0;
    renderSlide();
    modal.showModal();
    audio.play().catch(() => {});
    timer = setInterval(() => {
      index = (index + 1) % slides.length;
      renderSlide();
    }, 7500);
  };
  document.addEventListener('click', startVideo, true);
  closeButton.addEventListener('click', stopVideo);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) stopVideo();
  });
  modal.addEventListener('cancel', stopVideo);
});
