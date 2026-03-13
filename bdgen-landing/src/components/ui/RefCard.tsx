import type { Reference } from '@/types/landing';

interface RefCardProps {
  reference: Reference;
  revealDelay?: string;
}

export function RefCard({ reference: r, revealDelay = '' }: RefCardProps) {
  return (
    <div className={`ref-card reveal ${revealDelay}`.trim()} title={r.placeholder ? 'TODO: 고객사명 공개 시 수정' : undefined}>
      <div className="ref-card-tag">{r.tag}</div>
      <div className="ref-card-client">{r.client}</div>
      <div className="ref-card-project">{r.project}</div>
      <div className="ref-card-period">{r.period}</div>
    </div>
  );
}
