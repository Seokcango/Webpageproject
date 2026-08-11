import { Button } from '@/components/ui/Button';
import type { AnswerCode, OnboardingQuestion } from '@/types/onboarding';

type OnboardingQuestionStepProps = {
  question: OnboardingQuestion;
  selectedCode?: AnswerCode;
  onSelect: (code: AnswerCode) => void;
};

export function OnboardingQuestionStep({ question, selectedCode, onSelect }: OnboardingQuestionStepProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-[#1A1A1A]">{question.prompt}</h2>
      <div className="flex flex-col gap-2.5">
        {question.options.map((option) => (
          <Button
            key={option.code}
            type="button"
            variant={selectedCode === option.code ? 'primary' : 'outline'}
            fullWidth
            className="justify-start text-left"
            onClick={() => onSelect(option.code)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
