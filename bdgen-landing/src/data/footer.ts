import type { CompanyInfo, LinkGroup } from '@/types/landing';

export const company: CompanyInfo = {
  name: '㈜비디젠',
  ceo: '유성종',
  registrationNumber: '113-86-78453',
  address: '서울 구로구 디지털로26길 43, R동 304호',
  phone: '02-6091-1533',
  email: '[email protected]',
};

export const linkGroups: LinkGroup[] = [
  {
    title: '서비스',
    links: [
      { label: '블록체인 서비스 개발', href: '#services' },
      { label: '모바일 앱 개발', href: '#services' },
      { label: '플랫폼 운영 솔루션', href: '#services' },
      { label: 'GenID 솔루션', href: '#genid' },
    ],
  },
  {
    title: '회사',
    links: [
      { label: '회사소개', href: '#about' },
      { label: '핵심역량', href: '#why' },
      { label: '레퍼런스', href: '#reference' },
      { label: '소식', href: '#news' },
    ],
  },
  {
    title: '문의',
    links: [
      { label: '02-6091-1533', href: 'tel:02-6091-1533' },
      { label: '[email protected]', href: 'mailto:[email protected]' },
      { label: '프로젝트 문의', href: '#cta' },
      { label: '회사소개서', href: 'https://bdgen.co.kr/asset/downloadfile/Intro_BDGen.pdf' },
    ],
  },
];

export const footerBottomLinks = [
  { label: '개인정보처리방침', href: '#' },
  { label: '이용약관', href: '#' },
];
