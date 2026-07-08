# irep.inc/jp — 디자인 시스템 분석 문서

> 분석 대상: https://irep.inc/jp/  
> 분석 페이지: 홈, About, Services, Works  
> 작성일: 2026-07-07

---

## 1. 브랜드 아이덴티티

### 브랜드 포지셔닝
- **슬로건**: "Data Meets Culture for Global Digital Success"
- **성격**: B2B 글로벌 디지털 마케팅 에이전시 (Tokyo + San Mateo)
- **톤**: 신뢰감 있고 전문적, 글로벌하지만 문화적 감각을 강조
- **키워드**: 데이터 드리븐, 글로벌, 문화적 이해, 신뢰, 전문성

### 디자인 원칙
1. **Minimalism** — 불필요한 장식 없이 콘텐츠 중심
2. **Clarity** — 명확한 타이포그래피 위계와 충분한 여백
3. **Professionalism** — 코퍼레이트 신뢰감을 주는 안정적 레이아웃
4. **Bilingual-first** — 일본어/영어 공존을 고려한 폰트·레이아웃 설계

---

## 2. 색상 시스템 (Color Tokens)

### Primary Palette

| 토큰 이름 | 추정 HEX | 용도 |
|-----------|----------|------|
| `color-primary` | `#1A1A1A` | 메인 텍스트, 헤딩 |
| `color-primary-light` | `#333333` | 본문 텍스트 |
| `color-accent` | `#0057D8` | 링크, CTA 버튼, 강조 |
| `color-accent-hover` | `#003FAF` | 버튼 hover 상태 |

### Neutral Palette

| 토큰 이름 | 추정 HEX | 용도 |
|-----------|----------|------|
| `color-background` | `#FFFFFF` | 페이지 기본 배경 |
| `color-surface` | `#F8F8F8` | 섹션 배경 (교대 섹션) |
| `color-border` | `#E5E5E5` | 구분선, 카드 테두리 |
| `color-text-muted` | `#767676` | 보조 텍스트, 메타 정보 |
| `color-text-light` | `#999999` | 플레이스홀더, 비활성 |

### Brand Identity Colors (Partner/Award)

| 브랜드 | 용도 |
|--------|------|
| Google Blue `#4285F4` | Google 파트너 배지 |
| Yahoo Purple `#720E9E` | Yahoo 배지 |
| Adobe Red `#FF0000` | Adobe 파트너 배지 |

---

## 3. 타이포그래피 시스템 (Typography)

### 폰트 패밀리

```css
/* 일본어 (본문/UI 우선) */
font-family: "Noto Sans JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN",
             "Yu Gothic", "Meiryo", sans-serif;

/* 영문 (헤딩/디스플레이) */
font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
```

> irep은 글로벌 × 일본 감성을 동시에 표현하므로 영문 헤딩에 깔끔한 Sans-serif, 일본어 본문에 Noto Sans JP 계열을 사용하는 것이 일반적인 패턴

### 타입 스케일

| 토큰 | 크기 | 굵기 | Line Height | 용도 |
|------|------|------|-------------|------|
| `text-display` | 56–64px | 700 | 1.15 | 히어로 메인 헤드라인 |
| `text-h1` | 40–48px | 700 | 1.2 | 페이지 타이틀 |
| `text-h2` | 28–32px | 600 | 1.3 | 섹션 헤딩 |
| `text-h3` | 20–24px | 600 | 1.4 | 카드/서브 헤딩 |
| `text-h4` | 16–18px | 600 | 1.4 | 그룹 라벨 |
| `text-body-lg` | 16px | 400 | 1.7 | 리드 본문 |
| `text-body` | 14–15px | 400 | 1.7 | 일반 본문 |
| `text-small` | 12–13px | 400 | 1.6 | 메타 정보, 캡션 |
| `text-label` | 11–12px | 500 | 1.4 | 태그, 카테고리 필터 |

### 타이포그래피 규칙
- 영문 헤딩은 **Sentence case** (첫 글자만 대문자)
- CTA 버튼 텍스트는 간결하게 (4단어 이내)
- 일본어-영문 혼용 시 행간 `1.7` 이상 확보
- 네비게이션 메뉴: 14px / Regular / Letter-spacing 0.5px

---

## 4. 간격 시스템 (Spacing)

### 기본 단위: 8px 그리드

