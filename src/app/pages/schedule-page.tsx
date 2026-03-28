import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowLeft, CheckCircle, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router";

interface DaySchedule {
  date: number;
  isWorking: boolean;
  appointmentCount: number;
}

export function SchedulePage() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);

  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];

  const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  // Generate calendar days for current month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  // Mock schedule data - bạn có thể thay đổi theo nhu cầu
  const scheduleData: { [key: number]: { isWorking: boolean; appointmentCount: number } } = {
    2: { isWorking: true, appointmentCount: 0 },
    3: { isWorking: true, appointmentCount: 0 },
    4: { isWorking: true, appointmentCount: 0 },
    5: { isWorking: true, appointmentCount: 0 },
    6: { isWorking: true, appointmentCount: 0 },
    7: { isWorking: true, appointmentCount: 0 },
    9: { isWorking: true, appointmentCount: 0 },
    10: { isWorking: true, appointmentCount: 2 },
    11: { isWorking: true, appointmentCount: 0 },
    12: { isWorking: true, appointmentCount: 0 },
    13: { isWorking: true, appointmentCount: 0 },
    14: { isWorking: true, appointmentCount: 0 },
    16: { isWorking: false, appointmentCount: 0 },
    17: { isWorking: true, appointmentCount: 0 },
    18: { isWorking: true, appointmentCount: 0 },
    19: { isWorking: true, appointmentCount: 0 },
    20: { isWorking: true, appointmentCount: 0 },
    21: { isWorking: true, appointmentCount: 0 },
    23: { isWorking: true, appointmentCount: 0 },
    24: { isWorking: true, appointmentCount: 0 },
    25: { isWorking: true, appointmentCount: 0 },
    26: { isWorking: true, appointmentCount: 0 },
    27: { isWorking: true, appointmentCount: 0 },
    28: { isWorking: true, appointmentCount: 4 },
    30: { isWorking: false, appointmentCount: 0 },
    31: { isWorking: true, appointmentCount: 0 },
  };

  const todayStats = {
    confirmed: 0,
    inProgress: 0,
    completed: 0,
  };

  const monthStats = {
    workingDays: Object.values(scheduleData).filter(d => d.isWorking).length,
    offDays: Object.values(scheduleData).filter(d => !d.isWorking).length,
  };

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

  const handleDayClick = (day: number) => {
    const schedule = scheduleData[day];
    if (schedule && schedule.appointmentCount > 0) {
      navigate(`/schedule/day/${day}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate("/")} className="text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl text-gray-900">Lịch làm việc</h1>
        </div>

        {/* Month Selector */}
        <div className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between">
          <button onClick={handlePrevMonth} className="p-2">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <span className="text-lg text-gray-900">
            {monthNames[currentMonth]} {currentYear}
          </span>
          <button onClick={handleNextMonth} className="p-2">
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Today's Stats - Professional Design */}
        <div className="bg-white rounded-2xl shadow-lg p-5">
          <h3 className="text-lg mb-4 text-gray-900">Lịch hẹn hôm nay</h3>
          <div className="grid grid-cols-3 gap-3">
            {/* Confirmed */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 hover:shadow-md transition">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl text-blue-600 font-semibold">{todayStats.confirmed}</div>
                <div className="text-xs text-blue-700 font-medium">Đã xác nhận</div>
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border-2 border-yellow-400 hover:shadow-md transition">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl text-yellow-600 font-semibold">{todayStats.inProgress}</div>
                <div className="text-xs text-yellow-700 font-medium">Đang phục vụ</div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200 hover:shadow-md transition">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl text-green-600 font-semibold">{todayStats.completed}</div>
                <div className="text-xs text-green-700 font-medium">Hoàn thành</div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          {/* Week days header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-sm text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: firstDay }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const schedule = scheduleData[day];
              const isToday = day === 28; // Mock today as 28th
              
              let bgColor = "bg-gray-50";
              if (schedule) {
                if (isToday && schedule.appointmentCount > 0) {
                  bgColor = "bg-yellow-500 text-white";
                } else if (schedule.isWorking && schedule.appointmentCount > 0) {
                  bgColor = "bg-yellow-100";
                } else if (schedule.isWorking) {
                  bgColor = "bg-yellow-50";
                }
              }

              return (
                <button
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative ${bgColor} transition hover:scale-105`}
                >
                  <span className="font-medium">{day}</span>
                  {schedule && schedule.appointmentCount > 0 && (
                    <span className="text-xs mt-0.5">{schedule.appointmentCount} lịch</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="text-sm mb-3">Chú thích</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-50 rounded-lg border border-yellow-200"></div>
              <span className="text-sm text-gray-700">Ngày làm việc</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-lg"></div>
              <span className="text-sm text-gray-700">Ngày nghỉ</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs">2</span>
              </div>
              <span className="text-sm text-gray-700">Số lịch hẹn trong ngày</span>
            </div>
          </div>
        </div>

        {/* Month Statistics */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              📊
            </div>
            <h3 className="">Thống kê {monthNames[currentMonth]}</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
              <div className="text-3xl text-yellow-600 mb-1">{monthStats.workingDays}</div>
              <div className="text-sm text-gray-600">Ngày làm việc</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-3xl text-gray-600 mb-1">{monthStats.offDays}</div>
              <div className="text-sm text-gray-600">Ngày nghỉ</div>
            </div>
          </div>
        </div>

        {/* View History Button */}
        <button
          onClick={() => navigate("/history")}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-2xl transition shadow-lg"
        >
          Xem lịch sử làm việc
        </button>
      </div>
    </div>
  );
}