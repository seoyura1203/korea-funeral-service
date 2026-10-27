import type { MetadataRoute } from "next";

const BASE_URL = "https://kuijeon.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // 관리자 페이지와 서버 API는 검색에 노출하지 않습니다.
        disallow: ["/admin", "/api"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
