import { ONBOARDING_QUESTIONS } from '@/data/onboardingQuestions';
import type { CompletedOnboardingAnswers, OnboardingAnswers, QuestionCode } from '@/types/onboarding';

export function isOnboardingComplete(answers: OnboardingAnswers): answers is CompletedOnboardingAnswers {
  return ONBOARDING_QUESTIONS.every((question) => Boolean(answers[question.questionCode]));
}

export function getAnswerLabel(questionCode: QuestionCode, code: string | null): string | null {
  if (!code) return null;
  const question = ONBOARDING_QUESTIONS.find((item) => item.questionCode === questionCode);
  return question?.options.find((option) => option.code === code)?.label ?? null;
}
