# BDGen 랜딩 페이지 반응형 적용 요약

실서비스형 베이스 코드를 기반으로 Desktop / Tablet / Mobile 전체 구간에서 동작하는 반응형을 적용했습니다.

---

## 1. 브레이크포인트 및 레이아웃 전략

| 구간 | 해상도 | 레이아웃 전략 |
|------|--------|---------------|
| **Desktop** | 1280px 이상 | 3열 카드 그리드, 2열 about, 4열 footer |
| **Laptop / Tablet landscape** | 1024px ~ 1279px | 2열 카드, 2열 footer, orb/ring 축소 |
| **Tablet** | 768px ~ 1023px | 햄버거 메뉴, 2열 카드, hero/CTA 패딩 조정 |
| **Mobile** | 767px 이하 | 1열 카드, trust 2열 그리드, 세로 CTA, 1~2열 footer |
| **Small mobile** | 480px 이하 | about 비주얼 숨김, trust 1열, 더 촘촘한 타이포 |

---

## 2. 반응형 핵심 변경사항

### NAV
- **1023px 이하**: 햄버거 토글 메뉴 전환 (기존 768px → 1023px로 변경)
- 패딩·높이 단계별 축소 (`padding: 12px 0` → `10px` → `8px`)
- 햄버거 버튼 터치 영역 확보 (min 44×44px), `-webkit-tap-highlight-color: transparent`
- 모바일 메뉴 링크에도 min-height 44px 적용
- `gnb-inner` 패딩을 `var(--container-padding-x)`로 통일

### HERO
- `min-height`를 viewport/최대값으로 제한 (`min(100vh, 700px)` 등)
- 타이틀 `clamp(1.5rem, 7vw, 2.2rem)` 등으로 반응형
- CTA: 767px 이하에서 세로 배치, 버튼 전체 너비
- 배지·설명 폰트·여백 단계별 축소
- `hero-content` padding을 `var(--container-padding-x)`로 통일

### TRUST
- 767px 이하: `grid-template-columns: repeat(2, 1fr)` → 480px 이하에서 1열
- 구분선: 2열 시 `border-right`/`border-bottom`, 1열 시 `border-bottom`만
- 숫자/라벨 크기 clamp로 조정
- 아이템 패딩 20px → 16px → 12px로 축소

### SERVICES / REFERENCE / GENID / NEWS
- **Laptop**: 2열 그리드, gap 축소
- **Mobile**: 1열, 카드 패딩/폰트 축소
- GenID 탭: 모바일에서 세로 배치, full-width
- GenID flow: 세로 정렬, 화살표 90도 회전
- 로고 슬라이더: 양쪽 그라데이션 폭 120px → 60px → 40px

### HIGHLIGHT (about)
- **Tablet 이하**: 1열, 비주얼 먼저 배치 (`order: -1`)
- Orb·링 크기: vw 기반 `min(220px, 60vw)` 등으로 축소
- **480px 이하**: 비주얼(orb, ring) 완전 숨김

### CTA
- 버튼: 모바일에서 세로 정렬, full-width
- 연락처: 세로 배치
- `cta-bg-orb`: 600px → 400px → 280px로 축소

### FOOTER
- 4열 → 2열(1279px 이하) → 1열(767px 이하)
- `footer-bottom`: 모바일에서 세로 정렬, 중앙 정렬

### 공통
- `html`, `body`: `overflow-x: hidden`, `min-width: 320px`
- `html` font-size: `clamp(14px, 2.5vw, 16px)`
- `.btn`: `min-height: 44px`, `min-width: 44px` (터치 영역)
- section padding: `clamp(2.5rem, 6vw, 5rem)` 등
- 360px 이하에서 container 패딩·버튼 폰트 추가 보정

---

## 3. 모바일에서 조정/완화한 인터랙션

| 항목 | 처리 내용 |
|------|-----------|
| **Custom cursor** | 해당 없음 (기존 코드에 custom cursor 없음) |
| **backdrop-filter** | 터치 기기(`hover: none` + `pointer: coarse`)에서 blur 20px → 8px로 축소 |
| **Hover 효과** | 그대로 유지 (터치 시 `:active`로 자연스럽게 동작) |
| **Orb/ring 애니메이션** | 480px 이하에서 비주얼 숨김으로 애니메이션 비활성화 |
| **Hero canvas** | visibility API로 탭 전환 시 애니메이션 일시정지 (기존 유지) |
| **Transform/hover lift** | 유지 (성능 부담 낮음) |

---

## 4. overflow-x 및 최소 폭

- `html`, `body`: `overflow-x: hidden`, `min-width: 320px`
- `.container`: `padding` clamp로 좁은 화면에서도 가드
- 360px 이하: `container` `padding: 0 1rem`, 버튼/탭 패딩 추가 축소
- `clamp()`, `min()`, `vw`를 활용해 320px에서도 레이아웃 유지

---

## 5. 터치 영역

- `.btn`: `min-height: 44px`, `min-width: 44px`
- `.gnb-hamburger`: `min-width: 44px`, `min-height: 44px`, `padding: 10px`
- 모바일 메뉴 링크: `min-height: 44px`, `padding: 12px 20px`
- 모바일 닫기 버튼: `min-width: 44px`, `min-height: 44px`
- `.back-top`: 48×48px (모바일)

---

## 6. 파일

- **HTML**: `bdgen_landing.html` (인라인 CSS 갱신)
- **요약**: `bdgen_landing_RESPONSIVE_SUMMARY.md`

추가로 viewport `meta` 확인(`width=device-width`, `initial-scale=1`) 및 디바이스별 QA를 진행하면 실서비스 수준의 반응형 점검이 가능합니다.
