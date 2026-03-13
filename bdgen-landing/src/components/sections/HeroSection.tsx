import { Button } from '@/components/ui/Button';
import { HeroCanvas } from '@/components/shared/HeroCanvas';

export function HeroSection() {
  return (
    <section id="hero" className="landing-hero" aria-labelledby="hero-title">
      <HeroCanvas />
      <div className="hero-bg-gradient" />
      <div className="hero-content">
        <div className="hero-badge">블록체인·DID 전문기업</div>
        <h1 id="hero-title" className="hero-title">
          <span className="gradient-text">디지털 신원</span> 기술로<br />
          산업의 신뢰를 설계합니다
        </h1>
        <p className="hero-sub">
          ㈜비디젠은 DID·Passkey·블록체인 기술을 보유하고,<br />
          금융·헬스케어·공공 등 다양한 산업의 디지털 신뢰 인프라를 구축합니다.
        </p>
        <div className="hero-cta">
          <Button href="#services">주요 서비스 보기</Button>
          <Button href="#reference" variant="outline">레퍼런스</Button>
          <Button href="#cta" variant="outline">프로젝트 문의</Button>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-line" />SCROLL
      </div>
    </section>
  );
}
