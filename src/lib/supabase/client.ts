"use client";

import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/types/supabase";

/**
 * 브라우저(클라이언트 컴포넌트)에서 로그인 세션을 사용하는 Supabase 클라이언트가
 * 필요할 때 사용합니다. (현재 어드민 로그인/로그아웃은 Server Action으로 처리하므로
 * 필수는 아니지만, 클라이언트 사이드에서 세션 상태를 구독해야 할 경우를 위해 제공합니다.)
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );
}
