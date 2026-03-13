# Trust 섹션 숫자/텍스트 인터랙션 요약

B2B 테크 기업 사이트에 맞는 premium / minimal / futuristic 모션을 적용했습니다.

---

## 1. Trust 섹션 추가 CSS

| 선택자 | 용도 |
|--------|------|
| `.trust-item` | `opacity: 0`, `transform: translateY(10px)`, `transition` — 진입 전 초기 상태 |
| `.trust-item.trust-visible` | `opacity: 1`, `transform: translateY(0)` — 노출 애니메이션 |
| `.trust-num` | `min-width: 3.5ch`, `display: inline-block` — 숫자 변경 시 레이아웃 흔들림 방지 |
| `@media (prefers-reduced-motion: reduce) .trust-item` | `opacity: 1`, `transform: none` — 모션 최소화 환경에서 즉시 표시 |

---

## 2. 숫자 인터랙션 JS

### 흐름
1. **IntersectionObserver**로 `#trust` 뷰포트 진입 감지
2. 1회 실행 후 `unobserve`
3. 아이템별 **stagger** (100ms 간격)

### 숫자형 처리
- **Phase 1 (0~200ms)**: 스크램블 — 0~target 범위의 랜덤 숫자 표시
- **Phase 2 (200ms~)**: easing — cubic ease-out으로 target까지 증가
- **최종값**: `el.textContent = target + suffix` 로 정확히 설정

### API
- `data-count`: 목표 숫자
- `data-suffix`: 접미사 (+, 개, 년+ 등)
- `data-duration`: 총 애니메이션 시간 (ms, 기본 1600)

### 성능
- `requestAnimationFrame` 사용
- 매 프레임 `textContent` 한 번만 업데이트

### 접근성
- `prefers-reduced-motion: reduce` 인 경우 스크램블 생략, 즉시 최종값 표시

---

## 3. 숫자형 vs 텍스트형 처리

| 구분 | 숫자형 | 텍스트형 |
|------|--------|----------|
| 식별 | `data-trust-type="number"` | `data-trust-type="text"` |
| 애니메이션 | 스크램블 → count-up | `opacity` + `translateY` reveal |
| 데이터 | `data-count`, `data-suffix` | 없음 (텍스트 그대로) |
| stagger | 100ms × index | 100ms × index |

---

## 4. 재사용

동일 패턴을 다른 통계 섹션에 쓰려면:

1. `.trust-num[data-trust-type="number"]` 구조 사용
2. `data-count`, `data-suffix`, `data-duration` 지정
3. 해당 섹션에 IntersectionObserver 등록 후 `animateNumber(el)` 호출
4. 숫자가 아닌 항목은 `data-trust-type="text"` 로 표시

---

## 5. 모션 톤

- **Premium** — 과하지 않은 스크램블, 짧은 구간
- **Minimal** — 텍스트는 단순 reveal
- **Futuristic** — 단계적 노출, 일정 stagger
- **B2B tech** — glitch·bounce·게임 UI 스타일 없음
