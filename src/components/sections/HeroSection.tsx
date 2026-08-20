"use client";

import * as React from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { trustBadges } from "@/lib/site-config";
import type { Banner } from "@/types/supabase";

// image_url이 없는 배너(또는 fallback)일 때 순환 적용되는 그라디언트 팔레트
const GRADIENTS = [
  "from-brand-900 via-brand-800 to-brand-700",
  "from-stone-800 via-stone-700 to-brand-700",
  "from-brand-950 via-brand-800 to-stone-700",
];

type NormalizedSlide = {
  id: string;
  title: string;
  subtitle: string | null;
  href: string;
  imageUrl: string | null;
  gradient: string;
};

function normalizeBanner(banner: Banner, idx: number): NormalizedSlide {
  return {
    id: banner.id,
    title: banner.title,
    subtitle: banner.subtitle,
    href: banner.link_url || "/contact",
    imageUrl: banner.image_url,
    gradient: GRADIENTS[idx % GRADIENTS.length],
  };
}

// banners 테이블에 노출 가능한 배너가 하나도 없을 때(어드민에서 아직 등록 전, 또는
// 전부 비활성화한 경우) 화면이 비지 않도록 보여주는 기본 배너입니다.
const DEFAULT_FALLBACK_SLIDE: NormalizedSlide = {
  id: "default-fallback",
  title: "정직하고 투명한\n상조 서비스",
  subtitle: "숨겨진 비용 없이, 정직한 안내로 임종부터 발인까지 함께합니다.",
  href: "/contact",
  imageUrl: null,
  gradient: GRADIENTS[0],
};

export default function HeroSection({
  banners,
  phone,
}: {
  banners: Banner[];
  phone: string;
}) {
  const slides = React.useMemo(() => {
    const normalized = banners.map((b, idx) => normalizeBanner(b, idx));
    // 노출 가능한 배너가 없으면 기본 배너 1장으로 대체합니다.
    return normalized.length > 0 ? normalized : [DEFAULT_FALLBACK_SLIDE];
  }, [banners]);

  const autoplay = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

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
    <section className="relative overflow-hidden">
      {/* 상단 신뢰 배지 바 */}
      <div className="hidden border-b border-white/10 bg-brand-950 md:block">
        <div className="container flex h-10 items-center justify-center gap-8 text-xs text-brand-200">
          {trustBadges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.id} className="relative min-w-0 flex-[0_0_100%]">
              <div
                className={cn(
                  "relative flex min-h-[520px] items-center bg-gradient-to-br bg-cover bg-center md:min-h-[600px]",
                  !slide.imageUrl && slide.gradient
                )}
                style={
                  slide.imageUrl
                    ? { backgroundImage: `url(${slide.imageUrl})` }
                    : undefined
                }
              >
                {/* 이미지 배너일 때 텍스트 가독성을 위한 어두운 오버레이 */}
                {slide.imageUrl && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
                )}
                {!slide.imageUrl && (
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                )}
                <div className="container relative py-20 md:py-24">
                  <div className="max-w-xl">
                    <span className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-medium tracking-wide text-white">
                      정직하고 투명한 상조 서비스
                    </span>
                    <h1 className="mt-5 whitespace-pre-line font-serif text-3xl font-bold leading-tight text-white text-balance md:text-5xl">
                      {slide.title}
                    </h1>
                    {slide.subtitle && (
                      <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">
                        {slide.subtitle}
                      </p>
                    )}
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Button asChild size="lg" variant="secondary">
                        <Link href={slide.href}>무료 상담 신청</Link>
                      </Button>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                      >
                        <a href={`tel:${phone}`}>
                          <Phone className="h-4 w-4" />
                          {phone}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 좌우 화살표 */}
      {slides.length > 1 && (
        <>
          <button
            aria-label="이전 슬라이드"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/30 md:flex md:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="다음 슬라이드"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur transition hover:bg-white/30 md:flex md:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* 인디케이터 */}
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                aria-label={`${idx + 1}번 슬라이드로 이동`}
                onClick={() => emblaApi?.scrollTo(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  selectedIndex === idx ? "w-6 bg-white" : "w-1.5 bg-white/40"
                )}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
