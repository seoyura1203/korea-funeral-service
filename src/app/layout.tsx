import type { Metadata } from "next";

import "./globals.css";
import ConditionalChrome from "@/components/layout/ConditionalChrome";
import Footer from "@/components/sections/Footer";
import { getSiteSettings } from "@/lib/queries";
import { siteConfig } from "@/lib/site-config";

// site_settings가 어드민에서 바뀌면 바로 반영되도록 매 요청마다 새로 조회합니다.
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const keywords = settings.keywords
    ? settings.keywords.split(",").map((k) => k.trim()).filter(Boolean)
    : undefined;

  return {
    metadataBase: new URL("https://www.koreafuneral.co.kr"),
    title: {
      default: settings.site_name,
      template: `%s | ${settings.site_name}`,
    },
    description: settings.site_description ?? undefined,
    keywords,
    icons: settings.favicon_url ? { icon: settings.favicon_url } : undefined,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      title: settings.og_title ?? settings.site_name,
      description: settings.og_description ?? settings.site_description ?? undefined,
      siteName: settings.site_name,
      images: settings.og_image_url ? [{ url: settings.og_image_url }] : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 헤더/모바일 하단바 등 사이트 전역에서 쓰는 전화번호를 여기서 한 번만 조회해
  // ConditionalChrome(클라이언트 컴포넌트)에 prop으로 내려줍니다. 이렇게 하면
  // 어드민에서 전화번호를 바꿨을 때 푸터뿐 아니라 헤더/모바일 메뉴/히어로/빠른 상담바에도
  // 동일하게 반영됩니다.
  const settings = await getSiteSettings();
  const phone = settings.phone || siteConfig.phone;

  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <ConditionalChrome phone={phone} footer={<Footer />}>
          {children}
        </ConditionalChrome>
      </body>
    </html>
  );
}
