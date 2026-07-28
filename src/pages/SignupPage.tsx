import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { supabase } from '@/api/supabase';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsEmailConfirm, setNeedsEmailConfirm] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    setIsLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      navigate('/');
      return;
    }

    setNeedsEmailConfirm(true);
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Header />
      <main className="flex items-center justify-center px-6 pt-32 pb-24">
        <Card className="w-full max-w-[400px]">
          <h1 className="text-2xl font-bold text-[#1A1A1A] mb-1">회원가입</h1>
          <p className="text-sm text-[#767676] mb-8">이메일과 비밀번호로 계정을 만드세요.</p>

          {needsEmailConfirm ? (
            <div className="text-sm text-[#333333] bg-emerald-50 border border-emerald-200 rounded p-4">
              가입 확인 이메일을 보냈습니다. 메일함을 확인해주세요.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <Input
                label="이메일"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
              <Input
                label="비밀번호"
                type="password"
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="8자 이상"
                minLength={8}
                required
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" fullWidth isLoading={isLoading}>
                회원가입
              </Button>
            </form>
          )}

          <p className="text-sm text-[#767676] mt-6 text-center">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="text-[#0057D8] font-medium hover:underline">
              로그인
            </Link>
          </p>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
