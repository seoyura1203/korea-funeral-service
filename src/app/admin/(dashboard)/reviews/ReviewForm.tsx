"use client";

import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createReviewAction, type ReviewActionState } from "./actions";

const initialState: ReviewActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "등록 중..." : "후기 등록"}
    </Button>
  );
}

export default function ReviewForm() {
  const [state, formAction] = useFormState(createReviewAction, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">새 고객후기 등록</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">작성자 *</Label>
              <Input id="name" name="name" placeholder="예: 김OO 님" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="review_date">날짜</Label>
              <Input id="review_date" name="review_date" type="date" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="content">후기 내용 *</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="고객후기 내용을 입력하세요."
              rows={4}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="image">첨부 이미지</Label>
            <Input id="image" name="image" type="file" accept="image/*" />
            <p className="text-xs text-muted-foreground">
              선택 사항입니다. 첨부하면 리뷰 카드 하단에 표시되고, 클릭 시
              이미지가 크게 보입니다. (최대 10MB)
            </p>
          </div>

          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          {state.success && (
            <p className="flex items-center gap-1.5 text-sm text-primary">
              <CheckCircle2 className="h-4 w-4" />
              고객후기가 등록되었습니다.
            </p>
          )}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
