"use server";

import { revalidatePath } from "next/cache";

import { requireAdminUser } from "@/lib/admin/guard";
import { createSupabaseAdminClient } from "@/lib/supabase";

export type NoticeActionState = {
  error?: string;
  success?: boolean;
};

// 참고: 공지사항은 현재 공개 사이트(메인/메뉴)에서는 노출되지 않고
// 어드민에서만 관리합니다. (추후 공개 노출을 다시 붙이면 관련 경로를 revalidate 하세요.)
function revalidateNotices() {
  revalidatePath("/admin/notices");
  revalidatePath("/admin");
}

export async function createNoticeAction(
  _prevState: NoticeActionState,
  formData: FormData
): Promise<NoticeActionState> {
  await requireAdminUser();

  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title || !content) {
    return { error: "제목과 내용을 모두 입력해 주세요." };
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("notices").insert({ title, content });

  if (error) {
    return { error: `공지 등록 실패: ${error.message}` };
  }

  revalidateNotices();
  return { success: true };
}

export async function updateNoticeAction(
  id: string,
  input: { title: string; content: string }
) {
  await requireAdminUser();

  if (!input.title.trim() || !input.content.trim()) {
    return { error: "제목과 내용을 모두 입력해 주세요." };
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin
    .from("notices")
    .update({ title: input.title.trim(), content: input.content.trim() })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateNotices();
  return { success: true };
}

export async function deleteNoticeAction(id: string) {
  await requireAdminUser();

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("notices").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateNotices();
  return { success: true };
}