```
spacing-1  =  4px    (미세 간격)
spacing-2  =  8px    (내부 패딩 최소)
spacing-3  = 12px
spacing-4  = 16px    (컴포넌트 내부 기본)
spacing-5  = 20px
spacing-6  = 24px    (카드 패딩)
spacing-8  = 32px
spacing-10 = 40px    (섹션 내 그룹 간격)
spacing-12 = 48px
spacing-16 = 64px    (섹션 간 여백)
spacing-20 = 80px    (대형 섹션 패딩)
spacing-24 = 96px
spacing-32 = 128px   (히어로 상하 패딩)
```

### 섹션 여백 패턴
- 섹션 상하 패딩: `80px` (데스크탑) / `48px` (모바일)
- 섹션 간 구분: `64–96px`
- 컨텐츠 최대 너비: `1200px` (컨테이너)
- 컨테이너 좌우 패딩: `24px` (모바일) / `40px` (태블릿) / `auto` (데스크탑)

---

## 5. 레이아웃 시스템 (Layout)

### 그리드 구조
- **컬럼 수**: 12 column grid
- **Gutter**: 24px (데스크탑) / 16px (모바일)
- **Max Width**: 1200px (일부 섹션은 Full-width)

### 반응형 브레이크포인트

| 이름 | 범위 | 용도 |
|------|------|------|
| `mobile` | 0 – 767px | 스마트폰 세로 |
| `tablet` | 768px – 1023px | 태블릿 |
| `desktop` | 1024px – 1279px | 노트북 |
| `wide` | 1280px+ | 대형 모니터 |

### 주요 섹션 레이아웃

```
[ 전체 페이지 구조 ]
┌─────────────────────────────────────────┐
│  HEADER (fixed/sticky)                  │
│  Logo | Nav Menu | Language Toggle      │
├─────────────────────────────────────────┤
│  HERO (full-width carousel)             │
│  배경 이미지 + 텍스트 오버레이           │
├─────────────────────────────────────────┤
│  ABOUT INTRO (2-col)                   │
│  텍스트 | 숫자/스탯 또는 이미지         │
├─────────────────────────────────────────┤
│  AWARDS / PARTNERS (carousel)          │
│  로고 슬라이더 (전체 너비)              │
├─────────────────────────────────────────┤
│  SERVICES (3-step)                     │
│  아이콘 | 설명 | 아이콘 | 설명 ...      │
├─────────────────────────────────────────┤
│  WORKS (grid, 3-col)                   │
│  카드 | 카드 | 카드                     │
│  카드 | 카드 | 카드                     │
├─────────────────────────────────────────┤
│  NEWS (3-col 카드)                     │
├─────────────────────────────────────────┤
│  CLIENTS LOGO CAROUSEL                 │
├─────────────────────────────────────────┤
│  CONTACT CTA (full-width, dark BG)     │
├─────────────────────────────────────────┤
│  FOOTER                                │
│  링크 | SNS | 주소 | 카피라이트          │
└─────────────────────────────────────────┘
```

---

## 6. 컴포넌트 (Components)

### 6.1 내비게이션 (Navigation)

```
[ Header ]
고정(sticky) 또는 스크롤 시 배경 추가 방식

데스크탑:
┌────────────────────────────────────────────────────┐
│ [Logo]  About  Services  Works  News & Insights  [EN|JP] │
└────────────────────────────────────────────────────┘

모바일:
┌──────────────────────────────┐
│ [Logo]               [☰ Menu]│
└──────────────────────────────┘
```

**스펙:**
- 높이: 64–72px (데스크탑)
- 배경: `#FFFFFF` + 하단 보더 또는 그림자
- 메뉴 항목 간격: 32–40px
- 언어 토글: 구분선(`|`)으로 구분된 텍스트 링크

---

### 6.2 히어로 섹션 (Hero / KV)

```
[ Full-width 배경 이미지 ]
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Data Meets Culture                                │
│   for Global Digital Success                        │
│                                                     │
│   [서브 텍스트 또는 CTA 버튼]                         │
│                                                     │
│                              ●  ○  ○  (Dots)       │
└─────────────────────────────────────────────────────┘
```

**스펙:**
- 높이: `100vh` 또는 최소 600px
- 이미지 포맷: `.webp`
- 텍스트 색상: `#FFFFFF` (배경 이미지 위 오버레이)
- 오버레이: `rgba(0, 0, 0, 0.3–0.4)` 다크 오버레이
- 슬라이드: 자동 재생, 전환 시 Fade 또는 Slide 애니메이션
- 인디케이터: 하단 도트 네비게이션

