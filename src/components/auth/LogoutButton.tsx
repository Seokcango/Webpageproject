import { supabase } from '@/api/supabase';
import { Button } from '@/components/ui/Button';

export function LogoutButton() {
  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      로그아웃
    </Button>
  );
}
