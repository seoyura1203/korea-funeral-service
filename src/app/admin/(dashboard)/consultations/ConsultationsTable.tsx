"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Phone } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import type { Consultation, ConsultationStatus } from "@/types/supabase";
import { updateConsultationStatusAction } from "./actions";

const FILTERS: { label: string; value: ConsultationStatus | "전체" }[] = [
  { label: "전체", value: "전체" },
  { label: "대기", value: "대기" },
  { label: "완료", value: "완료" },
];

export default function ConsultationsTable({
  consultations,
}: {
  consultations: Consultation[];
}) {
  const router = useRouter();
  const [filter, setFilter] = React.useState<ConsultationStatus | "전체">("전체");
  const [pendingId, setPendingId] = React.useState<string | null>(null);

  const filtered =
    filter === "전체"
      ? consultations
      : consultations.filter((c) => c.status === filter);

  async function toggleStatus(c: Consultation) {
    const next: ConsultationStatus = c.status === "대기" ? "완료" : "대기";
    setPendingId(c.id);
    try {
      const result = await updateConsultationStatusAction(c.id, next);
      if (result?.error) alert(result.error);
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
            }`}
          >
            {f.label}
            {f.value !== "전체" && (
              <span className="ml-1 text-xs opacity-70">
                ({consultations.filter((c) => c.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-border">
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            해당하는 상담 신청이 없습니다.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {filtered.map((c) => (
              <div key={c.id} className="flex flex-col gap-3 bg-card p-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{c.name}</span>
                    <a
                      href={`tel:${c.phone}`}
                      className="flex items-center gap-1 text-sm text-primary"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      {c.phone}
                    </a>
                    <Badge variant={c.status === "대기" ? "default" : "secondary"}>
                      {c.status}
                    </Badge>
                  </div>
                  {c.message && (
                    <p className="mt-1.5 whitespace-pre-line text-sm text-muted-foreground">
                      {c.message}
                    </p>
                  )}
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {formatDateTime(c.created_at)}
                  </p>
                </div>

                <Button
                  type="button"
                  variant={c.status === "대기" ? "default" : "outline"}
                  size="sm"
                  disabled={pendingId === c.id}
                  onClick={() => toggleStatus(c)}
                  className="shrink-0"
                >
                  {pendingId === c.id
                    ? "처리 중..."
                    : c.status === "대기"
                      ? "완료 처리"
                      : "대기로 되돌리기"}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
