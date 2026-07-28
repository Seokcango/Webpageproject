import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { supabase } from '@/api/supabase';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    setIsLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    navigate('/');
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Header />
      <main className="flex items-center justify-center px-6 pt-32 pb-24">
        <Card className="w-full max-w-[400px]">
          <h1 className="text-2xl font-bold text-[#1A1A1A] mb-1">로그인</h1>
          <p className="text-sm text-[#767676] mb-8">계정 정보를 입력해주세요.</p>

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
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호"
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" fullWidth isLoading={isLoading}>
              로그인
            </Button>
          </form>

          <p className="text-sm text-[#767676] mt-6 text-center">
            계정이 없으신가요?{' '}
            <Link to="/signup" className="text-[#0057D8] font-medium hover:underline">
              회원가입
            </Link>
          </p>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
