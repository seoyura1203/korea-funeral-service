"use client";

import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createNoticeAction, type NoticeActionState } from "./actions";

const initialState: NoticeActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "등록 중..." : "공지 등록"}
    </Button>
  );
}

export default function NoticeForm() {
  const [state, formAction] = useFormState(createNoticeAction, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">새 공지사항 등록</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">제목 *</Label>
            <Input id="title" name="title" placeholder="공지 제목" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="content">내용 *</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="공지 내용을 입력하세요."
              rows={4}
              required
            />
          </div>

          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          {state.success && (
            <p className="flex items-center gap-1.5 text-sm text-primary">
              <CheckCircle2 className="h-4 w-4" />
              공지사항이 등록되었습니다.
            </p>
          )}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
