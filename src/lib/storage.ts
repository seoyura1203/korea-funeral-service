import { supabase } from "@/lib/supabase";

/** 배너 및 사이트 이미지를 보관하는 public 버킷 이름 (supabase/schema.sql 참고) */
export const SITE_ASSETS_BUCKET = "site-assets";

/**
 * site-assets 버킷 내 특정 경로의 public URL을 반환합니다.
 * 버킷이 public으로 설정되어 있으므로 별도 서명 없이 바로 접근 가능한 URL입니다.
 *
 * @example getSiteAssetUrl("banners/hero-1.jpg")
 */
export function getSiteAssetUrl(path: string): string {
  const { data } = supabase.storage.from(SITE_ASSETS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export type UploadSiteAssetResult = {
  path: string;
  publicUrl: string;
};

/**
 * site-assets 버킷에 파일을 업로드하고 public URL을 반환합니다.
 * 관리자(인증된 사용자) 또는 service role 클라이언트에서 호출하세요.
 * (RLS 정책: authenticated 역할만 insert 가능, 익명 사용자는 불가)
 *
 * @param file   업로드할 File/Blob
 * @param folder 버킷 내 하위 폴더 (예: "banners", "notices")
 */
export async function uploadSiteAsset(
  file: File,
  folder: string = "banners"
): Promise<UploadSiteAssetResult | null> {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from(SITE_ASSETS_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("[storage] uploadSiteAsset 실패:", error.message);
    return null;
  }

  return { path, publicUrl: getSiteAssetUrl(path) };
}

/** site-assets 버킷의 특정 폴더에 있는 파일 목록을 조회합니다. */
export async function listSiteAssets(folder: string = "banners") {
  const { data, error } = await supabase.storage
    .from(SITE_ASSETS_BUCKET)
    .list(folder, { sortBy: { column: "created_at", order: "desc" } });

  if (error) {
    console.error("[storage] listSiteAssets 실패:", error.message);
    return [];
  }

  return data ?? [];
}

/** site-assets 버킷에서 파일을 삭제합니다. (관리자 전용) */
export async function deleteSiteAsset(path: string): Promise<boolean> {
  const { error } = await supabase.storage
    .from(SITE_ASSETS_BUCKET)
    .remove([path]);

  if (error) {
    console.error("[storage] deleteSiteAsset 실패:", error.message);
    return false;
  }

  return true;
}
