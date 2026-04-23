# 인터랙션 · 애니메이션 정리 (BD_HOME)

`bdgen_landing.html` 인라인 스타일/스크립트와 `pages/bdgen-interactions.js` 기준.  
**세부 페이지(`pages/*.html`)는 아래 §세부 페이지**에 파일별로 정리함.

---

## 전역

| 효과 | 구현 | 비고 |
|------|------|------|
| 스크롤 스무스 | `html { scroll-behavior: smooth; }` | `prefers-reduced-motion` 시 `auto` |
| 토큰 `transition` | `--transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)` | 버튼·GNB 등 공통 |
| 클릭 스파클 | `.sparkle-burst` / `@keyframes sparkle-out` | `pages/bdgen-interactions.js`에서 셀렉터에 매칭 시 파티클 DOM 추가 |
| 접근성 | `prefers-reduced-motion: reduce` | 애니/트랜지션·스파클·일부 캔버스/렌즈 비활성 |

---

## GNB(헤더) · 언어 · 전체메뉴

| 효과 | 구현 |
|------|------|
| 스크롤 시 컴팩트/배경 | `y>50` → `.gnb.scrolled` (패딩·스타일) |
| 로고 교차 페이드 | `.gnb:hover` · `.gnb-logo-default` / `.gnb-logo-hover` opacity |
| 네비 밑줄 | `a:hover::after` width 애니메이션 |
| 드롭다운/언어 | opacity·visibility transition |
| 햄버거 라인 | `menuLineWave` (호버 시 세 줄 순차) |
| 전체메뉴 열기/닫기 | `visibility` + `opacity` |
| **IntersectionObserver** | `#services`·`#news`·`#why` 가시 → `.gnb-light` (흰 배경 테마) |
| **FAB 테마** | 스크롤/리사이즈 시 `data-fab-theme="light"` 섹션 위 `elementFromPoint` → `.supreme-container.fab-light` |

---

## Hero

| 효과 | 구현 |
|------|------|
| 배경 캔버스 | WebGL/Canvas 파티클 (노드 이동·연결) — `requestAnimationFrame` |
| 히어로 **비디오 크로스페이드** | 4초 후 `hero_02` → 메인, `.hero-bg-videos.crossfade` + 인디케이터 틱 |
| 로고 인트로 | `heroLogoIntro` → 끝나면 GNB 로고로 이어짐 (`animationend`) |
| 뱃지 점 | `pulse` (scale·opacity) |
| 타이틀 등장 | `fadeInDown` / `fadeInUp` / `fadeIn` (지연) |
| **타이핑** (JS) | `hero-typing-1/2/3` — 문자 단위 `setTimeout` + `.hero-typing-cursor` = `blink` (커서 깜빡임) |
| 스크롤 유도 | `.hero-scroll` fade-in, 마우스 `heroMouseFloat` + 휠 `heroMouseScroll` (무한) |

---

## Partner (`#partner` — “검증된 기술력…”)

| 효과 | 구현 |
|------|------|
| **타이틀 타이핑** | `IntersectionObserver` → 1·2행 순차 typewriter + `partner-typing` + `blink` |
| **지표 숫자** | 진입 시 `metric-visible` + `animateNumber` (짧은 scramble 후 ease-out 카운트업, `requestAnimationFrame`) |
| 지표 호버 | `translateY(-4px)` · 수치/라벨 색 transition |
| 배경 | `partner-section-bg.png` (섹션) |

---

## Services (`#services`)

