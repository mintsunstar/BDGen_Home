import type { Partner } from '@/types/landing';

interface LogoGridItemProps {
  partner: Partner;
}

export function LogoGridItem({ partner }: LogoGridItemProps) {
  return (
    <div
      className="logo-item"
      title={partner.placeholder ? 'TODO: 실제 고객사명 확정 또는 제거' : '로고 사용 승인 확인 후 이미지 교체'}
    >
      {partner.logo ? <img src={partner.logo} alt={partner.name} /> : partner.name}
    </div>
  );
}
