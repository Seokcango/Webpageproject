import type { ProfileSummary } from '@/types/profile';

type PurposeCode = 'time_saving' | 'accuracy_improvement' | 'trend_insight';

const DEFAULT_DASHBOARD_MESSAGE = '온보딩을 완료한 사용자만 볼 수 있는 화면입니다.';

const PURPOSE_DASHBOARD_MESSAGES: Record<PurposeCode, string> = {
  time_saving: '반복 정리에 드는 시간, 여기서부터 줄여볼게요.',
  accuracy_improvement: '실수·누락 없이 정확하게 정리하는 것부터 시작해볼게요.',
  trend_insight: '통계·추이를 한눈에 파악하는 것부터 시작해볼게요.',
};

function isPurposeCode(value: string): value is PurposeCode {
  return value in PURPOSE_DASHBOARD_MESSAGES;
}

export function getDashboardMessage(purpose: ProfileSummary['purpose']): string {
  if (!purpose || !isPurposeCode(purpose)) {
    return DEFAULT_DASHBOARD_MESSAGE;
  }

  return PURPOSE_DASHBOARD_MESSAGES[purpose];
}
