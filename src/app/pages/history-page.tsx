import { useState } from "react";
import { ArrowLeft, Calendar, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";

interface HistoryItem {
  id: string;
  date: string;
  customerName: string;
  service: string;
  price: number;
  commission: number;
  time: string;
}

type ViewType = "day" | "week";

const mockDailyHistory: HistoryItem[] = [
  {
    id: "1",
    date: "28/03/2026",
    customerName: "Nguyễn An Khang",
    service: "Cắt tóc + Gội đầu",
    price: 250000,
    commission: 100000,
    time: "09:00",
  },
  {
    id: "2",
    date: "28/03/2026",
    customerName: "Đoàn Minh Huy",
    service: "Uốn Premlock",
    price: 550000,
    commission: 220000,
    time: "10:30",
  },
  {
    id: "3",
    date: "28/03/2026",
    customerName: "Phan Anh Hào",
    service: "Nhuộm màu thời trang",
    price: 350000,
    commission: 140000,
    time: "14:00",
  },
  {
    id: "4",
    date: "28/03/2026",
    customerName: "Trương Hoàng Quân",
    service: "Cắt tóc nam",
    price: 150000,
    commission: 60000,
    time: "16:00",
  },
];

const mockWeeklyHistory: { date: string; appointments: number; revenue: number; commission: number }[] = [
  { date: "22/03/2026 - CN", appointments: 0, revenue: 0, commission: 0 },
  { date: "23/03/2026 - T2", appointments: 5, revenue: 1200000, commission: 480000 },
  { date: "24/03/2026 - T3", appointments: 6, revenue: 1500000, commission: 600000 },
  { date: "25/03/2026 - T4", appointments: 4, revenue: 980000, commission: 392000 },
  { date: "26/03/2026 - T5", appointments: 7, revenue: 1750000, commission: 700000 },
  { date: "27/03/2026 - T6", appointments: 8, revenue: 2100000, commission: 840000 },
  { date: "28/03/2026 - T7", appointments: 4, revenue: 1300000, commission: 520000 },
];

export function HistoryPage() {
  const navigate = useNavigate();
  const [viewType, setViewType] = useState<ViewType>("day");

  const dailyTotal = mockDailyHistory.reduce(
    (acc, item) => ({
      revenue: acc.revenue + item.price,
      commission: acc.commission + item.commission,
    }),
    { revenue: 0, commission: 0 }
  );

  const weeklyTotal = mockWeeklyHistory.reduce(
    (acc, day) => ({
      appointments: acc.appointments + day.appointments,
      revenue: acc.revenue + day.revenue,
      commission: acc.commission + day.commission,
    }),
    { appointments: 0, revenue: 0, commission: 0 }
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate("/schedule")} className="text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl text-gray-900">Lịch sử làm việc</h1>
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
            Hàng ngày
          </button>
          <button
            onClick={() => setViewType("week")}
            className={`flex-1 py-3 rounded-xl transition ${
              viewType === "week"
                ? "bg-yellow-500 text-white"
                : "bg-transparent text-gray-700"
            }`}
          >
            Hàng tuần
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Daily View */}
        {viewType === "day" && (
          <>
            {/* Daily Summary */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm opacity-90 mb-1">Tổng thu nhập hôm nay</div>
                  <div className="text-3xl mb-2">{dailyTotal.revenue.toLocaleString("vi-VN")}đ</div>
                  <div className="text-sm opacity-80">
                    Hoa hồng: {dailyTotal.commission.toLocaleString("vi-VN")}đ
                  </div>
                </div>
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">{mockDailyHistory.length}</div>
                <div className="text-sm opacity-90">Khách hàng đã phục vụ</div>
              </div>
            </div>

            {/* Daily History List */}
            <div className="space-y-3">
              <h3 className="text-lg px-1">Chi tiết - Hôm nay (28/03/2026)</h3>
              {mockDailyHistory.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-md p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="mb-1">{item.customerName}</h4>
                      <p className="text-gray-600 text-sm mb-1">{item.service}</p>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Calendar className="w-3 h-3" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-600 text-lg mb-1">
                        {item.price.toLocaleString("vi-VN")}đ
                      </div>
                      <div className="text-xs text-gray-500">
                        HH: {item.commission.toLocaleString("vi-VN")}đ
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl px-3 py-2 text-center">
                    <span className="text-sm text-green-700">✓ Đã hoàn thành</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Weekly View */}
        {viewType === "week" && (
          <>
            {/* Weekly Summary */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm opacity-90 mb-1">Tổng thu nhập tuần này</div>
                  <div className="text-3xl mb-2">{weeklyTotal.revenue.toLocaleString("vi-VN")}đ</div>
                  <div className="text-sm opacity-80">
                    Hoa hồng: {weeklyTotal.commission.toLocaleString("vi-VN")}đ
                  </div>
                </div>
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">{weeklyTotal.appointments}</div>
                <div className="text-sm opacity-90">Tổng lịch hẹn</div>
              </div>
            </div>

            {/* Weekly History List */}
            <div className="space-y-3">
              <h3 className="text-lg px-1">Chi tiết - Tuần 22/03 - 28/03/2026</h3>
              {mockWeeklyHistory.map((day, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-md p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="mb-1">{day.date}</h4>
                      <p className="text-gray-600 text-sm">{day.appointments} lịch hẹn</p>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-600 text-lg mb-1">
                        {day.revenue.toLocaleString("vi-VN")}đ
                      </div>
                      <div className="text-xs text-gray-500">
                        HH: {day.commission.toLocaleString("vi-VN")}đ
                      </div>
                    </div>
                  </div>
                  {day.appointments > 0 && (
                    <div className="border-t pt-3">
                      <div className="grid grid-cols-3 gap-2 text-center text-sm">
                        <div>
                          <div className="text-gray-500 text-xs mb-1">Doanh thu TB</div>
                          <div className="text-gray-900">
                            {Math.round(day.revenue / day.appointments).toLocaleString("vi-VN")}đ
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs mb-1">HH/lịch</div>
                          <div className="text-green-600">
                            {Math.round(day.commission / day.appointments).toLocaleString("vi-VN")}đ
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs mb-1">Tỉ lệ HH</div>
                          <div className="text-blue-600">
                            {Math.round((day.commission / day.revenue) * 100)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {day.appointments === 0 && (
                    <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-center">
                      <span className="text-sm text-gray-500">Ngày nghỉ</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate("/schedule")}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 rounded-2xl transition"
        >
          Quay lại lịch làm việc
        </button>
      </div>
    </div>
  );
}
