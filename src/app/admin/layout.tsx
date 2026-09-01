import { AdminProvider } from "@/components/admin/AdminProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminProvider>{children}</AdminProvider>;
}
