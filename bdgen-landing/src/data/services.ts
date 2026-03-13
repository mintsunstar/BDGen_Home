import type { Service } from '@/types/landing';

export const services: Service[] = [
  {
    index: '01',
    icon: '🔗',
    title: '블록체인 응용 서비스 개발',
    desc: 'DID·NFT·스마트컨트랙트 등 Web3 핵심 기술 기반 서비스를 설계하고 개발합니다. Hyperledger Fabric과 Ethereum 등 주요 블록체인 플랫폼 기술을 직접 보유합니다.',
    tags: ['DID', 'NFT', 'Blockchain', 'AI', 'IoT'],
  },
  {
    index: '02',
    icon: '📱',
    title: '모바일 앱 개발',
    desc: '사용자 경험(UX)을 최우선으로 설계하는 Android·iOS Native App과 Web App을 개발합니다. DID 기반 인증 모듈을 포함한 보안 특화 모바일 서비스를 구현합니다.',
    tags: ['Android', 'iOS', 'Native App', 'Web App'],
  },
  {
    index: '03',
    icon: '⚙️',
    title: '플랫폼 구축 및 운영 솔루션',
    desc: '서비스 기획 단계부터 런칭, 운영, 고도화까지 원스톱으로 지원합니다. 체계적인 모니터링과 VoC 기반 지속 개선으로 서비스 안정성을 극대화합니다.',
    tags: ['플랫폼 구축', '백오피스', '운영·고도화'],
  },
];
