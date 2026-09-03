"use client";

import { useState } from "react";
import { ImageIcon, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";
import type { Review } from "@/types/supabase";
import ImageLightbox from "@/components/reviews/ImageLightbox";

export default function ReviewsGrid({ reviews }: { reviews: Review[] }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="flex flex-col rounded-xl border border-border bg-card p-5"
          >
            <div className="flex gap-0.5 text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="mt-2.5 line-clamp-4 h-[5.75rem] text-sm leading-relaxed text-foreground/80">
              &ldquo;{r.content}&rdquo;
            </p>
            <p className="mt-3 text-xs font-medium text-muted-foreground">
              {r.name} | {formatDate(r.review_date)}
            </p>
            <div
              onClick={() => r.image_url && setLightboxSrc(r.image_url)}
              className={cn(
                "mt-3 flex aspect-square w-full items-center justify-center overflow-hidden rounded-md bg-muted/50",
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
        ))}
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </>
  );
}
