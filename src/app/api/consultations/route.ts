import { NextResponse } from "next/server";

import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { notifyNewConsultation } from "@/lib/email";
import type { Database } from "@/types/supabase";

type ConsultationInsert = Database["public"]["Tables"]["consultations"]["Insert"];

// 클라이언트(ContactForm, EstimateWizard 등)는 이 라우트를 통해서만 상담 신청을 등록합니다.
// DB 저장(anon insert, 기존과 동일)에 더해, 저장 성공 시 관리자에게 이메일 알림을 보냅니다.
export async function POST(request: Request) {
  let body: { name?: string; phone?: string; message?: string | null };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "요청 형식이 올바르지 않습니다." },
      { status: 400 }
    );
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const message = body.message?.trim() || null;

  if (!name || !phone) {
    return NextResponse.json(
      { success: false, error: "이름과 연락처는 필수입니다." },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured) {
    console.warn(
      "[api/consultations] Supabase 환경변수가 설정되지 않아 상담 신청이 저장되지 않았습니다."
    );
    return NextResponse.json(
      { success: false, error: "Supabase 환경변수가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  const payload: ConsultationInsert = { name, phone, message };
  const { error } = await supabase.from("consultations").insert(payload);

  if (error) {
    console.error("[api/consultations] insert 실패:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  // 이메일 알림이 실패해도 상담 신청 저장 자체는 이미 끝났으므로 응답에는 영향을 주지 않습니다.
  try {
    await notifyNewConsultation({ name, phone, message });
  } catch (err) {
    console.error("[api/consultations] 이메일 알림 실패:", err);
  }

  return NextResponse.json({ success: true });
}
