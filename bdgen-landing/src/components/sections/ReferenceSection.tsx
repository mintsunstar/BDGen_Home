'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { LogoGridItem } from '@/components/ui/LogoGridItem';
import { RefCard } from '@/components/ui/RefCard';
import type { Partner, Reference } from '@/types/landing';

interface ReferenceSectionProps {
  partners: Partner[];
  references: Reference[];
}

export function ReferenceSection({ partners, references }: ReferenceSectionProps) {
  useScrollReveal();
  const doubledPartners = [...partners, ...partners];
  return (
    <section id="reference" className="section" aria-labelledby="reference-title">
      <div className="container">
        <SectionHeader
          label="REFERENCE"
          title={<>국내 주요 기관이 비디젠을 선택했습니다</>}
          sub="통신 대기업부터 정부 기관까지"
        />
        <div className="logo-track-wrap reveal">
          <div className="logo-track">
            {doubledPartners.map((p, i) => (
              <LogoGridItem key={i} partner={p} />
            ))}
          </div>
        </div>
        <div className="ref-projects">
          {references.map((r, i) => (
            <RefCard key={r.client + i} reference={r} revealDelay={i ? 'reveal-delay-' + Math.min(i, 5) : ''} />
          ))}
        </div>
        <div className="ref-more-wrap reveal">
          <Button href="#reference" variant="outline">전체 레퍼런스 보기</Button>
        </div>
      </div>
    </section>
  );
}
