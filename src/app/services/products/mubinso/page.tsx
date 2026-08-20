import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";
import ProductPlanDetail from "@/components/products/ProductPlanDetail";

export const metadata: Metadata = {
  title: "무빈소",
  description:
    "빈소(장례식장) 없이 진행하는 실속형 장례 상품, 무빈소장 200만원 안내.",
};

export default function MubinsoProductPage() {
  return (
    <>
      <PageHeader
        eyebrow="SERVICE"
        title="무빈소"
        description="빈소 차림 없이, 가족끼리 모여 고인과의 마지막 순간에 온전히 집중하는 정성 어린 장례 상품"
        breadcrumbs={[
          { title: "장례상품", href: "/services/products/mubinso" },
          { title: "무빈소" },
        ]}
      />
      <ProductPlanDetail planId="mubinso" />
    </>
  );
}
