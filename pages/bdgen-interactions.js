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
})();
