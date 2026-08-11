-- =========================================================
-- 1) public.profiles 테이블 생성
--    - id: auth.users(id)를 참조하는 PK/FK. 유저 삭제 시 이 행도 함께 삭제(cascade)
--    - 온보딩 답변 4문항은 질문마다 개별 text 컬럼으로 분리 저장
-- =========================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  onboarding_completed boolean not null default false,

  -- 목적 질문 (q_purpose). 저장값: time_saving | accuracy_improvement | trend_insight
  purpose text,

  -- 문제 질문 (q_pain_point). 저장값: time_consuming | error_prone | hard_to_track_trends
  main_problem text,

  -- 기대 기능 질문 - 정리 빈도 (q_cleanup_frequency). 저장값: daily | weekly | monthly_or_less
  cleanup_frequency text,

  -- 기대 기능 질문 - 이상치 처리 (q_outlier_handling). 저장값: exclude_from_aggregation | flag_and_include | use_default
  outlier_handling text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- =========================================================
-- 2) RLS 활성화
-- =========================================================
alter table public.profiles enable row level security;

-- =========================================================
-- 3) RLS 정책: select / insert / update 각각 "자기 자신의 행만" 허용
--    재실행 시 에러 방지를 위해 기존 정책이 있으면 먼저 삭제(데이터 삭제 아님)
-- =========================================================
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles
  for insert
  with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- =========================================================
-- 4) auth.users에 신규 가입자가 생기면 public.profiles에
--    대응 행(id, email)을 자동 생성하는 트리거 함수 + 트리거
--    security definer로 RLS를 우회해 삽입할 수 있도록 하고,
--    search_path를 명시해 함수 하이재킹을 방지
-- =========================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();
