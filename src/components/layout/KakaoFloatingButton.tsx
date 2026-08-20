import { siteConfig } from "@/lib/site-config";

/**
 * 카카오톡 상담 고정형(플로팅) 버튼.
 * - 공개 사이트 전용 (ConditionalChrome에서 /admin 경로일 때는 렌더링하지 않음)
 * - 모바일에서는 하단 고정바(MobileStickyBar, md:hidden)와 겹치지 않도록 그 위쪽에 위치
 * - 데스크톱에서는 화면 우측 하단에 고정
 * - siteConfig.kakaoChannelUrl 값을 카카오톡 채널 관리자센터에서 발급받은
 *   채널 채팅 URL(예: https://pf.kakao.com/_xxxxxxx/chat)로 교체하면 바로 연동됩니다.
 */
export default function KakaoFloatingButton() {
  return (
    <a
      href={siteConfig.kakaoChannelUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="카카오톡으로 상담 문의하기"
      className="fixed bottom-24 right-4 z-50 flex items-center gap-2 rounded-full bg-[#FEE500] py-3 pl-3 pr-4 shadow-lg shadow-black/15 transition-transform duration-200 hover:scale-105 active:scale-95 md:bottom-8 md:right-8"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5">
        {/* 카카오톡 말풍선 아이콘 (간략화) */}
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="#191600"
          aria-hidden="true"
        >
          <path d="M12 3.5C6.75 3.5 2.5 6.86 2.5 11c0 2.64 1.76 4.96 4.42 6.29-.2.72-.71 2.58-.82 2.98-.13.49.18.49.38.36.16-.1 2.5-1.7 3.52-2.4.65.09 1.32.14 2 .14 5.25 0 9.5-3.36 9.5-7.5S17.25 3.5 12 3.5Z" />
        </svg>
      </span>
      <span className="hidden text-sm font-bold text-[#191600] sm:inline">
        카톡 상담
      </span>
    </a>
  );
}
