export type QuestionCode = 'q_purpose' | 'q_pain_point' | 'q_cleanup_frequency' | 'q_outlier_handling';

export type AnswerCode =
  | 'time_saving'
  | 'accuracy_improvement'
  | 'trend_insight'
  | 'time_consuming'
  | 'error_prone'
  | 'hard_to_track_trends'
  | 'daily'
  | 'weekly'
  | 'monthly_or_less'
  | 'exclude_from_aggregation'
  | 'flag_and_include'
  | 'use_default';

export type OnboardingOption = {
  code: AnswerCode;
  label: string;
};

export type OnboardingQuestion = {
  questionCode: QuestionCode;
  prompt: string;
  options: OnboardingOption[];
};

export type OnboardingAnswers = Partial<Record<QuestionCode, AnswerCode>>;

export type CompletedOnboardingAnswers = Record<QuestionCode, AnswerCode>;
