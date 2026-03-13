# BDGen 랜딩 페이지 — React/Next.js 이관 구조 설계안

현재 `bdgen_landing.html`을 기준으로 실제 프론트엔드 프로젝트로 이관하기 위한 구조 설계 문서입니다.  
개발자·퍼블리셔가 바로 이관 작업을 시작할 수 있도록 구체적으로 정리했습니다.

---

## 1. 컴포넌트 분리 제안

### 1-1. 섹션 단위 컴포넌트

| 컴포넌트 | 대응 HTML ID | 역할 | Props / 데이터 |
|----------|--------------|------|----------------|
| **Header** | `#gnb` | 로고, GNB 네비, 햄버거 버튼 | `navItems[]` |
| **MobileNav** | `#mobileMenu` | 전체화면 모바일 메뉴 (dialog) | `navItems[]`, `isOpen`, `onClose` |
| **HeroSection** | `#hero` | 배지, 타이틀, 설명, CTA, 캔버스 | `hero` config (선택) |
| **TrustSection** | `#trust` | 숫자/텍스트 trust 그리드 | `items: TrustItem[]` |
| **HighlightSection** | `#about` | 회사 소개(About BDGen) | `about` config (정적) |
| **ServicesSection** | `#services` | 서비스 카드 3종 | `services: Service[]` |
| **SolutionsSection** | `#genid` | GenID 탭(특징/적용분야/플로우) | `features`, `useCases`, `flowSteps` |
| **WhySection** | `#why` | 비디젠 강점 6가지 | `reasons: Reason[]` |
| **ReferenceSection** | `#reference` | 파트너 로고 + 레퍼런스 카드 | `partners[]`, `references[]` |
| **NewsSection** | `#news` | 뉴스 카드 그리드 | `news: NewsItem[]` |
| **CTASection** | `#cta` | 문의 유도, 버튼, 연락처 | `contact: ContactConfig` |
| **Footer** | — | 회사정보, 링크 컬럼, 저작권 | `company`, `linkGroups` |
| **BackToTop** | `#backTop` | 맨 위로 버튼 | — |

> **참고**: `HighlightSection`은 HTML `#about`, `landing-highlight` 클래스에 대응합니다.

### 1-2. 컴포넌트 트리

```
Layout / Page
├── Header
│   └── MobileNav (조건부 렌더 또는 포탈)
├── main
│   ├── HeroSection
│   │   └── HeroCanvas (또는 useHeroCanvas)
│   ├── TrustSection
│   ├── HighlightSection (About)
│   ├── ServicesSection
│   ├── SolutionsSection (GenID)
│   ├── WhySection
│   ├── ReferenceSection
│   ├── NewsSection
│   └── CTASection
├── Footer
└── BackToTop
```

---

## 2. 공통 UI 컴포넌트 제안

반복되는 패턴을 공통 컴포넌트로 분리하면 유지보수와 일관성이 좋아집니다.

| 컴포넌트 | 역할 | 사용처 |
|----------|------|--------|
| **SectionHeader** | `section-label` + `section-title` + `section-sub` 조합 | Services, Why, Reference, News 등 |
| **PrimaryButton** | `btn btn-primary` | Hero CTA, GNB CTA, Solutions CTA, CTA 섹션 |
| **SecondaryButton** | `btn btn-outline` | Hero 보조 CTA, Reference "전체 보기", News "모든 소식" |
| **TrustItem** | 숫자형/텍스트형 trust 1개 | TrustSection |
| **ServiceCard** | 서비스 카드 (번호, 아이콘, 제목, 설명, 태그) | ServicesSection |
| **SolutionTab** | GenID 탭 버튼 | SolutionsSection |
| **GenIDFeature** | GenID 특징 1개 (아이콘, 제목, 설명) | SolutionsSection |
| **GenIDUseCase** | GenID 적용분야 1개 | SolutionsSection |
| **GenIDFlowStep** | GenID 플로우 1단계 | SolutionsSection |
| **WhyCard** | Why BDGen 카드 1개 | WhySection |
| **LogoGridItem** | 파트너 로고 1개 (텍스트 또는 이미지) | ReferenceSection |
| **RefCard** | 레퍼런스 프로젝트 카드 1개 | ReferenceSection |
| **NewsCard** | 뉴스 카드 (썸네일, 카테고리, 날짜, 제목, 요약, 링크) | NewsSection |

