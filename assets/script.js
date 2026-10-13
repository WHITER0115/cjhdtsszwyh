// ===== 移动端菜单 =====
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }
})();

// ===== 导航锚点高亮 (IntersectionObserver) =====
(function () {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const map = {};
  navLinks.forEach(a => {
    const id = a.getAttribute('href').slice(1);
    map[id] = a;
  });
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const link = map[e.target.id];
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => obs.observe(s));
})();

// ===== 名录搜索过滤（中英双语） =====
(function () {
  const input = document.getElementById('rosterSearch');
  const grid = document.getElementById('rosterGrid');
  const count = document.getElementById('rosterCount');
  if (!input || !grid) return;
  const cards = Array.from(grid.querySelectorAll('.member-card'));
  const total = cards.length;
  const en = () => document.documentElement.lang === 'en';

  function update() {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach(card => {
      const names = (card.dataset.name || '') + ' ' + (card.dataset.enName || '') + ' ';
      const texts = card.querySelectorAll('[data-en]');
      let hay = names;
      texts.forEach(t => { hay += t.textContent + ' '; });
      hay = hay.toLowerCase();
      const match = q === '' || hay.includes(q);
      card.classList.toggle('hide', !match);
      if (match) shown++;
    });
    if (count) {
      count.textContent = q === ''
        ? (en() ? `${total} seats total` : `共 ${total} 席`)
        : (en() ? `matched ${shown} / ${total}` : `匹配 ${shown} / ${total} 席`);
    }
  }
  window.__updateRosterCount = update;
  input.addEventListener('input', update);
  update();
})();

// ===== 光标跟随光晕 =====
(function () {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
  if (window.matchMedia('(hover: none)').matches) return; // 触屏不启用
  let raf = null, x = 0, y = 0;
  window.addEventListener('mousemove', (e) => {
    x = e.clientX; y = e.clientY;
    glow.style.opacity = '1';
    if (!raf) {
      raf = requestAnimationFrame(() => {
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
        raf = null;
      });
    }
  }, { passive: true });
  document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
})();

// ===== 返回顶部 =====
(function () {
  const btn = document.getElementById('toTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

