import { AdminProvider } from "@/components/admin/AdminProvider";
import AdminLayout from "@/components/admin/AdminLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayout>{children}</AdminLayout>
    </AdminProvider>
  );
}
