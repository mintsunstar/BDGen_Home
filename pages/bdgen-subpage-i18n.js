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
        'sub-nav-1': '사업영역',
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
        'sub-nav-1': 'Business',
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
        'main-desc': '콘텐츠 준비 중입니다.',
        'gid-hero-head':
          '나의 신원, 내가 관리한다 — <span class="gid-brand-blue">GenID</span>',
        'gid-hero-p1':
          '<span class="gid-brand-blue">GenID</span>는 나의 신원정보를 안전한 <strong>블록체인</strong>에 저장하고 관리하는\n<strong>자기 주권적 신원</strong>과 <strong>W3C DID Standard</strong>가 충실히 구현된 <strong>BDGen</strong>만의 DID 솔루션 입니다.\n강력한 보안성과 처리 성능을 제공하며 다양한 서비스에 유연하게 적용되어 안정적으로 동작합니다.',
        'gid-features-title': 'Why <span class="gid-brand-blue">GenID</span>',
        'gid-features-lead':
          'Hyperledger Fabric 기반으로 <strong>SDK</strong>, <strong>클라우드 Admin</strong>, <strong>글로벌 표준</strong>을 지원합니다.',
        'gid-feat-1': 'W3C 분산 식별 표준 준수',
        'gid-feat-2': 'VC 모니터링 및 통합 Admin 제공',
        'gid-feat-3': '다양한 SDK로 유연한 적용',
        'gid-feat-4': '강력한 통신 보안(TLS)과 위변조 방지',
        'gid-apps-title': 'Built for Every Domain',
        'gid-apps-lead': '공공·교육·금융·의료·전자계약 등 다양한 분야에 적용할 수 있습니다.',
        'gid-app-1': '스마트폰 학생증 및 출입인증 시스템',
        'gid-app-2': '정부24 전자증명서 발급 시스템',
        'gid-app-3': '금융기관 앱 본인 인증',
        'gid-app-4': '전자계약 시스템',
        'gid-app-5': '졸업증명서, TOEIC 성적증명서 발급',
        'gid-app-6': '예방접종증명서 발급 시스템',
        'gid-flow-title': 'Service Flow',
        'gid-flow-lead':
          '사용자·패스키·서비스 기관·Authenticator 간 등록 및 인증 흐름을 나타냅니다.',
        'gid-pf-node-user': '사용자',
        'gid-pf-node-device': '패스키 사용자',
        'gid-pf-node-service': '서비스 기관',
        'gid-pf-badge-sk': '개인키',
        'gid-pf-badge-pk': '공개키',
        'gid-pf-s01': '패스키 등록 & 로그인 요청',
        'gid-pf-s02': 'Challenge 요청',
        'gid-pf-s03': 'Challenge 생성, 전달',
        'gid-pf-s04': 'Challenge 전달',
        'gid-pf-s05': '인증 (생체인증, PIN, 패턴)',
        'gid-pf-s06': 'Challenge 전자서명',
        'gid-pf-s07': '패스키 등록 & 로그인 요청'
      },
      en: {
        'hero-title': 'GenID',
        'hero-desc': 'A blockchain-based digital identity (DID) solution delivering trusted authentication and attestation experiences.',
        'sub-nav-1': 'GenID',
        'sub-nav-2': 'Passkey',
        'breadcrumb-current': 'GenID',
        'main-title': 'GenID',
        'main-desc': 'Content coming soon.',
        'gid-hero-head':
          'My identity, under my control — <span class="gid-brand-blue">GenID</span>',
        'gid-hero-p1':
          '<span class="gid-brand-blue">GenID</span> is BDGen\'s DID solution that stores and manages your identity on a secure <strong>blockchain</strong>,\nwith <strong>self-sovereign identity</strong> and the <strong>W3C DID standard</strong> faithfully implemented.\nIt delivers strong security and performance, flexibly fits many services, and runs reliably in production.',
        'gid-features-title': 'Why <span class="gid-brand-blue">GenID</span>',
        'gid-features-lead':
          'Built on Hyperledger Fabric with <strong>SDKs</strong>, a <strong>cloud Admin console</strong>, and <strong>global standards</strong> support.',
        'gid-feat-1': 'W3C decentralized identifier standards',
        'gid-feat-2': 'VC monitoring and unified Admin',
        'gid-feat-3': 'Flexible integration via multiple SDKs',
        'gid-feat-4': 'Strong transport security (TLS) and tamper resistance',
        'gid-apps-title': 'Built for Every Domain',
        'gid-apps-lead': 'Applicable across public sector, education, finance, healthcare, e-contracts, and more.',
        'gid-app-1': 'Smartphone student ID and access control',
        'gid-app-2': 'Gov24 electronic certificate issuance',
        'gid-app-3': 'Financial app identity verification',
        'gid-app-4': 'Electronic contract systems',
        'gid-app-5': 'Graduation and TOEIC score certificates',
        'gid-app-6': 'Vaccination certificate issuance',
        'gid-flow-title': 'Service Flow',
        'gid-flow-lead':
          'Registration and authentication flow among the user, passkey, service provider, and Authenticator.',
        'gid-pf-node-user': 'User',
        'gid-pf-node-device': 'Passkey user',
        'gid-pf-node-service': 'Service provider',
        'gid-pf-badge-sk': 'Private key',
        'gid-pf-badge-pk': 'Public key',
        'gid-pf-s01': 'Passkey registration & login request',
        'gid-pf-s02': 'Challenge request',
        'gid-pf-s03': 'Challenge generation & delivery',
        'gid-pf-s04': 'Challenge delivery',
        'gid-pf-s05': 'Authentication (biometrics, PIN, pattern)',
        'gid-pf-s06': 'Challenge signing',
        'gid-pf-s07': 'Passkey registration & login request'
      }
    },
    'solution-passkey': {
      ko: {
        'hero-title': 'Passkey',
        'hero-desc': '비밀번호 없는 차세대 인증 기술로 안전하고 편리한 로그인 경험을 제공합니다.',
        'sub-nav-1': 'GenID',
        'sub-nav-2': '<span class="pk-word-passkey">Passkey</span>',
        'breadcrumb-current': '<span class="pk-word-passkey">Passkey</span>',
        'pk-intro-title': 'What is <span class="pk-word-passkey">Passkey</span>?',
        'pk-intro-title-plain': 'What is Passkey?',
        'pk-intro-desc':
          '<span class="pk-word-passkey">Passkey</span>는 복잡한 비밀번호 대신 생체 인식·디바이스 PIN 등으로\n로그인하는 차세대 인증입니다. 표준 기반의 공개키 암호화로 피싱·자격 증명 유출 위험을 줄이고,\n사용자에게는 한 번의 인증으로 빠르고 일관된 경험을 제공합니다.',
        'pk-intro-glass-p1':
          '<span class="pk-word-passkey">Passkey</span>는 복잡한 ',
        'pk-intro-glass-old': '비밀번호',
        'pk-intro-glass-new': '<span class="pk-word-passkey">Passkey</span>',
        'pk-intro-glass-p2':
          ' 대신 생체 인식·디바이스 PIN 등으로<br>로그인하는 차세대 인증입니다. 표준 기반의 공개키 암호화로 피싱·자격 증명 유출 위험을 줄이고,<br>사용자에게는 한 번의 인증으로 빠르고 일관된 경험을 제공합니다.',
        'pk-feat-title': 'Benefits <span class="pk-word-passkey">Passkey</span>',
        'pk-feat-lead':
          '사용 편의성, 보안성, 확장성을 기반으로 다양한 디지털 서비스 환경에 최적화된 인증 경험을 제공합니다.',
        'pk-feat-1-title': '편의성',
        'pk-feat-1-desc':
          '기억할 필요 없이, 생체인식(PIN, 지문, 얼굴 등)으로\n간편하게 로그인',
        'pk-feat-2-title': '기술성',
        'pk-feat-2-desc':
          'Apple, Google, Microsoft 등 주요 플랫폼에서\n모든 기기 간 동기화 가능',
        'pk-feat-3-title': '보안성',
        'pk-feat-3-desc': '피싱에 강하고 보안성이 뛰어난 암호화 기반 인증',
        'pk-exp-title': 'Technology Foundation',
        'pk-exp-lead':
          '<span class="pk-word-passkey">Passkey</span> 구축에 필요한 핵심 기술과 인증 기반 역량을 바탕으로 안정적인 서비스를 제공합니다.',
        'pk-exp-1-title': '국내외 표준 기술 규격 준수 및 인증',
        'pk-exp-1-desc':
          'FIDO2 및 WebAuthn에 맞춰 글로벌 상호운용성을 확보하고, 높은 수준의 보안 요구를 충족하는 인증 아키텍처를 설계합니다.',
        'pk-exp-1-t1': '#FIDO2',
        'pk-exp-1-t2': '#WebAuthn',
        'pk-exp-1-t3': '#표준준수',
        'pk-exp-2-title': '강력한 보안 아키텍처',
        'pk-exp-2-desc':
          '공개키 암호와 단말 보안 영역(Secure Enclave/TEE 등)을 활용해 비밀키 유출 가능성을 최소화하고, 서버는 공개키·도전값 검증 중심으로 운영합니다.',
        'pk-exp-2-t1': '#공개키',
        'pk-exp-2-t2': '#SecureEnclave',
        'pk-exp-2-t3': '#무패스워드',
        'pk-exp-3-title': '신속한 구축 및 운영 편의성',
        'pk-exp-3-desc':
          'SDK·API로 기존 시스템에 빠르게 연동하고, 등록·인증·장치 관리 등 운영을 지원하는 콘솔로 일상적인 운영 부담을 줄입니다.',
        'pk-exp-3-t1': '#SDK',
        'pk-exp-3-t2': '#API',
        'pk-exp-3-t3': '#운영콘솔',
        'pk-banner-text':
          '더 안전하고, 더 빠르게 <span class="pk-word-passkey">Passkey</span>는 비밀번호 없는 로그인',
        'pk-banner-cta': 'Passkey 체험하기',
        'pk-flow-title': '<span class="pk-word-passkey">Passkey</span> 동작 원리',
        'pk-flow-title-plain': 'Passkey 동작 원리',
        'pk-flow-lead':
          '사용자 단말의 인증장치가 개인키로 서명하고, 서버는 공개키와 도전·응답 절차로 검증합니다.\n브라우저·앱은 표준 프로토콜을 통해 등록·인증 흐름을 연결합니다.',
        'pk-flow-ph': '도식·플로우 이미지 영역',
        'pk-reg-title': '간편하게 이루어지는 <span class="pk-word-passkey">Passkey</span> 등록',
        'pk-auth-title': '비밀번호가 필요 없는 <span class="pk-word-passkey">Passkey</span> 인증',
        'pk-reg-s1': '1. 시작',
        'pk-reg-s2': '2. 생체 인증',
        'pk-reg-s3': '3. 완료',
        'pk-reg-s4': '4. 등록 마침',
        'pk-auth-s1': '1. 로그인 요청',
        'pk-auth-s2': '2. 생체 검증',
        'pk-auth-s3': '3. 로그인 완료',
        'pk-ben-title': 'Business Impact',
        'pk-ben-lead':
          '<span class="pk-word-passkey">Passkey</span> 도입을 통해 기대할 수 있는 보안성, 사용 편의성, 운영 효율 향상 효과를 확인해보세요.',
        'pk-ben-1-h': '1. 운영 비용절감',
        'pk-ben-1-p':
          '<ul class="pk-ben-bullet-list"><li class="pk-ben-stat-line">도입 사례 기준 운영·인증 비용 평균 <span class="pk-count-up" data-count="35" data-suffix="%">0</span> 절감</li><li>비밀번호 관리를 위한 보안 투자 감소</li><li>사용자의 비밀번호 분실에 따른 VOC 및 추가 인증 관련 비용 절감</li><li>소셜 로그인 등 다양한 로그인 수단을 지원하기 위한 연동 비용 제거</li></ul>',
        'pk-ben-2-h': '2. 보안 강화',
        'pk-ben-2-p':
          '<ul class="pk-ben-bullet-list"><li class="pk-ben-stat-line">네트워크상 비밀번호 평문 전송 <span class="pk-count-up" data-count="0">0</span>건</li><li>사용자 부주의, 서버 해킹 등에 의한 비밀번호 유출 위험 해소</li><li>네트워크를 통한 비밀번호 전송 배제</li><li>피싱 사이트를 통한 계정정보 탈취 차단</li></ul>',
        'pk-ben-3-h': '3. 사용자 경험 혁신',
        'pk-ben-3-p':
          '<ul class="pk-ben-bullet-list"><li class="pk-ben-stat-line">단 <span class="pk-count-up" data-count="1">0</span>회 등록으로 모든 기기에서 연속 로그인</li><li>비밀번호를 일일이 입력하거나 기억해야 하는 번거로움 해소</li><li>스마트폰, PC, 태블릿 등 다양한 사용자 기기 중 한 곳에서만 등록하면, 다른 기기에서 연속성 있게 사용 가능</li></ul>',
        'pk-contact-title':
          '<span class="pk-contact-passkey">Passkey</span>에 대해 궁금하신 점이 있으실까요?',
        'pk-contact-phone': '대표문의 02-6091-1533',
        'pk-contact-email': '이메일문의 passkey@bdgen.co.kr',
        'pk-ph-visual': '일러스트 영역',
        'pk-ph-cert': '인증서·규격 이미지',
        'pk-ph-arch': '보안·칩 도식',
        'pk-ph-dash': '구축·대시보드 이미지',
        'pk-ph-benefit': '도입 효과 이미지',
        'pk-ph-step': '화면 캡처',
        'pk-role-user': '사용자',
        'pk-role-client': '브라우저·앱',
        'pk-role-server': '서버',
        'pk-role-auth': '인증장치'
      },
      en: {
        'hero-title': 'Passkey',
        'hero-desc': 'Passwordless next-gen authentication for secure and convenient login experiences.',
        'sub-nav-1': 'GenID',
        'sub-nav-2': '<span class="pk-word-passkey">Passkey</span>',
        'breadcrumb-current': '<span class="pk-word-passkey">Passkey</span>',
        'pk-intro-title': 'What is <span class="pk-word-passkey">Passkey</span>?',
        'pk-intro-title-plain': 'What is Passkey?',
        'pk-intro-desc':
          '<span class="pk-word-passkey">Passkeys</span> replace memorized passwords with biometrics or a device PIN,\nusing standards-based public-key cryptography to reduce phishing and credential theft,\nwhile keeping sign-in fast and consistent.',
        'pk-intro-glass-p1':
          '<span class="pk-word-passkey">Passkeys</span> replace memorized ',
        'pk-intro-glass-old': 'passwords',
        'pk-intro-glass-new': '<span class="pk-word-passkey">Passkey</span>',
        'pk-intro-glass-p2':
          ' with biometrics or a device PIN,<br>using standards-based public-key cryptography to reduce phishing and credential theft,<br>while keeping sign-in fast and consistent.',
        'pk-feat-title': 'Benefits <span class="pk-word-passkey">Passkey</span>',
        'pk-feat-lead':
          'Built on ease of use, security, and scalability, we deliver authentication experiences optimized for diverse digital service environments.',
        'pk-feat-1-title': 'Convenience',
        'pk-feat-1-desc':
          'Nothing to memorize—use biometrics (PIN, fingerprint, face, and more)\nto sign in with ease.',
        'pk-feat-2-title': 'Technology',
        'pk-feat-2-desc':
          'On major platforms including Apple, Google, and Microsoft,\npasskeys can sync across all your devices.',
        'pk-feat-3-title': 'Security',
        'pk-feat-3-desc': 'Cryptography-based authentication that resists phishing with strong security.',
        'pk-exp-title': 'Technology Foundation',
        'pk-exp-lead':
          'We provide stable services grounded in core technologies and authentication capabilities essential for <span class="pk-word-passkey">Passkey</span> implementation.',
        'pk-exp-1-title': 'Standards compliance and certification',
        'pk-exp-1-desc':
          'Aligned with FIDO2 and WebAuthn for global interoperability and architectures that meet stringent security expectations.',
        'pk-exp-1-t1': '#FIDO2',
        'pk-exp-1-t2': '#WebAuthn',
        'pk-exp-1-t3': '#Standards',
        'pk-exp-2-title': 'Strong security architecture',
        'pk-exp-2-desc':
          'Public-key cryptography and secure enclaves/TEE minimize private-key exposure; servers verify challenges against registered public keys.',
        'pk-exp-2-t1': '#PublicKey',
        'pk-exp-2-t2': '#SecureEnclave',
        'pk-exp-2-t3': '#Passwordless',
        'pk-exp-3-title': 'Fast integration and operations',
        'pk-exp-3-desc':
          'SDKs and APIs connect to existing systems quickly; consoles help manage registration, authentication, and devices day to day.',
        'pk-exp-3-t1': '#SDK',
        'pk-exp-3-t2': '#API',
        'pk-exp-3-t3': '#Console',
        'pk-banner-text':
          'Safer and faster <span class="pk-word-passkey">Passkey</span> is passwordless login',
        'pk-banner-cta': 'Try Passkey',
        'pk-flow-title': 'How <span class="pk-word-passkey">Passkey</span> works',
        'pk-flow-title-plain': 'How Passkey works',
        'pk-flow-lead':
          'The authenticator on the user device signs with a private key; the server verifies using the registered public key and a challenge–response flow.\nBrowsers and apps connect the ceremony via standard protocols.',
        'pk-flow-ph': 'Diagram / flow image area',
        'pk-reg-title': 'Streamlined <span class="pk-word-passkey">Passkey</span> registration',
        'pk-auth-title': 'Password-free <span class="pk-word-passkey">Passkey</span> authentication',
        'pk-reg-s1': '1. Start',
        'pk-reg-s2': '2. Biometric',
        'pk-reg-s3': '3. Success',
        'pk-reg-s4': '4. Done',
        'pk-auth-s1': '1. Login request',
        'pk-auth-s2': '2. Verification',
        'pk-auth-s3': '3. Signed in',
        'pk-ben-title': 'Business Impact',
        'pk-ben-lead':
          'See how adopting <span class="pk-word-passkey">Passkey</span> can improve security, ease of use, and operational efficiency.',
        'pk-ben-1-h': '1. Lower operating costs',
        'pk-ben-1-p':
          '<ul class="pk-ben-bullet-list"><li class="pk-ben-stat-line">Up to <span class="pk-count-up" data-count="35" data-suffix="%">0</span> lower ops and auth costs (adoption benchmarks)</li><li>Less security spend dedicated to password management</li><li>Fewer VOC and extra authentication costs from lost passwords</li><li>No integration overhead for supporting many login methods (e.g. social login)</li></ul>',
        'pk-ben-2-h': '2. Stronger security',
        'pk-ben-2-p':
          '<ul class="pk-ben-bullet-list"><li class="pk-ben-stat-line"><span class="pk-count-up" data-count="0">0</span> plaintext password transmissions on the network</li><li>Reduces password leak risk from user mistakes and server breaches</li><li>No password transmission over the network</li><li>Blocks credential theft via phishing sites</li></ul>',
        'pk-ben-3-h': '3. User experience innovation',
        'pk-ben-3-p':
          '<ul class="pk-ben-bullet-list"><li class="pk-ben-stat-line"><span class="pk-count-up" data-count="1">0</span> registration for seamless login across devices</li><li>No need to type or remember passwords one by one</li><li>Register once on a phone, PC, or tablet—use seamlessly across devices</li></ul>',
        'pk-contact-title': 'Have questions about <span class="pk-contact-passkey">Passkey</span>?',
        'pk-contact-phone': 'Main line 02-6091-1533',
        'pk-contact-email': 'Email passkey@bdgen.co.kr',
        'pk-ph-visual': 'Illustration area',
        'pk-ph-cert': 'Certificate / standards visual',
        'pk-ph-arch': 'Security / hardware diagram',
        'pk-ph-dash': 'Build / dashboard visual',
        'pk-ph-benefit': 'Benefits visual',
        'pk-ph-step': 'UI screen',
        'pk-role-user': 'User',
        'pk-role-client': 'Browser / app',
        'pk-role-server': 'Server',
        'pk-role-auth': 'Authenticator'
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
      if (subNavLinks[1]) {
        var sn2 = subNavLinks[1];
        if (sn2.getAttribute('data-i18n-html') === 'true' && T['sub-nav-2'] !== undefined) {
          sn2.innerHTML = String(T['sub-nav-2']).replace(/\n/g, '');
        } else if (T['sub-nav-2'] !== undefined) {
          sn2.textContent = T['sub-nav-2'];
        }
      }
      if (subNavLinks[2]) subNavLinks[2].textContent = T['sub-nav-3'];
    }

    /* breadcrumb current */
    var bcCurrent = main.querySelector('.breadcrumb .current');
    if (bcCurrent && T['breadcrumb-current'] !== undefined) {
      if (bcCurrent.getAttribute('data-i18n-html') === 'true') {
        bcCurrent.innerHTML = String(T['breadcrumb-current']).replace(/\n/g, '');
      } else {
        bcCurrent.textContent = T['breadcrumb-current'];
      }
    }

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

    /* Passkey page — 히어로·Technology Foundation 타이핑용 data-text, 동작 원리 제목은 타이핑 후 HTML(span) 복원 */
    if (pageKey === 'solution-passkey') {
      var reducedPk =
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var heroTyping = document.getElementById('pk-hero-typing');
      if (heroTyping && T['hero-title'] !== undefined) {
        heroTyping.setAttribute('data-text', T['hero-title']);
        if (!heroTyping.classList.contains('pk-typing-cursor')) {
          heroTyping.textContent = T['hero-title'];
        }
      }
      var introTitleEl = document.getElementById('pk-intro-title');
      if (introTitleEl && T['pk-intro-title'] !== undefined) {
        introTitleEl.setAttribute(
          'data-after-typing-html',
          String(T['pk-intro-title']).replace(/\n/g, '')
        );
        if (T['pk-intro-title-plain'] !== undefined) {
          introTitleEl.setAttribute('data-text', T['pk-intro-title-plain']);
        }
        if (reducedPk) {
          introTitleEl.innerHTML = String(T['pk-intro-title']).replace(/\n/g, '<br>');
        } else if (!introTitleEl.classList.contains('pk-typing-cursor')) {
          introTitleEl.textContent = '';
        }
      }
      var expTitleEl = document.getElementById('pk-exp-title');
      if (expTitleEl && T['pk-exp-title'] !== undefined) {
        expTitleEl.setAttribute('data-text', T['pk-exp-title']);
        if (!expTitleEl.classList.contains('pk-typing-cursor')) {
          expTitleEl.textContent = T['pk-exp-title'];
        }
      }
      var benTitleEl = document.getElementById('pk-ben-title');
      if (benTitleEl && T['pk-ben-title'] !== undefined) {
        benTitleEl.setAttribute('data-text', T['pk-ben-title']);
        if (!benTitleEl.classList.contains('pk-typing-cursor')) {
          benTitleEl.textContent = T['pk-ben-title'];
        }
      }
      var flowTitleEl = document.getElementById('pk-flow-title');
      if (flowTitleEl && T['pk-flow-title'] !== undefined) {
        flowTitleEl.setAttribute(
          'data-after-typing-html',
          String(T['pk-flow-title']).replace(/\n/g, '')
        );
        if (T['pk-flow-title-plain'] !== undefined) {
          flowTitleEl.setAttribute('data-text', T['pk-flow-title-plain']);
        }
        if (reducedPk) {
          flowTitleEl.innerHTML = String(T['pk-flow-title']).replace(/\n/g, '<br>');
        } else if (!flowTitleEl.classList.contains('pk-typing-cursor')) {
          flowTitleEl.textContent = '';
        }
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
