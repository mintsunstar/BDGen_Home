import type { TrustItem as TrustItemType } from '@/types/landing';

interface TrustItemProps {
  item: TrustItemType;
}

export function TrustItem({ item }: TrustItemProps) {
  return (
    <li
      className="trust-item"
      {...(item.type === 'text' && item.confirm ? { 'data-confirm': 'cert' } : {})}
    >
      {item.type === 'number' ? (
        <span
          className="trust-num"
          data-trust-type="number"
          data-count={item.count}
          data-suffix={item.suffix}
          data-duration={item.duration ?? 1600}
        >
          0{item.suffix}
        </span>
      ) : (
        <span className="trust-num" data-trust-type="text">
          {item.value}
        </span>
      )}
      <span className="trust-label">{item.label}</span>
    </li>
  );
}