---

### 6.3 버튼 (Button)

#### Primary Button
```
┌─────────────────────────────┐
│   お問い合わせはこちら   →   │
└─────────────────────────────┘
```
- 배경: `#0057D8` (파란색 강조)
- 텍스트: `#FFFFFF`
- Padding: `12px 28px`
- Border-radius: `4px` 또는 `0` (각진 스타일)
- Hover: 배경 `#003FAF`, 전환 0.2s ease

#### Secondary / Text Link Button
```
もっと見る  →
```
- 텍스트 색상: `#0057D8` 또는 `#1A1A1A`
- 화살표 아이콘 동반 (`→`)
- 밑줄 없음, hover 시 밑줄 또는 색상 변화

#### Outline Button
```
┌─────────────────────────────┐
│       Get in touch          │
└─────────────────────────────┘
```
- 테두리: `1px solid #1A1A1A` 또는 `#0057D8`
- 배경: 투명
- Hover: 배경 채워짐

---

### 6.4 카드 (Card)

#### Works 카드 (포트폴리오)
```
┌───────────────────────────┐
│                           │
│   [Thumbnail Image]       │
│   aspect-ratio: 16:9      │
│                           │
├───────────────────────────┤
│  [카테고리 태그]           │
│  프로젝트 타이틀           │
│  서비스 설명               │
└───────────────────────────┘
```
- 이미지 비율: `16:9` (약 980×550px 기준)
- 카드 하단 패딩: `16–24px`
- 카드 간격: `24px`
- Hover: 이미지 scale-up(`1.03`) + 오버레이 또는 그림자

#### News 카드
```
┌───────────────────────────┐
│   [썸네일]                │
├───────────────────────────┤
│  날짜  |  카테고리         │
│  기사 제목                │
└───────────────────────────┘
```

---

### 6.5 서비스 스텝 (Step Component)

```
    [Step 1]              [Step 2]             [Step 3]
  ┌──────────┐          ┌──────────┐         ┌──────────┐
  │  🔍 Icon │          │  🌐 Icon │         │  📢 Icon │
  │          │          │          │         │          │
  │ Research │   ───>   │Localize  │  ───>   │Advertise │
  │ Analytics│          │ & Create │         │& Optimize│
  └──────────┘          └──────────┘         └──────────┘
```
- 아이콘: `icon-service-{n}.svg` (번호가 새겨진 SVG)
- 화살표 연결로 순차적 플로우 강조
- 각 스텝 배경: 번갈아 흰색 / 연회색

---

### 6.6 카테고리 필터 (Filter Bar)

```
Browse by:  [All]  [Gaming]  [Hospitality]  [E-commerce]  ...
```
- 활성 탭: 배경 또는 밑줄 강조
- 기본 탭: 텍스트 링크 스타일
- 패딩: `8px 16px` per item
- 경계: 보더 또는 언더라인 방식

---

### 6.7 클라이언트 로고 캐러셀

```
← [Logo1] [Logo2] [Logo3] [Logo4] [Logo5] [Logo6] →
```
- 자동 스크롤 (horizontal loop)
- 로고는 그레이스케일 → hover 시 컬러
- 배경: `#F8F8F8` 또는 흰색
- 패딩: `40–60px` 상하

---

### 6.8 FAQ 아코디언

```
Q: 질문 텍스트                                    [+]
──────────────────────────────────────────────────────
Q: 다른 질문 텍스트                               [−]
   └─ 답변이 펼쳐진 상태 ─────────────────────────────
      답변 내용이 표시됩니다.
```
- 토글 아이콘: `+` / `-` 또는 `▼` / `▲`
- 전환: max-height 애니메이션 (0.3s ease)
- 보더: 항목 간 하단 `1px solid #E5E5E5`

---

### 6.9 월드맵 섹션

```
[월드 맵 SVG / 이미지]
  ●  Tokyo (HQ)
  ●  San Mateo
  ● ... (20+ countries)
```
- 위치 마커: 원형 도트 (`#0057D8`)
- 배경: 흰색 또는 연회색
- 지도는 SVG 또는 이미지로 구현

---

### 6.10 푸터 (Footer)

