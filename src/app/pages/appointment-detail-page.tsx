import { useState } from "react";
import { ArrowLeft, Clock, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router";

interface Appointment {
  id: string;
  customerName: string;
  service: string;
  time: string;
  price: number;
  commission: number;
  status: "confirmed" | "in-progress" | "completed";
}

// Mock data cho các lịch hẹn trong ngày
const mockDayAppointments: Appointment[] = [
  {
    id: "1",
    customerName: "Nguyễn An Khang",
    service: "Cắt tóc + Gội đầu",
    time: "09:00",
    price: 250000,
    commission: 100000,
    status: "completed",
  },
  {
    id: "2",
    customerName: "Đoàn Minh Huy",
    service: "Uốn Premlock",
    time: "10:30",
    price: 550000,
    commission: 220000,
    status: "in-progress",
  },
  {
    id: "3",
    customerName: "Phan Anh Hào",
    service: "Nhuộm màu thời trang",
    time: "14:00",
    price: 350000,
    commission: 140000,
    status: "confirmed",
  },
  {
    id: "4",
    customerName: "Trương Hoàng Quân",
    service: "Cắt tóc nam",
    time: "15:30",
    price: 100000,
    commission: 40000,
    status: "confirmed",
  },
];

const mockWeekAppointments = [
  {
    date: "Hôm nay",
    dateLabel: "28/03/2026",
    count: 4,
    appointments: mockDayAppointments,
  },
  {
    date: "Ngày mai",
    dateLabel: "29/03/2026",
    count: 3,
    appointments: [
      {
        id: "5",
        customerName: "Lê Văn An",
        service: "Cắt tóc + Tạo kiểu",
        time: "10:00",
        price: 280000,
        commission: 112000,
        status: "confirmed" as const,
      },
      {
        id: "6",
        customerName: "Trần Minh Khoa",
        service: "Nhuộm tóc",
        time: "14:00",
        price: 400000,
        commission: 160000,
        status: "confirmed" as const,
      },
      {
        id: "7",
        customerName: "Phạm Tuấn Anh",
        service: "Cắt tóc nam",
        time: "16:00",
        price: 150000,
        commission: 60000,
        status: "confirmed" as const,
      },
    ],
  },
  {
    date: "Thứ 2",
    dateLabel: "30/03/2026",
    count: 5,
    appointments: [
      {
        id: "8",
        customerName: "Nguyễn Văn Long",
        service: "Uốn tóc",
        time: "09:00",
        price: 500000,
        commission: 200000,
        status: "confirmed" as const,
      },
      {
        id: "9",
        customerName: "Hoàng Minh Tuấn",
        service: "Cắt tóc + Gội đầu",
        time: "10:30",
        price: 250000,
        commission: 100000,
        status: "confirmed" as const,
      },
    ],
  },
];

export function AppointmentDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [appointments, setAppointments] = useState<Appointment[]>(mockDayAppointments);
  const [viewType, setViewType] = useState<"day" | "week">("day");

  const handleComplete = (aptId: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === aptId ? { ...apt, status: "completed" as const } : apt))
    );
  };

  const handleStartService = (aptId: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === aptId ? { ...apt, status: "in-progress" as const } : apt))
    );
  };

  const getStatusBadge = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
            Đang chờ
          </span>
        );
      case "in-progress":
        return (
          <span className="bg-yellow-500 text-white text-xs px-3 py-1 rounded-full">
            Đang làm
          </span>
        );
      case "completed":
        return (
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
            Đã xong
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate("/")} className="text-gray-900 bg-white rounded-full w-10 h-10 flex items-center justify-center">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl text-gray-900">Chi tiết lịch hẹn</h1>
        </div>

        {/* View Type Toggle */}
        <div className="bg-white rounded-2xl shadow-md p-1 flex">
          <button
            onClick={() => setViewType("day")}
            className={`flex-1 py-3 rounded-xl transition ${
              viewType === "day"
                ? "bg-yellow-500 text-white"
                : "bg-transparent text-gray-700"
            }`}
          >
            Hôm nay
          </button>
          <button
            onClick={() => setViewType("week")}
            className={`flex-1 py-3 rounded-xl transition ${
              viewType === "week"
                ? "bg-yellow-500 text-white"
                : "bg-transparent text-gray-700"
            }`}
          >
            Trong tuần
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Day View */}
        {viewType === "day" && (
          <>
            {/* Date Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-gray-900">Hôm nay</h2>
              <span className="text-sm text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                {appointments.length} lịch
              </span>
            </div>

            {/* Appointments List */}
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className={`bg-white rounded-2xl shadow-md overflow-hidden ${
                  appointment.status === "in-progress" ? "border-2 border-yellow-400" : ""
                }`}
              >
                <div className="p-5">
                  {/* Customer and Service Info */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl mb-1">{appointment.customerName}</h3>
                      <p className="text-gray-600 text-sm mb-2">{appointment.service}</p>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Giờ: {appointment.time}</span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xs text-gray-500 mb-1">Giá tiền</div>
                      <div className="text-2xl text-yellow-600 mb-2">
                        {appointment.price.toLocaleString("vi-VN")}đ
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>
                  </div>

                  {/* Commission if completed */}
                  {appointment.status === "completed" && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                            💰
                          </div>
                          <div>
                            <div className="text-sm text-gray-700">Hoa hồng của bạn</div>
                            <div className="text-xs text-gray-500">(40%)</div>
                          </div>
                        </div>
                        <div className="text-2xl text-green-600">
                          {appointment.commission.toLocaleString("vi-VN")}đ
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {appointment.status === "confirmed" && (
                    <button
                      onClick={() => handleStartService(appointment.id)}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-xl transition"
                    >
                      Bắt đầu làm
                    </button>
                  )}

                  {appointment.status === "in-progress" && (
                    <button
                      onClick={() => handleComplete(appointment.id)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl transition flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      Hoàn tất
                    </button>
                  )}

                  {appointment.status === "completed" && (
                    <div className="w-full bg-green-500 text-white py-3 rounded-xl flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" />
                      Đã hoàn tất
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Week View */}
        {viewType === "week" && (
          <div className="space-y-6">
            {mockWeekAppointments.map((dayData, dayIndex) => (
              <div key={dayIndex}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-lg text-gray-900">{dayData.date}</h2>
                    <p className="text-sm text-gray-500">{dayData.dateLabel}</p>
                  </div>
                  <span className="text-sm text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
                    {dayData.count} lịch
                  </span>
                </div>

                <div className="space-y-3">
                  {dayData.appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="bg-white rounded-2xl shadow-md p-5"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg mb-1">{appointment.customerName}</h3>
                          <p className="text-gray-600 text-sm mb-2">{appointment.service}</p>
                          <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>Giờ: {appointment.time}</span>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-xs text-gray-500 mb-1">Giá tiền</div>
                          <div className="text-xl text-yellow-600 mb-2">
                            {appointment.price.toLocaleString("vi-VN")}đ
                          </div>
                          {getStatusBadge(appointment.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
