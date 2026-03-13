# BDGen 랜딩 — 목업 → 실서비스 콘텐츠 구조 정리 요약

실제 회사 홈페이지 초안 수준으로 콘텐츠 구조를 정리한 변경 사항입니다.

---

## 1. 변경 개요

| 영역 | 변경 전 | 변경 후 |
|------|---------|---------|
| Hero | 추상적 Web3 문구 | 회사(비디젠)·기술(DID·블록체인)·가치(산업군 구체화) 명시 |
| Trust | 임의 숫자/텍스트 | 수치·인증에 운영 시 확정 필요 표시 |
| Services | 서비스/솔루션 혼재 | 제공 방식/역량 기준으로 구조화 |
| Reference | 더미 고객사/로고 | placeholder 마킹, 로고 교체·승인 TODO |
| News | 더미 카드 | category/date/title/summary/link 필드 명시, 상세 링크 TODO |
| CTA | 일반 버튼 | 문의·협업·소개서 요청 등 실제 전환 목적 분리 |
| Footer | 간단 정보 | 회사·주소·메일·전화·사업자정보·정책 링크 구조 |
| 링크 | href="#" 다수 | anchor/실제 URL/mailto/tel/TODO로 목적 명확화 |

---

## 2. 더미 → 운영 구조로 변경된 항목

### Hero
- Badge: "블록체인·DID 전문기업"
- Title: "디지털 신원 기술로 산업의 신뢰를 설계합니다"
- Sub: ㈜비디젠, DID·Passkey·블록체인, 금융·헬스케어·공공 등 산업군 언급
- CTA 3종: 주요 서비스 보기, 레퍼런스, 프로젝트 문의

### Trust
- 숫자: `title="운영 시 실제 수치로 확정"` 부여
- 인증: `data-confirm="cert"` — 근거 자료 확보 후 노출

### Services
- 섹션 제목: "제공 서비스"
- 설명: 블록체인·DID 기반 개발·구축·운영 담당 구조

### Reference
- 고객사명 placeholder → `data-placeholder="true"`, 운영 시 교체
- 로고 → `title="로고 사용 승인 확인 후 이미지 교체"`
- "S 통신사" → `data-placeholder="client-anonymized"`

### News
- 섹션: "NEWS & INSIGHTS", "수주·파트너십·사업 확장 등 소식"
- 카드: category, date, title, summary, link 필드 구조
- 상세 링크 → `data-placeholder="href"`, `title="TODO: 뉴스 상세 페이지 URL"`

### CTA
- 라벨: CONTACT
- 제목: "프로젝트·기술 협업 문의하기"
- 설명: 도입 상담·PoC·개발 협업 문의
- 버튼: 프로젝트 문의(mailto), 회사소개서 다운로드
- 연락처: tel, mailto 직접 연결

### Footer
- 회사명·대표·사업자번호·주소·전화·이메일 구조
- 연락처: tel, mailto 링크
- 정책: 개인정보처리방침, 이용약관 (URL TODO)

---

## 3. TODO / placeholder 항목

| 마킹 | 용도 |
|------|------|
| `data-placeholder="href"` | 링크 URL 확정 필요 |
| `data-placeholder="true"` | 텍스트·이미지 교체 필요 |
| `data-placeholder="thumb"` | 썸네일 이미지 교체 필요 |
| `data-placeholder="client-anonymized"` | 익명 고객사 → 공개명 변경 |
| `data-confirm="cert"` | 인증 항목 근거 자료 확인 |
| `title="운영 시 실제 수치로 확정"` | Trust 숫자 교체 |

---

## 4. 관련 파일

- **HTML**: `bdgen_landing.html`
- **체크리스트**: `bdgen_landing_CONTENT_CHECKLIST.md`
- **컴포넌트 설계**: `bdgen_landing_COMPONENT_DESIGN.md`
