import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";
import EstimateWizard from "@/components/estimate/EstimateWizard";

export const metadata: Metadata = {
  title: "셀프 견적",
  description:
    "몇 가지 선택만으로 나에게 맞는 장례 상품의 예상 비용을 바로 확인해 보세요.",
};

export default function EstimatePage() {
  return (
    <>
      <PageHeader
        eyebrow="SERVICE"
        title="셀프 견적 내보기"
        description="고르시는 항목마다 예상 금액이 투명하게 더해지고 빠집니다. 1분이면 충분해요."
        breadcrumbs={[
          { title: "장례상품", href: "/services/estimate" },
          { title: "셀프 견적" },
        ]}
      />

      <section className="section-padding">
        <div className="container">
          <div className="mx-auto max-w-2xl">
            <EstimateWizard />
            <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
              위 견적은 입력하신 내용을 바탕으로 계산된 예상 금액(가견적)이며,
              지역·장례식장 사정에 따라 달라질 수 있습니다. 정확한 견적은
              상담을 통해 확정해 드립니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
