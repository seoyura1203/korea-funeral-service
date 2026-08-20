import HeroSection from "@/components/sections/HeroSection";
import QuickContactBar from "@/components/sections/QuickContactBar";
import FuneralInsightSection from "@/components/sections/FuneralInsightSection";
import ExpertiseSection from "@/components/sections/ExpertiseSection";
import ServiceCards from "@/components/sections/ServiceCards";
import NationwideServiceSection from "@/components/sections/NationwideServiceSection";
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
      <ExpertiseSection />
      <ServiceCards />
      <NationwideServiceSection />
      <HistorySection />
      <ReviewsPreview reviews={reviews} />
      <EmergencyCallSection phone={phone} />
      <QuickContactBar phone={phone} />
      {/* 하단 고정 플로팅 버튼(md 이상)에 콘텐츠가 가려지지 않도록 하는 여백 */}
      <div className="hidden h-28 md:block" aria-hidden />
    </>
  );
}