### 2-1. SectionHeader Props 예시

```ts
interface SectionHeaderProps {
  label: string;        // "SERVICES", "REFERENCE" 등
  title: ReactNode;     // <h2> 내용 (span으로 gradient 가능)
  sub?: string;         // section-sub 설명
  centered?: boolean;   // section-header .center 스타일
}
```

### 2-2. Button 공통화

```ts
// PrimaryButton, SecondaryButton
type ButtonVariant = 'primary' | 'outline';
interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  children: ReactNode;
  href: string;
  // as="button" 지원 시 button 역할도 가능
}
```

---

## 3. 데이터 분리 대상 정리

### 3-1. 배열/상수로 분리 권장 항목

| 대상 | 파일 추천 | 구조 | 비고 |
|------|-----------|------|------|
| **nav menu** | `data/nav.ts` | `{ label, href }[]` | 앵커 또는 라우트 |
| **trust items** | `data/trust.ts` | `TrustItem[]` | CMS 연결 시 API 교체 |
| **services** | `data/services.ts` | `Service[]` | index, icon, title, desc, tags |
| **reference partners** | `data/partners.ts` | `Partner[]` | name, logo?, url? |
| **references** | `data/references.ts` | `Reference[]` | tag, client, project, period, url? |
| **solutions (GenID)** | `data/genid.ts` | features, useCases, flowSteps | 탭별 콘텐츠 |
| **why reasons** | `data/why.ts` | `Reason[]` | num, icon, title, desc |
| **news cards** | `data/news.ts` | `NewsItem[]` | category, date, title, excerpt, url, thumb? |
| **footer links** | `data/footer.ts` | linkGroups, company | 회사정보, 정책 URL |

### 3-2. 타입 정의 (TypeScript)

```ts
// types/landing.ts

export type TrustItem =
  | { type: 'number'; count: number; suffix: string; label: string; duration?: number }
  | { type: 'text'; value: string; label: string; confirm?: boolean };

export interface Service {
  index: string;
  icon: string;
  title: string;
  desc: string;
  tags: string[];
}

export interface Partner {
  name: string;
  logo?: string;
  url?: string;
  placeholder?: boolean;
}

export interface Reference {
  tag: string;
  client: string;
  project: string;
  period: string;
  url?: string;
  placeholder?: boolean;
}

export interface NewsItem {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  url: string;
  thumb?: string;
}

export interface Reason {
  num: string;
  icon: string;
  title: string;
  desc: string;
}

export interface ContactConfig {
  phone: string;
  email: string;
  address: string;
  mailtoSubject?: string;
  introPdfUrl?: string;
}

export interface CompanyInfo {
  name: string;
  ceo: string;
  registrationNumber: string;
  address: string;
  phone: string;
  email: string;
}
```

### 3-3. 데이터 파일 예시

```
src/data/
├── nav.ts           # navItems
├── trust.ts         # trustItems
├── services.ts      # services
├── partners.ts      # partners
├── references.ts    # references
├── genid.ts         # features, useCases, flowSteps
├── why.ts           # reasons
├── news.ts          # newsItems
├── contact.ts       # contactConfig
├── footer.ts        # company, linkGroups
└── types.ts         # 위 타입 정의
```

---

## 4. 정적/동적 구분

### 4-1. 정적으로 유지하는 영역

| 영역 | 내용 |
|------|------|
| Hero | 배지, 타이틀, 설명, CTA 문구 |
| Highlight (About) | 회사 소개 본문, feature 3종, 인증 배지 텍스트 |
| GenID | 탭 헤더, 특징 4종, 적용분야 6종, 플로우 5단계 |
| Why | 6가지 카드 — 변경 빈도 낮음 |
| Footer 기본 | 회사명, 대표, 사업자번호, 주소 등 |
| GNB | 메뉴 라벨, 앵커 경로 |

### 4-2. 향후 CMS/API 연결 권장 영역

| 영역 | 데이터 소스 | 우선순위 |
|------|-------------|----------|
| Trust | CMS / config API | 중 — 숫자·인증 갱신 |
| Services | CMS | 낮 — 추가/수정 시 |
| Partners | API / CMS | 중 — 로고·목록 관리 |
| References | API / CMS | 중 — 프로젝트 목록 |
| News | API / CMS | **높** — 자주 갱신 |
| CTA 연락처 | config / CMS | 낮 |
| Footer 정책 링크 | config | 낮 |

