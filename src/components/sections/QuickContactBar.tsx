"use client";

import * as React from "react";
import { ArrowRight, Phone } from "lucide-react";

import ConsultationModal from "@/components/contact/ConsultationModal";
import { siteConfig } from "@/lib/site-config";

/**
 * PC 화면 하단에 고정으로 떠 있는 콜센터/카카오톡 상담/상담신청 플로팅 버튼 3개.
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
      <div className="mx-auto flex max-w-4xl gap-4">
        <a
          href={`tel:${phone}`}
          className="group flex flex-1 items-center justify-between rounded-2xl bg-[rgb(220,38,38)] px-6 py-4 text-white shadow-xl transition hover:opacity-90"
        >
          <span className="animate-text-shimmer bg-gradient-to-r from-white/50 via-white to-white/50 bg-[length:200%_100%] bg-clip-text text-base font-bold text-transparent">
            365일 24시 전화 상담하기
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition group-hover:bg-white/25">
            <Phone className="h-4 w-4" />
          </span>
        </a>
        <a
          href={siteConfig.kakaoChannelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-1 items-center justify-between rounded-2xl bg-[#FEE500] px-6 py-4 text-[#191600] shadow-xl transition hover:opacity-90"
        >
          <span className="text-base font-bold">카카오톡 상담하기</span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/5 transition group-hover:bg-black/10">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
              <path d="M12 3.5C6.75 3.5 2.5 6.86 2.5 11c0 2.64 1.76 4.96 4.42 6.29-.2.72-.71 2.58-.82 2.98-.13.49.18.49.38.36.16-.1 2.5-1.7 3.52-2.4.65.09 1.32.14 2 .14 5.25 0 9.5-3.36 9.5-7.5S17.25 3.5 12 3.5Z" />
            </svg>
          </span>
        </a>
        <ConsultationModal phone={phone}>
          <button
            type="button"
            className="group flex flex-1 items-center justify-between rounded-2xl bg-[#000] px-6 py-4 text-white shadow-xl transition hover:bg-black/90"
          >
            <span className="text-base font-bold">무료 상담 신청</span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 transition group-hover:bg-white/30">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        </ConsultationModal>
      </div>
    </div>
  );
}
