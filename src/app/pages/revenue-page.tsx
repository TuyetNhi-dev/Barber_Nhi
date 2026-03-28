import { useState } from "react";
import { TrendingUp, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts";

// Mock data for monthly revenue
const monthlyRevenueData = {
  0: { total: 7200000, growth: 12.5, transactions: 45 }, // Jan
  1: { total: 7850000, growth: 9.0, transactions: 48 }, // Feb
  2: { total: 8550000, growth: 15.3, transactions: 52 }, // Mar
  3: { total: 7900000, growth: -7.6, transactions: 47 }, // Apr
  4: { total: 8200000, growth: 3.8, transactions: 50 }, // May
  5: { total: 9100000, growth: 11.0, transactions: 55 }, // Jun
  6: { total: 8800000, growth: -3.3, transactions: 53 }, // Jul
  7: { total: 9500000, growth: 8.0, transactions: 58 }, // Aug
  8: { total: 8900000, growth: -6.3, transactions: 54 }, // Sep
  9: { total: 9300000, growth: 4.5, transactions: 56 }, // Oct
  10: { total: 9800000, growth: 5.4, transactions: 60 }, // Nov
  11: { total: 10200000, growth: 4.1, transactions: 62 }, // Dec
};

const weeklyRevenueData = {
  2: [ // March 2026
    { day: "T2", amount: 850000, label: "19/03" },
    { day: "T3", amount: 1100000, label: "20/03" },
    { day: "T4", amount: 730000, label: "21/03" },
    { day: "T5", amount: 1240000, label: "22/03" },
    { day: "T6", amount: 1340000, label: "23/03" },
    { day: "T7", amount: 1020000, label: "24/03" },
    { day: "CN", amount: 1180000, label: "25/03" },
  ],
  1: [ // February 2026
    { day: "T2", amount: 780000, label: "17/02" },
    { day: "T3", amount: 950000, label: "18/02" },
    { day: "T4", amount: 1200000, label: "19/02" },
    { day: "T5", amount: 890000, label: "20/02" },
    { day: "T6", amount: 1150000, label: "21/02" },
    { day: "T7", amount: 980000, label: "22/02" },
    { day: "CN", amount: 1100000, label: "23/02" },
  ],
  0: [ // January 2026
    { day: "T2", amount: 720000, label: "20/01" },
    { day: "T3", amount: 880000, label: "21/01" },
    { day: "T4", amount: 1050000, label: "22/01" },
    { day: "T5", amount: 960000, label: "23/01" },
    { day: "T6", amount: 1180000, label: "24/01" },
    { day: "T7", amount: 900000, label: "25/01" },
    { day: "CN", amount: 1020000, label: "26/01" },
  ],
};

const recentTransactions = [
  { id: "1", customer: "Đoàn Minh Huy", service: "Cắt tóc nam", amount: 100000, commission: 30000, date: "25/03/2026 14:30" },
  { id: "2", customer: "Phan Anh Hào", service: "Nhuộm tóc", amount: 200000, commission: 60000, date: "25/03/2026 13:00" },
  { id: "3", customer: "Trương Hoàng Quân", service: "Uốn tóc", amount: 100000, commission: 30000, date: "25/03/2026 11:45" },
  { id: "4", customer: "Nguyễn An Khang", service: "Cắt tóc nam", amount: 100000, commission: 30000, date: "25/03/2026 10:15" },
  { id: "5", customer: "Hoàng Văn E", service: "Tạo kiểu", amount: 80000, commission: 24000, date: "25/03/2026 09:30" },
];

export function RevenuePage() {
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [viewMode, setViewMode] = useState<"week" | "month">("week");

  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const currentMonthData = monthlyRevenueData[currentMonth as keyof typeof monthlyRevenueData] || monthlyRevenueData[2];
  const weeklyData = weeklyRevenueData[currentMonth as keyof typeof weeklyRevenueData] || weeklyRevenueData[2];
  const weeklyTotal = weeklyData.reduce((sum, d) => sum + d.amount, 0);

  // Generate monthly bar chart data (12 months)
  const monthlyChartData = Object.keys(monthlyRevenueData).map((key) => {
    const monthIndex = parseInt(key);
    const data = monthlyRevenueData[monthIndex as keyof typeof monthlyRevenueData];
    return {
      month: monthNames[monthIndex].replace("Tháng ", "T"),
      amount: data.total,
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 p-6 rounded-b-3xl shadow-lg">
        <h1 className="text-2xl text-gray-900 mb-6">Doanh thu</h1>

        {/* Month/Year Selector */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4 flex items-center justify-between">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <span className="text-lg text-gray-900 font-medium">
            {monthNames[currentMonth]} {currentYear}
          </span>
          <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Month Summary */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm opacity-90 mb-1">Tổng hoa hồng tháng này</div>
              <div className="text-4xl mb-2">{formatCurrency(currentMonthData.total)}</div>
              <div className="flex items-center gap-1 text-sm opacity-90">
                <TrendingUp className="w-4 h-4" />
                <span>{currentMonthData.growth > 0 ? '+' : ''}{currentMonthData.growth}% so với tháng trước</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
              <Calendar className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* View Mode Toggle */}
        <div className="bg-white rounded-2xl shadow-md p-1 flex">
          <button
            onClick={() => setViewMode("week")}
            className={`flex-1 py-3 rounded-xl transition ${
              viewMode === "week"
                ? "bg-yellow-500 text-white"
                : "bg-transparent text-gray-700"
            }`}
          >
            7 ngày
          </button>
          <button
            onClick={() => setViewMode("month")}
            className={`flex-1 py-3 rounded-xl transition ${
              viewMode === "month"
                ? "bg-yellow-500 text-white"
                : "bg-transparent text-gray-700"
            }`}
          >
            Hàng tháng
          </button>
        </div>

        {/* Revenue Chart */}
        {viewMode === "week" ? (
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg">Doanh thu 7 ngày gần nhất</h2>
              <span className="text-sm text-gray-500">Tổng: {formatCurrency(weeklyTotal)}</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '8px' }}
                />
                <Bar dataKey="amount" fill="#fb923c" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg">Doanh thu 12 tháng</h2>
              <span className="text-sm text-gray-500">Năm {currentYear}</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ borderRadius: '8px' }}
                />
                <Bar dataKey="amount" fill="#fb923c" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="text-sm text-gray-600 mb-2">Hoa hồng tháng này</div>
            <div className="text-2xl text-orange-600">{formatCurrency(currentMonthData.total * 0.37)}</div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4">
            <div className="text-sm text-gray-600 mb-2">Tip tháng này</div>
            <div className="text-2xl text-green-600">{formatCurrency(currentMonthData.total * 0.21)}</div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <h2 className="text-lg mb-4">Giao dịch gần đây</h2>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-start justify-between border-b pb-3 last:border-b-0">
                <div className="flex-1">
                  <h3 className="text-sm mb-1">{transaction.customer}</h3>
                  <p className="text-xs text-gray-600 mb-1">{transaction.service}</p>
                  <p className="text-xs text-gray-400">{transaction.date}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm text-orange-600 mb-1">
                    {transaction.amount.toLocaleString("vi-VN")}đ
                  </div>
                  <div className="text-xs text-green-600">
                    HH: {transaction.commission.toLocaleString("vi-VN")}đ
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
