"use server";

import { revalidatePath } from "next/cache";

import { requireAdminUser } from "@/lib/admin/guard";
import { createSupabaseAdminClient } from "@/lib/supabase";
import type { ConsultationStatus } from "@/types/supabase";

/** 상담 신청 상태를 변경합니다. (대기 ↔ 완료) */
export async function updateConsultationStatusAction(
  id: string,
  status: ConsultationStatus
) {
  await requireAdminUser();
  const admin = createSupabaseAdminClient();

  const { error } = await admin
    .from("consultations")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("[consultations] updateConsultationStatusAction 실패:", error.message);
    return { error: error.message };
  }

  revalidatePath("/admin/consultations");
  revalidatePath("/admin");
  return { success: true };
}
