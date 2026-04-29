"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";

const BOOKED_SLOTS: Record<string, number[]> = {
  '4-2026': [7],
  '5-2026': [3, 18],
  '6-2026': [10, 20, 25],
  '7-2026': [5, 12, 19, 26],
  '8-2026': [1, 8, 15, 22, 29],
};
const MAX_SLOTS = 5;
const TODAY = new Date();
const MONTH_NAMES = ['','Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];

export default function CustomBookStep1Page() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [source, setSource] = useState<"shop" | "cu">("shop");
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const [calMonth, setCalMonth] = useState(4);
  const [calYear, setCalYear] = useState(2026);
  const [selectedDateStr, setSelectedDateStr] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const [form, setForm] = useState({ name: "", phone: "", fb: "", email: "", addr: "", note: "" });

  useEffect(() => {
    const saved = sessionStorage.getItem("customSelectedBook");
    if (saved) setSelectedBook(JSON.parse(saved));
  }, []);

  const handleNext = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectAfterLogin", "/custom-book");
      router.push("/auth/login");
      return;
    }
    if (!form.name.trim()) {
      alert("Vui lòng nhập Họ và Tên (*)");
      return;
    }
    const phoneRegex = /^0[35789][0-9]{8}$/;
    if (!phoneRegex.test(form.phone.replace(/[\s.]/g, ''))) {
      alert("Số điện thoại không hợp lệ. Vui lòng nhập 10 số (VD: 0912345678)");
      return;
    }
    if (!form.fb.trim()) {
      alert("Vui lòng nhập Link Facebook / Zalo (*)");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      alert("Email không hợp lệ. Vui lòng nhập đúng định dạng (VD: example@gmail.com)");
      return;
    }
    if (source === "shop" && !form.addr.trim()) {
      alert("Vui lòng nhập địa chỉ nhận hàng (*)");
      return;
    }
    if (!selectedDateStr) {
      alert("Vui lòng chọn ngày hẹn trên lịch (*)");
      return;
    }
    if (source === "shop" && !selectedBook) {
      alert("Vui lòng chọn sách từ cửa hàng để custom bìa (*)");
      return;
    }

    const customFee = 150000;
    const bookPrice = source === "shop" && selectedBook ? selectedBook.price : 0;
    const total = customFee + bookPrice;
    const deposit = Math.round(total * 0.5);

    const order = {
      nguon: source,
      name: form.name,
      phone: form.phone,
      fb: form.fb,
      email: form.email,
      addr: form.addr,
      note: form.note,
      date: selectedDateStr,
      book: selectedBook ? selectedBook.title : null,
      bookPrice,
      total,
      deposit,
    };
    sessionStorage.setItem("customOrder", JSON.stringify(order));
    if (source === "shop") router.push("/custom-book/payment");
    else router.push("/custom-book/send-book");
  };

  // Calendar helpers
  const key = `${calMonth}-${calYear}`;
  const booked = BOOKED_SLOTS[key] || [];
  const slotCount = booked.length;
  const isFull = slotCount >= MAX_SLOTS;

  const daysInMonth = new Date(calYear, calMonth, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth - 1, 1).getDay();

  const calDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) calDays.push(<div key={`empty-${i}`} />);

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(calYear, calMonth - 1, d);
    const isBooked = booked.includes(d);
    const isPast = dateObj < new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    const dStr = `${d}/${calMonth}/${calYear}`;
    const isSelected = selectedDateStr === dStr;

    let cls = "w-8 h-8 rounded-full flex items-center justify-center mx-auto text-sm transition-all duration-150 ";
    if (isBooked) cls += "bg-red-200 text-red-800 cursor-not-allowed";
    else if (isPast) cls += "text-gray-300 cursor-default";
    else if (isFull && !isSelected) cls += "bg-gray-100 text-gray-400 cursor-not-allowed opacity-50";
    else {
      cls += "bg-gray-50 cursor-pointer hover:bg-primary hover:text-white ";
      if (isSelected) cls += "!bg-primary !text-white";
    }

    calDays.push(
      <div
        key={d}
        className={cls}
        onClick={() => {
          if (isBooked || isPast || (isFull && !isSelected)) return;
          setSelectedDateStr(dStr);
        }}
      >
        {d}
      </div>
    );
  }

  // Summary calc
  const bookPrice = source === "shop" && selectedBook ? selectedBook.price : 0;
  const total = 150000 + bookPrice;
  const deposit = Math.round(total * 0.5);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl md:text-4xl text-primary font-bold mb-2">Dịch Vụ Custom Bìa Sách</h1>
        <p className="text-secondary text-base">Thiết kế riêng cuốn sách, tạo món quà ý nghĩa</p>
      </div>

      {/* Steps */}
      <div className="flex items-center justify-center gap-0 mb-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</div>
          <span className="text-sm font-semibold text-primary max-md:hidden">Điền thông tin & Đặt lịch</span>
        </div>
        <div className="w-16 md:w-24 h-[2px] bg-gray-200 mx-2"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-bold">2</div>
          <span className="text-sm font-medium text-gray-400 max-md:hidden">Xác Nhận / Thanh Toán</span>
        </div>
        <div className="w-16 md:w-24 h-[2px] bg-gray-200 mx-2"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-sm font-bold">3</div>
          <span className="text-sm font-medium text-gray-400 max-md:hidden">Hoàn tất</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left column */}
        <div className="flex-1 space-y-6">

          {/* Nguồn sách */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-heading text-xl text-primary font-bold mb-5">Nguồn sách</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${source === 'shop' ? 'border-primary bg-[#FFF2DF]' : 'border-gray-200 hover:border-accent'}`}>
                <input type="radio" name="nguon_sach" value="shop" checked={source === 'shop'} onChange={() => setSource('shop')} className="mt-1 accent-primary" />
                <div>
                  <p className="font-semibold text-primary text-sm">Mua từ BookStation</p>
                  <p className="text-xs text-secondary mt-1">Thanh toán cọc 50% toàn bộ để đăng ký. BookStation cung cấp sách gốc + custom bìa.</p>
                </div>
              </label>
              <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors ${source === 'cu' ? 'border-primary bg-[#FFF2DF]' : 'border-gray-200 hover:border-accent'}`}>
                <input type="radio" name="nguon_sach" value="cu" checked={source === 'cu'} onChange={() => setSource('cu')} className="mt-1 accent-primary" />
                <div>
                  <p className="font-semibold text-primary text-sm">Gửi sách cá nhân</p>
                  <p className="text-xs text-secondary mt-1">Gửi sách → Shop nhận → Cọc 50% phí Custom. Tiết kiệm hơn nếu bạn đã có sách.</p>
                </div>
              </label>
            </div>
          </div>

          {/* Chọn sách */}
          {source === 'shop' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-heading text-xl text-primary font-bold mb-2">Vui lòng chọn sách để custom</h2>
              <p className="text-secondary text-sm mb-4">Nhấn "Custom bìa" ở trang cửa hàng để chọn sách, hoặc nhấn vào khung bên dưới để xem cửa hàng</p>
              {!selectedBook ? (
                <Link href="/products" className="flex flex-col items-center justify-center gap-4 w-full border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-accent transition-colors group">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#FFF2DF] transition-colors">
                    <i className="fa-solid fa-book-open text-2xl text-gray-400 group-hover:text-accent transition-colors"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">Chưa chọn sách</p>
                    <p className="text-xs text-secondary mt-1">Nhấn vào đây để xem cửa hàng và chọn sách muốn custom bìa</p>
                  </div>
                  <span className="text-xs bg-primary text-white px-5 py-2 rounded-lg group-hover:bg-secondary transition-colors">Xem cửa hàng →</span>
                </Link>
              ) : (
                <div className="flex items-center gap-5 p-5 border-2 border-primary rounded-2xl bg-[#FFF2DF]">
                  <div className="w-24 h-32 rounded-xl overflow-hidden shrink-0 shadow-md flex items-center justify-center" style={{background: selectedBook.color || '#D3A376'}}>
                    {selectedBook.img || selectedBook.image ? (
                      <img src={selectedBook.img || selectedBook.image} className="w-full h-full object-cover" alt={selectedBook.title} />
                    ) : (
                      <i className="fa-solid fa-book-open text-2xl text-white opacity-80"></i>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-primary text-base leading-tight mb-1">{selectedBook.title}</p>
                    <p className="text-secondary text-sm mb-3">{selectedBook.author}</p>
                    <p className="text-[#FF0B22] font-extrabold text-lg">{formatPrice(selectedBook.price)}</p>
                  </div>
                  <Link href="/products" className="text-xs text-secondary hover:text-primary underline shrink-0 self-start whitespace-nowrap">Đổi sách</Link>
                </div>
              )}
            </div>
          )}

          {/* Lịch */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-heading text-xl text-primary font-bold">Lịch Custom {MONTH_NAMES[calMonth]}, {calYear}</h2>
                <p className="text-xs text-secondary mt-0.5">Nhấn vào ngày để chọn lịch hẹn</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full border border-accent" style={{background:'#FFF2DF', color:'#3E2522'}}>Đã đặt {slotCount}/{MAX_SLOTS} đơn</span>
                <button onClick={() => setShowPicker(!showPicker)} className="text-xs flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-1.5 text-secondary hover:border-primary hover:text-primary transition-colors">
                  <i className={`fa-solid fa-sliders text-xs transition-transform ${showPicker ? 'rotate-90' : ''}`}></i>
                  <span className="hidden sm:inline">Chọn tháng/năm</span>
                </button>
              </div>
            </div>

            {showPicker && (
              <div className="bg-lightBg rounded-xl p-4 mb-4 space-y-3">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-primary mb-1.5">Tháng</label>
                    <select value={calMonth} onChange={(e) => { setCalMonth(parseInt(e.target.value)); setSelectedDateStr(""); }}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-accent cursor-pointer">
                      {[...Array(12)].map((_, i) => <option key={i+1} value={i+1}>Tháng {i+1}</option>)}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-primary mb-1.5">Năm</label>
                    <select value={calYear} onChange={(e) => { setCalYear(parseInt(e.target.value)); setSelectedDateStr(""); }}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-accent cursor-pointer">
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-secondary mb-2">
              <span>CN</span><span>T2</span><span>T3</span><span>T4</span><span>T5</span><span>T6</span><span>T7</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm mb-3">
              {calDays}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs mt-4">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-200 inline-block"></span>Đã kín lịch</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-primary inline-block"></span>Đang chọn</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-100 inline-block"></span>Còn trống</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-50 inline-block border"></span>Ngày qua</span>
            </div>

            {isFull && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 flex items-center gap-2">
                <i className="fa-solid fa-circle-xmark text-red-400 shrink-0"></i>
                Tháng này đã đủ {MAX_SLOTS} đơn. Vui lòng chọn tháng khác.
              </div>
            )}
          </div>

          {/* Thông tin */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-heading text-xl text-primary font-bold mb-5">Thông tin liên hệ</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">Họ và Tên <span className="text-danger">*</span></label>
                  <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Nguyễn Văn A" className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">Số điện thoại <span className="text-danger">*</span></label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} placeholder="09xx.xxx.xxx" className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Link Facebook / Zalo <span className="text-danger">*</span></label>
                <input type="text" value={form.fb} onChange={(e) => setForm({...form, fb: e.target.value})} placeholder="facebook.com/yourname hoặc SĐT Zalo" className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent text-sm" />
                <p className="text-xs text-secondary mt-1">Để shop dễ trao đổi ý tưởng thiết kế bìa</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Email của bạn <span className="text-danger">*</span></label>
                <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="example@gmail.com" className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent text-sm" />
              </div>
              {source === 'shop' && (
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">Địa chỉ nhận hàng <span className="text-danger">*</span></label>
                  <input type="text" value={form.addr} onChange={(e) => setForm({...form, addr: e.target.value})} placeholder="Số nhà, đường, phường, quận, tỉnh/thành phố" className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent text-sm" />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Ghi chú thêm</label>
                <textarea value={form.note} onChange={(e) => setForm({...form, note: e.target.value})} rows={3} placeholder="Ý tưởng thiết kế, màu sắc yêu thích, phong cách..." className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-accent text-sm resize-none"></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Summary */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="font-heading text-xl text-primary font-bold mb-5">Tóm tắt đơn Custom</h2>
            <div className="space-y-3 mb-5 text-sm">
              <div className="flex justify-between">
                <span className="text-secondary">Khách hàng:</span>
                <span className="font-medium text-primary line-clamp-1 text-right max-w-[150px]">{form.name || "..."}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Ngày làm:</span>
                <span className="font-medium text-primary">{selectedDateStr || "Chưa chọn"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">Phí Custom:</span>
                <span className="font-medium text-primary">{formatPrice(150000)}</span>
              </div>
              {source === 'shop' && (
                <div className="flex justify-between">
                  <span className="text-secondary">Giá sách gốc:</span>
                  <span className="font-medium text-primary">{selectedBook ? formatPrice(selectedBook.price) : "Chưa chọn"}</span>
                </div>
              )}
            </div>
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between font-semibold text-primary">
                <span>Tổng cộng:</span>
                <span className="text-lg">{(source === 'shop' && !selectedBook) ? "—" : formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm text-secondary">
                <span>Số tiền cần cọc (50%):</span>
                <span className="font-semibold text-primary">{(source === 'shop' && !selectedBook) ? "—" : formatPrice(deposit)}</span>
              </div>
            </div>
            <button onClick={handleNext} className="w-full mt-6 bg-primary text-white font-semibold py-3 rounded-xl hover:bg-secondary transition-colors text-base shadow-md">
              Tiếp tục
            </button>
            <p className="text-xs text-secondary text-center mt-3">Bạn sẽ thanh toán cọc 50% ở bước tiếp theo</p>
          </div>
        </div>

      </div>
    </main>
  );
}