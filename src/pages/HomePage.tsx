import { useEffect, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// ─── Icons ──────────────────────────────────────────────────────────────────

function ArrowRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 9 7 13 15 5" />
    </svg>
  );
}

// ─── Dashboard Mockup ────────────────────────────────────────────────────────

function DashboardMockup() {
  const chartPoints = 'M0,55 C15,48 30,58 50,42 C70,26 90,38 110,28 C130,18 150,32 170,20 C190,8 210,22 230,14 C250,6 270,10 290,6 C310,2 330,8 350,4';

  return (
    <div className="relative mt-16 lg:mt-20">
      <div className="relative bg-[#111827] rounded border border-white/10 overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10 bg-white/5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-white/30 text-xs font-medium">
            DataAuto — 데이터 자동화 대시보드
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" style={{ animation: 'pulse-dot 2s ease-in-out infinite' }} />
            <span className="text-[10px] text-white/30">자동 갱신</span>
          </div>
        </div>

        <div className="p-5">
          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: '오늘 데이터 평균', value: '98.2', tag: '▲ 2.1%', tagColor: 'text-emerald-400' },
              { label: '정상 데이터 비율', value: '94.2%', tag: '▲ 0.8%', tagColor: 'text-emerald-400' },
              { label: '오늘 처리 건수', value: '1,247', tag: '자동 처리', tagColor: 'text-[#0057D8]' },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 rounded p-4">
                <div className="text-white/40 text-[11px] mb-1.5">{s.label}</div>
                <div className="text-white text-xl font-bold">{s.value}</div>
                <div className={`text-[11px] mt-1 font-medium ${s.tagColor}`}>{s.tag}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white/5 rounded p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/40 text-[11px]">최근 30일 데이터 추이</span>
              <div className="flex gap-3">
                {['일별', '주별', '월별'].map((t, i) => (
                  <span
                    key={t}
                    className={`text-[11px] px-2.5 py-0.5 rounded ${i === 0 ? 'bg-[#0057D8] text-white' : 'text-white/30'}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <svg viewBox="0 0 360 70" className="w-full" style={{ height: '70px' }}>
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0057D8" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#0057D8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={chartPoints} stroke="#0057D8" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d={`${chartPoints} L350,70 L0,70 Z`} fill="url(#chartGrad)" />
              {[0, 60, 120, 180, 240, 300, 350].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="70" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              ))}
            </svg>
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <div className="bg-white/5 rounded p-4">
              <div className="text-white/40 text-[11px] mb-2">데이터 상태 분포</div>
              <div className="space-y-2">
                {[
                  { label: '정상', pct: 94, color: 'bg-emerald-500' },
                  { label: '플래그', pct: 4, color: 'bg-amber-500' },
                  { label: '제외', pct: 2, color: 'bg-red-500/60' },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-2">
                    <span className="text-white/50 text-[11px] w-8">{row.label}</span>
                    <div className="flex-1 bg-white/10 rounded h-1.5 overflow-hidden">
                      <div className={`${row.color} h-full rounded`} style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className="text-white/40 text-[11px] w-8 text-right">{row.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 rounded p-4">
              <div className="text-white/40 text-[11px] mb-2">최근 업로드</div>
              <div className="space-y-2">
                {[
                  { file: 'data_2026_07.csv', status: '완료', ok: true },
                  { file: 'data_2026_06.csv', status: '완료', ok: true },
                  { file: 'data_2026_05.csv', status: '경고 2', ok: false },
                ].map((row) => (
                  <div key={row.file} className="flex items-center justify-between">
                    <span className="text-white/50 text-[11px] truncate max-w-[130px]">{row.file}</span>
                    <span className={`text-[11px] font-medium ${row.ok ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow under card */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-24 blur-3xl pointer-events-none"
        style={{ background: 'rgba(0, 87, 216, 0.25)' }}
      />
    </div>
  );
}

// ─── Hero Section ────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#0A0F1E] flex flex-col justify-center overflow-hidden pt-16">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid" />

      {/* Blue ambient glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'rgba(0, 87, 216, 0.12)' }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 py-24 w-full">
        <div className="max-w-[760px] animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/8 border border-white/15 rounded px-4 py-1.5 mb-7">
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
            />
            <span className="text-white/70 text-sm font-medium">v1.0 MVP · 개인 데이터 자동화 플랫폼</span>
          </div>

          {/* Headline */}
          <h1 className="text-[52px] md:text-[72px] font-extrabold text-white leading-[1.08] tracking-tight mb-6">
            데이터 정리,
            <br />
            <span className="text-[#0057D8]">이제 자동으로.</span>
          </h1>

          {/* Sub */}
          <p className="text-lg md:text-xl text-white/55 leading-[1.7] mb-10 max-w-[540px]">
            CSV 업로드 한 번으로 자동 클렌징부터 일·주·월별 통계 대시보드까지.{' '}
            <br className="hidden md:block" />
            수작업 <strong className="text-white/80">15시간</strong>을{' '}
            <strong className="text-white/80">2시간</strong>으로 줄여드립니다.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#features"
              className="inline-flex items-center gap-2 bg-[#0057D8] hover:bg-[#003FAF] text-white font-semibold px-7 py-3.5 rounded text-base transition-colors duration-200 shadow-[0_0_24px_rgba(0,87,216,0.4)]"
            >
              시작하기
              <ArrowRight />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white/75 hover:text-white font-medium px-7 py-3.5 rounded text-base transition-all duration-200"
            >
              기능 살펴보기
            </a>
          </div>
        </div>

        <DashboardMockup />
      </div>
    </section>
  );
}

// ─── Pain Section ────────────────────────────────────────────────────────────

const PAIN_POINTS = [
  {
    icon: <ClockIcon />,
    title: '월 15시간 수작업',
    desc: '매달 데이터를 직접 정리·취합·분류하는 데만 15시간 이상이 소비됩니다. 분석할 시간이 없습니다.',
    stat: '15h/월',
  },
  {
    icon: <AlertIcon />,
    title: '3~5% 오류 발생',
    desc: '수작업 정리 과정에서 실수·누락·중복이 반복됩니다. 데이터 신뢰성이 무너집니다.',
    stat: '3~5% 오류',
  },
  {
    icon: <LockIcon />,
    title: '로컬 PC에 갇힌 데이터',
    desc: '메모장이나 엑셀에만 저장된 데이터. 다른 기기에서 접근이 불가능하고, 통계 분석은 더 어렵습니다.',
    stat: '1기기 한정',
  },
];

function PainSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white py-24 md:py-32 section-fade">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#0057D8] text-sm font-semibold uppercase tracking-widest mb-3">왜 필요한가요?</p>
          <h2 className="text-[36px] md:text-[48px] font-bold text-[#1A1A1A] leading-tight mb-4">
            매달 반복되는
            <br />
            <span className="text-[#767676]">지루한 수작업</span>
          </h2>
          <p className="text-[#767676] text-lg max-w-[480px] mx-auto leading-relaxed">
            데이터를 정리하는 데 지쳐 정작 중요한 분석을 못하고 있지는 않나요?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAIN_POINTS.map(({ icon, title, desc, stat }) => (
            <div
              key={title}
              className="group relative bg-[#F8F8F8] hover:bg-white border border-[#E5E5E5] hover:border-[#0057D8]/30 rounded p-8 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,87,216,0.08)] hover:-translate-y-1"
            >
              <div className="text-[#0057D8] mb-5">{icon}</div>
              <div className="inline-block bg-[#0057D8]/10 text-[#0057D8] text-xs font-bold px-3 py-1 rounded mb-4">
                {stat}
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{title}</h3>
              <p className="text-[#767676] text-sm leading-[1.7]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features Section ────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: <UploadIcon />,
    title: 'CSV 업로드 & 웹 폼 입력',
    desc: 'CSV 파일 업로드 또는 웹 폼 직접 입력, 두 가지 방식으로 데이터를 등록할 수 있습니다. 필수 컬럼과 데이터 타입을 즉시 자동 검증합니다.',
    highlights: ['CSV 지원 (XLSX 예정)', '웹 폼 수동 입력', '실시간 유효성 검사'],
  },
  {
    icon: <SparkIcon />,
    title: '스마트 데이터 클렌징',
    desc: '중복 제거, 날짜 형식 통일, 비정상치 감지까지 원본 데이터를 건드리지 않고 자동으로 정제합니다.',
    highlights: ['중복 자동 제거', '날짜 형식 통일', '이상치 플래그 처리'],
  },
  {
    icon: <ChartIcon />,
    title: '3단계 통계 대시보드',
    desc: '일별·주별·월별 집계가 자동으로 이루어집니다. 상관관계 분석과 추이 차트를 즉시 확인하세요.',
    highlights: ['일·주·월별 자동 집계', '상관관계 분석', '라인/막대/히트맵 차트'],
  },
  {
    icon: <DownloadIcon />,
    title: '데이터 내보내기',
    desc: '필터가 적용된 현재 뷰 그대로 CSV 또는 Excel 파일로 바로 다운로드할 수 있습니다.',
    highlights: ['CSV / Excel 내보내기', '필터 적용 상태 유지', '고정 포맷 제공'],
  },
];

function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" ref={ref} className="bg-[#F8F8F8] py-24 md:py-32 section-fade">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#0057D8] text-sm font-semibold uppercase tracking-widest mb-3">핵심 기능</p>
          <h2 className="text-[36px] md:text-[48px] font-bold text-[#1A1A1A] leading-tight mb-4">
            DataAuto가
            <br />해결합니다
          </h2>
          <p className="text-[#767676] text-lg max-w-[460px] mx-auto leading-relaxed">
            반복 작업은 시스템에게, 당신은 분석에만 집중하세요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FEATURES.map(({ icon, title, desc, highlights }) => (
            <div
              key={title}
              className="group bg-white border border-[#E5E5E5] rounded p-8 hover:border-[#0057D8]/40 hover:shadow-[0_12px_40px_rgba(0,87,216,0.08)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-[#0057D8]/10 rounded flex items-center justify-center text-[#0057D8] mb-6 group-hover:bg-[#0057D8] group-hover:text-white transition-colors duration-300">
                {icon}
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{title}</h3>
              <p className="text-[#767676] text-sm leading-[1.7] mb-5">{desc}</p>
              <ul className="space-y-2">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2.5 text-sm text-[#333333]">
                    <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <CheckIcon />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: '01',
    title: 'CSV 파일 업로드',
    desc: '웹 브라우저에서 CSV 파일을 드래그앤드롭하거나 웹 폼으로 직접 데이터를 입력합니다. 파일 크기 50MB까지 지원합니다.',
    detail: '검증 → 형식 확인 → 자동 매핑',
  },
  {
    num: '02',
    title: '자동 정리 & 집계',
    desc: '시스템이 중복 제거, 날짜 통일, 비정상치 감지, 일·주·월별 집계를 자동으로 수행합니다. 원본 파일은 항상 보존됩니다.',
    detail: '클렌징 → 집계 → 상관관계 분석',
  },
  {
    num: '03',
    title: '대시보드에서 확인',
    desc: '정제된 데이터가 즉시 시각화됩니다. 차트와 통계로 인사이트를 빠르게 파악하고 필요시 내보내기하세요.',
    detail: '차트 → 테이블 → 내보내기',
  },
];

function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-it-works" ref={ref} className="bg-white py-24 md:py-32 section-fade">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#0057D8] text-sm font-semibold uppercase tracking-widest mb-3">사용 방법</p>
          <h2 className="text-[36px] md:text-[48px] font-bold text-[#1A1A1A] leading-tight mb-4">
            3단계로 완성하는
            <br />데이터 자동화
          </h2>
          <p className="text-[#767676] text-lg max-w-[420px] mx-auto leading-relaxed">
            복잡한 설정 없이 바로 시작할 수 있습니다.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-[52px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px"
            style={{ background: 'repeating-linear-gradient(90deg, #E5E5E5 0, #E5E5E5 6px, transparent 6px, transparent 16px)' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {STEPS.map(({ num, title, desc, detail }, idx) => (
              <div key={num} className="relative flex flex-col items-center text-center md:items-start md:text-left">
                {/* Number badge */}
                <div className="relative z-10 w-16 h-16 rounded bg-[#0057D8] flex items-center justify-center mb-6 shadow-[0_0_24px_rgba(0,87,216,0.3)]">
                  <span className="text-white font-extrabold text-xl">{num}</span>
                  {idx < STEPS.length - 1 && (
                    <div className="md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 w-px h-10 bg-[#E5E5E5]" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#1A1A1A] mb-3">{title}</h3>
                <p className="text-[#767676] text-sm leading-[1.7] mb-4">{desc}</p>
                <div className="inline-flex items-center gap-1.5 text-[#0057D8] text-xs font-semibold bg-[#0057D8]/8 rounded px-3.5 py-1.5">
                  {detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User journey note */}
        <div className="mt-16 bg-[#F8F8F8] border border-[#E5E5E5] rounded p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-10 h-10 bg-amber-100 rounded flex items-center justify-center shrink-0 text-amber-600">
            <AlertIcon />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1A1A1A] mb-1">오류 처리도 자동으로</p>
            <p className="text-sm text-[#767676] leading-relaxed">
              데이터 형식 오류나 비정상치가 발생하면 어떤 행에서 문제가 생겼는지 명확히 알려줍니다.
              에러 로그는 자동으로 파일로 저장되어 추후 확인할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats Section ───────────────────────────────────────────────────────────

const STATS = [
  { value: '86%', label: '데이터 정리 시간 단축', sub: '월 15시간 → 2시간' },
  { value: '<0.5%', label: '데이터 오류율', sub: '수작업 3~5% 대비' },
  { value: '<3초', label: '대시보드 로딩', sub: '최적화된 쿼리' },
  { value: '99%', label: '시스템 가용성', sub: '안정적인 서비스' },
];

function StatsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="stats" ref={ref} className="relative bg-[#0A0F1E] py-24 md:py-32 overflow-hidden section-fade">
      <div className="absolute inset-0 dot-grid" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,87,216,0.1) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#0057D8] text-sm font-semibold uppercase tracking-widest mb-3">성과 지표</p>
          <h2 className="text-[36px] md:text-[48px] font-bold text-white leading-tight">
            숫자로 증명하는 효과
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(({ value, label, sub }) => (
            <div
              key={label}
              className="group text-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#0057D8]/50 rounded p-8 transition-all duration-300"
            >
              <div className="text-[42px] md:text-[52px] font-extrabold text-white mb-2 leading-none group-hover:text-[#0057D8] transition-colors duration-300">
                {value}
              </div>
              <div className="text-white/70 text-sm font-semibold mb-1">{label}</div>
              <div className="text-white/35 text-xs">{sub}</div>
            </div>
          ))}
        </div>

        {/* PRD basis note */}
        <p className="text-center text-white/20 text-xs mt-10">
          * PRD 목표 지표 기준 (2026-06-20) · MVP v1.0
        </p>
      </div>
    </section>
  );
}

// ─── CTA Section ─────────────────────────────────────────────────────────────

function CtaSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="cta" ref={ref} className="bg-white py-24 md:py-32 section-fade">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="relative bg-[#0057D8] rounded overflow-hidden px-8 py-16 md:py-20 text-center">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div
            className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none"
            style={{ background: 'rgba(255,255,255,0.08)', transform: 'translate(30%, -30%)' }}
          />

          <div className="relative">
            <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-4">지금 바로 시작</p>
            <h2 className="text-[36px] md:text-[52px] font-extrabold text-white leading-[1.1] mb-5">
              데이터 정리에서 해방되세요.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-[480px] mx-auto">
              설치 없이 브라우저에서 바로 사용하세요.
              <br />첫 CSV 업로드부터 자동화가 시작됩니다.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-white text-[#0057D8] font-bold px-8 py-4 rounded text-base hover:bg-white/90 transition-colors duration-200 shadow-lg"
              >
                대시보드 열기
                <ArrowRight />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded text-base transition-colors duration-200"
              >
                사용 방법 보기
              </a>
            </div>

            {/* Reassurance badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/50 text-sm">
              {['설치 불필요', '원본 데이터 보존', '개인 전용 대시보드'].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <span className="text-white/30">✓</span> {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ───────────────────────────────────────────────────────────────

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <PainSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
