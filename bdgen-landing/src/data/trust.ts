import type { TrustItem } from '@/types/landing';

export const trustItems: TrustItem[] = [
  { type: 'number', count: 30, suffix: '+', label: '상용화 프로젝트', duration: 1600 },
  { type: 'number', count: 6, suffix: '개', label: '핵심 산업 분야', duration: 1600 },
  { type: 'number', count: 5, suffix: '년+', label: '블록체인 전문 경력', duration: 1600 },
  { type: 'text', value: '이노비즈', label: '중소벤처기업부 인증', confirm: true },
  { type: 'text', value: '벤처기업', label: '공식 벤처기업 인증', confirm: true },
];