### 4-3. 정적 + 동적 혼합

- **ReferenceSection**: `partners`, `references`를 API에서 받고, 섹션 헤더·설명은 정적
- **NewsSection**: `news`를 API에서 받고, "NEWS & INSIGHTS" 헤더는 정적
- **TrustSection**: 초기값은 JSON/상수, CMS 연동 시 API로 교체

---

## 5. 추천 폴더 구조

### 5-1. Next.js App Router 기준

```
bdgen-landing/
├── public/
│   └── images/              # 파트너 로고, 뉴스 썸네일 등
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx         # 랜딩 페이지 조합
│   │   └── globals.css      # :root 변수, reset, 공통 스타일
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TrustSection.tsx
│   │   │   ├── HighlightSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── SolutionsSection.tsx
│   │   │   ├── WhySection.tsx
│   │   │   ├── ReferenceSection.tsx
│   │   │   ├── NewsSection.tsx
│   │   │   └── CTASection.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── TrustItem.tsx
│   │   │   ├── ServiceCard.tsx
│   │   │   ├── RefCard.tsx
│   │   │   ├── NewsCard.tsx
│   │   │   └── LogoGridItem.tsx
│   │   │
│   │   └── shared/
│   │       ├── HeroCanvas.tsx
│   │       └── BackToTop.tsx
│   │
│   ├── data/
│   │   ├── nav.ts
│   │   ├── trust.ts
│   │   ├── services.ts
│   │   ├── partners.ts
│   │   ├── references.ts
│   │   ├── genid.ts
│   │   ├── why.ts
│   │   ├── news.ts
│   │   ├── contact.ts
│   │   └── footer.ts
│   │
│   ├── types/
│   │   └── landing.ts
│   │
│   ├── hooks/
│   │   ├── useTrustAnimation.ts
│   │   ├── useScrollReveal.ts
│   │   ├── useMobileNav.ts
│   │   ├── useGnbScroll.ts
│   │   └── useHeroCanvas.ts
│   │
│   └── styles/
│       ├── tokens.css       # :root 변수만 (선택)
│       └── components/      # 섹션별 CSS Module (선택)
│           ├── Header.module.css
│           ├── Hero.module.css
│           └── ...
│
└── next.config.js
```

### 5-2. React (Vite) 기준

```
bdgen-landing/
├── public/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/          # 위와 동일 구조
│   ├── data/
│   ├── types/
│   ├── hooks/
│   └── styles/
└── vite.config.ts
```

### 5-3. 페이지 조합 예시 (`page.tsx`)

```tsx
// app/page.tsx
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import TrustSection from '@/components/sections/TrustSection';
// ... 나머지 import
import BackToTop from '@/components/shared/BackToTop';

import { trustItems } from '@/data/trust';
import { services } from '@/data/services';
import { partners, references } from '@/data/references';
import { newsItems } from '@/data/news';
// ...

export default function LandingPage() {
  return (
    <>
      <Header navItems={navItems} />
      <main>
        <HeroSection />
        <TrustSection items={trustItems} />
        <HighlightSection />
        <ServicesSection services={services} />
        <SolutionsSection />
        <WhySection reasons={reasons} />
        <ReferenceSection partners={partners} references={references} />
        <NewsSection news={newsItems} />
        <CTASection contact={contactConfig} />
      </main>
      <Footer company={company} linkGroups={linkGroups} />
      <BackToTop />
    </>
  );
}
```

---

## 6. 이관 시 주의사항

### 6-1. CSS 분리 방향

| 방식 | 권장도 | 비고 |
|------|--------|------|
| **globals.css + 기존 class 유지** | ⭐ 추천 | 이관 속도 빠름, `:root` 변수 그대로 사용 |
| **CSS Modules** | 권장 | 섹션별 `*.module.css`로 점진적 분리 |
| **Tailwind** | 선택 | 기존 class를 유틸리티로 치환 — 작업량 큼 |
| **styled-components / Emotion** | 선택 | JS 기반 스타일 선호 시 |

**실무 권장**: 초기에는 `globals.css`에 기존 스타일을 그대로 옮기고, 이후 섹션별로 CSS Module로 분리. Tailwind는 신규 개발 시 도입 검토.