| 효과 | 구현 |
|------|------|
| 섹션 타이핑(옵션) | `services-typing-title` / `services-typing-sub` + `blink` (언어 적용 후 제거될 수 있음) |
| **Scroll reveal** | `.reveal` + `IntersectionObserver` → `.visible` (아래→위, `reveal-delay-*`) |
| **서비스 카드** | `borderFlow` (호버 그라덴 테두리) · 3D 틸트 (마우스 `perspective` rotate, `.service-card-inner`) |
| 카드별装飾 (호버) | `serviceLensSheen` · `svgDraw` (SVG path) · `servicePulseDash` · `hexFloat` · `streamUp` · `glitchPulse` / `spin` (로딩 링) 등 |
| **보안 렌즈(커서)** | JS로 `--lens-x` / `--lens-y` (마지막 카드) |
| `prefers-reduced-motion` | `service-card-lens-sheen` 애니 끔 |

**배경:** 히어로와 유사한 **Canvas 네트워크** (섹션용 스크립트, 가시성 시 `requestAnimationFrame`).

---

## About BDGen (`#about-bdgen`)

| 효과 | 구현 |
|------|------|
| **Scroll reveal** | `.reveal` / 오른쪽 비주얼 `reveal-right` |
| **Canvas 배경** | 노드·거리 기반 선 + **커서 반경(180px) 내** 노드만 강조 연결, `requestAnimationFrame` |
| **비주얼 틸트** | `#about-bdgen-tilt` — 마우스 `rotateX` / `rotateY` |

---

## GenID (`#genid`)

| 효과 | 구현 |
|------|------|
| 탭 전환 | `.genid-panel` — `display` 토글 + `tabFade` (opacity + translateY) |
| 탭/피처/유스케이스/플로우 | `translateY`·border·box-shadow **호버** transition |
| (동적) reveal | `window._revealObserver` — 탭용 패널에 `.reveal` 다시 observe |

---

## Why BDGen (`#why`)

| 효과 | 구현 |
|------|------|
| **Scroll reveal** | 섹션 헤더·카드 `reveal` + 지연 |
| **카드 순차 등장** | `#why .why-card` 초기 `opacity:0; translateY(30px)` → `.why-grid.why-cards-revealed` (IntersectionObserver) |
| 제목 **물결** | `wrapWhyTitleWave` 후 `.why-wave-char`에 `whyTitleWave` (translateY 루프) |
| 카드/아이콘 호버 | `translateY` · 그림자 · 아이콘 `transform` (CSS) |
| (일반) 호버 | `.why-cards-revealed` 시 카드 위로 `-10px` 등 |

---

## Reference (`#reference`)

| 효과 | 구현 |
|------|------|
| **Scroll reveal** | 헤더·로고 트랙·ref 카드·more 버튼 |
| **로고 무한 스크롤** | `logoScroll` 20s linear (`transform: translateX(-50%)`) — 트랙 2배 복제, **호버 시 pause** |
| **페이드 가장자리** | `::before` / `::after` 그라데이션(흰색) — 좌우 끝 |
| ref 카드 | `translateY`·그림자 **호버** |
| 로고 셀 | `object-fit: contain`·transition (배경/테두리) |

---

## News (`#news`)

| 효과 | 구현 |
|------|------|
| **Scroll reveal** | 히어로·타이틀·카드·more |
| **뉴스 히어로 타이틀 타이핑** | `news-hero-typing-1/2` + `blink` (스크립트로 순차 타이핑) |
| 카드/썸네일 | `transition`·호버 보더/그림자 (섹션 스타일) |

---

## CTA (문의) (`#cta`)

| 효과 | 구현 |
|------|------|
| **배경 Canvas** | CTA용 노드 네트워크 + 마우스 가까운 노드-커서 연결, `IntersectionObserver`로 **뷰에 들어올 때만** 루프 |
| **타이틀 타이핑** | `cta-typing-1/2` + `blink` (흰색 커서 톤) |
| `reveal` | 라벨·제목·서브·폼 split |
| 폼 | 제출/유효성 (애니 외 인터랙션) — GAS |

---

## 하단: FAB · 맨 위로

| 효과 | 구현 |
|------|------|
| **FAB** | `fab-neon-breathe` · `fab-aurora-rotate` (아이콘/글로우) · `fab-light` 시 색反転 |
| **맨 위로** | 스크롤 400px↑ `.back-top.visible` — 클릭 `scrollTo({behavior:'smooth'})` (`bdgen-interactions.js`) |

