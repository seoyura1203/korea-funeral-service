import AdminSidebar from "@/components/admin/AdminSidebar";
import { requireAdminUser } from "@/lib/admin/guard";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 미들웨어(src/middleware.ts)가 1차로 막지만, 레이아웃 단에서도 재검증합니다.
  const user = await requireAdminUser();

  return (
    <div className="flex min-h-screen flex-col bg-secondary/20 md:flex-row">
      <AdminSidebar userEmail={user.email ?? ""} />
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
