# TECHSPEC: 데이터 정리 자동화 웹 애플리케이션

## 0. 문서 목적 및 범위

이 문서는 `PRD_데이터정리자동화웹애플리케이션ver1.md`의 기능 요구사항을, 실제로 스캐폴딩된 기술 스택인 **React 19 + TypeScript + Vite + Zustand + Tailwind CSS + pnpm** 기준으로 구현하기 위한 기술 설계를 다룬다.

PRD는 Streamlit + Python + SQLite 기반의 로컬 실행형 앱을 전제로 작성되었으나, 실제 프로젝트는 브라우저에서 동작하는 React SPA로 스캐폴딩되어 있다. 이 문서는 PRD의 요구사항을 유지하되, 기술적 실현 방식을 **React SPA + Supabase(BaaS)** 아키텍처에 맞게 재해석한다.

### 구현 완료 (범위 제외)

- 랜딩 페이지 (`src/pages/HomePage.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`): Hero, Pain Point, Features, How It Works, Stats, CTA 섹션. 전부 하드코딩된 소개용 정적 콘텐츠이며 실데이터와 연결되어 있지 않다.
- 프로젝트 스캐폴드: Vite + React + TS 빌드 파이프라인, Tailwind 설정, `@/*` alias, ESLint/Prettier/Vitest 구성.
- `src/store/useCounterStore.ts`: Zustand 사용법을 보여주는 예시 코드로, 실제 기능이 아니므로 실제 기능 스토어 추가 시 삭제 대상.

### 미구현 (이 문서의 설계 대상)

PRD 6장 기준 다음 5개 영역이 전부 미구현 상태이며, 이 문서에서 기술 설계를 다룬다.

| PRD 절 | 기능 영역 | 현재 상태 |
|---|---|---|
| 6.1 | 데이터 입력 (CSV 업로드, 웹 폼, 컬럼 매핑) | 미구현 |
| 6.2 | 데이터 클렌징 (중복 제거, 날짜 통일, 이상치 처리) | 미구현 |
| 6.3 | 데이터 집계 (일/주/월별) | 미구현 |
| 6.4 | 대시보드 및 시각화 | 미구현 (랜딩 페이지의 목업 차트는 정적 이미지 수준이며 실데이터 연동 없음) |
| 6.5 | 시스템 관리 및 설정 | 미구현 |

---

## 1. 아키텍처: Supabase 기반 BaaS

브라우저 SPA라는 제약 때문에, PRD가 전제한 "로컬 파일시스템 저장 + SQLite + 에러 로그 파일 생성" 방식은 그대로 이식할 수 없다. 별도의 커스텀 백엔드 서버(Express/FastAPI 등)를 직접 구축하는 대신, **Supabase**를 BaaS로 채택하여 Postgres DB, 파일 저장소, 서버리스 함수를 활용한다. 이를 통해 별도 서버 런타임/배포 인프라 없이도 PRD가 요구하는 "서버 측 자동 처리"에 준하는 구조를 얻는다.

### 구성 요소

| 요구사항 | Supabase 구성 |
|---|---|
| 데이터 저장 | Supabase Postgres (`raw_records`, `daily_aggregates`, `weekly_aggregates`, `monthly_aggregates`, `app_settings`, `upload_history` 테이블) |
| 원본 파일 보존 | Supabase Storage 버킷 `raw-uploads` (PRD의 "원본 CSV 별도 저장" 요구사항 충족) |
| 클라이언트 접근 | `@supabase/supabase-js` (신규 의존성) |
| 인증 | **사용하지 않음** — 개인 단독 사용 전제. `anon` key + 고정 `owner_id` 기준 RLS(Row Level Security) 정책만 적용 |
| 클렌징/집계 처리 위치 | **클라이언트(브라우저)** — CSV 파싱·클렌징·집계를 브라우저에서 계산한 뒤, 결과만 Supabase 테이블에 저장 (Edge Function 미사용) |
| 백업 | Supabase 프로젝트 자체 백업(플랜에 따름) 또는 수동 `pg_dump`. PRD의 "일일 자동 백업(7일 보관)"은 무료 플랜 기준 지원되지 않으므로 Out of Scope로 유지 |

### 보안 관련 주의 사항 (승인된 리스크)

