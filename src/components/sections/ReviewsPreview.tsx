"use client";

import * as React from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ChevronLeft, ChevronRight, ImageIcon, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import type { Review } from "@/types/supabase";
import ImageLightbox from "@/components/reviews/ImageLightbox";

const AUTOPLAY_MS = 5000;

export default function ReviewsPreview({ reviews }: { reviews: Review[] }) {
  const [lightboxSrc, setLightboxSrc] = React.useState<string | null>(null);
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

  if (reviews.length === 0) return null;

  return (
    <section className="section-padding bg-secondary/40">
      <div className="container">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold md:text-3xl">
              고객이 남긴 이야기
            </h2>
          </div>
          <Link
            href="/support/reviews"
            className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            전체보기
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="relative mt-8">
          {/* 좌측 화살표 (모바일에서는 숨김) */}
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="이전 후기"
            className="absolute left-0 top-1/2 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-primary sm:flex md:-left-6 lg:-left-10 xl:-left-14"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* 슬라이드 트랙 */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ml-6 flex">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%]"
                >
                  <div className="flex h-80 flex-col rounded-xl border border-border bg-card p-5 sm:h-[21rem]">
                    <div className="flex gap-0.5 text-amber-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="mt-2.5 line-clamp-4 text-sm leading-relaxed text-foreground/80">
                      &ldquo;{r.content}&rdquo;
                    </p>
                    <div className="mt-auto">
                      <p className="pt-2 text-xs font-medium text-muted-foreground">
                        {r.name} | {formatDate(r.review_date)}
                      </p>
                      <div
                        onClick={() => r.image_url && setLightboxSrc(r.image_url)}
                        className={cn(
                          "mt-3 flex h-24 w-full items-center justify-center overflow-hidden rounded-md bg-muted/50",
                          r.image_url && "cursor-pointer"
                        )}
                      >
                        {r.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={r.image_url}
                            alt=""
                            className="h-full w-full object-cover transition-transform hover:scale-105"
                          />
                        ) : (
                          <ImageIcon className="h-4 w-4 text-muted-foreground/30" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 우측 화살표 (모바일에서는 숨김) */}
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="다음 후기"
            className="absolute right-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-primary sm:flex md:-right-6 lg:-right-10 xl:-right-14"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* 인디케이터 */}
        <div className="mt-6 flex items-center justify-center gap-1.5">
          {reviews.map((r, idx) => (
            <button
              key={r.id}
              type="button"
              onClick={() => emblaApi?.scrollTo(idx)}
              aria-label={`${idx + 1}번째 후기 보기`}
              className={`h-1.5 rounded-full transition-all ${
                idx === selectedIndex ? "w-5 bg-primary" : "w-1.5 bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </section>
  );
}
