import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";
import { getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "한국장례서비스의 개인정보 수집, 이용, 보관 및 파기에 관한 안내입니다.",
};

export default async function PrivacyPage() {
  const settings = await getSiteSettings();
  const companyName = settings.company_name || settings.site_name;

  return (
    <>
      <PageHeader
        eyebrow="PRIVACY"
        title="개인정보처리방침"
        description="회사는 이용자의 개인정보를 소중히 다루며, 관계 법령에 따라 안전하게 관리합니다."
        breadcrumbs={[{ title: "개인정보처리방침" }]}
      />

      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-8 leading-relaxed text-foreground/90">
            <p className="text-sm text-muted-foreground">시행일 : 2026년 9월 1일</p>

            <div>
              <h2 className="font-serif text-lg font-bold">1. 수집하는 개인정보 항목</h2>
              <p className="mt-2">
                {companyName}(이하 &ldquo;회사&rdquo;)는 상담 신청 및 서비스 제공을 위해 다음과
                같은 개인정보를 수집합니다.
              </p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5">
                <li>필수 항목 : 성함, 연락처</li>
                <li>선택 항목 : 상담 유형, 지역, 문의 내용</li>
                <li>
                  서비스 이용 과정에서 자동으로 생성되는 정보 : 접속 로그, 접속 IP, 쿠키 등
                </li>
              </ol>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold">2. 개인정보의 수집 및 이용 목적</h2>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5">
                <li>상담 신청에 대한 확인 연락 및 장례 상품·절차 안내</li>
                <li>서비스 제공에 따른 본인 확인 및 계약 이행</li>
                <li>고객 문의 및 불만 처리 등 원활한 의사소통 경로 확보</li>
                <li>서비스 개선 및 통계 분석 (개인을 식별할 수 없는 형태로 가공)</li>
              </ol>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold">3. 개인정보의 보유 및 이용 기간</h2>
              <p className="mt-2">
                회사는 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체
                없이 파기합니다. 다만, 관계 법령에 따라 보존할 필요가 있는 경우 회사는 아래와
                같이 관계 법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
              </p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5">
                <li>계약 또는 청약철회 등에 관한 기록 : 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                <li>대금결제 및 재화 등의 공급에 관한 기록 : 5년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                <li>소비자의 불만 또는 분쟁처리에 관한 기록 : 3년 (전자상거래 등에서의 소비자보호에 관한 법률)</li>
                <li>상담 신청 기록 : 미체결 상담 건은 수집일로부터 1년 이내 파기</li>
              </ol>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold">4. 개인정보의 제3자 제공</h2>
              <p className="mt-2">
                회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 이용자가
                요청한 지역에 장례연합 네트워크 소속 제휴 장례지도사를 통한 서비스 연결이
                필요한 경우, 서비스 제공 목적 범위 내에서 최소한의 정보(성함, 연락처)만
                제휴처에 제공될 수 있으며, 이 경우에도 목적 외 용도로 사용되지 않도록 관리합니다.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold">5. 개인정보의 파기 절차 및 방법</h2>
              <p className="mt-2">
                회사는 개인정보 보유기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 된 때에는
                지체 없이 해당 개인정보를 파기합니다. 전자적 파일 형태의 정보는 기록을 재생할 수
                없는 기술적 방법을 사용하여 삭제하며, 종이에 출력된 개인정보는 분쇄하거나
                소각하여 파기합니다.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold">6. 이용자의 권리와 행사 방법</h2>
              <p className="mt-2">
                이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제, 처리정지를 요청할 수
                있습니다. 아래 문의처를 통해 요청해 주시면 지체 없이 조치하겠습니다.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold">7. 개인정보의 안전성 확보 조치</h2>
              <p className="mt-2">
                회사는 개인정보의 안전성 확보를 위해 접근 권한 관리, 개인정보 암호화, 보안
                프로그램 설치 등 기술적·관리적 조치를 취하고 있습니다.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold">8. 개인정보 보호책임자</h2>
              <p className="mt-2">
                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한
                이용자의 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호책임자를
                지정하고 있습니다.
              </p>
              <p className="mt-2">
                {companyName}
                {settings.owner_name && <> | 대표자 : {settings.owner_name}</>}
              </p>
              <p>
                {settings.phone && <>{settings.phone}</>}
                {settings.phone && settings.email && <> | </>}
                {settings.email && <>{settings.email}</>}
              </p>
            </div>

            <p className="border-t border-border pt-4 text-xs text-muted-foreground">
              ※ 본 개인정보처리방침은 일반적인 양식을 바탕으로 작성된 예시이며, 실제 수집·처리하는
              개인정보 항목 및 위탁·제공 현황에 맞게 개인정보보호법 등 관련 법령 검토를 거쳐
              확정하시는 것을 권장합니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
