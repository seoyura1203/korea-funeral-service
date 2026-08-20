"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ImageOff, Pencil, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/format";
import type { Review } from "@/types/supabase";
import { deleteReviewAction, updateReviewAction } from "./actions";

function ReviewRow({ review }: { review: Review }) {
  const router = useRouter();
  const [editing, setEditing] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const formRef = React.useRef<HTMLFormElement>(null);

  async function handleSave() {
    if (!formRef.current) return;
    setPending(true);
    try {
      const formData = new FormData(formRef.current);
      const result = await updateReviewAction(review.id, formData);
      if (result?.error) {
        alert(result.error);
      } else {
        setEditing(false);
        router.refresh();
      }
    } finally {
      setPending(false);
    }
  }

  async function handleDelete() {
    if (!confirm(`"${review.name}" 님의 후기를 삭제할까요?`)) return;
    setPending(true);
    try {
      const result = await deleteReviewAction(review.id);
      if (result?.error) alert(result.error);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  if (editing) {
    return (
      <form ref={formRef} className="space-y-3 bg-card p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input name="name" defaultValue={review.name} placeholder="작성자" />
          <Input name="review_date" type="date" defaultValue={review.review_date} />
        </div>
        <Textarea name="content" defaultValue={review.content} rows={4} />

        <div className="space-y-1.5">
          <Label htmlFor={`image-${review.id}`}>첨부 이미지</Label>
          {review.image_url ? (
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={review.image_url}
                alt=""
                className="h-14 w-14 shrink-0 rounded-md object-cover"
              />
              <label className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <input type="checkbox" name="remove_image" value="true" />
                기존 이미지 삭제
              </label>
            </div>
          ) : null}
          <Input id={`image-${review.id}`} name="image" type="file" accept="image/*" />
          <p className="text-xs text-muted-foreground">
            새 이미지를 선택하면 기존 이미지를 대체합니다.
          </p>
        </div>

        <div className="flex gap-2">
          <Button type="button" size="sm" disabled={pending} onClick={handleSave}>
            {pending ? "저장 중..." : "저장"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={pending}
            onClick={() => setEditing(false)}
          >
            <X className="h-4 w-4" />
            취소
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex flex-col gap-3 bg-card p-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 flex-1 gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-secondary">
          {review.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.image_url}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageOff className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
        <div className="min-w-0">
          <p className="font-medium">
            {review.name}
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              {formatDate(review.review_date)}
            </span>
          </p>
          <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
            {review.content}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 gap-1.5">
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={pending}
          onClick={() => setEditing(true)}
          aria-label="수정"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          disabled={pending}
          onClick={handleDelete}
          aria-label="삭제"
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        등록된 고객후기가 없습니다.
      </p>
    );
  }

  return (
    <div className="divide-y divide-border overflow-hidden rounded-lg border border-border">
      {reviews.map((review) => (
        <ReviewRow key={review.id} review={review} />
      ))}
    </div>
  );
}
