import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import type { Database } from "@/types/supabase";

const ADMIN_LOGIN_PATH = "/admin/login";

/**
 * /admin/* 요청마다 Supabase 세션을 갱신하고, 로그인 여부에 따라
 * 로그인 페이지 ↔ 대시보드 사이를 리다이렉트합니다. (src/middleware.ts 에서 호출)
 */
export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Supabase 환경변수가 없으면 인증을 검증할 방법이 없습니다.
  // 로그인 자체가 항상 실패하므로 그대로 통과시키되, 콘솔에 경고만 남깁니다.
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "[middleware] Supabase 환경변수가 설정되지 않아 /admin 인증 검사를 건너뜁니다."
    );
    return NextResponse.next();
  }

  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request: { headers: request.headers } });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === ADMIN_LOGIN_PATH;

  if (!user && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = ADMIN_LOGIN_PATH;
    url.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(url);
  }

  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}
