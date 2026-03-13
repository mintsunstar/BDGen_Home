# BDGen 랜딩 페이지 리팩터 요약

목업용 정적 HTML을 **실제 운영 가능한 프론트엔드 베이스 코드**로 재구성한 내용을 정리했습니다.  
디자인 시안(futuristic / premium / dark tech)은 유지하면서, **운영 가능한 코드 구조**를 우선했습니다.

---

## 1. 섹션 영역 매핑 (hero / trust / highlight / solutions 등)

| 요청 구분 | 실제 ID / class | 비고 |
|-----------|-----------------|------|
| hero | `#hero` `landing-hero` | |
| trust | `#trust` `landing-trust` | 숫자/텍스트 타입 구분 |
| highlight | `#about` `landing-highlight` | 회사 소개 |
| services | `#services` | |
| solutions | `#genid` `landing-solutions` | GenID 플래그십 |
| why | `#why` | 역량 6가지 |
| reference | `#reference` | 고객사/프로젝트 |
| news | `#news` | |
| cta | `#cta` `landing-cta` | |
| footer | `footer` | |

---

## 2. 목업 → 실무형 변경 요약

### HTML 구조
| 항목 | 변경 내용 |
|------|-----------|
| **시맨틱 구조** | `main#main-content`로 본문 래핑, `header`(role=banner), `footer`(role=contentinfo) 명시 |
| **섹션 aria-labelledby** | hero/trust/about/services/genid/why/reference/news/cta 섹션에 `aria-labelledby` 연결, `h2`에 `id` 부여 |
| **내비게이션** | `nav`에 `aria-label="주요 메뉴"`, 로고에 `aria-label="BDGen 홈"` |
| **모바일 메뉴** | `div` → `role="dialog"` + `aria-modal="true"` + `hidden` 초기 상태, 트리거는 `button` + `aria-expanded` / `aria-controls` |
| **Hero** | `section`에 `aria-labelledby="hero-title"`, `h1`에 `id="hero-title"` |
| **Trust** | `div` 그리드 → `ul`/`li` + `role="list"`, 숫자/텍스트 구분용 `data-trust-type="number"` \| `"text"` |
| **GenID 탭** | `role="tablist"` / `role="tab"` / `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby`, `aria-hidden` 연동 |
| **플레이스홀더 링크** | `href="#"` 유지 구간에 TODO 주석 추가, 앵커는 `#section-id`로 명시 |
| **Back to Top** | `button` + `aria-label="맨 위로 이동"`, `onclick` 제거 후 JS에서 바인딩 |
| **고객사 로고** | `partners[]` API 연동 시 동일 class로 렌더 가능하도록 TODO 주석 |

### CSS
| 항목 | 변경 내용 |
|------|-----------|
| **디자인 토큰** | 색상/그라데이션 외에 `--space-*`, `--section-padding-y`, `--container-padding-x`, `--radius`, `--z-gnb` 등 spacing/z-index 토큰 추가 |
| **레이아웃** | `padding: 120px` → `var(--section-padding-y)`, `24px` → `var(--container-padding-x)`, `max-width: 1200px` → `75rem` |
| **Typography 토큰** | `--font-family`, `--font-size-xs/sm/base/lg/xl`, `--line-height-base/tight` 추가 |
| **접근성** | `button:focus-visible`, `a:focus-visible` outline 추가, `prefers-reduced-motion: reduce` 시 애니메이션/트랜지션 최소화 및 `scroll-behavior: auto` |
| **모바일 메뉴** | `[hidden]`일 때 `display: none !important`로 확실히 숨김 |

### JavaScript
| 항목 | 변경 내용 |
|------|-----------|
| **Hero 캔버스** | `document.visibilitychange`로 탭 비가시 시 `requestAnimationFrame` 중단, 재가시 시 재시작 |
| **GNB/Back to Top** | 스크롤 리스너 `{ passive: true }`, Back to Top은 `addEventListener`로 스무스 스크롤 |
| **모바일 메뉴** | `onclick` 제거, `open`/`close`를 `addEventListener`로 처리, `aria-expanded`/`hidden` 갱신, 메뉴 내 링크 클릭 시 `closeMobile` |
| **Scroll Reveal** | IIFE로 정리, `window._revealObserver` 노출해 GenID 탭 전환 시 새 패널 reveal 재사용 |
| **Trust 카운터** | `data-trust-type="number"`인 `.trust-num`만 카운트 애니메이션, 1회 실행 후 `unobserve` |
| **GenID 탭** | `switchTab`을 인라인 제거하고 버튼별 `addEventListener`로 호출, `aria-selected`/`aria-hidden` 동기화 |
| **앵커 스크롤** | `href="#"` 단독은 처리 제외, `href="#id"`만 스무스 스크롤 |
| **타이핑 효과** | 목업용 타이핑 제거 (고정 문구만 표시) |

