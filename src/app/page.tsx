import type { Metadata } from "next";

import HeroSection from "@/components/sections/HeroSection";
import QuickContactBar from "@/components/sections/QuickContactBar";
import FuneralInsightSection from "@/components/sections/FuneralInsightSection";
// ExpertiseSection("단 한번 뿐인 마지막 예식이기에...")은 요청에 따라 메인페이지에서 숨김 처리했습니다.
// import ExpertiseSection from "@/components/sections/ExpertiseSection";
import ServiceCards from "@/components/sections/ServiceCards";
// NationwideServiceSection(전국 지도 안내)은 EmergencyCallSection에 지도가 통합되며 메인페이지에서 제외했습니다.
// import NationwideServiceSection from "@/components/sections/NationwideServiceSection";
import HistorySection from "@/components/sections/HistorySection";
import ReviewsPreview from "@/components/sections/ReviewsPreview";
import FaqSection from "@/components/sections/FaqSection";
import EmergencyCallSection from "@/components/sections/EmergencyCallSection";
import { getLatestReviews, getSiteSettings } from "@/lib/queries";
import { productPlans } from "@/lib/products-data";
import { siteConfig } from "@/lib/site-config";

// 검색 결과(네이버/구글)에 보일 메인 제목·설명 문구입니다.
// 무빈소장 금액은 상품 데이터에서 가져오므로 가격이 바뀌면 자동으로 따라갑니다.
const mubinsoPrice = productPlans.find((p) => p.id === "mubinso")!.price;
const mubinsoPriceLabel = `${Math.round(mubinsoPrice / 10000)}만원`;

export const metadata: Metadata = {
  title: {
    absolute: `월 납입금 0원 후불제 장례 ${siteConfig.name}`,
  },
  description: `${siteConfig.name}는 24시간 연중무휴 상담으로 무빈소장·가족장·일반장·VIP 장례를 정직한 가격으로 안내합니다. 무빈소장 ${mubinsoPriceLabel}부터, 비용을 투명하게 공개합니다.`,
};

// Supabase 데이터(리뷰/사이트설정)를 매 요청마다 최신으로 가져옵니다.
export const revalidate = 0;

export default async function HomePage() {
  // 고객후기 관리(어드민)에 등록된 리뷰를 최신순으로 그대로 가져옵니다.
  // 즉 고객후기 페이지가 원본이고, 메인페이지는 그중 최신 8건을 자동으로 보여주는 구조입니다.
  // (새 리뷰를 등록하면 별도 설정 없이 두 곳 모두에 바로 반영됩니다.)
  const [reviews, settings] = await Promise.all([
    getLatestReviews(8),
    getSiteSettings(),
  ]);
  const phone = settings.phone || siteConfig.phone;

  return (
    <>
      <HeroSection />
      <FuneralInsightSection />
      <EmergencyCallSection phone={phone} />
      <HistorySection />
      <ServiceCards />
      <ReviewsPreview reviews={reviews} />
      <FaqSection />
      <QuickContactBar phone={phone} />
    </>
  );
}
