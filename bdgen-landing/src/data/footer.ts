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
    title: '회사소개',
    links: [
      { label: '회사소개', href: '/pages/about-intro.html' },
      { label: '연혁·인증', href: '/pages/about-history.html' },
      { label: 'CI소개', href: '/pages/about-ci.html' },
      { label: '비디젠 뉴스', href: '/pages/about-news.html' },
    ],
  },
  {
    title: '사업영역',
    links: [{ label: '사업영역', href: '/pages/business.html' }],
  },
  {
    title: '솔루션',
    links: [
      { label: 'GenID', href: '/pages/solution-genid.html' },
      { label: 'Passkey', href: '/pages/solution-passkey.html' },
    ],
  },
  {
    title: '레퍼런스',
    links: [{ label: '레퍼런스', href: '/pages/reference.html' }],
  },
  {
    title: '채용',
    links: [{ label: '채용', href: '/pages/careers.html' }],
  },
  {
    title: '문의',
    links: [
      { label: '02-6091-1533', href: 'tel:02-6091-1533' },
      { label: '프로젝트 문의', href: '/#cta' },
      { label: '회사소개서', href: 'https://bdgen.co.kr/asset/downloadfile/Intro_BDGen.pdf' },
    ],
  },
];

export const footerBottomLinks = [
  { label: '개인정보처리방침', href: '#' },
  { label: '이용약관', href: '#' },
];