### 콘텐츠/데이터
- **Trust**: 숫자 항목은 `data-count`, `data-suffix`, `data-trust-type="number"`; 비숫자(이노비즈 등)는 `data-trust-type="text"`로 구분.
- **Services / News / Reference**: 섹션 상단에 API 연동 시 기대 데이터 형태 주석 추가 (아래 TODO와 함께 활용).

---

## 3. React/Next 이관 시 섹션 단위 제안

아래 단위로 컴포넌트 분리하면 재사용과 데이터 주입이 쉽습니다.

| 섹션 ID | 제안 컴포넌트명 | 비고 |
|---------|-----------------|------|
| GNB | `Header` / `Nav` / `MobileNav` | 로고, 데스크탑 nav, 햄버거+모바일 메뉴 |
| #hero | `Hero` | 캔버스 + 배지/타이틀/CTA/스크롤 인디케이터 |
| #trust | `TrustBar` | `trustItems[]` props, 숫자/텍스트 타입 구분 |
| #about | `About` | 텍스트 + feature 리스트 + 인증 배지 + 비주얼(오브) |
| #services | `Services` | `services[]` → 카드 그리드 |
| #genid | `GenID` | 탭(특징/적용분야/플로우) + 패널 콘텐츠 |
| #why | `WhyBDGen` | `reasons[]` → 카드 그리드 |
| #reference | `Reference` | 파트너 로고 슬라이더 + `references[]` 카드 그리드 |
| #news | `News` | `news[]` → 카드 그리드 |
| #cta | `Cta` | 타이틀/버튼/연락처 |
| footer | `Footer` | 브랜드/링크 컬럼/하단 법인·정책 |
| — | `BackToTop` | 스크롤 시 표시, 클릭 시 맨 위로 |

**스타일**: CSS 변수(`:root`)는 그대로 두고, 섹션별로 한 블록씩 분리하거나 CSS Modules/Tailwind 등으로 이전 시 클래스명 유지하면 유지보수에 유리합니다.

---

## 4. 남아 있는 Placeholder / TODO 목록

| 위치 | 내용 | 권장 조치 |
|------|------|-----------|
| **고객사 로고** | `logo-track` 내 logo-item | partners[] API 연동 시 동일 class로 렌더 |
| **뉴스 썸네일** | news-thumb 영역 (현재 emoji placeholder) | news.thumb 이미지 URL 또는 CMS 연동 |
| **레퍼런스** | "전체 레퍼런스 보기" 링크 | 실제 레퍼런스 목록 페이지 URL로 교체 |
| **뉴스 카드** | 각 "자세히 보기" `href="#"` | CMS/API 연동 시 상세 페이지 URL로 치환 |
| **뉴스** | "모든 뉴스 보기" 링크 | 뉴스 목록 페이지 URL로 교체 |
| **푸터** | 개인정보처리방침, 이용약관 `href="#"` | 정책 페이지 URL 연결 |
| **CTA 이메일** | `__cf_email__` 등 | 실제 메일 링크 또는 백엔드 연동 |
| **모바일 메뉴** | 주석 "실제 개발 시 링크는 라우트/URL로 교체" | SPA 라우트 또는 실제 URL로 연결 |

---

## 5. 파일 위치 및 이후 단계

### 파일

- **리팩터된 HTML**: `bdgen_landing.html` (동일 파일 인라인 스타일/스크립트 유지)
- **이 요약 문서**: `bdgen_landing_REFACTOR_SUMMARY.md`

### 이후 단계 (확장 가능한 구조로 준비됨)
- **2단계**: 반응형 완료 → `bdgen_landing_RESPONSIVE_SUMMARY.md` 참고
- **3단계**: Trust 숫자 인터랙션 (data-trust-type 구조 이미 반영)

추가로 스타일을 외부 CSS로 분리하거나, JS를 모듈/번들로 나누면 React/Next 이관 시 그대로 가져다 쓸 수 있습니다.
