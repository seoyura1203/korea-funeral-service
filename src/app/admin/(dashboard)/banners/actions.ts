"use server";

import { randomUUID } from "crypto";

import { revalidatePath } from "next/cache";

import { requireAdminUser } from "@/lib/admin/guard";
import { extractStoragePath } from "@/lib/admin/data";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { SITE_ASSETS_BUCKET } from "@/lib/storage";

export type BannerActionState = {
  error?: string;
  success?: boolean;
};

function revalidateBanners() {
  revalidatePath("/admin/banners");
  revalidatePath("/admin");
  revalidatePath("/"); // 공개 홈페이지 히어로 슬라이더에도 반영
}

/** 새 배너를 등록합니다. 이미지 파일이 첨부되면 site-assets 버킷에 업로드합니다. */
export async function createBannerAction(
  _prevState: BannerActionState,
  formData: FormData
): Promise<BannerActionState> {
  await requireAdminUser();

  const title = String(formData.get("title") ?? "").trim();
  const subtitle = String(formData.get("subtitle") ?? "").trim();
  const linkUrl = String(formData.get("link_url") ?? "").trim();
  const isActive = formData.get("is_active") === "on";
  const file = formData.get("image") as File | null;

  if (!title) {
    return { error: "배너 타이틀을 입력해 주세요." };
  }

  const admin = createSupabaseAdminClient();

  let imageUrl: string | null = null;

  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `banners/${randomUUID()}.${ext}`;

    const { error: uploadError } = await admin.storage
      .from(SITE_ASSETS_BUCKET)
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      return { error: `이미지 업로드 실패: ${uploadError.message}` };
    }

    imageUrl = admin.storage.from(SITE_ASSETS_BUCKET).getPublicUrl(path).data
      .publicUrl;
  }

  const { data: existing } = await admin
    .from("banners")
    .select("display_order")
    .order("display_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextOrder = (existing?.display_order ?? 0) + 1;

  const { error: insertError } = await admin.from("banners").insert({
    title,
    subtitle: subtitle || null,
    link_url: linkUrl || null,
    image_url: imageUrl,
    is_active: isActive,
    display_order: nextOrder,
  });

  if (insertError) {
    return { error: `배너 등록 실패: ${insertError.message}` };
  }

  revalidateBanners();
  return { success: true };
}

/** 배너를 삭제합니다. 연결된 스토리지 이미지가 있으면 함께 삭제를 시도합니다. */
export async function deleteBannerAction(id: string) {
  await requireAdminUser();
  const admin = createSupabaseAdminClient();

  const { data: banner } = await admin
    .from("banners")
    .select("image_url")
    .eq("id", id)
    .maybeSingle();

  const { error } = await admin.from("banners").delete().eq("id", id);

  if (error) {
    console.error("[banners] deleteBannerAction 실패:", error.message);
    return { error: error.message };
  }

  const path = extractStoragePath(banner?.image_url ?? null);
  if (path) {
    await admin.storage.from(SITE_ASSETS_BUCKET).remove([path]);
  }

  revalidateBanners();
  return { success: true };
}

/** 배너 노출 여부(is_active)를 토글합니다. */
export async function toggleBannerActiveAction(id: string, nextActive: boolean) {
  await requireAdminUser();
  const admin = createSupabaseAdminClient();

  const { error } = await admin
    .from("banners")
    .update({ is_active: nextActive })
    .eq("id", id);

  if (error) {
    console.error("[banners] toggleBannerActiveAction 실패:", error.message);
    return { error: error.message };
  }

  revalidateBanners();
  return { success: true };
}

/** 인접한 배너와 display_order를 교환해 노출 순서를 바꿉니다. */
export async function moveBannerAction(
  id: string,
  direction: "up" | "down"
) {
  await requireAdminUser();
  const admin = createSupabaseAdminClient();

  const { data: banners, error } = await admin
    .from("banners")
    .select("id, display_order")
    .order("display_order", { ascending: true });

  if (error || !banners) {
    return { error: error?.message ?? "배너 목록을 불러오지 못했습니다." };
  }

  const idx = banners.findIndex((b) => b.id === id);
  if (idx === -1) return { error: "배너를 찾을 수 없습니다." };

  const swapIdx = direction === "up" ? idx - 1 : idx + 1;
  if (swapIdx < 0 || swapIdx >= banners.length) {
    return { success: true }; // 이미 맨 위/아래
  }

  const current = banners[idx];
  const target = banners[swapIdx];

  const [{ error: e1 }, { error: e2 }] = await Promise.all([
    admin
      .from("banners")
      .update({ display_order: target.display_order })
      .eq("id", current.id),
    admin
      .from("banners")
      .update({ display_order: current.display_order })
      .eq("id", target.id),
  ]);

  if (e1 || e2) {
    return { error: (e1 ?? e2)?.message };
  }

  revalidateBanners();
  return { success: true };
}
