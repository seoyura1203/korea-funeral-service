"use server";

import { randomUUID } from "crypto";

import { revalidatePath } from "next/cache";

import { requireAdminUser } from "@/lib/admin/guard";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { SITE_ASSETS_BUCKET } from "@/lib/storage";

export type SettingsActionState = {
  error?: string;
  success?: boolean;
};

function field(formData: FormData, name: string): string | null {
  const value = String(formData.get(name) ?? "").trim();
  return value.length > 0 ? value : null;
}

async function uploadImage(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  file: File,
  folder: string
): Promise<string | null> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `settings/${folder}-${randomUUID()}.${ext}`;

  const { error } = await admin.storage
    .from(SITE_ASSETS_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) {
    throw new Error(`이미지 업로드 실패(${folder}): ${error.message}`);
  }

  return admin.storage.from(SITE_ASSETS_BUCKET).getPublicUrl(path).data.publicUrl;
}

/** 사이트 설정(id=1 고정)을 갱신합니다. 파비콘/OG 이미지가 첨부되면 새로 업로드해 교체합니다. */
export async function updateSiteSettingsAction(
  _prevState: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  await requireAdminUser();

  const siteName = field(formData, "site_name");
  const companyName = field(formData, "company_name");

  if (!siteName || !companyName) {
    return { error: "사이트명과 회사명은 필수 항목입니다." };
  }

  const admin = createSupabaseAdminClient();

  let faviconUrl = field(formData, "current_favicon_url");
  let ogImageUrl = field(formData, "current_og_image_url");

  try {
    const faviconFile = formData.get("favicon") as File | null;
    if (faviconFile && faviconFile.size > 0) {
      faviconUrl = await uploadImage(admin, faviconFile, "favicon");
    }

    const ogImageFile = formData.get("og_image") as File | null;
    if (ogImageFile && ogImageFile.size > 0) {
      ogImageUrl = await uploadImage(admin, ogImageFile, "og");
    }
  } catch (err) {
    return { error: err instanceof Error ? err.message : "이미지 업로드에 실패했습니다." };
  }

  const { error } = await admin.from("site_settings").upsert(
    {
      id: 1,
      site_name: siteName,
      site_description: field(formData, "site_description"),
      keywords: field(formData, "keywords"),
      favicon_url: faviconUrl,
      og_title: field(formData, "og_title"),
      og_description: field(formData, "og_description"),
      og_image_url: ogImageUrl,
      company_name: companyName,
      owner_name: field(formData, "owner_name"),
      business_number: field(formData, "business_number"),
      mos_number: field(formData, "mos_number"),
      address: field(formData, "address"),
      phone: field(formData, "phone"),
      fax: field(formData, "fax"),
      email: field(formData, "email"),
      copyright_text: field(formData, "copyright_text"),
    },
    { onConflict: "id" }
  );

  if (error) {
    return { error: `저장 실패: ${error.message}` };
  }

  // 루트 레이아웃(메타데이터)과 전체 사이트 페이지, 어드민 설정 화면을 모두 갱신합니다.
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings");

  return { success: true };
}
