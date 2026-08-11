-- profiles 마이그레이션 실행 후 확인용 쿼리 (SQL Editor에서 별도 실행)

-- RLS 활성화 여부 확인 (rowsecurity = true 여야 함)
select relname, relrowsecurity
from pg_class
where oid = 'public.profiles'::regclass;

-- 정책 3개(select/insert/update)가 모두 생성됐는지 확인
select policyname, cmd, qual, with_check
from pg_policies
where schemaname = 'public' and tablename = 'profiles';

-- 트리거가 auth.users에 걸려 있는지 확인
select tgname, tgrelid::regclass, tgenabled
from pg_trigger
where tgname = 'on_auth_user_created';
