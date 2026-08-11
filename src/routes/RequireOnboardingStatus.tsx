import { Navigate, Outlet } from 'react-router-dom';

import { useProfile } from '@/hooks/useProfile';
import { useAuthStore } from '@/store/useAuthStore';

type RequireOnboardingStatusProps = {
  requireCompleted: boolean;
};

export function RequireOnboardingStatus({ requireCompleted }: RequireOnboardingStatusProps) {
  const user = useAuthStore((state) => state.user);
  const { profile, status } = useProfile(user);

  if (status === 'idle' || status === 'loading') return null;
  if (status === 'error' || status === 'empty') return null;

  if (profile.onboarding_completed !== requireCompleted) {
    return <Navigate to={requireCompleted ? '/onboarding' : '/dashboard'} replace />;
  }

  return <Outlet />;
}