### 6-2. 스크롤/Observer/인터랙션 로직 배치

| 로직 | 권장 위치 | 비고 |
|------|-----------|------|
| Hero Particle Canvas | `useHeroCanvas` 또는 `HeroCanvas.tsx` | `useEffect` + `useRef`, 탭 visibility 체크 |
| GNB 스크롤 (scrolled) | `useGnbScroll` | scroll event, passive |
| Back to Top 표시 | `useGnbScroll` 또는 `BackToTop` 내부 | scrollY > 400 |
| 모바일 메뉴 | `useMobileNav` | open/close, 포커스 트랩, aria |
| Scroll Reveal | `useScrollReveal` | IntersectionObserver, `.reveal` class |
| Trust 숫자 애니메이션 | `useTrustAnimation` | TrustSection 내부, observer + RAF |
| GenID 탭 전환 | `SolutionsSection` 내부 useState | tab index, 탭 전환 시 reveal 재관찰 |
| 앵커 스무스 스크롤 | `useEffect` 또는 `layout` | `href="#id"` 클릭 처리 |

### 6-3. Hydration / SSR 고려

| 항목 | 처리 | 이유 |
|------|------|------|
| Hero Canvas | `'use client'` 또는 dynamic import | `document`, `window`, Canvas API |
| Trust 애니메이션 | `'use client'` | IntersectionObserver, RAF |
| Scroll Reveal | `'use client'` | IntersectionObserver |
| GNB 스크롤 | `'use client'` | scroll event |
| MobileNav | `'use client'` | open/close state |
| 섹션 레이아웃 | 서버 가능 | 정적 마크업 |
| 데이터 fetch | 서버 (가능 시) | News, Reference 등 API 호출 |

**Next.js**: 랜딩 페이지를 `'use client'`로 두거나, 인터랙션 컴포넌트만 클라이언트로 분리.

### 6-4. 기타

- **링크**: 앵커는 `href="#section-id"`, Next.js `Link` 사용 시 `href="/#section-id"` (같은 페이지) 또는 `href="#section-id"` (SPA 내).
- **이미지**: Next.js `Image` 사용 시 `next.config`에 `bdgen.co.kr` 등 도메인 추가.
- **이메일 보호**: Cloudflare `data-cfemail` 제거 시 `mailto:` 링크로 대체.
- **접근성**: `aria-*`, `role`, `aria-label` 유지. 모바일 메뉴는 `role="dialog"`, `aria-modal`, `aria-expanded` 유지.
- **reduced-motion**: Trust 애니메이션에서 `prefers-reduced-motion` 체크 유지.

---

## 7. 이관 순서 제안

| 순서 | 작업 | 예상 산출물 |
|------|------|-------------|
| 1 | 프로젝트 생성 + `globals.css` (토큰, reset) | Next.js/React 프로젝트 |
| 2 | `SectionHeader`, `Button` 등 공통 UI | ui/
| 3 | `Header`, `MobileNav`, `Footer`, `BackToTop` | layout/
| 4 | `HeroSection` (캔버스 제외) | sections/HeroSection |
| 5 | Hero 캔버스 (`useHeroCanvas` / `HeroCanvas`) | hooks / shared |
| 6 | `TrustSection` + `useTrustAnimation` | sections/, hooks/ |
| 7 | `HighlightSection`, `ServicesSection`, `WhySection` | sections/ |
| 8 | `SolutionsSection` (탭 상태) | sections/ |
| 9 | `ReferenceSection`, `NewsSection` | sections/ |
| 10 | `CTASection` | sections/ |
| 11 | 데이터 파일 분리 (nav, trust, services 등) | data/ |
| 12 | `useScrollReveal`, `useGnbScroll`, `useMobileNav` | hooks/ |
| 13 | API 연동 (News, Reference 등 — 선택) | data fetch |

---

## 8. 참고 파일

- **소스 HTML**: `bdgen_landing.html`
- **기존 설계**: `bdgen_landing_COMPONENT_DESIGN.md`
- **콘텐츠 체크리스트**: `bdgen_landing_CONTENT_CHECKLIST.md`
- **콘텐츠 구조 요약**: `bdgen_landing_CONTENT_STRUCTURE_SUMMARY.md`
