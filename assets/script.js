// ===== 中英文切换 =====
(function () {
  const KEY = 'cjhdtsszwyh-lang';
  const toggle = document.getElementById('langToggle');
  const docHtml = document.documentElement;
  const TITLES = {
    zh: 'CJHDTSSZWYH · 崔家黑洞吞噬孙子委员会 | 混沌宇宙终焉体企业集团',
    en: 'CJHDTSSZWYH · Cui Family Black-Hole Devouring-Grandson Committee | Chaos-Verse Terminal-Entity Conglomerate'
  };
  const META_DESC_ZH = '崔家黑洞吞噬孙子委员会（CJHDTSSZWYH）官方门户——混沌宇宙终焉体企业集团。创始四君共治，十七席终焉体全员名录、事业部、混沌联动技与荒诞经营范围一览。';
  const META_DESC_EN = 'Official portal of the Cui Family Black-Hole Devouring-Grandson Committee (CJHDTSSZWYH) — a Chaos-Verse terminal-entity conglomerate. Co-governed by the Four Founding Sovereigns; 17 members, divisions, chaos linkage and absurd business scope.';

  // 收集所有带 data-en 的元素，首次保存中文原文
  const nodes = Array.from(document.querySelectorAll('[data-en]'));
  nodes.forEach(n => { if (!n.dataset.zh) n.dataset.zh = n.innerHTML; });
  const phInput = document.getElementById('rosterSearch');
  if (phInput && phInput.dataset.enPh) phInput.dataset.phZh = phInput.placeholder;

  function setLang(lang) {
    const en = lang === 'en';
    docHtml.lang = en ? 'en' : 'zh-CN';
    nodes.forEach(n => { n.innerHTML = en ? n.dataset.en : n.dataset.zh; });
    if (phInput) phInput.placeholder = en ? phInput.dataset.enPh : phInput.dataset.phZh;
    document.title = TITLES[lang];
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', en ? META_DESC_EN : META_DESC_ZH);
    if (toggle) toggle.textContent = en ? '中' : 'EN';
    document.body.classList.toggle('lang-en', en);
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    if (window.__updateRosterCount) window.__updateRosterCount();
  }

  const saved = (function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } })();
  setLang(saved === 'en' ? 'en' : 'zh');
  if (toggle) toggle.addEventListener('click', () => {
    setLang(docHtml.lang === 'en' ? 'zh' : 'en');
  });
})();

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

// ===== 申请加入弹窗 =====
(function () {
  const openBtn = document.getElementById('applyOpen');
  const modal = document.getElementById('applyModal');
  if (!openBtn || !modal) return;
  const formView = document.getElementById('applyFormView');
  const rejectView = document.getElementById('applyRejectView');
  const cancelBtn = document.getElementById('applyCancel');
  const confirmBtn = document.getElementById('applyConfirm');
  const backBtn = document.getElementById('applyBack');
  const closeBtns = modal.querySelectorAll('.apply-close');
  const backdrop = modal.querySelector('.apply-backdrop');

  function openModal() {
    formView.hidden = false;
    rejectView.hidden = true;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    formView.hidden = false;
    rejectView.hidden = true;
  }
  function showReject() {
    formView.hidden = true;
    rejectView.hidden = false;
  }

  openBtn.addEventListener('click', openModal);
  cancelBtn.addEventListener('click', closeModal);
  backBtn.addEventListener('click', closeModal);
  closeBtns.forEach(b => b.addEventListener('click', closeModal));
  if (backdrop) backdrop.addEventListener('click', closeModal);
  confirmBtn.addEventListener('click', showReject);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  // 占位符双语同步
  const phNodes = Array.from(modal.querySelectorAll('[data-en-ph]'));
  phNodes.forEach(el => { if (!el.dataset.phZh) el.dataset.phZh = el.placeholder; });
  function syncPh() {
    const en = document.documentElement.lang === 'en';
    phNodes.forEach(el => { el.placeholder = en ? el.dataset.enPh : el.dataset.phZh; });
  }
  syncPh();
  const langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', syncPh);
})();
