/* 세부페이지 콘텐츠 한영 전환 (data-i18n 기반) */
(function () {
  'use strict';

  function getPageKey() {
    var path = (window.location.pathname || '').split('/').pop() || '';
    var match = path.match(/^(.+)\.html$/);
    return match ? match[1] : path;
  }

  var SUBPAGE_I18N = {
    'about-intro': {
      ko: {
        'hero-title': '회사소개',
        'hero-desc': 'Web3 기술로 산업의 신뢰 인프라를 설계하는 블록체인·DID 전문 기업입니다.',
        'sub-nav-1': '회사소개',
        'sub-nav-2': '연혁·인증',
        'sub-nav-3': 'CI소개',
        'breadcrumb-current': '회사소개',
        'intro-typing-1': '고객의 가치를 창출하며 성장하는',
        'intro-typing-2': 'SW 개발 전문 기업',
        'mission-desc': 'Web3 기술 역량과 통신·금융·공공·IoT 분야의 서비스 플랫폼 구축 경험을 바탕으로,\n고객과 같은 목표로 최고의 가치를 전달합니다.',
        'statement': '비디젠은 블록체인 기반 디지털 신원(DID)과 Passkey 기술을 산업 현장에 적용하여,\n안전하고 편리한 인증·증명 경험을 설계합니다.',
        'core-val-1': 'Web3 & 블록체인 전문성',
        'core-val-2': '고객 중심 가치 창출',
        'core-val-3': '지속적 성장과 혁신',
        'section-stats': '숫자로 보는 ',
        'section-stats-span': '비디젠',
        'stat-founded': '회사 설립',
        'stat-industries': '핵심 산업 분야',
        'stat-revenue': '연 매출(2023)',
        'section-capability': '비디젠의 핵심 역량',
        'cap-1-h': '블록체인 <span class="highlight">응용 서비스 상용화</span> 경험',
        'cap-1-p': '대규모 사용자 환경에서 검증된 상용화 경험을 보유합니다.',
        'cap-2-h': '상용 서비스 <span class="highlight">플랫폼 구축</span> 경험',
        'cap-2-p': '모바일 앱, UI/UX, 백엔드를 포함한 풀스택 구축을 수행합니다.',
        'cap-3-h': '<span class="highlight">다중적 블록체인</span> 기술 스택',
        'cap-3-p': '인프라부터 앱 계층까지 전 계층의 기술을 내재화하여 운영합니다.',
        'cap-4-h': '기획·디자인·개발 <span class="highlight">Full Set</span>',
        'cap-4-p': '서비스 기획부터 런칭까지 단일 팀으로 일관된 품질을 제공합니다.',
        'cap-5-h': '<span class="highlight">플랫폼 관련 기술</span> 보유',
        'cap-5-p': '다양한 플랫폼 기반의 구축·연동 역량을 확보하였습니다.',
        'cap-6-h': '<span class="highlight">대규모 서비스 운영</span> 노하우',
        'cap-6-p': '프로세스 기반 운영과 개선 루프로 장기간 안정적 운영을 지원합니다.',
        'section-company': '회사 정보',
        'company-name': '주식회사 비디젠 (BDGen Inc.)',
        'company-ceo': '유성종',
        'company-founded': '2019년 11월 1일',
        'company-business': 'Web3·글로벌 서비스 플랫폼 구축 및 운영, DID/Passkey 기반 인증·증명 솔루션 제공'
      },
      en: {
        'hero-title': 'Company',
        'hero-desc': 'A blockchain and DID specialist designing trusted infrastructure for industries with Web3 technology.',
        'sub-nav-1': 'Company',
        'sub-nav-2': 'History',
        'sub-nav-3': 'CI',
        'breadcrumb-current': 'Company',
        'intro-typing-1': 'Growing while creating value for customers,',
        'intro-typing-2': 'A specialized SW development company',
        'mission-desc': 'Based on Web3 capabilities and platform-building experience across telecom, finance, public sector, and IoT,\nwe deliver the highest value aligned with our clients\' goals.',
        'statement': 'BDGen applies blockchain-based digital identity (DID) and Passkey technology to industrial settings,\ndesigning secure and convenient authentication and attestation experiences.',
        'core-val-1': 'Web3 & Blockchain Expertise',
        'core-val-2': 'Customer-Centric Value Creation',
        'core-val-3': 'Continuous Growth and Innovation',
        'section-stats': 'BDGen in ',
        'section-stats-span': 'Numbers',
        'stat-founded': 'Founded',
        'stat-industries': 'Core Industries',
        'stat-revenue': 'Annual Revenue (2023)',
        'section-capability': 'Core Capabilities',
        'cap-1-h': 'Blockchain <span class="highlight">application commercialization</span> experience',
        'cap-1-p': 'Proven commercialization experience in large-scale user environments.',
        'cap-2-h': 'Commercial service <span class="highlight">platform building</span> experience',
        'cap-2-p': 'Full-stack development including mobile apps, UI/UX, and backend.',
        'cap-3-h': '<span class="highlight">Multi-blockchain</span> technology stack',
        'cap-3-p': 'Operates with internalized technology across all layers from infrastructure to application.',
        'cap-4-h': 'Planning·Design·Development <span class="highlight">Full Set</span>',
        'cap-4-p': 'Consistent quality from service planning to launch with a single team.',
        'cap-5-h': '<span class="highlight">Platform-related technology</span> capabilities',
        'cap-5-p': 'Build and integration capabilities across various platform bases.',
        'cap-6-h': '<span class="highlight">Large-scale service operations</span> know-how',
        'cap-6-p': 'Long-term stable operations through process-based management and improvement loops.',
        'section-company': 'Company Info',
        'company-name': 'BDGen Inc.',
        'company-ceo': 'Sungjong Yoo',
        'company-founded': 'November 1, 2019',
        'company-business': 'Web3·Global service platform development and operations, DID/Passkey-based authentication and attestation solutions'
      }
    },
    'about-history': {
      ko: {
        'hero-title': '연혁·인증',
        'hero-desc': '비디젠의 성장 과정과 기술·사업 역량을 증명하는 인증 현황을 소개합니다.',
        'sub-nav-1': '회사소개',
        'sub-nav-2': '연혁·인증',
        'sub-nav-3': 'CI소개',
        'breadcrumb-current': '연혁·인증',
        'history-typing-1': '기술로 빚은 신뢰,',
        'history-typing-2': '데이터로 증명한 혁신',
        'history-story-sub': '핵심 기술 내재화와 산업 적용 경험을 바탕으로, Web3 기반 인증·증명 분야에서 지속적으로 성장하고 있습니다.',
        'era-2025-kw': '도약',
        'era-2025-txt': '글로벌 표준을 선도하는 기술의 정점',
        'era-2023-kw': '확장',
        'era-2023-txt': '신뢰의 영토를 넓히다',
        'era-2021-kw': '성장',
        'era-2021-txt': '실질적인 가치를 증명하다',
        'era-2019-kw': '태동',
        'era-2019-txt': '변화의 씨앗을 심다',
        'outro-1': '비디젠의 기록은 내일도 계속됩니다.',
        'outro-2': '우리는 기술을 넘어 사람과 사람,',
        'outro-3': '기업과 사회를 잇는 가장 안전한 다리가 되겠습니다.',
        'sec-cert-title': '인증 현황',
        'sec-cert-desc': '축적한 기술의 혁신성과 사업 계획의 우수성, 경영 관리 능력을 인정받아 다양한 인증을 확보했습니다.',
        'cert-1-name': '기술혁신형 중소기업 확인서',
        'cert-1-issuer': '중소벤처기업부 · 2023.03.15',
        'cert-2-name': '벤처기업 확인서',
        'cert-2-issuer': '벤처기업확인기관 · 2023.04.05',
        'cert-3-name': '기업부설연구소 인정서',
        'cert-3-issuer': '한국산업기술진흥협회 · 2021.11.25',
        'cert-4-name': '직접생산확인 증명서',
        'cert-4-issuer': '중소기업유통센터 · 2022.12.28'
      },
      en: {
        'hero-title': 'History & Certification',
        'hero-desc': 'BDGen\'s growth journey and certifications that demonstrate our technical and business capabilities.',
        'sub-nav-1': 'Company',
        'sub-nav-2': 'History',
        'sub-nav-3': 'CI',
        'breadcrumb-current': 'History',
        'history-typing-1': 'Trust Built with Technology,',
        'history-typing-2': 'Innovation Proven by Data',
        'history-story-sub': 'We continue to grow in Web3-based authentication and attestation, backed by core technology internalization and industry application experience.',
        'era-2025-kw': 'Leap',
        'era-2025-txt': 'Leading global standards in technology',
        'era-2023-kw': 'Expansion',
        'era-2023-txt': 'Extending the realm of trust',
        'era-2021-kw': 'Growth',
        'era-2021-txt': 'Proving real value',
        'era-2019-kw': 'Launch',
        'era-2019-txt': 'Sowing seeds of change',
        'outro-1': 'BDGen\'s story continues tomorrow.',
        'outro-2': 'Beyond technology, we connect people to people,',
        'outro-3': 'And become the safest bridge between business and society.',
        'sec-cert-title': 'Certifications',
        'sec-cert-desc': 'We have secured various certifications recognizing our technological innovation, excellent business plans, and management capabilities.',
        'cert-1-name': 'Inno-Biz Technology Innovation Certificate',
        'cert-1-issuer': 'Ministry of SMEs and Startups · 2023.03.15',
        'cert-2-name': 'Venture Company Certificate',
        'cert-2-issuer': 'Venture Business Verification Agency · 2023.04.05',
        'cert-3-name': 'Corporate R&D Center Accreditation',
        'cert-3-issuer': 'Korea Industrial Technology Association · 2021.11.25',
        'cert-4-name': 'Direct Production Confirmation Certificate',
        'cert-4-issuer': 'Small and Medium Business Distribution Center · 2022.12.28'
      }
    },
    'about-ci': {
      ko: {
        'hero-title': 'CI소개',
        'hero-desc': '비디젠의 브랜드 아이덴티티와 시각 요소를 소개합니다.',
        'sub-nav-1': '회사소개',
        'sub-nav-2': '연혁·인증',
        'sub-nav-3': 'CI소개',
        'breadcrumb-current': 'CI소개',
        'ci-concept-lead': '비디젠 CI는 신뢰와 협력을 바탕으로 사람과 기술이 상호작용하는 강력한 접근성을 제공한다는 의미를 담아 제작하였습니다.',
        'ci-symbol-title': '심볼의 의미 ',
        'ci-symbol-en': '(Symbol Meaning)',
        'ci-symbol-body': '비디젠의 심볼은 \'사람과 기술이 연결되고 상호작용하는 강력한 접근성\'을 상징합니다. 육각형 구조는 안정성과 연결성을 의미하며, 중심을 향해 수렴하는 형태는 혁신의 중심이 되는 플랫폼으로서의 역할을 나타냅니다.',
        'ci-comp-title': 'CI 구성 ',
        'ci-comp-en': '(Composition)',
        'ci-comp-body': '비디젠의 CI는 심볼(Symbol)과 로고타입(Logotype)의 조화로운 결합으로 구성됩니다. 가로형 영문 조합(English Horizontal) 사용을 기본 원칙으로 하며, 상황에 따라 세로형 또는 국문 조합을 제한적으로 사용할 수 있습니다.',
        'ci-dl-ai': 'AI 다운로드',
        'ci-dl-jpg': 'JPG 다운로드',
        'ci-dl-png': 'PNG 다운로드',
        'ci-logo-note': '※ JPG·PNG 원본 파일은 디자인팀에 요청해 주세요. 현재는 벡터(SVG) 자산으로 대체 링크되어 있습니다.',
        'ci-palette-intro': '비디젠 CI는 아래 전용 색상을 기준으로 일관된 브랜드 경험을 전달합니다.',
        'ci-usage-rec': 'USAGE RECOMMENDATION',
        'ci-usage-1': '본문 텍스트에는 80%~90% 그레이스케일을 사용하여 눈의 피로도를 낮추는 것을 권장합니다.',
        'ci-usage-2': '배경색이나 보조 라인 등에는 10%~20%의 밝은 회색을 사용하여 정보의 위계를 표현합니다.',
        'ci-concept-title': 'CI CONCEPT'
      },
      en: {
        'hero-title': 'CI Introduction',
        'hero-desc': 'Introduction to BDGen\'s brand identity and visual elements.',
        'sub-nav-1': 'Company',
        'sub-nav-2': 'History',
        'sub-nav-3': 'CI',
        'breadcrumb-current': 'CI',
        'ci-concept-lead': 'BDGen CI was created to represent powerful accessibility where people and technology interact based on trust and collaboration.',
        'ci-symbol-title': 'Symbol Meaning ',
        'ci-symbol-en': '',
        'ci-symbol-body': 'BDGen\'s symbol represents \'powerful accessibility where people and technology connect and interact.\' The hexagonal structure signifies stability and connectivity, and the converging form toward the center represents our role as a platform at the heart of innovation.',
        'ci-comp-title': 'Composition ',
        'ci-comp-en': '',
        'ci-comp-body': 'BDGen CI consists of a harmonious combination of Symbol and Logotype. Use of horizontal English combination is the basic principle; vertical or Korean combinations may be used sparingly depending on context.',
        'ci-dl-ai': 'AI Download',
        'ci-dl-jpg': 'JPG Download',
        'ci-dl-png': 'PNG Download',
        'ci-logo-note': 'Please contact the design team for original JPG/PNG files. Links currently point to vector (SVG) assets.',
        'ci-palette-intro': 'BDGen CI delivers a consistent brand experience based on the dedicated colors below.',
        'ci-usage-rec': 'USAGE RECOMMENDATION',
        'ci-usage-1': 'We recommend 80%–90% grayscale for body text to reduce eye strain.',
        'ci-usage-2': 'Use 10%–20% light gray for backgrounds and auxiliary lines to express information hierarchy.',
        'ci-concept-title': 'CI CONCEPT'
      }
    },
    'business': {
      ko: {
        'hero-title': '사업영역',
        'hero-desc': '블록체인·DID 기술로 산업별 인증·증명 솔루션을 제공합니다.',
        'breadcrumb-current': '사업영역',
        'platform-title': 'Blockchain Innovation',
        'platform-lead':
          '㈜비디젠은 Web3.0 시대의 핵심 기술인 블록체인을 기반으로, 응용 서비스 개발부터\n다양한 플랫폼의 구축 · 운영 및 통합 솔루션 제공까지 아우르는 전문 기업입니다.',
        'platform-c1-title': '서비스 개발',
        'platform-c1-desc':
          'DID, Blockchain, AI, IoT 등 다양한 플랫폼 기반의 서비스 개발',
        'platform-c2-title': '모바일 개발',
        'platform-c2-desc':
          '사용자 편의성을 중심으로 서비스의 활용성을 강화하는 Android, iOS 기반 Native App & Web App 개발',
        'platform-c3-title': '플랫폼 운영',
        'platform-c3-desc':
          '고객의 안정적인 서비스 사용을 위해 체계적인 운영과 지속적인 최적화 수행',
        'services-title': 'SERVICES',
        'services-lead':
          '그간 축적한 기술의 혁신성 및 향후 사업 계획의 우수성, 경영 관리 능력 등을 인정 받아 중소벤처기업부 선정 이노비즈 기업으로 등록되었으며 벤처기업으로도 선정되었습니다.',
        'svc1-num': '01',
        'svc1-title': '블록체인 응용 서비스 상용화 경험',
        'svc1-desc':
          'SKT DID initial 및 모바일지갑 Svc 상용화 디지털 혁신대학 출입 Svc 상용화',
        'svc1-t1': '#SmartContract',
        'svc1-t2': '#Mainnet',
        'svc1-t3': '#Web3',
        'svc2-num': '02',
        'svc2-title': '블록체인 솔루션 및 플랫폼 기술 보유',
        'svc2-desc':
          'DID, NFT, 출입 인증 등 다양한 응용 솔루션과 함께\nHyperledger Fabric, Ethereum 등\n다양한 블록체인 플랫폼 관련 기술을 보유',
        'svc2-t1': '#DID',
        'svc2-t2': '#VC',
        'svc2-t3': '#표준호환',
        'svc3-num': '03',
        'svc3-title': '상용 서비스 플랫폼 구축 경험',
        'svc3-desc':
          '모바일 App, Web, IF server, 백 오피스 등\n상용서비스 플랫폼 구축 경험 다수',
        'svc3-t1': '#Passkey',
        'svc3-t2': '#FIDO2',
        'svc3-t3': '#무패스워드',
        'svc4-num': '04',
        'svc4-title': '기획/디자인/개발 Full Set',
        'svc4-desc':
          '프로젝트 초기 기획부터 서비스 기획, 디자인,\n개발, QA, 런칭까지 Full Coversing',
        'svc4-t1': '#FullStack',
        'svc4-t2': '#운영도구',
        'svc4-t3': '#API',
        'svc5-num': '05',
        'svc5-title': '대형 서비스 플랫폼 운영 노하우',
        'svc5-desc':
          '체계적 프로세스 기반 효율적 플랫폼 운영\nUX 및 VoC 반영 지속적 기능 및 성능 개선',
        'svc5-t1': '#NFT',
        'svc5-t2': '#토큰',
        'svc5-t3': '#STO',
        'svc6-num': '06',
        'svc6-title': '비대칭키 기반 Passkey 인증 기술',
        'svc6-desc':
          '전 세계 주요기업들이 강력한 보안과 편리한 Passkey\n사용자 편의성과 비대칭키 기반의 인증으로 보안성 강화를\n위한 필수 인증 기술',
        'svc6-t1': '#SRE',
        'svc6-t2': '#관측성',
        'svc6-t3': '#이터레이션'
      },
      en: {
        'hero-title': 'Business',
        'hero-desc':
          'Providing authentication and attestation solutions across industries with blockchain and DID technology.',
        'breadcrumb-current': 'Business',
        'platform-title': 'Blockchain Innovation',
        'platform-lead':
          'BDGen leverages blockchain technology to lead application services and diverse platform building in the Web 3 era.',
        'platform-c1-title': 'Service development',
        'platform-c1-desc':
          'Service development on diverse platforms including DID, Blockchain, AI, and IoT.',
        'platform-c2-title': 'Mobile development',
        'platform-c2-desc':
          'Android and iOS native apps and web apps that strengthen usability with a focus on user convenience.',
        'platform-c3-title': 'Platform operations',
        'platform-c3-desc':
          'Systematic operations and continuous optimization for customers’ stable use of services.',
        'services-title': 'SERVICES',
        'services-lead':
          'We apply blockchain and digital identity technology in context—aligned with industry regulation and domain needs.',
        'svc1-num': '01',
        'svc1-title': 'Blockchain service development',
        'svc1-desc':
          'Custom on-chain services from mainnet and L2 integration to nodes, wallets, and transaction modules.',
        'svc1-t1': '#SmartContract',
        'svc1-t2': '#Mainnet',
        'svc1-t3': '#Web3',
        'svc2-num': '02',
        'svc2-title': 'DID & verifiable credentials',
        'svc2-desc':
          'W3C DID and VC flows covering issuance, verification, and revocation across the full lifecycle.',
        'svc2-t1': '#DID',
        'svc2-t2': '#VC',
        'svc2-t3': '#Standards',
        'svc3-num': '03',
        'svc3-title': 'Passkey & FIDO authentication',
        'svc3-desc':
          'Reduce password reliance and integrate phishing-resistant, next-generation sign-in UX for apps and web.',
        'svc3-t1': '#Passkey',
        'svc3-t2': '#FIDO2',
        'svc3-t3': '#Passwordless',
        'svc4-num': '04',
        'svc4-title': 'Mobile & web platform build',
        'svc4-desc':
          'Admin and user portals, payments, notifications, dashboards—operations-ready capabilities in one delivery.',
        'svc4-t1': '#FullStack',
        'svc4-t2': '#OpsTools',
        'svc4-t3': '#API',
        'svc5-num': '05',
        'svc5-title': 'NFT, token & STO integration',
        'svc5-desc':
          'Token economics that reflect issuance, transfer, settlement, and compliance requirements in your product.',
        'svc5-t1': '#NFT',
        'svc5-t2': '#Token',
        'svc5-t3': '#STO',
        'svc6-num': '06',
        'svc6-title': 'Operations, monitoring & iteration',
        'svc6-desc':
          'Post-launch incident response, performance tuning, and feature expansion with ongoing partnership.',
        'svc6-t1': '#SRE',
        'svc6-t2': '#Observability',
        'svc6-t3': '#Iteration'
      }
    },
    'reference': {
      ko: {
        'hero-title': '레퍼런스',
        'hero-desc': '비디젠이 구축한 다양한 프로젝트와 고객 사례를 소개합니다.',
        'breadcrumb-current': '레퍼런스',
        'main-title': '레퍼런스',
        'main-desc': '콘텐츠 준비 중입니다.'
      },
      en: {
        'hero-title': 'Reference',
        'hero-desc': 'Introducing various projects and customer cases built by BDGen.',
        'breadcrumb-current': 'Reference',
        'main-title': 'Reference',
        'main-desc': 'Content coming soon.'
      }
    },
    'careers': {
      ko: {
        'hero-title': '채용',
        'hero-desc': '함께 성장할 인재를 찾습니다.',
        'breadcrumb-current': '채용',
        'main-title': '채용',
        'main-desc': '콘텐츠 준비 중입니다.'
      },
      en: {
        'hero-title': 'Careers',
        'hero-desc': 'We are looking for talent to grow with us.',
        'breadcrumb-current': 'Careers',
        'main-title': 'Careers',
        'main-desc': 'Content coming soon.'
      }
    },
    'solution-genid': {
      ko: {
        'hero-title': 'GenID',
        'hero-desc': '블록체인 기반 디지털 신원(DID) 솔루션으로 신뢰할 수 있는 인증·증명 경험을 제공합니다.',
        'sub-nav-1': 'GenID',
        'sub-nav-2': 'Passkey',
        'breadcrumb-current': 'GenID',
        'main-title': 'GenID',
        'main-desc': '콘텐츠 준비 중입니다.'
      },
      en: {
        'hero-title': 'GenID',
        'hero-desc': 'A blockchain-based digital identity (DID) solution delivering trusted authentication and attestation experiences.',
        'sub-nav-1': 'GenID',
        'sub-nav-2': 'Passkey',
        'breadcrumb-current': 'GenID',
        'main-title': 'GenID',
        'main-desc': 'Content coming soon.'
      }
    },
    'solution-passkey': {
      ko: {
        'hero-title': 'Passkey',
        'hero-desc': '비밀번호 없는 차세대 인증 기술로 안전하고 편리한 로그인 경험을 제공합니다.',
        'sub-nav-1': 'GenID',
        'sub-nav-2': 'Passkey',
        'breadcrumb-current': 'Passkey',
        'main-title': 'Passkey',
        'main-desc': '콘텐츠 준비 중입니다.'
      },
      en: {
        'hero-title': 'Passkey',
        'hero-desc': 'Passwordless next-gen authentication for secure and convenient login experiences.',
        'sub-nav-1': 'GenID',
        'sub-nav-2': 'Passkey',
        'breadcrumb-current': 'Passkey',
        'main-title': 'Passkey',
        'main-desc': 'Content coming soon.'
      }
    },
    'about-awards': {
      ko: {
        'breadcrumb-current': '수상현황',
        'page-title': '인증·수상',
        'page-sub': '콘텐츠 준비 중입니다.'
      },
      en: {
        'breadcrumb-current': 'Awards',
        'page-title': 'Certifications & Awards',
        'page-sub': 'Content coming soon.'
      }
    }
  };

  function applyContentLanguage(lang) {
    var pageKey = getPageKey();
    var pageData = SUBPAGE_I18N[pageKey];
    if (!pageData) return;
    var T = pageData[lang] || pageData.ko;

    var main = document.querySelector('.page-main') || document.body;
    if (!main) return;

    main.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var text = T[key];
      if (text === undefined) return;
      if (el.getAttribute('data-i18n-html') === 'true') {
        el.innerHTML = text.replace(/\n/g, '<br>');
      } else {
        el.textContent = text.replace(/\n/g, '\n');
      }
    });

    /* sub-nav links (page-specific) */
    var subNavLinks = main.querySelectorAll('.sub-nav-links a');
    if (subNavLinks.length && T['sub-nav-1']) {
      subNavLinks[0].textContent = T['sub-nav-1'];
      if (subNavLinks[1]) subNavLinks[1].textContent = T['sub-nav-2'];
      if (subNavLinks[2]) subNavLinks[2].textContent = T['sub-nav-3'];
    }

    /* breadcrumb current */
    var bcCurrent = main.querySelector('.breadcrumb .current');
    if (bcCurrent && T['breadcrumb-current']) bcCurrent.textContent = T['breadcrumb-current'];

    /* Typing elements: replace displayed text and data-text for re-init */
    var intro1 = document.getElementById('intro-typing-1');
    var intro2 = document.getElementById('intro-typing-2');
    if (intro1 && T['intro-typing-1']) {
      intro1.setAttribute('data-text', T['intro-typing-1']);
      intro1.textContent = T['intro-typing-1'];
      if (intro2) intro2.classList.remove('intro-typing-cursor');
    }
    if (intro2 && T['intro-typing-2']) {
      intro2.setAttribute('data-text', T['intro-typing-2']);
      intro2.textContent = T['intro-typing-2'];
    }

    var hist1 = document.getElementById('history-typing-1');
    var hist2 = document.getElementById('history-typing-2');
    var hasHistoryTypingCursor = !!main.querySelector('.history-typing-cursor');
    var reducedMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (hist1 && T['history-typing-1']) {
      hist1.setAttribute('data-text', T['history-typing-1']);
      if (!hist1.classList.contains('history-typing-running')) {
        if (
          !hasHistoryTypingCursor ||
          reducedMotion ||
          hist1.textContent.trim() !== ''
        ) {
          hist1.textContent = T['history-typing-1'];
        }
      }
    }
    if (hist2 && T['history-typing-2']) {
      hist2.setAttribute('data-text', T['history-typing-2']);
      if (!hist2.classList.contains('history-typing-running')) {
        if (
          !hasHistoryTypingCursor ||
          reducedMotion ||
          hist2.textContent.trim() !== ''
        ) {
          hist2.textContent = T['history-typing-2'];
        }
      }
    }

    /* History outro typing */
    var outroLines = main.querySelectorAll('.outro-line[data-text]');
    if (outroLines.length && T['outro-1']) {
      var keys = ['outro-1', 'outro-2', 'outro-3'];
      outroLines.forEach(function (line, i) {
        var k = keys[i];
        if (T[k]) {
          line.setAttribute('data-text', T[k]);
          var span = line.querySelector('.outro-text');
          if (span) span.textContent = T[k];
        }
      });
    }

    /* CI CONCEPT title (data-text) */
    var ciTitle = document.getElementById('ciConceptTitle');
    if (ciTitle && T['ci-concept-title']) {
      ciTitle.setAttribute('data-text', T['ci-concept-title']);
      if (!ciTitle.classList.contains('ci-typing-cursor')) {
        ciTitle.textContent = T['ci-concept-title'];
      }
    }

    window.dispatchEvent(
      new CustomEvent('bdgen:subpage-language-applied', {
        detail: { lang: lang, pageKey: pageKey }
      })
    );
  }

  window.applySubpageContent = applyContentLanguage;

  document.addEventListener('DOMContentLoaded', function () {
    var lang = localStorage.getItem('bdgen-lang') || 'ko';
    applyContentLanguage(lang);
  });
})();
