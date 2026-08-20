import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * 로그인된 사용자를 반환합니다. 로그인되어 있지 않으면 /admin/login 으로 리다이렉트합니다.
 * 대시보드 레이아웃뿐 아니라, 데이터를 변경하는 각 Server Action 시작부에서도 호출해
 * (미들웨어와 별개로) 이중으로 인증을 검증하세요.
 */
export async function requireAdminUser() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Supabase 환경변수가 없으면 인증 확인 자체가 불가능하므로 로그인 화면으로 보냅니다.
    // (로그인 페이지에서 안내 문구로 원인을 알려줍니다.)
    redirect("/admin/login");
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}
