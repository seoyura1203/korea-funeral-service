import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";
import ProductPlanDetail from "@/components/products/ProductPlanDetail";

export const metadata: Metadata = {
  title: "무빈소장 99만원",
  description:
    "빈소 없이 진행하는 간소한 장례, 무빈소장 99만원. 장례지도사·입관지도사·고인전용 리무진(화장장 이송)까지 포함한 구성을 안내합니다.",
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