`anon` key는 클라이언트 번들에 그대로 노출되는 공개 키이며, 인증을 두지 않으므로 RLS의 `owner_id` 조건은 실질적인 접근 통제가 되지 못한다 — anon key를 아는 사람은 누구나 동일한 `owner_id`로 데이터를 읽고 쓸 수 있다. PRD 7장이 "개인 재정 정보 보호"를 비기능 요구사항으로 명시하고 있으므로, 이 구조는 **민감한 재정 데이터를 다루기 전에는 반드시 Supabase Auth 도입을 재검토**해야 한다. 현재는 개인 단독 사용·MVP 단계라는 전제 하에 승인된 리스크로 기록한다.

### 설계 원칙: 데이터 계층 추상화

향후 Supabase에서 다른 백엔드로 교체할 가능성에 대비해, 모든 기능 모듈은 `src/api/` 하위의 인터페이스를 통해서만 데이터에 접근한다.

```ts
// src/api/types.ts
export interface DataRepository {
  uploadCsv(file: File): Promise<UploadResult>;
  createRecord(input: RawRecordInput): Promise<RawRecord>;
  listRecords(filter: DateRangeFilter): Promise<RawRecord[]>;
  getDailyAggregate(date: string): Promise<DailyAggregate>;
  getWeeklyAggregate(weekStart: string): Promise<WeeklyAggregate>;
  getMonthlyAggregate(month: string): Promise<MonthlyAggregate>;
  getSettings(): Promise<AppSettings>;
  updateSettings(settings: AppSettings): Promise<void>;
  exportCsv(filter: DateRangeFilter): Promise<Blob>;
}
```

- `src/api/supabaseRepository.ts`가 이 인터페이스를 `@supabase/supabase-js` 기반으로 구현한다.
- 상위 컴포넌트/훅/스토어는 `DataRepository`만 알고 Supabase 클라이언트를 직접 알지 못한다 (의존성 역전).

---

## 2. 디렉토리 구조

CLAUDE.md에 정의된 구조를 기준으로 하며, PRD의 Streamlit 폴더 구조(`processors/`, `services/`, `ui/pages/`)는 아래와 같이 대응한다.

```
src/
├── api/
│   ├── types.ts                  # DataRepository 인터페이스, 공용 DTO
│   ├── supabaseClient.ts         # createClient() 초기화 (VITE_SUPABASE_URL/ANON_KEY)
│   ├── supabaseRepository.ts     # DataRepository 구현체
│   └── repository.ts             # 활성 구현체를 export하는 진입점
│
├── processing/                   # PRD의 processors/ 대응 (순수 함수 집합, 브라우저에서 실행)
│   ├── cleaning/
│   │   ├── deduplicate.ts        # 6.2 중복 제거
│   │   ├── normalizeDate.ts      # 6.2 날짜 형식 통일
│   │   └── flagOutliers.ts       # 6.2 비정상치 플래그
│   ├── aggregation/
│   │   ├── dailyAggregate.ts     # 6.3 일별 집계
│   │   ├── weeklyAggregate.ts    # 6.3 주별 집계 + 전주 대비 증감
│   │   └── monthlyAggregate.ts   # 6.3 월별 집계
│   └── correlation/
│       └── pearson.ts            # 상관계수 계산
│
├── pages/
│   ├── HomePage.tsx              # 구현 완료 (랜딩 페이지)
│   ├── UploadPage.tsx            # 6.1 CSV 업로드 + 웹 폼
│   ├── DailyAnalysisPage.tsx     # 6.4 일별 분석 탭
│   ├── WeeklyAnalysisPage.tsx    # 6.4 주별 분석 탭
│   ├── MonthlyAnalysisPage.tsx   # 6.4 월별 분석 탭
│   └── SettingsPage.tsx          # 6.5 관리자 설정
│
├── components/
│   ├── layout/                   # 구현 완료 (Header, Footer) + 공용 Nav 추가 필요
│   ├── upload/
│   │   ├── CsvDropzone.tsx
│   │   └── ManualEntryForm.tsx
│   ├── charts/
│   │   ├── TrendLineChart.tsx
│   │   ├── CorrelationHeatmap.tsx
│   │   └── ScatterPlot.tsx
│   └── dashboard/
│       ├── SummaryCard.tsx
│       └── ValidationBanner.tsx
│
├── hooks/
│   ├── useCsvUpload.ts
│   ├── useDailyAggregate.ts
│   ├── useWeeklyAggregate.ts
│   ├── useMonthlyAggregate.ts
│   └── useSettings.ts
│
├── store/
│   ├── useDataStore.ts           # 업로드/조회 상태
│   ├── useSettingsStore.ts       # 컬럼 매핑, 임계값, 초반 구간 설정
│   └── useCounterStore.ts        # 삭제 대상 (실제 기능 스토어 추가 시 제거)
│
├── types/
│   ├── record.ts                 # RawRecord, RawRecordInput
│   ├── aggregate.ts               # DailyAggregate, WeeklyAggregate, MonthlyAggregate
│   └── settings.ts                # ColumnMapping, Thresholds, AppSettings
│
└── utils/
    ├── csvParser.ts               # papaparse 래핑
    └── dateFormat.ts               # 날짜 파싱/포맷 유틸

supabase/
├── migrations/                    # SQL 스키마 마이그레이션 (Supabase CLI)
└── config.toml                    # 로컬 개발용 Supabase CLI 설정
```

