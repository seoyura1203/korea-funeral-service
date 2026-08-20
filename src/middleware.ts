import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // /admin 하위 경로에서만 동작합니다. (공개 사이트에는 영향 없음)
  matcher: ["/admin/:path*"],
};
