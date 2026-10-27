"use client";

import * as React from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

// 네이버 애널리틱스 사이트 식별값
const NAVER_WA = "1cc21e010972630";

declare global {
  interface Window {
    wcs_add?: Record<string, string>;
    wcs_do?: () => void;
  }
}

/**
 * 네이버 애널리틱스(wcslog.js) 방문 통계 스크립트.
 * - 공개 사이트에서만 로드됩니다. (ConditionalChrome에서 /admin 경로는 제외)
 * - 페이지를 새로 불러올 때뿐 아니라, 메뉴 이동(클라이언트 라우팅) 시에도
 *   페이지뷰가 집계되도록 경로가 바뀔 때마다 wcs_do()를 호출합니다.
 */
export default function NaverAnalytics() {
  const pathname = usePathname();
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!loaded) return;
    window.wcs_add = window.wcs_add || {};
    window.wcs_add["wa"] = NAVER_WA;
    window.wcs_do?.();
  }, [loaded, pathname]);

  return (
    <Script
      src="https://wcs.pstatic.net/wcslog.js"
      strategy="afterInteractive"
      onLoad={() => setLoaded(true)}
    />
  );
}