라우팅은 현재 미도입 상태(`react-router` 없음)이며, 페이지가 다수 필요하므로 `react-router-dom` 추가가 필요하다.

---

## 3. 기능별 기술 설계

### 3.1 데이터 입력 (PRD 6.1)

- **CSV 업로드**: `components/upload/CsvDropzone.tsx` + `utils/csvParser.ts`(papaparse)로 브라우저에서 파싱. 파싱 즉시 `types/settings.ts`의 `ColumnMapping`으로 헤더를 시스템 컬럼에 매핑하고 필수 컬럼/타입을 검증, 실패한 행은 화면에 목록으로 표시한다. 검증을 통과한 원본 파일은 Supabase Storage `raw-uploads` 버킷에 그대로 업로드하고, 파싱·클렌징된 레코드만 `raw_records` 테이블에 insert한다.
- **웹 폼 수동 입력**: `components/upload/ManualEntryForm.tsx`. 제출 시 CSV 업로드와 동일한 검증·클렌징 파이프라인(`processing/cleaning/`)을 거쳐 `raw_records`에 저장, 입력 경로를 이원화하지 않는다.
- **컬럼 매핑 설정**: `AppSettings` 객체로 관리하며 `app_settings` 테이블에 1 row로 저장(`DataRepository.updateSettings()`). `SettingsPage.tsx`에서 편집 UI 제공.
- **파일 크기 제한**: 50MB는 브라우저 메모리 파싱 기준으로 처리 가능한 범위이므로 그대로 채택, 클라이언트에서 파일 크기 검사 후 초과 시 업로드를 차단한다.

### 3.2 데이터 클렌징 (PRD 6.2)

모두 `processing/cleaning/`에 순수 함수로 구현하여 단위 테스트 용이성을 확보하며, 업로드 시점에 브라우저에서 실행된다.

- `deduplicate(records)`: 날짜+데이터1+데이터2 조합 키로 그룹핑 후 최신 레코드만 유지
- `normalizeDate(raw)`: 다양한 입력 포맷 → `YYYY-MM-DD` ISO 문자열로 통일, 파싱 실패 시 `DateParseError` throw
- `flagOutliers(records, thresholds)`: `AppSettings.thresholds`의 min/max 범위와 초반 구간(기본 오전 6시) 설정을 기준으로 각 레코드에 `isValid: boolean`, `flagReason?: string` 부여. PRD가 "필터링 vs 플래그" 중 확정하지 못했으므로, 기본은 **플래그 방식**(투명성 우선)을 채택하고 집계 시 정상/비정상 개수를 별도 카운트한다. 필터링이 필요하면 `AppSettings.outlierPolicy: 'flag' | 'exclude'` 토글로 지원.
- 원본 불변성: 클렌징 함수는 입력 배열을 변경하지 않고 새 배열을 반환(불변 업데이트). 원본 CSV 파일 자체는 Supabase Storage에 별도 보관하여 "원본 보존" 비기능 요구사항을 만족한다.
- 대용량 CSV(수만 행 이상) 처리 시 메인 스레드 블로킹을 막기 위해 Web Worker 사용을 권장하되, 1단계 구현에서는 메인 스레드 처리로 시작하고 실측 후 필요 시 Worker로 이전한다.

### 3.3 데이터 집계 (PRD 6.3)

`processing/aggregation/`에 순수 함수로 구현. 브라우저가 `raw_records`를 조회한 뒤 클라이언트에서 집계를 계산하고, 계산 결과를 각각 `daily_aggregates`/`weekly_aggregates`/`monthly_aggregates` 테이블에 upsert하여 다음 조회 시 재계산 없이 캐시된 값을 바로 읽도록 한다.

