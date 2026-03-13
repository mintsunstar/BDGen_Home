import type { ReactNode } from 'react';

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  sub?: string;
  centered?: boolean;
}

export function SectionHeader({ label, title, sub, centered = true }: SectionHeaderProps) {
  return (
    <div className={`section-header ${centered ? '' : ''}`}>
      <div className="section-label reveal">{label}</div>
      <h2 className="section-title reveal reveal-delay-1">{title}</h2>
      {sub && <p className="section-sub reveal reveal-delay-2">{sub}</p>}
    </div>
  );
}
