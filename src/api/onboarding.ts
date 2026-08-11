import { supabase } from '@/api/supabase';
import type { CompletedOnboardingAnswers } from '@/types/onboarding';

export async function submitOnboardingAnswers(
  userId: string,
  answers: CompletedOnboardingAnswers
): Promise<void> {
  const { error } = await supabase
    .from('profiles')
    .update({
      purpose: answers.q_purpose,
      main_problem: answers.q_pain_point,
      cleanup_frequency: answers.q_cleanup_frequency,
      outlier_handling: answers.q_outlier_handling,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw error;
  }
}
