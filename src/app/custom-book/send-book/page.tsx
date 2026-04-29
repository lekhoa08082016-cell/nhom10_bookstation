"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";

export default function CustomBookSendPage() {
  const router = useRouter();
  const [trackingCode, setTrackingCode] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Chuyển hướng sang trang xác nhận thành công dành riêng cho quy trình gửi sách cũ
    router.push("/custom-book/success-used");
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      {/* Header & Stepper */}
      <div className="text-center mb-10">
        <h1 className="font-heading text-3xl md:text-4xl text-primary font-bold mb-4">Hướng dẫn gửi sách</h1>
        <p className="text-secondary max-w-2xl mx-auto">Vui lòng đóng gói cẩn thận và gửi cuốn sách yêu quý của bạn đến trạm BookStation để chúng tôi tiến hành "lột xác" cho nó.</p>
        
        <div className="flex items-center justify-center gap-3 text-sm font-medium mt-8 max-w-lg mx-auto">
          <Link href="/custom-book" className="flex flex-col items-center gap-1.5 text-primary font-semibold w-24 hover:text-accent transition-colors group">
            <span className="w-8 h-8 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center text-sm shadow-sm group-hover:bg-green-100"><i className="fa-solid fa-check" /></span>
            <span className="text-xs text-center leading-tight">Tùy chọn<br/>thiết kế</span>
          </Link>
          <div className="h-px bg-accent flex-1 -mt-5" />
          <div className="flex flex-col items-center gap-1.5 text-accent font-semibold w-24">
            <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm shadow-md">2</span>
            <span className="text-xs text-center leading-tight">Thanh toán /<br/>Gửi sách</span>
          </div>
          <div className="h-px bg-gray-200 flex-1 -mt-5" />
          <div className="flex flex-col items-center gap-1.5 text-gray-400 w-24">
            <span className="w-8 h-8 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center text-sm">3</span>
            <span className="text-xs text-center leading-tight">Xác nhận<br/>hoàn tất</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-8">
          
          {/* Địa chỉ nhận sách */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-lightBg px-6 py-4 border-b border-gray-100">
              <h2 className="font-heading text-xl text-primary font-bold flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-accent" /> Địa chỉ nhận sách của BookStation
              </h2>
            </div>
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-24 h-24 shrink-0 bg-primary rounded-full flex items-center justify-center border-4 border-accent/20">
                <i className="fa-solid fa-store text-3xl text-white" />
              </div>
              <div className="space-y-2 text-sm text-gray-700 flex-1">
                <p className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Người nhận:</span> <span className="font-bold text-primary text-base">Trạm BookStation Custom</span></p>
                <p className="flex justify-between border-b border-gray-50 pb-2"><span className="text-gray-500">Số điện thoại:</span> <span className="font-bold text-primary">0912 345 678</span></p>
                <p className="flex justify-between pb-1"><span className="text-gray-500 shrink-0 w-24">Địa chỉ:</span> <span className="font-medium text-right text-primary">123 Đường Sách, Phường Đọc, Quận 1, TP. Hồ Chí Minh</span></p>
              </div>
            </div>
          </section>

          {/* Hướng dẫn đóng gói */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="font-heading text-xl text-primary font-bold mb-5 flex items-center gap-2">
              <i className="fa-solid fa-box-open text-accent" /> Hướng dẫn đóng gói an toàn
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-accent"><i className="fa-solid fa-layer-group text-lg" /></div>
                <h3 className="font-bold text-primary text-sm mb-1">Bước 1: Bọc chống sốc</h3>
                <p className="text-xs text-secondary leading-relaxed">Bọc sách bằng 2-3 lớp màng xốp nổ (bubble wrap) để tránh gãy góc.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-accent"><i className="fa-solid fa-note-sticky text-lg" /></div>
                <h3 className="font-bold text-primary text-sm mb-1">Bước 2: Ghi chú mã đơn</h3>
                <p className="text-xs text-secondary leading-relaxed">Ghi mã đơn hàng và số điện thoại của bạn dán lên ngoài bọc sách.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-accent"><i className="fa-solid fa-truck-fast text-lg" /></div>
                <h3 className="font-bold text-primary text-sm mb-1">Bước 3: Gửi vận chuyển</h3>
                <p className="text-xs text-secondary leading-relaxed">Gửi sách qua các đơn vị vận chuyển (Viettel Post, GHTK, GHN...).</p>
              </div>
            </div>
          </section>

          {/* Thông tin xác nhận từ khách hàng */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="font-heading text-xl text-primary font-bold mb-5 flex items-center gap-2">
              <i className="fa-solid fa-clipboard-check text-accent" /> Xác nhận gửi hàng
            </h2>
            <p className="text-xs text-gray-500 mb-4">Sau khi gửi sách cho bưu cục, bạn có thể nhập mã vận đơn vào đây để chúng tôi tiện theo dõi (hoặc bổ sung sau).</p>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Mã vận đơn (Tùy chọn)</label>
                <input type="text" value={trackingCode} onChange={(e) => setTrackingCode(e.target.value)} placeholder="VD: VT123456789" className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-sm transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-1.5">Ghi chú thêm về sách (Tùy chọn)</label>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Sách của bạn có đặc điểm gì cần lưu ý không? (vd: bìa bị rách nhẹ, giấy ố vàng...)" className="w-full border-[1.5px] border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-accent text-sm resize-none transition-colors"></textarea>
              </div>
            </div>
          </section>

        </div>

        {/* Summary Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="font-heading text-xl text-primary font-bold mb-4 border-b border-gray-100 pb-3">Đơn Custom Sách</h3>
            
            <div className="space-y-3 mb-6">
              <div>
                <p className="text-sm font-semibold text-primary">Nguồn sách</p>
                <p className="text-xs text-secondary mt-0.5">Khách hàng tự gửi sách cũ</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">Chất liệu bìa</p>
                <p className="text-xs text-secondary mt-0.5">Bìa Vải Canvas ({formatPrice(120000)})</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-primary">Dịch vụ đi kèm</p>
                <p className="text-xs text-secondary mt-0.5">• Bookmark đồng bộ ({formatPrice(20000)})</p>
              </div>
            </div>

            <div className="bg-lightBg rounded-xl p-4 mb-6">
              <div className="flex justify-between text-sm mb-2 text-gray-600"><span>Phí gia công</span><span>{formatPrice(140000)}</span></div>
              <div className="flex justify-between text-sm mb-2 text-gray-600"><span>Phí sách gốc</span><span>Không có</span></div>
              <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between items-center">
                <span className="font-bold text-primary text-sm">Tổng chi phí</span>
                <span className="font-bold text-xl text-danger">{formatPrice(140000)}</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-6 flex gap-2">
              <i className="fa-solid fa-circle-info text-blue-500 mt-0.5 shrink-0 text-xs" />
              <p className="text-[11px] text-blue-800 leading-relaxed">Bạn thanh toán phí vận chuyển 1 chiều lúc gửi sách. Phí gia công Custom sẽ được thanh toán (COD) khi BookStation làm xong và gửi lại sách cho bạn.</p>
            </div>

            <button type="submit" className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-secondary transition-colors shadow-md">Xác nhận gửi sách</button>
          </div>
        </div>
      </form>
    </main>
  );
}