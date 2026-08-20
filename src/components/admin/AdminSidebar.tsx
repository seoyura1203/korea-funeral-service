"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Images,
  LogOut,
  MessageSquareText,
  Newspaper,
  Settings,
  Star,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/admin/login/actions";
import { siteConfig } from "@/lib/site-config";

const NAV_ITEMS = [
  { href: "/admin/banners", label: "배너 관리", icon: Images },
  { href: "/admin/consultations", label: "상담 신청 목록", icon: MessageSquareText },
  { href: "/admin/notices", label: "공지사항 관리", icon: Newspaper },
  { href: "/admin/reviews", label: "리뷰 관리", icon: Star },
  { href: "/admin/settings", label: "사이트 설정", icon: Settings },
];

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  return (
    <>
      {/* 데스크톱 사이드바 */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card md:flex">
        <div className="border-b border-border p-5">
          <div className="font-serif text-lg font-bold text-primary">
            {siteConfig.name}
          </div>
          <div className="text-xs text-muted-foreground">관리자 대시보드</div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {NAV_ITEMS.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-3">
          <div className="truncate px-3 py-1 text-xs text-muted-foreground">
            {userEmail}
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <LogOut className="h-4 w-4" />
              로그아웃
            </button>
          </form>
        </div>
      </aside>

      {/* 모바일 상단 탭 바 */}
      <div className="flex flex-col border-b border-border bg-card md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="font-serif text-base font-bold text-primary">
            {siteConfig.name} 관리자
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-1 text-xs text-muted-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              로그아웃
            </button>
          </form>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3">
          {NAV_ITEMS.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
