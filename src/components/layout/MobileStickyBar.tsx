"use client";

import * as React from "react";
import { Phone } from "lucide-react";

import ConsultationModal from "@/components/contact/ConsultationModal";
import { siteConfig } from "@/lib/site-config";

/**
 * 모바일 하단 고정 바(전화 상담 / 카카오톡 상담 / 빠른 상담신청). 데스크톱
 * QuickContactBar와 동일하게, 푸터가 화면에 가까워지면 페이드 아웃되어
 * 푸터를 가리지 않습니다.
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
        className="flex flex-1 items-center justify-center gap-1.5 bg-[rgb(220,38,38)] py-3.5 text-white"
      >
        <Phone className="h-4 w-4 shrink-0" />
        <span className="animate-text-shimmer bg-gradient-to-r from-white/50 via-white to-white/50 bg-[length:200%_100%] bg-clip-text text-xs font-bold text-transparent">
          전화 상담
        </span>
      </a>
      <a
        href={siteConfig.kakaoChannelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-1.5 bg-[#FEE500] py-3.5 text-[#191600]"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
          <path d="M12 3.5C6.75 3.5 2.5 6.86 2.5 11c0 2.64 1.76 4.96 4.42 6.29-.2.72-.71 2.58-.82 2.98-.13.49.18.49.38.36.16-.1 2.5-1.7 3.52-2.4.65.09 1.32.14 2 .14 5.25 0 9.5-3.36 9.5-7.5S17.25 3.5 12 3.5Z" />
        </svg>
        <span className="text-xs font-bold">카톡 상담</span>
      </a>
      <ConsultationModal phone={phone}>
        <button
          type="button"
          className="flex flex-1 items-center justify-center bg-[#000] py-3.5 text-xs font-bold text-white"
        >
          무료 상담 신청
        </button>
      </ConsultationModal>
    </div>
  );
}