- `dailyAggregate(records, date)`: 데이터1/2/3 각각의 평균·최소·최대·합계, 정상/비정상 데이터 개수
- `weeklyAggregate(records, weekStart)`: 최근 7일 추이, 요일별 패턴, 전주 대비 증감율, `correlation/pearson.ts`를 이용한 데이터1-2/1-3/2-3 상관계수
- `monthlyAggregate(records, month)`: 월간 누적 통계, 월 대비 증감율, 일별 추이, 상관관계(주별과 동일 로직 재사용)
- 대용량 데이터 대응: 클라이언트 집계 방식은 브라우저 메모리·연산 한계가 있으므로, 월 1천만 행 규모의 처리가 실제로 필요해지면 Postgres 집계 뷰 또는 Supabase Edge Function으로 이전하는 것을 재검토한다. MVP 단계(개인 단독 사용)에서는 클라이언트 집계로 충분하다고 가정한다.

### 3.4 대시보드 및 시각화 (PRD 6.4)

- 차트 라이브러리 미도입 상태 → `recharts` 또는 `visx` 추가 필요. 기존 랜딩 페이지의 SVG 목업(`DashboardMockup` in `HomePage.tsx`)은 정적 데코레이션이므로 재사용하지 않고 실데이터 차트로 신규 구현한다.
- `pages/DailyAnalysisPage.tsx`: 테이블(정상 여부 컬럼 포함) + 막대그래프, `ValidationBanner`로 비정상치 경고 표시
- `pages/WeeklyAnalysisPage.tsx`: `TrendLineChart` + 전주 대비 증감 지표 + `CorrelationHeatmap`
- `pages/MonthlyAnalysisPage.tsx`: 월별 누적 라인 그래프(최근 6개월) + 막대 비교 + `ScatterPlot`
- 홈 대시보드: 최근 7일 요약 카드(`SummaryCard`) + 최근 30일 추이 차트 + 날짜 범위 필터. 기존 `HomePage.tsx`(랜딩)와는 별도 라우트(`/dashboard`)로 분리하여 마케팅 페이지와 실제 앱 화면을 구분한다.
- 다운로드: `DataRepository.exportCsv(filter)`가 반환한 Blob을 `<a download>`로 저장. Excel(xlsx) 내보내기는 `xlsx` 라이브러리가 필요하므로, 1단계에서는 CSV만 구현하고 Excel은 2단계로 미룬다.

### 3.5 시스템 관리 및 설정 (PRD 6.5)

- `pages/SettingsPage.tsx`: 컬럼 매핑 편집기, 임계값(min/max) 설정 폼, 초반 구간 시각 설정(기본 06:00), 비정상치 처리 정책(`flag`/`exclude`) 토글
- 데이터베이스 유지보수(백업/복원/기간별 삭제): Supabase 대시보드 또는 `pg_dump` 스크립트로 수동 수행. PRD의 "일일 자동 백업(7일 보관)"은 서버리스 스케줄러가 없는 현재 구조에서는 Out of Scope로 유지한다.
- 업로드 이력/로그: `upload_history` 테이블에 `{ fileName, uploadedAt, rowCount, errorCount }` 기록, `SettingsPage.tsx` 내 로그 탭에서 조회. 인증이 없으므로 별도 관리자 화면 분리는 두지 않는다(멀티유저/권한 관리는 PRD Out of Scope 유지).

---

## 4. 상태 관리 (Zustand)

- `useDataStore`: 현재 조회 중인 레코드/집계 결과, 로딩/에러 상태. `DataRepository`를 호출하는 액션만 포함하고 Supabase 호출 세부사항은 알지 못한다.
- `useSettingsStore`: `AppSettings`(컬럼 매핑, 임계값, 초반 구간, 비정상치 정책)를 보관, 변경 시 `DataRepository.updateSettings()` 호출 후 로컬 상태 갱신.
- 서버 상태(집계 결과 등)가 많아지면 순수 Zustand보다 캐싱/재검증이 필요해질 수 있으므로, 데이터가 늘어나는 시점에 TanStack Query 도입 여부를 별도로 재검토한다(현재는 과설계 방지를 위해 미도입).

---

## 5. 비기능 요구사항 재해석

