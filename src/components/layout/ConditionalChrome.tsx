"use client";

import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header";
// 카카오톡 상담 버튼은 요청으로 잠시 비활성화했습니다. 다시 켜려면 아래 import와
// <KakaoFloatingButton /> 렌더링 부분의 주석을 해제하세요.
// import KakaoFloatingButton from "@/components/layout/KakaoFloatingButton";
import MobileStickyBar from "@/components/layout/MobileStickyBar";

/**
 * /admin 경로에서는 공개 사이트의 헤더/푸터/모바일 하단바를 숨깁니다.
 * 어드민은 별도의 대시보드 레이아웃(사이드바)을 사용하는 완전히 다른 화면이기 때문입니다.
 *
 * Footer는 Supabase에서 회사정보를 조회하는 async 서버 컴포넌트라서, 클라이언트
 * 컴포넌트인 이곳에서 직접 import/렌더링할 수 없습니다. 대신 루트 레이아웃(서버 컴포넌트)이
 * 미리 렌더링해 `footer` prop으로 내려줍니다.
 */
export default function ConditionalChrome({
  children,
  footer,
  phone,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
  phone: string;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header phone={phone} />
      <main className="flex-1">{children}</main>
      {footer}
      {/* <KakaoFloatingButton /> */}
      <MobileStickyBar phone={phone} />
    </>
  );
}
