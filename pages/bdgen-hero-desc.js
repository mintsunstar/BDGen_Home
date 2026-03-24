/* hero-inner 서브텍스트 초기 로드 시 글자 떨어지는 인터랙션 */
(function(){
  var el = document.querySelector('.hero-inner .hero-desc');
  if (!el) return;
  var html = el.innerHTML;
  var result = '';
  var delay = 0;
  var delayStep = 35;
  for (var i = 0; i < html.length; i++) {
    var ch = html.charAt(i);
    if (ch === '<') {
      var end = html.indexOf('>', i);
      if (end !== -1) {
        var tag = html.slice(i, end + 1);
        if (/^<br\s*\/?>/i.test(tag)) {
          result += tag;
          delay += delayStep;
        } else {
          result += tag;
        }
        i = end;
      } else {
        result += ch;
      }
    } else {
      result += '<span class="hero-desc-char" style="animation-delay:' + delay + 'ms">' + (ch === ' ' ? '\u00A0' : ch) + '</span>';
      delay += delayStep;
    }
  }
  el.innerHTML = result;
  el.classList.add('hero-desc-falling');
})();
