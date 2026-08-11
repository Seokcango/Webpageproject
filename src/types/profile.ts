export type Profile = {
  id: string;
  email: string | null;
  onboarding_completed: boolean;
  purpose: string | null;
  main_problem: string | null;
  cleanup_frequency: string | null;
  outlier_handling: string | null;
  created_at: string;
  updated_at: string;
};

export type ProfileSummary = Pick<
  Profile,
  'id' | 'email' | 'onboarding_completed' | 'purpose' | 'main_problem' | 'cleanup_frequency' | 'outlier_handling'
>;
