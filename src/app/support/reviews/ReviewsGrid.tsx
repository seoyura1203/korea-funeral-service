import { Star } from "lucide-react";

import { formatDate } from "@/lib/format";
import type { Review } from "@/types/supabase";

export default function ReviewsGrid({ reviews }: { reviews: Review[] }) {
  return (
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
        </div>
      ))}
    </div>
  );
}
