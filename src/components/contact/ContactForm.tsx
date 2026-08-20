"use client";

import * as React from "react";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createConsultation } from "@/lib/queries";

const SERVICE_TYPE_LABEL: Record<string, string> = {
  general: "일반 상조 상담",
  christian: "기독교 장례 상담",
  urgent: "긴급(임종) 상담",
  cemetery: "장지/봉안 상담",
  etc: "기타 문의",
};

export default function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "done">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const phone = String(form.get("phone") ?? "");
    const serviceType = String(form.get("serviceType") ?? "general");
    const region = String(form.get("region") ?? "");
    const message = String(form.get("message") ?? "");

    // consultations 테이블에는 name/phone/message 컬럼만 있으므로
    // 상담 유형과 지역은 message 앞에 태그 형태로 함께 저장합니다.
    const composedMessage = [
      `[상담유형: ${SERVICE_TYPE_LABEL[serviceType] ?? serviceType}]`,
      region ? `[지역: ${region}]` : null,
      message,
    ]
      .filter(Boolean)
      .join(" ");

    const result = await createConsultation({
      name,
      phone,
      message: composedMessage,
    });

    if (result.success) {
      setStatus("done");
    } else {
      setStatus("idle");
      setErrorMessage(
        "상담 신청 접수에 실패했습니다. 잠시 후 다시 시도해 주시거나 전화로 문의해 주세요."
      );
    }
  }

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-card py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <p className="text-lg font-semibold">상담 신청이 완료되었습니다</p>
        <p className="text-sm text-muted-foreground">
          입력해 주신 연락처로 담당 상담사가 신속하게 연락드리겠습니다.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-6 rounded-lg border border-border bg-card p-6 md:p-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">성함 *</Label>
          <Input id="name" name="name" placeholder="홍길동" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">연락처 *</Label>
          <Input id="phone" name="phone" type="tel" placeholder="010-0000-0000" required />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="serviceType">상담 유형 *</Label>
          <Select name="serviceType" defaultValue="general">
            <SelectTrigger id="serviceType">
              <SelectValue placeholder="상담 유형 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">일반 상조 상담</SelectItem>
              <SelectItem value="christian">기독교 장례 상담</SelectItem>
              <SelectItem value="urgent">긴급(임종) 상담</SelectItem>
              <SelectItem value="cemetery">장지/봉안 상담</SelectItem>
              <SelectItem value="etc">기타 문의</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="region">지역</Label>
          <Input id="region" name="region" placeholder="예: 서울시 강남구" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">문의 내용</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="상담받고 싶은 내용을 자유롭게 남겨주세요."
          rows={5}
        />
      </div>

      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <input
          id="agree"
          name="agree"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-input"
        />
        <label htmlFor="agree">
          개인정보 수집 및 이용에 동의합니다. (상담 목적 외 사용하지 않으며,
          상담 완료 후 관련 법령에 따라 안전하게 파기됩니다.)
        </label>
      </div>

      {errorMessage && (
        <p className="text-center text-sm text-destructive">{errorMessage}</p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "접수 중..." : "상담 신청하기"}
      </Button>
    </form>
  );
}
