import { create } from 'zustand';

import type { Session, User } from '@supabase/supabase-js';

import { supabase } from '@/api/supabase';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

type AuthState = {
  session: Session | null;
  user: User | null;
  status: AuthStatus;
};

export const useAuthStore = create<AuthState>(() => ({
  session: null,
  user: null,
  status: 'loading',
}));

supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.setState({
    session,
    user: session?.user ?? null,
    status: session ? 'authenticated' : 'unauthenticated',
  });
});
