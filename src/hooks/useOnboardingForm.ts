import { useState } from 'react';

import { ONBOARDING_QUESTIONS } from '@/data/onboardingQuestions';
import type { AnswerCode, OnboardingAnswers } from '@/types/onboarding';
import { isOnboardingComplete } from '@/utils/onboarding';

export function useOnboardingForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<OnboardingAnswers>({});

  const totalSteps = ONBOARDING_QUESTIONS.length;
  const currentQuestion = ONBOARDING_QUESTIONS[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === totalSteps - 1;
  const canGoNext = Boolean(answers[currentQuestion.questionCode]);
  const canSubmit = isOnboardingComplete(answers);

  function selectAnswer(code: AnswerCode) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.questionCode]: code }));
  }

  function goNext() {
    if (!canGoNext || isLastStep) return;
    setStepIndex((index) => index + 1);
  }

  function goPrev() {
    if (isFirstStep) return;
    setStepIndex((index) => index - 1);
  }

  return {
    stepIndex,
    totalSteps,
    currentQuestion,
    answers,
    isFirstStep,
    isLastStep,
    canGoNext,
    canSubmit,
    selectAnswer,
    goNext,
    goPrev,
  };
}
