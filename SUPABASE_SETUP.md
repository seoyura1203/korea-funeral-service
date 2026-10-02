# Supabase 연동 가이드

이 프로젝트는 배너, 상담 신청, 공지사항, 고객후기, 사이트 설정(SEO/OG/회사정보) 데이터를 [Supabase](https://supabase.com)에서 관리합니다.

## 1. Supabase 프로젝트 생성

1. https://supabase.com 에서 새 프로젝트를 생성합니다. (리전은 Seoul 권장)
2. 프로젝트 생성이 끝나면 좌측 메뉴 **Project Settings > API** 로 이동해 아래 값을 확인합니다.
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` 키 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` 키 → `SUPABASE_SERVICE_ROLE_KEY` (서버 전용, 절대 외부 노출 금지)

## 2. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 만들고 `.env.example`을 참고해 값을 채웁니다.

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

`.env.local`은 `.gitignore`에 포함되어 있어 커밋되지 않습니다.

### 상담 신청 이메일 알림 (선택)

상담 신청이 접수될 때마다 이메일로 알림을 받고 싶다면 아래 값을 추가로 설정합니다. (안 하면 알림 없이 기존처럼 DB 저장만 됩니다.)

1. https://resend.com 에서 무료로 가입합니다. (매달 3,000통까지 무료)
2. 대시보드의 **API Keys** 메뉴에서 키를 발급받아 `RESEND_API_KEY`에 넣습니다.
3. 알림을 받을 이메일 주소를 `NOTIFY_EMAIL`에 넣습니다. (여러 명이면 콤마로 구분)

```env
RESEND_API_KEY=re_xxxxxxxx
NOTIFY_EMAIL=owner@example.com
```

도메인 인증을 따로 하지 않으면 발신자는 `onboarding@resend.dev`로 고정됩니다(수신에는 문제없습니다). 나중에 회사 도메인 메일(예: `no-reply@한국의전서비스도메인`)로 보내고 싶다면 Resend 대시보드에서 도메인을 인증한 뒤 `RESEND_FROM_EMAIL`을 추가로 설정하면 됩니다.

배포 환경(Vercel 등)에서는 프로젝트 설정의 Environment Variables에 `RESEND_API_KEY`, `NOTIFY_EMAIL`을 동일하게 추가해야 실제로 알림이 발송됩니다.

## 3. 테이블 및 스토리지 생성 (SQL 실행)

1. Supabase 대시보드 **SQL Editor**로 이동합니다.
2. `supabase/schema.sql` 파일 내용을 그대로 붙여넣고 실행(Run)합니다.

이 스크립트가 하는 일:

- `banners`, `consultations`, `notices`, `reviews`, `site_settings` 테이블 생성 (컬럼 구성은 아래 표 참고)
- 모든 테이블에 Row Level Security(RLS) 활성화 및 정책 적용
  - `banners`, `notices`, `reviews`, `site_settings`: 누구나 조회 가능 (관리자만 쓰기)
  - `consultations`: 누구나 등록(insert)만 가능, 조회/수정은 `service_role` 키로만 가능 (개인정보 보호)
- `site-assets` public 스토리지 버킷 생성 및 정책 적용 (읽기는 누구나, 업로드/수정/삭제는 인증된 사용자 또는 `service_role`)
- 공지사항 샘플 데이터 3건 + 고객후기 샘플 데이터 6건 + `site_settings` 기본값 1건(id=1) 삽입

스크립트는 `create table if not exists`, `drop policy if exists` 등으로 작성되어 있어 **몇 번을 다시 실행해도 안전**합니다. 기능이 추가될 때마다(예: 이번 `reviews` 추가) 전체 SQL을 다시 실행하면 새로 생긴 부분만 반영됩니다.

| 테이블 | 컬럼 |
| --- | --- |
| `banners` | `id, title, subtitle, image_url, link_url, is_active, display_order, created_at` |
| `consultations` | `id, name, phone, message, status(대기\|완료), created_at` |
| `notices` | `id, title, content, created_at` |
| `reviews` | `id, name, review_date, content, created_at` |
| `site_settings` | `id(=1 고정), site_name, site_description, keywords, favicon_url, og_title, og_description, og_image_url, company_name, owner_name, business_number, mos_number, address, phone, fax, email, copyright_text, updated_at` |

## 4. 배너 이미지 업로드 (site-assets 버킷)

1. Supabase 대시보드 **Storage > site-assets** 에서 `banners/` 폴더를 만들고 이미지를 업로드하거나,
2. 코드에서 `src/lib/storage.ts`의 `uploadSiteAsset(file, "banners")`를 호출합니다. (인증된 사용자 또는 관리자 API에서 실행)
3. 업로드된 파일의 public URL을 `banners.image_url` 컬럼에 저장하면 메인 히어로 슬라이더에 바로 반영됩니다.
   - `image_url`이 비어 있으면 그라디언트 배경으로 자동 대체되므로, 이미지 없이 텍스트 배너만 등록해도 정상 노출됩니다.

## 5. 로컬에서 확인하기

```bash
npm install
npm run dev
```

- 메인 페이지(`/`)는 서버 컴포넌트에서 `banners`(활성 배너)를 직접 조회해 렌더링합니다.
- `notices`(공지사항)는 현재 공개 사이트(메인/메뉴)에는 노출되지 않고 `/admin/notices`에서만 관리합니다.
- `reviews`(고객후기)는 메인 페이지 리뷰 슬라이더와 `/support/reviews` 페이지에 "이름 | 날짜" 형식으로 노출되며, `/admin/reviews`에서 등록·수정·삭제할 수 있습니다.
- 메인 페이지 상단 "빠른 상담 신청" 바와 `/contact` 페이지의 상담 폼은 제출 시 `consultations` 테이블에 실제로 `insert` 됩니다.
- 환경변수를 아직 설정하지 않았다면 위 기능들은 자동으로 내장된 기본 데이터(fallback)를 보여주므로 화면이 비어 보이지 않습니다. 단, 상담 신청은 저장되지 않고 안내 메시지가 표시됩니다.

## 6. 어드민 페이지 (`/admin`)

배너·상담신청·공지사항·고객후기를 관리하는 어드민 대시보드가 포함되어 있습니다. Supabase Auth(이메일/비밀번호)로 로그인합니다.

### 6-1. 관리자 계정 만들기

이 프로젝트에는 회원가입 화면이 없습니다(보안상 의도된 설계). 아래 방법 중 하나로 계정을 미리 만들어 두세요.

- **대시보드에서 생성**: Supabase 대시보드 **Authentication > Users > Add user** 에서 이메일/비밀번호를 직접 입력해 계정을 만듭니다. ("Auto Confirm User"를 켜면 이메일 인증 없이 바로 로그인할 수 있습니다.)
- **SQL로 생성**은 권장하지 않습니다 (비밀번호 해시 처리 때문에 대시보드/Admin API 사용을 권장합니다).

### 6-2. 로그인 및 사용

1. `npm run dev` 실행 후 `http://localhost:3000/admin/login` 접속
2. 위에서 만든 이메일/비밀번호로 로그인
3. 로그인하면 `/admin`(대시보드) → 사이드바에서 **배너 관리 / 상담 신청 목록 / 공지사항 관리 / 리뷰 관리**로 이동

각 메뉴에서 할 수 있는 일:

| 메뉴 | 경로 | 기능 |
| --- | --- | --- |
| 배너 관리 | `/admin/banners` | 배너 등록(이미지 업로드 포함), 목록 조회, 노출 순서 변경(▲▼), 노출/숨김 토글, 삭제 |
| 상담 신청 목록 | `/admin/consultations` | 전체/대기/완료 필터, 상태 변경(대기 ↔ 완료) |
| 공지사항 관리 | `/admin/notices` | 등록, 인라인 수정, 삭제 |
| 리뷰 관리 | `/admin/reviews` | 고객후기 등록(작성자/날짜/내용), 인라인 수정, 삭제 — 저장 즉시 메인 페이지와 `/support/reviews`에 반영 |
| 사이트 설정 | `/admin/settings` | SEO(사이트명/설명/키워드), 파비콘, OG 소셜 공유(제목/설명/이미지), 회사·사업자 정보, 푸터 저작권 문구 |

배너/파비콘/OG 이미지를 첨부하면 서버에서 바로 `site-assets/` 버킷에 업로드하고 공개 URL을 DB에 저장합니다 — Storage 버킷에 수동으로 파일을 올릴 필요가 없습니다.

**사이트 설정을 저장하면 즉시 반영되는 곳:**

- `<title>`, `<meta description>`, `<meta keywords>` — `src/app/layout.tsx`의 `generateMetadata`
- 파비콘(`<link rel="icon">`), 오픈그래프(카카오톡/페이스북 공유 미리보기)
- 전체 페이지 하단 푸터의 회사명/대표자/사업자등록번호/통신판매신고번호/주소/연락처/저작권 문구

### 6-3. 인증/보안 구조

- `src/middleware.ts` — `/admin/*` 요청마다 Supabase 세션을 확인해, 미로그인 시 `/admin/login`으로, 로그인 상태로 `/admin/login` 접근 시 `/admin`으로 리다이렉트합니다.
- `src/app/admin/(dashboard)/layout.tsx` — 미들웨어와 별개로 서버 컴포넌트 단에서 세션을 한 번 더 검증합니다.
- 모든 데이터 변경(배너/공지 등록·삭제, 상담 상태 변경)은 `src/app/admin/**/actions.ts`의 Server Action에서 처리하며, 각 액션 시작부에서 `requireAdminUser()`로 로그인 여부를 재확인한 뒤 `createSupabaseAdminClient()`(service role, RLS 우회)로 실제 쓰기 작업을 수행합니다.
- 로그인 자체는 anon key + 쿠키 세션(`@supabase/ssr`)을 사용하며, service role 키는 브라우저에 절대 노출되지 않습니다.

## 7. 타입 재생성 (선택)

Supabase CLI가 설치되어 있다면, 스키마 변경 후 아래 명령으로 `src/types/supabase.ts`를 자동 생성된 최신 타입으로 교체할 수 있습니다.

```bash
npx supabase gen types typescript --project-id <PROJECT_ID> > src/types/supabase.ts
```
