import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Calendar, DollarSign, Users, LogOut } from "lucide-react";
import barberAvatar from "../../assets/58973b670b5e0aa07f486b60e85be4044f7127d2.png";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", label: "Trang chủ", icon: Home },
    { path: "/schedule", label: "Lịch làm", icon: Calendar },
    { path: "/revenue", label: "Doanh thu", icon: DollarSign },
    { path: "/profile", label: "Cá nhân", icon: Users },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
            </div>
            <span className="text-xl">Barber Shop</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <div className="text-sm">Ngô Thị Tuyết Nhi</div>
              <div className="text-xs opacity-90">barber</div>
            </div>
            <img src={barberAvatar} alt="Barber" className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
            <button className="p-2 hover:bg-orange-600 rounded-lg transition hidden md:block">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t shadow-2xl">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center py-2 px-4 rounded-lg transition ${
                  isActive ? "text-orange-600" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}