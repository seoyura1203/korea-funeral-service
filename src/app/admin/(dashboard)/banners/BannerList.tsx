"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, ImageOff, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Banner } from "@/types/supabase";
import {
  deleteBannerAction,
  moveBannerAction,
  toggleBannerActiveAction,
} from "./actions";

export default function BannerList({ banners }: { banners: Banner[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  async function run(id: string, fn: () => Promise<{ error?: string } | void>) {
    setPendingId(id);
    try {
      const result = await fn();
      if (result?.error) {
        alert(result.error);
      }
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  if (banners.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        등록된 배너가 없습니다. 위 폼에서 첫 배너를 등록해 보세요.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {banners.map((banner, idx) => (
        <div
          key={banner.id}
          className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center"
        >
          <div className="flex h-16 w-28 shrink-0 items-center justify-center overflow-hidden rounded-md bg-secondary">
            {banner.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={banner.image_url}
                alt={banner.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageOff className="h-5 w-5 text-muted-foreground" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="truncate font-medium">{banner.title}</span>
              <Badge variant={banner.is_active ? "default" : "secondary"}>
                {banner.is_active ? "노출중" : "비노출"}
              </Badge>
            </div>
            {banner.subtitle && (
              <p className="mt-0.5 truncate text-sm text-muted-foreground">
                {banner.subtitle}
              </p>
            )}
            <p className="mt-0.5 text-xs text-muted-foreground">
              순서 {banner.display_order}
              {banner.link_url ? ` · 링크: ${banner.link_url}` : ""}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={pendingId === banner.id || idx === 0}
              onClick={() => run(banner.id, () => moveBannerAction(banner.id, "up"))}
              aria-label="위로 이동"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={pendingId === banner.id || idx === banners.length - 1}
              onClick={() => run(banner.id, () => moveBannerAction(banner.id, "down"))}
              aria-label="아래로 이동"
            >
              <ArrowDown className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={pendingId === banner.id}
              onClick={() =>
                run(banner.id, () =>
                  toggleBannerActiveAction(banner.id, !banner.is_active)
                )
              }
            >
              {banner.is_active ? "숨기기" : "노출하기"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={pendingId === banner.id}
              onClick={() => {
                if (confirm(`"${banner.title}" 배너를 삭제할까요?`)) {
                  run(banner.id, () => deleteBannerAction(banner.id));
                }
              }}
              aria-label="삭제"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
