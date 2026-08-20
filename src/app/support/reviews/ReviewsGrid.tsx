"use client";

import { useState } from "react";
import { ImageIcon, Star } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
          <Card key={r.id}>
            <CardHeader>
              <div className="flex gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <CardDescription className="pt-2 leading-relaxed text-foreground/80">
                &ldquo;{r.content}&rdquo;
              </CardDescription>
              <CardTitle className="pt-2 text-sm font-medium text-muted-foreground">
                {r.name} | {formatDate(r.review_date)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                onClick={() => r.image_url && setLightboxSrc(r.image_url)}
                className={cn(
                  "flex h-24 w-full items-center justify-center overflow-hidden rounded-md bg-muted/50",
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
            </CardContent>
          </Card>
        ))}
      </div>

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </>
  );
}
