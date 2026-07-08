import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <div className="p-6">

          <Navbar />

          <div className="mt-6">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
}