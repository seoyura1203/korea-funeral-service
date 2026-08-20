-- ============================================================================
-- 한국장례서비스 Supabase 스키마
-- Supabase 대시보드 > SQL Editor 에서 그대로 실행하면 됩니다.
-- ============================================================================

-- 확장 (gen_random_uuid 사용을 위해)
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. banners : 메인 페이지 히어로 배너 슬라이더
-- ----------------------------------------------------------------------------
create table if not exists public.banners (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  subtitle      text,
  image_url     text,
  link_url      text,
  is_active     boolean not null default true,
  display_order integer not null default 0,
  created_at    timestamptz not null default now()
);

comment on table public.banners is '메인 히어로 배너 슬라이드';
comment on column public.banners.title is '배너 헤드카피';
comment on column public.banners.subtitle is '배너 서브카피/설명';
comment on column public.banners.image_url is 'site-assets 버킷에 업로드된 배너 이미지 URL';
comment on column public.banners.link_url is '배너 클릭 시 이동할 경로 (예: /contact)';
comment on column public.banners.is_active is '노출 여부';
comment on column public.banners.display_order is '노출 순서 (오름차순)';

create index if not exists banners_active_order_idx
  on public.banners (is_active, display_order);

-- ----------------------------------------------------------------------------
-- 2. consultations : 상담 신청 (빠른 상담 폼 / 상담문의 폼 공용)
-- ----------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'consultation_status') then
    create type public.consultation_status as enum ('대기', '완료');
  end if;
end
$$;

create table if not exists public.consultations (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null,
  message    text,
  status     public.consultation_status not null default '대기',
  created_at timestamptz not null default now()
);

comment on table public.consultations is '상담 신청 접수 내역';
comment on column public.consultations.name is '신청자 성함';
comment on column public.consultations.phone is '신청자 연락처';
comment on column public.consultations.message is '문의 내용 (선택)';
comment on column public.consultations.status is '처리 상태: 대기 | 완료';

create index if not exists consultations_status_created_idx
  on public.consultations (status, created_at desc);

-- ----------------------------------------------------------------------------
-- 3. notices : 공지사항
-- ----------------------------------------------------------------------------
create table if not exists public.notices (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  content    text not null,
  created_at timestamptz not null default now()
);

comment on table public.notices is '공지사항';

create index if not exists notices_created_idx
  on public.notices (created_at desc);

-- ----------------------------------------------------------------------------
-- 3-1. reviews : 고객후기 (메인 페이지 슬라이더 + /support/reviews 목록)
-- ----------------------------------------------------------------------------
create table if not exists public.reviews (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  review_date  date not null default current_date,
  content      text not null,
  image_url    text,
  created_at   timestamptz not null default now()
);

-- 이미 reviews 테이블이 존재하는 환경(기존에 스크립트를 실행한 적 있는 경우)에도
-- 안전하게 컬럼이 추가되도록 alter table을 별도로 실행합니다.
alter table public.reviews add column if not exists image_url text;

comment on table public.reviews is '고객후기';
comment on column public.reviews.name is '작성자 표시명 (예: 김OO 님)';
comment on column public.reviews.review_date is '후기 작성/이용 날짜';
comment on column public.reviews.content is '후기 본문';
comment on column public.reviews.image_url is 'site-assets 버킷에 업로드된 첨부 이미지 URL (선택)';

create index if not exists reviews_date_idx
  on public.reviews (review_date desc);

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================

alter table public.banners       enable row level security;
alter table public.consultations enable row level security;
alter table public.notices       enable row level security;
alter table public.reviews       enable row level security;

-- banners : 활성화된 배너는 누구나 조회 가능. 쓰기는 service_role(관리자)만.
drop policy if exists "banners_public_select" on public.banners;
create policy "banners_public_select"
  on public.banners for select
  to anon, authenticated
  using (is_active = true);

-- notices : 누구나 조회 가능. 쓰기는 service_role(관리자)만.
drop policy if exists "notices_public_select" on public.notices;
create policy "notices_public_select"
  on public.notices for select
  to anon, authenticated
  using (true);

-- reviews : 누구나 조회 가능. 쓰기는 service_role(관리자)만.
drop policy if exists "reviews_public_select" on public.reviews;
create policy "reviews_public_select"
  on public.reviews for select
  to anon, authenticated
  using (true);

-- consultations : 누구나 등록(insert)만 가능. 조회/수정/삭제는 service_role(관리자)만.
-- 유가족의 개인정보(성함/연락처)가 담기므로 anon key로는 select를 허용하지 않습니다.
drop policy if exists "consultations_public_insert" on public.consultations;
create policy "consultations_public_insert"
  on public.consultations for insert
  to anon, authenticated
  with check (true);

-- 참고: service_role 키는 RLS를 우회하므로 관리자 페이지/서버 API에서는
-- SUPABASE_SERVICE_ROLE_KEY 를 사용해 banners/notices insert·update, consultations
-- 목록 조회 및 status 변경(대기 → 완료)을 처리하면 됩니다. (해당 키는 절대
-- 브라우저에 노출하지 말고 서버 전용 환경변수로만 사용하세요.)

-- ============================================================================
-- Storage: site-assets 버킷 (배너 및 사이트 이미지 등록용, public read)
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do update set public = true;

-- 누구나 site-assets 버킷의 파일을 읽을 수 있음 (public 버킷)
drop policy if exists "site_assets_public_read" on storage.objects;
create policy "site_assets_public_read"
  on storage.objects for select
  to public
  using (bucket_id = 'site-assets');

