import Link from "next/link";
import { Images, MessageSquareText, Newspaper } from "lucide-react";

import {
  getAllBannersAdmin,
  getAllConsultationsAdmin,
  getAllNoticesAdmin,
} from "@/lib/admin/data";

export const revalidate = 0;

export default async function AdminOverviewPage() {
  const [banners, consultations, notices] = await Promise.all([
    getAllBannersAdmin(),
    getAllConsultationsAdmin(),
    getAllNoticesAdmin(),
  ]);

  const pendingCount = consultations.filter((c) => c.status === "대기").length;

  const cards = [
    {
      href: "/admin/banners",
      label: "등록된 배너",
      value: banners.length,
      sub: `${banners.filter((b) => b.is_active).length}개 노출 중`,
      icon: Images,
    },
    {
      href: "/admin/consultations",
      label: "상담 신청",
      value: consultations.length,
      sub: `대기 ${pendingCount}건`,
      icon: MessageSquareText,
    },
    {
      href: "/admin/notices",
      label: "공지사항",
      value: notices.length,
      sub: "전체 게시글",
      icon: Newspaper,
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold">대시보드</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        한국장례서비스 홈페이지 콘텐츠를 관리합니다.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
              <card.icon className="h-5 w-5" />
            </div>
            <div className="mt-4 text-2xl font-bold">{card.value}</div>
            <div className="text-sm font-medium text-foreground/80">
              {card.label}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{card.sub}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
