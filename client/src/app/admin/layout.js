import { AdminProvider } from "@/context/AdminContext";
import { AppProvider } from "@/context/AppContext";

export default function AdminLayout({ children }) {
  return (
    <div className="max-w-[100vw] overflow-hidden">
      <AppProvider>
        <AdminProvider>{children}</AdminProvider>
      </AppProvider>
    </div>
  );
}
