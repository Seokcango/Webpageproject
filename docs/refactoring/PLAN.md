# PLAN: 데이터 정리 자동화 웹 애플리케이션 (Supabase 기반 구현)

**관련 문서**: [[TECHSPEC]]
**작성일**: 2026-07-16
**예상 영향 파일**: 45개 이상 (신규 40+, 수정 4)

---

## 마스터 체크리스트

### Milestone 1: 인프라 및 기반 설정 (Breaking Change 없음)
- [ ] **M1.1** 신규 의존성 추가 → [§1.1](#m1-1-신규-의존성-추가)
- [ ] **M1.2** 환경 변수 템플릿 갱신 → [§1.2](#m1-2-환경-변수-템플릿-갱신)
- [ ] **M1.3** Supabase 클라이언트 초기화 → [§1.3](#m1-3-supabase-클라이언트-초기화)
- [ ] **M1.4** Supabase DB 스키마 마이그레이션 → [§1.4](#m1-4-supabase-db-스키마-마이그레이션)
- [ ] **M1.5** 공용 타입 정의 → [§1.5](#m1-5-공용-타입-정의)
- [ ] **M1.6** DataRepository 인터페이스 및 Supabase 구현체 → [§1.6](#m1-6-datarepository-인터페이스-및-supabase-구현체)
- [ ] **M1.7** 라우터 도입 및 대시보드 레이아웃 → [§1.7](#m1-7-라우터-도입-및-대시보드-레이아웃)

### Milestone 2: 데이터 처리 파이프라인 (PRD 6.1, 6.2)
- [ ] **M2.1** 클렌징 순수 함수 → [§2.1](#m2-1-클렌징-순수-함수)
- [ ] **M2.2** 집계·상관계수 순수 함수 → [§2.2](#m2-2-집계상관계수-순수-함수)
- [ ] **M2.3** CSV 파서 유틸 → [§2.3](#m2-3-csv-파서-유틸)
- [ ] **M2.4** 업로드 훅 및 데이터 스토어 → [§2.4](#m2-4-업로드-훅-및-데이터-스토어)
- [ ] **M2.5** 업로드 UI 및 페이지 → [§2.5](#m2-5-업로드-ui-및-페이지)

### Milestone 3: 대시보드 및 시각화 (PRD 6.4)
- [ ] **M3.1** 차트 컴포넌트 → [§3.1](#m3-1-차트-컴포넌트)
- [ ] **M3.2** 대시보드 공용 컴포넌트 → [§3.2](#m3-2-대시보드-공용-컴포넌트)
- [ ] **M3.3** 집계 조회 훅 → [§3.3](#m3-3-집계-조회-훅)
- [ ] **M3.4** 일/주/월 분석 페이지 → [§3.4](#m3-4-일주월-분석-페이지)
- [ ] **M3.5** 대시보드 홈 및 CSV 내보내기 → [§3.5](#m3-5-대시보드-홈-및-csv-내보내기)

### Milestone 4: 시스템 관리 및 정리 (PRD 6.5)
- [ ] **M4.1** 설정 스토어 및 훅 → [§4.1](#m4-1-설정-스토어-및-훅)
- [ ] **M4.2** 설정 페이지 → [§4.2](#m4-2-설정-페이지)
- [ ] **M4.3** 레거시 보일러플레이트 정리 → [§4.3](#m4-3-레거시-보일러플레이트-정리)

### Milestone 5: 테스트 및 검증
- [ ] **M5.1** processing/ 단위 테스트 작성 → [§5.1](#m5-1-processing-단위-테스트-작성)
- [ ] **M5.2** 빌드/린트 및 수동 시나리오 검증 → [§5.2](#m5-2-빌드린트-및-수동-시나리오-검증)

---

## 파일 변경 개요

### 새 파일

| 파일 경로 | 설명 | Milestone |
|---|---|---|
| `supabase/migrations/0001_init.sql` | 초기 스키마 (테이블 6개 + RLS 정책) | M1.4 |
| `supabase/config.toml` | Supabase CLI 로컬 설정 | M1.4 |
| `src/api/supabaseClient.ts` | Supabase 클라이언트 초기화 | M1.3 |
| `src/types/record.ts` | RawRecord, RawRecordInput, UploadHistoryEntry 타입 | M1.5 |
| `src/types/aggregate.ts` | DailyAggregate, WeeklyAggregate, MonthlyAggregate 타입 | M1.5 |
| `src/types/settings.ts` | ColumnMapping, Thresholds, AppSettings 타입 | M1.5 |
| `src/api/types.ts` | DataRepository 인터페이스, 공용 DTO | M1.6 |
| `src/api/supabaseRepository.ts` | DataRepository의 Supabase 구현체 | M1.6 |
| `src/api/repository.ts` | 활성 구현체 export 진입점 | M1.6 |
| `src/components/layout/DashboardLayout.tsx` | 대시보드 탭 내비게이션 레이아웃 | M1.7 |
| `src/pages/DashboardHomePage.tsx` | 홈 대시보드 (요약 카드 + 30일 추이) | M1.7 |
| `src/processing/cleaning/deduplicate.ts` | 중복 제거 | M2.1 |
| `src/processing/cleaning/normalizeDate.ts` | 날짜 형식 통일 | M2.1 |
| `src/processing/cleaning/flagOutliers.ts` | 비정상치 플래그 처리 | M2.1 |
| `src/processing/aggregation/dailyAggregate.ts` | 일별 집계 | M2.2 |
| `src/processing/aggregation/weeklyAggregate.ts` | 주별 집계 + 전주 대비 증감 | M2.2 |
| `src/processing/aggregation/monthlyAggregate.ts` | 월별 집계 | M2.2 |
| `src/processing/correlation/pearson.ts` | Pearson 상관계수 계산 | M2.2 |
| `src/utils/csvParser.ts` | papaparse 래핑 | M2.3 |
| `src/utils/dateFormat.ts` | 날짜 파싱/포맷 유틸 | M2.3 |
| `src/hooks/useCsvUpload.ts` | CSV 업로드 훅 | M2.4 |
| `src/store/useDataStore.ts` | 업로드/조회 상태 스토어 | M2.4 |
| `src/components/upload/CsvDropzone.tsx` | CSV 드래그앤드롭 업로드 컴포넌트 | M2.5 |
| `src/components/upload/ManualEntryForm.tsx` | 웹 폼 수동 입력 컴포넌트 | M2.5 |
| `src/pages/UploadPage.tsx` | 업로드 페이지 | M2.5 |
| `src/components/charts/TrendLineChart.tsx` | 추이 라인 그래프 | M3.1 |
| `src/components/charts/CorrelationHeatmap.tsx` | 상관계수 히트맵 | M3.1 |
| `src/components/charts/ScatterPlot.tsx` | 산점도 | M3.1 |
| `src/components/dashboard/SummaryCard.tsx` | 요약 통계 카드 | M3.2 |
| `src/components/dashboard/ValidationBanner.tsx` | 비정상치 경고 배너 | M3.2 |
| `src/hooks/useDailyAggregate.ts` | 일별 집계 조회 훅 | M3.3 |
| `src/hooks/useWeeklyAggregate.ts` | 주별 집계 조회 훅 | M3.3 |
| `src/hooks/useMonthlyAggregate.ts` | 월별 집계 조회 훅 | M3.3 |
| `src/pages/DailyAnalysisPage.tsx` | 일별 분석 탭 | M3.4 |
| `src/pages/WeeklyAnalysisPage.tsx` | 주별 분석 탭 | M3.4 |
| `src/pages/MonthlyAnalysisPage.tsx` | 월별 분석 탭 | M3.4 |
| `src/store/useSettingsStore.ts` | 설정 상태 스토어 | M4.1 |
| `src/hooks/useSettings.ts` | 설정 조회/갱신 훅 | M4.1 |
| `src/pages/SettingsPage.tsx` | 관리자 설정 페이지 | M4.2 |
| `src/processing/cleaning/*.test.ts` | 클렌징 함수 단위 테스트 3종 | M5.1 |
| `src/processing/aggregation/*.test.ts` | 집계 함수 단위 테스트 3종 | M5.1 |
| `src/processing/correlation/pearson.test.ts` | 상관계수 단위 테스트 | M5.1 |

### 수정 파일

| 파일 경로 | 변경 내용 | Milestone |
|---|---|---|
| `package.json` | `@supabase/supabase-js`, `react-router-dom`, `papaparse`, `recharts` 등 의존성 추가 | M1.1 |
| `.env.example` | `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 추가 | M1.2 |
| `src/App.tsx` | `BrowserRouter` 기반 라우팅 도입 | M1.7 |
| `CLAUDE.md` | "명령어" 절에 Supabase CLI 관련 명령 추가 | M1.4 |

### 삭제 파일

| 파일 경로 | 사유 | Milestone |
|---|---|---|
| `src/store/useCounterStore.ts` | Zustand 사용 예시용 보일러플레이트, 실제 기능 스토어(`useDataStore`, `useSettingsStore`) 도입 후 불필요. 다른 파일에서 import된 곳 없음(확인 완료) | M4.3 |

---

## 상세 구현

---

### M1.1 신규 의존성 추가

**파일**: `package.json`

**목적**: TECHSPEC §7에서 승인된 라이브러리를 설치한다.

**현재 상태** (라인 15-18, 19-38):
```json
  "dependencies": {
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "zustand": "^5.0.8"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    ...
    "vitest": "^3.2.4"
  }
```

**변경 후**:
```typescript
// dependencies (라인 15-18)
  "dependencies": {
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "zustand": "^5.0.8",
+   "@supabase/supabase-js": "^2.45.0",
+   "react-router-dom": "^7.0.0",
+   "papaparse": "^5.4.1",
+   "recharts": "^2.15.0"
  },

// devDependencies에 추가 (기존 목록 유지 + 아래 추가)
  "devDependencies": {
    ...
+   "@types/papaparse": "^5.3.14",
+   "supabase": "^1.200.0"
  }
```

**핵심 변경 사항**:
1. `@supabase/supabase-js` — Supabase DB/Storage 클라이언트 SDK
2. `react-router-dom` — `/`(랜딩)과 `/dashboard/*`(실제 앱) 라우트 분리에 필요
3. `papaparse` + `@types/papaparse` — CSV 파싱
4. `recharts` — TECHSPEC §3.4에서 제시한 두 후보(recharts/visx) 중 API가 단순한 recharts를 채택
5. `supabase`(devDependency) — 로컬 마이그레이션 관리를 위한 Supabase CLI, `npx supabase` 형태로 사용

**참조**: TECHSPEC §7

---

### M1.2 환경 변수 템플릿 갱신

**파일**: `.env.example`

**목적**: Supabase 접속 정보를 환경 변수로 노출한다.

**현재 상태** (라인 1-3):
```
# Vite는 VITE_ 접두사가 붙은 변수만 클라이언트 번들에 노출합니다.
# 노출되어도 되는 값만 VITE_ 접두사를 붙이세요 (비밀 키 금지).
VITE_API_BASE_URL=
```

**변경 후**:
```
# 변경 없음 (라인 1-2)
# Vite는 VITE_ 접두사가 붙은 변수만 클라이언트 번들에 노출합니다.
# 노출되어도 되는 값만 VITE_ 접두사를 붙이세요 (비밀 키 금지).

// 삭제 (라인 3)
- VITE_API_BASE_URL=

// 추가
+ VITE_SUPABASE_URL=
+ VITE_SUPABASE_ANON_KEY=
```

**핵심 변경 사항**:
1. `VITE_API_BASE_URL`은 커스텀 백엔드 전제였던 항목이므로 제거 (Supabase 채택으로 불필요)
2. `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 추가. `anon` key는 공개 전제 키이므로 `VITE_` 노출에 문제 없음. `service_role` key는 절대 추가하지 않는다 (TECHSPEC §7 보안 주의사항)
3. 실제 `.env` 파일은 사용자가 로컬에서 직접 생성 (커밋 금지, `.gitignore`에 이미 등록됨)

**참조**: TECHSPEC §1, §7

---

### M1.3 Supabase 클라이언트 초기화

**파일**: `src/api/supabaseClient.ts` (신규)

**목적**: Supabase 클라이언트를 단일 인스턴스로 생성해 전 앱에서 재사용한다.

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY 환경 변수가 설정되지 않았습니다.');
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
```

**핵심 변경 사항**:
1. named export `supabaseClient`만 노출 (CLAUDE.md의 named export 원칙 준수)
2. 환경 변수 누락 시 앱 부팅 시점에 즉시 에러를 던져 조용한 실패를 방지

**참조**: TECHSPEC §1, §2

---

### M1.4 Supabase DB 스키마 마이그레이션

**파일**: `supabase/migrations/0001_init.sql` (신규), `supabase/config.toml` (신규)

**목적**: PRD 6.3 집계 단위와 6.5 설정/이력 요구사항에 대응하는 테이블을 정의한다.

```sql
-- owner_id는 인증 없이 단일 사용자를 구분하기 위한 고정 상수 (TECHSPEC §1 참고)
create table raw_records (
  id uuid primary key default gen_random_uuid(),
  owner_id text not null default 'default-user',
  date date not null,
  data1 numeric,
  data2 numeric,
  data3 numeric,
  memo text,
  is_valid boolean not null default true,
  flag_reason text,
  source_file text,
  created_at timestamptz not null default now()
);

create table daily_aggregates (
  owner_id text not null default 'default-user',
  date date not null,
  data1_avg numeric, data1_min numeric, data1_max numeric, data1_sum numeric,
  data2_avg numeric, data2_min numeric, data2_max numeric, data2_sum numeric,
  data3_avg numeric, data3_min numeric, data3_max numeric, data3_sum numeric,
  valid_count integer not null default 0,
  invalid_count integer not null default 0,
  primary key (owner_id, date)
);

create table weekly_aggregates (
  owner_id text not null default 'default-user',
  week_start date not null,
  summary jsonb not null,
  primary key (owner_id, week_start)
);

create table monthly_aggregates (
  owner_id text not null default 'default-user',
  month date not null,
  summary jsonb not null,
  primary key (owner_id, month)
);

create table app_settings (
  owner_id text primary key default 'default-user',
  column_mapping jsonb not null default '{}',
  thresholds jsonb not null default '{}',
  early_cutoff_time time not null default '06:00',
  outlier_policy text not null default 'flag' check (outlier_policy in ('flag', 'exclude'))
);

create table upload_history (
  id uuid primary key default gen_random_uuid(),
  owner_id text not null default 'default-user',
  file_name text not null,
  uploaded_at timestamptz not null default now(),
  row_count integer not null,
  error_count integer not null
);

-- RLS: TECHSPEC §1 "보안 관련 주의 사항" 참고 (anon key 소지자는 누구나 접근 가능한 정책)
alter table raw_records enable row level security;
alter table daily_aggregates enable row level security;
alter table weekly_aggregates enable row level security;
alter table monthly_aggregates enable row level security;
alter table app_settings enable row level security;
alter table upload_history enable row level security;

create policy "allow all to default-user rows" on raw_records for all using (owner_id = 'default-user') with check (owner_id = 'default-user');
create policy "allow all to default-user rows" on daily_aggregates for all using (owner_id = 'default-user') with check (owner_id = 'default-user');
create policy "allow all to default-user rows" on weekly_aggregates for all using (owner_id = 'default-user') with check (owner_id = 'default-user');
create policy "allow all to default-user rows" on monthly_aggregates for all using (owner_id = 'default-user') with check (owner_id = 'default-user');
create policy "allow all to default-user rows" on app_settings for all using (owner_id = 'default-user') with check (owner_id = 'default-user');
create policy "allow all to default-user rows" on upload_history for all using (owner_id = 'default-user') with check (owner_id = 'default-user');
```

Storage 버킷은 SQL이 아닌 Supabase 대시보드(또는 CLI)에서 `raw-uploads`라는 이름으로 별도 생성한다 (public 아님, anon key로만 접근).

**핵심 변경 사항**:
1. 주별/월별 집계는 컬럼이 가변적인 상관계수·요일별 패턴 등을 담아야 하므로 `jsonb summary` 컬럼으로 유연하게 저장
2. 모든 테이블에 `owner_id = 'default-user'` RLS 정책 적용 — 실질적 접근 통제는 아니지만 향후 Auth 도입 시 조건만 `auth.uid()`로 교체하면 되는 구조
3. `CLAUDE.md` "명령어" 절에 `npx supabase db push` 등 마이그레이션 적용 명령 문서화 필요 (별도 수정 항목)

**참조**: TECHSPEC §1, §3.5

---

### M1.5 공용 타입 정의

**파일**: `src/types/record.ts`, `src/types/aggregate.ts`, `src/types/settings.ts` (모두 신규)

```typescript
// src/types/record.ts
export type RawRecordInput = {
  date: string;
  data1: number | null;
  data2: number | null;
  data3: number | null;
  memo?: string;
};

export type RawRecord = RawRecordInput & {
  id: string;
  isValid: boolean;
  flagReason?: string;
  sourceFile?: string;
  createdAt: string;
};

export type UploadHistoryEntry = {
  id: string;
  fileName: string;
  uploadedAt: string;
  rowCount: number;
  errorCount: number;
};

export type UploadResult = {
  history: UploadHistoryEntry;
  records: RawRecord[];
  errors: { row: number; message: string }[];
};
```

```typescript
// src/types/aggregate.ts
export type FieldStats = { avg: number; min: number; max: number; sum: number };

export type DailyAggregate = {
  date: string;
  data1: FieldStats;
  data2: FieldStats;
  data3: FieldStats;
  validCount: number;
  invalidCount: number;
};

export type CorrelationMatrix = {
  data1Data2: number;
  data1Data3: number;
  data2Data3: number;
};

export type WeeklyAggregate = {
  weekStart: string;
  dailyTrend: DailyAggregate[];
  weekdayPattern: Record<string, FieldStats>;
  changeVsLastWeek: { data1: number; data2: number; data3: number };
  correlation: CorrelationMatrix;
};

export type MonthlyAggregate = {
  month: string;
  totals: { data1: FieldStats; data2: FieldStats; data3: FieldStats };
  changeVsLastMonth: { data1: number; data2: number; data3: number };
  dailyTrend: DailyAggregate[];
  correlation: CorrelationMatrix;
};
```

```typescript
// src/types/settings.ts
export type ColumnMapping = {
  csvHeader: string;
  systemColumn: 'date' | 'data1' | 'data2' | 'data3' | 'memo';
  type: 'string' | 'float' | 'date';
};

export type Thresholds = {
  data1: { min: number; max: number };
  data2: { min: number; max: number };
  data3: { min: number; max: number };
};

export type AppSettings = {
  columnMapping: ColumnMapping[];
  thresholds: Thresholds;
  earlyCutoffTime: string; // "HH:mm", 기본 "06:00"
  outlierPolicy: 'flag' | 'exclude';
};
```

**핵심 변경 사항**:
1. `any` 사용 없이 전부 명시적 타입 (CLAUDE.md strict 모드 원칙 준수)
2. `WeeklyAggregate`/`MonthlyAggregate`는 DB의 `jsonb summary` 컬럼과 매핑되는 애플리케이션 레벨 타입 — Supabase 조회 후 이 타입으로 파싱

**참조**: TECHSPEC §2, §3.3

---

### M1.6 DataRepository 인터페이스 및 Supabase 구현체

**파일**: `src/api/types.ts`, `src/api/supabaseRepository.ts`, `src/api/repository.ts` (모두 신규)

```typescript
// src/api/types.ts
import type { RawRecord, RawRecordInput, UploadResult } from '@/types/record';
import type { DailyAggregate, WeeklyAggregate, MonthlyAggregate } from '@/types/aggregate';
import type { AppSettings } from '@/types/settings';

export type DateRangeFilter = { from: string; to: string };

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

```typescript
// src/api/supabaseRepository.ts (핵심 골격)
import { supabaseClient } from '@/api/supabaseClient';
import type { DataRepository, DateRangeFilter } from '@/api/types';
import { parseCsvFile } from '@/utils/csvParser';
import { deduplicate } from '@/processing/cleaning/deduplicate';
import { normalizeDate } from '@/processing/cleaning/normalizeDate';
import { flagOutliers } from '@/processing/cleaning/flagOutliers';

const OWNER_ID = 'default-user';

export const supabaseRepository: DataRepository = {
  async uploadCsv(file) {
    await supabaseClient.storage.from('raw-uploads').upload(`${Date.now()}_${file.name}`, file);
    const parsed = await parseCsvFile(file);
    const settings = await supabaseRepository.getSettings();
    const normalized = parsed.map(normalizeDate);
    const deduped = deduplicate(normalized);
    const flagged = flagOutliers(deduped, settings.thresholds);
    const { data, error } = await supabaseClient
      .from('raw_records')
      .insert(flagged.map((r) => ({ ...r, owner_id: OWNER_ID })))
      .select();
    if (error) throw error;
    // upload_history insert 및 UploadResult 조립 생략(실 구현 시 작성)
    return { history: /* ... */ null as never, records: data as never, errors: [] };
  },
  async createRecord(input) { /* raw_records 단건 insert, 클렌징 파이프라인 재사용 */ throw new Error('구현 필요'); },
  async listRecords(filter: DateRangeFilter) { /* raw_records select + date range 필터 */ throw new Error('구현 필요'); },
  async getDailyAggregate(date) { /* daily_aggregates upsert-or-read 패턴, 3.3절 참고 */ throw new Error('구현 필요'); },
  async getWeeklyAggregate(weekStart) { throw new Error('구현 필요'); },
  async getMonthlyAggregate(month) { throw new Error('구현 필요'); },
  async getSettings() { /* app_settings 단일 row 조회, 없으면 기본값 insert */ throw new Error('구현 필요'); },
  async updateSettings(settings) { /* app_settings upsert */ throw new Error('구현 필요'); },
  async exportCsv(filter) { /* listRecords 후 CSV 문자열 조립 → Blob */ throw new Error('구현 필요'); },
};
```

```typescript
// src/api/repository.ts
export { supabaseRepository as dataRepository } from '@/api/supabaseRepository';
```

**핵심 변경 사항**:
1. 위 `supabaseRepository.ts` 골격은 각 메서드의 책임과 호출 순서(스토리지 업로드 → 파싱 → 클렌징 파이프라인 → DB insert)를 규정하는 스켈레톤이며, 구현 담당자가 `throw new Error('구현 필요')` 부분을 채운다
2. 모든 상위 코드(훅/스토어/컴포넌트)는 `@/api/repository`의 `dataRepository`만 import한다 — Supabase를 다른 백엔드로 교체할 때 이 파일만 교체하면 됨
3. `uploadCsv`는 원본 파일을 Storage에 먼저 업로드해 "원본 보존"을 보장한 뒤 정제된 레코드를 DB에 저장하는 순서를 지킨다 (TECHSPEC §3.2 원본 불변성)

**참조**: TECHSPEC §1, §3.1, §3.3

---

### M1.7 라우터 도입 및 대시보드 레이아웃

**파일**: `src/App.tsx` (수정), `src/components/layout/DashboardLayout.tsx` (신규), `src/pages/DashboardHomePage.tsx` (신규)

**현재 상태** (`src/App.tsx` 라인 1-8):
```typescript
import { HomePage } from '@/pages/HomePage';

function App() {
  return <HomePage />;
}

export default App;
```

**변경 후**:
```typescript
// 제거 (라인 1)
- import { HomePage } from '@/pages/HomePage';

// 추가
+ import { BrowserRouter, Routes, Route } from 'react-router-dom';
+ import { HomePage } from '@/pages/HomePage';
+ import { DashboardLayout } from '@/components/layout/DashboardLayout';
+ import { DashboardHomePage } from '@/pages/DashboardHomePage';
+ import { UploadPage } from '@/pages/UploadPage';
+ import { DailyAnalysisPage } from '@/pages/DailyAnalysisPage';
+ import { WeeklyAnalysisPage } from '@/pages/WeeklyAnalysisPage';
+ import { MonthlyAnalysisPage } from '@/pages/MonthlyAnalysisPage';
+ import { SettingsPage } from '@/pages/SettingsPage';

// 함수 본문 변경 (라인 3-5)
- function App() {
-   return <HomePage />;
- }
+ function App() {
+   return (
+     <BrowserRouter>
+       <Routes>
+         <Route path="/" element={<HomePage />} />
+         <Route path="/dashboard" element={<DashboardLayout />}>
+           <Route index element={<DashboardHomePage />} />
+           <Route path="upload" element={<UploadPage />} />
+           <Route path="daily" element={<DailyAnalysisPage />} />
+           <Route path="weekly" element={<WeeklyAnalysisPage />} />
+           <Route path="monthly" element={<MonthlyAnalysisPage />} />
+           <Route path="settings" element={<SettingsPage />} />
+         </Route>
+       </Routes>
+     </BrowserRouter>
+   );
+ }
```

`DashboardLayout.tsx`는 `<Outlet />`을 사용해 PRD 6.4가 요구하는 "일별/주별/월별 탭 내비게이션"을 렌더링하는 공용 셸이다.

**핵심 변경 사항**:
1. 랜딩(`/`)과 실제 앱(`/dashboard/*`)을 완전히 분리해 마케팅 페이지와 기능 화면이 섞이지 않도록 함 (TECHSPEC §3.4)
2. M2~M4의 각 페이지 컴포넌트가 아직 없는 시점에는 이 Milestone을 먼저 완료할 수 없으므로, 실제 작업 순서상 M1.7은 M2~M4의 페이지 파일들이 생성된 뒤 마지막에 `App.tsx`를 연결하는 방식으로 미뤄도 무방하다 (아래 "예상 작업 순서" 참고)

**참조**: TECHSPEC §3.4

---

### M2.1 클렌징 순수 함수

**파일**: `src/processing/cleaning/deduplicate.ts`, `normalizeDate.ts`, `flagOutliers.ts` (모두 신규)

```typescript
// deduplicate.ts
import type { RawRecordInput } from '@/types/record';

export function deduplicate<T extends RawRecordInput>(records: T[]): T[] {
  const latestByKey = new Map<string, T>();
  for (const record of records) {
    const key = `${record.date}|${record.data1}|${record.data2}`;
    latestByKey.set(key, record); // 이후 항목이 이전 항목을 덮어써 "최신 유지"
  }
  return Array.from(latestByKey.values());
}
```

```typescript
// normalizeDate.ts
export class DateParseError extends Error {}

export function normalizeDate<T extends { date: string }>(record: T): T {
  const parsed = parseFlexibleDate(record.date); // utils/dateFormat.ts의 parseFlexibleDate 재사용
  if (!parsed) throw new DateParseError(`날짜를 해석할 수 없습니다: ${record.date}`);
  return { ...record, date: parsed };
}
```

```typescript
// flagOutliers.ts
import type { RawRecord, RawRecordInput } from '@/types/record';
import type { Thresholds } from '@/types/settings';

export function flagOutliers(
  records: RawRecordInput[],
  thresholds: Thresholds,
  earlyCutoffTime = '06:00',
): RawRecord[] {
  return records.map((record) => {
    const reasons: string[] = [];
    if (isBeforeCutoff(record.date, earlyCutoffTime)) reasons.push('초반 구간(품질 미측정)');
    if (isOutOfRange(record.data1, thresholds.data1)) reasons.push('데이터1 범위 초과');
    if (isOutOfRange(record.data2, thresholds.data2)) reasons.push('데이터2 범위 초과');
    if (isOutOfRange(record.data3, thresholds.data3)) reasons.push('데이터3 범위 초과');
    return {
      ...record,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      isValid: reasons.length === 0,
      flagReason: reasons.length ? reasons.join(', ') : undefined,
    };
  });
}
```

**핵심 변경 사항**:
1. 세 함수 모두 입력 배열을 변경하지 않고 새 배열/객체를 반환 (TECHSPEC §3.2 "원본 불변성")
2. `flagOutliers`는 기본값으로 "플래그" 정책을 구현하며, `exclude` 정책은 이 함수의 반환값을 호출부(`supabaseRepository.uploadCsv` 등)에서 `isValid` 기준으로 필터링하는 방식으로 처리 (별도 분기 불필요)
3. `isBeforeCutoff`, `isOutOfRange`는 같은 파일 내 비공개 헬퍼로 구현

**참조**: TECHSPEC §3.2, §6(비정상치 처리 기본 정책은 오픈 이슈로 남아 있음 — 정책 확정 시 `outlierPolicy` 분기만 수정하면 됨)

---

### M2.2 집계·상관계수 순수 함수

**파일**: `src/processing/aggregation/dailyAggregate.ts`, `weeklyAggregate.ts`, `monthlyAggregate.ts`, `src/processing/correlation/pearson.ts` (모두 신규)

```typescript
// pearson.ts
export function pearsonCorrelation(xs: number[], ys: number[]): number {
  const n = xs.length;
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = ys.reduce((a, b) => a + b, 0) / n;
  const cov = xs.reduce((sum, x, i) => sum + (x - meanX) * (ys[i] - meanY), 0);
  const stdX = Math.sqrt(xs.reduce((s, x) => s + (x - meanX) ** 2, 0));
  const stdY = Math.sqrt(ys.reduce((s, y) => s + (y - meanY) ** 2, 0));
  return cov / (stdX * stdY);
}
```

```typescript
// dailyAggregate.ts
import type { RawRecord } from '@/types/record';
import type { DailyAggregate, FieldStats } from '@/types/aggregate';

function computeStats(values: number[]): FieldStats {
  return {
    avg: values.reduce((a, b) => a + b, 0) / values.length,
    min: Math.min(...values),
    max: Math.max(...values),
    sum: values.reduce((a, b) => a + b, 0),
  };
}

export function dailyAggregate(records: RawRecord[], date: string): DailyAggregate {
  const dayRecords = records.filter((r) => r.date === date);
  const valid = dayRecords.filter((r) => r.isValid);
  return {
    date,
    data1: computeStats(valid.map((r) => r.data1 ?? 0)),
    data2: computeStats(valid.map((r) => r.data2 ?? 0)),
    data3: computeStats(valid.map((r) => r.data3 ?? 0)),
    validCount: valid.length,
    invalidCount: dayRecords.length - valid.length,
  };
}
```

`weeklyAggregate.ts`/`monthlyAggregate.ts`는 `dailyAggregate`를 날짜별로 반복 호출해 `dailyTrend`를 만들고, `pearsonCorrelation`으로 `correlation`을 계산하며, 직전 기간과의 `changeVsLastWeek`/`changeVsLastMonth`를 백분율로 계산하는 동일한 패턴을 따른다.

**핵심 변경 사항**:
1. `computeStats`가 빈 배열을 받을 경우(그날 정상 데이터가 0건) `NaN`이 발생하므로, 실제 구현 시 빈 배열 가드를 추가해 `{avg:0,min:0,max:0,sum:0}`을 반환하도록 처리 필요
2. 상관계수는 `data1`/`data2`/`data3`의 정상 레코드만 사용해 계산

**참조**: TECHSPEC §3.3

---

### M2.3 CSV 파서 유틸

**파일**: `src/utils/csvParser.ts`, `src/utils/dateFormat.ts` (모두 신규)

```typescript
// csvParser.ts
import Papa from 'papaparse';
import type { RawRecordInput } from '@/types/record';
import type { ColumnMapping } from '@/types/settings';

export function parseCsvFile(file: File, columnMapping: ColumnMapping[]): Promise<RawRecordInput[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(mapRowsToRecords(result.data, columnMapping)),
      error: reject,
    });
  });
}
```

```typescript
// dateFormat.ts
export function parseFlexibleDate(raw: string): string | null {
  // YYYY-MM-DD, DD/MM/YYYY 등 지원 포맷을 순차 시도, 실패 시 null
  // 실 구현 시 정규식 기반 포맷 판별 + Date 파싱
  throw new Error('구현 필요');
}
```

**핵심 변경 사항**:
1. `parseCsvFile`은 `ColumnMapping[]`을 받아 CSV 헤더를 시스템 컬럼으로 매핑 (TECHSPEC §3.1)
2. `mapRowsToRecords`(비공개 헬퍼)에서 필수 컬럼 누락/타입 변환 실패를 감지해 행 단위 에러를 수집, `UploadResult.errors`로 전달할 수 있도록 별도 반환 채널 필요 — 실제 구현 시 `parseCsvFile`의 반환 타입을 `{ records, errors }`로 확장 검토

**참조**: TECHSPEC §3.1

---

### M2.4 업로드 훅 및 데이터 스토어

**파일**: `src/hooks/useCsvUpload.ts`, `src/store/useDataStore.ts` (모두 신규)

```typescript
// store/useDataStore.ts
import { create } from 'zustand';
import type { RawRecord } from '@/types/record';
import type { DailyAggregate, WeeklyAggregate, MonthlyAggregate } from '@/types/aggregate';

type DataState = {
  records: RawRecord[];
  dailyAggregate: DailyAggregate | null;
  weeklyAggregate: WeeklyAggregate | null;
  monthlyAggregate: MonthlyAggregate | null;
  isLoading: boolean;
  error: string | null;
  setRecords: (records: RawRecord[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useDataStore = create<DataState>((set) => ({
  records: [],
  dailyAggregate: null,
  weeklyAggregate: null,
  monthlyAggregate: null,
  isLoading: false,
  error: null,
  setRecords: (records) => set({ records }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
```

```typescript
// hooks/useCsvUpload.ts
import { useState } from 'react';
import { dataRepository } from '@/api/repository';
import { useDataStore } from '@/store/useDataStore';

export function useCsvUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const setRecords = useDataStore((s) => s.setRecords);

  async function upload(file: File) {
    setIsUploading(true);
    try {
      const result = await dataRepository.uploadCsv(file);
      setRecords(result.records);
      return result;
    } finally {
      setIsUploading(false);
    }
  }

  return { upload, isUploading };
}
```

**핵심 변경 사항**:
1. 스토어는 `DataRepository`만 호출하고 Supabase를 직접 알지 못함 (TECHSPEC §4)
2. `useCsvUpload`는 UI(`CsvDropzone`)에서 바로 사용할 수 있는 얇은 훅으로, 로딩 상태 관리만 책임짐

**참조**: TECHSPEC §4

---

### M2.5 업로드 UI 및 페이지

**파일**: `src/components/upload/CsvDropzone.tsx`, `ManualEntryForm.tsx`, `src/pages/UploadPage.tsx` (모두 신규)

- `CsvDropzone.tsx`: `<input type="file" accept=".csv">` + 드래그앤드롭 영역, `useCsvUpload().upload(file)` 호출, 업로드 결과의 `errors`를 행 단위 목록으로 표시
- `ManualEntryForm.tsx`: 날짜/데이터1/데이터2/데이터3/메모 입력 필드(controlled input), 제출 시 `dataRepository.createRecord()` 호출, 엔터키 제출 지원 (PRD 6.1)
- `UploadPage.tsx`: 위 두 컴포넌트를 탭 또는 좌우 배치로 조합한 페이지, `named export function UploadPage()`

**핵심 변경 사항**:
1. 두 입력 경로 모두 최종적으로 `dataRepository`(CSV는 `uploadCsv`, 폼은 `createRecord`)를 통해서만 저장되어 클렌징 파이프라인이 이원화되지 않음 (TECHSPEC §3.1)

**참조**: TECHSPEC §3.1

---

### M3.1 차트 컴포넌트

**파일**: `src/components/charts/TrendLineChart.tsx`, `CorrelationHeatmap.tsx`, `ScatterPlot.tsx` (모두 신규)

- `TrendLineChart.tsx`: `recharts`의 `LineChart`/`Line`/`XAxis`/`YAxis`/`Tooltip` 조합, `props: { data: { date: string; value: number }[] }`
- `CorrelationHeatmap.tsx`: `CorrelationMatrix` 타입을 받아 3x3 격자를 Tailwind로 렌더링 (recharts에 히트맵 기본 컴포넌트가 없으므로 커스텀 그리드 + 색상 스케일로 구현)
- `ScatterPlot.tsx`: `recharts`의 `ScatterChart`/`Scatter`, `props: { points: { x: number; y: number }[] }`

**핵심 변경 사항**:
1. 세 컴포넌트 모두 순수 프레젠테이션 컴포넌트로, 데이터 조회 로직(M3.3의 훅)과 분리

**참조**: TECHSPEC §3.4

---

### M3.2 대시보드 공용 컴포넌트

**파일**: `src/components/dashboard/SummaryCard.tsx`, `ValidationBanner.tsx` (모두 신규)

- `SummaryCard.tsx`: `props: { label: string; value: string; trend?: string }` — 홈 대시보드의 "최근 7일 요약" 카드 (PRD 6.4)
- `ValidationBanner.tsx`: `props: { invalidCount: number }` — 비정상치가 1건 이상이면 "⚠️ 검증 경고" 배너 표시 (PRD 5장 에러 처리 흐름)

**참조**: TECHSPEC §3.4

---

### M3.3 집계 조회 훅

**파일**: `src/hooks/useDailyAggregate.ts`, `useWeeklyAggregate.ts`, `useMonthlyAggregate.ts` (모두 신규)

```typescript
// useDailyAggregate.ts (세 훅 공통 패턴)
import { useEffect, useState } from 'react';
import { dataRepository } from '@/api/repository';
import type { DailyAggregate } from '@/types/aggregate';

export function useDailyAggregate(date: string) {
  const [data, setData] = useState<DailyAggregate | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dataRepository.getDailyAggregate(date).then((result) => {
      setData(result);
      setIsLoading(false);
    });
  }, [date]);

  return { data, isLoading };
}
```

**핵심 변경 사항**:
1. `weekly`/`monthly` 훅도 동일한 패턴(파라미터만 `weekStart`/`month`)으로 구현
2. 현재는 과설계 방지를 위해 TanStack Query 없이 직접 `useEffect` 패턴을 사용 (TECHSPEC §4에서 언급된 재검토 대상)

**참조**: TECHSPEC §3.3, §4

---

### M3.4 일/주/월 분석 페이지

**파일**: `src/pages/DailyAnalysisPage.tsx`, `WeeklyAnalysisPage.tsx`, `MonthlyAnalysisPage.tsx` (모두 신규)

- `DailyAnalysisPage.tsx`: 날짜별 레코드 테이블(정상 여부 컬럼 포함) + 막대그래프 + `ValidationBanner`
- `WeeklyAnalysisPage.tsx`: `TrendLineChart`(7일 추이) + 전주 대비 증감 수치 + `CorrelationHeatmap`
- `MonthlyAnalysisPage.tsx`: `TrendLineChart`(최근 6개월 누적) + 막대 비교 + `ScatterPlot`

각 페이지는 해당하는 `useXxxAggregate` 훅으로 데이터를 조회하고 M3.1/M3.2 컴포넌트를 조합한다.

**참조**: TECHSPEC §3.4

---

### M3.5 대시보드 홈 및 CSV 내보내기

**파일**: `src/pages/DashboardHomePage.tsx` (신규, M1.7에서 파일명만 먼저 선언됨)

- 최근 7일 `SummaryCard` 4종(평균/최대/최소/데이터 개수) + 최근 30일 `TrendLineChart` + 날짜 범위 필터(`DateRangeFilter` 상태를 로컬 useState로 관리)
- 내보내기 버튼: `dataRepository.exportCsv(filter)`가 반환한 `Blob`을 `URL.createObjectURL` + `<a download>`로 저장

**핵심 변경 사항**:
1. Excel(`xlsx`) 내보내기는 TECHSPEC §3.4 권고에 따라 이번 PLAN 범위에서 제외, CSV 내보내기만 구현

**참조**: TECHSPEC §3.4

---

### M4.1 설정 스토어 및 훅

**파일**: `src/store/useSettingsStore.ts`, `src/hooks/useSettings.ts` (모두 신규)

```typescript
// store/useSettingsStore.ts
import { create } from 'zustand';
import type { AppSettings } from '@/types/settings';

type SettingsState = {
  settings: AppSettings | null;
  setSettings: (settings: AppSettings) => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  setSettings: (settings) => set({ settings }),
}));
```

`useSettings.ts`는 M3.3과 동일한 `useEffect` 조회 패턴 + 저장 시 `dataRepository.updateSettings()` 호출 후 스토어 갱신.

**참조**: TECHSPEC §4

---

### M4.2 설정 페이지

**파일**: `src/pages/SettingsPage.tsx` (신규)

- 컬럼 매핑 편집기(테이블 형태로 `ColumnMapping[]` 추가/삭제/수정)
- 임계값(min/max) 설정 폼 (데이터1/2/3 각각)
- 초반 구간 시각 설정 (`<input type="time">`, 기본 `06:00`)
- 비정상치 처리 정책 토글 (`flag` / `exclude`)
- 업로드 이력 탭: `upload_history` 테이블 조회 결과를 테이블로 표시

**참조**: TECHSPEC §3.5

---

### M4.3 레거시 보일러플레이트 정리

**파일**: `src/store/useCounterStore.ts` (삭제)

**현재 상태**: Zustand 사용법을 보여주는 예시 카운터 스토어. `Grep` 확인 결과 `src/` 내 다른 파일에서 import된 곳 없음.

**변경 후**: 파일 삭제.

**핵심 변경 사항**:
1. M2.4/M4.1에서 실제 기능 스토어(`useDataStore`, `useSettingsStore`)가 도입된 뒤 삭제해야 "Zustand 사용 예시가 전혀 없는 상태"가 되지 않음 — 반드시 M2.4 이후에 수행

**참조**: TECHSPEC §0 (구현 완료 항목의 삭제 대상 명시)

---

### M5.1 processing/ 단위 테스트 작성

**파일**: `src/processing/cleaning/deduplicate.test.ts` 등 7개 테스트 파일 (신규)

Vitest로 아래 케이스를 다룬다.
- `deduplicate`: 동일 키 레코드가 최신 것만 남는지
- `normalizeDate`: `YYYY-MM-DD`, `DD/MM/YYYY` 등 다양한 입력이 통일되는지, 파싱 불가 시 `DateParseError`가 던져지는지
- `flagOutliers`: 임계값 초과/초반 구간 레코드가 올바르게 플래그되는지
- `dailyAggregate`/`weeklyAggregate`/`monthlyAggregate`: 고정 픽스처 데이터로 평균/합계/상관계수가 기대값과 일치하는지
- `pearsonCorrelation`: 완전 상관(1.0), 완전 역상관(-1.0), 무상관(0에 근접) 케이스

**참조**: TECHSPEC §3.2, §3.3

---

### M5.2 빌드/린트 및 수동 시나리오 검증

- `pnpm run lint`, `pnpm run build`(`tsc -b && vite build`), `pnpm run test` 전부 통과 확인 (CLAUDE.md "커밋 전 확인" 원칙)
- 수동 시나리오: CSV 업로드 → 클렌징 결과 확인 → 일/주/월 대시보드에서 집계 반영 확인 → CSV 내보내기 → 설정 변경(임계값) 후 재업로드 시 플래그 결과 변화 확인

**참조**: CLAUDE.md "중요 사항"

---

## 주의 사항

### 오픈 이슈 (TECHSPEC §6 승계, 구현 중 재확인 필요)

| 항목 | 설명 |
|---|---|
| 데이터 컬럼명 | "데이터1/2/3"은 TECHSPEC의 잠정 명칭. 실제 컬럼명이 확정되면 `types/record.ts`, DB 스키마, UI 라벨을 일괄 변경해야 함 |
| 비정상치 기본 정책 | 이 PLAN은 "flag"를 기본값으로 구현. 최종 정책이 "exclude"로 확정되면 `app_settings.outlier_policy` 기본값과 UI 토글 초기값만 변경하면 됨 |
| 보안 | 인증 없이 anon key + 고정 owner_id로 운영. 재정 데이터 등 민감 정보 확장 전 Supabase Auth 도입 재검토 필요 (TECHSPEC §1) |

### Supabase CLI 사전 준비

M1.4를 진행하려면 로컬에 Supabase 프로젝트 연결이 필요하다 (`npx supabase login`, `npx supabase link`). 이 PLAN은 프로젝트가 이미 생성되어 있다고 가정하지 않으므로, M1.4 착수 전 Supabase 대시보드에서 프로젝트를 먼저 생성해야 한다.

### 집계 캐시 정합성

TECHSPEC §3.3에 따라 집계 결과를 `daily_aggregates` 등에 캐시하므로, 레코드가 추가/삭제될 때마다 캐시를 무효화하거나 재계산하는 로직이 `uploadCsv`/`createRecord` 내부에 필요하다. 이 PLAN의 M1.6 스켈레톤에는 명시하지 않았으므로 M2 구현 시 반영한다.

---

## 롤백 계획

| 단계 | 롤백 방법 |
|---|---|
| M1 | `package.json`/`.env.example`/`App.tsx` 변경분을 git revert. Supabase 프로젝트 자체는 앱 코드와 무관하므로 그대로 두어도 무해 |
| M2~M4 | 전부 신규 파일이므로 해당 커밋을 되돌리면 기존 랜딩 페이지 상태로 완전 복귀 |
| M5 | 테스트 파일 삭제만으로 롤백 가능, 프로덕션 코드에 영향 없음 |

---

## 예상 작업 순서

1. **M1.1~M1.6** (인프라: 의존성, 타입, Repository) — 이 시점까지는 화면에 변화 없음, 빌드만 통과하면 됨
2. **M2.1~M2.5** (업로드 파이프라인) — `UploadPage`까지 완성되면 CSV 업로드 → DB 저장이 end-to-end로 동작
3. **M1.7** (라우터 연결) — M2 완료 후 `App.tsx`에 라우트를 연결해 실제로 `/dashboard/upload` 접근 가능하게 함
4. **M3.1~M3.5** (대시보드) — 업로드된 데이터가 화면에 시각화됨
5. **M4.1~M4.3** (설정 및 정리) — 컬럼 매핑/임계값을 UI에서 조정 가능해지고, 레거시 코드 제거
6. **M5.1~M5.2** (검증) — 전체 파이프라인 단위 테스트 및 수동 시나리오 확인

---

**문서 끝**
