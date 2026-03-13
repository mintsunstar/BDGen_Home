import type { Service } from '@/types/landing';

interface ServiceCardProps {
  service: Service;
  revealDelay?: string;
}

export function ServiceCard({ service, revealDelay = '' }: ServiceCardProps) {
  return (
    <div className={`service-card reveal ${revealDelay}`.trim()}>
      <div className="service-num">{service.index}</div>
      <div className="service-icon">{service.icon}</div>
      <h3 className="service-title" style={{ whiteSpace: 'pre-line' }}>{service.title}</h3>
      <p className="service-desc">{service.desc}</p>
      <div className="service-tags">
        {service.tags.map((tag) => (
          <span key={tag} className="service-tag">{tag}</span>
        ))}
      </div>
      <div className="service-arrow">→</div>
    </div>
  );
}
