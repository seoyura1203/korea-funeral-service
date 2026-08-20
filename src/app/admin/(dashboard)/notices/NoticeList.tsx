"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatDateTime } from "@/lib/format";
import type { Notice } from "@/types/supabase";
import { deleteNoticeAction, updateNoticeAction } from "./actions";

function NoticeRow({ notice }: { notice: Notice }) {
  const router = useRouter();
  const [editing, setEditing] = React.useState(false);
  const [title, setTitle] = React.useState(notice.title);
  const [content, setContent] = React.useState(notice.content);
  const [pending, setPending] = React.useState(false);

  async function handleSave() {
    setPending(true);
    try {
      const result = await updateNoticeAction(notice.id, { title, content });
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
    if (!confirm(`"${notice.title}" 공지를 삭제할까요?`)) return;
    setPending(true);
    try {
      const result = await deleteNoticeAction(notice.id);
      if (result?.error) alert(result.error);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  if (editing) {
    return (
      <div className="space-y-3 bg-card p-4">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <div className="flex gap-2">
          <Button type="button" size="sm" disabled={pending} onClick={handleSave}>
            {pending ? "저장 중..." : "저장"}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={pending}
            onClick={() => {
              setTitle(notice.title);
              setContent(notice.content);
              setEditing(false);
            }}
          >
            <X className="h-4 w-4" />
            취소
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 bg-card p-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1">
        <p className="font-medium">{notice.title}</p>
        <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
          {notice.content}
        </p>
        <p className="mt-1.5 text-xs text-muted-foreground">
          {formatDateTime(notice.created_at)}
        </p>
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

export default function NoticeList({ notices }: { notices: Notice[] }) {
  if (notices.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        등록된 공지사항이 없습니다.
      </p>
    );
  }

  return (
    <div className="divide-y divide-border overflow-hidden rounded-lg border border-border">
      {notices.map((notice) => (
        <NoticeRow key={notice.id} notice={notice} />
      ))}
    </div>
  );
}
