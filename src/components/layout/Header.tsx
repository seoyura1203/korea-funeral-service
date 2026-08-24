"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/site-config";
import MobileNav from "@/components/layout/MobileNav";
import ConsultationModal from "@/components/contact/ConsultationModal";

export default function Header({ phone }: { phone: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const [consultOpen, setConsultOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      {/* 상단 유틸리티 바 */}
      <div className="hidden border-b border-border bg-brand-900 text-brand-50 md:block">
        <div className="container flex h-9 items-center justify-end gap-6 text-xs">
          <span>연중무휴 24시간 상담</span>
          <a href={`tel:${phone}`} className="flex items-center gap-1 font-medium">
            <Phone className="h-3 w-3" />
            {phone}
          </a>
        </div>
      </div>

      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/brand/logo.png"
            alt="한국장례서비스"
            width={857}
            height={151}
            priority
            className="h-7 w-auto md:h-9"
          />
        </Link>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden md:flex md:items-center md:gap-1">
          {mainNav.map((item, idx) => (
            <div
              key={item.title}
              className="relative"
              onMouseEnter={() => setOpenIndex(idx)}
              onMouseLeave={() => setOpenIndex(null)}
            >
              {item.href === "/contact" ? (
                <button
                  type="button"
                  onClick={() => setConsultOpen(true)}
                  className="inline-flex h-20 items-center px-4 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.title}
                </button>
              ) : item.href ? (
                <Link
                  href={item.href}
                  className="inline-flex h-20 items-center px-4 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              ) : (
                <button className="inline-flex h-20 items-center px-4 text-sm font-medium text-foreground transition-colors hover:text-primary">
                  {item.title}
                </button>
              )}

              {item.items && (
                <div
                  className={cn(
                    "absolute left-1/2 top-full min-w-[220px] -translate-x-1/2 rounded-lg border border-border bg-card p-2 shadow-lg transition-all",
                    openIndex === idx
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-2 opacity-0"
                  )}
                >
                  {item.items.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <div className="font-medium">{sub.title}</div>
                      {sub.description && (
                        <div className="text-xs text-muted-foreground">
                          {sub.description}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* 24시간 고객센터 버튼: 모바일/PC 공통, 반응형 크기만 다름. 전화 연결 */}
          <a
            href={`tel:${phone}`}
            className="animate-cta-pulse-soft rounded-full bg-[rgb(255,224,224)] px-3 py-1.5 text-xs font-bold text-red-500 transition hover:bg-red-100 md:px-5 md:py-2.5 md:text-sm"
          >
            24시간 고객센터
          </a>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="메뉴 열기"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <MobileNav
        open={isOpen}
        onOpenChange={setIsOpen}
        phone={phone}
        onConsultClick={() => {
          setIsOpen(false);
          setConsultOpen(true);
        }}
      />
      <ConsultationModal
        phone={phone}
        open={consultOpen}
        onOpenChange={setConsultOpen}
      />
    </header>
  );
}
