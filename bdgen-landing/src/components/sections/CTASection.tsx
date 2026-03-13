'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Button } from '@/components/ui/Button';
import type { ContactConfig } from '@/types/landing';

interface CTASectionProps { contact: ContactConfig; }

export function CTASection({ contact }: CTASectionProps) {
  useScrollReveal();
  const mailto = 'mailto:' + contact.email + '?subject=' + encodeURIComponent(contact.mailtoSubject || '프로젝트 문의');
  return (
    <section id="cta" className="landing-cta" aria-labelledby="cta-title">
      <div className="cta-bg-orb" />
      <div className="container cta-content">
        <div className="section-label reveal" style={{ justifyContent: 'center' }}>CONTACT</div>
        <h2 id="cta-title" className="cta-title reveal reveal-delay-1">
          프로젝트·기술 협업<br />
          <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>문의하기</span>
        </h2>
        <p className="cta-sub reveal reveal-delay-2">도입 상담·PoC·개발 협업 문의를 받습니다</p>
        <div className="cta-buttons reveal reveal-delay-3">
          <a href={mailto} className="btn btn-primary" style={{ fontSize: '1rem', padding: '16px 36px' }}>프로젝트 문의</a>
          {contact.introPdfUrl && <Button href={contact.introPdfUrl} variant="outline" style={{ fontSize: '1rem', padding: '16px 36px' }}>회사소개서 다운로드</Button>}
        </div>
        <div className="cta-contact-row reveal reveal-delay-4">
          <div className="cta-contact-item">
            <span className="cta-contact-icon" aria-hidden>📞</span>
            <a href={'tel:' + contact.phone}>{contact.phone}</a>
          </div>
          <div className="cta-contact-item">
            <span className="cta-contact-icon" aria-hidden>✉️</span>
            <a href={'mailto:' + contact.email}>{contact.email}</a>
          </div>
          <div className="cta-contact-item">
            <span className="cta-contact-icon" aria-hidden>📍</span>
            <span>{contact.address}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
