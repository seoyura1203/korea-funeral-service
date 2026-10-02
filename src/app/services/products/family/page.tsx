import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";
import ProductPlanDetail from "@/components/products/ProductPlanDetail";

export const metadata: Metadata = {
  title: "가족장",
  description: "가까운 가족 중심의 실속형 3일장, 가족장 230만원 안내.",
};

export default function FamilyProductPage() {
  return (
    <>
      <PageHeader
        eyebrow="SERVICE"
        title="가족장"
        description="가까운 가족 중심으로 조용하고 정갈하게 모시는 실속형 상품입니다."
        breadcrumbs={[
          { title: "장례상품", href: "/services/products/family" },
          { title: "가족장" },
        ]}
      />
      <ProductPlanDetail planId="family" />
    </>
  );
}
