"use server";

import { randomUUID } from "crypto";

import { revalidatePath } from "next/cache";

import { requireAdminUser } from "@/lib/admin/guard";
import { extractStoragePath } from "@/lib/admin/data";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { SITE_ASSETS_BUCKET } from "@/lib/storage";

export type ReviewActionState = {
  error?: string;
  success?: boolean;
};

// 고객후기는 홈페이지(슬라이더)와 /support/reviews 목록에 공개 노출되므로
// 어드민 경로뿐 아니라 공개 경로도 함께 revalidate 합니다.
function revalidateReviews() {
  revalidatePath("/admin/reviews");
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/support/reviews");
}

export async function createReviewAction(
  _prevState: ReviewActionState,
  formData: FormData
): Promise<ReviewActionState> {
  await requireAdminUser();

  const name = String(formData.get("name") ?? "").trim();
  const reviewDate = String(formData.get("review_date") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const file = formData.get("image") as File | null;

  if (!name || !content) {
    return { error: "작성자와 후기 내용을 모두 입력해 주세요." };
  }

  const admin = createSupabaseAdminClient();

  let imageUrl: string | null = null;

  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `reviews/${randomUUID()}.${ext}`;

    const { error: uploadError } = await admin.storage
      .from(SITE_ASSETS_BUCKET)
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      return { error: `이미지 업로드 실패: ${uploadError.message}` };
    }

    imageUrl = admin.storage.from(SITE_ASSETS_BUCKET).getPublicUrl(path).data
      .publicUrl;
  }

  const { error } = await admin.from("reviews").insert({
    name,
    content,
    image_url: imageUrl,
    ...(reviewDate ? { review_date: reviewDate } : {}),
  });

  if (error) {
    return { error: `후기 등록 실패: ${error.message}` };
  }

  revalidateReviews();
  return { success: true };
}

/**
 * 후기를 수정합니다. formData에 새 이미지가 첨부되면 교체하고,
 * remove_image="true"가 담기면 기존 이미지를 제거합니다. 둘 다 없으면
 * 기존 이미지를 그대로 유지합니다. 교체/삭제 시 이전 스토리지 파일도 함께 정리합니다.
 */
export async function updateReviewAction(id: string, formData: FormData) {
  await requireAdminUser();

  const name = String(formData.get("name") ?? "").trim();
  const reviewDate = String(formData.get("review_date") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const removeImage = formData.get("remove_image") === "true";
  const file = formData.get("image") as File | null;

  if (!name || !content) {
    return { error: "작성자와 후기 내용을 모두 입력해 주세요." };
  }

  const admin = createSupabaseAdminClient();

  const { data: existing } = await admin
    .from("reviews")
    .select("image_url")
    .eq("id", id)
    .maybeSingle();

  // undefined = 이미지 필드를 건드리지 않음(그대로 유지)
  let imageUrl: string | null | undefined = undefined;

  if (file && file.size > 0) {
    const ext = file.name.split(".").pop() || "jpg";
    const path = `reviews/${randomUUID()}.${ext}`;

    const { error: uploadError } = await admin.storage
      .from(SITE_ASSETS_BUCKET)
      .upload(path, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      return { error: `이미지 업로드 실패: ${uploadError.message}` };
    }

    imageUrl = admin.storage.from(SITE_ASSETS_BUCKET).getPublicUrl(path).data
      .publicUrl;
  } else if (removeImage) {
    imageUrl = null;
  }

  const { error } = await admin
    .from("reviews")
    .update({
      name,
      review_date: reviewDate,
      content,
      ...(imageUrl !== undefined ? { image_url: imageUrl } : {}),
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  // 이미지가 교체되었거나 삭제된 경우, 이전 스토리지 파일을 정리합니다.
  if (imageUrl !== undefined) {
    const oldPath = extractStoragePath(existing?.image_url ?? null);
    if (oldPath) {
      await admin.storage.from(SITE_ASSETS_BUCKET).remove([oldPath]);
    }
  }

  revalidateReviews();
  return { success: true };
}

export async function deleteReviewAction(id: string) {
  await requireAdminUser();

  const admin = createSupabaseAdminClient();

  const { data: existing } = await admin
    .from("reviews")
    .select("image_url")
    .eq("id", id)
    .maybeSingle();

  const { error } = await admin.from("reviews").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  const path = extractStoragePath(existing?.image_url ?? null);
  if (path) {
    await admin.storage.from(SITE_ASSETS_BUCKET).remove([path]);
  }

  revalidateReviews();
  return { success: true };
}
