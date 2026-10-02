"use client";

import { useFormState, useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SiteSettings } from "@/types/supabase";
import ImageUploadField from "./ImageUploadField";
import { updateSiteSettingsAction, type SettingsActionState } from "./actions";

const initialState: SettingsActionState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "저장 중..." : "저장하기"}
    </Button>
  );
}

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction] = useFormState(updateSiteSettingsAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">기본 SEO 정보</CardTitle>
          <CardDescription>
            브라우저 탭 제목, 검색엔진 노출 설명에 사용됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="site_name">사이트명 *</Label>
            <Input
              id="site_name"
              name="site_name"
              defaultValue={settings.site_name}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="site_description">사이트 설명</Label>
            <Textarea
              id="site_description"
              name="site_description"
              defaultValue={settings.site_description ?? ""}
              rows={3}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="keywords">키워드</Label>
            <Input
              id="keywords"
              name="keywords"
              defaultValue={settings.keywords ?? ""}
              placeholder="상조,장례,장례식장"
            />
            <p className="text-xs text-muted-foreground">쉼표(,)로 구분해 입력하세요.</p>
          </div>

          <ImageUploadField
            name="favicon"
            label="파비콘"
            hint="브라우저 탭에 표시되는 아이콘입니다. .ico 또는 .png 권장 (정사각형)."
            accept="image/x-icon,image/png,.ico"
            currentUrl={settings.favicon_url}
            previewClassName="h-10 w-10 rounded"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">오픈그래프(OG) 소셜 공유</CardTitle>
          <CardDescription>
            카카오톡, 페이스북 등에 링크를 공유했을 때 보이는 미리보기입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="og_title">OG 타이틀</Label>
            <Input id="og_title" name="og_title" defaultValue={settings.og_title ?? ""} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="og_description">OG 설명</Label>
            <Textarea
              id="og_description"
              name="og_description"
              defaultValue={settings.og_description ?? ""}
              rows={3}
            />
          </div>
          <ImageUploadField
            name="og_image"
            label="OG 이미지"
            hint="가로형 이미지 권장 (1200x630px)."
            accept="image/*"
            currentUrl={settings.og_image_url}
            previewClassName="h-16 w-28 rounded-md"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">회사 / 사업자 정보</CardTitle>
          <CardDescription>
            사이트 하단 푸터와 통신판매업 고지에 노출됩니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="company_name">회사명 *</Label>
              <Input
                id="company_name"
                name="company_name"
                defaultValue={settings.company_name}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="owner_name">대표자명</Label>
              <Input id="owner_name" name="owner_name" defaultValue={settings.owner_name ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="business_number">사업자등록번호</Label>
              <Input
                id="business_number"
                name="business_number"
                defaultValue={settings.business_number ?? ""}
                placeholder="000-00-00000"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mos_number">통신판매업신고번호</Label>
              <Input
                id="mos_number"
                name="mos_number"
                defaultValue={settings.mos_number ?? ""}
                placeholder="제0000-서울강남-00000호"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="address">주소</Label>
              <Input id="address" name="address" defaultValue={settings.address ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">대표 전화</Label>
              <Input id="phone" name="phone" defaultValue={settings.phone ?? ""} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fax">팩스</Label>
              <Input id="fax" name="fax" defaultValue={settings.fax ?? ""} />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" name="email" type="email" defaultValue={settings.email ?? ""} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">푸터 저작권 문구</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            <Label htmlFor="copyright_text">저작권 문구</Label>
            <Input
              id="copyright_text"
              name="copyright_text"
              defaultValue={settings.copyright_text ?? ""}
              placeholder="한국의전서비스. All rights reserved."
            />
            <p className="text-xs text-muted-foreground">
              연도는 자동으로 앞에 붙습니다. (예: 2026 {settings.copyright_text || "..."})
            </p>
          </div>
        </CardContent>
      </Card>

      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state.success && (
        <p className="flex items-center gap-1.5 text-sm text-primary">
          <CheckCircle2 className="h-4 w-4" />
          저장되었습니다. 사이트 전체에 반영됩니다.
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
