'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

const features = [
  { icon: '🔗', title: '블록체인 기반 서비스 전문', desc: 'Hyperledger Fabric, Ethereum 기반 응용 서비스 설계·개발·운영' },
  { icon: '🛡️', title: '분산신원인증(DID) 선도', desc: 'W3C 국제 표준 기반 자기주권형 신원 솔루션 GenID 자체 개발·운영' },
  { icon: '🚀', title: 'End-to-End 완결 역량', desc: '기획 → 디자인 → 개발 → QA → 런칭 → 운영, 단일 팀이 책임' },
];

export function HighlightSection() {
  useScrollReveal();

  return (
    <section id="about" className="section landing-highlight" aria-labelledby="about-title">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <div className="section-label reveal">ABOUT BDGEN</div>
            <h2 id="about-title" className="section-title reveal reveal-delay-1">
              Web3 기술로
              <br />
              <span>산업의 신뢰 인프라</span>를
              <br />
              설계합니다
            </h2>
            <p className="section-sub reveal reveal-delay-2">
              ㈜비디젠은 블록체인·DID 기술로 기업과 기관의 디지털 신뢰를 구축합니다.
              금융, 공공, 헬스케어 등 다양한 산업의 인증·증명 솔루션을 제공합니다.
            </p>
            <div className="about-features reveal reveal-delay-3">
              {features.map((f) => (
                <div key={f.title} className="about-feature">
                  <div className="about-feature-icon">{f.icon}</div>
                  <div>
                    <div className="about-feature-title">{f.title}</div>
                    <div className="about-feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cert-badges reveal reveal-delay-4">
              <span className="cert-badge">✅ 이노비즈 기업</span>
              <span className="cert-badge">✅ 벤처기업 인증</span>
              <span className="cert-badge">✅ W3C DID 표준</span>
            </div>
          </div>
          <div className="about-visual reveal-right">
            <div className="about-ring about-ring-2">
              <div className="about-ring about-ring-1">
                <div className="about-orb">
                  <div className="about-orb-inner">
                    <div className="about-orb-center-text">
                      DID · 블록체인
                      <span>디지털 신뢰 인프라</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