---

## 공유 패턴 요약

1. **Scroll Reveal** — `.reveal` / `.reveal-left` / `.reveal-right` + `IntersectionObserver` (threshold 0.12, rootMargin 하단 -40px), 1회 `unobserve`.
2. **타이핑** — `data-text` + `setTimeout` per char + `blink` (커서).
3. **Canvas 배경** — 히어로/서비스/어바웃/CTA 섹션별, 스크롤/가시성과 연동.
4. **3D 틸트** — 서비스 카드 inner, about 비주얼.
5. **로고 랩** — CSS `animation` + 트랙 50% 이동.

---

## 세부 페이지 (`pages/`)

공통으로 대부분 **`bdgen-interactions.js`**(스파클·다운로드·back-top·언어), **`bdgen-subpage-i18n.js`**(타이핑 끝 상태/언어 전환 시 커서 제거)를 사용한다.

### `bdgen-hero-desc.js` (서브 히어로 본문)

- `.hero-inner .hero-desc`를 글자 단위 `<span class="hero-desc-char">`로 쪼개 **`intro-hero-cascade` / `hero-desc-falling`** 류 캐스케이드와 맞춤 (`animation-delay` 스텝).
- 언어 전환 시 `bdgen:subpage-language-applied`로 재빌드.

### `about-intro.html`

- 히어로 배경: **`intro-hero-kenburns`**(느린 줌/팬 느낌), `prefers-reduced-motion` 시 끔.
- `.hero-desc`: **`intro-hero-cascade`**, 미션 섹션: **`intro-mission-cascade`**, 통계: **`stat-value-pulse`**
- `intro-typing-1/2` **타이핑** + `intro-typing-blink` 커서, `IntersectionObserver`로 진입 시 실행.
- i18n 동기화용 옵저버(스크롤/진입) 보조.

### `about-history.html`

- 히어로: **`historyFadeUp`**, SVG 타임라인 `stroke-dashoffset` 트랜지션, 아웃트로 **`outro-flow-shimmer-move`**
- `history-typing-1/2` + **`historyTypingBlink`**, **IntersectionObserver**로 시퀀스 타이핑
- 인증(`#cert`): `cert-typing-title` / `cert-typing-desc` 타이핑, **`#certLightbox` 모달** — 썸네일 클릭 시 `img` 확대, 배경/ESC/닫기, 고정 틀 + `object-fit: contain`
- Outro: **`.is-revealed`** 줄 단위 reveal, `prefers-reduced-motion` 분기

### `about-ci.html`

- CI 타이틀 등 **`ci-typing-blink` 커서** + **IntersectionObserver** 타이핑
- 색상 팔레트 복사 시 **`ci-palette-flash`**
- 기타: 옵저버(스크롤 기반) 보조

### `about-news.html`

- **뉴스 리스트 제목** 타이핑 + `news-typing-blink`
- 카드: **`news-card-reveal`**, **`IntersectionObserver`**로 스태거·노출
- `prefers-reduced-motion` 대응

### `reference.html` (서브)

- **메인 타이틀** 타이핑 + `ref-page-typing-blink`, 그리드 카드 **호버** — `translateY`, 그라데이션/오버레이 pseudo, 로고/텍스트 색·그림자 transition
- (구현에 따라) 모달/썸네일은 마크업 기준

### `business.html`

- **`biz-typing-blink`**, `IntersectionObserver`로 히어로/섹션 제목 **타이핑**
- `data-typing-token`으로 언어·재진입 시 경합 방지

### `careers.html`

