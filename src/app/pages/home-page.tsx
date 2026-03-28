import { useState } from "react";
import { Clock, Calendar as CalendarIcon, TrendingUp, Star, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import barberAvatar from "figma:asset/58973b670b5e0aa07f486b60e85be4044f7127d2.png";

interface Appointment {
  id: string;
  customerName: string;
  customerAvatar: string;
  service: string;
  time: string;
  status: "pending" | "confirmed" | "in-progress" | "completed";
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    customerName: "Đoàn Minh Huy",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    service: "Cắt tóc nam",
    time: "09:00",
    status: "completed",
  },
  {
    id: "2",
    customerName: "Phan Anh Hào",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    service: "Nhuộm tóc",
    time: "10:30",
    status: "in-progress",
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);

  const handleAccept = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "confirmed" as const } : apt))
    );
  };

  const handleReject = (id: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== id));
  };

  const handleStartService = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "in-progress" as const } : apt))
    );
  };

  const handleCompleteService = (id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "completed" as const } : apt))
    );
  };

  const getStatusBadge = (status: Appointment["status"]) => {
    switch (status) {
      case "pending":
        return (
          <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
            Chờ xác nhận
          </span>
        );
      case "confirmed":
        return (
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
            Đã xác nhận
          </span>
        );
      case "in-progress":
        return (
          <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">
            Đang làm
          </span>
        );
      case "completed":
        return (
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
            Đã xong
          </span>
        );
      default:
        return null;
    }
  };

  const todayStats = {
    appointments: 4,
    completed: 1,
    rating: 4.9,
  };

  const revenue = {
    today: 250000,
    month: 1900000,
    target: 1500000,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={barberAvatar}
            alt="Ngô Thị Tuyết Nhi"
            className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
          />
          <div className="text-gray-900">
            <h1 className="text-xl">Xin chào, Ngô Thị Tuyết Nhi!</h1>
            <p className="text-sm opacity-80">Thợ cắt tóc</p>
          </div>
        </div>

        {/* Stats Cards - Professional Design */}
        <div className="grid grid-cols-3 gap-3">
          {/* Today Appointments */}
          <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-gray-500 text-xs text-center">Lịch hôm nay</div>
              <div className="text-3xl text-gray-900 font-semibold">{todayStats.appointments}</div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-gray-500 text-xs text-center">Hoàn thành</div>
              <div className="text-3xl text-gray-900 font-semibold">{todayStats.completed}</div>
            </div>
          </div>

          {/* Rating */}
          <div className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
              </div>
              <div className="text-gray-500 text-xs text-center">Đánh giá TB</div>
              <div className="text-3xl text-gray-900 font-semibold">{todayStats.rating}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Revenue Card */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-sm opacity-90 mb-1">Tổng thu nhập tạm tính</div>
              <div className="text-3xl mb-1">{revenue.today.toLocaleString('vi-VN')}đ</div>
              <div className="text-xs opacity-80">
                Hoa hồng {revenue.month.toLocaleString('vi-VN')}đ • Tip {revenue.target.toLocaleString('vi-VN')}đ
              </div>
            </div>
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>

        {/* Appointments List */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg text-gray-900">Lịch hẹn hôm nay</h2>
            <span className="text-sm text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
              {appointments.length} lịch
            </span>
          </div>

          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                onClick={() => navigate(`/appointment/${appointment.id}`)}
                className={`bg-white rounded-2xl p-4 shadow-md cursor-pointer hover:shadow-lg transition ${
                  appointment.status === "in-progress" ? "border-2 border-yellow-400" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-gray-900 text-lg mb-1">{appointment.customerName}</h3>
                    <p className="text-gray-600 text-sm mb-2">{appointment.service}</p>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-yellow-600 text-xl mb-2">250.000đ</div>
                    {getStatusBadge(appointment.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => navigate("/schedule")}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col items-center justify-center gap-2"
          >
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-gray-800 text-sm">Xem lịch tuần</span>
          </button>
          <button
            onClick={() => navigate("/revenue")}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col items-center justify-center gap-2"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-gray-800 text-sm">Doanh thu</span>
          </button>
        </div>
      </div>
    </div>
  );
}