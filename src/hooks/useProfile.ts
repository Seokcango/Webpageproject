import { useEffect, useState } from 'react';

import type { User } from '@supabase/supabase-js';

import { supabase } from '@/api/supabase';
import type { ProfileSummary } from '@/types/profile';

const PROFILE_COLUMNS = 'id, email, onboarding_completed, purpose, main_problem, cleanup_frequency, outlier_handling';

type ProfileState =
  | { status: 'idle'; profile: null; error: null }
  | { status: 'loading'; profile: null; error: null }
  | { status: 'success'; profile: ProfileSummary; error: null }
  | { status: 'empty'; profile: null; error: null }
  | { status: 'error'; profile: null; error: string };

const IDLE_STATE: ProfileState = { status: 'idle', profile: null, error: null };

export function useProfile(user: User | null): ProfileState {
  const [state, setState] = useState<ProfileState>(IDLE_STATE);

  useEffect(() => {
    if (!user) {
      setState(IDLE_STATE);
      return;
    }

    let cancelled = false;
    setState({ status: 'loading', profile: null, error: null });

    supabase
      .from('profiles')
      .select(PROFILE_COLUMNS)
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;

        if (error) {
          setState({ status: 'error', profile: null, error: error.message });
          return;
        }

        if (!data) {
          setState({ status: 'empty', profile: null, error: null });
          return;
        }

        setState({ status: 'success', profile: data as ProfileSummary, error: null });
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  return state;
}
