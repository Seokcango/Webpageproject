import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: '기능', href: '#features' },
  { label: '사용 방법', href: '#how-it-works' },
  { label: '성과', href: '#stats' },
];

function LogoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" />
      <rect x="11" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.6" />
      <rect x="1" y="11" width="6" height="6" rx="1.5" fill="white" opacity="0.6" />
      <rect x="11" y="11" width="6" height="6" rx="1.5" fill="white" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h16M3 11h16M3 16h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4l14 14M18 4L4 18" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const textColor = scrolled ? 'text-[#333333]' : 'text-white/80';
  const hoverColor = scrolled ? 'hover:text-[#0057D8]' : 'hover:text-white';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 bg-[#0057D8] rounded flex items-center justify-center">
            <LogoIcon />
          </div>
          <span
            className={`font-bold text-lg tracking-tight transition-colors ${
              scrolled ? 'text-[#1A1A1A]' : 'text-white'
            }`}
          >
            DataAuto
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors duration-150 ${textColor} ${hoverColor}`}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#cta"
          className="hidden md:inline-flex items-center gap-1.5 bg-[#0057D8] hover:bg-[#003FAF] text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors duration-200"
        >
          대시보드 열기
          <ArrowRight />
        </a>

        <button
          type="button"
          className={`md:hidden p-2 transition-colors ${scrolled ? 'text-[#1A1A1A]' : 'text-white'}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="메뉴 열기"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-[#E5E5E5] px-6 py-5 space-y-4">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="block text-sm font-medium text-[#333333] hover:text-[#0057D8] transition-colors py-1"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 bg-[#0057D8] hover:bg-[#003FAF] text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors mt-2"
            onClick={() => setMobileOpen(false)}
          >
            대시보드 열기
            <ArrowRight />
          </a>
        </div>
      )}
    </header>
  );
}
