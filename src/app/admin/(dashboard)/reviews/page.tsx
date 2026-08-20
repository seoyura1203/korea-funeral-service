import { getAllReviewsAdmin } from "@/lib/admin/data";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

export const revalidate = 0;

export default async function AdminReviewsPage() {
  const reviews = await getAllReviewsAdmin();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold">리뷰 관리</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          홈페이지 리뷰 슬라이더와 고객후기 페이지에 노출되는 후기를 관리합니다.
        </p>
      </div>

      <ReviewForm />
      <ReviewList reviews={reviews} />
    </div>
  );
}
