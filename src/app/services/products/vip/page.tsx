import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";
import ProductPlanDetail from "@/components/products/ProductPlanDetail";

export const metadata: Metadata = {
  title: "VIP 450만원",
  description: "최고급 수의와 오동나무 특관, 넉넉한 인력으로 격식을 갖춘 VIP 장례 450만원. 구성 품목을 자세히 안내합니다.",
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
