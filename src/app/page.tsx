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
import { siteConfig } from "@/lib/site-config";

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
