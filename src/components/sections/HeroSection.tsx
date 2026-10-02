"use client";

import Image from "next/image";

/**
 * 히어로 섹션. PC/모바일 모두 동일한 구성입니다:
 * 1) 검은 배경의 "장례, 우리는 왜 미리 준비하기 어려울까요?" 말풍선 섹션
 * 2) 그 아래로 이어지는 정적 이미지(이미지 자체 하단에 흰색 페이드가 포함되어
 *    있어 다음 섹션과 자연스럽게 연결됩니다)
 * 두 영역은 이미지 상단의 검은 그라디언트로 부드럽게 이어집니다.
 */
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* 상조 가입 전 흔한 불안 요소 - 말풍선 3개 */}
      <div className="relative space-y-5 bg-black px-6 pb-10 pt-14 md:pb-14 md:pt-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="pb-1 text-center font-serif text-[2rem] font-bold leading-snug text-white md:text-4xl">
            장례, 우리는 왜 미리 준비하기 어려울까요?
          </h2>
          <div className="mt-5 space-y-5 md:mx-auto md:max-w-md">
            <div className="flex justify-start">
              <div
                className="relative max-w-[78%] animate-fade-in rounded-2xl bg-neutral-800 px-5 py-4 text-center text-base font-bold leading-snug text-white [animation-duration:0.7s] [animation-fill-mode:backwards]"
                style={{ animationDelay: "0ms" }}
              >
                장례, 추가비용이 너무 많이 붙어요.
                <span className="absolute -bottom-1.5 left-7 h-3 w-3 rotate-45 bg-neutral-800" />
              </div>
            </div>
            <div className="flex justify-end">
              <div
                className="relative max-w-[78%] animate-fade-in rounded-2xl bg-neutral-800 px-5 py-4 text-center text-base font-bold leading-snug text-white [animation-duration:0.7s] [animation-fill-mode:backwards]"
                style={{ animationDelay: "200ms" }}
              >
                달마다 부담스럽게 납입금을 내야해요.
                <span className="absolute -bottom-1.5 right-7 h-3 w-3 rotate-45 bg-neutral-800" />
              </div>
            </div>
            <div className="flex justify-start">
              <div
                className="relative max-w-[78%] animate-fade-in rounded-2xl bg-neutral-800 px-5 py-4 text-center text-base font-bold leading-snug text-white [animation-duration:0.7s] [animation-fill-mode:backwards]"
                style={{ animationDelay: "400ms" }}
              >
                상조 가입하기에 번거로워요.
                <span className="absolute -bottom-1.5 left-7 h-3 w-3 rotate-45 bg-neutral-800" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 이미지 */}
      <div className="relative aspect-[1623/2149] w-full md:hidden">
        <Image
          src="/images/hero-mobile.jpg"
          alt="한국의전서비스"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black to-transparent" />
        {/* 아래 섹션이 겹치는 지점(약 58% 지점) 전에 완전히 흰색이 되도록
            보장하는 하단 페이드입니다. */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_20%,white_50%)]" />
      </div>

      {/* PC 이미지 */}
      <div className="relative hidden aspect-[3840/1600] w-full md:block">
        <Image
          src="/images/hero-desktop.jpg"
          alt="한국의전서비스"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black to-transparent" />
      </div>
    </section>
  );
}
