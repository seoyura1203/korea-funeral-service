import type { Metadata } from "next";

import PageHeader from "@/components/layout/PageHeader";
import { getAllReviews } from "@/lib/queries";
import ReviewsGrid from "./ReviewsGrid";

export const metadata: Metadata = {
  title: "고객후기",
  description: "한국장례서비스를 이용하신 고객들의 후기와 사례입니다.",
};

export const revalidate = 0;

export default async function ReviewsPage() {
  const reviews = await getAllReviews();

  return (
    <>
      <PageHeader
        eyebrow="SUPPORT"
        title="고객후기"
        description="한국장례서비스와 함께하신 고객들의 진솔한 이야기입니다."
        breadcrumbs={[{ title: "고객후기" }]}
      />

      <section className="section-padding">
        <div className="container">
          <ReviewsGrid reviews={reviews} />
        </div>
      </section>
    </>
  );
}
