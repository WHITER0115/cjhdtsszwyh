// ===== 混沌宇宙小说页逻辑 =====
(function () {
  'use strict';
  var KEY = 'cjhdtsszwyh-lang';
  var chapters = window.CHAOS_CHAPTERS || [];
  var list = document.getElementById('chaosChapterList');
  var reader = document.getElementById('chaosReader');
  var titleEl = document.getElementById('chaosReaderTitle');
  var bodyEl = document.getElementById('chaosReaderBody');
  var closeBtn = document.getElementById('chaosReaderClose');
  var backBtn = document.getElementById('chaosReaderBack');
  var backdrop = reader ? reader.querySelector('.reader-backdrop') : null;
  var langToggle = document.getElementById('chaosLangToggle');
  var docEl = document.documentElement;

  var COMING = { zh: '本章尚未更新，敬请期待。', en: 'This chapter has not been updated yet. Please stay tuned.' };

  function isEn() { return docEl.lang === 'en'; }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function renderList() {
    if (!list) return;
    list.innerHTML = '';
    var en = isEn();
    chapters.forEach(function (ch) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chaos-chapter' + (ch.locked ? ' is-locked' : '');
      btn.dataset.id = ch.id;
      var no = en ? (ch.no_en || ch.no) : ch.no;
      var name = en ? (ch.name_en || ch.name) : ch.name;
      var status = ch.locked ? (en ? 'Locked' : '未更新') : (en ? 'Read' : '阅读');
      btn.innerHTML =
        '<span class="chaos-ch-no">' + esc(no) + '</span>' +
        '<span class="chaos-ch-name">' + esc(name) + '</span>' +
        '<span class="chaos-ch-status">' + esc(status) + '</span>';
      btn.addEventListener('click', function () { openChapter(ch.id); });
      list.appendChild(btn);
    });
  }

  var current = null;
  function openChapter(id) {
    var ch = null;
    for (var i = 0; i < chapters.length; i++) { if (chapters[i].id === id) { ch = chapters[i]; break; } }
    if (!ch) return;
    var en = isEn();
    var no = en ? (ch.no_en || ch.no) : ch.no;
    var name = en ? (ch.name_en || ch.name) : ch.name;
    titleEl.textContent = no + '：' + name;
    if (ch.locked) {
      bodyEl.innerHTML = '<p class="chaos-end">' + esc(en ? COMING.en : COMING.zh) + '</p>';
    } else {
      bodyEl.innerHTML = ch.html || '';
    }
    current = ch;
    reader.hidden = false;
    reader.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    bodyEl.scrollTop = 0;
    reader.scrollTop = 0;
  }
  function closeReader() {
    reader.hidden = true;
    reader.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function setLang(lang) {
    docEl.lang = lang;
    document.title = lang === 'en'
      ? 'Chaos-Verse · Cui Family Black-Hole Devouring-Grandson Committee'
      : '混沌宇宙 · 崔家黑洞吞噬孙子委员会';
    var nodes = document.querySelectorAll('[data-en]');
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (!n.dataset.zh) n.dataset.zh = n.innerHTML;
      n.innerHTML = lang === 'en' ? n.dataset.en : n.dataset.zh;
    }
    if (langToggle) langToggle.textContent = lang === 'en' ? '中' : 'EN';
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    renderList();
    if (current && !reader.hidden) openChapter(current.id);
  }

  // init
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  setLang(saved === 'en' ? 'en' : 'zh-CN');

  if (langToggle) langToggle.addEventListener('click', function () {
    setLang(docEl.lang === 'en' ? 'zh-CN' : 'en');
  });
  if (closeBtn) closeBtn.addEventListener('click', closeReader);
  if (backBtn) backBtn.addEventListener('click', closeReader);
  if (backdrop) backdrop.addEventListener('click', closeReader);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && reader && !reader.hidden) closeReader();
  });
})();
