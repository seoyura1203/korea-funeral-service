import { getAllConsultationsAdmin } from "@/lib/admin/data";
import ConsultationsTable from "./ConsultationsTable";

export const revalidate = 0;

export default async function AdminConsultationsPage() {
  const consultations = await getAllConsultationsAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold">상담 신청 목록</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          홈페이지에서 접수된 상담 신청 내역을 확인하고 처리 상태를 변경합니다.
        </p>
      </div>

      <ConsultationsTable consultations={consultations} />
    </div>
  );
}
