import { createSupabaseAdminClient } from "@/lib/supabase";
import type { Banner, Consultation, Notice, Review, SiteSettings } from "@/types/supabase";

/**
 * 어드민 화면의 모든 조회는 service role 클라이언트를 사용합니다.
 * (banners는 is_active=false 인 항목도 봐야 하고, consultations는
 * 공개 select 정책 자체가 없기 때문에 anon 클라이언트로는 조회가 불가능합니다.)
 */

export async function getAllBannersAdmin(): Promise<Banner[]> {
  try {
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from("banners")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error("[admin/data] getAllBannersAdmin 실패:", err);
    return [];
  }
}

export async function getAllConsultationsAdmin(): Promise<Consultation[]> {
  try {
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from("consultations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error("[admin/data] getAllConsultationsAdmin 실패:", err);
    return [];
  }
}

export async function getAllNoticesAdmin(): Promise<Notice[]> {
  try {
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error("[admin/data] getAllNoticesAdmin 실패:", err);
    return [];
  }
}

export async function getAllReviewsAdmin(): Promise<Review[]> {
  try {
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from("reviews")
      .select("*")
      .order("review_date", { ascending: false });

    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error("[admin/data] getAllReviewsAdmin 실패:", err);
    return [];
  }
}

/** id=1 고정인 사이트 설정 레코드를 가져옵니다. 없으면 null을 반환합니다. */
export async function getSiteSettingsAdmin(): Promise<SiteSettings | null> {
  try {
    const admin = createSupabaseAdminClient();
    const { data, error } = await admin
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error("[admin/data] getSiteSettingsAdmin 실패:", err);
    return null;
  }
}

/**
 * site-assets public URL(예: https://xxx.supabase.co/storage/v1/object/public/site-assets/banners/abc.jpg)
 * 에서 버킷 내부 경로("banners/abc.jpg")만 추출합니다. 배너 삭제 시 스토리지 파일도 함께 정리할 때 사용합니다.
 */
export function extractStoragePath(
  publicUrl: string | null,
  bucket = "site-assets"
): string | null {
  if (!publicUrl) return null;
  const marker = `/object/public/${bucket}/`;
  const idx = publicUrl.indexOf(marker);
  if (idx === -1) return null;
  return publicUrl.slice(idx + marker.length);
}
