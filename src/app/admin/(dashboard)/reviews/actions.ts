"use server";

import { revalidatePath } from "next/cache";

import { requireAdminUser } from "@/lib/admin/guard";
import { createSupabaseAdminClient } from "@/lib/supabase";

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

// 고객후기는 이미지 없이 텍스트(작성자/날짜/내용)만 사용합니다.
export async function createReviewAction(
  _prevState: ReviewActionState,
  formData: FormData
): Promise<ReviewActionState> {
  await requireAdminUser();

  const name = String(formData.get("name") ?? "").trim();
  const reviewDate = String(formData.get("review_date") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!name || !content) {
    return { error: "작성자와 후기 내용을 모두 입력해 주세요." };
  }

  const admin = createSupabaseAdminClient();

  const { error } = await admin.from("reviews").insert({
    name,
    content,
    ...(reviewDate ? { review_date: reviewDate } : {}),
  });

  if (error) {
    return { error: `후기 등록 실패: ${error.message}` };
  }

  revalidateReviews();
  return { success: true };
}

export async function updateReviewAction(id: string, formData: FormData) {
  await requireAdminUser();

  const name = String(formData.get("name") ?? "").trim();
  const reviewDate = String(formData.get("review_date") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!name || !content) {
    return { error: "작성자와 후기 내용을 모두 입력해 주세요." };
  }

  const admin = createSupabaseAdminClient();

  const { error } = await admin
    .from("reviews")
    .update({
      name,
      review_date: reviewDate,
      content,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateReviews();
  return { success: true };
}

export async function deleteReviewAction(id: string) {
  await requireAdminUser();

  const admin = createSupabaseAdminClient();

  const { error } = await admin.from("reviews").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateReviews();
  return { success: true };
}
