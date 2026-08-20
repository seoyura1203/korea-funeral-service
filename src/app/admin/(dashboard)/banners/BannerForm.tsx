"use client";

import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createBannerAction, type BannerActionState } from "./actions";

const initialState: BannerActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "등록 중..." : "배너 등록"}
    </Button>
  );
}

export default function BannerForm() {
  const [state, formAction] = useFormState(createBannerAction, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">새 배너 등록</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="title">타이틀 *</Label>
              <Input
                id="title"
                name="title"
                placeholder="마지막 가는 길, 따뜻하게 모시겠습니다"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="link_url">클릭 시 이동 링크</Label>
              <Input id="link_url" name="link_url" placeholder="/contact" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subtitle">서브타이틀</Label>
            <Textarea
              id="subtitle"
              name="subtitle"
              placeholder="숨겨진 비용 없이, 정직한 안내로 임종부터 발인까지 함께합니다."
              rows={2}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="image">배너 이미지</Label>
            <Input id="image" name="image" type="file" accept="image/*" />
            <p className="text-xs text-muted-foreground">
              업로드하지 않으면 기본 그라디언트 배경으로 표시됩니다. (최대 10MB)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="is_active"
              name="is_active"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-input"
            />
            <Label htmlFor="is_active" className="font-normal">
              등록 즉시 노출 (활성화)
            </Label>
          </div>

          {state.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          {state.success && (
            <p className="flex items-center gap-1.5 text-sm text-primary">
              <CheckCircle2 className="h-4 w-4" />
              배너가 등록되었습니다.
            </p>
          )}

          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
