import { getAllBannersAdmin } from "@/lib/admin/data";
import BannerForm from "./BannerForm";
import BannerList from "./BannerList";

export const revalidate = 0;

export default async function AdminBannersPage() {
  const banners = await getAllBannersAdmin();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold">배너 관리</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          메인 페이지 히어로 슬라이더에 노출되는 배너를 등록하고 순서를 관리합니다.
        </p>
      </div>

      <BannerForm />
      <BannerList banners={banners} />
    </div>
  );
}
