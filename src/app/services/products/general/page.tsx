import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";
import ProductPlanDetail from "@/components/products/ProductPlanDetail";

export const metadata: Metadata = {
  title: "일반장 250만원",
  description: "빈소 마련부터 발인까지 가장 많이 선택하는 표준 3일장, 일반장 250만원. 의전도우미 3명과 헌화·차량 지원 구성을 안내합니다.",
};

export default function GeneralProductPage() {
  return (
    <>
      <PageHeader
        eyebrow="SERVICE"
        title="일반장"
        description="빈소를 포함한 표준 3일장으로 진행하는 기본 상품입니다."
        breadcrumbs={[
          { title: "장례상품", href: "/services/products/general" },
          { title: "일반장" },
        ]}
      />
      <ProductPlanDetail planId="general" />
    </>
  );
}
