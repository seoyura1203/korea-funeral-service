"use client";

import { useFormState, useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/lib/site-config";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "로그인 중..." : "로그인"}
    </Button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-950 px-4">
      <div className="w-full max-w-sm rounded-xl border border-brand-800 bg-card p-8 shadow-xl">
        <div className="text-center">
          <div className="font-serif text-xl font-bold text-primary">
            {siteConfig.name}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">관리자 로그인</p>
        </div>

        <form action={formAction} className="mt-8 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@koreafuneral.co.kr"
              autoComplete="email"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>

          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}

          <SubmitButton />
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          관리자 계정은 Supabase 대시보드에서 발급합니다. 계정이 없다면
          운영팀에 문의해 주세요.
        </p>
      </div>
    </div>
  );
}
