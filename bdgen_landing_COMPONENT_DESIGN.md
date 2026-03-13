# BDGen 랜딩 페이지 → React/Next.js 컴포넌트 설계안

현재 `bdgen_landing.html`을 기준으로 실서비스 프론트엔드로 이관하기 위한 분리 기준을 정리했습니다.

---

## 1. 컴포넌트 분리 제안

### 1-1. 컴포넌트 구조도

```
Layout
├── Header (GNB + MobileNav)
├── Main
│   ├── Hero
│   ├── TrustBar
│   ├── HighlightSection (About)
│   ├── ServicesSection
│   ├── SolutionsSection (GenID)
│   ├── WhySection (Why BDGen)
│   ├── ReferenceSection
│   ├── NewsSection
│   └── CTASection
├── Footer
└── BackToTop
```

### 1-2. 컴포넌트별 상세

| 컴포넌트 | 역할 | 비고 |
|----------|------|------|
| **Header** | 로고, GNB, 햄버거 버튼 | 모바일에서 MobileNav 트리거 |
| **MobileNav** | 전체화면 모바일 메뉴 | role="dialog", aria-modal |
| **Hero** | 캔버스, 배지, 타이틀, CTA | Particle canvas는 별도 hook/component |
| **TrustBar** | 숫자/텍스트 trust items | 데이터 배열 주입 |
| **HighlightSection** | 회사 소개(About) | 2컬럼(텍스트 + 비주얼) |
| **ServicesSection** | 서비스 카드 그리드 | `services[]` props |
| **SolutionsSection** | GenID 탭 + 패널 | 특징/적용분야/플로우 3탭 |
| **WhySection** | Why BDGen 6 cards | `reasons[]` props |
| **ReferenceSection** | 파트너 로고 + 레퍼런스 카드 | `partners[]`, `references[]` |
| **NewsSection** | 뉴스 카드 그리드 | `news[]` props |
| **CTASection** | CTA 타이틀, 버튼, 연락처 | 연락처는 config |
| **Footer** | 브랜드, 링크 컬럼, 하단 | 링크 구조는 config |
| **BackToTop** | 맨 위로 버튼 | 스크롤 시 표시 |

---

## 2. Props / 데이터 배열 분리

### 2-1. 데이터 주입 대상

| 컴포넌트 | Props | 타입 | 비고 |
|----------|-------|------|------|
| **TrustBar** | `items` | `TrustItem[]` | `{ type: 'number' \| 'text', value, label?, count?, suffix? }` |
| **ServicesSection** | `services` | `Service[]` | `{ index, icon, title, desc, tags[] }` |
| **SolutionsSection** | `features`, `useCases`, `flowSteps` | 배열 | 탭별 콘텐츠 |
| **WhySection** | `reasons` | `Reason[]` | `{ index, icon, title, desc }` |
| **ReferenceSection** | `partners`, `references` | 배열 | `Partner[]`, `Reference[]` |
| **NewsSection** | `news` | `NewsItem[]` | `{ category, date, title, excerpt, url, thumb? }` |
| **CTASection** | `contact` | `ContactConfig` | 전화, 이메일, 주소 |
| **Footer** | `company`, `links` | config | 대표, 사업자번호, 링크 그룹 |

### 2-2. 타입 예시

```ts
// trust
type TrustItem = 
  | { type: 'number'; count: number; suffix: string; label: string }
  | { type: 'text'; value: string; label: string };

// services
type Service = { index: string; icon: string; title: string; desc: string; tags: string[] };

// reference
type Partner = { name: string; logo?: string; url?: string };
type Reference = { tag: string; client: string; project: string; period: string; url?: string };

// news
type NewsItem = { category: string; date: string; title: string; excerpt: string; url: string; thumb?: string };
```

---

## 3. 정적 유지 / API 연결 구분

### 3-1. 정적 유지 (코드 또는 JSON import)

| 영역 | 내용 |
|------|------|
| Hero | 배지, 타이틀, 설명, CTA 문구 |
| Highlight | 회사 소개 본문, feature 3종, 인증 배지 |
| Solutions | GenID 특징 4종, 적용분야 6종, 플로우 5단계 |
| Footer | 회사명, 대표, 사업자번호, 주소(변경 빈도 낮음) |

### 3-2. 향후 API 연결 권장

| 영역 | 데이터 소스 | 비고 |
|------|-------------|------|
| Trust | CMS / config | 숫자·인증은 운영 중 갱신 가능 |
| Services | CMS | 서비스 추가/수정 시 |
| Reference | API / CMS | partners, references |
| News | API / CMS | 목록·상세 |
| CTA 연락처 | config / CMS | 전화, 이메일, 주소 |

