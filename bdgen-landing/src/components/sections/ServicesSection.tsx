'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ServiceCard } from '@/components/ui/ServiceCard';
import type { Service } from '@/types/landing';

interface ServicesSectionProps { services: Service[]; }

export function ServicesSection({ services }: ServicesSectionProps) {
  useScrollReveal();
  return (
    <section id="services" className="section section-alt" aria-labelledby="services-title">
      <div className="container">
        <SectionHeader label="SERVICES" title={<>핵심 기술 및 제공 서비스</>} sub="블록체인 기반 디지털 서비스 구축을 위한 핵심 기술을 제공합니다" />
        <div className="services-grid">
          {services.map((s, i) => (
            <ServiceCard key={s.index} service={s} cardIndex={(i + 1) as 1 | 2 | 3} revealDelay={i === 1 ? 'reveal-delay-2' : i === 2 ? 'reveal-delay-4' : ''} />
          ))}
        </div>
      </div>
    </section>
  );
}