| PRD 요구사항 | Supabase 기반 재해석 |
|---|---|
| 대시보드 로딩 <3초 | 집계 결과를 Supabase에 캐시(3.3절)해 두어 매 조회마다 재계산하지 않도록 하고, 코드 스플리팅(`React.lazy` per page)으로 초기 번들 최소화 |
| 시스템 가용성 99% | Supabase 관리형 인프라의 가용성에 의존. 무료 플랜은 일정 기간 미접속 시 프로젝트가 일시 정지될 수 있어 개인 사용 맥락에서는 실질적 리스크가 낮으나 완전한 보장은 아님 |
| 월 1천만 행 처리 | 클라이언트 집계 방식은 이 규모에 적합하지 않음. 실제로 이 정도 규모가 필요해지면 Postgres 집계 뷰/Edge Function 도입 재검토 필요 (3.3절) |
| 원본 데이터 불변/보존 | 클렌징 함수 순수성 + 원본 파일 Supabase Storage 보관으로 만족 |
| 로그 자동 로테이션(30일) | 자동 스케줄러가 없으므로 수동 정리 UI(`SettingsPage`)로 대체, Out of Scope 성격 유지 |
| 일일 자동 백업 | Out of Scope 유지 (1장 참고) |
| 개인 재정 정보 보호 | **미충족** — 인증 미적용으로 anon key 소지자는 누구나 접근 가능 (1장 "보안 관련 주의 사항" 참고). 재정 데이터 확장 전 Supabase Auth 도입 필요 |

---

## 6. 이관되는 오픈 이슈 (PRD 14장 승계)

다음 항목은 PRD에서도 미확정이었고, 이 TECHSPEC에서도 해결되지 않았으므로 구현 착수 전 확정이 필요하다.

- **데이터 컬럼명**: "데이터1/2/3" 실제 명칭 확정 필요 (`types/record.ts` 필드명에 직접 영향)
- **비정상치 처리 기본 정책**: 이 문서는 잠정적으로 "플래그" 방식을 기본값으로 제안했으나 최종 확인 필요
- **초반 구간 기준(오전 6시)**: 고정값인지 설정 가능값인지 확정 필요 (설계는 이미 설정 가능하도록 되어 있어 어느 쪽이든 대응 가능)
- **보안 강화 시점**: 인증 없이 anon key 기반으로 운영하는 현재 구조를 언제 Supabase Auth 도입으로 전환할지 (재정 데이터 확장 시점과 연동하여 결정 권장)

---

## 7. 신규 의존성 목록 (승인 완료)

아래 라이브러리는 이 TECHSPEC 작성 과정에서 사용자 승인을 받았다.

| 용도 | 라이브러리 | 비고 |
|---|---|---|
| Supabase 클라이언트 | `@supabase/supabase-js` | 1장, DB/Storage 접근 |
| 라우팅 | `react-router-dom` | 다중 페이지 구성에 필수 |
| CSV 파싱 | `papaparse` (+`@types/papaparse`) | 6.1 |
| 차트 | `recharts` 또는 `visx` | 6.4, 번들 크기 비교 후 결정 권장 |
| Excel 내보내기 | `xlsx` | 6.4, 1단계에서는 CSV만으로 대체 가능 |
| 상관계수 계산 | 자체 구현 (Pearson 공식은 단순하여 외부 라이브러리 불필요) | 6.3 |

환경 변수: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`를 `.env`(커밋 금지)에 정의한다. `anon` key는 원래 공개를 전제로 설계된 키이므로 `VITE_` 접두사로 노출되어도 무방하나, `service_role` key는 절대 클라이언트 코드에 포함하지 않는다.

---

## 8. 권장 구현 순서

1. Supabase 프로젝트 생성, `supabase/migrations/`에 스키마 정의 (`raw_records`, `daily_aggregates`, `weekly_aggregates`, `monthly_aggregates`, `app_settings`, `upload_history`), RLS 정책 작성
2. `types/` 정의 (`RawRecord`, `AppSettings`, 집계 타입) 및 `api/supabaseRepository.ts` 구현
3. `processing/cleaning/`, `processing/aggregation/` 순수 함수 + 단위 테스트
4. `UploadPage` (CSV 업로드 + 웹 폼) 연동
5. `SettingsPage` (컬럼 매핑, 임계값)
6. 대시보드 페이지들 (일→주→월 순, PRD 마일스톤과 동일한 우선순위)
7. 내보내기 기능
