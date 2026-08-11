import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { submitOnboardingAnswers } from '@/api/onboarding';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { OnboardingProgress } from '@/components/onboarding/OnboardingProgress';
import { OnboardingQuestionStep } from '@/components/onboarding/OnboardingQuestionStep';
import { useOnboardingForm } from '@/hooks/useOnboardingForm';
import { useAuthStore } from '@/store/useAuthStore';
import { isOnboardingComplete } from '@/utils/onboarding';

export function OnboardingPage() {
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.user?.id);

  const {
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
  } = useOnboardingForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit() {
    if (isSubmitting || !userId) return;
    if (!isOnboardingComplete(answers)) return;

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      await submitOnboardingAnswers(userId, answers);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setSubmitError('답변을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.');
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Header />
      <main className="flex items-center justify-center px-6 pt-32 pb-24">
        <Card className="w-full max-w-[480px]">
          <OnboardingProgress current={stepIndex + 1} total={totalSteps} />

          <OnboardingQuestionStep
            question={currentQuestion}
            selectedCode={answers[currentQuestion.questionCode]}
            onSelect={selectAnswer}
          />

          {submitError && <p className="text-sm text-red-500 mt-4">{submitError}</p>}

          <div className="flex items-center justify-between gap-3 mt-8">
            <Button type="button" variant="outline" onClick={goPrev} disabled={isFirstStep || isSubmitting}>
              이전
            </Button>
            {isLastStep ? (
              <Button type="button" onClick={handleSubmit} disabled={!canSubmit} isLoading={isSubmitting}>
                완료
              </Button>
            ) : (
              <Button type="button" onClick={goNext} disabled={!canGoNext}>
                다음
              </Button>
            )}
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