-- 인증된 사용자(관리자 로그인 등)만 업로드 가능
drop policy if exists "site_assets_authenticated_insert" on storage.objects;
create policy "site_assets_authenticated_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-assets');

-- 인증된 사용자만 수정/삭제 가능
drop policy if exists "site_assets_authenticated_update" on storage.objects;
create policy "site_assets_authenticated_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'site-assets');

drop policy if exists "site_assets_authenticated_delete" on storage.objects;
create policy "site_assets_authenticated_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-assets');

-- 참고: 별도 관리자 로그인을 붙이기 전까지는 이미지 업로드/삭제를 서버 전용
-- SUPABASE_SERVICE_ROLE_KEY로 처리(예: 관리자 API 라우트)하는 것을 권장합니다.
-- 그 경우 위 authenticated 정책 없이도 service_role 키가 RLS를 우회해 동작합니다.

-- ============================================================================
-- 4. site_settings : 사이트 환경설정 (단일 레코드 관리 구조 - 항상 id=1)
-- ============================================================================
create table if not exists public.site_settings (
  id                  smallint primary key default 1 check (id = 1),

  -- SEO / 메타데이터
  site_name           text not null default '한국장례서비스',
  site_description    text,
  keywords            text, -- 쉼표(,)로 구분된 키워드 문자열

  -- 파비콘 / OG(오픈그래프)
  favicon_url         text,
  og_title            text,
  og_description      text,
  og_image_url        text,

  -- 회사/사업자 정보 (푸터 및 통신판매업 고지에 사용)
  company_name        text not null default '한국장례서비스',
  owner_name          text,
  business_number     text,
  mos_number          text, -- 통신판매업신고번호
  address             text,
  phone               text,
  fax                 text,
  email               text,
  copyright_text      text,

  updated_at          timestamptz not null default now()
);

comment on table public.site_settings is '사이트 SEO/OG/회사정보 환경설정 (단일 레코드, id=1 고정)';
comment on column public.site_settings.keywords is '쉼표로 구분된 SEO 키워드 (예: 상조,장례,장례식장)';
comment on column public.site_settings.mos_number is '통신판매업신고번호';

alter table public.site_settings enable row level security;

-- 사이트 전체(메타태그·푸터)에 노출되는 정보이므로 조회는 누구나 가능합니다.
-- 쓰기는 정책을 두지 않아 anon/authenticated 모두 차단되고, service_role(관리자)만 가능합니다.
drop policy if exists "site_settings_public_select" on public.site_settings;
create policy "site_settings_public_select"
  on public.site_settings for select
  to anon, authenticated
  using (true);

-- updated_at 자동 갱신 트리거
create or replace function public.set_site_settings_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_site_settings_updated_at on public.site_settings;
create trigger trg_site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_site_settings_updated_at();

-- 기본값 시드 (이미 있으면 건드리지 않음)
insert into public.site_settings (
  id, site_name, site_description, keywords,
  og_title, og_description,
  company_name, owner_name, business_number, mos_number,
  address, phone, email, copyright_text
) values (
  1,
  '한국장례서비스',
  '정직과 예를 다하는 장례 상조 서비스. 24시간 전문 상담을 통해 소중한 분을 품격있게 모십니다.',
  '상조,장례,장례식장,상조회사,장례서비스,한국장례서비스',
  '한국장례서비스',
  '정직과 예를 다하는 장례 상조 서비스. 24시간 전문 상담을 통해 소중한 분을 품격있게 모십니다.',
  '한국장례서비스',
  '홍길동',
  '000-00-00000',
  '제0000-서울강남-00000호',
  '서울특별시 강남구 테헤란로 000, 0층',
  '1588-0000',
  'contact@koreafuneral.co.kr',
  '한국장례서비스. All rights reserved.'
)
on conflict (id) do nothing;

-- ============================================================================
-- (선택) 샘플 데이터
-- ============================================================================

insert into public.notices (title, content) values
  ('여름철 폭염 대비 빈소 운영 안내', '여름철 폭염에 대비하여 전 지점 빈소 냉방을 강화 운영합니다.'),
  ('전국 협력 장례식장 확대 안내', '전국 협력 장례식장이 480곳에서 500곳으로 확대되었습니다.'),
  ('홈페이지 개편 및 온라인 상담 신청 오픈 안내', '온라인으로 간편하게 상담을 신청하실 수 있도록 홈페이지를 개편했습니다.')
on conflict do nothing;

insert into public.reviews (name, review_date, content) values
  ('김OO 님', '2025-03-22', '새벽에 연락드렸는데도 바로 상담사분이 오셔서 정말 큰 도움이 되었습니다. 절차를 하나하나 알기 쉽게 설명해 주셨어요.'),
  ('이OO 님', '2025-01-15', '입관예배와 발인예배까지 목사님과의 소통을 세심하게 챙겨주셔서 감사했습니다.'),
  ('박OO 님', '2024-11-08', '견적이 투명하게 안내되어서 추가 비용 걱정 없이 진행할 수 있었습니다. 믿고 맡길 수 있는 곳입니다.'),
  ('최OO 님', '2024-09-30', '봉안당 선택부터 계약까지 함께해 주셔서 혼자 알아봐야 하는 부담이 훨씬 줄었습니다.'),
  ('정OO 님', '2024-08-12', '지방 소도시였는데도 동일한 품질로 서비스를 받을 수 있어 좋았습니다.'),
  ('한OO 님', '2024-06-05', '입관예배부터 발인예배까지 차분하게 진행해 주셔서 큰 위로가 되었습니다.')
on conflict do nothing;
