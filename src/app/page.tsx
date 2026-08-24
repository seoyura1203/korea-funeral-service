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
import EmergencyCallSection from "@/components/sections/EmergencyCallSection";
import { getActiveBanners, getLatestReviews, getSiteSettings } from "@/lib/queries";
import { siteConfig } from "@/lib/site-config";

// Supabase 데이터(배너/리뷰/사이트설정)를 매 요청마다 최신으로 가져옵니다.
export const revalidate = 0;

export default async function HomePage() {
  const [banners, reviews, settings] = await Promise.all([
    getActiveBanners(),
    getLatestReviews(),
    getSiteSettings(),
  ]);
  const phone = settings.phone || siteConfig.phone;

  return (
    <>
      <HeroSection banners={banners} phone={phone} />
      <FuneralInsightSection />
      <EmergencyCallSection phone={phone} />
      <HistorySection />
      <ServiceCards />
      <ReviewsPreview reviews={reviews} />
      <QuickContactBar phone={phone} />
    </>
  );
}
