/* 클릭 스파클(랜딩과 동일) + 다운로드 링크 Blob 저장(미리보기 우회) */
(function () {
  'use strict';

  var SPARKLE_SELECTOR = '.btn, .why-card, .service-card, .ref-card, .news-card, .cta-form-submit, .gnb-logo, .lang-switcher-trigger, .lang-option, .gnb-menu-btn, .gnb-fullmenu-close, .back-top, .floating-brochure, .ci-download-btn, .supreme-btn, .gnb-trigger, .gnb-submenu a, .gnb-fullmenu-col a, .sub-nav.section-inner .sub-nav-links a, .sub-nav.section-inner .breadcrumb a';

  var PARTICLE_COUNT_MIN = 12;
  var PARTICLE_COUNT_MAX = 18;
  var DURATION_MS = 650;
  var DIST_MIN = 28;
  var DIST_MAX = 58;
  var SIZE_MIN = 5;
  var SIZE_MAX = 10;

  function createSparkle(clientX, clientY) {
    var count = PARTICLE_COUNT_MIN + Math.floor(Math.random() * (PARTICLE_COUNT_MAX - PARTICLE_COUNT_MIN + 1));
    var burst = document.createElement('div');
    burst.className = 'sparkle-burst';
    burst.style.left = clientX + 'px';
    burst.style.top = clientY + 'px';
    for (var i = 0; i < count; i++) {
      var angle = Math.random() * Math.PI * 2;
      var dist = DIST_MIN + Math.random() * (DIST_MAX - DIST_MIN);
      var dx = Math.cos(angle) * dist;
      var dy = Math.sin(angle) * dist;
      var size = SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN);
      var span = document.createElement('span');
      span.className = 'sparkle-particle' + (Math.random() > 0.5 ? ' sparkle-blue' : '');
      span.style.setProperty('--dx', dx + 'px');
      span.style.setProperty('--dy', dy + 'px');
      span.style.width = size + 'px';
      span.style.height = size + 'px';
      burst.appendChild(span);
    }
    document.body.appendChild(burst);
    setTimeout(function () {
      if (burst.parentNode) burst.parentNode.removeChild(burst);
    }, DURATION_MS);
  }

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.addEventListener(
    'click',
    function (e) {
      if (reducedMotion || !e.target.closest(SPARKLE_SELECTOR)) return;
      createSparkle(e.clientX, e.clientY);
    },
    false
  );

  function blobDownload(url, filename) {
    return fetch(url, { mode: 'cors', credentials: 'omit', cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('fetch failed');
        return r.blob();
      })
      .then(function (blob) {
        var u = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = u;
        a.download = filename || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function () {
          URL.revokeObjectURL(u);
        }, 2500);
      });
  }

  document.addEventListener(
    'click',
    function (e) {
      var link = e.target.closest('a.bdgen-force-download, a.ci-download-btn');
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#') return;
      var downloadName = link.getAttribute('download');
      if (!downloadName) downloadName = 'download';
      var abs;
      try {
        abs = new URL(href, window.location.href).href;
      } catch (err) {
        abs = href;
      }
      e.preventDefault();
      e.stopPropagation();
      blobDownload(abs, downloadName).catch(function () {
        var a = document.createElement('a');
        a.href = href;
        a.setAttribute('download', downloadName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    },
    true
  );

  /* Subpages language switcher (header nav / full menu) */
  (function initSubpageLangSwitch() {
    var switcher = document.querySelector('.lang-switcher');
    var options = document.querySelectorAll('.lang-option[data-lang]');
    if (!switcher || !options.length) return;

    var LABELS = {
      ko: {
        company: '회사소개',
        history: '연혁·인증',
        ci: 'CI소개',
        business: '사업영역',
        solution: '솔루션',
        reference: '레퍼런스',
        careers: '채용'
      },
      en: {
        company: 'Company',
        history: 'History',
        ci: 'CI',
        business: 'Business',
        solution: 'Solutions',
        reference: 'Reference',
        careers: 'Careers'
      }
    };

    function setTextByHref(scope, hrefEndsWith, text) {
      if (!scope) return;
      var selector = 'a[href$="' + hrefEndsWith + '"]';
      scope.querySelectorAll(selector).forEach(function (a) {
        a.textContent = text;
      });
    }

    function applyNavLanguage(lang) {
      var t = LABELS[lang] || LABELS.ko;
      var gnbNav = document.querySelector('.gnb-nav');
      var fullMenu = document.querySelector('.gnb-fullmenu-nav');

      // Top nav labels
      setTextByHref(gnbNav, 'about-intro.html', t.company);
      setTextByHref(gnbNav, 'about-history.html', t.history);
      setTextByHref(gnbNav, 'about-ci.html', t.ci);
      setTextByHref(gnbNav, 'business.html', t.business);
      setTextByHref(gnbNav, 'solution-genid.html', t.solution);
      setTextByHref(gnbNav, 'solution-passkey.html', 'Passkey');
      setTextByHref(gnbNav, 'reference.html', t.reference);
      setTextByHref(gnbNav, 'careers.html', t.careers);

      // Full menu section titles and links
      if (fullMenu) {
        var cols = fullMenu.querySelectorAll('.gnb-fullmenu-col');
        cols.forEach(function (col) {
          var links = col.querySelectorAll('a[href]');
          if (!links.length) return;
          var title = col.querySelector('.gnb-fullmenu-col-title');
          var firstHref = links[0].getAttribute('href') || '';
          if (firstHref.indexOf('about-') >= 0 && title) title.textContent = t.company;
          if (firstHref.indexOf('business.html') >= 0 && title) title.textContent = t.business;
          if (firstHref.indexOf('solution-') >= 0 && title) title.textContent = t.solution;
          if (firstHref.indexOf('reference.html') >= 0 && title) title.textContent = t.reference;
          if (firstHref.indexOf('careers.html') >= 0 && title) title.textContent = t.careers;
        });

        setTextByHref(fullMenu, 'about-intro.html', t.company);
        setTextByHref(fullMenu, 'about-history.html', t.history);
        setTextByHref(fullMenu, 'about-ci.html', t.ci);
        setTextByHref(fullMenu, 'business.html', t.business);
        setTextByHref(fullMenu, 'solution-genid.html', 'GenID');
        setTextByHref(fullMenu, 'solution-passkey.html', 'Passkey');
        setTextByHref(fullMenu, 'reference.html', t.reference);
        setTextByHref(fullMenu, 'careers.html', t.careers);
      }

      options.forEach(function (btn) {
        btn.setAttribute('aria-selected', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
      });
      document.documentElement.lang = lang === 'en' ? 'en' : 'ko';
    }

    var currentLang = localStorage.getItem('bdgen-lang') || 'ko';
    applyNavLanguage(currentLang);
    if (typeof window.applySubpageContent === 'function') {
      window.applySubpageContent(currentLang);
    }

    options.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = btn.getAttribute('data-lang') || 'ko';
        localStorage.setItem('bdgen-lang', lang);
        applyNavLanguage(lang);
        if (typeof window.applySubpageContent === 'function') {
          window.applySubpageContent(lang);
        }
      });
    });
  })();

  (function initGlobalBackToTop() {
    var backTop = document.getElementById('backTop');
    if (!backTop || backTop.getAttribute('data-bdgen-backtop-bound') === '1') return;
    backTop.setAttribute('data-bdgen-backtop-bound', '1');
    function syncVisibility() {
      var y = window.scrollY || window.pageYOffset;
      backTop.classList.toggle('visible', y > 400);
    }
    window.addEventListener('scroll', syncVisibility, { passive: true });
    syncVisibility();
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();
})();
