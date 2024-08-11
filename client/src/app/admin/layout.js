import { AdminProvider } from "@/context/AdminContext";

export default function AdminLayout({ children }) {
  return (
    <div>
      <AdminProvider>{children}</AdminProvider>
    </div>
  );
}
