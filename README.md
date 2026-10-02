# 한국의전서비스 웹사이트

Next.js(App Router) + TypeScript + Tailwind CSS + shadcn/ui + Supabase 기반 상조 서비스 웹사이트입니다. 공개 사이트와 `/admin` 관리자 대시보드로 구성되어 있습니다.

## 실행 방법

```bash
npm install
cp .env.example .env.local   # Supabase 값 채우기 (SUPABASE_SETUP.md 참고)
npm run dev
```

`http://localhost:3000` 에서 공개 사이트를, `http://localhost:3000/admin/login` 에서 관리자 대시보드를 확인할 수 있습니다.
Supabase 프로젝트 생성부터 테이블/스토리지 설정, 관리자 계정 만들기까지는
[`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md) 를 참고하세요.

## 폴더 구조

```
src/
  middleware.ts            # /admin 인증 가드 (미로그인 시 로그인 페이지로 리다이렉트)
  app/
    layout.tsx              # 루트 레이아웃 (ConditionalChrome으로 공개/어드민 분기)
    page.tsx                # 메인 페이지 (Supabase에서 배너/공지 서버 조회)
    about/, services/, support/, contact/   # 공개 사이트 페이지
    admin/
      login/page.tsx, actions.ts            # 관리자 로그인 (Supabase Auth)
      (dashboard)/layout.tsx                # 사이드바 대시보드 레이아웃 (인증 가드)
      (dashboard)/banners/                  # 배너 관리 (목록/등록/이미지 업로드/순서변경/삭제)
      (dashboard)/consultations/            # 상담 신청 목록 + 상태 변경
      (dashboard)/notices/                  # 공지사항 등록/수정/삭제
      (dashboard)/settings/                 # 사이트 설정 (SEO/OG/파비콘/회사정보)
  components/
    layout/                  # Header, ConditionalChrome, MobileNav, PageHeader, MobileStickyBar
    sections/                 # 메인 페이지 섹션 (Hero/QuickContact/ServiceCards/Process/NoticeReviews/Footer)
                               # Footer는 Supabase site_settings를 조회하는 async 서버 컴포넌트
    admin/                    # AdminSidebar 등 어드민 전용 컴포넌트
    contact/                  # 상담문의 폼
    ui/                      # shadcn/ui 기반 공통 컴포넌트
  lib/
    utils.ts, format.ts, site-config.ts
    supabase.ts               # 공용/관리자(service role) Supabase 클라이언트
    supabase/                 # Auth 세션용 SSR 클라이언트 (server.ts/client.ts/middleware.ts)
    queries.ts                 # 공개 사이트용 조회/등록 헬퍼 (fallback 포함)
    storage.ts                  # site-assets 스토리지 헬퍼
    admin/                      # 어드민 전용 데이터 조회(data.ts) 및 인증 가드(guard.ts)
  types/
    supabase.ts                 # Database 타입 및 도메인 타입
supabase/
  schema.sql                    # 테이블/RLS/스토리지 버킷 SQL (Supabase SQL Editor에서 실행)
```

## 디자인 톤앤매너

- 브라운/베이지/무채색 팔레트 (`tailwind.config.ts`의 `brand`, `beige` 컬러 및 `globals.css`의 CSS 변수)
- 신뢰감을 주는 세리프 헤드라인 + 산세리프 본문 조합, enosh.or.kr 스타일 참고
- 모바일: 하단 고정 상담/전화 바, 슬라이드형 모바일 메뉴
- 데스크톱: 히어로 배너 아래 겹치는 24시간 상담 바(`QuickContactBar`), 드롭다운 내비게이션
- 어드민(`/admin`)은 공개 사이트 Header/Footer 없이 별도 사이드바 레이아웃 사용

## Supabase 연동 요약

| 영역 | 공개 사이트 | 관리자(`/admin`) |
| --- | --- | --- |
| `banners` | 활성 배너만 히어로 슬라이더에 노출 | 전체 조회, 등록(이미지 업로드), 순서변경, 노출토글, 삭제 |
| `consultations` | 등록(insert)만 가능 | 전체 조회, 상태 변경(대기 ↔ 완료) |
| `notices` | 조회만 가능 | 등록, 수정, 삭제 |
| `site_settings` (id=1 고정) | 전체 페이지 메타데이터·푸터에 반영 | SEO/OG/파비콘/회사정보 수정 |
| `site-assets` 버킷 | 이미지 공개 조회 | 배너·파비콘·OG 이미지 등록 시 서버에서 자동 업로드 |

공개 사이트는 anon key로 RLS 정책을 그대로 따르고, 관리자 기능은 로그인(Supabase Auth) 확인 후
service role 키(`createSupabaseAdminClient`)로 RLS를 우회해 데이터를 관리합니다.
환경변수가 없으면 공개 사이트는 내장 fallback 데이터로 자동 대체되어 화면이 비어 보이지 않습니다.

`site_settings`을 저장하면 `revalidatePath("/", "layout")`로 루트 레이아웃 전체(메타데이터 +
푸터)가 즉시 갱신됩니다. `getSiteSettings()`는 React `cache()`로 감싸져 있어 같은 요청 안에서
`generateMetadata`와 `Footer`가 각각 호출해도 Supabase 조회는 1번만 발생합니다.

## 다음 단계로 고려할 것

- 배너 드래그 앤 드롭 순서 변경 (현재는 ▲▼ 버튼으로 인접 항목과 순서 교환)
- 후기(`reviews`) 테이블화 및 어드민 관리 화면 (현재는 소개용 고정 콘텐츠)
- 관리자 계정 초대/역할(권한) 관리 UI
- `npx shadcn@latest add [component]` 로 필요한 shadcn 컴포넌트 추가 가능 (components.json 설정 완료)
