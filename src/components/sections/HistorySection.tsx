"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import { history } from "@/lib/history-data";

const AUTOPLAY_MS = 5000;

/**
 * /about 페이지의 "연혁 및 주요 이력"을 메인 페이지에도 노출하는 섹션입니다.
 * PC(lg 이상)에서는 3장씩 보이되, 화살표를 누르면 카드 1개씩 이동하는
 * 무한 루프 슬라이더입니다. 리뷰 섹션과 동일하게 자동 재생 + 하단 페이지네이션이
 * 함께 동작합니다.
 */
export default function HistorySection() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const autoplay = React.useRef(
    Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: false })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    autoplay.current,
  ]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="section-padding">
      <div className="container">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold md:text-3xl">
              대한민국의 마지막 순간, 그 곁을 지켜왔습니다.
            </h2>
            <p className="mt-3 text-muted-foreground">
              전직 대통령 국민장부터 국가적 추모 행사까지 — 숫자가 아닌
              신뢰로 증명해온 한국의전서비스의 기록입니다.
            </p>
          </div>
          <Link
            href="/about"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary sm:flex"
          >
            회사소개 더보기
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="relative mt-10">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="이전 이력"
            className="absolute left-0 top-1/2 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-primary sm:flex md:-left-6 lg:-left-10 xl:-left-14"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-6 flex">
              {history.map((h) => (
                <div
                  key={h.title}
                  className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%]"
                >
                  <div className="overflow-hidden rounded-xl border border-border bg-card">
                    <div className="relative aspect-[450/339] w-full">
                      <Image
                        src={h.image}
                        alt={h.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                      />
                    </div>
                    <div className="p-5">
                      <p className="font-semibold text-foreground">
                        {h.title}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {h.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="다음 이력"
            className="absolute right-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-primary sm:flex md:-right-6 lg:-right-10 xl:-right-14"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* 인디케이터 */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {history.map((h, idx) => (
            <button
              key={h.title}
              type="button"
              onClick={() => emblaApi?.scrollTo(idx)}
              aria-label={`${idx + 1}번째 이력 보기`}
              className={`h-1.5 rounded-full transition-all ${
                idx === selectedIndex ? "w-5 bg-primary" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>

        <div className="mt-4 text-center sm:hidden">
          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            회사소개 더보기
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
