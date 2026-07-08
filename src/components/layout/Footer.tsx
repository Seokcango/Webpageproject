function LogoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" />
      <rect x="11" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.5" />
      <rect x="1" y="11" width="6" height="6" rx="1.5" fill="white" opacity="0.5" />
      <rect x="11" y="11" width="6" height="6" rx="1.5" fill="white" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0A0F1E] text-white/60 border-t border-white/10">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-[#0057D8] rounded-md flex items-center justify-center">
                <LogoIcon />
              </div>
              <span className="font-bold text-white text-base">DataAuto</span>
            </div>
            <p className="text-sm leading-relaxed max-w-[280px]">
              개인 데이터 정리를 자동화하는<br />스마트 웹 대시보드
            </p>
            <p className="text-xs text-white/30">
              CSV 업로드 → 자동 클렌징 → 시각화
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <div className="space-y-3">
              <p className="text-white/30 text-xs font-semibold uppercase tracking-wider">기능</p>
              {['데이터 업로드', '자동 클렌징', '통계 대시보드', '데이터 내보내기'].map((item) => (
                <a key={item} href="#features" className="block hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-white/30 text-xs font-semibold uppercase tracking-wider">정보</p>
              {[
                { label: '사용 방법', href: '#how-it-works' },
                { label: '성과 지표', href: '#stats' },
                { label: 'PRD 문서', href: '#' },
                { label: '시작하기', href: '#cta' },
              ].map(({ label, href }) => (
                <a key={label} href={href} className="block hover:text-white transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <span>© 2026 DataAuto. 개인 프로젝트 · MVP v1.0</span>
          <span>React + TypeScript + Vite + Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
