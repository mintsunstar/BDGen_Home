'use client';

import { useRef } from 'react';
import { useTrustAnimation } from '@/hooks/useTrustAnimation';
import { TrustItem } from '@/components/ui/TrustItem';
import type { TrustItem as TrustItemType } from '@/types/landing';

interface TrustSectionProps { items: TrustItemType[]; }

export function TrustSection({ items }: TrustSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useTrustAnimation(sectionRef);
  return (
    <section id="trust" className="landing-trust" aria-label="주요 실적 및 인증" ref={sectionRef}>
      <div className="container">
        <ul className="trust-grid" role="list">
          {items.map((item, i) => (
            <TrustItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
