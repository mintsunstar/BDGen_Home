# BDGen 랜딩 — 운영 전 콘텐츠 확정 체크리스트

실제 서비스 전 대표·기획·디자인·개발이 함께 확인할 항목입니다.

---

## 1. 필수 확정 항목

| # | 영역 | 항목 | 담당 | 비고 |
|---|------|------|------|------|
| 1 | Hero | 최종 카피 확정 | 기획/대표 | 배지·타이틀·설명 B2B 톤 유지 |
| 2 | Trust | 숫자(30+, 6개, 5년+) | 기획 | 실제 실적로 교체 |
| 3 | Trust | 이노비즈·벤처기업 | 기획 | 인증서·근거자료 확보 후 노출 |
| 4 | Footer | 개인정보처리방침 URL | 개발 | 정책 페이지 링크 |
| 5 | Footer | 이용약관 URL | 개발 | 정책 페이지 링크 |
| 6 | Reference | 고객사 로고 | 기획/디자인 | 사용 승인 후 이미지 교체 |
| 7 | Reference | "S 통신사" | 기획 | 고객사명 공개 여부 확정 |
| 8 | Partners | "고객사명" placeholder | 기획 | 실제 파트너명 또는 제거 |

---

## 2. 권장 확정 항목

| # | 영역 | 항목 | 담당 | 비고 |
|---|------|------|------|------|
| 9 | News | 상세/목록 페이지 URL | 개발 | CMS 연동 시 |
| 10 | CTA | 문의 폼 페이지 | 개발 | mailto 대체 시 |
| 11 | Footer | © 연도 | 운영 | 매년 갱신 |
| 12 | CTA | 회사소개서 PDF | 기획 | 경로 유효성 확인 |

---

## 3. data-placeholder / 마킹 정리

| 마킹 | 의미 | 예시 위치 |
|------|------|-----------|
| `data-placeholder="href"` | 링크 URL 미정 | 뉴스 상세, 레퍼런스 전체, 정책 페이지 |
| `data-placeholder="true"` | 콘텐츠 교체 필요 | 파트너 고객사명, 로고 |
| `data-placeholder="thumb"` | 썸네일 이미지 | 뉴스 카드 |
| `data-placeholder="client-anonymized"` | 익명 → 공개 변경 가능 | S 통신사 |
| `data-confirm="cert"` | 인증 근거 확인 필요 | 이노비즈, 벤처기업 |
| `title="운영 시 실제 수치로 확정"` | Trust 숫자 교체 | 30+, 6개, 5년+ |

---

## 4. 링크 정책 (현재 적용)

| 목적 | 처리 방식 |
|------|-----------|
| 같은 페이지 섹션 | `href="#services"`, `#genid`, `#why`, `#reference`, `#news`, `#cta` |
| 실제 외부/내부 페이지 | URL 연결 후 `data-placeholder` 제거 |
| 문의·연락 | `mailto:`, `tel:` 직접 사용 |
| 미정 | `data-placeholder="href"` + `title="TODO: ..."` |
| 버튼 | `href="#"` 금지 — button 또는 실제 href 사용 |

---

## 5. CMS·API 연동 시 데이터 구조

| data-content-source | 구조 |
|---------------------|------|
| `trust` | `{ type, value, label?, count?, suffix? }` |
| `services` | `{ index, icon, title, desc, tags[] }` |
| `partners` | `{ name, logo?, url? }` |
| `references` | `{ tag, client, project, period, url? }` |
| `news` | `{ category, date, title, excerpt, url, thumb? }` |

---

## 6. 파일

- **HTML**: `bdgen_landing.html`
- **변경 요약**: `bdgen_landing_CONTENT_STRUCTURE_SUMMARY.md`
- **체크리스트**: `bdgen_landing_CONTENT_CHECKLIST.md` (본 문서)
