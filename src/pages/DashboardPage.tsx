import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from '@/components/ui/Card';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { useProfile } from '@/hooks/useProfile';
import { useAuthStore } from '@/store/useAuthStore';
import { getAnswerLabel } from '@/utils/onboarding';
import { getDashboardMessage } from '@/utils/personalization';

const SUMMARY_ROWS: Array<{ label: string; questionCode: 'q_purpose' | 'q_pain_point' | 'q_cleanup_frequency' | 'q_outlier_handling'; key: 'purpose' | 'main_problem' | 'cleanup_frequency' | 'outlier_handling' }> = [
  { label: '가장 얻고 싶은 효과', questionCode: 'q_purpose', key: 'purpose' },
  { label: '가장 힘든 점', questionCode: 'q_pain_point', key: 'main_problem' },
  { label: '정리 빈도', questionCode: 'q_cleanup_frequency', key: 'cleanup_frequency' },
  { label: '이상치 처리 방식', questionCode: 'q_outlier_handling', key: 'outlier_handling' },
];

export function DashboardPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { profile, status, error } = useProfile(user);

  useEffect(() => {
    if (status === 'empty' || (status === 'success' && !profile.onboarding_completed)) {
      navigate('/onboarding', { replace: true });
    }
  }, [status, profile, navigate]);

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Header />
      <main className="flex items-center justify-center px-6 pt-32 pb-24">
        <Card className="w-full max-w-[480px]">
          {(status === 'idle' || status === 'loading') && (
            <p className="text-sm text-[#767676]">프로필 정보를 불러오는 중입니다...</p>
          )}

          {status === 'error' && <p className="text-sm text-red-500">{error}</p>}

          {status === 'success' && profile.onboarding_completed && (
            <>
              <h1 className="text-2xl font-bold text-[#1A1A1A]">
                {profile.email ? `${profile.email}님, 환영합니다!` : '환영합니다!'}
              </h1>
              <p className="text-sm text-[#767676] mt-2">{getDashboardMessage(profile.purpose)}</p>

              <div className="mt-6 flex flex-col gap-3 border-t border-[#E5E5E5] pt-6">
                {SUMMARY_ROWS.map((row) => (
                  <div key={row.key} className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-[#767676]">{row.label}</span>
                    <span className="text-[#1A1A1A] font-medium text-right">
                      {getAnswerLabel(row.questionCode, profile[row.key]) ?? '-'}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
}