- **타이프라이터** + `careers-caret-blink`, 지원 **프로세스** 스텝/탭 — **`careers-req-panel-out`** 등 전환
- **복지 카드**: 다수 캐릭터 모션 — `welfare-cal-shake`, `welfare-steam-rise`, `welfare-cake-glow`, `welfare-paddle-hit`, `welfare-gift-lid`, `welfare-thumb-nod`, `welfare-tools-cross`, `welfare-wiggle`, `welfare-cup-fill` 등, 진입 시 **`careers-welfare-card-pop`**
- **인재상 배너**: `careers-talent-bg-flow`, `careers-talent-float`, `careers-talent-bulb-pulse`, 트레이트 `careers-talent-trait-in`, 아이콘 `careers-talent-icon-hover-shake`
- **채용 절차**: `careers-process-pulse` 등, `prefers-reduced-motion` 광범위 미적용

### `solution-genid.html`

- **`gid-typing-blink`**, 섹션 제목/히어로 **타이핑** + `IntersectionObserver`
- 일러·다이어그램: **`gid-float`**, `gid-genid01-flow-to-id`, `gid-genid01-mobile-id-flow-light`, **피처 아이콘** `gid-feat-icon-sweep`
- 앱 시나리오 일러(정부·금융 등): `gid-app-gov-ring`, `gid-app-finance-scan`, `gid-app-pen-sign`, `gid-app-handshake`, `gid-app-heart-pulse` 등
- `prefers-reduced-motion` 시 플로트/스트림 끔

### `solution-passkey.html`

- **`pk-typing-blink`**, `pk-hero-typing`·섹션 제목 **타이핑** (완료 후 `data-after-typing-html`로 마크업 치환), **IntersectionObserver** 다수(섹션·특징)
- `pk-feat-icon-sweep`, `pk-feat-float`, `pk-banner-cta-starburst`, **보안플로** `pk-sf-gid-pf-float-node` / `pk-sf-gid-pf-flow-pulse`, 혜택 `pk-ben-receipt-float`
- `pk-flow-embed` 계열(별도) 스트로크 **`pkIconPartFlow`**

### `pk-flow-embed.html`

- 임베드용: **`pkIconPartFlow`**(stroke-dash 이동), `prefers-reduced-motion: reduce` 시 애니 제거

---

## 서브페이지 공통 키프레임 (빠른 찾기)

`intro-hero-kenburns` · `intro-hero-cascade` · `intro-mission-cascade` · `intro-typing-blink` · `stat-value-pulse`  
`historyFadeUp` · `historyTypingBlink` · `outro-flow-shimmer-move`  
`ci-typing-blink` · `ci-palette-flash`  
`news-typing-blink` · `news-card-reveal`  
`ref-page-typing-blink`  
`biz-typing-blink`  
`careers-caret-blink` · `careers-welfare-card-pop` · `welfare-*` · `careers-talent-*` · `careers-process-pulse` · `careers-req-panel-out`  
`gid-typing-blink` · `gid-float` · `gid-feat-icon-sweep` · `gid-app-*`  
`pk-typing-blink` · `pk-feat-icon-sweep` · `pk-feat-float` · `pk-sf-gid-pf-*` · `pk-ben-receipt-float`  
`pkIconPartFlow` (embed)

---

## 주요 키프레임 이름 (빠른 찾기)

`sparkle-out` · `menuLineWave` · `heroLogoIntro` · `pulse` · `fadeIn` / `fadeInUp` / `fadeInDown` · `heroMouseFloat` / `heroMouseScroll` · `blink` · `orbFloat` · `ringRotate` · `borderFlow` · `serviceLensSheen` · `svgDraw` · `servicePulseDash` · `hexFloat` · `streamUp` · `glitchPulse` · `spin` · `tabFade` · `whyTitleWave` · `logoScroll` · `fab-neon-breathe` · `fab-aurora-rotate`

---

*재작성 시: `bdgen_landing.html`의 `<style>`·하단 `<script>`, `pages/bdgen-interactions.js`, 그리고 위에 언급한 각 `pages/*.html` 인라인 스타일/스크립트를 기준으로 동기화하면 됩니다.*
