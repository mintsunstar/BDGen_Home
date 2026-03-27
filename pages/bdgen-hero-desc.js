/* subpage hero 타이틀/서브텍스트 캐스케이드 인터랙션 */
(function () {
  function applyHeroInnerCascade() {
    var title = document.querySelector('.hero-inner .hero-title');
    var desc = document.querySelector('.hero-inner .hero-desc');
    if (!title && !desc) return;

    if (title && !title.classList.contains('intro-hero-cascade')) {
      title.classList.remove('hero-title-cascade');
      void title.offsetWidth;
      title.classList.add('hero-title-cascade');
    }

    if (!desc || desc.classList.contains('intro-hero-cascade')) return;

    var html = desc.innerHTML;
    var hasWrapped = !!desc.querySelector('.hero-desc-char');
    if (hasWrapped && desc.getAttribute('data-hero-desc-raw')) {
      html = desc.getAttribute('data-hero-desc-raw') || '';
    } else {
      desc.setAttribute('data-hero-desc-raw', html);
    }

    var result = '';
    var delay = 0;
    var delayStep = 35;
    for (var i = 0; i < html.length; i++) {
      var ch = html.charAt(i);
      if (ch === '<') {
        var end = html.indexOf('>', i);
        if (end !== -1) {
          var tag = html.slice(i, end + 1);
          if (/^<br\s*\/?>/i.test(tag)) delay += delayStep;
          result += tag;
          i = end;
        } else {
          result += ch;
        }
      } else {
        result +=
          '<span class="hero-desc-char" style="animation-delay:' +
          delay +
          'ms">' +
          (ch === ' ' ? '\u00A0' : ch) +
          '</span>';
        delay += delayStep;
      }
    }

    desc.innerHTML = result;
    desc.classList.remove('hero-desc-falling');
    void desc.offsetWidth;
    desc.classList.add('hero-desc-falling');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyHeroInnerCascade);
  } else {
    applyHeroInnerCascade();
  }

  window.addEventListener('bdgen:subpage-language-applied', function () {
    applyHeroInnerCascade();
  });
})();
