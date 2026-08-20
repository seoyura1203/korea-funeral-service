import { getAllNoticesAdmin } from "@/lib/admin/data";
import NoticeForm from "./NoticeForm";
import NoticeList from "./NoticeList";

export const revalidate = 0;

export default async function AdminNoticesPage() {
  const notices = await getAllNoticesAdmin();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-bold">공지사항 관리</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          홈페이지와 공지사항 페이지에 노출되는 게시글을 관리합니다.
        </p>
      </div>

      <NoticeForm />
      <NoticeList notices={notices} />
    </div>
  );
}