### 3-3. 정적 + 동적 혼합

- **ReferenceSection**: partners, references를 API에서 받고, 섹션 타이틀·설명은 정적
- **NewsSection**: news를 API에서 받고, "BDGEN NEWS" 헤더는 정적

---

## 4. 추천 폴더 구조

### 4-1. Next.js App Router 기준

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # 랜딩 페이지 조합
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MobileNav.tsx
│   │   └── Footer.tsx
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── HighlightSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── SolutionsSection.tsx
│   │   ├── WhySection.tsx
│   │   ├── ReferenceSection.tsx
│   │   ├── NewsSection.tsx
│   │   ├── CTASection.tsx
│   │   └── BackToTop.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── SectionHeader.tsx
│       └── Card.tsx
├── data/
│   ├── landing.ts            # 정적 데이터 (또는 JSON)
│   └── config.ts
├── hooks/
│   ├── useTrustAnimation.ts
│   ├── useScrollReveal.ts
│   └── useMobileNav.ts
└── lib/
    └── constants.ts
```

### 4-2. Pages Router 기준

```
src/
├── pages/
│   ├── _app.tsx
│   └── index.tsx
├── components/
│   └── (위와 동일)
├── data/
├── hooks/
└── styles/
```

### 4-3. 데이터 파일 예시

```
src/data/
├── landing.ts       # Trust, Services, Why, Reference, News 등
├── config.ts        # 전화, 이메일, 주소, 정책 URL
└── types.ts         # TrustItem, Service, Reference 등 타입
```

---

## 5. Next.js 이관 시 유의사항

### 5-1. 클라이언트 vs 서버

| 항목 | 권장 | 비고 |
|------|------|------|
| Hero canvas | `'use client'` | DOM 접근 |
| Trust 숫자 애니메이션 | `'use client'` | IntersectionObserver, RAF |
| Scroll Reveal | `'use client'` | IntersectionObserver |
| GNB 스크롤 | `'use client'` | scroll event |
| MobileNav | `'use client'` | open/close state |
| 섹션 레이아웃 | 서버 | 정적 구조는 RSC 가능 |
| 데이터 fetch | 서버 (가능 시) | Reference, News 등 |

### 5-2. 스타일

- CSS 변수(`:root`)는 `globals.css`로 유지
- Tailwind 사용 시: 기존 class를 Tailwind로 점진적 치환
- CSS Modules: `SectionHeader.module.css` 등 섹션별 분리

### 5-3. 링크

- 앵커(`#section-id`) → `<Link href="/#section-id">` 또는 `<Link href="#section-id">`
- SPA 내 앵커는 `href="#section-id"` 그대로 사용 가능

### 5-4. 이미지

- Next.js `Image` 사용 시 `next.config`에 bdgen.co.kr 등 도메인 추가
- 뉴스 썸네일, 파트너 로고는 `Image` 또는 `img` + `sizes` 적용

### 5-5. 이메일 보호

- Cloudflare Email Protection 제거 시 `mailto:` 링크로 대체
- 봇 방지는 별도 처리 (예: Contact form + captcha)

### 5-6. 스크립트 분리

- Particle canvas → `HeroCanvas` 또는 `useHeroCanvas` hook
- Trust 애니메이션 → `useTrustAnimation`
- Scroll reveal → `useScrollReveal` 또는 `reveal` class + observer

### 5-7. 접근성 유지

- `aria-*`, `role`, `aria-label` 그대로 유지
- 모바일 메뉴 `role="dialog"`, `aria-modal`, `aria-expanded` 유지

### 5-8. 성능

- Trust, News 등 동적 섹션은 `dynamic` import로 지연 로딩 가능
- Hero canvas는 viewport 진입 후 로드 고려

---

## 6. 이관 순서 제안

1. **1단계**: 프로젝트 세팅 + `globals.css` (CSS 변수)
2. **2단계**: `SectionHeader`, `Button` 등 공통 UI
3. **3단계**: Header, Footer, BackToTop
4. **4단계**: Hero (캔버스 제외) → 캔버스 추가
5. **5단계**: TrustBar (애니메이션 훅 포함)
6. **6단계**: Highlight, Services, Why (데이터 배열화)
7. **7단계**: Solutions (탭 상태)
8. **8단계**: Reference, News
9. **9단계**: CTA
10. **10단계**: API 연동(Reference, News 등)
