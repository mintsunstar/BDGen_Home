'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import type { Reason } from '@/types/landing';

interface WhySectionProps { reasons: Reason[]; }

export function WhySection({ reasons }: WhySectionProps) {
  useScrollReveal();
  return (
    <section id="why" className="section section-alt" aria-labelledby="why-title">
      <div className="container">
        <SectionHeader label="WHY BDGEN" title={<><span>비디젠이 강한 이유</span> 6가지</>} sub="수년간 축적된 기술 역량과 상용화 경험이 만드는 경쟁력" />
        <div className="why-grid">
          {reasons.map((r, i) => (
            <div key={r.num} className={`why-card reveal ${i ? 'reveal-delay-' + Math.min(i, 5) : ''}`}>
              <div className="why-num">{r.num}</div>
              <div className="why-icon">{r.icon}</div>
              <h3 className="why-title" style={{ whiteSpace: 'pre-line' }}>{r.title}</h3>
              <p className="why-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
