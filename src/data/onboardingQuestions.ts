import type { OnboardingQuestion } from '@/types/onboarding';

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    questionCode: 'q_purpose',
    prompt: '이 앱을 통해 가장 얻고 싶은 효과는 무엇인가요?',
    options: [
      { code: 'time_saving', label: '반복 정리에 드는 시간 절약' },
      { code: 'accuracy_improvement', label: '실수·누락 없이 정확하게 정리' },
      { code: 'trend_insight', label: '통계·추이를 한눈에 파악' },
    ],
  },
  {
    questionCode: 'q_pain_point',
    prompt: '데이터 정리 과정에서 가장 힘든 점은 무엇인가요?',
    options: [
      { code: 'time_consuming', label: '정리에 시간이 너무 오래 걸림' },
      { code: 'error_prone', label: '정리 중 실수·누락이 자주 생김' },
      { code: 'hard_to_track_trends', label: '통계나 추세 파악이 어려움' },
    ],
  },
  {
    questionCode: 'q_cleanup_frequency',
    prompt: '지금 데이터 정리는 얼마나 자주 하고 계신가요?',
    options: [
      { code: 'daily', label: '매일' },
      { code: 'weekly', label: '주 1회' },
      { code: 'monthly_or_less', label: '월 1회 이하' },
    ],
  },
  {
    questionCode: 'q_outlier_handling',
    prompt: '비정상치(이상치)로 판단된 데이터는 어떻게 처리되길 원하세요?',
    options: [
      { code: 'exclude_from_aggregation', label: '집계에서 아예 제외' },
      { code: 'flag_and_include', label: '플래그만 표시하고 집계엔 포함' },
      { code: 'use_default', label: '아직 모르겠음 (기본값 사용)' },
    ],
  },
];
