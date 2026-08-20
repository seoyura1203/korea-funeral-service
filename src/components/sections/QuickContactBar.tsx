"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

/**
 * PC 화면 하단에 고정으로 떠 있는 콜센터/상담신청 플로팅 버튼 2개.
 * 화면 가장자리에 붙는 얇은 바 대신, 여백을 두고 둥근 버튼 형태로 떠 있습니다.
 * 모바일은 MobileStickyBar가 별도로 담당하므로 md 이상에서만 표시합니다.
 * 푸터가 화면에 가까워지면(교차하기 직전) 버튼이 페이드 아웃되어 푸터를
 * 가리지 않습니다.
 */
export default function QuickContactBar({ phone }: { phone: string }) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "0px 0px 120px 0px", threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-6 bottom-6 z-40 hidden transition-opacity duration-500 ease-out md:block ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-3xl gap-4">
        <a
          href={`tel:${phone}`}
          className="group flex flex-1 items-center justify-between rounded-2xl bg-foreground px-6 py-4 text-white shadow-xl transition hover:opacity-90"
        >
          <span className="text-base font-semibold">365일 24시 전화 상담하기</span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition group-hover:bg-white/25">
            <Phone className="h-4 w-4" />
          </span>
        </a>
        <Link
          href="/contact"
          className="group flex flex-1 items-center justify-between rounded-2xl bg-primary px-6 py-4 text-primary-foreground shadow-xl transition hover:bg-primary/90"
        >
          <span className="text-base font-semibold">무료 상담 신청</span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 transition group-hover:bg-white/30">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
