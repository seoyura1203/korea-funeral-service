import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/types/supabase";

/**
 * 서버 컴포넌트 / Server Action / Route Handler에서 사용하는, 로그인 세션(쿠키)을
 * 인식하는 Supabase 클라이언트입니다. 어드민 로그인 여부 확인(auth.getUser())에 사용합니다.
 *
 * 주의: 이 클라이언트는 anon key + 로그인 세션을 사용하므로 RLS가 그대로 적용됩니다.
 * banners/notices/consultations 관리자 CRUD처럼 RLS를 우회해야 하는 작업은
 * `createSupabaseAdminClient()`(src/lib/supabase.ts, service role key)를 사용하세요.
 */
export function createSupabaseServerClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options: CookieOptions }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Component 렌더링 중에는 쿠키를 쓸 수 없어 예외가 발생합니다.
            // 세션 갱신은 middleware(src/middleware.ts)가 담당하므로 무시해도 안전합니다.
          }
        },
      },
    }
  );
}
