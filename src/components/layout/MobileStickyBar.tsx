"use client";

import * as React from "react";
import { Phone } from "lucide-react";

import ConsultationModal from "@/components/contact/ConsultationModal";

/**
 * 모바일 하단 고정 바(전화 상담 / 빠른 상담신청). 데스크톱 QuickContactBar와
 * 동일하게, 푸터가 화면에 가까워지면 페이드 아웃되어 푸터를 가리지 않습니다.
 */
export default function MobileStickyBar({ phone }: { phone: string }) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "0px 0px 80px 0px", threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-opacity duration-500 ease-out md:hidden ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <a
        href={`tel:${phone}`}
        className="flex flex-1 items-center justify-center gap-2 bg-[rgb(220,38,38)] py-3.5 text-white"
      >
        <Phone className="h-4 w-4 shrink-0" />
        <span className="animate-text-shimmer bg-gradient-to-r from-white/50 via-white to-white/50 bg-[length:200%_100%] bg-clip-text text-sm font-bold text-transparent">
          전화 상담
        </span>
      </a>
      <ConsultationModal phone={phone}>
        <button
          type="button"
          className="flex flex-1 items-center justify-center bg-[#000] py-3.5 text-sm font-bold text-white"
        >
          무료 상담 신청
        </button>
      </ConsultationModal>
    </div>
  );
}
