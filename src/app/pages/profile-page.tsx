import { Mail, Phone, MapPin, Star, Award, Calendar, Edit2, Scissors, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import barberAvatar from "../../assets/58973b670b5e0aa07f486b60e85be4044f7127d2.png";

const stats = [
  { label: "Tổng khách hàng", value: "1,245", icon: Award },
  { label: "Đánh giá trung bình", value: "4.9/5", icon: Star },
  { label: "Năm kinh nghiệm", value: "8 năm", icon: Calendar },
];

const skills = [
  { name: "Cắt Layer", level: 95 },
  { name: "Undercut", level: 90 },
  { name: "Fade", level: 88 },
  { name: "Pompadour", level: 92 },
  { name: "Nhuộm màu", level: 85 },
  { name: "Uốn tóc", level: 87 },
];

const reviews = [
  { id: "1", customer: "Đoàn Minh Huy", rating: 5, comment: "Rất hài lòng với dịch vụ, thợ cắt tóc rất khéo tay!", date: "20/03/2026" },
  { id: "2", customer: "Phan Anh Hào", rating: 5, comment: "Chuyên nghiệp, thân thiện. Sẽ quay lại lần sau!", date: "18/03/2026" },
  { id: "3", customer: "Trương Hoàng Quân", rating: 4, comment: "Tốt, giá cả hợp lý. Tuy nhiên phải đợi hơi lâu.", date: "15/03/2026" },
];

export function ProfilePage() {
  const navigate = useNavigate();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    // Logic đăng xuất
    console.log("Đăng xuất thành công");
    setShowLogoutDialog(false);
    // Redirect to login page or home
    navigate("/");
  };

  return (
    <div className="p-4 max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 rounded-3xl shadow-xl p-8 text-gray-900 relative">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <div className="relative">
            <img
              src={barberAvatar}
              alt="Ngô Thị Tuyết Nhi"
              className="w-40 h-40 rounded-full border-4 border-white shadow-2xl object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl mb-3">Ngô Thị Tuyết Nhi</h1>
            <p className="text-gray-800 text-lg mb-3">Thợ cắt tóc chuyên nghiệp</p>
            
            {/* Rating Display */}
            <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-yellow-300 text-yellow-800" />
                ))}
              </div>
              <span className="text-xl">4.9</span>
              <span className="text-gray-700 text-sm">(248 đánh giá)</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm justify-center md:justify-start">
                <Mail className="w-4 h-4" />
                <span>nhi.ngo@barbershop.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm justify-center md:justify-start">
                <Phone className="w-4 h-4" />
                <span>0912 345 678</span>
              </div>
              <div className="flex items-center gap-2 text-sm justify-center md:justify-start">
                <MapPin className="w-4 h-4" />
                <span>123 Nguyễn Huệ, Quận 1, TP.HCM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats - with better spacing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition">
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-7 h-7 text-yellow-600" />
              </div>
              <div className="text-3xl text-yellow-600 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <Scissors className="w-6 h-6 text-yellow-600" />
          <h2 className="text-2xl">Kỹ năng chuyên môn</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">{skill.name}</span>
                <span className="text-sm text-yellow-600">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2.5 rounded-full transition-all"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl mb-4">Đánh giá từ khách hàng</h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-medium">{review.customer}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleEdit}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 rounded-2xl transition flex items-center justify-center gap-2 shadow-lg"
        >
          <Edit2 className="w-5 h-5" />
          <span>Chỉnh sửa thông tin</span>
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl transition flex items-center justify-center gap-2 shadow-lg"
        >
          <LogOut className="w-5 h-5" />
          <span>Đăng xuất</span>
        </button>
      </div>

      {/* Edit Dialog */}
      {showEditDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl mb-4">Chỉnh sửa thông tin</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Họ và tên</label>
                <input
                  type="text"
                  defaultValue="Ngô Thị Tuyết Nhi"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="nhi.ngo@barbershop.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Số điện thoại</label>
                <input
                  type="tel"
                  defaultValue="0912 345 678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">Địa chỉ</label>
                <input
                  type="text"
                  defaultValue="123 Nguyễn Huệ, Quận 1, TP.HCM"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={() => setShowEditDialog(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  // Logic lưu thông tin
                  setShowEditDialog(false);
                }}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-xl mb-4">Xác nhận đăng xuất</h3>
            <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
              >
                Hủy
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}