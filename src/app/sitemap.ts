import type { MetadataRoute } from "next";

const BASE_URL = "https://kuijeon.com";

// 검색엔진에 알려줄 공개 페이지 목록입니다. (어드민 페이지는 제외)
// 페이지를 새로 추가하면 아래 배열에 경로를 추가해 주세요.
const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services/products/mubinso", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/products/family", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/products/general", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/products/vip", priority: 0.9, changeFrequency: "monthly" },
  { path: "/services/process", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services/estimate", priority: 0.7, changeFrequency: "monthly" },
  { path: "/support/reviews", priority: 0.8, changeFrequency: "weekly" },
  { path: "/support/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${BASE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
