import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** 환경변수가 채워져 있는지 여부. 값이 없으면 쿼리 헬퍼들이 안전한 fallback을 반환합니다. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured && typeof window === "undefined") {
  // 서버 콘솔에만 1회 경고 (빌드/개발 서버 로그)
  console.warn(
    "[supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY 가 설정되지 않았습니다. " +
      ".env.local 을 생성하고 값을 채워주세요. (.env.example 참고)"
  );
}

/**
 * 브라우저/서버 컴포넌트 어디서나 사용할 수 있는 공용 Supabase 클라이언트 (anon key).
 * banners/notices 조회, consultations 등록(insert) 등 RLS로 허용된 작업에 사용합니다.
 *
 * 환경변수가 비어 있어도 앱이 즉시 크래시하지 않도록 placeholder 값으로 초기화되며,
 * 실제 요청 시에만 실패합니다. 각 쿼리 헬퍼(src/lib/queries.ts)는 이 경우를 감지해
 * 안전한 기본값을 반환합니다.
 */
export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "public-anon-key-placeholder",
  {
    auth: {
      persistSession: false,
    },
  }
);

/**
 * 관리자 전용 클라이언트 (service role key). RLS를 우회하므로
 * 반드시 서버 환경(Route Handler, Server Action)에서만 사용하고
 * 클라이언트 컴포넌트에서 import 하지 마세요.
 *
 * 예) 상담 신청 목록 조회/상태 변경, 배너·공지 등록 등 관리자 기능.
 */
export function createSupabaseAdminClient(): SupabaseClient<Database> {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "[supabase] SUPABASE_SERVICE_ROLE_KEY / NEXT_PUBLIC_SUPABASE_URL 이 설정되지 않아 관리자 클라이언트를 생성할 수 없습니다."
    );
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });
}
