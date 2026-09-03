// 상담 신청 접수 시 관리자에게 이메일 알림을 보내는 헬퍼입니다.
// Resend(https://resend.com)의 REST API를 별도 SDK 설치 없이 fetch로 직접 호출합니다.
//
// 필요한 환경변수 (.env.local / 배포 환경설정에 추가):
//   RESEND_API_KEY     - Resend 대시보드에서 발급받은 API 키
//   NOTIFY_EMAIL        - 알림을 받을 관리자 이메일 주소 (여러 명이면 콤마로 구분)
//   RESEND_FROM_EMAIL   - (선택) 발신자 표시. 도메인 인증 전에는 기본값(onboarding@resend.dev)만 사용 가능합니다.
//
// 두 값(RESEND_API_KEY, NOTIFY_EMAIL) 중 하나라도 비어 있으면 조용히 건너뛰고
// 콘솔에 경고만 남깁니다. 즉, 설정 전에도 상담 신청 저장 자체는 정상 동작합니다.

type NotifyInput = {
  name: string;
  phone: string;
  message?: string | null;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function notifyNewConsultation(input: NotifyInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;
  const from =
    process.env.RESEND_FROM_EMAIL || "한국장례서비스 알림 <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.warn(
      "[email] RESEND_API_KEY / NOTIFY_EMAIL 이 설정되지 않아 이메일 알림을 보내지 않았습니다."
    );
    return;
  }

  const receivedAt = new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const html = `
    <div style="font-family: 'Apple SD Gothic Neo', sans-serif; line-height: 1.7; color: #222;">
      <h2 style="color:#3C2A1F; margin-bottom: 16px;">새로운 상담 신청이 접수되었습니다</h2>
      <table style="border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding:4px 16px 4px 0; color:#8F6743; white-space:nowrap;">성함</td>
          <td>${escapeHtml(input.name)}</td>
        </tr>
        <tr>
          <td style="padding:4px 16px 4px 0; color:#8F6743; white-space:nowrap;">연락처</td>
          <td>${escapeHtml(input.phone)}</td>
        </tr>
        <tr>
          <td style="padding:4px 16px 4px 0; color:#8F6743; white-space:nowrap;">접수 시각</td>
          <td>${receivedAt}</td>
        </tr>
      </table>
      ${
        input.message
          ? `<p style="margin-top:16px; padding:12px 16px; background:#F7F5F1; border-radius:8px; white-space:pre-wrap; font-size:14px;">${escapeHtml(
              input.message
            )}</p>`
          : ""
      }
      <p style="margin-top:24px; font-size:12px; color:#999;">
        관리자 페이지 &gt; 상담 신청 관리에서 전체 내역을 확인할 수 있습니다.
      </p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((v) => v.trim()).filter(Boolean),
      subject: `[한국장례서비스] 새 상담 신청 - ${input.name}`,
      html,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resend API 오류 (${res.status}): ${text}`);
  }
}
