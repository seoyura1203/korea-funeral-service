import { getSiteSettingsAdmin } from "@/lib/admin/data";
import type { SiteSettings } from "@/types/supabase";
import SettingsForm from "./SettingsForm";

export const revalidate = 0;

const EMPTY_SETTINGS: SiteSettings = {
  id: 1,
  site_name: "",
  site_description: null,
  keywords: null,
  favicon_url: null,
  og_title: null,
  og_description: null,
  og_image_url: null,
  company_name: "",
  owner_name: null,
  business_number: null,
  mos_number: null,
  address: null,
  phone: null,
  fax: null,
  email: null,
  copyright_text: null,
  updated_at: new Date().toISOString(),
};

export default async function AdminSettingsPage() {
  const settings = await getSiteSettingsAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold">사이트 설정</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          SEO, 소셜 공유(OG), 회사/사업자 정보를 관리합니다. 저장하면 사이트 전체에
          바로 반영됩니다.
        </p>
      </div>

      {!settings && (
        <p className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          아직 설정 레코드가 없습니다. supabase/schema.sql의 site_settings 시드가
          실행되지 않았을 수 있어요. 아래 폼에 입력 후 저장하면 새로 생성됩니다.
        </p>
      )}

      <SettingsForm settings={settings ?? EMPTY_SETTINGS} />
    </div>
  );
}
