import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";
import ProductPlanDetail from "@/components/products/ProductPlanDetail";

export const metadata: Metadata = {
  title: "VIP",
  description: "최고급 품목과 인력으로 격식을 갖춘 VIP 장례 상품, 350만원 안내.",
};

export default function VipProductPage() {
  return (
    <>
      <PageHeader
        eyebrow="SERVICE"
        title="VIP"
        description="최고급 품목과 넉넉한 인력 지원으로 격식을 갖춰 모시는 프리미엄 상품입니다."
        breadcrumbs={[
          { title: "장례상품", href: "/services/products/vip" },
          { title: "VIP" },
        ]}
      />
      <ProductPlanDetail planId="vip" />
    </>
  );
}
