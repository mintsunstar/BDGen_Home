'use client';

/**
 * 정적 랜딩(bdgen_landing.html) 회사소개서 FAB와 동일 PDF 링크.
 * 스타일은 간소화(동일 URL·고정 위치·z-index는 --z-back-top).
 */
const BROCHURE_HREF = 'https://bdgen.co.kr/asset/downloadfile/Intro_BDGen.pdf';

export function FloatingBrochure() {
  return (
    <a
      href={BROCHURE_HREF}
      className="floating-brochure-fab"
      download="Intro_BDGen.pdf"
      rel="noopener noreferrer"
      aria-label="회사소개서 다운받기"
      title="회사소개서 다운받기"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path
          d="M12 3V16M12 16L7 11M12 16L17 11"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M4 20H20" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </a>
  );
}
