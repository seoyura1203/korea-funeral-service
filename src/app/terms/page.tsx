import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";
import { getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "이용약관",
  description: "한국의전서비스 웹사이트 및 서비스 이용약관입니다.",
};

export default async function TermsPage() {
  const settings = await getSiteSettings();
  const companyName = settings.company_name || settings.site_name;

  return (
    <>
      <PageHeader
        eyebrow="TERMS"
        title="이용약관"
        description="본 약관은 서비스 이용과 관련해 회사와 이용자의 권리, 의무 및 책임사항을 규정합니다."
        breadcrumbs={[{ title: "이용약관" }]}
      />

      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-8 leading-relaxed text-foreground/90">
            <p className="text-sm text-muted-foreground">시행일 : 2026년 9월 1일</p>

            <div>
              <h2 className="font-serif text-lg font-bold">제1조 (목적)</h2>
              <p className="mt-2">
                이 약관은 {companyName}(이하 &ldquo;회사&rdquo;)가 운영하는 웹사이트에서 제공하는
                장례·상조 관련 서비스(이하 &ldquo;서비스&rdquo;)의 이용조건 및 절차, 회사와
                이용자의 권리·의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold">제2조 (용어의 정의)</h2>
              <p className="mt-2">
                이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
              </p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5">
                <li>
                  &ldquo;이용자&rdquo;란 회사의 웹사이트에 접속하여 이 약관에 따라 회사가
                  제공하는 서비스를 이용하는 고객을 말합니다.
                </li>
                <li>
                  &ldquo;상담 신청&rdquo;이란 이용자가 웹사이트 내 상담 폼 또는 전화를 통해
                  장례·상조 서비스에 관한 안내 및 견적을 요청하는 행위를 말합니다.
                </li>
                <li>
                  &ldquo;후불제 서비스&rdquo;란 이용자가 사전에 회비를 납입하지 않고, 실제
                  서비스 이용 시점에 이용한 상품·서비스에 대해서만 비용을 결제하는 방식을
                  말합니다.
                </li>
              </ol>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold">제3조 (약관의 효력 및 변경)</h2>
              <p className="mt-2">
                이 약관은 웹사이트에 게시함으로써 효력이 발생하며, 회사는 관련 법령을 위배하지
                않는 범위에서 약관을 개정할 수 있습니다. 약관이 개정되는 경우 회사는 적용일자 및
                개정 사유를 명시하여 현행 약관과 함께 웹사이트에 게시합니다.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold">제4조 (서비스의 제공 및 내용)</h2>
              <p className="mt-2">
                회사는 다음과 같은 서비스를 제공합니다.
              </p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5">
                <li>장례 절차 안내 및 상담</li>
                <li>무빈소/일반장 등 장례 상품 안내 및 견적 제공</li>
                <li>후불제 방식의 장례 진행 지원</li>
                <li>장지(봉안·자연장 등) 안내</li>
                <li>기타 회사가 정하는 부가 서비스</li>
              </ol>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold">제5조 (상담 신청 및 계약)</h2>
              <p className="mt-2">
                이용자가 웹사이트를 통해 상담을 신청하면, 회사는 신속하게 연락하여 상황에 맞는
                상품과 절차, 비용을 안내합니다. 실제 장례 서비스 이용 계약은 상담 과정에서
                이용자와 회사(또는 회사와 제휴한 장례연합 네트워크 소속 사업자) 간 별도로
                체결되며, 이 웹사이트를 통한 상담 신청만으로 계약이 성립하는 것은 아닙니다.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold">제6조 (이용자의 의무)</h2>
              <p className="mt-2">이용자는 다음 행위를 해서는 안 됩니다.</p>
              <ol className="mt-2 list-decimal space-y-1.5 pl-5">
                <li>상담 신청 시 허위 정보를 기재하는 행위</li>
                <li>회사의 서비스 운영을 방해하는 행위</li>
                <li>회사가 제공하는 정보를 무단으로 복제, 유포, 상업적으로 이용하는 행위</li>
                <li>기타 관계 법령 및 이 약관에서 금지하는 행위</li>
              </ol>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold">제7조 (면책조항)</h2>
              <p className="mt-2">
                회사는 천재지변, 이용자의 귀책사유 등 회사가 통제할 수 없는 사유로 인해 서비스를
                제공할 수 없는 경우 책임이 면제됩니다. 웹사이트에 게시된 상품 구성 및 가격 정보는
                사정에 따라 변경될 수 있으며, 정확한 내용은 상담을 통해 확인해 주시기 바랍니다.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold">제8조 (분쟁 해결)</h2>
              <p className="mt-2">
                회사와 이용자 간 발생한 분쟁에 대해서는 상호 협의하여 해결하며, 협의가 이루어지지
                않을 경우 관련 법령 및 상관례에 따릅니다.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-lg font-bold">문의처</h2>
              <p className="mt-2">
                이용약관에 대해 궁금하신 점은 아래로 문의해 주세요.
              </p>
              <p className="mt-1">
                {companyName}
                {settings.phone && <> | {settings.phone}</>}
                {settings.email && <> | {settings.email}</>}
              </p>
            </div>

            <p className="border-t border-border pt-4 text-xs text-muted-foreground">
              ※ 본 약관은 일반적인 웹사이트 이용약관 양식을 바탕으로 작성된 예시이며, 실제 서비스
              운영 형태와 관련 법령(전자상거래법, 선불식 할부거래에 관한 법률 등)에 맞게 전문가의
              검토를 거쳐 확정하시는 것을 권장합니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