```
┌─────────────────────────────────────────────────────┐
│  [Logo]                                             │
│                                                     │
│  About  Services  Works  News  Privacy  Terms       │
│                                                     │
│  ✕  ⓕ  📸  in                                     │
│                                                     │
│  Address: Tokyo, Japan / San Mateo, CA              │
│  Email: info@irep.inc                               │
│                                                     │
│  © 2024 irep Inc. All rights reserved.              │
└─────────────────────────────────────────────────────┘
```
- 배경: `#1A1A1A` (다크) 또는 `#F8F8F8` (라이트)
- 텍스트: 배경에 따라 `#FFFFFF` 또는 `#333333`
- SNS 아이콘: X, Facebook, Instagram, LinkedIn

---

## 7. 아이코노그래피 & 이미지 (Iconography & Imagery)

### 아이콘 스타일
- 형식: **SVG** (벡터, 확대 가능)
- 스타일: **Flat / Line icon** (두꺼운 stroke, 심플)
- 서비스 아이콘: 번호 레이블 포함 (`icon-service-1.svg`)
- SNS 아이콘: 브랜드 공식 아이콘 사용

### 이미지 스타일
- 포맷: **WebP** (최신 포맷, 성능 최적화)
- 히어로: 고품질 대형 사진 (비즈니스/도시/글로벌 감성)
- 포트폴리오: 16:9 비율 썸네일 (약 980px 너비)
- 팀 사진: 정방형 또는 4:3 (About 페이지)
- 로고: 그레이스케일 처리 후 hover 시 컬러

---

## 8. 모션 & 인터랙션 (Motion)

### 전환 규칙

| 이름 | 지속시간 | 이징 | 용도 |
|------|----------|------|------|
| `transition-fast` | 150ms | `ease-out` | hover, 작은 상태 변화 |
| `transition-base` | 250ms | `ease-in-out` | 버튼, 링크, 아이콘 |
| `transition-slow` | 400ms | `ease-in-out` | 아코디언, 패널 열기 |
| `transition-carousel` | 600ms | `ease-in-out` | 슬라이드/캐러셀 전환 |

### Hover 패턴
- **텍스트 링크**: 색상 변화 + 밑줄 (0.2s)
- **카드**: `translateY(-4px)` + box-shadow 심화
- **이미지**: `scale(1.03)` with `overflow:hidden`
- **버튼**: 배경색 어둡게, `cursor: pointer`
- **클라이언트 로고**: 그레이스케일 → 컬러 (0.3s)

### 스크롤 애니메이션
- 섹션 진입: `fade-in + translateY(20px → 0)` (0.5s delay)
- 카운터 숫자: 스크롤 시 0 → 최종값 애니메이션

---

## 9. 양식 & 인풋 (Form Elements)

### 인풋 필드
```
┌─────────────────────────────────────────────┐
│ 라벨 텍스트                                  │
├─────────────────────────────────────────────┤
│ 플레이스홀더 텍스트                           │
└─────────────────────────────────────────────┘
```
- 테두리: `1px solid #E5E5E5`
- 포커스: `1px solid #0057D8` + 외부 glow
- 패딩: `12px 16px`
- Border-radius: `4px`

---

## 10. 이 프로젝트에 적용 시 권장사항

### Tailwind CSS 커스텀 토큰 예시

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A1A1A',
          light: '#333333',
        },
        accent: {
          DEFAULT: '#0057D8',
          hover: '#003FAF',
        },
        surface: '#F8F8F8',
        border: '#E5E5E5',
        muted: '#767676',
      },
      fontFamily: {
        sans: ['"Inter"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        jp: ['"Noto Sans JP"', '"Hiragino Sans"', '"Yu Gothic"', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',   // 72px
        22: '5.5rem',   // 88px
      },
      maxWidth: {
        content: '1200px',
      },
      transitionDuration: {
        250: '250ms',
        400: '400ms',
        600: '600ms',
      },
    },
  },
}
```

### 주요 참고 패턴
1. **섹션 교대 배경** — 흰색 / `#F8F8F8` 번갈아 사용해 구분감 부여
2. **3컬럼 그리드** — Works, News, Service Step은 일관되게 3-col
3. **캐러셀 두 곳** — Hero KV + Client Logo (자동 재생)
4. **이중 언어 CTA** — 일본어 + 영어 버튼 병행
5. **세로 방향 콘텐츠 진행** — 각 섹션 명확히 구분, 좌우 여백 충분히

---

*본 문서는 irep.inc/jp 홈페이지의 공개된 HTML 구조와 시각 분석을 기반으로 작성된 리버스 엔지니어링 디자인 문서입니다. 실제 CSS 소스 코드에 접근하지 않았으므로 일부 수치는 추정값입니다.*
